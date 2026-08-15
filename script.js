// Script Minimalista & Formal para Portfólio

const EMAIL_DESTINO = "andreverzoto@gmail.com";

// Função para exibir mensagem toast discreta
function showToast(mensagem) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = mensagem;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Copiar e-mail para a área de transferência
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(EMAIL_DESTINO).then(() => {
      showToast("E-mail copiado para a área de transferência");
    }).catch(() => {
      showToast("E-mail: " + EMAIL_DESTINO);
    });
  });
}

// Tratamento do Formulário de Contato Direto
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!message) return;

    const emailSubject = encodeURIComponent(`[Contato Portfólio] ${subject} - ${name}`);
    const emailBody = encodeURIComponent(
      `Olá André,\n\nMeu nome é ${name}.\n\nMensagem:\n${message}\n\n---\nEnviado através do formulário de contato do portfólio.`
    );

    // Abre o cliente de e-mail padrão do usuário já com o destinatário, assunto e corpo prontos
    const mailtoUrl = `mailto:${EMAIL_DESTINO}?subject=${emailSubject}&body=${emailBody}`;
    
    window.location.href = mailtoUrl;
    showToast("Abrindo seu aplicativo de e-mail...");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCopyEmail();
  initContactForm();
});
