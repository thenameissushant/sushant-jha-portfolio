/**
 * ============================================================================
 * SUSHANT JHA - DATA & MIS ANALYST PORTFOLIO
 * Main JavaScript: script.js
 * Plain JavaScript (ES6+), zero dependencies, runs directly in any browser
 * ============================================================================
 */

/**
 * ============================================================================
 * CONFIGURATION OBJECT (Single source of truth for all links & personal info)
 * Edit this object to update all contact links, URLs, and file references!
 * ============================================================================
 */
const CONFIG = {
  name: "Sushant Jha",
  title: "Data & MIS Analyst",
  tagline: "Turning complex raw data into automated business intelligence and actionable executive decisions.",
  email: "thenameissushant@gmail.com", // Your direct email address
  phone: "+91 98765 43210", // Your phone number (for tel: link)
  location: "Gurgaon, Haryana, India",
  linkedinUrl: "https://www.linkedin.com/in/sushant-jha", // Your LinkedIn Profile
  githubUrl: "https://github.com/sushant-jha", // Your GitHub Profile
  projectGithubUrl: "https://github.com/sushant-jha/emi-defaulter-automation", // Featured Project Repo
  liveDemoUrl: "", // If empty string ("") or "#", the "Live Demo" button is automatically hidden!
  resumeFile: "resume.pdf", // Place your resume PDF in the same folder as index.html
  profilePhoto: "profile.jpg" // Place your photo as profile.jpg (gradient circle with 'SJ' shows if missing)
};

/* ============================================================================
   INITIALIZATION & DOM CONTENT LOADED
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  applyConfig();
  initTypingEffect();
  initScrollEffects();
  initCounters();
  initSkillBars();
  initExperienceAccordion();
  initContactForm();
  initMobileNav();
  initButtonRipples();
});

/* ============================================================================
   APPLY CONFIG VALUES ACROSS THE DOM
   ============================================================================ */
function applyConfig() {
  // Update text content
  document.querySelectorAll("[data-config='name']").forEach(el => {
    el.textContent = CONFIG.name;
  });
  document.querySelectorAll("[data-config='title']").forEach(el => {
    el.textContent = CONFIG.title;
  });
  document.querySelectorAll("[data-config='location']").forEach(el => {
    el.textContent = CONFIG.location;
  });

  // Dynamic Year in footer
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Update Resume Links
  const resumeLinks = document.querySelectorAll(".btn-resume");
  resumeLinks.forEach(link => {
    link.setAttribute("href", CONFIG.resumeFile);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  // Update Email Links & text
  const emailLinks = document.querySelectorAll("a[data-config='email']");
  emailLinks.forEach(link => {
    link.setAttribute("href", `mailto:${CONFIG.email}`);
  });
  const emailTexts = document.querySelectorAll(".config-email-text");
  emailTexts.forEach(el => {
    el.textContent = CONFIG.email;
  });

  // Update Phone Links & text
  const phoneLinks = document.querySelectorAll("a[data-config='phone']");
  phoneLinks.forEach(link => {
    const cleanPhone = CONFIG.phone.replace(/[^+\d]/g, "");
    link.setAttribute("href", `tel:${cleanPhone}`);
  });
  const phoneTexts = document.querySelectorAll(".config-phone-text");
  phoneTexts.forEach(el => {
    el.textContent = CONFIG.phone;
  });

  // Update Social Links (LinkedIn & GitHub)
  const linkedinLinks = document.querySelectorAll("a[data-config='linkedin']");
  linkedinLinks.forEach(link => {
    link.setAttribute("href", CONFIG.linkedinUrl);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  const githubLinks = document.querySelectorAll("a[data-config='github']");
  githubLinks.forEach(link => {
    link.setAttribute("href", CONFIG.githubUrl);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  // Update Project Links
  const projectGithubLink = document.getElementById("project-github-link");
  if (projectGithubLink) {
    projectGithubLink.setAttribute("href", CONFIG.projectGithubUrl);
    projectGithubLink.setAttribute("target", "_blank");
    projectGithubLink.setAttribute("rel", "noopener noreferrer");
  }

  // Handle Live Demo Button (Hide automatically if empty)
  const projectDemoLink = document.getElementById("project-demo-link");
  if (projectDemoLink) {
    if (!CONFIG.liveDemoUrl || CONFIG.liveDemoUrl.trim() === "" || CONFIG.liveDemoUrl === "#") {
      projectDemoLink.style.display = "none";
    } else {
      projectDemoLink.style.display = "inline-flex";
      projectDemoLink.setAttribute("href", CONFIG.liveDemoUrl);
      projectDemoLink.setAttribute("target", "_blank");
      projectDemoLink.setAttribute("rel", "noopener noreferrer");
    }
  }

  // Profile Photo Handling with Graceful Fallback
  const profileImg = document.getElementById("profile-image");
  const avatarFallback = document.getElementById("avatar-fallback");

  if (profileImg && avatarFallback) {
    // If no photo path provided, show fallback immediately
    if (!CONFIG.profilePhoto || CONFIG.profilePhoto.trim() === "") {
      profileImg.style.display = "none";
      avatarFallback.style.display = "flex";
    } else {
      profileImg.src = CONFIG.profilePhoto;
      profileImg.alt = `${CONFIG.name} - ${CONFIG.title}`;

      // Handle loading error
      profileImg.onerror = () => {
        profileImg.style.display = "none";
        avatarFallback.style.display = "flex";
      };

      // Handle successful load
      profileImg.onload = () => {
        profileImg.style.display = "block";
        avatarFallback.style.display = "none";
      };
    }
  }
}

/* ============================================================================
   DAY & NIGHT THEME TOGGLE (Local Storage & System Preference)
   ============================================================================ */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const savedTheme = localStorage.getItem("portfolio-theme");

  // Determine initial theme
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = prefersDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", initialTheme);
    localStorage.setItem("portfolio-theme", initialTheme);
  }

  // Toggle button event listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const targetTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", targetTheme);
      localStorage.setItem("portfolio-theme", targetTheme);

      // Subtle haptic-style button animation
      themeToggleBtn.style.transform = "scale(0.9) rotate(25deg)";
      setTimeout(() => {
        themeToggleBtn.style.transform = "";
      }, 250);
    });
  }

  // Listen for system theme changes if user hasn't explicitly set preference
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("portfolio-theme-custom")) {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
    }
  });
}

/* ============================================================================
   HERO TYPING ANIMATION
   Cycles through: "Data Analyst", "MIS Specialist", "Python Automation"
   ============================================================================ */
function initTypingEffect() {
  const typedTarget = document.getElementById("typed-text");
  if (!typedTarget) return;

  const roles = [
    "Data Analyst",
    "MIS Specialist",
    "Python Automation",
    "Power BI Developer"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseAfterTyping = 2200;
  const pauseAfterDeleting = 500;

  function type() {
    const currentWord = roles[roleIdx];

    if (isDeleting) {
      typedTarget.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedTarget.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentWord.length) {
      delay = pauseAfterTyping;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = pauseAfterDeleting;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ============================================================================
   SCROLL EFFECTS: Progress Bar, Navbar Shadow, Reveal on Scroll & Back to Top
   ============================================================================ */
function initScrollEffects() {
  const progressBar = document.getElementById("scroll-progress");
  const navbar = document.querySelector(".navbar");
  const backToTopBtn = document.getElementById("back-to-top");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // 1. Top Scroll Progress Bar
    if (progressBar && scrollHeight > 0) {
      const progressPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    // 2. Navbar style on scroll
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // 3. Floating Back to Top Button
    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    // 4. Active Nav Link on Scroll
    let currentSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });

  // Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Smooth Scroll for internal nav links
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Reveal Animations on Scroll using IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add("active"));
  }
}

/* ============================================================================
   ANIMATED COUNTERS (About Section)
   ============================================================================ */
function initCounters() {
  const counterItems = document.querySelectorAll(".counter-number");
  if (!counterItems.length) return;

  let countersStarted = false;

  const startCounting = () => {
    if (countersStarted) return;
    countersStarted = true;

    counterItems.forEach(counter => {
      const targetStr = counter.getAttribute("data-target") || "0";
      const isRange = targetStr.includes("-");
      const hasPlus = targetStr.includes("+");

      if (isRange) {
        // Special format e.g. "1,500 - 2,000+"
        let current1 = 0;
        let current2 = 0;
        const target1 = 1500;
        const target2 = 2000;
        const duration = 1800;
        const steps = 60;
        const stepTime = duration / steps;
        const increment1 = target1 / steps;
        const increment2 = target2 / steps;

        const timer = setInterval(() => {
          current1 += increment1;
          current2 += increment2;
          if (current1 >= target1 && current2 >= target2) {
            counter.textContent = "1,500 - 2,000+";
            clearInterval(timer);
          } else {
            const formatted1 = Math.floor(current1).toLocaleString();
            const formatted2 = Math.floor(current2).toLocaleString();
            counter.textContent = `${formatted1} - ${formatted2}+`;
          }
        }, stepTime);
      } else {
        const targetNum = parseInt(targetStr.replace(/[^\d]/g, ""), 10);
        let current = 0;
        const duration = 1600;
        const steps = 40;
        const stepTime = duration / steps;
        const increment = targetNum / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNum) {
            counter.textContent = `${targetNum}${hasPlus ? "+" : ""}`;
            clearInterval(timer);
          } else {
            counter.textContent = `${Math.floor(current)}${hasPlus ? "+" : ""}`;
          }
        }, stepTime);
      }
    });
  };

  const counterSection = document.getElementById("about");
  if (counterSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounting();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(counterSection);
  } else {
    startCounting();
  }
}

/* ============================================================================
   ANIMATED SKILL PROGRESS BARS
   ============================================================================ */
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar-fill");
  if (!skillBars.length) return;

  const skillsSection = document.getElementById("skills");
  if (skillsSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const pct = bar.getAttribute("data-percent") || "0%";
            bar.style.width = pct;
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(skillsSection);
  } else {
    skillBars.forEach(bar => {
      bar.style.width = bar.getAttribute("data-percent") || "0%";
    });
  }
}

/* ============================================================================
   EXPERIENCE SECTION: ACCORDION EXPAND / COLLAPSE
   ============================================================================ */
function initExperienceAccordion() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  
  timelineItems.forEach((item, index) => {
    const header = item.querySelector(".timeline-card-header");
    if (!header) return;

    // Expand the first one (Religare Finvest Ltd) by default
    if (index === 0) {
      item.classList.add("expanded");
      header.setAttribute("aria-expanded", "true");
    } else {
      header.setAttribute("aria-expanded", "false");
    }

    header.addEventListener("click", () => {
      const isExpanded = item.classList.contains("expanded");

      // Optional: keep independent or collapse others
      // Here we toggle current
      if (isExpanded) {
        item.classList.remove("expanded");
        header.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("expanded");
        header.setAttribute("aria-expanded", "true");
      }
    });

    // Keyboard Accessibility (Enter or Spacebar)
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        header.click();
      }
    });
  });
}

/* ============================================================================
   CONTACT FORM & QUICK COPY EMAIL
   ============================================================================ */
function initContactForm() {
  const form = document.getElementById("portfolio-contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("form-name");
      const emailInput = document.getElementById("form-email");
      const subjectInput = document.getElementById("form-subject");
      const messageInput = document.getElementById("form-message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const subject = subjectInput ? subjectInput.value.trim() : `Portfolio Contact from ${name || "Visitor"}`;
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name || !email || !message) {
        showToast("Please fill in your name, email, and message.");
        return;
      }

      // Build mailto URI
      const emailBody = `Hi Sushant,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A---%0D%0ASender Name: ${encodeURIComponent(name)}%0D%0ASender Email: ${encodeURIComponent(email)}`;
      const mailtoUrl = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${emailBody}`;

      // Open email client
      window.location.href = mailtoUrl;

      showToast("Opening your email client to send message...");
      form.reset();
    });
  }

  // Copy Email to Clipboard
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(CONFIG.email).then(() => {
          showToast("Email address copied to clipboard!");
        }).catch(() => {
          fallbackCopyText(CONFIG.email);
        });
      } else {
        fallbackCopyText(CONFIG.email);
      }
    });
  }
}

function fallbackCopyText(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand("copy");
    showToast("Email address copied to clipboard!");
  } catch (err) {
    showToast(`Failed to copy: ${text}`);
  }
  document.body.removeChild(tempInput);
}

// Slick Toast Notification
function showToast(message) {
  let toast = document.getElementById("site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "site-toast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #10b981;">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* ============================================================================
   MOBILE NAVIGATION DRAWER & OVERLAY
   ============================================================================ */
function initMobileNav() {
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navOverlay = document.getElementById("nav-overlay");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!hamburger || !navMenu) return;

  function toggleNav() {
    const isOpen = hamburger.classList.contains("is-active");
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  function openNav() {
    hamburger.classList.add("is-active");
    hamburger.setAttribute("aria-expanded", "true");
    navMenu.classList.add("open");
    if (navOverlay) navOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    hamburger.classList.remove("is-active");
    hamburger.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("open");
    if (navOverlay) navOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", toggleNav);
  if (navOverlay) navOverlay.addEventListener("click", closeNav);

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  // Close with Esc key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      closeNav();
    }
  });
}

/* ============================================================================
   BUTTON RIPPLE EFFECT
   ============================================================================ */
function initButtonRipples() {
  const buttons = document.querySelectorAll(".btn, .theme-toggle, .social-icon-btn");
  
  buttons.forEach(button => {
    button.addEventListener("click", function(e) {
      const circle = document.createElement("span");
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      const rect = this.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("ripple");

      const existingRipple = this.querySelector(".ripple");
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 600);
    });
  });
}
