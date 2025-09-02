// Smooth scrolling
document.querySelectorAll(".topnav a").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// Full-page parallax (no images). Works on mobile too.
(function () {
  const layers = Array.from(document.querySelectorAll("[data-parallax]"));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || layers.length === 0) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        for (const el of layers) {
          const speed = parseFloat(el.dataset.speed || "0.2");
          // Use translate3d for GPU acceleration
          el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // initial position
})();
