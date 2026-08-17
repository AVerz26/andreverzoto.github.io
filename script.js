// André Verzoto — Portfolio Script

const CONTACT_EMAIL = "andreverzoto@gmail.com";

// ============================================================
// STARFIELD CANVAS — subtle milky way
// ============================================================
function initStarfield() {
  const canvas = document.getElementById("star-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const section = canvas.parentElement;

  // Size canvas to section
  function resize() {
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // Star colors: mostly white, some warm amber, some cool blue
  const starColors = [
    "255,255,255",   // pure white
    "255,255,255",   // pure white (more weight)
    "255,255,255",   // pure white
    "255,248,230",   // warm ivory
    "230,240,255",   // cool blue-white
    "200,215,255",   // ice blue
    "255,230,190",   // amber
  ];

  // Generate stars
  const STAR_COUNT = 230;
  const stars = Array.from({ length: STAR_COUNT }, () => {
    // Milky way band: boost density diagonally (35%–65% y range, 25%–75% x range)
    const inBand = Math.random() < 0.38;
    const x = inBand
      ? 0.25 + Math.random() * 0.5  // x in 25–75%
      : Math.random();
    const y = inBand
      ? 0.32 + Math.random() * 0.36 // y in 32–68%
      : Math.random();

    const color = starColors[Math.floor(Math.random() * starColors.length)];
    const size  = inBand
      ? 0.3 + Math.random() * 0.6  // smaller in band
      : 0.3 + Math.random() * 1.0;

    const baseOpacity = inBand
      ? 0.20 + Math.random() * 0.45  // band stars a bit dimmer for density feel
      : 0.25 + Math.random() * 0.55;

    return {
      xRatio: x,
      yRatio: y,
      size,
      color,
      baseOpacity,
      opacity: baseOpacity,
      // twinkle params — slow, gentle
      twinkleSpeed: 0.0003 + Math.random() * 0.0006,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleAmount: 0.1 + Math.random() * 0.2,
    };
  });

  let animFrame;
  let lastTime = 0;

  function draw(now) {
    const dt = now - lastTime;
    lastTime = now;

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    stars.forEach((s) => {
      // Gentle twinkle oscillation
      s.twinklePhase += s.twinkleSpeed * dt;
      const twinkle = Math.sin(s.twinklePhase);
      s.opacity = Math.max(0.05, s.baseOpacity + twinkle * s.twinkleAmount);

      const px = s.xRatio * W;
      const py = s.yRatio * H;

      // Draw star as a soft radial point
      const grad = ctx.createRadialGradient(px, py, 0, px, py, s.size * 1.8);
      grad.addColorStop(0, `rgba(${s.color},${s.opacity})`);
      grad.addColorStop(0.5, `rgba(${s.color},${s.opacity * 0.4})`);
      grad.addColorStop(1, `rgba(${s.color},0)`);

      ctx.beginPath();
      ctx.arc(px, py, s.size * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    animFrame = requestAnimationFrame(draw);
  }

  animFrame = requestAnimationFrame(draw);

  // Pause when hero not visible (perf)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animFrame = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animFrame);
      }
    });
  });
  observer.observe(section);
}



// ============================================================
// TYPING EFFECT
// ============================================================
function initTypingEffect() {
  const target = document.getElementById("typing-text");
  if (!target) return;

  const phrases = [
    "Data Specialist",
    "Python Developer",
    "Automation Engineer",
    "BI Consultant",
    "Web Scraping Expert",
  ];

  let phraseIndex = 0;
  // Start with first phrase already fully typed
  let charIndex = phrases[0].length;
  let isDeleting = false;
  target.textContent = phrases[0];

  const TYPING_SPEED    = 65;
  const DELETING_SPEED  = 35;
  const PAUSE_AFTER_WORD    = 2400; // stay readable before deleting
  const PAUSE_BEFORE_TYPE   = 320;  // brief breath before typing next

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      target.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_BEFORE_TYPE);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    } else {
      charIndex++;
      target.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_WORD);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    }
  }

  // Start cycling after the first phrase is read (no blank state)
  setTimeout(tick, 2800);
}

// ============================================================
// DARK / LIGHT THEME TOGGLE
// ============================================================
function initThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle");
  if (!themeBtn) return;

  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = saved || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener("click", () => {
    const active = document.documentElement.getAttribute("data-theme");
    const next = active === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.innerHTML = theme === "dark"
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// ============================================================
// SCROLL-BASED ANIMATIONS (fade-in sections)
// ============================================================
function initScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

// ============================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================
function initActiveNav() {
  const sections = document.querySelectorAll("section[id], div[id='projects']");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
}

// ============================================================
// COPY EMAIL TO CLIPBOARD
// ============================================================
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
      .then(() => showToast("Email copied to clipboard"))
      .catch(() => showToast("Email: " + CONTACT_EMAIL));
  });
}

// ============================================================
// CONTACT FORM SUBMISSION
// ============================================================
function initContactForm() {
  // Form uses FormSubmit.co via HTML action= attribute.
  // Native POST — no JS interception needed.
}


function showStatus(box, type, html) {
  box.className = `form-status-alert ${type}`;
  box.innerHTML = html;
  box.style.display = "block";
}

// ============================================================
// TOAST
// ============================================================
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 70; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initTypingEffect();
  initScrollAnimations();
  initActiveNav();
  initCopyEmail();
  initContactForm();
  initSmoothScroll();
});


