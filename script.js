const intro = document.getElementById("intro");
const skipIntroButton = document.getElementById("skipIntro");
const projectsSection = document.getElementById("projects");
const backToTopButton = document.getElementById("backToTop");
const blobs = Array.from(document.querySelectorAll(".blob"));

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let introTimer;

const scrollToProjects = () => {
  projectsSection.scrollIntoView({ behavior: "smooth" });
};

const hideIntro = () => {
  intro.classList.add("is-hidden");
  intro.setAttribute("aria-hidden", "true");
  scrollToProjects();
};

const scheduleIntro = () => {
  const introDuration = prefersReducedMotion ? 800 : 6000;
  introTimer = window.setTimeout(hideIntro, introDuration);
};

skipIntroButton.addEventListener("click", () => {
  window.clearTimeout(introTimer);
  hideIntro();
});

scheduleIntro();

const blobState = blobs.map((blob, index) => ({
  element: blob,
  baseX: blob.offsetLeft,
  baseY: blob.offsetTop,
  speed: 0.0006 + index * 0.00015,
  offset: index * 2,
}));

let start = null;

const animateBlobs = (timestamp) => {
  if (prefersReducedMotion) return;
  if (!start) start = timestamp;
  const elapsed = timestamp - start;

  blobState.forEach((blob) => {
    const drift = Math.sin(elapsed * blob.speed + blob.offset) * 40;
    const driftY = Math.cos(elapsed * blob.speed + blob.offset) * 30;
    const scale = 1 + Math.sin(elapsed * blob.speed + blob.offset) * 0.05;
    blob.element.style.transform = `translate(${drift}px, ${driftY}px) scale(${scale})`;
  });

  window.requestAnimationFrame(animateBlobs);
};

window.requestAnimationFrame(animateBlobs);

window.addEventListener("scroll", () => {
  const showButton = window.scrollY > 400;
  backToTopButton.classList.toggle("is-visible", showButton);
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
