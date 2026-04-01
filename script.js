document.body.classList.add("js-enabled");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.querySelector(".fill")) {
          const fill = entry.target.querySelector(".fill");
          requestAnimationFrame(() => {
            fill.style.transform = `scaleX(${getComputedStyle(fill).getPropertyValue("--target")})`;
          });
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll(".reveal, .skill-bar")
  .forEach((el) => observer.observe(el));

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const scrollButton = document.querySelector(".scroll-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollButton.classList.add("show");
  } else {
    scrollButton.classList.remove("show");
  }
});

scrollButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".nav-links a");
const navigation = document.getElementById("primary-navigation");

const updateNavigationHidden = (isOpen) => {
  if (!navigation) return;
  if (window.innerWidth > 900) {
    navigation.removeAttribute("aria-hidden");
    return;
  }
  navigation.setAttribute("aria-hidden", (!isOpen).toString());
};

const closeMenu = () => {
  document.body.classList.remove("nav-open");
  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
  }
  updateNavigationHidden(false);
};

if (menuButton && navigation) {
  updateNavigationHidden(false);

  menuButton.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", isOpen.toString());
    updateNavigationHidden(isOpen);
    if (isOpen) {
      const firstLink = navigation.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 900 &&
      document.body.classList.contains("nav-open")
    ) {
      closeMenu();
    }
    updateNavigationHidden(document.body.classList.contains("nav-open"));
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      document.body.classList.contains("nav-open")
    ) {
      event.preventDefault();
      closeMenu();
      menuButton.focus();
    }
  });
}

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) {
      closeMenu();
    }
  }),
);

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.reset();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = "Thank you! I will get back to you shortly.";
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  });
}
