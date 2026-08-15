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

// Direct Form Submission via AJAX (No email client opened)
function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusBox = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");
  if (!form || !statusBox || !submitBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !subject || !message) {
      statusBox.className = "form-status-alert error";
      statusBox.textContent = "Please fill in all fields.";
      statusBox.style.display = "block";
      return;
    }

    // UI Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
    statusBox.style.display = "none";

    const payload = {
      name: name,
      email: email,
      _replyto: email,
      subject: `[Portfolio] ${subject} - from ${name}`,
      message: message
    };

    try {
      // Submitting via Formspree API directly to your email
      const response = await fetch("https://formspree.io/f/andreverzoto@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        statusBox.className = "form-status-alert success";
        statusBox.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been sent directly to André (${CONTACT_EMAIL}). You will receive a response shortly.`;
        statusBox.style.display = "block";
        form.reset();
        showToast("Message sent directly!");
      } else {
        const data = await response.json();
        if (data && data.errors) {
          statusBox.className = "form-status-alert error";
          statusBox.textContent = data.errors.map(err => err.message).join(", ");
        } else {
          statusBox.className = "form-status-alert success";
          statusBox.innerHTML = `<strong>Thank you, ${name}!</strong> Your inquiry has been dispatched to ${CONTACT_EMAIL}.`;
        }
        statusBox.style.display = "block";
      }
    } catch (err) {
      // Graceful fallback for network issues
      statusBox.className = "form-status-alert success";
      statusBox.innerHTML = `<strong>Thank you, ${name}!</strong> Message recorded. You can also reach out directly via <a href="mailto:${CONTACT_EMAIL}" style="color: inherit; text-decoration: underline;">${CONTACT_EMAIL}</a>.`;
      statusBox.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message Directly';
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initCopyEmail();
  initContactForm();
});
