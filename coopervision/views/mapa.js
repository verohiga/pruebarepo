/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/mapa.js — V3 Mapa
   Registra window.cpvViews['/mapa']. Layout full-bleed: panel 360px +
   mapa Leaflet fluido (CartoDB Positron). Filtros (búsqueda / tipo /
   valoración) 100% funcionales sobre los 40 mock de opticas_google.
   Marcadores: cliente círculo 12px accent, no cliente 10px gris.
   data-place-id en items y en el botón del popup (drawer V5 en Lote 3).
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── formato es-ES manual (igual que resumen.js / bi.js) ───── */
  const group = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const fmtInt = (n) => group(String(Math.round(Math.abs(n))));
  function fmtDec(n, d) {
    const f = Math.abs(Number(n)).toFixed(d), p = f.split('.');
    return group(p[0]) + (p[1] ? ',' + p[1] : '');
  }
  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function debounce(fn, ms) {
    let t; return function () { const a = arguments, c = this; clearTimeout(t); t = setTimeout(() => fn.apply(c, a), ms); };
  }

  /* ── colores marcador ──────────────────────────────────────── */
  const M_CLIENT = { fillColor: '#C5E817', color: '#8FA710', radius: 6, weight: 1.6, fillOpacity: 0.92 };
  const M_OTHER  = { fillColor: '#C7C9CD', color: '#A8AAAE', radius: 5, weight: 1.3, fillOpacity: 0.85 };
  const CENTER = [40.4168, -3.7038];
  const ZOOM = 6;
  const TILE = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

  /* ── estado del módulo (instancia única de mapa) ───────────── */
  let _map = null, _layer = null, _markers = {}, _selected = null;

  /* ── opticas con flag client ───────────────────────────────── */
  function getOpticas(md) {
    return md.opticas_google.map((o) => ({ o: o, client: md.helpers.is_client(o.place_id) }));
  }
  function applyFilters(list, f) {
    const q = (f.q || '').trim().toLowerCase();
    return list.filter((x) => {
      if (f.tipo === 'partners' && !x.client) return false;
      if (f.tipo === 'no' && x.client) return false;
      if (x.o.rating < f.min) return false;
      if (q) {
        const hay = (x.o.name + ' ' + x.o.city + ' ' + x.o.state + ' ' + x.o.address).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    }).sort((a, b) => b.o.rating - a.o.rating || b.o.reviews - a.o.reviews);
  }

  /* ── popup HTML (spec §V3.4, 280px) ────────────────────────── */
  function popupHTML(x) {
    const o = x.o;
    const pill = x.client
      ? '<span class="pill pill-accent pill-sm"><iconify-icon icon="iconoir:verified-badge" width="11"></iconify-icon>Cliente</span>'
      : '<span class="pill pill-paused pill-sm">Otra</span>';
    const web = o.website
      ? ' · <a href="' + enc(o.website) + '" target="_blank" rel="noopener">Web</a>' : '';
    const phone = o.phone ? enc(o.phone) : 'Sin teléfono';
    return '<div class="cpv-map-pop">' +
      '<div class="cpv-map-pop-head"><span class="cpv-map-pop-name">' + enc(o.name) + '</span>' + pill + '</div>' +
      '<div class="cpv-map-pop-addr">' + enc(o.address) + '</div>' +
      '<div class="cpv-map-pop-rating"><span class="cpv-star">★</span> ' + fmtDec(o.rating, 1) +
        ' <span style="color:var(--muted);font-weight:400">· ' + fmtInt(o.reviews) + ' reseñas</span></div>' +
      '<div class="cpv-map-pop-contact">' + phone + web + '</div>' +
      '<button class="btn btn-primary btn-sm" data-place-id="' + enc(o.place_id) + '" data-action="open-detalle">' +
        'Ver detalle completo<iconify-icon icon="iconoir:arrow-right" width="14"></iconify-icon></button>' +
      '</div>';
  }

  /* ── item de lista (~56px) ─────────────────────────────────── */
  function itemHTML(x) {
    const o = x.o;
    const dot = '<span class="cpv-map-item-dot" style="background:' + (x.client ? '#C5E817' : '#C7C9CD') + '"></span>';
    const badge = x.client
      ? '<span class="pill pill-accent pill-sm"><span class="pill-dot"></span>Cliente</span>' : '';
    return '<button class="cpv-map-item" data-place-id="' + enc(o.place_id) + '">' + dot +
      '<span class="cpv-map-item-body">' +
        '<span class="cpv-map-item-name-row"><span class="cpv-map-item-name">' + enc(o.name) + '</span>' + badge + '</span>' +
        '<span class="cpv-map-item-meta">' + enc(o.city) +
          ' · <span class="cpv-star">★</span> ' + fmtDec(o.rating, 1) +
          ' · ' + fmtInt(o.reviews) + ' reseñas</span>' +
      '</span></button>';
  }

  /* ════ RENDER · shell full-bleed ════ */
  function panelControls() {
    return '<div class="cpv-mapa-head">' +
        '<h1 class="page-title">Mapa</h1>' +
      '</div>' +
      '<div class="cpv-mapa-controls">' +
        '<div class="input-wrap">' +
          '<span class="input-icon"><iconify-icon icon="iconoir:search" width="16"></iconify-icon></span>' +
          '<input class="input input-sm" id="cpv-map-q" type="text" placeholder="Buscar óptica, ciudad o provincia…" autocomplete="off">' +
          '<span class="input-suffix" id="cpv-map-q-clear" style="display:none"><iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></span>' +
        '</div>' +
        '<div class="cpv-map-field">' +
          '<span class="cpv-map-field-label">Tipo de óptica</span>' +
          '<div class="cpv-map-seg" id="cpv-map-tipo" data-tipo="todas">' +
            '<button data-t="todas" class="on">Todas</button>' +
            '<button data-t="partners">Partners</button>' +
            '<button data-t="no">No partners</button>' +
          '</div>' +
        '</div>' +
        '<div class="cpv-map-field">' +
          '<div class="cpv-map-field-head"><span class="cpv-map-field-label">Valoración mínima</span>' +
            '<span class="cpv-map-field-val" id="cpv-map-rating-val">Todas</span></div>' +
          '<input type="range" class="slider" id="cpv-map-rating" min="0" max="5" step="0.5" value="0">' +
          '<div class="cpv-map-ticks"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>' +
        '</div>' +
      '</div>';
  }
  function renderDefault() {
    return '<div class="cpv-mapa">' +
      '<aside class="cpv-mapa-panel">' +
        panelControls() +
        '<div class="cpv-map-results-head">' +
          '<span class="cpv-map-results-title">Resultados · <b id="cpv-map-count">0</b></span>' +
          '<button class="cpv-map-reset" id="cpv-map-reset"><iconify-icon icon="iconoir:refresh" width="13"></iconify-icon>Reset</button>' +
        '</div>' +
        '<div class="cpv-map-list" id="cpv-map-list"></div>' +
      '</aside>' +
      '<div class="cpv-mapa-map">' +
        '<div class="cpv-leaflet" id="cpv-leaflet"></div>' +
        '<div class="cpv-map-legend">' +
          '<span class="cpv-map-legend-item"><span class="cpv-map-legend-dot" style="background:#C5E817"></span>Partners</span>' +
          '<span class="cpv-map-legend-item"><span class="cpv-map-legend-dot" style="background:#C7C9CD"></span>Otras ópticas</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ════ RENDER · loading (tiles + skeleton lista) ════ */
  function renderLoading() {
    let items = '';
    for (let i = 0; i < 7; i++) {
      items += '<div style="display:flex;gap:10px;align-items:center;padding:9px 11px">' +
        '<span class="skeleton" style="width:10px;height:10px;border-radius:99px"></span>' +
        '<div style="flex:1;display:flex;flex-direction:column;gap:6px">' +
        '<span class="skeleton sk-text-sm" style="width:70%"></span>' +
        '<span class="skeleton sk-text-sm" style="width:45%"></span></div></div>';
    }
    return '<div class="cpv-mapa">' +
      '<aside class="cpv-mapa-panel">' +
        '<div class="cpv-mapa-head">' +
        '<h1 class="page-title">Mapa</h1></div>' +
        '<div class="cpv-mapa-controls">' +
          '<span class="skeleton" style="height:32px"></span>' +
          '<span class="skeleton" style="height:36px;border-radius:var(--radius-md)"></span>' +
          '<span class="skeleton" style="height:30px"></span></div>' +
        '<div class="cpv-map-results-head"><span class="skeleton sk-text-sm" style="width:120px"></span></div>' +
        '<div class="cpv-map-list">' + items + '</div>' +
      '</aside>' +
      '<div class="cpv-mapa-map"><div class="cpv-map-placeholder">' +
        '<iconify-icon class="ph-icon" icon="iconoir:map" width="30"></iconify-icon>' +
        '<span class="ph-text">Cargando mapa…</span></div></div>' +
    '</div>';
  }

  /* ════ RENDER · empty (BBDD vacía) ════ */
  function renderEmpty(ctx) {
    return '<div class="cpv-mapa">' +
      '<aside class="cpv-mapa-panel">' +
        '<div class="cpv-mapa-head">' +
        '<h1 class="page-title">Mapa</h1></div>' +
        '<div class="cpv-map-results-head"><span class="cpv-map-results-title">Resultados · <b>0</b></span></div>' +
        '<div class="cpv-map-empty">' +
          '<iconify-icon class="cpv-map-empty-icon" icon="iconoir:map-xmark" width="30"></iconify-icon>' +
          '<span class="cpv-map-empty-text">No hay ópticas en la base de datos todavía.</span>' +
          (ctx.role === 'admin'
            ? '<a class="btn btn-primary btn-sm" href="#/admin/operaciones"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Lanzar sincronización</a>'
            : '') +
        '</div>' +
      '</aside>' +
      '<div class="cpv-mapa-map"><div class="cpv-map-placeholder">' +
        '<iconify-icon class="ph-icon" icon="iconoir:map-pin" width="30"></iconify-icon>' +
        '<span class="ph-text">Sin ópticas que situar en el mapa.</span></div></div>' +
    '</div>';
  }

  /* ════ RENDER · error ════ */
  function renderError() {
    return '<div class="cpv-mapa">' +
      '<aside class="cpv-mapa-panel">' +
        '<div class="cpv-mapa-head">' +
        '<h1 class="page-title">Mapa</h1></div>' +
        '<div class="cpv-map-empty" style="margin-top:var(--space-6)">' +
          '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="30"></iconify-icon>' +
          '<span class="cpv-map-empty-text">No se pudieron cargar las ubicaciones.</span>' +
          '<button class="btn btn-primary btn-sm" data-action="retry"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
        '</div>' +
      '</aside>' +
      '<div class="cpv-mapa-map"><div class="cpv-map-placeholder">' +
        '<iconify-icon class="ph-icon" icon="iconoir:map" width="30"></iconify-icon>' +
        '<span class="ph-text">Error al cargar el mapa.</span></div></div>' +
    '</div>';
  }

  /* ── interacciones (solo en default) ───────────────────────── */
  function mounted(root, state, ctx) {
    if (state !== 'default') return;
    if (typeof L === 'undefined') return; // Leaflet no disponible

    const md = ctx.md;
    const all = getOpticas(md);
    const filters = { q: '', tipo: 'todas', min: 0 };

    const listEl = root.querySelector('#cpv-map-list');
    const countEl = root.querySelector('#cpv-map-count');
    const mapEl = root.querySelector('#cpv-leaflet');

    /* destruye instancia previa (el DOM se reemplaza en cada render) */
    if (_map) { try { _map.remove(); } catch (e) {} _map = null; }
    _markers = {}; _selected = null;

    _map = L.map(mapEl, { center: CENTER, zoom: ZOOM, zoomControl: false, scrollWheelZoom: true });
    L.control.zoom({ position: 'bottomright' }).addTo(_map);
    L.tileLayer(TILE, { attribution: TILE_ATTR, subdomains: 'abcd', maxZoom: 19 }).addTo(_map);
    _layer = L.layerGroup().addTo(_map);
    // Leaflet necesita recalcular tamaño tras inyectar el contenedor full-bleed
    setTimeout(() => { if (_map) _map.invalidateSize(); }, 60);

    // TODO: leaflet.markercluster en producción (19k puntos). Con los 40 mock
    // se renderizan marcadores sueltos sobre _layer; en prod, sustituir _layer
    // por un L.markerClusterGroup con clustering en zoom < 8.

    function baseStyle(x) { return x.client ? M_CLIENT : M_OTHER; }

    function buildMarkers(filtered) {
      _layer.clearLayers();
      _markers = {};
      filtered.forEach((x) => {
        const m = L.circleMarker([x.o.latitude, x.o.longitude], baseStyle(x));
        m.bindPopup(popupHTML(x), { maxWidth: 280, minWidth: 280, className: 'cpv-map-popup', closeButton: true });
        m.on('click', () => highlight(x.o.place_id, false));
        m._pid = x.o.place_id;
        _layer.addLayer(m);
        _markers[x.o.place_id] = m;
      });
    }

    function setSelectedStyle() {
      Object.keys(_markers).forEach((pid) => {
        const m = _markers[pid];
        const x = all.find((a) => a.o.place_id === pid);
        const base = baseStyle(x);
        if (pid === _selected) m.setStyle({ radius: base.radius + 3, weight: 2.4, color: '#5E7406', fillOpacity: 1 });
        else m.setStyle(base);
      });
    }

    function highlight(pid, fly) {
      _selected = pid;
      // lista
      listEl.querySelectorAll('.cpv-map-item').forEach((el) => el.classList.toggle('on', el.dataset.placeId === pid));
      const sel = listEl.querySelector('.cpv-map-item.on');
      if (sel) listEl.scrollTo({ top: Math.max(0, sel.offsetTop - 8), behavior: 'smooth' });
      // marcador
      const m = _markers[pid];
      if (m) {
        if (fly) _map.flyTo(m.getLatLng(), 16, { duration: 0.7 });
        m.openPopup();
      }
      setSelectedStyle();
    }

    function refresh(opts) {
      const filtered = applyFilters(all, filters);
      countEl.textContent = fmtInt(filtered.length);
      // lista
      if (filtered.length === 0) {
        listEl.innerHTML = '<div class="cpv-map-empty">' +
          '<iconify-icon class="cpv-map-empty-icon" icon="iconoir:filter-list" width="28"></iconify-icon>' +
          '<span class="cpv-map-empty-text">No hay ópticas con esos filtros.</span>' +
          '<button class="btn btn-ghost btn-sm" data-action="map-reset">Limpiar filtros</button></div>';
      } else {
        listEl.innerHTML = filtered.map(itemHTML).join('');
      }
      buildMarkers(filtered);
      // si la selección sigue visible, mantenla; si no, deselecciona
      if (_selected && !_markers[_selected]) _selected = null;
      setSelectedStyle();
      // búsqueda que deja 1 resultado → flyTo
      if (opts && opts.flyIfSingle && filtered.length === 1) {
        highlight(filtered[0].o.place_id, true);
      }
    }

    /* ── búsqueda (debounce 300ms) + limpiable ── */
    const qInput = root.querySelector('#cpv-map-q');
    const qClear = root.querySelector('#cpv-map-q-clear');
    const onSearch = debounce(() => { refresh({ flyIfSingle: true }); }, 300);
    qInput.addEventListener('input', () => {
      filters.q = qInput.value;
      qClear.style.display = qInput.value ? 'flex' : 'none';
      onSearch();
    });
    qClear.addEventListener('click', () => {
      qInput.value = ''; filters.q = ''; qClear.style.display = 'none'; qInput.focus(); refresh();
    });

    /* ── segmented tipo ── */
    const seg = root.querySelector('#cpv-map-tipo');
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-t]'); if (!b) return;
      filters.tipo = b.getAttribute('data-t');
      seg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
      refresh();
    });

    /* ── slider valoración ── */
    const slider = root.querySelector('#cpv-map-rating');
    const ratingVal = root.querySelector('#cpv-map-rating-val');
    slider.addEventListener('input', () => {
      filters.min = parseFloat(slider.value);
      ratingVal.innerHTML = filters.min === 0 ? 'Todas' : (fmtDec(filters.min, 1) + ' <span class="cpv-star" style="color:#E0B600">★</span>');
      refresh();
    });

    /* ── reset filtros ── */
    function resetFilters() {
      filters.q = ''; filters.tipo = 'todas'; filters.min = 0;
      qInput.value = ''; qClear.style.display = 'none';
      ratingVal.textContent = 'Todas'; slider.value = '0';
      seg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x.getAttribute('data-t') === 'todas'));
      _selected = null;
      refresh();
      _map.flyTo(CENTER, ZOOM, { duration: 0.6 });
    }
    root.querySelector('#cpv-map-reset').addEventListener('click', resetFilters);

    /* ── click en item de lista → flyTo + selecciona ── */
    listEl.addEventListener('click', (e) => {
      const reset = e.target.closest('[data-action="map-reset"]');
      if (reset) { resetFilters(); return; }
      const item = e.target.closest('.cpv-map-item'); if (!item) return;
      highlight(item.dataset.placeId, true);
    });

    /* ── render inicial ── */
    refresh();
  }

  /* ── registro ──────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/mapa'] = {
    render(state, ctx) {
      if (state === 'loading') return renderLoading();
      if (state === 'empty')   return renderEmpty(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault();
    },
    mounted: mounted,
  };
})();
