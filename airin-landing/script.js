const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelectorAll(".nav-links a");

if (toggle) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// Smooth scroll for in-page anchors
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  });
});
