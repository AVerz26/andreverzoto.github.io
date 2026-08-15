// --- Configuração Personalizável Inicial ---
// Você pode alterar o seu usuário do GitHub e informações aqui!
const GITHUB_USERNAME = "AVerz26"; // Coloque seu usuário do GitHub aqui

// Projetos em Destaque Manuais (com dados detalhados, tags e previews)
const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Quiz Interativo com Streamlit",
    description: "Aplicativo web completo para simulados e quizzes interativos, com persistência SQLite, feedback em tempo real e analytics de desempenho.",
    category: "python",
    tags: ["Python", "Streamlit", "SQLite", "DataViz"],
    repoUrl: "https://github.com/andrevasc/quiz_interativo_streamlit",
    demoUrl: "https://share.streamlit.io",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: 2,
    title: "TradeSim Pro | Simulador de Trading",
    description: "Plataforma de simulação financeira de alta performance para execução de ordens, análise de tendências de mercado e métricas KPI de portfólio.",
    category: "web",
    tags: ["JavaScript", "HTML5/CSS3", "Financial Tech", "Analytics"],
    repoUrl: "https://github.com/andrevasc",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Vibration & IoT Datalogger",
    description: "Sistema para coleta, processamento de sinais de vibração e telemetria de sensores industriais com dashboards dinâmicos.",
    category: "data",
    tags: ["Python", "IoT", "Signal Processing", "Data Science"],
    repoUrl: "https://github.com/andrevasc",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Bibliometria & Análise de Dados Científicos",
    description: "Pipeline analítico automatizado para extração de metadados, visualização de redes de coautoria e análise de tendências acadêmicas com PyBibX e R.",
    category: "data",
    tags: ["R", "Python", "Bibliometrix", "NLP"],
    repoUrl: "https://github.com/andrevasc",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Plataforma de Produtividade & Workouts",
    description: "Dashboard inteligente para monitoramento e predição de performance física com análise estatística e visualizações ricas.",
    category: "web",
    tags: ["TypeScript", "Next.js", "Chart.js", "TailwindCSS"],
    repoUrl: "https://github.com/andrevasc",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80",
    featured: false
  }
];

// Efeito de Digitação Dinâmica no Hero
const TYPING_PHRASES = [
  "Desenvolvedor Full Stack",
  "Especialista em Python & Dados",
  "Criador de Soluções Web Modernas",
  "Entusiasta de Open Source & Automação"
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTextElement = document.getElementById("typing-text");

function typeEffect() {
  if (!typingTextElement) return;
  const currentPhrase = TYPING_PHRASES[typeIndex];
  
  if (isDeleting) {
    typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 1800; // pausa no fim
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % TYPING_PHRASES.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

// Controle de Tema (Dark / Light)
const themeToggleBtn = document.getElementById("theme-toggle");
function initTheme() {
  const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio_theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  if (!themeToggleBtn) return;
  themeToggleBtn.innerHTML = theme === "dark" 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
}

// Renderização dos Projetos
let currentFilter = "all";
let searchQuery = "";
let allProjectsList = [...FEATURED_PROJECTS];

function renderProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  const filtered = allProjectsList.filter(proj => {
    const matchCategory = currentFilter === "all" || proj.category === currentFilter;
    const matchSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        proj.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.5;"></i>
        <h3>Nenhum projeto encontrado</h3>
        <p style="font-size: 0.95rem; margin-top: 6px;">Tente pesquisar por outro termo ou selecione a categoria 'Todos'.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(project => `
    <article class="project-card">
      <div class="project-preview">
        <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'" />
        ${project.featured ? `<span class="project-badge-featured"><i class="fas fa-star"></i> Destaque</span>` : ''}
      </div>
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-secondary">
            <i class="fab fa-github"></i> Código
          </a>
          ${project.demoUrl && project.demoUrl !== '#' ? `
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-primary">
              <i class="fas fa-external-link-alt"></i> Demo Ao Vivo
            </a>
          ` : `
            <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-primary">
              <i class="fas fa-info-circle"></i> Ver Detalhes
            </a>
          `}
        </div>
      </div>
    </article>
  `).join('');
}

// Busca direta da API do GitHub
async function fetchGitHubRepos(username) {
  if (!username) return;
  const syncBtn = document.getElementById("sync-btn");
  if (syncBtn) {
    syncBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
    syncBtn.disabled = true;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
    if (!res.ok) throw new Error("Usuário não encontrado");
    const repos = await res.json();

    const formattedRepos = repos
      .filter(r => !r.fork)
      .map(r => {
        let cat = "web";
        if (r.language === "Python" || r.language === "R") cat = "data";
        else if (r.language === "JavaScript" || r.language === "TypeScript" || r.language === "HTML" || r.language === "CSS") cat = "web";
        else if (r.language) cat = "python";

        const tags = [r.language || "Código", `⭐ ${r.stargazers_count}`];
        if (r.topics && r.topics.length) {
          tags.push(...r.topics.slice(0, 2));
        }

        return {
          id: r.id,
          title: r.name.replace(/[-_]/g, ' '),
          description: r.description || "Repositório open source no GitHub.",
          category: cat,
          tags: tags,
          repoUrl: r.html_url,
          demoUrl: r.homepage || "",
          image: `https://opengraph.githubassets.com/1/${username}/${r.name}`,
          featured: r.stargazers_count > 0
        };
      });

    if (formattedRepos.length > 0) {
      allProjectsList = formattedRepos;
      renderProjects();
      showToast(`✅ ${formattedRepos.length} repositórios sincronizados do GitHub!`);
      
      // Atualizar contadores de métricas
      const repoMetric = document.getElementById("metric-repos");
      if (repoMetric) repoMetric.textContent = repos.length + "+";
    }
  } catch (err) {
    showToast("⚠️ Não foi possível carregar os repositórios do GitHub. Usando destaques locais.");
    console.error(err);
  } finally {
    if (syncBtn) {
      syncBtn.innerHTML = 'Sincronizar';
      syncBtn.disabled = false;
    }
  }
}

// Toast Notificações
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// Copiar Email
function copyEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    showToast("📋 Email copiado para a área de transferência!");
  }).catch(() => {
    showToast("Email: " + email);
  });
}

// Inicializações de Eventos ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  typeEffect();
  renderProjects();

  // Evento Theme Toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Menu Mobile
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // Filtros de Categoria
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-category");
      renderProjects();
    });
  });

  // Campo de Pesquisa em Tempo Real
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderProjects();
    });
  }

  // Formulário de Sincronização com GitHub
  const syncForm = document.getElementById("sync-form");
  const githubUserInput = document.getElementById("github-username-input");
  if (syncForm && githubUserInput) {
    syncForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = githubUserInput.value.trim();
      if (user) {
        fetchGitHubRepos(user);
      }
    });
  }
});
