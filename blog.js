// Blog: reads the Markdown files in /posts and renders them.
// To publish, add a .md file to /posts and push. No manifest to update.
(function () {
  const REPO = "saulofilho/portfolio";
  const BRANCH = "main";
  const CACHE_KEY = "posts-v1";

  // ---------- Finding the files ----------

  async function listFiles() {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch (_) {}

    let files = [];
    // On GitHub Pages: ask the GitHub API what is in /posts
    if (location.hostname.endsWith("github.io")) {
      try {
        const r = await fetch(`https://api.github.com/repos/${REPO}/contents/posts?ref=${BRANCH}`);
        if (r.ok) files = (await r.json()).filter((f) => f.type === "file").map((f) => f.name);
      } catch (_) {}
    }
    // Local server: read the directory listing
    if (!files.length) {
      try {
        const r = await fetch("posts/");
        if (r.ok) {
          const html = await r.text();
          files = [...html.matchAll(/href="([^"?#]+\.md)"/g)].map((m) => decodeURIComponent(m[1].split("/").pop()));
        }
      } catch (_) {}
    }
    // Optional fallback: posts/index.json with ["file.md", ...]
    if (!files.length) {
      try {
        const r = await fetch("posts/index.json");
        if (r.ok) files = await r.json();
      } catch (_) {}
    }
    files = [...new Set(files.filter((f) => f.endsWith(".md") && !f.startsWith("_")))];
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(files)); } catch (_) {}
    return files;
  }

  // ---------- Parsing ----------

  function parseFrontMatter(text) {
    const data = {};
    let body = text.replace(/^﻿/, "");
    const m = body.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (m) {
      body = body.slice(m[0].length);
      for (const line of m[1].split(/\r?\n/)) {
        const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
        if (!kv) continue;
        let v = kv[2].trim();
        if (/^\[.*\]$/.test(v)) {
          v = v.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
        } else {
          v = v.replace(/^["']|["']$/g, "");
        }
        data[kv[1].toLowerCase()] = v;
      }
    }
    return { data, body };
  }

  function parsePost(file, text) {
    const slug = file.replace(/\.md$/, "");
    const { data, body: raw } = parseFrontMatter(text);
    let body = raw;
    let title = data.title;
    // No title in the front matter: use the first "# Heading"
    const h1 = body.match(/^\s*#\s+(.+)\s*$/m);
    if (h1 && (!title || h1[1].trim() === title) && body.trimStart().startsWith("#")) {
      title = title || h1[1].trim();
      body = body.replace(h1[0], "");
    }
    // Date: front matter, or a YYYY-MM-DD prefix in the file name
    const dateStr = data.date || (slug.match(/^\d{4}-\d{2}-\d{2}/) || [])[0] || "";
    const date = dateStr ? new Date(dateStr + (dateStr.length === 10 ? "T12:00:00" : "")) : null;
    const plain = body.replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`\[\]()!-]/g, " ");
    const words = plain.split(/\s+/).filter(Boolean).length;
    let description = data.description;
    if (!description) {
      const para = body.split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !/^[#>`|\-*!]/.test(p));
      description = para ? para.replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").slice(0, 180) : "";
    }
    const tags = Array.isArray(data.tags) ? data.tags : data.tags ? data.tags.split(",").map((s) => s.trim()) : [];
    return {
      slug, file, body, tags, words,
      title: title || slug.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/[-_]/g, " "),
      description,
      date: date && !isNaN(date) ? date : null,
      draft: String(data.draft).toLowerCase() === "true",
      lang: data.lang || "",
      minutes: Math.max(1, Math.round(words / 220)),
    };
  }

  async function loadPosts() {
    const files = await listFiles();
    const posts = await Promise.all(files.map(async (f) => {
      try {
        const r = await fetch("posts/" + encodeURIComponent(f));
        return r.ok ? parsePost(f, await r.text()) : null;
      } catch (_) { return null; }
    }));
    return posts.filter((p) => p && !p.draft).sort((a, b) => (b.date || 0) - (a.date || 0));
  }

  // ---------- Helpers ----------

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const fmtShort = (d) => d ? d.toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";
  const fmtLong = (d) => d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
  const postUrl = (p) => "post.html?p=" + encodeURIComponent(p.slug);
  const slugify = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

  function postItem(p) {
    const li = el("li");
    if (p.lang) li.lang = p.lang;
    const a = el("a", "post-link");
    a.href = postUrl(p);
    a.append(el("span", "label post-date", fmtShort(p.date)));
    const text = el("span", "post-text");
    text.append(el("span", "post-title", p.title));
    if (p.description) text.append(el("span", "post-desc", p.description));
    a.append(text);
    li.append(a);
    return li;
  }

  function emptyState(list) {
    list.replaceChildren(el("li", "label", "No posts yet. Soon."));
  }

  // ---------- Pages ----------

  async function renderList(list) {
    const posts = await loadPosts();
    if (!posts.length) return emptyState(list);
    const limit = Number(list.dataset.limit) || Infinity;

    if (list.dataset.group !== "year") {
      list.replaceChildren(...posts.slice(0, limit).map(postItem));
      return;
    }
    // Blog page: grouped by year, with the years in the index
    const years = document.getElementById("years");
    const byYear = new Map();
    for (const p of posts) {
      const y = p.date ? String(p.date.getFullYear()) : "Undated";
      if (!byYear.has(y)) byYear.set(y, []);
      byYear.get(y).push(p);
    }
    list.replaceChildren();
    let i = 0;
    for (const [year, items] of byYear) {
      i++;
      const head = el("li", "year");
      head.id = "y-" + year;
      head.append(el("h2", null, year), el("span", "label", `${items.length} ${items.length === 1 ? "post" : "posts"}`));
      list.append(head, ...items.map(postItem));
      if (years) {
        const li = el("li");
        const a = el("a", null, `${String(i).padStart(2, "0")} / ${year}`);
        a.href = "#y-" + year;
        li.append(a);
        years.append(li);
      }
    }
    if (years && window.watchToc) window.watchToc(years.closest(".toc"));
  }

  function enhance(article) {
    // Images and relative links point inside /posts
    article.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src") || "";
      if (!/^(https?:|data:|\/)/.test(src)) img.src = "posts/" + src;
      img.loading = "lazy";
    });
    article.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (/^https?:/.test(href) && !href.includes(location.host)) { a.target = "_blank"; a.rel = "noopener"; }
      else if (/\.md$/.test(href)) a.href = "post.html?p=" + encodeURIComponent(href.split("/").pop().replace(/\.md$/, ""));
    });
    // Heading anchors
    const used = new Set();
    article.querySelectorAll(".post-body h2, .post-body h3").forEach((h) => {
      let id = slugify(h.textContent) || "section";
      while (used.has(id)) id += "-";
      used.add(id);
      h.id = id;
      const a = el("a", "anchor", "#");
      a.href = "#" + id;
      a.setAttribute("aria-label", "Link to this section");
      h.append(a);
    });
    // Code blocks: language label and copy button
    article.querySelectorAll("pre > code").forEach((code) => {
      const pre = code.parentElement;
      const lang = ((code.className.match(/language-(\S+)/) || [])[1] || "text");
      const fig = el("figure", "code");
      const bar = el("figcaption", "code-bar");
      const btn = el("button", "copy", "Copy");
      btn.type = "button";
      btn.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(code.textContent); btn.textContent = "Copied"; }
        catch (_) { btn.textContent = "Select and copy"; }
        setTimeout(() => (btn.textContent = "Copy"), 1600);
      });
      bar.append(el("span", null, lang), btn);
      pre.replaceWith(fig);
      fig.append(bar, pre);
    });
    // Wide tables scroll on their own
    article.querySelectorAll("table").forEach((t) => {
      const wrap = el("div", "table-wrap");
      t.replaceWith(wrap);
      wrap.append(t);
    });
  }

  async function renderPost(article) {
    const slug = new URLSearchParams(location.search).get("p");
    const posts = await loadPosts();
    const idx = posts.findIndex((p) => p.slug === slug);
    const p = posts[idx];
    if (!p) {
      article.replaceChildren(
        el("p", "label label-strong", "404 / Not found"),
        el("h1", null, "This post wandered off."),
      );
      const back = el("a", "back label", "← All posts");
      back.href = "blog.html";
      article.append(back);
      return;
    }

    document.title = `${p.title} · Saulo Filho`;
    if (p.lang) article.lang = p.lang;
    const back = el("a", "back label", "← Writing");
    back.href = "blog.html";
    const meta = el("p", "label post-meta");
    meta.append(el("time", null, fmtLong(p.date)), document.createTextNode(" / " + p.minutes + " min read"));
    if (p.date) meta.querySelector("time").dateTime = p.date.toISOString().slice(0, 10);
    const head = el("header", "post-head");
    head.append(back, meta, el("h1", null, p.title));
    if (p.description) head.append(el("p", "lead", p.description));
    if (p.tags.length) {
      const tags = el("ul", "tags");
      p.tags.forEach((t) => tags.append(el("li", null, t)));
      head.append(tags);
    }
    const body = el("div", "post-body prose");
    body.innerHTML = window.marked ? window.marked.parse(p.body, { gfm: true }) : "";
    if (!window.marked) body.append(el("pre", null, p.body));
    article.replaceChildren(head, body);
    enhance(article);

    // Table of contents in the sidebar
    const toc = document.getElementById("post-toc");
    const hs = [...body.querySelectorAll("h2")];
    if (toc && hs.length) {
      hs.forEach((h, i) => {
        const li = el("li");
        const a = el("a", null, `${String(i + 1).padStart(2, "0")} / ${h.firstChild.textContent.trim()}`);
        a.href = "#" + h.id;
        li.append(a);
        toc.append(li);
      });
      window.watchToc && window.watchToc(toc.closest(".toc"));
    } else if (toc) {
      toc.closest(".toc").classList.add("toc-empty");
    }
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();

    // Newer / older
    const pager = document.getElementById("pager");
    if (pager) {
      const link = (q, label) => {
        const a = el("a", "pager-link");
        a.href = postUrl(q);
        a.append(el("span", "label", label), el("span", "post-title", q.title));
        return a;
      };
      if (posts[idx + 1]) pager.append(link(posts[idx + 1], "← Older"));
      if (posts[idx - 1]) { const n = link(posts[idx - 1], "Newer →"); n.classList.add("next"); pager.append(n); }
    }
  }

  const list = document.getElementById("posts");
  const article = document.getElementById("post");
  if (list) renderList(list).catch(() => emptyState(list));
  if (article) renderPost(article).catch(() => {
    article.replaceChildren(el("p", "label", "Couldn’t load this post. Try again in a minute."));
  });
})();
