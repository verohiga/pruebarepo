/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-logs.js — A5
   Auditoría de acciones de usuario. Tabla ultra-densa (32px).
   Filtros: Usuario · Tipo de acción · Rango fechas.
   Paginación 50/página · Exportar CSV.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function fmtFHS(iso) { // DD/MM HH:mm:ss
    var d = new Date(iso);
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + ' ' +
           pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }
  function grp(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function uniq(arr) { return Array.from(new Set(arr.filter(Boolean))); }

  var PAGE_SIZE = 50;

  /* ── action metadata ──────────────────────────────────────── */
  var ACTION_META = {
    login:                    { label: 'Login',               pillCls: 'pill-neutral' },
    logout:                   { label: 'Logout',              pillCls: 'pill-neutral' },
    descarga_csv:             { label: 'Descarga CSV',        pillCls: 'pill-accent'  },
    override_creado:          { label: 'Override creado',     pillCls: 'pill-warn'    },
    override_revertido:       { label: 'Override revertido',  pillCls: 'pill-warn'    },
    vinculo_creado:           { label: 'Vínculo creado',      pillCls: 'pill-pos'     },
    app_data_actualizado:     { label: 'App data',            pillCls: 'pill-neutral' },
    creación_usuario:         { label: 'Nuevo usuario',       pillCls: 'pill-accent'  },
    edición_usuario:          { label: 'Edición usuario',     pillCls: 'pill-neutral' },
    reset_password:           { label: 'Reset password',      pillCls: 'pill-warn'    },
    sync_lanzada:             { label: 'Sync lanzada',        pillCls: 'pill-pos'     },
    cadena_creada:            { label: 'Cadena creada',       pillCls: 'pill-accent'  },
    configuración_modificada: { label: 'Config. modificada',  pillCls: 'pill-warn'    },
  };

  /* ── module state ─────────────────────────────────────────── */
  var _page    = 1;
  var _filters = initFilters();

  function initFilters() {
    return { usuario: '', accion: '', rango: 'all', desde: '', hasta: '' };
  }

  /* ── build rows from md ───────────────────────────────────── */
  function buildRows(md) {
    return (md.logs_actividad || []).map(function (l, i) {
      var u = l.usuario_id
        ? (md.usuarios || []).find(function (x) { return x.id === l.usuario_id; })
        : null;
      return {
        _idx:    i,
        fecha:   l.fecha,
        uid:     l.usuario_id,
        uname:   u ? u.nombre : null,
        accion:  l.accion,
        detalle: l.detalle,
      };
    }).sort(function (a, b) { return b.fecha.localeCompare(a.fecha); });
  }

  /* ── filters ──────────────────────────────────────────────── */
  function applyFilters(rows, f) {
    var now = Date.now();
    return rows.filter(function (r) {
      if (f.usuario && String(r.uid) !== String(f.usuario)) return false;
      if (f.accion  && r.accion !== f.accion)               return false;
      if (f.rango !== 'all') {
        var t = new Date(r.fecha).getTime();
        if (f.rango === '24h'    && t < now - 86400000)    return false;
        if (f.rango === 'week'   && t < now - 604800000)   return false;
        if (f.rango === 'month'  && t < now - 2592000000)  return false;
        if (f.rango === 'custom') {
          if (f.desde && r.fecha.slice(0, 10) < f.desde) return false;
          if (f.hasta && r.fecha.slice(0, 10) > f.hasta) return false;
        }
      }
      return true;
    });
  }

  /* ── row HTML ─────────────────────────────────────────────── */
  function rowHTML(r) {
    var meta = ACTION_META[r.accion] || { label: r.accion, pillCls: 'pill-neutral' };
    var userCell = r.uname
      ? '<span style="display:inline-flex;align-items:center;gap:5px">' +
          '<span class="avatar" style="width:18px;height:18px;font-size:8px;flex-shrink:0">' +
            enc(r.uname.split(/\s+/).slice(0, 2).map(function (w) { return (w[0] || '').toUpperCase(); }).join('')) +
          '</span>' +
          '<span>' + enc(r.uname.split(' ')[0]) + '</span>' +
        '</span>'
      : '<span class="body-xs" style="color:var(--muted-2);font-style:italic">Sistema</span>';

    return '<tr>' +
      '<td class="tnum" style="font-family:var(--font-mono);font-size:11px;color:var(--muted);white-space:nowrap">' +
        enc(fmtFHS(r.fecha)) + '</td>' +
      '<td>' + userCell + '</td>' +
      '<td><span class="pill ' + meta.pillCls + ' pill-sm">' + enc(meta.label) + '</span></td>' +
      '<td class="body-xs c-ink2">' + enc(r.detalle || '—') + '</td>' +
    '</tr>';
  }

  /* ── pagination HTML ──────────────────────────────────────── */
  function pagHTML(cur, total) {
    var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    var from = total === 0 ? 0 : (cur - 1) * PAGE_SIZE + 1;
    var to   = Math.min(cur * PAGE_SIZE, total);
    /* page list */
    var pages = [1];
    var lo = Math.max(2, cur - 1), hi = Math.min(totalPages - 1, cur + 1);
    if (lo > 2) pages.push('…');
    for (var j = lo; j <= hi; j++) pages.push(j);
    if (hi < totalPages - 1) pages.push('…');
    if (totalPages > 1) pages.push(totalPages);
    var btns = pages.map(function (p) {
      return p === '…'
        ? '<span class="page-ellipsis">…</span>'
        : '<button class="page-btn' + (p === cur ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
    }).join('');
    return '<div class="pagination-info">Mostrando <b>' + grp(from) + '–' + grp(to) + '</b> de <b>' + grp(total) + '</b> entradas</div>' +
      '<div class="pagination">' +
        '<button class="page-btn" data-page="prev"' + (cur <= 1 ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon></button>' +
        btns +
        '<button class="page-btn" data-page="next"' + (cur >= totalPages ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-right" width="15"></iconify-icon></button>' +
      '</div>';
  }

  /* ── toolbar HTML ─────────────────────────────────────────── */
  function toolbarHTML(allRows, md) {
    /* unique users */
    var seenU = {};
    var userOpts = [];
    allRows.forEach(function (r) {
      if (r.uid && !seenU[r.uid]) {
        seenU[r.uid] = true;
        userOpts.push({ v: r.uid, l: r.uname || 'Usuario ' + r.uid });
      }
    });
    userOpts.sort(function (a, b) { return a.l.localeCompare(b.l, 'es'); });

    /* unique actions */
    var accionOpts = uniq(allRows.map(function (r) { return r.accion; }))
      .sort()
      .map(function (a) { return { v: a, l: (ACTION_META[a] || { label: a }).label }; });

    function sel(id, opts, cur, placeholder) {
      return '<select class="select select-sm" id="' + id + '">' +
        '<option value="">' + enc(placeholder) + '</option>' +
        opts.map(function (o) {
          return '<option value="' + enc(o.v) + '"' + (String(o.v) === String(cur) ? ' selected' : '') + '>' + enc(o.l) + '</option>';
        }).join('') + '</select>';
    }

    var customVis = _filters.rango === 'custom' ? 'flex' : 'none';

    return '<div class="table-toolbar">' +
      '<div class="table-toolbar-left" style="flex-wrap:wrap;gap:var(--space-3)">' +
        '<div class="cpv-bbdd-quick-field">' +
          '<span class="cpv-bbdd-quick-label">Usuario</span>' +
          sel('logs-usr', userOpts, _filters.usuario, 'Todos') +
        '</div>' +
        '<div class="cpv-bbdd-quick-field">' +
          '<span class="cpv-bbdd-quick-label">Acción</span>' +
          sel('logs-accion', accionOpts, _filters.accion, 'Todas') +
        '</div>' +
        '<div class="cpv-bbdd-quick-field">' +
          '<span class="cpv-bbdd-quick-label">Fechas</span>' +
          '<div style="display:flex;flex-direction:column;gap:4px">' +
            '<select class="select select-sm" id="logs-rango">' +
              '<option value="all"'   + (_filters.rango === 'all'    ? ' selected' : '') + '>Todas</option>' +
              '<option value="24h"'   + (_filters.rango === '24h'    ? ' selected' : '') + '>Últimas 24h</option>' +
              '<option value="week"'  + (_filters.rango === 'week'   ? ' selected' : '') + '>Última semana</option>' +
              '<option value="month"' + (_filters.rango === 'month'  ? ' selected' : '') + '>Último mes</option>' +
              '<option value="custom"'+ (_filters.rango === 'custom' ? ' selected' : '') + '>Personalizado</option>' +
            '</select>' +
            '<div id="logs-custom-dates" style="display:' + customVis + ';gap:4px;align-items:center">' +
              '<input type="date" class="input input-sm" id="logs-desde" style="width:120px;font-size:12px" value="' + enc(_filters.desde) + '">' +
              '<span class="c-muted" style="font-size:11px">—</span>' +
              '<input type="date" class="input input-sm" id="logs-hasta" style="width:120px;font-size:12px" value="' + enc(_filters.hasta) + '">' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="table-toolbar-right">' +
        '<button class="btn btn-ghost btn-sm" id="logs-export">' +
          '<iconify-icon icon="iconoir:download" width="14"></iconify-icon>Exportar CSV</button>' +
      '</div>' +
    '</div>';
  }

  /* ── page header ──────────────────────────────────────────── */
  function pageHeader(count) {
    return '<div class="page-header"><div class="page-header-left">' +
      '<h1 class="page-title">Logs de actividad</h1>' +
      '<p class="page-subtitle">' + grp(count) + ' entradas registradas</p>' +
    '</div></div>';
  }

  /* ════ RENDER DEFAULT ═══════════════════════════════════════ */
  function renderDefault(ctx) {
    var md      = ctx.md;
    var nav     = window.cpvAdmin ? window.cpvAdmin.subnav('logs', md) : '';
    var allRows = buildRows(md);

    return pageHeader(allRows.length) + nav +
      '<div class="card cpv-bbdd-card">' +
        toolbarHTML(allRows, md) +
        '<div class="table-wrap cpv-bbdd-tablewrap" id="logs-tablewrap">' +
          '<table class="table-dense table-ultra">' +
            '<thead><tr>' +
              '<th style="width:130px">Fecha</th>' +
              '<th style="width:150px">Usuario</th>' +
              '<th style="width:160px">Acción</th>' +
              '<th>Detalle</th>' +
            '</tr></thead>' +
            '<tbody id="logs-tbody"></tbody>' +
          '</table>' +
        '</div>' +
        '<div class="pagination-wrap" id="logs-pag"></div>' +
      '</div>';
  }

  /* ════ RENDER LOADING ═══════════════════════════════════════ */
  function renderLoading(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('logs', ctx.md) : '';
    var rows = Array(15).fill(0).map(function () {
      return '<tr class="cpv-bbdd-skrow">' +
        '<td><span class="skeleton" style="width:90px"></span></td>' +
        '<td><span class="skeleton" style="width:70%"></span></td>' +
        '<td><span class="skeleton" style="width:80px"></span></td>' +
        '<td><span class="skeleton" style="width:60%"></span></td>' +
      '</tr>';
    }).join('');
    return '<div class="page-header"><div class="page-header-left">' +
        '<span class="skeleton sk-text-sm" style="width:100px;display:block;margin-bottom:8px"></span>' +
        '<span class="skeleton" style="width:200px;height:30px;display:block"></span>' +
      '</div></div>' + nav +
      '<div class="card cpv-bbdd-card">' +
        '<div class="cpv-bbdd-toolbar">' +
          '<span class="skeleton" style="width:140px;height:32px"></span>' +
          '<span class="skeleton" style="width:140px;height:32px"></span>' +
          '<span class="skeleton" style="width:140px;height:32px"></span>' +
        '</div>' +
        '<div class="table-wrap cpv-bbdd-tablewrap">' +
          '<table class="table-dense table-ultra"><thead><tr>' +
            '<th>Fecha</th><th>Usuario</th><th>Acción</th><th>Detalle</th>' +
          '</tr></thead><tbody>' + rows + '</tbody></table>' +
        '</div>' +
      '</div>';
  }

  /* ════ RENDER EMPTY / ERROR ═════════════════════════════════ */
  function renderEmpty(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('logs', ctx.md) : '';
    return pageHeader(0) + nav +
      '<div class="card view-stub"><div class="empty-state">' +
        '<iconify-icon class="empty-state-icon" icon="iconoir:scroll" width="32"></iconify-icon>' +
        '<h2 class="state-title">Sin logs de actividad</h2>' +
        '<p class="state-body">Las acciones de los usuarios aparecerán aquí.</p>' +
      '</div></div>';
  }
  function renderError(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('logs', ctx.md) : '';
    return pageHeader(0) + nav +
      '<div class="card view-stub"><div class="error-state">' +
        '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
        '<h2 class="state-title">Error al cargar los logs</h2>' +
        '<button class="btn btn-primary btn-sm" data-action="retry">' +
          '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
  }

  /* ── export CSV ───────────────────────────────────────────── */
  function exportCSV(rows, ctx) {
    function esc(v) { var s = String(v == null ? '' : v); return /[",;\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
    var lines = ['Fecha;Usuario;Acción;Detalle'];
    rows.forEach(function (r) {
      lines.push([r.fecha, r.uname || 'Sistema', r.accion, r.detalle].map(esc).join(';'));
    });
    var blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href = url; a.download = 'logs_actividad_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    ctx.toast('success', 'CSV exportado', grp(rows.length) + ' entradas exportadas.');
  }

  /* ════ MOUNTED ══════════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    if (state !== 'default') return;
    var md      = ctx.md;
    var allRows = buildRows(md);
    var tbody   = root.querySelector('#logs-tbody');
    var pagEl   = root.querySelector('#logs-pag');
    var tablewrap = root.querySelector('#logs-tablewrap');

    function getProcessed() { return applyFilters(allRows, _filters); }

    function refresh(opts) {
      if (opts && opts.resetPage) _page = 1;
      var processed  = getProcessed();
      var totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
      if (_page > totalPages) _page = totalPages;
      var slice = processed.slice((_page - 1) * PAGE_SIZE, _page * PAGE_SIZE);

      if (processed.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4"><div class="empty-state" style="min-height:200px">' +
          '<iconify-icon class="empty-state-icon" icon="iconoir:filter-list-xmark" width="28"></iconify-icon>' +
          '<h2 class="state-title" style="font-size:16px">Sin resultados</h2>' +
          '<p class="state-body">No hay logs para esos filtros.</p>' +
          '<button class="btn btn-ghost btn-sm" id="logs-clear-btn">Limpiar filtros</button>' +
          '</div></td></tr>';
        var cb = root.querySelector('#logs-clear-btn');
        if (cb) cb.addEventListener('click', resetAll);
      } else {
        tbody.innerHTML = slice.map(rowHTML).join('');
      }
      pagEl.innerHTML = pagHTML(_page, processed.length);
    }

    function resetAll() {
      _filters = initFilters();
      var uSel = root.querySelector('#logs-usr');    if (uSel) uSel.value = '';
      var aSel = root.querySelector('#logs-accion'); if (aSel) aSel.value = '';
      var rSel = root.querySelector('#logs-rango');  if (rSel) rSel.value = 'all';
      var cd   = root.querySelector('#logs-custom-dates'); if (cd) cd.style.display = 'none';
      refresh({ resetPage: true });
    }

    /* Dropdowns */
    var uSel = root.querySelector('#logs-usr');
    if (uSel) uSel.addEventListener('change', function () { _filters.usuario = uSel.value; refresh({ resetPage: true }); });

    var aSel = root.querySelector('#logs-accion');
    if (aSel) aSel.addEventListener('change', function () { _filters.accion = aSel.value; refresh({ resetPage: true }); });

    /* Rango fechas */
    var rSel = root.querySelector('#logs-rango');
    var cd   = root.querySelector('#logs-custom-dates');
    if (rSel) rSel.addEventListener('change', function () {
      _filters.rango = rSel.value;
      if (cd) cd.style.display = _filters.rango === 'custom' ? 'flex' : 'none';
      refresh({ resetPage: true });
    });
    var desdeIn = root.querySelector('#logs-desde');
    var hastaIn = root.querySelector('#logs-hasta');
    if (desdeIn) desdeIn.addEventListener('change', function () { _filters.desde = desdeIn.value; refresh({ resetPage: true }); });
    if (hastaIn) hastaIn.addEventListener('change', function () { _filters.hasta = hastaIn.value; refresh({ resetPage: true }); });

    /* Paginación */
    pagEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-page]');
      if (!b || b.disabled) return;
      var v = b.getAttribute('data-page');
      var totalPages = Math.max(1, Math.ceil(getProcessed().length / PAGE_SIZE));
      if (v === 'prev')      _page = Math.max(1, _page - 1);
      else if (v === 'next') _page = Math.min(totalPages, _page + 1);
      else                   _page = parseInt(v, 10);
      refresh();
      if (tablewrap) tablewrap.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* Export CSV */
    var expBtn = root.querySelector('#logs-export');
    if (expBtn) expBtn.addEventListener('click', function () { exportCSV(getProcessed(), ctx); });

    refresh();
  }

  /* ── register ─────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/admin/logs'] = {
    render: function (state, ctx) {
      if (state === 'default') { _page = 1; _filters = initFilters(); }
      if (state === 'loading') return renderLoading(ctx);
      if (state === 'empty')   return renderEmpty(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted,
  };
})();
