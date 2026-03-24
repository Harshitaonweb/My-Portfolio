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
const DOT_COLORS = ['dot-green', 'dot-yellow', 'dot-grey'];

async function loadRepos() {
  const grid = document.getElementById('projectsGrid');
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`
    );
    if (!res.ok) throw new Error('GitHub API error');
    let repos = await res.json();

    // Replace reactpractice with Weather-App
    const hasReactPractice = repos.some(r => r.name.toLowerCase() === 'reactpractice');
    const hasWeatherApp = repos.some(r => r.name.toLowerCase() === 'weather-app');
    if (hasReactPractice && !hasWeatherApp) {
      const weatherRes = await fetch(`https://api.github.com/repos/${GITHUB_USER}/Weather-App`);
      if (weatherRes.ok) {
        const weatherRepo = await weatherRes.json();
        repos = repos.map(r => r.name.toLowerCase() === 'reactpractice' ? weatherRepo : r);
      }
    } else if (hasReactPractice) {
      repos = repos.filter(r => r.name.toLowerCase() !== 'reactpractice');
    }

    repos = repos.slice(0, 6);

    grid.innerHTML = repos.map((repo, i) => {
      const border = BORDER_COLORS[i % 3];
      const dot = repo.fork ? 'dot-grey' : (repo.pushed_at ? 'dot-green' : 'dot-yellow');
      const lang = repo.language || 'HTML';
      const desc = repo.description || 'A web development project.';
      const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      return `
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-card ${border}" style="text-decoration:none;color:inherit;">
          <div class="card-header">
            <span class="card-title">${repo.name}</span>
            <span class="status-dot ${dot}"></span>
          </div>
          <p class="card-desc">${desc}</p>
          <div class="card-tags">
            ${lang ? `<span class="pill">${lang}</span>` : ''}
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
