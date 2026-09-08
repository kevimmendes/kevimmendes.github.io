// ========================================
// Portfólio Kévim Mendes - JavaScript
// ========================================

// === NAVBAR MUDA AO ROLAR ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// === MENU HAMBÚRGUER (CELULAR) ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// === LINK ATIVO NO MENU CONFORME A ROLAGEM ===
const sections = document.querySelectorAll('section[id], header[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset + 120;
  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link && scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// === EFEITO MÁQUINA DE ESCREVER (typewriter) ===
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const palavras = ['FiveM', 'Roblox', 'Python', 'e muito mais!'];
  let indicePalavra = 0;
  let indiceChar = 0;
  let apagando = false;

  function escrever() {
    const atual = palavras[indicePalavra];
    if (apagando) {
      typewriterEl.textContent = atual.substring(0, indiceChar - 1);
      indiceChar--;
    } else {
      typewriterEl.textContent = atual.substring(0, indiceChar + 1);
      indiceChar++;
    }

    let velocidade = 100;
    if (!apagando && indiceChar === atual.length) {
      velocidade = 2000; // pausa no fim da palavra
      apagando = true;
    } else if (apagando && indiceChar === 0) {
      apagando = false;
      indicePalavra = (indicePalavra + 1) % palavras.length;
      velocidade = 400;
    }
    setTimeout(escrever, velocidade);
  }
  escrever();
}

// === CONTADORES ANIMADOS (numbers do hero) ===
function animarContadores() {
  const contadores = document.querySelectorAll('.stat-number[data-target]');
  contadores.forEach((contador) => {
    const alvo = +contador.getAttribute('data-target');
    const duracao = 2000;
    const inicio = performance.now();

    function atualizar(agora) {
      const decorrido = agora - inicio;
      const progresso = Math.min(decorrido / duracao, 1);
      const suavizado = 1 - Math.pow(1 - progresso, 3); // acelera e desacelera
      contador.textContent = Math.floor(alvo * suavizado);
      if (progresso < 1) {
        requestAnimationFrame(atualizar);
      } else {
        contador.textContent = alvo;
      }
    }
    requestAnimationFrame(atualizar);
  });
}

const stats = document.querySelector('.hero-stats');
if (stats) {
  const obsStats = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          animarContadores();
          obsStats.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  obsStats.observe(stats);
}

// === REVELAR ELEMENTOS AO ROLAR ===
const elementosRevelados = document.querySelectorAll(
  '.section-header, .features-mini, .plans-grid, .contato-grid, .plan-card, .contato-card'
);
elementosRevelados.forEach((el) => el.classList.add('reveal'));

const obsReveal = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
elementosRevelados.forEach((el) => obsReveal.observe(el));

// === FUNDO DE PARTÍCULAS (canvas) ===
function criarParticulas() {
  const container = document.getElementById('particles-bg');
  if (!container) return;

  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function redimensionar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  redimensionar();
  window.addEventListener('resize', redimensionar);

  // partículas nas cores roxo, rosa e ciano (iguais ao site exemplo)
  const particulas = [];
  const quantidade = 60;
  const cores = ['168,85,247', '236,72,153', '34,211,238'];

  for (let i = 0; i < quantidade; i++) {
    particulas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      tamanho: Math.random() * 2 + 0.5,
      opacidade: Math.random() * 0.4 + 0.1,
      cor: cores[Math.floor(Math.random() * 3)],
    });
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // desenha a partícula
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.tamanho, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.cor}, ${p.opacidade})`;
      ctx.fill();

      // conecta partículas próximas com linhas
      particulas.forEach((p2, j) => {
        if (j <= i) return;
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${p.cor}, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(animar);
  }
  animar();
}
criarParticulas();