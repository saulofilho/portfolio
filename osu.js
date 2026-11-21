// 押忍: reads back what any website can learn about you without asking.
// Everything runs in your browser. The only request that leaves it is the
// IP lookup (geojs.io, with ipwho.is and ipinfo.io as fallbacks). Nothing is stored.
(function () {
  const $ = (s) => document.querySelector(s);
  const out = $("#out");
  const skipBtn = $("#skip");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const T0 = performance.now();
  let fast = reduce;
  let printed = 0;

  const sleep = (ms) => (fast ? Promise.resolve() : new Promise((r) => setTimeout(r, ms)));
  const timeout = (p, ms, fallback = null) =>
    Promise.race([Promise.resolve(p).catch(() => fallback), new Promise((r) => setTimeout(() => r(fallback), ms))]);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  // ---------- Matrix rain ----------

  function rain() {
    const c = $("#rain");
    if (reduce || !c.getContext) return c.remove();
    const x = c.getContext("2d");
    const glyphs = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789押忍";
    const fs = 16;
    let w, h, drops;
    const size = () => {
      w = c.width = innerWidth;
      h = c.height = innerHeight;
      drops = Array.from({ length: Math.ceil(w / fs) }, () => Math.random() * -60);
    };
    size();
    addEventListener("resize", size);
    let last = 0;
    const frame = (t) => {
      requestAnimationFrame(frame);
      if (document.hidden || t - last < 55) return;
      last = t;
      x.fillStyle = "rgba(0,0,0,.09)";
      x.fillRect(0, 0, w, h);
      x.font = fs + "px monospace";
      drops.forEach((d, i) => {
        x.fillStyle = Math.random() < 0.04 ? "#d8ffe5" : "#3dff7a";
        x.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * fs, d * fs);
        drops[i] = d * fs > h && Math.random() > 0.975 ? 0 : d + 1;
      });
    };
    requestAnimationFrame(frame);
  }

  // ---------- Output ----------

  const follow = () => {
    if (innerHeight + scrollY >= document.body.scrollHeight - 260) scrollTo(0, document.body.scrollHeight);
  };

  function line(text = "", cls = "") {
    const d = el("div", "line " + cls, text);
    out.append(d);
    follow();
    return d;
  }

  async function type(text, cls = "prompt") {
    const d = line("", cls + " cursor");
    for (const ch of text) {
      if (fast) { d.textContent = text; break; }
      d.textContent += ch;
      await sleep(22 + Math.random() * 38);
    }
    d.classList.remove("cursor");
    return d;
  }

  async function progress(label, ms) {
    const d = line(label);
    const n = 20;
    for (let i = 1; i <= n && !fast; i++) {
      d.textContent = `${label} [${"#".repeat(i).padEnd(n, ".")}]`;
      await sleep(ms / n);
    }
    d.textContent = `${label} [${"#".repeat(n)}] `;
    d.append(el("span", "ok", "ok"));
  }

  async function block(title, note, items) {
    const b = el("section", "block");
    const head = el("div", "block-head");
    head.append(el("span", null, title), el("span", null, note || ""));
    const rows = el("div", "rows");
    b.append(head, rows);
    out.append(b);
    const live = {};
    for (const [k, v, cls, key] of items) {
      if (v == null || v === "" || (Array.isArray(v) && !v.length)) continue;
      const row = el("div", "row");
      const val = el("span", "v " + (cls || ""), Array.isArray(v) ? v.join(", ") : String(v));
      row.append(el("span", "k", k), val);
      rows.append(row);
      if (key) { live[key] = val; val.dataset.live = key; }
      printed++;
      follow();
      await sleep(60);
    }
    return live;
  }

  // ---------- Collecting ----------

  async function ipInfo() {
    const get = async (url) => {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) throw new Error(r.status);
      return r.json();
    };
    try {
      const d = await get("https://get.geojs.io/v1/ip/geo.json");
      if (!d.ip) throw new Error("empty");
      return { ip: d.ip, city: d.city, region: d.region, country: d.country, org: d.organization_name,
        asn: d.asn ? "AS" + d.asn : "", tz: d.timezone, lat: d.latitude, lon: d.longitude, src: "geojs.io" };
    } catch (_) {}
    try {
      const d = await get("https://ipwho.is/");
      if (d.success === false) throw new Error(d.message);
      const c = d.connection || {};
      return { ip: d.ip, city: d.city, region: d.region, country: d.country, org: c.isp || c.org,
        asn: c.asn ? "AS" + c.asn : "", tz: d.timezone && d.timezone.id, lat: d.latitude, lon: d.longitude,
        postal: d.postal, src: "ipwho.is" };
    } catch (_) {}
    try {
      const d = await get("https://ipinfo.io/json");
      const [lat, lon] = (d.loc || ",").split(",");
      const asn = (d.org || "").match(/^AS\d+/);
      return { ip: d.ip, host: d.hostname, city: d.city, region: d.region, country: d.country,
        org: (d.org || "").replace(/^AS\d+\s*/, ""), asn: asn ? asn[0] : "", tz: d.timezone,
        lat: lat || null, lon: lon || null, postal: d.postal, src: "ipinfo.io" };
    } catch (_) {}
    return null;
  }

  async function uaInfo() {
    const ua = navigator.userAgent;
    let os = "", browser = "", arch = "", model = "";
    let mobile = /Mobi|Android|iPhone|iPad/.test(ua);
    const uad = navigator.userAgentData;
    if (uad && uad.getHighEntropyValues) {
      try {
        const h = await uad.getHighEntropyValues(["platformVersion", "architecture", "bitness", "model", "fullVersionList"]);
        const p = uad.platform, pv = h.platformVersion || "";
        if (p === "Windows") os = "Windows " + (parseInt(pv, 10) >= 13 ? "11" : "10");
        else if (p === "macOS") os = "macOS " + pv.split(".").slice(0, 2).join(".");
        else os = [p, pv].filter(Boolean).join(" ");
        const brands = (h.fullVersionList || []).filter((b) => !/Not.?A.?Brand|Chromium/i.test(b.brand));
        const pick = brands.find((b) => /Edge|Opera|Brave|Vivaldi/i.test(b.brand)) || brands[0];
        if (pick) browser = `${pick.brand} ${pick.version}`;
        arch = [h.architecture, h.bitness && h.bitness + "-bit"].filter(Boolean).join(" ");
        model = h.model || "";
        mobile = uad.mobile;
      } catch (_) {}
    }
    let m;
    if (!os) {
      if ((m = ua.match(/Windows NT ([\d.]+)/))) os = "Windows " + ({ "10.0": "10 or 11", "6.3": "8.1", "6.1": "7" }[m[1]] || m[1]);
      else if ((m = ua.match(/(?:iPhone|CPU) OS ([\d_]+)/))) os = "iOS " + m[1].replace(/_/g, ".");
      else if ((m = ua.match(/Android ([\d.]+)/))) os = "Android " + m[1];
      else if (/Mac OS X/.test(ua)) os = navigator.maxTouchPoints > 1 ? "iPadOS" : "macOS";
      else if (/CrOS/.test(ua)) os = "ChromeOS";
      else if (/Linux/.test(ua)) os = "Linux";
    }
    if (!browser) {
      if ((m = ua.match(/Edg\/([\d.]+)/))) browser = "Edge " + m[1];
      else if ((m = ua.match(/OPR\/([\d.]+)/))) browser = "Opera " + m[1];
      else if ((m = ua.match(/Firefox\/([\d.]+)/))) browser = "Firefox " + m[1];
      else if ((m = ua.match(/Chrome\/([\d.]+)/))) browser = "Chrome " + m[1];
      else if ((m = ua.match(/Version\/([\d.]+).*Safari/))) browser = "Safari " + m[1];
    }
    if (navigator.brave) browser = browser.replace(/^\S+/, "Brave");
    return { ua, os, browser, arch, model, mobile };
  }

  function gpu() {
    try {
      const g = document.createElement("canvas").getContext("webgl");
      if (!g) return null;
      const e = g.getExtension("WEBGL_debug_renderer_info");
      return {
        renderer: g.getParameter(e ? e.UNMASKED_RENDERER_WEBGL : g.RENDERER),
        vendor: g.getParameter(e ? e.UNMASKED_VENDOR_WEBGL : g.VENDOR),
        tex: g.getParameter(g.MAX_TEXTURE_SIZE),
      };
    } catch (_) { return null; }
  }

  function canvasPrint() {
    try {
      const c = document.createElement("canvas");
      c.width = 260; c.height = 60;
      const x = c.getContext("2d");
      x.textBaseline = "top";
      x.font = "16px Arial";
      x.fillStyle = "#f60"; x.fillRect(110, 1, 62, 20);
      x.fillStyle = "#069"; x.fillText("押忍 osu! 🥋 <canvas> 1.0", 2, 15);
      x.fillStyle = "rgba(102,204,0,.7)"; x.fillText("押忍 osu! 🥋 <canvas> 1.0", 4, 17);
      return c.toDataURL();
    } catch (_) { return ""; }
  }

  function fonts() {
    const list = ["Arial", "Helvetica Neue", "Times New Roman", "Courier New", "Georgia", "Verdana", "Tahoma", "Trebuchet MS",
      "Comic Sans MS", "Impact", "Segoe UI", "Calibri", "Cambria", "Consolas", "Menlo", "Monaco", "SF Pro Text", "Avenir",
      "Futura", "Gill Sans", "Optima", "Ubuntu", "Roboto", "Noto Sans", "DejaVu Sans", "Fira Code", "Source Code Pro",
      "Hiragino Sans", "Meiryo", "Papyrus", "Wingdings"];
    const s = document.createElement("span");
    s.style.cssText = "position:absolute;left:-9999px;font-size:72px;visibility:hidden";
    s.textContent = "mmmmmmmmmlli10OQ@#";
    document.body.append(s);
    const base = {};
    for (const f of ["monospace", "serif", "sans-serif"]) { s.style.fontFamily = f; base[f] = s.offsetWidth + "x" + s.offsetHeight; }
    const found = list.filter((f) => ["monospace", "serif", "sans-serif"].some((b) => {
      s.style.fontFamily = `"${f}",${b}`;
      return s.offsetWidth + "x" + s.offsetHeight !== base[b];
    }));
    s.remove();
    return found;
  }

  async function sha(text) {
    try {
      const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
    } catch (_) {
      let h = 0x811c9dc5;
      for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
      return (h >>> 0).toString(16).padStart(8, "0").repeat(8);
    }
  }

  async function permissions() {
    if (!navigator.permissions) return [];
    const names = ["geolocation", "camera", "microphone", "notifications", "clipboard-read"];
    const res = await Promise.all(names.map((n) =>
      timeout(navigator.permissions.query({ name: n }).then((p) => `${n.replace("-read", "")}:${p.state}`), 800)));
    return res.filter(Boolean);
  }

  async function devices() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return "";
    const list = await timeout(navigator.mediaDevices.enumerateDevices(), 1200, []);
    const n = (k) => list.filter((d) => d.kind === k).length;
    return list.length ? `${n("videoinput")} camera(s), ${n("audioinput")} mic(s), ${n("audiooutput")} speaker(s)` : "";
  }

  const mq = (q) => matchMedia(q).matches;
  const gb = (b) => (b / 1024 ** 3).toFixed(b > 10 * 1024 ** 3 ? 0 : 1) + " GB";
  const yes = (b) => (b ? "yes" : "no");

  // ---------- Run ----------

  async function run() {
    out.setAttribute("aria-busy", "true");
    const ipP = timeout(ipInfo(), 5000);
    const uaP = uaInfo();
    const batP = navigator.getBattery ? timeout(navigator.getBattery(), 1500) : Promise.resolve(null);
    const stoP = navigator.storage && navigator.storage.estimate ? timeout(navigator.storage.estimate(), 1500) : Promise.resolve(null);
    const permP = permissions();
    const devP = devices();

    await type("ssh visitor@you");
    line("[*] connection accepted. no password asked. no cookie set.", "muted");
    await type("./osu --scan --no-prompts");
    await progress("[*] loading modules net sys gfx locale priv power fp", 900);

    const [ip, ua, bat, sto, perm, dev] = await Promise.all([ipP, uaP, batP, stoP, permP, devP]);
    const g = gpu();
    const fontList = fonts();
    const canvasHash = (await sha(canvasPrint())).slice(0, 16);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const off = -new Date().getTimezoneOffset();
    const offStr = `UTC${off >= 0 ? "+" : "-"}${String(Math.floor(Math.abs(off) / 60)).padStart(2, "0")}:${String(Math.abs(off) % 60).padStart(2, "0")}`;
    const conn = navigator.connection || {};

    line("");
    line("[+] target acquired. dumping.", "ok");

    await block("01 / network", ip ? "via " + ip.src : "lookup blocked", [
      ["public ip", ip ? ip.ip : "hidden (adblocker or firewall: nice)", ip ? "" : "warn"],
      ["hostname", ip && ip.host],
      ["provider", ip && ip.org],
      ["asn", ip && ip.asn],
      ["location", ip && [ip.city, ip.region, ip.country].filter(Boolean).join(", ")],
      ["postal code", ip && ip.postal],
      ["coordinates", ip && ip.lat != null ? `${(+ip.lat).toFixed(2)}, ${(+ip.lon).toFixed(2)} (approx.)` : ""],
      ["network type", conn.effectiveType && `${conn.effectiveType}${conn.type ? " / " + conn.type : ""}`],
      ["downlink", conn.downlink != null && `${conn.downlink} Mbps, rtt ${conn.rtt} ms`],
      ["data saver", conn.saveData != null && yes(conn.saveData)],
      ["online", yes(navigator.onLine)],
    ]);
    if (ip && ip.tz && ip.tz !== tz) line(`[!] ip says ${ip.tz}, your clock says ${tz}. vpn or proxy?`, "warn");

    await block("02 / system", ua.mobile ? "mobile" : "desktop", [
      ["os", ua.os],
      ["browser", ua.browser],
      ["architecture", ua.arch],
      ["device model", ua.model],
      ["cpu threads", navigator.hardwareConcurrency],
      ["memory", navigator.deviceMemory && `≥ ${navigator.deviceMemory} GB`],
      ["gpu", g && g.renderer],
      ["gpu vendor", g && g.vendor],
      ["max texture", g && `${g.tex}px`],
      ["touch points", navigator.maxTouchPoints],
      ["devices", dev],
      ["user agent", ua.ua, "muted"],
    ]);

    await block("03 / display", "", [
      ["screen", `${screen.width} × ${screen.height}`],
      ["available", `${screen.availWidth} × ${screen.availHeight}`],
      ["window", `${innerWidth} × ${innerHeight}`, "", "win"],
      ["pixel ratio", `${devicePixelRatio}x`],
      ["color depth", `${screen.colorDepth}-bit`],
      ["hdr", yes(mq("(dynamic-range: high)"))],
      ["orientation", screen.orientation && screen.orientation.type],
      ["theme", mq("(prefers-color-scheme: dark)") ? "dark" : "light"],
      ["reduced motion", yes(mq("(prefers-reduced-motion: reduce)"))],
      ["pointer", mq("(pointer: fine)") ? "mouse or trackpad" : mq("(pointer: coarse)") ? "finger" : "none"],
    ]);

    await block("04 / locale", "", [
      ["languages", navigator.languages || [navigator.language]],
      ["timezone", `${tz} (${offStr})`],
      ["local time", new Date().toLocaleTimeString(), "", "clock"],
      ["date format", new Date(2026, 10, 21).toLocaleDateString()],
      ["number format", (1234567.89).toLocaleString()],
      ["hour cycle", Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions().hourCycle],
    ]);

    await block("05 / privacy", "", [
      ["cookies", navigator.cookieEnabled ? "enabled" : "disabled"],
      ["do not track", navigator.doNotTrack === "1" ? "on (most sites ignore it)" : "off"],
      ["global privacy ctl", navigator.globalPrivacyControl ? "on" : "off"],
      ["permissions", perm],
      ["storage quota", sto && sto.quota && gb(sto.quota)],
      ["came from", document.referrer || "direct / hidden"],
      ["tab history", `${history.length} page(s)`],
      ["automated", navigator.webdriver ? "yes (hello, bot)" : "no", navigator.webdriver ? "warn" : ""],
    ]);

    if (bat) {
      await block("06 / power", "", [
        ["battery", `${Math.round(bat.level * 100)}%`],
        ["charging", yes(bat.charging)],
        ["time left", !bat.charging && isFinite(bat.dischargingTime) ? `${Math.round(bat.dischargingTime / 60)} min` : ""],
      ]);
    }

    await block("07 / fingerprint", "", [
      ["installed fonts", fontList.length ? `${fontList.length} found: ${fontList.join(", ")}` : "none detected"],
      ["canvas hash", canvasHash],
    ]);

    const seed = [ua.ua, ua.os, (navigator.languages || []).join(), tz, screen.width, screen.height, devicePixelRatio,
      screen.colorDepth, navigator.hardwareConcurrency, navigator.deviceMemory, g && g.renderer, canvasHash, fontList.join()].join("|");
    const id = (await sha(seed)).slice(0, 16).toUpperCase().match(/.{4}/g).join("-");
    const box = el("div", "id");
    box.append(el("span", "muted", "your visitor id"), el("strong", null, id),
      el("span", "muted", "same browser, same id. no cookies needed. often survives incognito, too."));
    out.append(box);
    follow();
    await sleep(300);

    const live = await block("08 / live", "watching", [
      ["time on page", "00:00", "", "t"],
      ["cursor", "—", "", "cur"],
      ["scrolled", "0%", "", "scr"],
      ["last key", "—", "", "key"],
      ["clicks", "0", "", "clk"],
      ["left the tab", "0 times", "", "away"],
    ]);
    watch(live);

    const secs = ((performance.now() - T0) / 1000).toFixed(1);
    line("");
    line(`[✓] ${printed} data points in ${secs} s. 0 permission prompts. 0 cookies.`, "ok");
    line(`[i] none of this was stored. the only thing that left your browser was the ip lookup${ip ? " (" + ip.src + ")" : ""}.`, "muted");
    line("[i] every site you visit can read the same list.", "muted");
    line("");
    await type("cat osu.txt");
    await reveal();
    line("");
    const end = line("", "prompt cursor");
    end.setAttribute("aria-hidden", "true");
    out.setAttribute("aria-busy", "false");
    skipBtn.hidden = true;
  }

  async function reveal() {
    const src = $("#art").textContent.replace(/^\n|\n$/g, "");
    const lines = src.split("\n");
    const wrap = el("figure", "art");
    wrap.setAttribute("aria-label", "ASCII drawing: a person in a hoodie next to a big-eyed creature");
    const pre = el("pre");
    const cols = Math.max(...lines.map((l) => l.length));
    wrap.style.setProperty("--w", (cols * 0.6 + 1).toFixed(1));
    wrap.append(pre);
    out.append(wrap);
    for (const l of lines) {
      pre.textContent += l + "\n";
      follow();
      await sleep(45);
    }
  }

  function watch(v) {
    const t0 = Date.now();
    let clicks = 0, away = 0;
    const tick = () => {
      const s = Math.floor((Date.now() - t0) / 1000);
      v.t.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
      const clock = document.querySelector('[data-live="clock"]');
      if (clock) clock.textContent = new Date().toLocaleTimeString();
    };
    setInterval(tick, 1000);
    const flash = (n) => { n.classList.remove("new"); void n.offsetWidth; n.classList.add("new"); };
    addEventListener("pointermove", (e) => { v.cur.textContent = `x ${e.clientX}, y ${e.clientY}`; }, { passive: true });
    addEventListener("scroll", () => {
      const max = document.body.scrollHeight - innerHeight;
      v.scr.textContent = `${max > 0 ? Math.round((scrollY / max) * 100) : 0}%`;
    }, { passive: true });
    addEventListener("keydown", (e) => { v.key.textContent = e.key === " " ? "space" : e.key; flash(v.key); });
    addEventListener("click", () => { v.clk.textContent = String(++clicks); flash(v.clk); });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) return;
      away++;
      v.away.textContent = `${away} time${away === 1 ? "" : "s"}. welcome back.`;
      flash(v.away);
    });
    addEventListener("resize", () => {
      const w = document.querySelector('[data-live="win"]');
      if (w) w.textContent = `${innerWidth} × ${innerHeight}`;
    });
  }

  // ---------- Controls ----------

  const skip = () => { fast = true; skipBtn.hidden = true; };
  skipBtn.addEventListener("click", (e) => { e.stopPropagation(); skip(); });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") location.href = "./";
    else if ((e.key === "Enter" || e.key === " ") && !fast) { e.preventDefault(); skip(); }
  });
  if (fast) skipBtn.hidden = true;

  rain();
  run().catch((err) => {
    line("[x] scan crashed: " + (err && err.message), "bad");
    fast = true;
    reveal();
  });
})();
