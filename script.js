// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Tabs (Expertise section)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');

    tabButtons.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    tabPanels.forEach(panel => {
      if (panel.getAttribute('data-panel') === target) {
        panel.hidden = false;
        panel.classList.add('is-active');
      } else {
        panel.hidden = true;
        panel.classList.remove('is-active');
      }
    });
  });
});

// Contact form -> mailto
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim() || 'Portfolio contact';
    const message = document.getElementById('cf-message').value.trim();

    const body = `Hi Kushal,\n\n${message}\n\n— ${name} (${email})`;
    const mailto = `mailto:bhattkushal72@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    formNote.hidden = false;
  });
}
