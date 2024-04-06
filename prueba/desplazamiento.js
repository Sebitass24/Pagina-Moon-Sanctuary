document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navbarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const targetOffset = targetSection.getBoundingClientRect().top;
        const scrollOffset = window.pageYOffset;
        const scrollAmount = targetOffset - scrollOffset;
        const duration = 1000;

        let startTime = null;
        const scrollStep = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          window.scrollTo(0, easeInOut(progress, scrollOffset, scrollAmount, duration));
          if (progress < duration) {
            window.requestAnimationFrame(scrollStep);
          }
        };

        window.requestAnimationFrame(scrollStep);
      }
    });
  });

  const easeInOut = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };
});
