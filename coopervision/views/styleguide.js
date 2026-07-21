/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/styleguide.js  ·  Catálogo "Componentes"
   ───────────────────────────────────────────────────────────────
   Orquestador del catálogo. Define utilidades compartidas en
   window.cpvSG y registra la vista /styleguide:
     · galería de cards (Fundamentos / Componentes / Pattern by View)
     · vista de detalle por entrada  (#/styleguide?c=<id>)
   Las entradas se registran desde sg-foundations / sg-components /
   sg-patterns vía cpvSG.reg({...}).
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Namespace + utilidades compartidas ─────────────────────── */
  var SG = (window.cpvSG = window.cpvSG || {});
  SG.list = SG.list || [];

  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  SG.enc = enc;

  /* reg({ id, group, cat, title, desc, file, preview, detail }) */
  SG.reg = function (entry) { SG.list.push(entry); };

  /* ── Helpers de maquetación para las vistas de detalle ──────── */
  // Panel con etiqueta superior que enmarca un demo en vivo.
  SG.stage = function (label, bodyHTML, tight) {
    return '<div class="sg-stage">' +
      (label ? '<div class="sg-stage-label">' + enc(label) + '</div>' : '') +
      '<div class="sg-stage-body' + (tight ? ' is-tight' : '') + '">' + bodyHTML + '</div>' +
    '</div>';
  };
  // Bloque temático dentro del detalle (título + nota + contenido).
  SG.block = function (title, note, html) {
    return '<div class="sg-block">' +
      '<div class="sg-block-head">' +
        '<span class="sg-block-title">' + enc(title) + '</span>' +
        (note ? '<span class="sg-block-note">' + enc(note) + '</span>' : '') +
      '</div>' + html +
    '</div>';
  };
  // Muestra etiquetada (caption monoespaciada debajo del componente).
  SG.sample = function (cap, html) {
    return '<div class="sg-sample">' + html +
      (cap ? '<span class="sg-sample-cap">' + enc(cap) + '</span>' : '') + '</div>';
  };
  SG.samples = function (arr) {
    return '<div class="sg-samples">' + arr.join('') + '</div>';
  };
  // Tabla de especificación (filas [token, valor, uso]).
  SG.spec = function (head, rows) {
    return '<table class="sg-spec"><thead><tr>' +
      head.map(function (h) { return '<th>' + enc(h) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
      }).join('') +
    '</tbody></table>';
  };

  /* ════ Metadatos de secciones / categorías ════════════════════ */
  var GROUPS = [
    { key: 'fundamentos', title: 'Fundamentos', sub: 'tokens hechos visibles — color, tipografía, espaciado, iconos, elevación' },
    { key: 'componentes', title: 'Componentes', sub: 'cada componente con todas sus variantes funcionales' },
    { key: 'patterns',    title: 'Pattern by View', sub: 'componentes del catálogo usados en contexto de vista' },
  ];
  var CAT_ORDER = [
    'Acciones', 'Feedback y estado', 'Formularios', 'Contenedores',
    'Navegación', 'Datos y visualización', 'Marcadores y mapa',
  ];

  function byId(id) {
    for (var i = 0; i < SG.list.length; i++) if (SG.list[i].id === id) return SG.list[i];
    return null;
  }

  /* ════ CARD de la galería ═════════════════════════════════════ */
  function cardHTML(e) {
    var preview = '';
    try { preview = e.preview ? e.preview() : ''; } catch (err) { preview = ''; }
    var terms = [e.title, e.desc, e.cat, e.tag, e.file].filter(Boolean).join(' ').toLowerCase();
    return '<a class="sg-card" data-sg-search="' + enc(terms) + '" href="#/styleguide?c=' + enc(e.id) + '">' +
      '<div class="sg-card-preview"><div class="sg-card-preview-inner">' + preview + '</div>' +
        '<span class="sg-open"><iconify-icon icon="iconoir:expand" width="13"></iconify-icon>Abrir</span>' +
      '</div>' +
      '<div class="sg-card-body">' +
        '<div class="sg-card-title">' + enc(e.title) + '</div>' +
        '<div class="sg-card-desc">' + enc(e.desc) + '</div>' +
        '<div class="sg-card-foot">' +
          '<span class="sg-card-tag"><iconify-icon icon="iconoir:' + enc(e.tagIcon || 'page') + '" width="13"></iconify-icon>' + enc(e.tag || 'Spec') + '</span>' +
          '<span class="sg-card-file">' + enc(e.file || '') + '</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }

  function sectionHead(g) {
    return '<div class="sg-section-head">' +
      '<span class="sg-section-title">' + enc(g.title) + '</span>' +
      '<span class="sg-section-sub">' + enc(g.sub) + '</span>' +
      '<span class="sg-section-rule"></span>' +
    '</div>';
  }

  function renderGallery() {
    var html = '<div class="page-header"><div class="page-header-left">' +
        '<h1 class="page-title">Componentes</h1>' +
        '<p class="page-subtitle">Catálogo del sistema de diseño · CooperVision Iberia · ' + SG.list.length + ' entradas</p>' +
      '</div></div>' +
      '<div class="sg-searchbar">' +
        '<div class="sg-search-wrap">' +
          '<iconify-icon class="sg-search-icon" icon="iconoir:search" width="17"></iconify-icon>' +
          '<input class="sg-search-input" type="text" id="sg-search" placeholder="Buscar componente, token o vista…" autocomplete="off">' +
          '<button class="sg-search-clear" id="sg-search-clear" aria-label="Limpiar" hidden><iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></button>' +
        '</div>' +
        '<span class="sg-search-count" id="sg-search-count"></span>' +
      '</div>' +
      '<div class="sg-wrap">' +
      '<div class="sg-noresults" id="sg-noresults" hidden><iconify-icon icon="iconoir:search" width="28"></iconify-icon><span>Sin coincidencias</span></div>';

    GROUPS.forEach(function (g) {
      var items = SG.list.filter(function (e) { return e.group === g.key; });
      if (!items.length) return;
      html += '<section class="sg-section">' + sectionHead(g);

      if (g.key === 'componentes') {
        // Agrupar por categoría
        var cats = CAT_ORDER.filter(function (c) {
          return items.some(function (e) { return e.cat === c; });
        });
        cats.forEach(function (cat) {
          var sub = items.filter(function (e) { return e.cat === cat; });
          html += '<div class="sg-catbar">' +
              '<span class="sg-cat-label">' + enc(cat) + '</span>' +
              '<span class="sg-cat-rule"></span>' +
              '<span class="sg-cat-count">' + sub.length + '</span>' +
            '</div>' +
            '<div class="sg-grid">' + sub.map(cardHTML).join('') + '</div>';
        });
      } else {
        html += '<div class="sg-grid">' + items.map(cardHTML).join('') + '</div>';
      }
      html += '</section>';
    });

    return html + '</div>';
  }

  /* ════ Vista de DETALLE ═══════════════════════════════════════ */
  function groupLabel(key) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].key === key) return GROUPS[i].title;
    return key;
  }

  function renderDetail(e) {
    var crumb = groupLabel(e.group) + (e.cat ? ' · <b>' + enc(e.cat) + '</b>' : '');
    var body = '';
    try { body = e.detail ? e.detail() : '<p class="body-sm c-muted">Sin contenido.</p>'; }
    catch (err) { body = '<p class="body-sm c-neg">Error al renderizar el detalle.</p>'; }

    return '<div class="sg-detail">' +
      '<a class="sg-back" href="#/styleguide"><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon>Componentes</a>' +
      '<div class="sg-detail-head">' +
        '<div class="sg-detail-eyebrow">' + crumb + '</div>' +
        '<h1 class="sg-detail-title">' + enc(e.title) + '</h1>' +
        '<p class="sg-detail-desc">' + enc(e.descLong || e.desc) + '</p>' +
        (e.file ? '<span class="sg-detail-file"><iconify-icon icon="iconoir:code" width="13"></iconify-icon>' + enc(e.file) + '</span>' : '') +
      '</div>' +
      body +
    '</div>';
  }

  /* ════ Detección de sub-ruta (?c=<id>) ════════════════════════ */
  function detailId() {
    var h = (location.hash || '').replace(/^#/, '');
    var i = h.indexOf('?');
    if (i < 0) return null;
    var q = h.slice(i + 1).split('&');
    for (var k = 0; k < q.length; k++) {
      var p = q[k].split('=');
      if (p[0] === 'c') return decodeURIComponent(p[1] || '');
    }
    return null;
  }

  /* ════ Estados loading / empty / error (solo galería) ═════════ */
  function renderLoading() {
    var cards = '';
    for (var i = 0; i < 6; i++) {
      cards += '<div class="sg-card"><div class="sg-card-preview">' +
        '<span class="skeleton" style="width:70%;height:64px"></span></div>' +
        '<div class="sg-card-body">' +
          '<span class="skeleton sk-text-sm" style="width:50%;margin-bottom:8px"></span>' +
          '<span class="skeleton sk-text-sm" style="width:90%"></span>' +
        '</div></div>';
    }
    return '<div class="page-header"><div class="page-header-left">' +
      '<span class="skeleton sk-text-sm" style="width:120px;display:block;margin-bottom:8px"></span>' +
      '<span class="skeleton" style="width:240px;height:30px;display:block"></span>' +
      '</div></div><div class="sg-wrap"><div class="sg-grid">' + cards + '</div></div>';
  }
  function renderEmpty() {
    return '<div class="card view-stub"><div class="empty-state">' +
      '<iconify-icon class="empty-state-icon" icon="iconoir:view-grid" width="32"></iconify-icon>' +
      '<h2 class="state-title">Catálogo vacío</h2>' +
      '<p class="state-body">No hay componentes registrados todavía.</p>' +
    '</div></div>';
  }
  function renderError() {
    return '<div class="card view-stub"><div class="error-state">' +
      '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
      '<h2 class="state-title">Error al cargar el catálogo</h2>' +
      '<button class="btn btn-primary btn-sm" data-action="retry">' +
        '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
    '</div></div>';
  }

  /* ════ MOUNTED — interacciones genéricas del detalle ═════════ */
  function mounted(root, state) {
    if (state !== 'default') return;

    /* ── Buscador de la galería (sticky) ── */
    var search = root.querySelector('#sg-search');
    if (search) {
      var clearBtn = root.querySelector('#sg-search-clear');
      var countEl = root.querySelector('#sg-search-count');
      var noResults = root.querySelector('#sg-noresults');
      var cards = [].slice.call(root.querySelectorAll('.sg-card[data-sg-search]'));
      var sections = [].slice.call(root.querySelectorAll('.sg-section'));

      var applyFilter = function () {
        var q = search.value.trim().toLowerCase();
        clearBtn.hidden = !q;
        var shown = 0;
        cards.forEach(function (c) {
          var match = !q || c.getAttribute('data-sg-search').indexOf(q) !== -1;
          c.style.display = match ? '' : 'none';
          if (match) shown++;
        });
        // Ocultar secciones / categorías sin tarjetas visibles
        sections.forEach(function (sec) {
          var any = sec.querySelectorAll('.sg-card:not([style*="display: none"])').length > 0;
          sec.style.display = any ? '' : 'none';
        });
        root.querySelectorAll('.sg-catbar').forEach(function (bar) {
          var grid = bar.nextElementSibling;
          var any = grid && grid.querySelectorAll('.sg-card:not([style*="display: none"])').length > 0;
          bar.style.display = any ? '' : 'none';
          if (grid) grid.style.display = any ? '' : 'none';
        });
        noResults.hidden = shown !== 0;
        countEl.textContent = q ? (shown + ' de ' + cards.length) : '';
      };

      search.addEventListener('input', applyFilter);
      clearBtn.addEventListener('click', function () { search.value = ''; applyFilter(); search.focus(); });
      search.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') { search.value = ''; applyFilter(); } });
    }

    /* Modal demo */
    root.querySelectorAll('[data-sg-modal-open]').forEach(function (btn) {
      var modal = root.querySelector('#' + btn.getAttribute('data-sg-modal-open'));
      if (!modal) return;
      btn.addEventListener('click', function () { modal.style.display = 'flex'; });
      modal.querySelectorAll('[data-sg-modal-close]').forEach(function (b) {
        b.addEventListener('click', function () { modal.style.display = 'none'; });
      });
      modal.addEventListener('click', function (ev) { if (ev.target === modal) modal.style.display = 'none'; });
    });

    /* Drawer demo */
    root.querySelectorAll('[data-sg-drawer-open]').forEach(function (btn) {
      var dr = root.querySelector('#' + btn.getAttribute('data-sg-drawer-open'));
      if (!dr) return;
      btn.addEventListener('click', function () { dr.style.display = 'block'; });
      dr.querySelectorAll('[data-sg-drawer-close]').forEach(function (b) {
        b.addEventListener('click', function () { dr.style.display = 'none'; });
      });
    });

    /* Tabs (genéricos por grupo data-sgtabs) */
    root.querySelectorAll('[data-sgtab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var grp = btn.getAttribute('data-sgtabs');
        var tab = btn.getAttribute('data-sgtab');
        root.querySelectorAll('[data-sgtabs="' + grp + '"]').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-sgtab') === tab);
        });
        root.querySelectorAll('[data-sgpane][data-sgtabs="' + grp + '"]').forEach(function (p) {
          p.style.display = p.getAttribute('data-sgpane') === tab ? '' : 'none';
        });
      });
    });

    /* Popover / flyout toggles */
    root.querySelectorAll('[data-sg-toggle]').forEach(function (btn) {
      var pop = root.querySelector('#' + btn.getAttribute('data-sg-toggle'));
      if (!pop) return;
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        pop.classList.toggle('open');
      });
    });
    root.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-sg-toggle]')) return;
      root.querySelectorAll('[id^="sg-pop"]').forEach(function (p) {
        if (!p.contains(ev.target)) p.classList.remove('open');
      });
    });

    /* Chips removibles */
    root.querySelectorAll('[data-chip-rm]').forEach(function (b) {
      b.addEventListener('click', function () {
        var c = b.closest('[data-chip]');
        if (c) c.remove();
      });
    });

    /* Anchor-nav activo por click */
    root.querySelectorAll('.sg-anchor-item').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        root.querySelectorAll('.sg-anchor-item').forEach(function (x) { x.classList.remove('active'); });
        a.classList.add('active');
      });
    });

    /* Hook opcional por entrada */
    var e = byId(detailId());
    if (e && typeof e.mounted === 'function') { try { e.mounted(root); } catch (err) {} }
  }

  /* ════ Registro de la vista ═══════════════════════════════════ */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/styleguide'] = {
    render: function (state) {
      if (state === 'loading') return renderLoading();
      if (state === 'empty')   return renderEmpty();
      if (state === 'error')   return renderError();
      var id = detailId();
      var e = id ? byId(id) : null;
      if (e) return renderDetail(e);
      return renderGallery();
    },
    mounted: mounted,
  };
})();
