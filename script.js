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

// ── GitHub Repos ──
const GITHUB_USER = 'Harshitaonweb';
const BORDER_COLORS = ['card-border-red', 'card-border-blue', 'card-border-yellow'];

async function loadRepos() {
  const grid = document.getElementById('projectsGrid');
  try {
    // Fetch latest repos + Weather-App in parallel
    const [reposRes, weatherRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`),
      fetch(`https://api.github.com/repos/${GITHUB_USER}/Weather-App`)
    ]);

    let repos = await reposRes.json();
    const weatherRepo = weatherRes.ok ? await weatherRes.json() : null;

    // Remove reactpractice, ensure Weather-App is included
    repos = repos.filter(r => r.name.toLowerCase() !== 'reactpractice');

    if (weatherRepo && !repos.find(r => r.name === weatherRepo.name)) {
      repos.unshift(weatherRepo); // add at front if not already present
    }

    repos = repos.slice(0, 6);

    grid.innerHTML = repos.map((repo, i) => {
      const border = BORDER_COLORS[i % 3];
      const dot = repo.fork ? 'dot-grey' : 'dot-green';
      const lang = repo.language || 'HTML';
      const desc = repo.description || 'A web development project.';
      const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      return `
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-card ${border}">
          <div class="card-header">
            <span class="card-title">${repo.name}</span>
            <span class="status-dot ${dot}"></span>
          </div>
          <p class="card-desc">${desc}</p>
          <div class="card-tags">
            <span class="pill">${lang}</span>
            ${repo.stargazers_count > 0 ? `<span class="pill">★ ${repo.stargazers_count}</span>` : ''}
            <span class="pill">${updated}</span>
          </div>
        </a>`;
    }).join('');

  } catch (err) {
    grid.innerHTML = `<p style="padding:24px;font-weight:700;">Could not load repos. <a href="https://github.com/${GITHUB_USER}" target="_blank">View on GitHub →</a></p>`;
  }
}

loadRepos();
