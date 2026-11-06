(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  };
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(expanded));
    nav.classList.toggle('open', expanded);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let count = 0;
      document.querySelectorAll('[data-category]').forEach(item => {
        item.hidden = filter !== 'all' && item.dataset.category !== filter;
        if (!item.hidden) count += 1;
      });
      document.querySelectorAll('.filter').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      const moreHeading = document.querySelector('.more-work-heading');
      if (moreHeading) moreHeading.hidden = ![...document.querySelectorAll('.case-row')].some(item => !item.hidden);
      const status = document.querySelector('#filter-status');
      if (status) status.textContent = `${button.textContent.trim()} 사례 ${count}개`;
    });
  });
})();
