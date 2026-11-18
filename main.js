// Removes the old Gatsby service worker, if it is still registered
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then((regs) => regs.forEach((reg) => reg.unregister()))
    .catch(() => {});
}

// Mobile menu
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Colors: a dialog to pick the page's background and text colors
(function () {
  const PRESETS = [
    ["Paper", "#FFFFFF", "#0A0A0A"],
    ["Lime", "#D7FF3C", "#102000"],
    ["Cobalt", "#2340FF", "#FFF4D6"],
    ["Bubblegum", "#FFB8DE", "#47002B"],
    ["Tomato", "#FF5232", "#2B0700"],
    ["Mint", "#A9F2D4", "#003827"],
    ["Grape", "#5A2BD8", "#FFE45C"],
    ["Butter", "#FFE9A8", "#3B2A00"],
  ];
  const DEFAULT = { bg: PRESETS[0][1], fg: PRESETS[0][2] };
  const root = document.documentElement;
  const btn = document.getElementById("theme-btn");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!btn) return;

  // Contrast ratio (WCAG)
  const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lum = (hex) => {
    const [r, g, b] = rgb(hex).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  };
  const normHex = (v) => {
    v = String(v).trim().replace(/^#?/, "#");
    if (/^#[0-9a-f]{3}$/i.test(v)) v = "#" + [...v.slice(1)].map((c) => c + c).join("");
    return /^#[0-9a-f]{6}$/i.test(v) ? v.toUpperCase() : null;
  };

  let current = { ...DEFAULT };
  try {
    const saved = JSON.parse(localStorage.getItem("colors") || "null");
    if (saved && normHex(saved.bg) && normHex(saved.fg)) current = { bg: normHex(saved.bg), fg: normHex(saved.fg) };
  } catch (_) {}

  function apply(c, save) {
    current = c;
    const isDefault = c.bg === DEFAULT.bg && c.fg === DEFAULT.fg;
    const low = contrast(c.bg, c.fg) < 7;
    if (isDefault) {
      root.style.removeProperty("--bg");
      root.style.removeProperty("--fg");
    } else {
      root.style.setProperty("--bg", c.bg);
      root.style.setProperty("--fg", c.fg);
    }
    if (low) root.dataset.contrast = "low"; else delete root.dataset.contrast;
    if (meta) meta.content = c.bg;
    btn.style.setProperty("--chip-bg", c.bg);
    btn.style.setProperty("--chip-fg", c.fg);
    if (save) {
      try {
        if (isDefault) localStorage.removeItem("colors");
        else localStorage.setItem("colors", JSON.stringify({ bg: c.bg, fg: c.fg, low }));
      } catch (_) {}
    }
    if (dialog) sync();
  }

  // ---------- Dialog ----------
  let dialog, fields, readout, presetBtns;

  function build() {
    dialog = document.createElement("dialog");
    dialog.className = "colors";
    dialog.setAttribute("aria-labelledby", "colors-title");
    dialog.innerHTML = `
      <form method="dialog" class="colors-inner">
        <header class="colors-head">
          <p class="label">Settings / Colors</p>
          <h2 id="colors-title">Pick your colors</h2>
          <button class="colors-x" value="close" aria-label="Close">×</button>
        </header>
        <fieldset class="presets">
          <legend class="label">Presets</legend>
          <div class="preset-grid"></div>
        </fieldset>
        <fieldset class="custom">
          <legend class="label">Make your own</legend>
          <div class="field" data-key="bg">
            <label class="label" for="c-bg-hex">Background</label>
            <input type="color" aria-label="Background color picker">
            <input type="text" id="c-bg-hex" spellcheck="false" autocomplete="off" maxlength="7">
          </div>
          <div class="field" data-key="fg">
            <label class="label" for="c-fg-hex">Text</label>
            <input type="color" aria-label="Text color picker">
            <input type="text" id="c-fg-hex" spellcheck="false" autocomplete="off" maxlength="7">
          </div>
          <p class="readout" aria-live="polite"></p>
        </fieldset>
        <footer class="colors-foot">
          <button type="button" class="link-btn" data-act="random">Surprise me</button>
          <span class="spacer"></span>
          <button type="button" class="link-btn" data-act="reset">Reset</button>
          <button class="solid-btn" value="done">Done</button>
        </footer>
      </form>`;
    const grid = dialog.querySelector(".preset-grid");
    presetBtns = PRESETS.map(([name, bg, fg]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "preset";
      b.style.setProperty("--p-bg", bg);
      b.style.setProperty("--p-fg", fg);
      b.innerHTML = `<span class="preset-tile" aria-hidden="true">Aa</span><span class="preset-name"></span>`;
      b.querySelector(".preset-name").textContent = name;
      b.setAttribute("aria-label", `${name}: ${bg} background, ${fg} text`);
      b.addEventListener("click", () => apply({ bg, fg }, true));
      grid.append(b);
      return { b, bg, fg };
    });
    fields = [...dialog.querySelectorAll(".field")].map((f) => {
      const key = f.dataset.key;
      const [picker, hex] = f.querySelectorAll("input");
      picker.addEventListener("input", () => apply({ ...current, [key]: picker.value.toUpperCase() }, true));
      hex.addEventListener("input", () => {
        const v = normHex(hex.value);
        hex.toggleAttribute("aria-invalid", !v && hex.value.length > 0);
        if (v) apply({ ...current, [key]: v }, true);
      });
      hex.addEventListener("blur", () => { hex.value = current[key]; hex.removeAttribute("aria-invalid"); });
      return { key, picker, hex };
    });
    readout = dialog.querySelector(".readout");
    dialog.querySelector('[data-act="reset"]').addEventListener("click", () => apply({ ...DEFAULT }, true));
    dialog.querySelector('[data-act="random"]').addEventListener("click", () => apply(randomPair(), true));
    // Click outside the panel closes it
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => btn.focus());
    document.body.append(dialog);
  }

  function sync() {
    for (const { key, picker, hex } of fields) {
      picker.value = current[key].toLowerCase();
      if (document.activeElement !== hex) hex.value = current[key];
    }
    for (const { b, bg, fg } of presetBtns) b.setAttribute("aria-pressed", String(bg === current.bg && fg === current.fg));
    const r = contrast(current.bg, current.fg);
    const verdict = r >= 7 ? "Great for reading" : r >= 4.5 ? "Good for reading" : r >= 3 ? "Headlines only" : "Hard to read";
    readout.dataset.level = r >= 4.5 ? "ok" : "warn";
    readout.innerHTML = `<span class="label">Contrast</span> <strong>${r.toFixed(1)} : 1</strong> <span class="label">${verdict}</span>`;
  }

  // A random hue, with text in the same family, dark or light, at a readable contrast
  function randomPair() {
    const hsl = (h, s, l) => {
      s /= 100; l /= 100;
      const k = (n) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
      return "#" + [f(0), f(8), f(4)].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
    };
    for (let tries = 0; tries < 40; tries++) {
      const h = Math.floor(Math.random() * 360);
      const lightBg = Math.random() < 0.6;
      const bg = hsl(h, 70 + Math.random() * 30, lightBg ? 72 + Math.random() * 16 : 30 + Math.random() * 18);
      const fgHue = (h + (Math.random() < 0.5 ? 0 : 40 + Math.random() * 280)) % 360;
      const fg = hsl(fgHue, 60 + Math.random() * 40, lightBg ? 8 + Math.random() * 12 : 82 + Math.random() * 12);
      if (contrast(bg, fg) >= 7) return { bg, fg };
    }
    return { bg: "#D7FF3C", fg: "#102000" };
  }

  btn.addEventListener("click", () => {
    if (!dialog) build();
    sync();
    dialog.showModal();
  });
  apply(current, false);
})();

// Highlights the index entry of the section being read
function watchToc(toc) {
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
  if (!targets.length) return;
  const setActive = () => {
    let current = targets[0];
    for (const t of targets) if (t.getBoundingClientRect().top < 140) current = t;
    links.forEach((a) => a.classList.toggle("active", a.hash.slice(1) === current.id));
  };
  addEventListener("scroll", setActive, { passive: true });
  setActive();
}
window.watchToc = watchToc;
const pageToc = document.querySelector(".toc");
if (pageToc && !document.getElementById("post-toc")) watchToc(pageToc);
