// Remove o service worker do portfólio antigo, se ainda estiver registrado
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then((regs) => regs.forEach((reg) => reg.unregister()))
    .catch(() => {});
}

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
  // Cada mancha: cor RGB, posição relativa, raio e velocidade da deriva
  const blobs = [
    { c: [247, 160, 205], a: 0.95, x: 0.42, y: 0.62, r: 0.34, sx: 0.00021, sy: 0.00016 }, // rosa
    { c: [205, 186, 238], a: 0.85, x: 0.60, y: 0.58, r: 0.24, sx: 0.00017, sy: 0.00022 }, // lavanda
    { c: [250, 205, 170], a: 0.80, x: 0.86, y: 0.30, r: 0.30, sx: 0.00013, sy: 0.00018 }, // pêssego
    { c: [200, 228, 210], a: 0.70, x: 0.24, y: 0.12, r: 0.22, sx: 0.00019, sy: 0.00012 }, // menta
    { c: [242, 170, 211], a: 0.75, x: 0.88, y: 0.82, r: 0.26, sx: 0.00011, sy: 0.00024 }, // chiclete
    { c: [248, 220, 163], a: 0.55, x: 0.10, y: 0.85, r: 0.22, sx: 0.00015, sy: 0.00014 }, // manteiga
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
      const [r, gr, bl] = b.c;
      g.addColorStop(0, `rgba(${r},${gr},${bl},${b.a})`);
      g.addColorStop(0.5, `rgba(${r},${gr},${bl},${b.a * 0.45})`);
      g.addColorStop(1, `rgba(${r},${gr},${bl},0)`);
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
