// Always open and refresh the page at the top instead of restoring an old scroll position.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

window.addEventListener("load", () => {
  window.scrollTo(0, 0);

  // Hide the intro after the loading animation.
  window.setTimeout(() => {
    document.querySelector(".intro-screen")?.classList.add("is-hidden");
    window.scrollTo(0, 0);
  }, 2800);
});

// Keep every data-silent video permanently muted.
document.querySelectorAll("video[data-silent]").forEach((video) => {
  const enforceMute = () => {
    video.muted = true;
    video.volume = 0;
  };

  enforceMute();
  video.addEventListener("volumechange", enforceMute);
  video.addEventListener("play", enforceMute);
});

// Smooth custom cursor for desktop/pointer devices.
const finePointer = window.matchMedia("(pointer: fine)").matches;
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

if (finePointer && dot && ring) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.querySelectorAll("a, button, video, model-viewer, figure").forEach((element) => {
    element.addEventListener("mouseenter", () => ring.classList.add("is-hovering"));
    element.addEventListener("mouseleave", () => ring.classList.remove("is-hovering"));
  });
}

// Reveal project cards as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
