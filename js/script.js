document.addEventListener("DOMContentLoaded", () => {
  // ---------------- FUNÇÃO PARA URL ----------------
  function siteBasePath() {
    if (location.hostname.includes("github.io")) {
      const parts = location.pathname.split("/").filter(Boolean);
      if (parts.length > 0) return `/${parts[0]}`;
    }
    return "";
  }

  function buildUrl(relativePath) {
    if (location.protocol === "file:") {
      const dir = location.pathname.substring(0, location.pathname.lastIndexOf("/"));
      return `file://${dir}/${relativePath}`;
    }
    const base = siteBasePath();
    return `${location.origin}${base}/${relativePath}`.replace(/([^:]\/)\/+/g, "$1");
  }

  // ---------------- CARRINHO ----------------
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  function atualizarQtdCarrinho() {
    const total = carrinho.reduce((acc, item) => acc + item.qtd, 0);
    const qtdCarrinho = document.getElementById("qtd-carrinho");
    if (qtdCarrinho) qtdCarrinho.textContent = total;
  }
  atualizarQtdCarrinho();

  document.querySelectorAll(".produto-card").forEach(card => {
    const addCarrinho = card.querySelector(".add-carrinho");

    addCarrinho?.addEventListener("click", () => {
      const produtoAtual = {
        nome: card.dataset.nome,
        preco: parseFloat(card.dataset.preco),
        img: buildUrl(card.dataset.img),
        qtd: 1
      };

      const indexExistente = carrinho.findIndex(p => p.nome === produtoAtual.nome);
      if (indexExistente > -1) {
        carrinho[indexExistente].qtd += 1;
      } else {
        carrinho.push({ ...produtoAtual });
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      atualizarQtdCarrinho();

      // Mensagem de confirmação (alert do Bootstrap)
      const mensagem = document.createElement("div");
      mensagem.className = "alert alert-success position-fixed top-0 end-0 m-3";
      mensagem.style.zIndex = "2000";
      mensagem.textContent = `${produtoAtual.nome} adicionado ao carrinho!`;

      document.body.appendChild(mensagem);
      setTimeout(() => mensagem.remove(), 2000);
    });
  });

  // ---------------- BOTÕES DE NAVEGAÇÃO ----------------
  document.getElementById("btn-carrinho")?.addEventListener("click", e => {
    e.preventDefault();
    window.location.href = buildUrl("PAGINAS/carrinho.html");
  });

  document.getElementById("btn-perfil")?.addEventListener("click", e => {
    e.preventDefault();
    window.location.href = buildUrl("PAGINAS/profile.html");
  });

  // ---------------- PESQUISA ----------------
  const input = document.getElementById("campo-pesquisa");
  const btnPesquisa = document.getElementById("pesquisa");
  const produtos = document.querySelectorAll(".produto-card");

  const msg = document.createElement("h1");
  msg.textContent = "Produto não encontrado.";
  msg.className = "text-center text-danger d-none";
  document.querySelector(".pesquisa-result")?.after(msg);

  function pesquisar() {
    const termo = input?.value.toLowerCase().trim();
    let encontrou = false;

    produtos.forEach(produto => {
      const nome = produto.dataset.nome.toLowerCase();
      if (!termo || nome.includes(termo)) {
        produto.classList.remove("d-none");
        if (nome.includes(termo)) encontrou = true;
      } else {
        produto.classList.add("d-none");
      }
    });

    msg.classList.toggle("d-none", !(termo && !encontrou));
  }

  btnPesquisa?.addEventListener("click", pesquisar);
  input?.addEventListener("keyup", e => {
    if (e.key === "Enter" || input.value.trim() === "") pesquisar();
  });

  // ---------------- NOTIFICAÇÕES ----------------
  const btn = document.getElementById("btn-notifications");
  const sidebar = document.getElementById("sidebar");

  btn?.addEventListener("click", () => {
    sidebar?.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (sidebar && btn && !sidebar.contains(e.target) && !btn.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  });
});
