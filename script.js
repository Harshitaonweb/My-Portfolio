// ── Scroll Parallax ──
const plane = document.getElementById('tiltedPlane');

function updateTilt() {
  const scrollY = window.scrollY;
  const rx = Math.max(0, 12 - scrollY * 0.015);
  const ry = -8 + scrollY * 0.01;
  plane.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(1deg)`;
}

window.addEventListener('scroll', updateTilt, { passive: true });
updateTilt();

// ── Projects (hardcoded) ──
const PROJECTS = [
  {
    name: 'My-Portfolio',
    desc: 'Personal portfolio built with a Bauhaus-inspired design system — 3D tilted stage, hard shadows, and primary colors.',
    lang: 'CSS',
    url: 'https://github.com/Harshitaonweb/My-Portfolio',
    dot: 'dot-green'
  },
  {
    name: 'Flappy-Bird-Game',
    desc: 'A browser-based Flappy Bird clone built with vanilla JavaScript and HTML Canvas.',
    lang: 'JavaScript',
    url: 'https://github.com/Harshitaonweb/flappy-bird-game',
    dot: 'dot-green'
  },
  {
    name: 'Password Generator',
    desc: 'Generates strong, customizable passwords with options for length, symbols, numbers, and case.',
    lang: 'JavaScript',
    url: 'https://github.com/Harshitaonweb/PasswordGenerator',
    dot: 'dot-green'
  },
  {
    name: 'Weather App',
    desc: 'Real-time weather app using a public API — search any city and get live temperature, humidity, and conditions.',
    lang: 'CSS',
    url: 'https://github.com/Harshitaonweb/Weather-App',
    dot: 'dot-green'
  },
  {
    name: 'Stone Paper Scissor',
    desc: 'Classic rock-paper-scissors game with score tracking and animated results, built in vanilla JS.',
    lang: 'JavaScript',
    url: 'https://github.com/Harshitaonweb/StonePaperScissor_game',
    dot: 'dot-green'
  },
  {
    name: 'Tic Tac Toe',
    desc: 'Two-player Tic Tac Toe game with win detection, draw handling, and a reset button.',
    lang: 'JavaScript',
    url: 'https://github.com/Harshitaonweb/TicTacToe_Game',
    dot: 'dot-green'
  }
];

const BORDER_COLORS = ['card-border-red', 'card-border-blue', 'card-border-yellow'];

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <a href="${p.url}" target="_blank" rel="noopener" class="project-card ${BORDER_COLORS[i % 3]}">
      <div class="card-header">
        <span class="card-title">${p.name}</span>
        <span class="status-dot ${p.dot}"></span>
      </div>
      <p class="card-desc">${p.desc}</p>
      <div class="card-tags">
        <span class="pill">${p.lang}</span>
        <span class="pill">HTML</span>
      </div>
    </a>
  `).join('');
}

renderProjects();
