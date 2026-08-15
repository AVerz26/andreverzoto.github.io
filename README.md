# 🚀 Portfólio de Projetos para GitHub Pages

Este é um template moderno, responsivo e de alta performance criado para você exibir seus projetos desenvolvidos (Python, Streamlit, Ciência de Dados, Web e muito mais) diretamente no **GitHub Pages**.

---

## 🌟 Funcionalidades Principais

- 🎨 **Design Moderno & Glassmorphism**: Visual escuro elegante com suporte a alternância de tema **Dark / Light** persistente (`localStorage`).
- ⚡ **Sincronização com a API do GitHub**: Você pode buscar seus repositórios públicos em tempo real diretamente pelo seu nome de usuário.
- 🔍 **Filtro & Busca em Tempo Real**: Filtre por categorias (Python & Backend, Dados, Web Full Stack) ou busque por palavras-chave.
- 📱 **100% Responsivo**: Layout otimizado para celulares, tablets e desktops.
- 📋 **Copiar Email com 1 Clique**: Feedback visual com toast notifications.
- ⌨️ **Efeito de Digitação Dinâmica**: Animação no cabeçalho destacando suas áreas de atuação.

---

## 📁 Estrutura dos Arquivos

```text
portfolio-github-pages/
├── index.html       # Estrutura principal da página (SEO, seções, layout)
├── style.css        # Folha de estilos (Design System, cores, glassmorphism)
├── script.js        # Lógica interativa (Filtros, busca, GitHub API, temas)
└── README.md        # Guia de publicação no GitHub Pages
```

---

## 🌐 Como Publicar no GitHub Pages (Passo a Passo)

### Método 1: Criando seu repositório de portfólio principal
1. Acesse o [GitHub](https://github.com) e crie um novo repositório chamado:
   ```text
   seu-usuario.github.io
   ```
   *(Substitua `seu-usuario` pelo seu nome de usuário do GitHub)*.
2. Faça o upload dos arquivos `index.html`, `style.css` e `script.js` na raiz da branch `main`.
3. Pronto! Em poucos segundos seu site estará acessível no endereço:
   👉 **`https://seu-usuario.github.io`**

---

### Método 2: Em um repositório qualquer (ex: `meu-portfolio`)
1. Crie um repositório no GitHub (ex: `portfolio-projetos`).
2. Envie os arquivos desta pasta para ele.
3. No GitHub, vá em **Settings** > **Pages** (no menu lateral esquerdo).
4. Em **Branch**, selecione `main` e a pasta `/ (root)`, e clique em **Save**.
5. Em 1 a 2 minutos seu link estará disponível em:
   👉 **`https://seu-usuario.github.io/portfolio-projetos`**

---

## ⚙️ Como Personalizar os Projetos e Informações

Abra o arquivo `script.js`:
- Altere `const GITHUB_USERNAME = "seu-usuario";` para o seu nome no GitHub.
- Na lista `FEATURED_PROJECTS`, você pode adicionar, remover ou editar qualquer projeto com imagem, links e descrição personalizada.

No arquivo `index.html`:
- Substitua `seu-email@exemplo.com` pelo seu endereço de e-mail real.
- Personalize os links das suas redes sociais (LinkedIn, GitHub).
