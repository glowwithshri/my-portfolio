document.addEventListener("DOMContentLoaded", () => {
  // Resume download (unchanged)
  const downloadBtn = document.querySelector(".btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const link = document.createElement("a");
      link.href = "assets/Dhanashri_Resume.pdf";
      link.download = "Dhanashri_Resume.pdf";
      link.click();
    });
  }

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  // Click handlers: smooth scroll + replaceState (no new history entry)
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Only intercept same-page anchors (href="#..."), otherwise allow normal navigation
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      // Update URL to show the hash but DO NOT push a new history entry

      // Smooth scroll
      target.scrollIntoView({ behavior: "smooth" });

      // Update URL to show the hash but DO NOT push a new history entry

      // Update active class immediately
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // If page loads with a hash, scroll to it (without creating extra history)
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      // small timeout so layout is ready
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  // Active link update on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120; // tweak offset as needed
      if (pageYOffset >= top && pageYOffset < top + section.offsetHeight) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === `#${current}`);
    });
  });
});
