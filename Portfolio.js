/* =========================
   NAV: Mobile hamburger
========================= */
const nav = document.querySelector(".site-nav");
const hamburger = document.querySelector(".hamburger-menu");
const mobileLinks = document.querySelectorAll(".mobile-nav a");

function setNavOpen(isOpen) {
  nav.classList.toggle("is-open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
}

hamburger.addEventListener("click", () => {
  const isOpen = nav.classList.contains("is-open");
  setNavOpen(!isOpen);
});

/* Close menu after clicking a mobile link */
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => setNavOpen(false));
});

/* Close menu on scroll (mobile only) */
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 768 && nav.classList.contains("is-open")) {
    setNavOpen(false);
  }
});

/* Close menu if window resized to desktop */
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) setNavOpen(false);
});

/* =========================
   NAV: Smooth scrolling
   (desktop + mobile links)
========================= */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const section = document.querySelector(href);
    if (!section) return;

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });

    // If mobile nav is open, close it
    if (window.innerWidth <= 768) setNavOpen(false);
  });
});

/* =========================
   Page indicator (unchanged)
========================= */
function updateIndicator() {
  const sectionIds = ["#home", "#about", "#projects", "#contact"];
  const sections = sectionIds
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  const indicators = document.querySelectorAll(".indicator");
  const midPoint = window.innerHeight / 2;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const isActive = rect.top <= midPoint && rect.bottom >= midPoint;

    if (indicators[index]) {
      indicators[index].classList.toggle("active", isActive);
    }
  });
}

window.addEventListener("load", updateIndicator);
window.addEventListener("scroll", updateIndicator);

document.querySelectorAll(".indicator").forEach((dot) => {
  dot.addEventListener("click", () => {
    const target = dot.getAttribute("data-target");
    const section = document.querySelector(target);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  });
});
