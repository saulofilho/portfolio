// Menu mobile
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

// Gradiente difuso do hero
(function () {
  const canvas = document.getElementById("glow");
  const ctx = canvas.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const color = (name) => getComputedStyle(root).getPropertyValue(name).trim();
  const blobs = [
    { v: "--glow-a", x: 0.62, y: 0.55, r: 0.36, sx: 0.00023, sy: 0.00017 },
    { v: "--glow-b", x: 0.78, y: 0.32, r: 0.30, sx: 0.00015, sy: 0.00021 },
    { v: "--glow-c", x: 0.90, y: 0.78, r: 0.26, sx: 0.00019, sy: 0.00013 },
    { v: "--glow-a", x: 0.35, y: 0.18, r: 0.20, sx: 0.00011, sy: 0.00025 },
  ];
  let visible = true;

  function resize() {
    canvas.width = Math.max(1, canvas.clientWidth / 2);
    canvas.height = Math.max(1, canvas.clientHeight / 2);
  }

  function draw(t) {
    const { width: w, height: h } = canvas;
    const m = Math.max(w, h);
    ctx.clearRect(0, 0, w, h);
    for (const b of blobs) {
      const x = (b.x + Math.sin(t * b.sx) * 0.08) * w;
      const y = (b.y + Math.cos(t * b.sy) * 0.1) * h;
      const g = ctx.createRadialGradient(x, y, 0, x, y, b.r * m);
      g.addColorStop(0, color(b.v));
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
    if (!reduce && visible) requestAnimationFrame(draw);
  }

  new IntersectionObserver(([entry]) => {
    const was = visible;
    visible = entry.isIntersecting;
    if (visible && !was && !reduce) requestAnimationFrame(draw);
  }).observe(canvas);

  resize();
  addEventListener("resize", resize);
  draw(0);
})();
