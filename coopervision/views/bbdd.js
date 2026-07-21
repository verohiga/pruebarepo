/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/bbdd.js — V4 Base de datos
   Registra window.cpvViews['/bbdd']. Tabla densa sobre opticas_google
   (LEFT JOIN opticas_cpv para is_client + datos comerciales en admin)
   con overrides aplicados on top. Búsqueda (debounce 300ms), filtros
   (popover + selects rápidos), orden por columna, paginación 20/pág,
   exportación CSV. Toda la interacción es funcional sobre los 40 mock.
   Click fila → drawer V5 (Lote 3): por ahora toast informativo.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── formato es-ES manual (igual que resumen/bi/mapa) ───────── */
  const group = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const fmtInt = (n) => group(String(Math.round(Math.abs(n))));
  function fmtDec(n, d) {
    const f = Math.abs(Number(n)).toFixed(d), p = f.split('.');
    return group(p[0]) + (p[1] ? ',' + p[1] : '');
  }
  function fmtCompact(n) {
    if (n >= 1e6) return fmtDec(n / 1e6, 1).replace(',0', '') + 'M';
    if (n >= 1e3) return fmtDec(n / 1e3, 1).replace(',0', '') + 'k';
    return fmtInt(n);
  }
  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function debounce(fn, ms) {
    let t; return function () { const a = arguments, c = this; clearTimeout(t); t = setTimeout(() => fn.apply(c, a), ms); };
  }

  const PAGE_SIZE = 20;

  /* ── estado del módulo (instancia única por vista) ──────────── */
  const initFilters = () => ({
    q: '', provincia: '', categoria: '', tipo: 'todas', cadena: '', pais: 'todos',
    estados: [], showCore: false, showMiopia: false, minRating: 0, conOverrides: false,
  });
  let _filters = initFilters();
  let _sort = { by: null, dir: 'asc' };
  let _page = 1;
  let _menuEl = null;          // menú flotante ⋯ (en body)
  let _menuPid = null;
  let _outsideHandler = null;

  /* ── columnas (DRY para thead + filas) ──────────────────────── */
  const COLS = [
    { key: 'name',      label: 'Nombre',     sortable: true,  cls: 'col-sticky' },
    { key: 'city',      label: 'Ciudad',     sortable: true },
    { key: 'provincia', label: 'Provincia',  sortable: true },
    { key: 'cadena',    label: 'Cadena',     sortable: true,  cls: 'col-1440' },
    { key: 'tipo',      label: 'Tipo',       sortable: true },
    { key: 'rating',    label: 'Valoración', sortable: true,  align: 'right' },
    { key: 'reviews',   label: 'Reseñas',    sortable: true,  align: 'right' },
    { key: 'web',       label: 'Web',        sortable: false, cls: 'col-1440', align: 'center' },
    { key: 'tel',       label: 'Tel',        sortable: false, cls: 'col-1440', align: 'center' },
    { key: 'booking',   label: 'Gestor de cita', sortable: false, cls: 'col-1440', align: 'center' },
    { key: 'email',     label: 'Email',      sortable: false, cls: 'col-1600', align: 'center' },
    { key: 'estado',    label: 'Estado',     sortable: true,  cls: 'col-admin' },
    { key: 'menu',      label: '',           sortable: false, cls: 'cpv-bbdd-menu-col' },
  ];

  /* ── normaliza filas: google + overrides + join cpv/cadena/app ── */
  function buildRows(md) {
    return md.opticas_google.map((g) => {
      const eff = md.helpers.aplica_overrides_google(g.place_id) || g;
      const client = md.helpers.is_client(g.place_id);
      const cpv = md.helpers.cpv_de(g.place_id);
      const cadena = md.helpers.cadena_de(g.place_id);
      const app = md.helpers.app_data_de(g.place_id);
      const ov = md.helpers.overrides_de(g.place_id);
      return {
        place_id: g.place_id,
        name: eff.name, city: g.city, provincia: g.state, country: g.country_code,
        cadena: cadena ? cadena.nombre : null,
        client, categoria: g.category,
        rating: g.rating, reviews: g.reviews,
        website: eff.website || null,
        phone: eff.phone || null,
        email: client && cpv && cpv.EMAIL ? cpv.EMAIL : null,
        booking: g.booking_appointment_link || null,
        address: eff.address || g.address,
        showCore: !!(app && app.show_campañas_core),
        showMiopia: !!(app && app.show_campañas_miopia),
        hasOverrides: ov.length > 0,
        estado: client ? 'Vinculado' : 'Solo Google',
      };
    });
  }

  /* ── opciones únicas para selects/filtros ───────────────────── */
  function uniq(arr) { return Array.from(new Set(arr.filter(Boolean))).sort((a, b) => a.localeCompare(b, 'es')); }

  /* ── aplica filtros ─────────────────────────────────────────── */
  function applyFilters(rows, f) {
    const q = (f.q || '').trim().toLowerCase();
    return rows.filter((r) => {
      if (f.provincia && r.provincia !== f.provincia) return false;
      if (f.pais !== 'todos' && r.country !== f.pais) return false;
      if (f.categoria && r.categoria !== f.categoria) return false;
      if (f.tipo === 'cliente' && !r.client) return false;
      if (f.tipo === 'otra' && r.client) return false;
      if (f.cadena && r.cadena !== f.cadena) return false;
      if (f.estados.length && f.estados.indexOf(r.estado) === -1) return false;
      if (f.showCore && !r.showCore) return false;
      if (f.showMiopia && !r.showMiopia) return false;
      if (r.rating < f.minRating) return false;
      if (f.conOverrides && !r.hasOverrides) return false;
      if (q) {
        const hay = (r.name + ' ' + r.city + ' ' + r.provincia + ' ' + r.address).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  /* ── ordena ─────────────────────────────────────────────────── */
  function applySort(rows, s) {
    if (!s.by) return rows;
    const dir = s.dir === 'desc' ? -1 : 1;
    const num = { rating: 1, reviews: 1 };
    const val = (r) => {
      if (s.by === 'tipo') return r.client ? 1 : 0;
      if (s.by === 'cadena') return r.cadena || '\uffff';
      return r[s.by];
    };
    return rows.slice().sort((a, b) => {
      const va = val(a), vb = val(b);
      if (num[s.by] || s.by === 'tipo') return (va - vb) * dir;
      return String(va).localeCompare(String(vb), 'es') * dir;
    });
  }

  /* ── nº de grupos de filtro activos (badge) ─────────────────── */
  function activeCount(f) {
    let n = 0;
    if (f.provincia) n++;
    if (f.pais !== 'todos') n++;
    if (f.categoria) n++;
    if (f.tipo !== 'todas') n++;
    if (f.cadena) n++;
    if (f.estados.length) n++;
    if (f.showCore) n++;
    if (f.showMiopia) n++;
    if (f.minRating > 0) n++;
    if (f.conOverrides) n++;
    return n;
  }

  /* ════ THEAD ════ */
  function theadHTML() {
    return '<thead><tr>' + COLS.map((c) => {
      const cls = [c.cls || '', c.sortable ? 'sortable' : ''].filter(Boolean).join(' ');
      const align = c.align === 'right' ? ' style="text-align:right"' : c.align === 'center' ? ' style="text-align:center"' : '';
      const attr = c.sortable ? ' data-sort-key="' + c.key + '"' : '';
      const icon = c.sortable
        ? '<span class="sort-icon"><iconify-icon icon="iconoir:sort" width="13"></iconify-icon></span>' : '';
      return '<th' + (cls ? ' class="' + cls + '"' : '') + align + attr + '>' + enc(c.label) + icon + '</th>';
    }).join('') + '</tr></thead>';
  }

  /* ════ CELDA por clave ════ */
  function presence(ok, icon) {
    return ok
      ? '<span class="cpv-presence yes"><iconify-icon icon="iconoir:' + icon + '" width="15"></iconify-icon></span>'
      : '<span class="cpv-presence no"><iconify-icon icon="iconoir:minus-circle" width="15"></iconify-icon></span>';
  }
  function cell(r, key) {
    switch (key) {
      case 'name': {
        const pencil = r.hasOverrides
          ? '<span class="cpv-bbdd-edit" title="Tiene correcciones manuales"><iconify-icon icon="iconoir:edit-pencil" width="12"></iconify-icon></span>' : '';
        return '<td class="col-sticky"><span class="cpv-bbdd-name">' +
          '<span class="cpv-bbdd-name-txt">' + enc(r.name) + '</span>' + pencil + '</span></td>';
      }
      case 'city':      return '<td class="c-ink2">' + enc(r.city) + '</td>';
      case 'provincia': return '<td class="c-ink2">' + enc(r.provincia) + '</td>';
      case 'cadena':    return '<td class="col-1440">' + (r.cadena ? enc(r.cadena) : '<span class="cpv-bbdd-cadena-empty">—</span>') + '</td>';
      case 'tipo':      return '<td>' + (r.client
                          ? '<span class="pill pill-accent pill-sm"><iconify-icon icon="iconoir:verified-badge" width="11"></iconify-icon>Cliente</span>'
                          : '<span class="pill pill-paused pill-sm">Otra</span>') + '</td>';
      case 'rating':    return '<td class="tnum" style="text-align:right"><span class="cpv-star">★</span> ' + fmtDec(r.rating, 2) + '</td>';
      case 'reviews':   return '<td class="tnum c-muted" style="text-align:right">' + fmtCompact(r.reviews) + '</td>';
      case 'web':       return '<td class="col-1440" style="text-align:center">' + presence(!!r.website, 'globe') + '</td>';
      case 'tel':       return '<td class="col-1440" style="text-align:center">' + presence(!!r.phone, 'phone') + '</td>';
      case 'email':     return '<td class="col-1600" style="text-align:center">' + presence(!!r.email, 'mail') + '</td>';
      case 'booking':   return '<td class="col-1440" style="text-align:center">' + (r.booking
                          ? '<a class="cpv-bbdd-booking-link" href="' + enc(r.booking) + '" target="_blank" rel="noopener" title="Abrir gestor de cita" aria-label="Abrir gestor de cita"><iconify-icon icon="iconoir:calendar" width="16"></iconify-icon></a>'
                          : '<span class="cpv-bbdd-cadena-empty">—</span>') + '</td>';
      case 'estado':    return '<td class="col-admin">' + (r.client
                          ? '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Vinculado</span>'
                          : '<span class="pill pill-neutral pill-sm">Solo Google</span>') + '</td>';
      case 'menu':      return '<td class="cpv-bbdd-menu-col">' +
                          '<button class="cpv-bbdd-menu-btn" data-menu-pid="' + enc(r.place_id) + '" aria-label="Acciones" aria-haspopup="true">' +
                          '<iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button></td>';
      default:          return '<td></td>';
    }
  }
  function rowHTML(r) {
    return '<tr data-place-id="' + enc(r.place_id) + '" data-action="open-detalle">' +
      COLS.map((c) => cell(r, c.key)).join('') + '</tr>';
  }

  /* ════ FILTER POPOVER ════ */
  function selectOptions(opts, sel) {
    return '<option value="">Todas</option>' + opts.map((o) =>
      '<option value="' + enc(o) + '"' + (o === sel ? ' selected' : '') + '>' + enc(o) + '</option>').join('');
  }
  function filterPopHTML(md, role, opts) {
    const f = _filters;
    const adminEstado = role === 'admin'
      ? '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Estado de vínculo</span>' +
        '<div class="cpv-filter-check-row">' +
        ['Vinculado', 'Solo Google'].map((e) =>
          '<label class="checkbox-wrap"><input type="checkbox" class="checkbox" data-filter-estado="' + e + '"' +
          (f.estados.indexOf(e) > -1 ? ' checked' : '') + '><span class="toggle-text">' + e + '</span></label>').join('') +
        '</div></div>' : '';
    const adminOverrides = role === 'admin'
      ? '<div class="cpv-filter-sec"><label class="checkbox-wrap"><input type="checkbox" class="checkbox" id="cpv-f-overrides"' +
        (f.conOverrides ? ' checked' : '') + '><span class="toggle-text">Solo con correcciones manuales</span></label></div>' : '';
    return '<div class="cpv-filter-pop" id="cpv-filter-pop">' +
      '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Provincia</span>' +
        '<select class="select select-sm" id="cpv-f-provincia">' + selectOptions(opts.provincias, f.provincia) + '</select></div>' +
      '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Categoría</span>' +
        '<select class="select select-sm" id="cpv-f-categoria">' + selectOptions(opts.categorias, f.categoria) + '</select></div>' +
      '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Tipo de óptica</span>' +
        '<div class="cpv-filter-radio-row inline">' +
        [['todas', 'Todas'], ['cliente', 'Cliente'], ['otra', 'Otra']].map((t) =>
          '<label class="radio-wrap"><input type="radio" name="cpv-f-tipo" class="radio" value="' + t[0] + '"' +
          (f.tipo === t[0] ? ' checked' : '') + '><span class="toggle-text">' + t[1] + '</span></label>').join('') +
        '</div></div>' +
      '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Cadena</span>' +
        '<select class="select select-sm" id="cpv-f-cadena">' + selectOptions(opts.cadenas, f.cadena) + '</select></div>' +
      adminEstado +
      '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Campañas activas</span>' +
        '<div class="cpv-filter-check-row">' +
        '<label class="checkbox-wrap"><input type="checkbox" class="checkbox" id="cpv-f-core"' + (f.showCore ? ' checked' : '') + '><span class="toggle-text">Mostrar Core</span></label>' +
        '<label class="checkbox-wrap"><input type="checkbox" class="checkbox" id="cpv-f-miopia"' + (f.showMiopia ? ' checked' : '') + '><span class="toggle-text">Mostrar Control de Miopía</span></label>' +
        '</div></div>' +
      '<div class="cpv-filter-sec"><div class="cpv-filter-slider-head"><span class="cpv-filter-sec-label">Valoración mínima</span>' +
        '<span class="cpv-filter-slider-val" id="cpv-f-rating-val">' + (f.minRating === 0 ? 'Todas' : fmtDec(f.minRating, 1) + ' ★') + '</span></div>' +
        '<input type="range" class="slider" id="cpv-f-rating" min="0" max="5" step="0.5" value="' + f.minRating + '"></div>' +
      adminOverrides +
      '<div class="cpv-filter-foot">' +
        '<button class="btn btn-ghost btn-sm" id="cpv-f-clear">Limpiar todo</button>' +
        '<button class="btn btn-primary btn-sm" id="cpv-f-apply">Aplicar</button>' +
      '</div></div>';
  }

  /* ════ CHIPS ════ */
  function chip(key, label) {
    return '<span class="chip"><span class="chip-label">' + enc(label) + '</span>' +
      '<button class="chip-remove" data-chip="' + enc(key) + '" aria-label="Quitar filtro">' +
      '<iconify-icon icon="iconoir:xmark" width="13"></iconify-icon></button></span>';
  }
  function chipsHTML(f) {
    const chips = [];
    if (f.provincia) chips.push(chip('provincia', 'Provincia: ' + f.provincia));
    if (f.pais !== 'todos') chips.push(chip('pais', 'País: ' + (f.pais === 'PT' ? 'Portugal' : 'España')));
    if (f.categoria) chips.push(chip('categoria', 'Categoría: ' + f.categoria));
    if (f.tipo !== 'todas') chips.push(chip('tipo', 'Tipo: ' + (f.tipo === 'cliente' ? 'Cliente' : 'Otra')));
    if (f.cadena) chips.push(chip('cadena', 'Cadena: ' + f.cadena));
    f.estados.forEach((e) => chips.push(chip('estado:' + e, 'Estado: ' + e)));
    if (f.showCore) chips.push(chip('showCore', 'Campaña: Core'));
    if (f.showMiopia) chips.push(chip('showMiopia', 'Campaña: Miopía'));
    if (f.minRating > 0) chips.push(chip('minRating', '★ ≥ ' + fmtDec(f.minRating, 1)));
    if (f.conOverrides) chips.push(chip('conOverrides', 'Con correcciones'));
    if (!chips.length) return '';
    return '<div class="cpv-bbdd-chips" id="cpv-bbdd-chips">' +
      '<span class="cpv-bbdd-chips-label">Filtros</span>' + chips.join('') +
      '<button class="cpv-bbdd-clear-all" id="cpv-chips-clear">Limpiar todo</button></div>';
  }

  /* ════ PAGINACIÓN (numerada con elipsis) ════ */
  function pageList(cur, total) {
    if (total <= 7) { const a = []; for (let i = 1; i <= total; i++) a.push(i); return a; }
    const out = [1];
    const lo = Math.max(2, cur - 1), hi = Math.min(total - 1, cur + 1);
    if (lo > 2) out.push('…');
    for (let i = lo; i <= hi; i++) out.push(i);
    if (hi < total - 1) out.push('…');
    out.push(total);
    return out;
  }
  function paginationHTML(cur, totalRows) {
    const totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE));
    const from = totalRows === 0 ? 0 : (cur - 1) * PAGE_SIZE + 1;
    const to = Math.min(cur * PAGE_SIZE, totalRows);
    const btns = pageList(cur, totalPages).map((p) =>
      p === '…' ? '<span class="page-ellipsis">…</span>'
        : '<button class="page-btn' + (p === cur ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>').join('');
    return '<div class="pagination-info">Mostrando <b>' + fmtInt(from) + '–' + fmtInt(to) +
      '</b> de <b>' + fmtInt(totalRows) + '</b> ópticas</div>' +
      '<div class="pagination">' +
        '<button class="page-btn" data-page="prev"' + (cur <= 1 ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon></button>' +
        btns +
        '<button class="page-btn" data-page="next"' + (cur >= totalPages ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-right" width="15"></iconify-icon></button>' +
      '</div>';
  }

  /* ════ RENDER · DEFAULT ════ */
  function renderDefault(ctx) {
    const md = ctx.md, role = ctx.role;
    const rows = buildRows(md);
    const opts = {
      provincias: uniq(rows.map((r) => r.provincia)),
      categorias: uniq(rows.map((r) => r.categoria)),
      cadenas: uniq(rows.map((r) => r.cadena)),
    };

    const header =
      '<div class="page-header"><div class="page-header-left">' +
      '<h1 class="page-title">Base de datos</h1>' +
      '<p class="page-subtitle">' + fmtInt(rows.length) + ' ópticas · Última sincronización hace ' +
      md.dias_desde_ultima_sync + ' días</p>' +
      '</div><div class="page-header-right">' +
      '<button class="btn btn-ghost btn-sm" id="cpv-export"><iconify-icon icon="iconoir:download" width="15"></iconify-icon>Exportar CSV</button>' +
      '</div></div>';

    const toolbar =
      '<div class="cpv-bbdd-toolbar">' +
        '<div class="input-wrap">' +
          '<span class="input-icon"><iconify-icon icon="iconoir:search" width="16"></iconify-icon></span>' +
          '<input class="input input-sm" id="cpv-bbdd-q" type="text" placeholder="Buscar óptica, ciudad o provincia…" autocomplete="off" value="' + enc(_filters.q) + '">' +
          '<span class="input-suffix" id="cpv-bbdd-q-clear" style="display:' + (_filters.q ? 'flex' : 'none') + '"><iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></span>' +
        '</div>' +
        '<div class="dropdown-wrap cpv-filter-trigger">' +
          '<button class="btn btn-ghost btn-sm" id="cpv-filter-btn" aria-haspopup="true" aria-expanded="false">' +
            '<iconify-icon icon="iconoir:filter" width="15"></iconify-icon>Filtros' +
            '<span class="cpv-filter-badge" id="cpv-filter-badge" style="display:none">0</span>' +
          '</button>' +
          filterPopHTML(md, role, opts) +
        '</div>' +
        '<div class="cpv-bbdd-quick">' +
          '<div class="cpv-bbdd-quick-field"><span class="cpv-bbdd-quick-label">Tipo</span>' +
            '<select class="select select-sm" id="cpv-q-tipo">' +
              '<option value="todas"' + (_filters.tipo === 'todas' ? ' selected' : '') + '>Todas</option>' +
              '<option value="cliente"' + (_filters.tipo === 'cliente' ? ' selected' : '') + '>Cliente</option>' +
              '<option value="otra"' + (_filters.tipo === 'otra' ? ' selected' : '') + '>Otra</option>' +
            '</select></div>' +
          '<div class="cpv-bbdd-quick-field"><span class="cpv-bbdd-quick-label">Provincia</span>' +
            '<select class="select select-sm" id="cpv-q-provincia">' + selectOptions(opts.provincias, _filters.provincia) + '</select></div>' +
          '<div class="cpv-bbdd-quick-field"><span class="cpv-bbdd-quick-label">País</span>' +
            '<select class="select select-sm" id="cpv-q-pais">' +
              '<option value="todos"' + (_filters.pais === 'todos' ? ' selected' : '') + '>Todos</option>' +
              '<option value="ES"' + (_filters.pais === 'ES' ? ' selected' : '') + '>España</option>' +
              '<option value="PT"' + (_filters.pais === 'PT' ? ' selected' : '') + '>Portugal</option>' +
            '</select></div>' +
        '</div>' +
      '</div>';

    const card =
      '<div class="card cpv-bbdd-card">' +
        toolbar +
        '<div id="cpv-bbdd-chips-slot"></div>' +
        '<div class="table-wrap cpv-bbdd-tablewrap">' +
          '<table class="table-dense cpv-bbdd-table">' + theadHTML() + '<tbody id="cpv-bbdd-tbody"></tbody></table>' +
        '</div>' +
        '<div class="pagination-wrap cpv-bbdd-pagination" id="cpv-bbdd-pagination"></div>' +
      '</div>';

    return header + card;
  }

  /* ════ RENDER · LOADING ════ */
  function renderLoading() {
    let rows = '';
    for (let i = 0; i < PAGE_SIZE; i++) {
      const w = [62, 46, 40, 0, 0, 0, 0][0];
      rows += '<tr class="cpv-bbdd-skrow">' +
        '<td class="col-sticky"><span class="skeleton" style="width:' + (54 + (i % 4) * 8) + '%"></span></td>' +
        '<td><span class="skeleton" style="width:60%"></span></td>' +
        '<td><span class="skeleton" style="width:55%"></span></td>' +
        '<td class="col-1440"><span class="skeleton" style="width:50%"></span></td>' +
        '<td><span class="skeleton" style="width:46px"></span></td>' +
        '<td style="text-align:right"><span class="skeleton" style="width:36px;margin-left:auto"></span></td>' +
        '<td style="text-align:right"><span class="skeleton" style="width:30px;margin-left:auto"></span></td>' +
        '<td class="col-1440" style="text-align:center"><span class="skeleton" style="width:15px;margin:0 auto"></span></td>' +
        '<td class="col-1440" style="text-align:center"><span class="skeleton" style="width:15px;margin:0 auto"></span></td>' +
        '<td class="col-1440" style="text-align:center"><span class="skeleton" style="width:15px;margin:0 auto"></span></td>' +
        '<td class="col-1600" style="text-align:center"><span class="skeleton" style="width:15px;margin:0 auto"></span></td>' +
        '<td class="col-admin"><span class="skeleton" style="width:60%"></span></td>' +
        '<td class="cpv-bbdd-menu-col"></td>' +
      '</tr>';
    }
    const header =
      '<div class="page-header"><div class="page-header-left">' +
      '<span class="skeleton sk-text-sm" style="width:80px"></span>' +
      '<span class="skeleton" style="width:220px;height:30px;margin-top:8px"></span>' +
      '<span class="skeleton sk-text-sm" style="width:300px;margin-top:8px"></span></div>' +
      '<div class="page-header-right"><span class="skeleton" style="width:130px;height:30px"></span></div></div>';
    const toolbar =
      '<div class="cpv-bbdd-toolbar">' +
        '<span class="skeleton" style="width:320px;height:32px"></span>' +
        '<span class="skeleton" style="width:88px;height:32px"></span>' +
        '<span class="skeleton" style="width:300px;height:32px;margin-left:auto"></span></div>';
    return header +
      '<div class="card cpv-bbdd-card">' + toolbar +
      '<div class="table-wrap cpv-bbdd-tablewrap">' +
      '<table class="table-dense cpv-bbdd-table">' + theadHTML() + '<tbody>' + rows + '</tbody></table></div>' +
      '<div class="pagination-wrap cpv-bbdd-pagination">' +
        '<span class="skeleton sk-text-sm" style="width:180px"></span>' +
        '<span class="skeleton" style="width:200px;height:32px"></span></div></div>';
  }

  /* ════ RENDER · EMPTY (BBDD vacía) ════ */
  function renderEmpty(ctx) {
    const adminCTA = ctx.role === 'admin'
      ? '<a class="btn btn-primary btn-sm" href="#/admin/operaciones"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Lanzar primera sincronización</a>'
      : '';
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'sin datos disponibles') +
      '<div class="card view-stub"><div class="empty-state">' +
      '<iconify-icon class="empty-state-icon" icon="iconoir:database-xmark" width="32"></iconify-icon>' +
      '<h2 class="state-title">Sin ópticas</h2>' +
      '<p class="state-body">No hay ninguna óptica en la base de datos todavía. ' +
      (ctx.role === 'admin' ? 'Lanza la primera sincronización para poblarla.' : 'Un administrador debe lanzar la primera sincronización.') +
      '</p>' + adminCTA + '</div></div>';
  }

  /* ════ RENDER · ERROR ════ */
  function renderError(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'error al cargar') +
      '<div class="card view-stub"><div class="error-state">' +
      '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
      '<h2 class="state-title">No se pudo cargar la base de datos</h2>' +
      '<p class="state-body">Ha ocurrido un error al recuperar los registros. Inténtalo de nuevo.</p>' +
      '<button class="btn btn-primary btn-sm" data-action="retry"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
  }

  /* ── parseo de query params del hash (deep-link desde V1/V2) ── */
  function readParams() {
    const h = location.hash || '';
    const qi = h.indexOf('?');
    if (qi === -1) return;
    const sp = new URLSearchParams(h.slice(qi + 1));
    if (sp.get('q')) _filters.q = sp.get('q');
    if (sp.get('provincia')) _filters.provincia = sp.get('provincia');
    if (sp.get('categoria')) _filters.categoria = sp.get('categoria');
    const tipo = sp.get('tipo');
    if (tipo === 'cliente' || tipo === 'no_cliente' || tipo === 'otra') _filters.tipo = tipo === 'cliente' ? 'cliente' : 'otra';
    if (sp.get('cadena')) _filters.cadena = sp.get('cadena');
    const mr = parseFloat(sp.get('min_rating'));
    if (!isNaN(mr)) _filters.minRating = mr;
    const ob = sp.get('orderBy');
    if (ob && COLS.some((c) => c.key === ob && c.sortable)) {
      _sort.by = ob; _sort.dir = sp.get('order') === 'desc' ? 'desc' : 'asc';
    }
  }

  /* ════ MOUNTED ════ */
  function mounted(root, state, ctx) {
    teardownMenu();
    if (state !== 'default') return;
    const md = ctx.md, role = ctx.role;
    const allRows = buildRows(md);

    const tbody = root.querySelector('#cpv-bbdd-tbody');
    const chipsSlot = root.querySelector('#cpv-bbdd-chips-slot');
    const pagEl = root.querySelector('#cpv-bbdd-pagination');
    const badge = root.querySelector('#cpv-filter-badge');
    const thead = root.querySelector('.cpv-bbdd-table thead');

    /* ── núcleo: recalcula y pinta tbody + chips + paginación ── */
    function getProcessed() { return applySort(applyFilters(allRows, _filters), _sort); }

    function refresh(opts) {
      if (opts && opts.resetPage) _page = 1;
      const processed = getProcessed();
      const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
      if (_page > totalPages) _page = totalPages;
      const slice = processed.slice((_page - 1) * PAGE_SIZE, _page * PAGE_SIZE);

      if (processed.length === 0) {
        const span = COLS.length;
        tbody.innerHTML = '<tr><td colspan="' + span + '"><div class="empty-state cpv-bbdd-tablestate">' +
          '<iconify-icon class="empty-state-icon" icon="iconoir:search" width="30"></iconify-icon>' +
          '<h2 class="state-title">Sin resultados</h2>' +
          '<p class="state-body">No hay ópticas con esos filtros.</p>' +
          '<button class="btn btn-ghost btn-sm" data-action="bbdd-clear">Limpiar filtros</button></div></td></tr>';
      } else {
        tbody.innerHTML = slice.map(rowHTML).join('');
      }

      chipsSlot.innerHTML = chipsHTML(_filters);
      pagEl.innerHTML = paginationHTML(_page, processed.length);

      const n = activeCount(_filters);
      badge.textContent = n;
      badge.style.display = n ? 'inline-flex' : 'none';

      // sort icons
      thead.querySelectorAll('th[data-sort-key]').forEach((th) => {
        const key = th.getAttribute('data-sort-key');
        const ic = th.querySelector('.sort-icon iconify-icon');
        if (_sort.by === key) {
          th.classList.add('sorted');
          ic.setAttribute('icon', _sort.dir === 'asc' ? 'iconoir:nav-arrow-up' : 'iconoir:nav-arrow-down');
        } else {
          th.classList.remove('sorted');
          ic.setAttribute('icon', 'iconoir:sort');
        }
      });
    }

    /* ── búsqueda (debounce 300ms) + limpiable ── */
    const qInput = root.querySelector('#cpv-bbdd-q');
    const qClear = root.querySelector('#cpv-bbdd-q-clear');
    const onSearch = debounce(() => refresh({ resetPage: true }), 300);
    qInput.addEventListener('input', () => {
      _filters.q = qInput.value;
      qClear.style.display = qInput.value ? 'flex' : 'none';
      onSearch();
    });
    qClear.addEventListener('click', () => {
      qInput.value = ''; _filters.q = ''; qClear.style.display = 'none'; qInput.focus(); refresh({ resetPage: true });
    });

    /* ── popover de filtros ── */
    const filterBtn = root.querySelector('#cpv-filter-btn');
    const pop = root.querySelector('#cpv-filter-pop');
    function openPop(o) {
      const open = o == null ? !pop.classList.contains('open') : o;
      pop.classList.toggle('open', open);
      filterBtn.setAttribute('aria-expanded', String(open));
    }
    filterBtn.addEventListener('click', (e) => { e.stopPropagation(); openPop(); });
    pop.addEventListener('click', (e) => e.stopPropagation());

    /* sincroniza selects rápidos + popover en ambos sentidos */
    const qTipo = root.querySelector('#cpv-q-tipo');
    const qProvincia = root.querySelector('#cpv-q-provincia');
    const qPais = root.querySelector('#cpv-q-pais');
    function syncControls() {
      qTipo.value = _filters.tipo;
      qProvincia.value = _filters.provincia;
      qPais.value = _filters.pais;
      const fp = root.querySelector('#cpv-f-provincia'); if (fp) fp.value = _filters.provincia;
      const fc = root.querySelector('#cpv-f-categoria'); if (fc) fc.value = _filters.categoria;
      const fch = root.querySelector('#cpv-f-cadena'); if (fch) fch.value = _filters.cadena;
      root.querySelectorAll('input[name="cpv-f-tipo"]').forEach((r) => { r.checked = r.value === _filters.tipo; });
      const fr = root.querySelector('#cpv-f-rating');
      if (fr) { fr.value = _filters.minRating; root.querySelector('#cpv-f-rating-val').textContent = _filters.minRating === 0 ? 'Todas' : fmtDec(_filters.minRating, 1) + ' ★'; }
      const fco = root.querySelector('#cpv-f-core'); if (fco) fco.checked = _filters.showCore;
      const fmi = root.querySelector('#cpv-f-miopia'); if (fmi) fmi.checked = _filters.showMiopia;
      const fov = root.querySelector('#cpv-f-overrides'); if (fov) fov.checked = _filters.conOverrides;
      root.querySelectorAll('input[data-filter-estado]').forEach((c) => { c.checked = _filters.estados.indexOf(c.getAttribute('data-filter-estado')) > -1; });
    }

    // selects rápidos: aplicación inmediata
    qTipo.addEventListener('change', () => { _filters.tipo = qTipo.value; syncControls(); refresh({ resetPage: true }); });
    qProvincia.addEventListener('change', () => { _filters.provincia = qProvincia.value; syncControls(); refresh({ resetPage: true }); });
    qPais.addEventListener('change', () => { _filters.pais = qPais.value; syncControls(); refresh({ resetPage: true }); });

    // popover: rating en vivo (preview de valor); el resto se aplica con "Aplicar"
    const fRating = root.querySelector('#cpv-f-rating');
    const fRatingVal = root.querySelector('#cpv-f-rating-val');
    if (fRating) fRating.addEventListener('input', () => { fRatingVal.textContent = fRating.value === '0' ? 'Todas' : fmtDec(parseFloat(fRating.value), 1) + ' ★'; });

    root.querySelector('#cpv-f-apply').addEventListener('click', () => {
      _filters.provincia = root.querySelector('#cpv-f-provincia').value;
      _filters.categoria = root.querySelector('#cpv-f-categoria').value;
      _filters.cadena = root.querySelector('#cpv-f-cadena').value;
      const tr = root.querySelector('input[name="cpv-f-tipo"]:checked'); _filters.tipo = tr ? tr.value : 'todas';
      _filters.minRating = parseFloat(fRating.value);
      _filters.showCore = root.querySelector('#cpv-f-core').checked;
      _filters.showMiopia = root.querySelector('#cpv-f-miopia').checked;
      const fov = root.querySelector('#cpv-f-overrides'); _filters.conOverrides = fov ? fov.checked : false;
      _filters.estados = Array.from(root.querySelectorAll('input[data-filter-estado]:checked')).map((c) => c.getAttribute('data-filter-estado'));
      syncControls(); openPop(false); refresh({ resetPage: true });
    });
    root.querySelector('#cpv-f-clear').addEventListener('click', () => { resetAll(); openPop(false); });

    /* ── chips (delegación) ── */
    chipsSlot.addEventListener('click', (e) => {
      const rm = e.target.closest('[data-chip]');
      if (rm) { removeFilter(rm.getAttribute('data-chip')); return; }
      if (e.target.closest('#cpv-chips-clear')) { resetAll(); }
    });

    function removeFilter(key) {
      if (key.indexOf('estado:') === 0) { const e = key.slice(7); _filters.estados = _filters.estados.filter((x) => x !== e); }
      else if (key === 'minRating') _filters.minRating = 0;
      else if (key === 'tipo') _filters.tipo = 'todas';
      else if (key === 'showCore') _filters.showCore = false;
      else if (key === 'showMiopia') _filters.showMiopia = false;
      else if (key === 'conOverrides') _filters.conOverrides = false;
      else if (key === 'pais') _filters.pais = 'todos';
      else _filters[key] = '';
      syncControls(); refresh({ resetPage: true });
    }
    function resetAll() {
      _filters = initFilters();
      qInput.value = ''; qClear.style.display = 'none';
      syncControls(); refresh({ resetPage: true });
    }

    /* ── orden por columna (asc → desc → ninguno) ── */
    thead.addEventListener('click', (e) => {
      const th = e.target.closest('th[data-sort-key]'); if (!th) return;
      const key = th.getAttribute('data-sort-key');
      if (_sort.by !== key) { _sort.by = key; _sort.dir = 'asc'; }
      else if (_sort.dir === 'asc') _sort.dir = 'desc';
      else { _sort.by = null; _sort.dir = 'asc'; }
      refresh();
    });

    /* ── paginación + estado vacío + filas ── */
    pagEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-page]'); if (!b || b.disabled) return;
      const v = b.getAttribute('data-page');
      const totalPages = Math.max(1, Math.ceil(getProcessed().length / PAGE_SIZE));
      if (v === 'prev') _page = Math.max(1, _page - 1);
      else if (v === 'next') _page = Math.min(totalPages, _page + 1);
      else _page = parseInt(v, 10);
      refresh();
      root.querySelector('.cpv-bbdd-tablewrap').scrollTo({ top: 0, behavior: 'smooth' });
    });

    tbody.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="bbdd-clear"]')) { resetAll(); return; }
      if (e.target.closest('.cpv-bbdd-menu-btn')) return; // gestionado por delegación global
      if (e.target.closest('.cpv-bbdd-booking-link')) return; // abre el enlace sin abrir el drawer
      const tr = e.target.closest('tr[data-place-id]');
      if (tr) openDetalle(tr.getAttribute('data-place-id'), ctx);
    });

    /* ── menú contextual ⋯ (flotante, anclado al botón) ── */
    tbody.addEventListener('click', (e) => {
      const btn = e.target.closest('.cpv-bbdd-menu-btn'); if (!btn) return;
      e.stopPropagation();
      openRowMenu(btn, btn.getAttribute('data-menu-pid'), ctx, allRows);
    });

    /* ── exportar CSV ── */
    root.querySelector('#cpv-export').addEventListener('click', () => exportCSV(getProcessed(), ctx));

    /* ── cierre de overlays al click fuera ── */
    _outsideHandler = (e) => {
      if (!e.target.closest('.cpv-filter-trigger')) openPop(false);
      if (!e.target.closest('.cpv-row-menu') && !e.target.closest('.cpv-bbdd-menu-btn')) closeRowMenu();
    };
    document.addEventListener('click', _outsideHandler);

    syncControls();
    refresh();
  }

  /* ════ MENÚ CONTEXTUAL FLOTANTE ════ */
  function ensureMenu() {
    if (_menuEl) return _menuEl;
    _menuEl = document.createElement('div');
    _menuEl.className = 'cpv-row-menu';
    document.body.appendChild(_menuEl);
    return _menuEl;
  }
  function closeRowMenu() { if (_menuEl) _menuEl.classList.remove('open'); _menuPid = null; }
  function teardownMenu() {
    if (_outsideHandler) { document.removeEventListener('click', _outsideHandler); _outsideHandler = null; }
    if (_menuEl) { _menuEl.remove(); _menuEl = null; }
    _menuPid = null;
  }
  function openRowMenu(btn, pid, ctx, allRows) {
    const m = ensureMenu();
    const admin = ctx.role === 'admin';
    if (_menuPid === pid && m.classList.contains('open')) { closeRowMenu(); return; }
    _menuPid = pid;
    m.innerHTML =
      '<button class="dropdown-item" data-rm="detalle"><iconify-icon icon="iconoir:eye" width="16"></iconify-icon>Ver detalle</button>' +
      '<button class="dropdown-item" data-rm="mapa"><iconify-icon icon="iconoir:map-pin" width="16"></iconify-icon>Ver en mapa</button>' +
      '<button class="dropdown-item" data-rm="copy"><iconify-icon icon="iconoir:copy" width="16"></iconify-icon>Copiar place_id</button>' +
      (admin ? '<div class="dropdown-divider"></div>' +
        '<button class="dropdown-item" data-rm="corregir"><iconify-icon icon="iconoir:edit-pencil" width="16"></iconify-icon>Corregir dato</button>' +
        '<button class="dropdown-item" data-rm="changelog"><iconify-icon icon="iconoir:clock-rotate-right" width="16"></iconify-icon>Ver changelog</button>' : '');
    // posiciona bajo el botón, alineado a la derecha
    const r = btn.getBoundingClientRect();
    m.classList.add('open');
    const mw = m.offsetWidth || 198;
    let left = r.right - mw;
    if (left < 8) left = 8;
    let top = r.bottom + 4;
    const mh = m.offsetHeight || 180;
    if (top + mh > window.innerHeight - 8) top = r.top - mh - 4;
    m.style.left = left + 'px';
    m.style.top = top + 'px';

    m.onclick = (e) => {
      const it = e.target.closest('[data-rm]'); if (!it) return;
      const act = it.getAttribute('data-rm');
      closeRowMenu();
      if (act === 'detalle') openDetalle(pid, ctx);
      else if (act === 'mapa') { location.hash = '#/mapa?optica=' + encodeURIComponent(pid); }
      else if (act === 'copy') copyText(pid, ctx);
      else if (act === 'corregir') ctx.toast('info', 'Corregir dato', 'El editor de correcciones llega en la ficha de óptica (V5).');
      else if (act === 'changelog') { location.hash = '#/changelog?optica=' + encodeURIComponent(pid); }
    };
  }

  /* ── acciones auxiliares ─────────────────────────────────────── */
  function openDetalle(pid, ctx) {
    // Lote 3: abre el drawer V5 (componente global montado en body).
    if (window.cpvDrawer && typeof window.cpvDrawer.open === 'function') {
      window.cpvDrawer.open(pid);
      return;
    }
    const o = ctx.md.opticas_google.find((g) => g.place_id === pid);
    ctx.toast('info', 'Ficha de óptica', (o ? o.name + ' · ' : '') + 'la ficha completa (V5) no está disponible.');
  }
  function copyText(text, ctx) {
    const done = () => ctx.toast('success', 'Copiado', 'place_id ' + text + ' en el portapapeles.');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); done();
    } catch (e) {}
  }
  function exportCSV(rows, ctx) {
    const cols = ['place_id', 'name', 'city', 'provincia', 'tipo', 'cadena', 'rating', 'reviews', 'website', 'phone', 'email'];
    const esc = (v) => {
      const s = v == null ? '' : String(v);
      return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const lines = [cols.join(';')];
    rows.forEach((r) => {
      lines.push([r.place_id, r.name, r.city, r.provincia, r.client ? 'Cliente' : 'Otra',
        r.cadena || '', String(r.rating).replace('.', ','), r.reviews, r.website || '', r.phone || '', r.email || ''
      ].map(esc).join(';'));
    });
    const blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'opticas_export_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    ctx.toast('success', 'CSV exportado', fmtInt(rows.length) + ' ópticas · respeta los filtros activos.');
  }

  /* ── registro ──────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/bbdd'] = {
    render(state, ctx) {
      if (state === 'default') { _page = 1; _filters = initFilters(); _sort = { by: null, dir: 'asc' }; readParams(); }
      if (state === 'loading') return renderLoading();
      if (state === 'empty')   return renderEmpty(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted,
  };
})();
