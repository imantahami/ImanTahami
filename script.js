const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.querySelector('.fill')) {
          const fill = entry.target.querySelector('.fill');
          requestAnimationFrame(() => {
            fill.style.transform = `scaleX(${getComputedStyle(fill).getPropertyValue('--target')})`;
          });
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal, .skill-bar').forEach(el => observer.observe(el));

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const scrollButton = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollButton.classList.add('show');
  } else {
    scrollButton.classList.remove('show');
  }
});

scrollButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  contactForm.reset();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = 'Thank you! I will get back to you shortly.';
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
});
