// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Sun-arc draw-in animation (hero signature element)
const sunDot = document.querySelector('#sun-dot');
const arcPath = document.querySelector('#arc-path');
if (sunDot && arcPath && arcPath.getTotalLength) {
  const len = arcPath.getTotalLength();
  let t = 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    function animateSun() {
      t += 0.0022;
      if (t > 1) t = 0;
      const point = arcPath.getPointAtLength(t * len);
      sunDot.setAttribute('cx', point.x);
      sunDot.setAttribute('cy', point.y);
      requestAnimationFrame(animateSun);
    }
    requestAnimationFrame(animateSun);
  } else {
    const point = arcPath.getPointAtLength(len * 0.5);
    sunDot.setAttribute('cx', point.x);
    sunDot.setAttribute('cy', point.y);
  }
}

// Demo contact form (static site — no backend wired up)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.querySelector('#form-status');
    const name = contactForm.querySelector('#cf-name').value.trim();
    status.textContent = `Thanks${name ? ', ' + name.split(' ')[0] : ''} — this form needs an email/CRM connection to actually send. Meanwhile, reach us directly at pyramidenterprisesloop@gmail.com or +91 89710 20807.`;
    status.classList.add('ok');
    contactForm.reset();
  });
}

// Footer year
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
