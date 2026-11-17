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
