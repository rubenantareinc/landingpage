// ---- Typewriter (Hero + Intro) ----
(function () {
  const phrases = [
    "Feel free to explore.",
    "Check out my projects.",
    "Let’s build something ambitious."
  ];

  function startTypewriter(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeSpeed = 45;
    const deleteSpeed = 28;
    const endPause = 1000;
    const startPause = 250;

    function tick() {
      const current = phrases[phraseIndex];

      if (!deleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, endPause);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, startPause);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }

    tick();
  }

  // Start both (intro + hero)
  startTypewriter("introTypewriter");
  startTypewriter("typewriter");
})();

// ---- Intro overlay skip / auto-hide ----
(function () {
  const intro = document.getElementById("intro");
  const skipBtn = document.getElementById("skipIntro");

  if (!intro || !skipBtn) return;

  function hideIntro() {
    intro.setAttribute("aria-hidden", "true");
    intro.classList.add("intro--hidden");
  }

  skipBtn.addEventListener("click", hideIntro);

  // auto-hide after 5.5 seconds (unless user clicks)
  setTimeout(() => {
    if (intro.getAttribute("aria-hidden") === "false") hideIntro();
  }, 5500);
})();

// ---- Back to top button ----
(function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  function onScroll() {
    if (window.scrollY > 300) btn.classList.add("back-to-top--visible");
    else btn.classList.remove("back-to-top--visible");
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
