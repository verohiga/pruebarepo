/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/changelog.js — V6 Changelog
   Registra window.cpvViews['/changelog'].
   Tabla densa ultra (32px) sobre cambios_historicos.
   Toolbar: búsqueda óptica + dropdowns Tipo / Campo / Usuario / Fechas.
   Exportar CSV · Paginación 50/pág · Integración drawer V5.
   Filtro especial ?optica= → chip eliminable encima de tabla.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ─────────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function debounce(fn, ms) {
    let t;
    return function () {
      const a = arguments, c = this;
      clearTimeout(t);
      t = setTimeout(() => fn.apply(c, a), ms);
    };
  }
  function grp(s) { return String(s).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function fmtInt(n) { return grp(String(Math.round(Math.abs(n)))); }
  function uniq(arr) {
    return Array.from(new Set(arr.filter(Boolean)))
      .sort((a, b) => String(a).localeCompare(String(b), 'es'));
  }
  function fmtFecha(iso) {
    const d  = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return dd + '/' + mm + ' ' + hh + ':' + mi;
  }

  const PAGE_SIZE = 50;

  /* ── tipo metadata ───────────────────────────────────────────── */
  const TIPO_META = {
    override_aplicado:    { label: 'Override',    pillCls: 'pill-warn',    icon: 'iconoir:edit-pencil'    },
    sync_outscraper:      { label: 'Sync Google',  pillCls: 'pill-pos',     icon: 'iconoir:refresh-double' },
    sync_salesforce:      { label: 'Sync CPV',     pillCls: 'pill-neutral', icon: 'iconoir:cloud-sync'     },
    vinculo_creado:       { label: 'Vínculo',      pillCls: 'pill-accent',  icon: 'iconoir:link'           },
    app_data_actualizado: { label: 'App data',     pillCls: 'pill-neutral', icon: 'iconoir:database'       },
  };

  /* ── tabla metadata ──────────────────────────────────────────── */
  const TABLA_PILL = {
    opticas_google:   ['pill-neutral', 'Google'],
    opticas_cpv:      ['pill-neutral', 'CPV'],
    opticas_app_data: ['pill-neutral', 'App data'],
  };

  /* ── estado del módulo ───────────────────────────────────────── */
  const initFilters = () => ({
    q:          '',     // búsqueda nombre/place_id
    tipo:       '',
    campo:      '',
    usuario:    '',
    rango:      'all',  // all | 24h | week | month | custom
    fechaDesde: '',
    fechaHasta: '',
    optica:     '',     // pre-aplicado desde ?optica=
  });

  let _filters         = initFilters();
  let _sort            = { by: 'fecha', dir: 'desc' };
  let _page            = 1;
  let _menuEl          = null;
  let _menuIdx         = null;
  let _outsideHandler  = null;

  /* ── columnas ────────────────────────────────────────────────── */
  const COLS = [
    { key: 'fecha',   label: 'Fecha',   sortable: true,  w: '96px'  },
    { key: 'optica',  label: 'Óptica',  sortable: false              },
    { key: 'tabla',   label: 'Tabla',   sortable: false, w: '108px' },
    { key: 'campo',   label: 'Campo',   sortable: true,  w: '120px' },
    { key: 'cambio',  label: 'Cambio',  sortable: false              },
    { key: 'tipo',    label: 'Tipo',    sortable: false, w: '108px' },
    { key: 'usuario', label: 'Usuario', sortable: false, w: '116px' },
    { key: 'menu',    label: '',        sortable: false, w: '40px', cls: 'cpv-bbdd-menu-col' },
  ];

  /* ── buildRows ───────────────────────────────────────────────── */
  function buildRows(md) {
    return md.cambios_historicos.map(function (ev, idx) {
      const user = ev.usuario_id
        ? md.usuarios.find(function (u) { return u.id === ev.usuario_id; })
        : null;

      /* ── resolver óptica y place_id ── */
      var optica_name = null;
      var place_id    = null;

      if (ev.tabla === 'opticas_google' && ev.registro_id) {
        var g = md.opticas_google.find(function (g) { return g.place_id === ev.registro_id; });
        if (g) {
          var eff = (md.helpers && md.helpers.aplica_overrides_google)
            ? (md.helpers.aplica_overrides_google(ev.registro_id) || g) : g;
          optica_name = eff.name || g.name;
          place_id    = g.place_id;
        }
      } else if (ev.tabla === 'opticas_cpv' && ev.registro_id) {
        var c = md.opticas_cpv.find(function (c) { return c.CODIGO === ev.registro_id; });
        if (c) {
          optica_name = c.LOCALIDAD ? c.CODIGO + ' · ' + c.LOCALIDAD : c.CODIGO;
          if (c.place_id_fk) place_id = c.place_id_fk;
        }
      } else if (ev.tabla === 'opticas_app_data' && ev.registro_id) {
        var ga = md.opticas_google.find(function (g) { return g.place_id === ev.registro_id; });
        if (ga) { optica_name = ga.name; place_id = ga.place_id; }
      } else if (ev.tipo === 'vinculo_creado') {
        if (ev.place_id) {
          var gv = md.opticas_google.find(function (g) { return g.place_id === ev.place_id; });
          if (gv) { optica_name = gv.name; place_id = ev.place_id; }
        }
        if (!optica_name && ev.registro_id) {
          var cv = md.opticas_cpv.find(function (c) { return c.CODIGO === ev.registro_id; });
          if (cv) optica_name = cv.LOCALIDAD ? cv.CODIGO + ' · ' + cv.LOCALIDAD : cv.CODIGO;
        }
      }

      /* ── formatear cambio ── */
      var cambio = '';
      if (ev.tipo === 'override_aplicado' || ev.tipo === 'app_data_actualizado') {
        var a = ev.valor_anterior != null ? String(ev.valor_anterior) : '—';
        var b = ev.valor_nuevo    != null ? String(ev.valor_nuevo)    : '—';
        cambio = a + ' → ' + b;
      } else if (ev.tipo === 'sync_outscraper') {
        cambio = ev.motivo || 'Sincronización Google Maps';
      } else if (ev.tipo === 'sync_salesforce') {
        cambio = ev.motivo || 'Sincronización Salesforce';
      } else if (ev.tipo === 'vinculo_creado') {
        cambio = (ev.registro_id || '—') + ' → ' + (ev.place_id || '—');
      } else {
        cambio = ev.motivo || '';
      }

      return {
        _idx:          idx,
        tipo:          ev.tipo,
        fecha:         ev.fecha,
        optica_name:   optica_name,
        place_id:      place_id,
        registro_id:   ev.registro_id,
        tabla:         ev.tabla,
        campo:         ev.campo || null,
        cambio:        cambio,
        valor_anterior: ev.valor_anterior,
        valor_nuevo:    ev.valor_nuevo,
        usuario_id:    ev.usuario_id,
        usuario_nombre: user ? user.nombre : null,
        motivo:        ev.motivo,
        can_revert:    ev.tipo === 'override_aplicado',
      };
    });
  }

  /* ── applyFilters ────────────────────────────────────────────── */
  function applyFilters(rows, f) {
    var q   = (f.q      || '').trim().toLowerCase();
    var oq  = (f.optica || '').trim().toLowerCase();
    var now = Date.now();

    return rows.filter(function (r) {
      /* búsqueda libre */
      if (q) {
        var hay = ((r.optica_name || '') + ' ' + (r.place_id || '') + ' ' + (r.registro_id || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      /* chip ?optica= */
      if (oq) {
        var hay2 = ((r.optica_name || '') + ' ' + (r.place_id || '') + ' ' + (r.registro_id || '')).toLowerCase();
        if (hay2.indexOf(oq) === -1) return false;
      }
      if (f.tipo   && r.tipo   !== f.tipo)   return false;
      if (f.campo  && r.campo  !== f.campo)  return false;
      if (f.usuario && r.usuario_id !== f.usuario) return false;

      /* rango de fechas */
      if (f.rango !== 'all') {
        var t = new Date(r.fecha).getTime();
        if (f.rango === '24h'   && t < now - 86400000)   return false;
        if (f.rango === 'week'  && t < now - 604800000)  return false;
        if (f.rango === 'month' && t < now - 2592000000) return false;
        if (f.rango === 'custom') {
          if (f.fechaDesde && r.fecha.slice(0, 10) < f.fechaDesde) return false;
          if (f.fechaHasta && r.fecha.slice(0, 10) > f.fechaHasta) return false;
        }
      }
      return true;
    });
  }

  /* ── applySort ───────────────────────────────────────────────── */
  function applySort(rows, s) {
    if (!s.by) return rows;
    var dir = s.dir === 'desc' ? -1 : 1;
    return rows.slice().sort(function (a, b) {
      if (s.by === 'fecha') return a.fecha.localeCompare(b.fecha) * dir;
      if (s.by === 'campo') return (a.campo || '').localeCompare(b.campo || '', 'es') * dir;
      return 0;
    });
  }

  /* ── THEAD ───────────────────────────────────────────────────── */
  function theadHTML() {
    return '<thead><tr>' + COLS.map(function (c) {
      var cls   = c.cls || '';
      var style = c.w ? ' style="width:' + c.w + '"' : '';
      var sa    = c.sortable ? ' data-sort-key="' + c.key + '"' : '';
      var icon  = c.sortable
        ? '<span class="sort-icon"><iconify-icon icon="iconoir:sort" width="13"></iconify-icon></span>' : '';
      return '<th' + (cls ? ' class="' + cls + '"' : '') + style + sa + '>' + enc(c.label) + icon + '</th>';
    }).join('') + '</tr></thead>';
  }

  /* ── CELL ────────────────────────────────────────────────────── */
  function cell(r, key) {
    switch (key) {

      case 'fecha':
        return '<td class="tnum c-ink2 cpv-cl-fecha">' + enc(fmtFecha(r.fecha)) + '</td>';

      case 'optica': {
        if (!r.optica_name) {
          return '<td><span class="c-muted" style="font-size:12px">—</span></td>';
        }
        var pidSnip = r.place_id
          ? '<span class="cpv-cl-pid">' + enc(r.place_id.slice(0, 22)) + (r.place_id.length > 22 ? '…' : '') + '</span>'
          : '';
        var clk = r.place_id ? ' data-cl-optica="' + enc(r.place_id) + '"' : '';
        return '<td><span class="cpv-cl-optica-cell"' + clk + (r.place_id ? ' style="cursor:pointer"' : '') + '>' +
          '<span class="cpv-cl-optica-name">' + enc(r.optica_name) + '</span>' +
          pidSnip + '</span></td>';
      }

      case 'tabla': {
        if (!r.tabla) {
          var sync = r.tipo && r.tipo.startsWith('sync_');
          return '<td><span class="pill ' + (sync ? 'pill-pos' : 'pill-neutral') + ' pill-sm">' +
            (sync ? 'sync' : '—') + '</span></td>';
        }
        var pm = TABLA_PILL[r.tabla] || ['pill-neutral', r.tabla];
        return '<td><span class="pill ' + pm[0] + ' pill-sm">' + enc(pm[1]) + '</span></td>';
      }

      case 'campo':
        if (!r.campo) return '<td><span class="c-muted" style="font-size:12px">—</span></td>';
        return '<td><code class="cpv-cl-campo">' + enc(r.campo) + '</code></td>';

      case 'cambio': {
        var full  = r.cambio || '';
        var trunc = full.length > 62 ? full.slice(0, 62) + '…' : full;
        return '<td class="cpv-cl-cambio" title="' + enc(full) + '">' + enc(trunc) + '</td>';
      }

      case 'tipo': {
        var meta = TIPO_META[r.tipo] || { label: r.tipo, pillCls: 'pill-neutral', icon: 'iconoir:dot-arrow-right' };
        return '<td><span class="pill ' + meta.pillCls + ' pill-sm">' +
          '<iconify-icon icon="' + meta.icon + '" width="11"></iconify-icon>' +
          enc(meta.label) + '</span></td>';
      }

      case 'usuario': {
        if (!r.usuario_nombre)
          return '<td><span class="c-muted" style="font-size:11px;font-style:italic">Sistema</span></td>';
        var ini  = r.usuario_nombre.trim().split(/\s+/).map(function (p) { return p[0] || ''; }).slice(0, 2).join('').toUpperCase();
        var first = r.usuario_nombre.split(' ')[0];
        return '<td><span style="display:flex;align-items:center;gap:5px">' +
          '<span class="avatar" style="width:20px;height:20px;font-size:8px;font-weight:700;flex-shrink:0">' + enc(ini) + '</span>' +
          '<span class="body-xs c-ink2">' + enc(first) + '</span>' +
          '</span></td>';
      }

      case 'menu':
        return '<td class="cpv-bbdd-menu-col">' +
          '<button class="cpv-bbdd-menu-btn" data-menu-idx="' + r._idx + '" aria-label="Acciones" aria-haspopup="true">' +
          '<iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button></td>';

      default: return '<td></td>';
    }
  }

  function rowHTML(r) {
    return '<tr data-cl-row="' + r._idx + '">' + COLS.map(function (c) { return cell(r, c.key); }).join('') + '</tr>';
  }

  /* ── paginación ──────────────────────────────────────────────── */
  function pageList(cur, total) {
    if (total <= 7) { var a = []; for (var i = 1; i <= total; i++) a.push(i); return a; }
    var out = [1];
    var lo  = Math.max(2, cur - 1), hi = Math.min(total - 1, cur + 1);
    if (lo > 2) out.push('…');
    for (var j = lo; j <= hi; j++) out.push(j);
    if (hi < total - 1) out.push('…');
    out.push(total);
    return out;
  }
  function paginationHTML(cur, totalRows) {
    var totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE));
    var from = totalRows === 0 ? 0 : (cur - 1) * PAGE_SIZE + 1;
    var to   = Math.min(cur * PAGE_SIZE, totalRows);
    var btns = pageList(cur, totalPages).map(function (p) {
      return p === '…'
        ? '<span class="page-ellipsis">…</span>'
        : '<button class="page-btn' + (p === cur ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
    }).join('');
    return '<div class="pagination-info">Mostrando <b>' + fmtInt(from) + '–' + fmtInt(to) +
      '</b> de <b>' + fmtInt(totalRows) + '</b> cambios</div>' +
      '<div class="pagination">' +
        '<button class="page-btn" data-page="prev"' + (cur <= 1 ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon></button>' +
        btns +
        '<button class="page-btn" data-page="next"' + (cur >= totalPages ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-right" width="15"></iconify-icon></button>' +
      '</div>';
  }

  /* ── chip óptica (?optica=) ──────────────────────────────────── */
  function opticaChipHTML(f, md) {
    if (!f.optica) return '';
    var g = md.opticas_google.find(function (g) {
      return g.place_id === f.optica ||
        g.name.toLowerCase().indexOf(f.optica.toLowerCase()) !== -1;
    });
    var label = g ? g.name : f.optica;
    return '<div class="cpv-bbdd-chips">' +
      '<span class="cpv-bbdd-chips-label">Filtros</span>' +
      '<span class="chip">' +
        '<span class="chip-label">Óptica: ' + enc(label) + '</span>' +
        '<button class="chip-remove" id="cpv-cl-remove-optica" aria-label="Quitar filtro">' +
          '<iconify-icon icon="iconoir:xmark" width="13"></iconify-icon></button>' +
      '</span>' +
      '</div>';
  }

  /* ── toolbar HTML ────────────────────────────────────────────── */
  function selectOpts(items, val, allLabel) {
    return '<option value="">' + enc(allLabel) + '</option>' +
      items.map(function (o) {
        return '<option value="' + enc(o.value) + '"' + (o.value === val ? ' selected' : '') + '>' + enc(o.label) + '</option>';
      }).join('');
  }

  function toolbarHTML(allRows) {
    /* opciones únicas a partir de todos los datos */
    var tipoOpts = [
      { value: 'override_aplicado',    label: 'Override'     },
      { value: 'sync_outscraper',      label: 'Sync Google'  },
      { value: 'sync_salesforce',      label: 'Sync CPV'     },
      { value: 'vinculo_creado',       label: 'Vínculo'      },
      { value: 'app_data_actualizado', label: 'App data'     },
    ];
    var campoVals = uniq(allRows.map(function (r) { return r.campo; }));
    var campoOpts = campoVals.map(function (v) { return { value: v, label: v }; });

    var seenUsers = {};
    var usuarioOpts = [];
    allRows.forEach(function (r) {
      if (r.usuario_id && !seenUsers[r.usuario_id]) {
        seenUsers[r.usuario_id] = true;
        usuarioOpts.push({ value: r.usuario_id, label: r.usuario_nombre || r.usuario_id });
      }
    });
    usuarioOpts.sort(function (a, b) { return a.label.localeCompare(b.label, 'es'); });

    var customVis = _filters.rango === 'custom' ? 'flex' : 'none';

    return '<div class="cpv-bbdd-toolbar">' +

      /* búsqueda */
      '<div class="input-wrap">' +
        '<span class="input-icon"><iconify-icon icon="iconoir:search" width="16"></iconify-icon></span>' +
        '<input class="input input-sm" id="cpv-cl-q" type="text" placeholder="Buscar óptica…" autocomplete="off" value="' + enc(_filters.q) + '">' +
        '<span class="input-suffix" id="cpv-cl-q-clear" style="display:' + (_filters.q ? 'flex' : 'none') + '">' +
          '<iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></span>' +
      '</div>' +

      /* Tipo */
      '<div class="cpv-bbdd-quick-field">' +
        '<span class="cpv-bbdd-quick-label">Tipo</span>' +
        '<select class="select select-sm" id="cpv-cl-tipo">' + selectOpts(tipoOpts, _filters.tipo, 'Todos') + '</select>' +
      '</div>' +

      /* Campo */
      (campoOpts.length
        ? '<div class="cpv-bbdd-quick-field">' +
            '<span class="cpv-bbdd-quick-label">Campo</span>' +
            '<select class="select select-sm" id="cpv-cl-campo">' + selectOpts(campoOpts, _filters.campo, 'Todos') + '</select>' +
          '</div>'
        : '') +

      /* Usuario */
      (usuarioOpts.length
        ? '<div class="cpv-bbdd-quick-field">' +
            '<span class="cpv-bbdd-quick-label">Usuario</span>' +
            '<select class="select select-sm" id="cpv-cl-usuario">' + selectOpts(usuarioOpts, _filters.usuario, 'Todos') + '</select>' +
          '</div>'
        : '') +

      /* Rango fechas */
      '<div class="cpv-bbdd-quick-field cpv-cl-dates-field">' +
        '<span class="cpv-bbdd-quick-label">Fechas</span>' +
        '<div style="display:flex;flex-direction:column;gap:4px">' +
          '<select class="select select-sm" id="cpv-cl-rango">' +
            '<option value="all"'    + (_filters.rango === 'all'    ? ' selected' : '') + '>Todas las fechas</option>' +
            '<option value="24h"'    + (_filters.rango === '24h'    ? ' selected' : '') + '>Últimas 24h</option>' +
            '<option value="week"'   + (_filters.rango === 'week'   ? ' selected' : '') + '>Última semana</option>' +
            '<option value="month"'  + (_filters.rango === 'month'  ? ' selected' : '') + '>Último mes</option>' +
            '<option value="custom"' + (_filters.rango === 'custom' ? ' selected' : '') + '>Personalizado</option>' +
          '</select>' +
          '<div id="cpv-cl-custom-dates" style="display:' + customVis + ';gap:4px;align-items:center">' +
            '<input type="date" class="input input-sm cpv-cl-date-input" id="cpv-cl-desde" value="' + enc(_filters.fechaDesde) + '">' +
            '<span class="c-muted" style="font-size:11px;flex-shrink:0">—</span>' +
            '<input type="date" class="input input-sm cpv-cl-date-input" id="cpv-cl-hasta" value="' + enc(_filters.fechaHasta) + '">' +
          '</div>' +
        '</div>' +
      '</div>' +

    '</div>';
  }

  /* ════ RENDER · DEFAULT ════════════════════════════════════════ */
  function renderDefault(ctx) {
    var md      = ctx.md;
    var allRows = buildRows(md);

    var header =
      '<div class="page-header"><div class="page-header-left">' +
        '<h1 class="page-title">Changelog</h1>' +
        '<p class="page-subtitle">' + fmtInt(allRows.length) + ' cambios registrados</p>' +
      '</div><div class="page-header-right">' +
        '<button class="btn btn-ghost btn-sm" id="cpv-cl-export">' +
          '<iconify-icon icon="iconoir:download" width="15"></iconify-icon>Exportar CSV</button>' +
      '</div></div>';

    var card =
      '<div class="card cpv-bbdd-card">' +
        toolbarHTML(allRows) +
        '<div id="cpv-cl-chip-slot">' + opticaChipHTML(_filters, md) + '</div>' +
        '<div class="table-wrap cpv-bbdd-tablewrap">' +
          '<table class="table-dense table-ultra cpv-bbdd-table">' +
            theadHTML() +
            '<tbody id="cpv-cl-tbody"></tbody>' +
          '</table>' +
        '</div>' +
        '<div class="pagination-wrap cpv-bbdd-pagination" id="cpv-cl-pagination"></div>' +
      '</div>';

    return header + card;
  }

  /* ════ RENDER · LOADING ════════════════════════════════════════ */
  function renderLoading() {
    var rows = '';
    var ws   = [55, 70, 48, 63, 80, 42, 58, 75, 50, 66, 45, 72, 60, 38, 68];
    for (var i = 0; i < 15; i++) {
      rows +=
        '<tr class="cpv-bbdd-skrow">' +
        '<td><span class="skeleton" style="width:78px"></span></td>' +
        '<td><span class="skeleton" style="width:' + ws[i] + '%"></span></td>' +
        '<td><span class="skeleton" style="width:64px"></span></td>' +
        '<td><span class="skeleton" style="width:60px"></span></td>' +
        '<td><span class="skeleton" style="width:' + (ws[(i + 3) % 15]) + '%"></span></td>' +
        '<td><span class="skeleton" style="width:72px"></span></td>' +
        '<td><span class="skeleton" style="width:68px"></span></td>' +
        '<td class="cpv-bbdd-menu-col"></td>' +
        '</tr>';
    }
    var header =
      '<div class="page-header"><div class="page-header-left">' +
        '<span class="skeleton sk-text-sm" style="width:80px;display:block"></span>' +
        '<span class="skeleton" style="width:160px;height:30px;margin-top:8px;display:block"></span>' +
        '<span class="skeleton sk-text-sm" style="width:220px;margin-top:8px;display:block"></span>' +
      '</div><div class="page-header-right">' +
        '<span class="skeleton" style="width:130px;height:30px;display:block"></span>' +
      '</div></div>';
    var toolbar =
      '<div class="cpv-bbdd-toolbar">' +
        '<span class="skeleton" style="width:280px;height:32px"></span>' +
        '<span class="skeleton" style="width:90px;height:32px"></span>' +
        '<span class="skeleton" style="width:90px;height:32px"></span>' +
        '<span class="skeleton" style="width:90px;height:32px"></span>' +
        '<span class="skeleton" style="width:120px;height:32px"></span>' +
      '</div>';
    return header +
      '<div class="card cpv-bbdd-card">' + toolbar +
        '<div class="table-wrap cpv-bbdd-tablewrap">' +
          '<table class="table-dense table-ultra cpv-bbdd-table">' + theadHTML() +
          '<tbody>' + rows + '</tbody></table>' +
        '</div>' +
        '<div class="pagination-wrap cpv-bbdd-pagination">' +
          '<span class="skeleton sk-text-sm" style="width:180px"></span>' +
          '<span class="skeleton" style="width:200px;height:32px"></span>' +
        '</div>' +
      '</div>';
  }

  /* ════ RENDER · EMPTY ══════════════════════════════════════════ */
  function renderEmpty(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path) +
      '<div class="card view-stub"><div class="empty-state">' +
        '<iconify-icon class="empty-state-icon" icon="iconoir:clock-rotate-right" width="32"></iconify-icon>' +
        '<h2 class="state-title">Sin historial aún</h2>' +
        '<p class="state-body">Los eventos aparecerán aquí tras la primera sincronización o cuando se apliquen correcciones.</p>' +
      '</div></div>';
  }

  /* ════ RENDER · ERROR ══════════════════════════════════════════ */
  function renderError(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path) +
      '<div class="card view-stub"><div class="error-state">' +
        '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
        '<h2 class="state-title">No se pudo cargar el changelog</h2>' +
        '<p class="state-body">Ha ocurrido un error al recuperar el historial de cambios.</p>' +
        '<button class="btn btn-primary btn-sm" data-action="retry">' +
          '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
  }

  /* ── readParams (hash ?optica=) ──────────────────────────────── */
  function readParams() {
    var h  = location.hash || '';
    var qi = h.indexOf('?');
    if (qi === -1) return;
    var sp = new URLSearchParams(h.slice(qi + 1));
    if (sp.get('optica')) _filters.optica = sp.get('optica');
    if (sp.get('tipo'))   _filters.tipo   = sp.get('tipo');
  }

  /* ════ MENÚ CONTEXTUAL FLOTANTE ════════════════════════════════ */
  function ensureMenu() {
    if (_menuEl) return _menuEl;
    _menuEl = document.createElement('div');
    _menuEl.className = 'cpv-row-menu';
    document.body.appendChild(_menuEl);
    return _menuEl;
  }
  function closeRowMenu() {
    if (_menuEl) _menuEl.classList.remove('open');
    _menuIdx = null;
  }
  function teardownMenu() {
    if (_outsideHandler) { document.removeEventListener('click', _outsideHandler); _outsideHandler = null; }
    if (_menuEl) { _menuEl.remove(); _menuEl = null; }
    _menuIdx = null;
  }
  function openRowMenu(btn, idx, row, ctx) {
    var m = ensureMenu();
    if (_menuIdx === idx && m.classList.contains('open')) { closeRowMenu(); return; }
    _menuIdx = idx;

    m.innerHTML =
      '<button class="dropdown-item" data-rm="detalle">' +
        '<iconify-icon icon="iconoir:eye" width="16"></iconify-icon>Ver óptica completa</button>' +
      (row.can_revert
        ? '<div class="dropdown-divider"></div>' +
          '<button class="dropdown-item cpv-item-danger" data-rm="revertir">' +
            '<iconify-icon icon="iconoir:undo" width="16"></iconify-icon>Revertir override</button>'
        : '');

    var r   = btn.getBoundingClientRect();
    m.classList.add('open');
    var mw  = m.offsetWidth || 200;
    var mh  = m.offsetHeight || 90;
    var lft = r.right - mw;
    var top = r.bottom + 4;
    if (lft < 8) lft = 8;
    if (top + mh > window.innerHeight - 8) top = r.top - mh - 4;
    m.style.left = lft + 'px';
    m.style.top  = top + 'px';

    m.onclick = function (e) {
      var it = e.target.closest('[data-rm]');
      if (!it) return;
      var act = it.getAttribute('data-rm');
      closeRowMenu();
      if (act === 'detalle') {
        if (row.place_id) openDetalle(row.place_id, ctx);
        else ctx.toast('info', 'Sin óptica vinculada', 'Este evento de sistema no está asociado a una óptica concreta.');
      } else if (act === 'revertir') {
        ctx.toast('info', 'Revertir override',
          'La reversión de overrides está disponible en la ficha de la óptica (V5, pestaña Cambios).');
      }
    };
  }

  /* ── openDetalle → drawer V5 ─────────────────────────────────── */
  function openDetalle(placeId, ctx) {
    if (window.cpvDrawer && typeof window.cpvDrawer.open === 'function') {
      window.cpvDrawer.open(placeId);
      return;
    }
    var o = ctx.md.opticas_google.find(function (g) { return g.place_id === placeId; });
    ctx.toast('info', 'Ficha de óptica',
      (o ? o.name + ' · ' : '') + 'la ficha completa (V5) no está disponible aún.');
  }

  /* ── exportCSV ───────────────────────────────────────────────── */
  function exportCSV(rows, ctx) {
    var headers = ['Fecha', 'Óptica', 'place_id', 'Tabla', 'Campo', 'Cambio', 'Tipo', 'Usuario', 'Motivo'];
    function esc(v) {
      var s = v == null ? '' : String(v);
      return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }
    var lines = [headers.join(';')];
    rows.forEach(function (r) {
      lines.push([
        r.fecha, r.optica_name, r.place_id, r.tabla,
        r.campo, r.cambio, r.tipo, r.usuario_nombre, r.motivo,
      ].map(esc).join(';'));
    });
    var blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href = url;
    a.download = 'changelog_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    ctx.toast('success', 'CSV exportado', fmtInt(rows.length) + ' cambios exportados.');
  }

  /* ════ MOUNTED ════════════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    teardownMenu();
    if (state !== 'default') return;

    var md      = ctx.md;
    var allRows = buildRows(md);
    var tbody   = root.querySelector('#cpv-cl-tbody');
    var pagEl   = root.querySelector('#cpv-cl-pagination');
    var thead   = root.querySelector('.cpv-bbdd-table thead');
    var chipSlot = root.querySelector('#cpv-cl-chip-slot');

    /* ── refresh ── */
    function getProcessed() { return applySort(applyFilters(allRows, _filters), _sort); }

    function refresh(opts) {
      if (opts && opts.resetPage) _page = 1;
      var processed  = getProcessed();
      var totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
      if (_page > totalPages) _page = totalPages;
      var slice = processed.slice((_page - 1) * PAGE_SIZE, _page * PAGE_SIZE);

      if (processed.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="' + COLS.length + '">' +
            '<div class="empty-state cpv-bbdd-tablestate">' +
              '<iconify-icon class="empty-state-icon" icon="iconoir:filter-list-xmark" width="30"></iconify-icon>' +
              '<h2 class="state-title">Sin resultados</h2>' +
              '<p class="state-body">No hay cambios para esos filtros.</p>' +
              '<button class="btn btn-ghost btn-sm" data-cl-clear>Limpiar filtros</button>' +
            '</div>' +
          '</td></tr>';
      } else {
        tbody.innerHTML = slice.map(rowHTML).join('');
      }
      pagEl.innerHTML = paginationHTML(_page, processed.length);

      /* iconos de orden */
      thead.querySelectorAll('th[data-sort-key]').forEach(function (th) {
        var key = th.getAttribute('data-sort-key');
        var ic  = th.querySelector('.sort-icon iconify-icon');
        if (ic) {
          if (_sort.by === key) {
            th.classList.add('sorted');
            ic.setAttribute('icon', _sort.dir === 'asc' ? 'iconoir:nav-arrow-up' : 'iconoir:nav-arrow-down');
          } else {
            th.classList.remove('sorted');
            ic.setAttribute('icon', 'iconoir:sort');
          }
        }
      });
    }

    /* ── resetAll (conserva el chip ?optica=) ── */
    function resetAll() {
      var prevOptica = _filters.optica;
      _filters = initFilters();
      _filters.optica = prevOptica;

      var qIn = root.querySelector('#cpv-cl-q');
      var qCl = root.querySelector('#cpv-cl-q-clear');
      if (qIn) { qIn.value = ''; }
      if (qCl) { qCl.style.display = 'none'; }
      ['#cpv-cl-tipo', '#cpv-cl-campo', '#cpv-cl-usuario'].forEach(function (sel) {
        var el = root.querySelector(sel); if (el) el.value = '';
      });
      var rangoSel = root.querySelector('#cpv-cl-rango');
      if (rangoSel) rangoSel.value = 'all';
      var customDates = root.querySelector('#cpv-cl-custom-dates');
      if (customDates) customDates.style.display = 'none';
      refresh({ resetPage: true });
    }

    /* ── búsqueda con debounce ── */
    var qInput = root.querySelector('#cpv-cl-q');
    var qClear = root.querySelector('#cpv-cl-q-clear');
    var onSearch = debounce(function () { refresh({ resetPage: true }); }, 300);
    qInput.addEventListener('input', function () {
      _filters.q = qInput.value;
      qClear.style.display = qInput.value ? 'flex' : 'none';
      onSearch();
    });
    qClear.addEventListener('click', function () {
      qInput.value = ''; _filters.q = ''; qClear.style.display = 'none';
      qInput.focus(); refresh({ resetPage: true });
    });

    /* ── dropdowns ── */
    var tipoSel = root.querySelector('#cpv-cl-tipo');
    if (tipoSel) tipoSel.addEventListener('change', function () { _filters.tipo = tipoSel.value; refresh({ resetPage: true }); });

    var campoSel = root.querySelector('#cpv-cl-campo');
    if (campoSel) campoSel.addEventListener('change', function () { _filters.campo = campoSel.value; refresh({ resetPage: true }); });

    var userSel = root.querySelector('#cpv-cl-usuario');
    if (userSel) userSel.addEventListener('change', function () { _filters.usuario = userSel.value; refresh({ resetPage: true }); });

    /* ── rango fechas ── */
    var rangoSel = root.querySelector('#cpv-cl-rango');
    var customDates = root.querySelector('#cpv-cl-custom-dates');
    if (rangoSel) rangoSel.addEventListener('change', function () {
      _filters.rango = rangoSel.value;
      if (customDates) customDates.style.display = _filters.rango === 'custom' ? 'flex' : 'none';
      refresh({ resetPage: true });
    });
    var desdeInput = root.querySelector('#cpv-cl-desde');
    var hastaInput = root.querySelector('#cpv-cl-hasta');
    if (desdeInput) desdeInput.addEventListener('change', function () { _filters.fechaDesde = desdeInput.value; refresh({ resetPage: true }); });
    if (hastaInput) hastaInput.addEventListener('change', function () { _filters.fechaHasta = hastaInput.value; refresh({ resetPage: true }); });

    /* ── chip ?optica= ── */
    chipSlot.addEventListener('click', function (e) {
      if (e.target.closest('#cpv-cl-remove-optica')) {
        _filters.optica = '';
        chipSlot.innerHTML = '';
        refresh({ resetPage: true });
      }
    });

    /* ── delegación en tabla: ⋯ menú + click óptica ── */
    root.querySelector('.cpv-bbdd-tablewrap').addEventListener('click', function (e) {
      /* botón ⋯ */
      var menuBtn = e.target.closest('.cpv-bbdd-menu-btn');
      if (menuBtn) {
        e.stopPropagation();
        var idx = parseInt(menuBtn.getAttribute('data-menu-idx'), 10);
        var row = allRows.find(function (r) { return r._idx === idx; });
        if (row) openRowMenu(menuBtn, idx, row, ctx);
        return;
      }
      /* click en celda óptica */
      var opticaCell = e.target.closest('[data-cl-optica]');
      if (opticaCell) {
        var pid = opticaCell.getAttribute('data-cl-optica');
        if (pid) openDetalle(pid, ctx);
        return;
      }
    });

    /* ── limpiar desde empty state ── */
    tbody.addEventListener('click', function (e) {
      if (e.target.closest('[data-cl-clear]')) resetAll();
    });

    /* ── paginación ── */
    pagEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-page]');
      if (!b || b.disabled) return;
      var v = b.getAttribute('data-page');
      var totalPages = Math.max(1, Math.ceil(getProcessed().length / PAGE_SIZE));
      if (v === 'prev')      _page = Math.max(1, _page - 1);
      else if (v === 'next') _page = Math.min(totalPages, _page + 1);
      else                   _page = parseInt(v, 10);
      refresh();
      root.querySelector('.cpv-bbdd-tablewrap').scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ── orden por columna ── */
    thead.addEventListener('click', function (e) {
      var th = e.target.closest('th[data-sort-key]');
      if (!th) return;
      var key = th.getAttribute('data-sort-key');
      if (_sort.by !== key) {
        _sort.by = key;
        _sort.dir = key === 'fecha' ? 'desc' : 'asc';
      } else if (_sort.dir === 'asc') {
        _sort.dir = 'desc';
      } else {
        _sort.by = null; _sort.dir = 'desc';
      }
      refresh();
    });

    /* ── exportar CSV ── */
    root.querySelector('#cpv-cl-export').addEventListener('click', function () {
      exportCSV(getProcessed(), ctx);
    });

    /* ── cierre de menú al click fuera ── */
    _outsideHandler = function (e) {
      if (!e.target.closest('.cpv-row-menu') && !e.target.closest('.cpv-bbdd-menu-btn')) closeRowMenu();
    };
    document.addEventListener('click', _outsideHandler);

    refresh();
  }

  /* ── registro ─────────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/changelog'] = {
    render: function (state, ctx) {
      if (state === 'default') {
        _page = 1;
        _filters = initFilters();
        _sort = { by: 'fecha', dir: 'desc' };
        readParams();
      }
      if (state === 'loading') return renderLoading();
      if (state === 'empty')   return renderEmpty(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted,
  };

})();
