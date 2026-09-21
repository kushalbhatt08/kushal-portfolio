const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reveal content once, as it enters the viewport.
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Highlight the current section in the sticky navigation.
const navLinks = [...document.querySelectorAll('.main-nav a')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach((section) => activeObserver.observe(section));
}

// If an optional image is missing, hide its media area cleanly instead of showing a broken-image icon.
document.querySelectorAll('.project-image img, .featured-media img').forEach((img) => {
  img.addEventListener('error', () => {
    const media = img.closest('.project-image, .featured-media');
    if (media) {
      media.hidden = true;
      const featured = media.closest('.featured-project');
      if (featured) featured.classList.add('no-media');
    }
  });
});
