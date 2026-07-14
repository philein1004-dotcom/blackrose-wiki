(() => {
  const body = document.body;
  const base = body.dataset.baseurl || '';
  const input = document.getElementById('site-search');
  const results = document.getElementById('search-results');
  const sidebar = document.querySelector('[data-sidebar]');
  const menuButton = document.querySelector('[data-menu-button]');
  let index = [];

  fetch(`${base}/search.json`)
    .then((response) => response.ok ? response.json() : [])
    .then((data) => { index = data; })
    .catch(() => { index = []; });

  function closeResults() {
    results.hidden = true;
    results.innerHTML = '';
  }

  input?.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) return closeResults();

    const matches = index.filter((item) => {
      const haystack = `${item.title} ${item.category} ${item.keywords} ${item.excerpt}`.toLowerCase();
      return haystack.includes(query);
    }).slice(0, 8);

    if (!matches.length) {
      results.innerHTML = '<div class="search-result"><small>일치하는 기록이 없습니다.</small></div>';
      results.hidden = false;
      return;
    }

    results.innerHTML = matches.map((item) => `
      <a class="search-result" href="${base}${item.url}">
        <b>${item.title}</b>
        <small>${item.category} · ${item.excerpt}</small>
      </a>
    `).join('');
    results.hidden = false;
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-wrap')) closeResults();
  });

  menuButton?.addEventListener('click', () => sidebar?.classList.toggle('open'));
  sidebar?.addEventListener('click', (event) => {
    if (event.target.closest('a')) sidebar.classList.remove('open');
  });
})();
