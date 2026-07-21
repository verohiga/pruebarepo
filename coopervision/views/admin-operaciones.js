/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-operaciones.js — A2
   Centro de control de sincronizaciones.
   Cards Outscraper + Salesforce · config · historial · descarga.
   Variante "en curso": banner persistente + spinner en card.
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
  function fmtFH(iso) {
    var d = new Date(iso);
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + ' ' +
           pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function fmtF(iso) {
    var d = new Date(iso);
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
  }
  function dur(iso1, iso2) {
    var ms = new Date(iso2) - new Date(iso1);
    var h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000);
    return (h > 0 ? h + 'h ' : '') + m + 'min';
  }
  function grp(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function lastOf(md, fuente) {
    return (md.syncs_historial || [])
      .filter(function (s) { return s.fuente === fuente; })
      .sort(function (a, b) { return b.id - a.id; })[0] || null;
  }

  /* ── module state ─────────────────────────────────────────── */
  var _pending   = null;  // fuente pendiente de confirmar
  var _inCurso   = null;  // fuente en ejecución
  var _syncTimer = null;

  /* ── sync card HTML ───────────────────────────────────────── */
  function syncCardHTML(md, fuente) {
    var last  = lastOf(md, fuente);
    var cfg   = (md.syncs_config || {})[fuente];
    var isOut = fuente === 'outscraper';
    var id    = 'cpv-sync-' + fuente;

    var resPill = last
      ? (last.resultado === 'ok'
          ? '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Completada</span>'
          : last.resultado === 'fallo_parcial'
          ? '<span class="pill pill-warn pill-sm"><span class="pill-dot"></span>Fallo parcial</span>'
          : '<span class="pill pill-neg pill-sm"><span class="pill-dot"></span>Error</span>')
      : '<span class="pill pill-neutral pill-sm">Sin datos</span>';

    var stats = last
      ? '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-5)">' +
          '<div class="data-pair"><span class="data-label">Última sync</span>' +
            '<span class="data-value tnum">' + enc(fmtFH(last.fecha_inicio)) + '</span></div>' +
          '<div class="data-pair"><span class="data-label">Duración</span>' +
            '<span class="data-value">' + enc(dur(last.fecha_inicio, last.fecha_fin)) + '</span></div>' +
          '<div class="data-pair" style="grid-column:span 2"><span class="data-label">Cambios</span>' +
            '<span class="data-value" style="display:flex;gap:10px;flex-wrap:wrap">' +
              '<span style="color:var(--pos-ink);font-weight:600">+' + last.deltas.nuevos + ' nuevos</span>' +
              (last.deltas.conflictos > 0
                ? '<span style="color:var(--warn-ink);font-weight:600">⚠ ' + last.deltas.conflictos + ' conflictos</span>' : '') +
              (last.deltas.no_encontrados > 0
                ? '<span class="c-muted">' + last.deltas.no_encontrados + ' no encontrados</span>' : '') +
            '</span></div>' +
          (cfg ? '<div class="data-pair"><span class="data-label">Próxima estimada</span>' +
            '<span class="data-value tnum">' + enc(fmtF(cfg.proxima)) + '</span></div>' : '') +
        '</div>'
      : '<p class="body-sm c-muted" style="margin-bottom:var(--space-5)">Sin sincronizaciones registradas.</p>';

    return '<div class="card" id="' + id + '" style="display:flex;flex-direction:column;gap:var(--space-3)">' +
      '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-3)">' +
        '<div>' +
          '<div style="font-family:var(--font-display);font-size:16px;font-weight:700;letter-spacing:-.01em;margin-bottom:3px">' +
            enc(isOut ? 'Outscraper / Google Maps' : 'Salesforce / CooperVision') + '</div>' +
          '<div style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted)">' +
            '<iconify-icon icon="iconoir:arrow-right" width="12"></iconify-icon>' +
            '<code style="font-family:var(--font-mono);font-size:11px;background:var(--line-2);padding:1px 6px;border-radius:var(--radius-sm)">' +
              enc(isOut ? 'opticas_google' : 'opticas_cpv') + '</code>' +
          '</div>' +
        '</div>' +
        '<span id="' + id + '-pill">' + resPill + '</span>' +
      '</div>' +

      '<div id="' + id + '-default" style="display:flex;flex-direction:column;gap:var(--space-4)">' +
        stats +
        '<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center" data-sync-now="' + fuente + '">' +
          '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Sincronizar ahora</button>' +
      '</div>' +

      '<div id="' + id + '-curso" style="display:none;flex-direction:column;gap:var(--space-4)">' +
        '<div style="display:flex;align-items:center;gap:14px;padding:var(--space-2) 0">' +
          '<span class="cpv-spin-icon" style="color:var(--warn-ink);font-size:0;flex-shrink:0">' +
            '<iconify-icon icon="iconoir:refresh-double" width="28"></iconify-icon></span>' +
          '<div><div style="font-weight:600;font-size:14px">Sincronización en curso…</div>' +
          '<div class="body-xs c-muted">Puede tardar entre 30 min y varias horas.</div></div>' +
        '</div>' +
        '<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center" disabled>' +
          '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>En curso…</button>' +
      '</div>' +
    '</div>';
  }

  /* ── config form ──────────────────────────────────────────── */
  function configHTML(md) {
    var cfg = md.syncs_config || {};
    var oFreqs = [
      {v:'1_mes',l:'Cada mes'}, {v:'2_meses',l:'Cada 2 meses'},
      {v:'3_meses',l:'Cada 3 meses'}, {v:'6_meses',l:'Cada 6 meses'}, {v:'manual',l:'Manual'},
    ];
    var sfFreqs = [
      {v:'3_meses',l:'Cada 3 meses'}, {v:'6_meses',l:'Cada 6 meses'},
      {v:'12_meses',l:'Cada 12 meses'}, {v:'manual',l:'Manual'},
    ];
    var dias  = ['lunes','martes','miércoles','jueves','viernes','sábado','domingo'];
    var horas = ['00:00','01:00','02:00','03:00','04:00','22:00','23:00'];
    function sel(id, opts, cur) {
      return '<select class="select select-sm" id="' + id + '">' +
        opts.map(function (o) {
          var v = o.v || o, l = o.l || o;
          return '<option value="' + enc(v) + '"' + (v === cur ? ' selected' : '') + '>' + enc(l) + '</option>';
        }).join('') + '</select>';
    }
    var oCur  = cfg.outscraper ? cfg.outscraper.frecuencia : '3_meses';
    var sfCur = cfg.salesforce ? cfg.salesforce.frecuencia : '6_meses';
    var diaCur  = cfg.outscraper ? cfg.outscraper.dia  : 'lunes';
    var horaCur = cfg.outscraper ? cfg.outscraper.hora : '02:00';

    return '<div style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:var(--space-5)">' +
      '<div class="form-group" style="flex:0 0 auto"><label class="form-label">Frecuencia Outscraper</label>' +
        sel('cfg-out-freq', oFreqs, oCur) + '</div>' +
      '<div class="form-group" style="flex:0 0 auto"><label class="form-label">Frecuencia Salesforce</label>' +
        sel('cfg-sf-freq', sfFreqs, sfCur) + '</div>' +
      '<div class="form-group" style="flex:0 0 auto"><label class="form-label">Día de ejecución</label>' +
        sel('cfg-dia', dias, diaCur) + '</div>' +
      '<div class="form-group" style="flex:0 0 auto"><label class="form-label">Hora</label>' +
        sel('cfg-hora', horas, horaCur) + '</div>' +
      '<button class="btn btn-primary btn-sm" id="cfg-save" style="margin-bottom:2px">' +
        '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar configuración</button>' +
    '</div>';
  }

  /* ── history table ────────────────────────────────────────── */
  function historialHTML(md) {
    var rows = (md.syncs_historial || []).slice().sort(function (a, b) { return b.id - a.id; });
    var tbody = rows.map(function (s) {
      var resPill = s.resultado === 'ok'
        ? '<span class="pill pill-pos pill-sm">OK</span>'
        : s.resultado === 'fallo_parcial'
        ? '<span class="pill pill-warn pill-sm">Fallo parcial</span>'
        : '<span class="pill pill-neg pill-sm">Error</span>';
      var src = s.fuente === 'outscraper'
        ? '<span class="pill pill-accent pill-sm">Outscraper</span>'
        : '<span class="pill pill-neutral pill-sm">Salesforce</span>';
      var deltas = '+' + s.deltas.nuevos + ' · ' + s.deltas.conflictos + ' conf. · ' + s.deltas.no_encontrados + ' n/e';
      return '<tr>' +
          '<td class="tnum body-xs c-ink2">' + enc(fmtFH(s.fecha_inicio)) + '</td>' +
          '<td>' + src + '</td>' +
          '<td>' + resPill + '</td>' +
          '<td class="body-xs c-ink2">' + enc(deltas) + '</td>' +
          '<td><button class="btn-icon" style="color:var(--accent-ink-deep);font-size:12px;font-weight:600;height:auto;padding:0;background:none;border:none;cursor:pointer;white-space:nowrap" ' +
            'data-hist-toggle="' + s.id + '">Ver →</button></td>' +
        '</tr>' +
        '<tr id="cpv-hist-' + s.id + '" style="display:none">' +
          '<td colspan="5" style="padding:4px 12px 12px">' +
            '<div style="background:var(--line-2);border-radius:var(--radius-md);padding:var(--space-4) var(--space-5);font-size:13px;color:var(--ink-2);line-height:1.8">' +
              '<b>' + enc(s.fuente === 'outscraper' ? 'Outscraper / Google Maps' : 'Salesforce / CooperVision') + '</b>' +
              ' · ' + enc(fmtF(s.fecha_inicio)) + ' · Duración: ' + enc(dur(s.fecha_inicio, s.fecha_fin)) + '<br>' +
              'Nuevos: <b>' + s.deltas.nuevos + '</b> · Conflictos: <b>' + s.deltas.conflictos + '</b>' +
              ' · No encontrados: <b>' + s.deltas.no_encontrados + '</b>' +
              (s.deltas.conflictos > 0
                ? '<br><a href="#/admin/revision" style="color:var(--accent-ink-deep);font-weight:600;font-size:12px">' +
                  'Revisar ' + s.deltas.conflictos + ' conflictos →</a>' : '') +
            '</div>' +
          '</td>' +
        '</tr>';
    }).join('');
    return '<div class="table-wrap">' +
      '<table class="table-dense"><thead><tr>' +
        '<th style="width:100px">Fecha</th><th style="width:110px">Fuente</th>' +
        '<th style="width:110px">Resultado</th><th>Cambios</th><th style="width:56px"></th>' +
      '</tr></thead><tbody>' + (tbody || '<tr><td colspan="5" style="padding:24px;color:var(--muted);text-align:center;font-size:13px">Sin historial</td></tr>') + '</tbody></table>' +
    '</div>';
  }

  /* ── download block ───────────────────────────────────────── */
  function downloadHTML(md) {
    var total = md.resumen_kpis ? md.resumen_kpis.total_opticas : 18234;
    return '<div class="card card-compact" style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-6)">' +
      '<div><div style="font-weight:600;font-size:14px">Exportar base de datos completa</div>' +
        '<div class="body-sm c-muted" style="margin-top:3px">' + grp(total) + ' ópticas · ~12 MB · UTF-8, separador coma</div>' +
      '</div>' +
      '<button class="btn btn-ghost btn-sm" id="cpv-ops-dl">' +
        '<iconify-icon icon="iconoir:download" width="14"></iconify-icon>Descargar CSV</button>' +
    '</div>';
  }

  /* ── confirm modal ────────────────────────────────────────── */
  function confirmModalHTML() {
    return '<div class="modal-overlay" id="cpv-sync-modal" style="display:none">' +
      '<div class="modal">' +
        '<div class="modal-header">' +
          '<h2 class="modal-title">¿Lanzar sincronización manual?</h2>' +
          '<button class="btn-icon btn-lg" id="cpv-sync-modal-x">' +
            '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button>' +
        '</div>' +
        '<p class="modal-body" id="cpv-sync-modal-body" style="margin:0"></p>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-ghost btn-sm" id="cpv-sync-modal-cancel">Cancelar</button>' +
          '<button class="btn btn-primary btn-sm" id="cpv-sync-modal-confirm">' +
            '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Iniciar sincronización</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ── section label ────────────────────────────────────────── */
  function sHead(t) {
    return '<p class="eyebrow-t" style="margin-bottom:var(--space-4)">' + enc(t) + '</p>';
  }

  /* ── page header ──────────────────────────────────────────── */
  function pageHeader() {
    return '<div class="page-header"><div class="page-header-left">' +
      '<h1 class="page-title">Operaciones de datos</h1>' +
    '</div></div>';
  }

  /* ════ RENDER DEFAULT ═══════════════════════════════════════ */
  function renderDefault(ctx) {
    var md  = ctx.md;
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('operaciones', md) : '';

    return pageHeader() + nav +

      /* Banner (oculto por defecto, aparece cuando sync en curso) */
      '<div id="cpv-ops-banner" role="alert" style="display:none;align-items:center;gap:var(--space-4);' +
        'padding:10px var(--space-6);margin-bottom:var(--space-5);background:var(--warn-bg);' +
        'color:var(--warn-ink);border:1px solid rgba(146,64,14,.18);border-radius:var(--radius-lg);font-size:13px;font-weight:500">' +
        '<span class="cpv-spin-icon" style="font-size:0"><iconify-icon icon="iconoir:refresh-double" width="16"></iconify-icon></span>' +
        '<span><b>Sincronización en curso.</b> Los datos pueden no estar actualizados hasta que finalice.</span>' +
      '</div>' +

      /* Cards estado */
      '<div style="margin-bottom:var(--space-7)">' + sHead('Estado de sincronización') +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5)">' +
          syncCardHTML(md, 'outscraper') + syncCardHTML(md, 'salesforce') +
        '</div>' +
      '</div>' +

      /* Config */
      '<div style="margin-bottom:var(--space-7)">' +
        '<div class="card card-compact">' + sHead('Configuración de frecuencia') + configHTML(md) + '</div>' +
      '</div>' +

      /* Historial */
      '<div style="margin-bottom:var(--space-7)">' +
        sHead('Historial de sincronizaciones') + historialHTML(md) +
      '</div>' +

      /* Descarga */
      '<div>' + sHead('Descarga BBDD') + downloadHTML(md) + '</div>' +

      confirmModalHTML();
  }

  /* ════ RENDER LOADING ═══════════════════════════════════════ */
  function renderLoading(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('operaciones', ctx.md) : '';
    return pageHeader() + nav +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5);margin-bottom:var(--space-7)">' +
        '<div class="card" style="min-height:180px"><span class="skeleton" style="display:block;height:100%;border-radius:var(--radius-lg)"></span></div>' +
        '<div class="card" style="min-height:180px"><span class="skeleton" style="display:block;height:100%;border-radius:var(--radius-lg)"></span></div>' +
      '</div>' +
      '<div class="card card-compact" style="min-height:72px"><span class="skeleton" style="display:block;height:100%;border-radius:var(--radius-md)"></span></div>';
  }

  /* ════ RENDER EMPTY / ERROR ═════════════════════════════════ */
  function renderEmpty(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('operaciones', ctx.md) : '';
    return pageHeader() + nav +
      '<div class="card view-stub"><div class="empty-state">' +
        '<iconify-icon class="empty-state-icon" icon="iconoir:refresh-double" width="32"></iconify-icon>' +
        '<h2 class="state-title">Sin datos de operaciones</h2>' +
      '</div></div>';
  }
  function renderError(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('operaciones', ctx.md) : '';
    return pageHeader() + nav +
      '<div class="card view-stub"><div class="error-state">' +
        '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
        '<h2 class="state-title">Error al cargar operaciones</h2>' +
        '<button class="btn btn-primary btn-sm" data-action="retry">' +
          '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
  }

  /* ── start sync (DOM manipulation) ───────────────────────── */
  function startSync(fuente, root, ctx) {
    _inCurso = fuente;
    if (_syncTimer) clearTimeout(_syncTimer);

    var banner = root.querySelector('#cpv-ops-banner');
    var defEl  = root.querySelector('#cpv-sync-' + fuente + '-default');
    var crsEl  = root.querySelector('#cpv-sync-' + fuente + '-curso');
    var pill   = root.querySelector('#cpv-sync-' + fuente + '-pill');

    if (banner) banner.style.display = 'flex';
    if (defEl)  defEl.style.display  = 'none';
    if (crsEl)  { crsEl.style.display = 'flex'; crsEl.style.flexDirection = 'column'; }
    if (pill)   pill.innerHTML = '<span class="pill pill-warn pill-sm"><span class="pill-dot"></span>En curso</span>';

    ctx.toast('info', 'Sincronización lanzada', 'Puede tardar entre 30 min y varias horas.');

    _syncTimer = setTimeout(function () {
      _inCurso = null;
      if (banner) banner.style.display = 'none';
      if (defEl)  defEl.style.display  = 'flex';
      if (crsEl)  crsEl.style.display  = 'none';
      if (pill)   pill.innerHTML = '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Completada</span>';
      var cf = fuente === 'outscraper' ? 23 : 2;
      ctx.toast('success', 'Sincronización completada',
        fuente === 'outscraper' ? '+127 nuevos · 23 conflictos detectados' : '+5 clientes importados');
      if (cf > 0) {
        setTimeout(function () {
          ctx.toast('warn', cf + ' conflictos pendientes',
            'Revisar en Administración › Revisión →');
        }, 900);
      }
    }, 8000);
  }

  /* ════ MOUNTED ══════════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    if (state !== 'default') return;

    /* "Sincronizar ahora" → abre modal confirm */
    root.querySelectorAll('[data-sync-now]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        _pending = btn.getAttribute('data-sync-now');
        var isOut = _pending === 'outscraper';
        var mb = root.querySelector('#cpv-sync-modal-body');
        if (mb) mb.textContent = 'La sincronización con ' +
          (isOut ? 'Outscraper / Google Maps' : 'Salesforce / CooperVision') +
          ' se iniciará ahora. Puede tardar entre 30 min y varias horas.' +
          ' Los datos pueden no estar actualizados durante este período.';
        var m = root.querySelector('#cpv-sync-modal');
        if (m) m.style.display = 'flex';
      });
    });

    /* Modal — cerrar */
    ['#cpv-sync-modal-x', '#cpv-sync-modal-cancel'].forEach(function (sel) {
      var b = root.querySelector(sel);
      if (b) b.addEventListener('click', function () {
        var m = root.querySelector('#cpv-sync-modal');
        if (m) m.style.display = 'none';
        _pending = null;
      });
    });
    var modal = root.querySelector('#cpv-sync-modal');
    if (modal) modal.addEventListener('click', function (e) {
      if (e.target === modal) { modal.style.display = 'none'; _pending = null; }
    });

    /* Modal — confirmar */
    var confirmBtn = root.querySelector('#cpv-sync-modal-confirm');
    if (confirmBtn) confirmBtn.addEventListener('click', function () {
      var m = root.querySelector('#cpv-sync-modal');
      if (m) m.style.display = 'none';
      if (_pending) startSync(_pending, root, ctx);
      _pending = null;
    });

    /* Config guardar */
    var cfgSave = root.querySelector('#cfg-save');
    if (cfgSave) cfgSave.addEventListener('click', function () {
      ctx.toast('success', 'Configuración guardada',
        'Los cambios se aplicarán en la próxima ejecución programada.');
    });

    /* Historial expand/collapse */
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-hist-toggle]');
      if (!btn) return;
      var id  = btn.getAttribute('data-hist-toggle');
      var row = root.querySelector('#cpv-hist-' + id);
      if (!row) return;
      var open = row.style.display !== 'none';
      row.style.display = open ? 'none' : 'table-row';
      btn.textContent   = open ? 'Ver →' : 'Cerrar ↑';
    });

    /* Descarga */
    var dlBtn = root.querySelector('#cpv-ops-dl');
    if (dlBtn) dlBtn.addEventListener('click', function () {
      ctx.toast('info', 'Generando CSV…', 'El archivo se descargará en unos segundos.');
      setTimeout(function () {
        ctx.toast('success', 'Descarga lista', '18.234 ópticas exportadas correctamente.');
      }, 2000);
    });
  }

  /* ── register ─────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/admin/operaciones'] = {
    render: function (state, ctx) {
      if (state === 'loading') return renderLoading(ctx);
      if (state === 'empty')   return renderEmpty(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted,
  };
})();
