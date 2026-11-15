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
        <small>${item.spoiler ? '스포일러 포함 · 열람 전 확인 필요' : `${item.category} · ${item.excerpt}`}</small>
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

  // 스포일러 본문은 HTML 단계부터 hidden: JS가 지연돼도 먼저 노출되지 않는다.
  const spoilerGate = document.querySelector('[data-spoiler-gate]');
  const spoilerContent = document.querySelector('[data-spoiler-content]');
  const spoilerButton = document.querySelector('[data-spoiler-reveal]');
  if (spoilerGate && spoilerContent && spoilerButton) {
    // 같은 탭에서 같은 문서를 다시 열면 확인을 반복하지 않도록 세션 단위 기억.
    const storageKey = `blackrose-spoiler-v1:${location.pathname}`;
    const reveal = (remember) => {
      spoilerContent.hidden = false;
      spoilerGate.hidden = true;
      spoilerButton.setAttribute('aria-expanded', 'true');
      if (remember) {
        try { sessionStorage.setItem(storageKey, 'acknowledged'); } catch (_) { /* 브라우저 설정에 따라 차단 가능 */ }
      }
      if (location.hash) {
        try {
          const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
          if (target && spoilerContent.contains(target)) {
            target.scrollIntoView({ block: 'start' });
            return;
          }
        } catch (_) { /* 잘못된 해시 무시 */ }
      }
      spoilerContent.querySelector('article')?.focus({ preventScroll: true });
    };
    let acknowledged = false;
    try { acknowledged = sessionStorage.getItem(storageKey) === 'acknowledged'; } catch (_) { /* 저장소 접근 불가 */ }
    if (acknowledged) reveal(false);
    spoilerButton.addEventListener('click', () => reveal(true));
  }
})();
