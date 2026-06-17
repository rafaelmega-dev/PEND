(() => {
  const menuLinks = document.querySelectorAll('.menuLink');
  if (!menuLinks.length) return;

  // Apenas cards que são parte da lista/grid
  const cards = Array.from(document.querySelectorAll('.artigo-noticia'));

  function setActiveLink(clicked) {
    menuLinks.forEach((l) => l.classList.remove('ativo'));
    menuLinks.forEach((l) => l.setAttribute('aria-current', 'false'));

    clicked.classList.add('ativo');
    clicked.setAttribute('aria-current', 'page');
  }

  function applyFilter(filter) {
    cards.forEach((card) => {
      const categoria = card.getAttribute('data-categoria');
      const shouldShow = filter === 'todas' || filter === categoria;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      // Mantém comportamento padrão para páginas de contato
      const href = link.getAttribute('href') || '';
      if (href.includes('contato.html')) return;

      e.preventDefault();

      const filter = link.getAttribute('data-filter') || 'todas';
      setActiveLink(link);
      applyFilter(filter);
    });
  });

  // Estado inicial
  const initialActive = document.querySelector('.menuLink.ativo');
  const initialFilter = initialActive?.getAttribute('data-filter') || 'todas';
  setActiveLink(initialActive || menuLinks[0]);
  applyFilter(initialFilter);
})();

