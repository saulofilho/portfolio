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

// Color button: cycles through palettes and remembers the choice
(function () {
  const themes = [
    ["paper", "Paper", "#ffffff"],
    ["lime", "Lime", "#D7FF3C"],
    ["cobalt", "Cobalt", "#2340FF"],
    ["bubblegum", "Bubblegum", "#FFB8DE"],
    ["tomato", "Tomato", "#FF5232"],
    ["mint", "Mint", "#A9F2D4"],
    ["grape", "Grape", "#5A2BD8"],
  ];
  const btn = document.getElementById("theme-btn");
  const name = document.getElementById("theme-name");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!btn) return;
  const root = document.documentElement;
  let i = Math.max(0, themes.findIndex(([id]) => id === (root.dataset.theme || "paper")));

  function apply() {
    const [id, label, color] = themes[i];
    if (id === "paper") delete root.dataset.theme; else root.dataset.theme = id;
    name.textContent = label;
    btn.setAttribute("aria-label", `Change colors (now ${label})`);
    if (meta) meta.content = color;
  }
  btn.addEventListener("click", () => {
    i = (i + 1) % themes.length;
    apply();
    try { localStorage.setItem("theme", themes[i][0]); } catch (_) {}
  });
  apply();
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
