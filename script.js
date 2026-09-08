// ===== DESTACAR LINK DO MENU CONFORME A ROLAGEM =====
// Quando o usuário rola a página, detectamos qual seção está visível
// e marcamos o item do menu correspondente.

const linksDoMenu = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let rolagemAtual = window.scrollY;

  linksDoMenu.forEach((link) => {
    // o href do link é o id da seção, ex: "#sobre" -> elemento com id="sobre"
    const idDaSecao = link.getAttribute('href');
    const secao = document.querySelector(idDaSecao);

    if (!secao) return;

    const topo = secao.offsetTop - 120; // margem para compensar o menu fixo
    const base = topo + secao.offsetHeight;

    link.classList.toggle('ativo', rolagemAtual >= topo && rolagemAtual < base);
  });
});