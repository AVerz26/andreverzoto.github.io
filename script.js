// Modern Academic Portfolio Script

const CONTACT_EMAIL = "andreverzoto@gmail.com";

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Dark / Light Theme Toggle
function initThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle");
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = activeTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeIcon(nextTheme);
  });
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById("theme-toggle");
  if (!themeBtn) return;
  themeBtn.innerHTML = theme === "dark" 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
}

// Copy email to clipboard
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
      showToast("Email copied to clipboard");
    }).catch(() => {
      showToast("Email: " + CONTACT_EMAIL);
    });
  });
}

// Handle contact form submission
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!message) return;

    const emailSubject = encodeURIComponent(`[Inquiry] ${subject} - ${name}`);
    const emailBody = encodeURIComponent(
      `Hi André,\n\nMy name is ${name}.\n\nMessage:\n${message}\n\n---\nSent from your portfolio contact form.`
    );

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
    
    window.location.href = mailtoUrl;
    showToast("Opening email client...");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initCopyEmail();
  initContactForm();
});
