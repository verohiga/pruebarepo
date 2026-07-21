/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-revision.js — A3
   Bandeja de matching post-sync.
   Decide si un opticas_cpv es la misma óptica que un opticas_google
   (crear FK place_id_fk). NO consolida campos.

   Tipos: conflicto · solo_cpv · no_encontrado
   Transición: fade 120ms out + 120ms in
   Teclado: V = Vincular, D = Son distintas / Mantener, S = Saltar
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function pad2(n) { return String(n).padStart(2, '0'); }
  function fmtF(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear();
  }
  function pct(v) { return Math.round((v || 0) * 100) + '%'; }
  function stars(r) {
    if (!r) return '—';
    return '★ ' + Number(r).toFixed(1);
  }
  function dim(v) {
    return (v == null || v === '') ? '<span style="color:var(--muted-2)">—</span>' : enc(v);
  }

  /* ── module state ─────────────────────────────────────────── */
  var _allItems    = [];
  var _dismissed   = {};  // { id: decision_label }
  var _skippedIds  = {};  // { id: true } → moved to end
  var _transformed = {};  // { id: true } → conflicto turned solo_cpv after all candidates rejected
  var _activeCand  = {};  // { id: candidatoIndex }
  var _tab         = 'todos';
  var _currentId   = null;
  var _kbdHandler  = null;
  var _undoTimer   = null;
  var _hlTimer     = null;

  /* ── queue builder ────────────────────────────────────────── */
  function buildItems(md) {
    var items = [];
    var mc    = md.matching_candidatos || [];
    var ne    = md.no_encontrados || [];
    var mcIds = mc.map(function (m) { return m.cpv_codigo; });

    mc.forEach(function (m) {
      var cpv = findCPV(md, m.cpv_codigo) || makeSyntheticCPV(m.cpv_codigo);
      var candidatos = (m.candidatos || []).map(function (c) {
        return { place_id: c.place_id, score: c.score, metricas: c.metricas || {},
                 google: findGoogle(md, c.place_id) };
      });
      items.push({ id: m.cpv_codigo, type: m.estado, cpv: cpv,
                   candidatos: candidatos, detectado: m.detectado });
    });

    ne.forEach(function (n) {
      items.push({ id: n.place_id, type: 'no_encontrado', google: n,
                   detectado: n.desaparecido_desde });
    });

    /* extra solo_cpv: opticas_cpv sin FK, not already in matching_candidatos */
    (md.opticas_cpv || []).forEach(function (cpv) {
      if (cpv.place_id_fk) return;
      if (mcIds.indexOf(cpv.CODIGO) !== -1) return;
      items.push({ id: cpv.CODIGO, type: 'solo_cpv', cpv: cpv, candidatos: [],
                   detectado: new Date().toISOString() });
    });

    return items;
  }

  function findCPV(md, codigo) {
    return (md.opticas_cpv || []).find(function (c) { return c.CODIGO === codigo; }) || null;
  }
  function findGoogle(md, pid) {
    return (md.opticas_google || []).find(function (g) { return g.place_id === pid; }) || null;
  }
  function makeSyntheticCPV(codigo) {
    return { CODIGO: codigo, GRUPO: codigo, LOCALIDAD: 'Madrid', PROVINCIA: 'Madrid',
             DIRECCION: 'Dirección desconocida', TEL: '—', EMAIL: '—',
             DP: '—', COM: '—', TIPOLOGIA: '—', SEGMENTACION: '—' };
  }

  /* ── queue helpers ────────────────────────────────────────── */
  function effectiveType(item) {
    return _transformed[item.id] ? 'solo_cpv' : item.type;
  }

  function getVisible() {
    var normal = [], skipped = [];
    _allItems.forEach(function (item) {
      if (_dismissed[item.id]) return;
      var t = effectiveType(item);
      if (_tab !== 'todos' && t !== _tab) return;
      (_skippedIds[item.id] ? skipped : normal).push(item);
    });
    return normal.concat(skipped);
  }

  function getCurrent() {
    var q = getVisible();
    if (!q.length) return null;
    if (_currentId) {
      var f = q.find(function (i) { return i.id === _currentId; });
      if (f) return f;
    }
    _currentId = q[0].id;
    return q[0];
  }

  function getNextItem(afterId) {
    var q = getVisible();
    if (!q.length) return null;
    var idx = q.findIndex(function (i) { return i.id === afterId; });
    return q[idx + 1] || null;
  }

  function getPosition() {
    var q = getVisible();
    var idx = q.findIndex(function (i) { return i.id === _currentId; });
    return { n: Math.max(1, idx + 1), total: q.length };
  }

  function countByType() {
    var r = { conflicto: 0, solo_cpv: 0, no_encontrado: 0 };
    _allItems.forEach(function (item) {
      if (_dismissed[item.id]) return;
      r[effectiveType(item)] = (r[effectiveType(item)] || 0) + 1;
    });
    r.total = r.conflicto + r.solo_cpv + r.no_encontrado;
    return r;
  }

  /* ── field row ────────────────────────────────────────────── */
  function frow(label, value, fieldKey, tabla) {
    var edit = fieldKey
      ? '<button class="rev-field-edit" title="Corregir dato"' +
        ' data-edit-field="' + enc(fieldKey) + '"' +
        ' data-edit-tabla="' + enc(tabla) + '"' +
        ' data-edit-value="' + enc(value == null ? '' : String(value)) + '">' +
        '<iconify-icon icon="iconoir:edit-pencil" width="11"></iconify-icon></button>'
      : '';
    return '<div class="rev-field">' +
      '<span class="rev-field-label">' + enc(label) + '</span>' +
      '<span class="rev-field-value">' + dim(value) + '</span>' + edit +
    '</div>';
  }

  /* ── google column content ────────────────────────────────── */
  function googleColContent(google, item) {
    if (!google) {
      return '<div style="padding:var(--space-5);text-align:center;color:var(--muted);font-size:13px">' +
        '<iconify-icon icon="iconoir:warning-circle" width="20" style="display:block;margin:0 auto 8px"></iconify-icon>' +
        'Candidato no disponible en el mock.</div>';
    }
    var cands = item.candidatos || [];
    var cIdx  = _activeCand[item.id] || 0;
    var candSel = cands.length > 1
      ? '<select class="select select-sm" id="rev-cand-sel" style="font-size:12px;margin-bottom:var(--space-4)">' +
          cands.map(function (c, i) {
            return '<option value="' + i + '"' + (i === cIdx ? ' selected' : '') + '>' +
              'Candidato ' + (i + 1) + ' de ' + cands.length + ' · ' + pct(c.score) + '</option>';
          }).join('') + '</select>'
      : '';

    return candSel +
      frow('Nombre',    google.name,        'name',        'opticas_google') +
      frow('Teléfono',  google.phone,       'phone',       'opticas_google') +
      frow('Web',       google.website,     'website',     'opticas_google') +
      frow('Dirección', google.address,     'address',     'opticas_google') +
      frow('Ciudad',    google.city,        'city',        'opticas_google') +
      frow('CP',        google.postal_code, 'postal_code', 'opticas_google') +
      frow('Valoración',google.rating ? stars(google.rating) + ' (' + (google.reviews || 0) + ' reseñas)' : null, null, null) +
      '<div class="rev-field-sep"></div>' +
      '<div class="rev-field-mono">place_id: ' + enc(google.place_id) + '</div>';
  }

  /* ── cpv column content ───────────────────────────────────── */
  function cpvColContent(cpv) {
    if (!cpv) return '<div style="padding:var(--space-5);color:var(--muted);font-size:13px">Sin datos CPV.</div>';
    return frow('CÓDIGO CPV',  cpv.CODIGO,      null,          null) +
      frow('CÓDIGO BBDD',   cpv.CPV_ID,      null,          null) +
      frow('Grupo',           cpv.GRUPO,       'GRUPO',       'opticas_cpv') +
      frow('Teléfono',        cpv.TEL,         'TEL',         'opticas_cpv') +
      frow('Email',           cpv.EMAIL,       'EMAIL',       'opticas_cpv') +
      frow('Dirección',       cpv.DIRECCION,   'DIRECCION',   'opticas_cpv') +
      frow('Localidad',       cpv.LOCALIDAD,   'LOCALIDAD',   'opticas_cpv') +
      frow('Provincia',       cpv.PROVINCIA,   null,          null) +
      '<div class="rev-field-sep"></div>' +
      frow('DP',              cpv.DP,          null,          null) +
      frow('Comercial',       cpv.COM,         null,          null) +
      frow('Tipología',       cpv.TIPOLOGIA,   null,          null) +
      frow('Segmentación',    cpv.SEGMENTACION,null,          null);
  }

  /* ── score pill (header) ──────────────────────────────────── */
  function scorePill(label, v) {
    if (v == null) return '';
    if (v >= 0.999) {
      return '<span class="rev-sp rev-sp-ok">' + enc(label) +
        '<iconify-icon icon="iconoir:check" width="12"></iconify-icon></span>';
    }
    var cls = v >= 0.85 ? 'rev-sp-ok' : 'rev-sp-warn';
    return '<span class="rev-sp ' + cls + '">' + enc(label) + ' <b>' + pct(v) + '</b></span>';
  }

  /* ── conflict field row (2-col, highlightable) ────────────── */
  function rfield(label, value, fieldKey, tabla, conflict, strong) {
    var edit = fieldKey
      ? '<button class="rev-field-edit" title="Corregir dato"' +
        ' data-edit-field="' + enc(fieldKey) + '"' +
        ' data-edit-tabla="' + enc(tabla) + '"' +
        ' data-edit-value="' + enc(value == null ? '' : String(value)) + '">' +
        '<iconify-icon icon="iconoir:edit-pencil" width="11"></iconify-icon></button>'
      : '';
    return '<div class="rev-f' + (conflict ? ' rev-f-conflict' : '') + '">' +
      '<span class="rev-f-label">' + enc(label) + '</span>' +
      '<span class="rev-f-value' + (strong ? ' rev-f-value-strong' : '') + '">' + dim(value) + '</span>' + edit +
    '</div>';
  }

  /* ── source column header (icon + title + id) ─────────────── */
  function srcHead(icon, title, sub) {
    return '<div class="rev-src">' +
      '<div class="rev-src-icon"><iconify-icon icon="' + icon + '" width="18"></iconify-icon></div>' +
      '<div class="rev-src-meta">' +
        '<div class="rev-src-title">' + enc(title) + '</div>' +
        '<div class="rev-src-sub">' + enc(sub) + '</div>' +
      '</div></div>';
  }

  /* ── focus card: conflicto ────────────────────────────────── */
  function conflictoHTML(item, pos) {
    var cIdx  = _activeCand[item.id] || 0;
    var cand  = item.candidatos[cIdx] || {};
    var met   = cand.metricas || {};
    var g     = cand.google || {};
    var c     = item.cpv || {};
    var conf  = function (k) { return met[k] != null && met[k] < 0.8; };

    var fields = [
      { label: 'Nombre',    gv: g.name,        gk: 'name',        cv: c.GRUPO,     ck: 'GRUPO',     conf: conf('nombre'),        strong: true },
      { label: 'Dirección', gv: g.address,     gk: 'address',     cv: c.DIRECCION, ck: 'DIRECCION', conf: conf('direccion'),     strong: false },
      { label: 'CP',        gv: g.postal_code, gk: 'postal_code', cv: null,        ck: null,        conf: conf('codigo_postal'), strong: false },
      { label: 'Teléfono',  gv: g.phone,       gk: 'phone',       cv: c.TEL,       ck: 'TEL',       conf: conf('telefono'),      strong: false },
    ];
    var googleRows = fields.map(function (f) { return rfield(f.label, f.gv, f.gk, 'opticas_google', f.conf, f.strong); }).join('');
    var cpvRows    = fields.map(function (f) { return rfield(f.label, f.cv, f.ck, 'opticas_cpv', f.conf, f.strong); }).join('');

    var cands = item.candidatos || [];
    var candSel = cands.length > 1
      ? '<select class="select select-sm" id="rev-cand-sel" style="font-size:12px;margin-bottom:var(--space-4)">' +
          cands.map(function (cc, i) {
            return '<option value="' + i + '"' + (i === cIdx ? ' selected' : '') + '>' +
              'Candidato ' + (i + 1) + ' de ' + cands.length + ' · ' + pct(cc.score) + '</option>';
          }).join('') + '</select>'
      : '';

    var scorePills =
      scorePill('Nombre',    met.nombre) +
      scorePill('Dirección', met.direccion) +
      scorePill('CP',        met.codigo_postal) +
      scorePill('Teléfono',  met.telefono);

    return '<div class="rev-chead">' +
        '<div class="rev-chead-l">' +
          '<span class="pill pill-warn pill-sm">Conflicto</span>' +
          '<span class="body-sm c-muted">' + pos.n + ' de ' + pos.total + ' detectadas</span>' +
        '</div>' +
        '<div class="rev-scores">' +
          '<span class="rev-score-global">Score global <b>' + pct(cand.score) + '</b></span>' +
          '<div class="rev-score-pills">' + scorePills + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="rev-cols">' +
        '<div class="rev-col rev-col-l">' +
          srcHead('iconoir:map-pin', 'Google Maps', 'place_id: ' + (g.place_id || '—')) +
          candSel + googleRows +
        '</div>' +
        '<div class="rev-col rev-col-r">' +
          srcHead('iconoir:db', 'CRM CooperVision', 'CÓDIGO CPV: ' + (c.CODIGO || '—') + ' · CÓDIGO BBDD: ' + (c.CPV_ID || '—')) +
          cpvRows +
        '</div>' +
      '</div>' +
      '<div class="rev-actions">' +
        '<div class="rev-actions-l">' +
          '<button class="btn btn-primary btn-sm" data-ra="vincular">' +
            '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Es la misma · Vincular' +
            '<span class="rev-kbd">V</span></button>' +
          '<button class="btn btn-ghost btn-sm" data-ra="distintas">' +
            '<iconify-icon icon="iconoir:xmark" width="14"></iconify-icon>Son distintas' +
            '<span class="rev-kbd">D</span></button>' +
          '<button class="btn btn-subtle btn-sm" data-ra="hl-edit">' +
            '<iconify-icon icon="iconoir:edit-pencil" width="14"></iconify-icon>Corregir datos</button>' +
        '</div>' +
        '<div class="rev-actions-r">' +
          '<button class="btn btn-ghost btn-sm" data-ra="siguiente">Siguiente →</button>' +
        '</div>' +
      '</div>';
  }

  /* ── focus card: solo_cpv ─────────────────────────────────── */
  function soloCpvHTML(item, pos) {
    var c = item.cpv || {};
    var fields =
      rfield('Grupo',     c.GRUPO,     'GRUPO',     'opticas_cpv', false, true) +
      rfield('Dirección', c.DIRECCION, 'DIRECCION', 'opticas_cpv', false, false) +
      rfield('Localidad', c.LOCALIDAD, 'LOCALIDAD', 'opticas_cpv', false, false) +
      rfield('Provincia', c.PROVINCIA, null,        null,          false, false) +
      rfield('Teléfono',  c.TEL,       'TEL',       'opticas_cpv', false, false);

    return '<div class="rev-chead">' +
        '<div class="rev-chead-l">' +
          '<span class="pill pill-neutral pill-sm">Solo CPV</span>' +
          '<span class="body-sm c-muted">' + pos.n + ' de ' + pos.total + ' detectadas</span>' +
        '</div>' +
      '</div>' +
      '<div style="padding:var(--space-5);border-top:1px solid var(--line-2)">' +
        srcHead('iconoir:db', 'CRM CooperVision', 'CÓDIGO CPV: ' + (c.CODIGO || '—') + ' · CÓDIGO BBDD: ' + (c.CPV_ID || '—')) +
        '<div class="rev-cpv-alert">' +
          '<iconify-icon icon="iconoir:warning-triangle" width="15"></iconify-icon>' +
          '<div>' +
            '<div class="rev-cpv-alert-title">Este cliente de Salesforce no tiene presencia verificada en Google Maps.</div>' +
            '<ul class="rev-cpv-alert-reasons">' +
              '<li>Óptica cerrada</li>' +
              '<li>No listada en Google</li>' +
              '<li>Nombre o dirección muy distintos al registro</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div style="max-width:520px">' + fields + '</div>' +
      '</div>' +
      '<div class="rev-actions">' +
        '<div class="rev-actions-l">' +
          '<button class="btn btn-primary btn-sm" data-ra="buscar">' +
            '<iconify-icon icon="iconoir:search" width="14"></iconify-icon>Buscar manualmente</button>' +
          '<button class="btn btn-ghost btn-sm" data-ra="cerrada">' +
            '<iconify-icon icon="iconoir:xmark" width="14"></iconify-icon>Marcar como cerrada</button>' +
          '<button class="btn btn-subtle btn-sm" data-ra="mantener">' +
            'Mantener pendiente <span class="rev-kbd-i">D</span></button>' +
        '</div>' +
        '<div class="rev-actions-r">' +
          '<button class="btn btn-ghost btn-sm" data-ra="siguiente">Siguiente →</button>' +
        '</div>' +
      '</div>';
  }

  /* ── focus card: no_encontrado ────────────────────────────── */
  function noEncontradoHTML(item, pos) {
    var g = item.google || {};
    var fields =
      rfield('Nombre',       g.name,                          null, null, false, true) +
      rfield('Ciudad',       g.city,                          null, null, false, false) +
      rfield('Provincia',    g.state,                         null, null, false, false) +
      rfield('Valoración',   g.rating ? stars(g.rating) + ' (' + (g.reviews || 0) + ' reseñas)' : null, null, null, false, false) +
      rfield('Desaparecido', fmtF(g.desaparecido_desde),      null, null, false, false);

    return '<div class="rev-chead">' +
        '<div class="rev-chead-l">' +
          '<span class="pill pill-neg pill-sm">No encontrado</span>' +
          '<span class="body-sm c-muted">' + pos.n + ' de ' + pos.total + ' detectadas</span>' +
        '</div>' +
      '</div>' +
      '<div style="padding:var(--space-5);border-top:1px solid var(--line-2)">' +
        srcHead('iconoir:map-pin', 'Google Maps', 'place_id: ' + (g.place_id || '—')) +
        '<div class="rev-cpv-alert">' +
          '<iconify-icon icon="iconoir:warning-triangle" width="15"></iconify-icon>' +
          '<div>' +
            '<div class="rev-cpv-alert-title">Ausente en la última sincronización</div>' +
            '<p class="rev-cpv-alert-body">El registro de Google Maps desapareció en la última sync. ' +
              'Puede ser temporal (error de Google) o definitivo (negocio cerrado o relisting).</p>' +
          '</div>' +
        '</div>' +
        '<p class="eyebrow-t" style="margin-bottom:var(--space-4)">Últimos registros</p>' +
        '<div style="max-width:520px">' + fields + '</div>' +
      '</div>' +
      '<div class="rev-actions">' +
        '<div class="rev-actions-l">' +
          '<button class="btn btn-primary btn-sm" data-ra="mantener-ne">' +
            '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Mantener · Esperar próxima sync</button>' +
          '<button class="btn btn-ghost btn-sm" data-ra="cerrada">' +
            '<iconify-icon icon="iconoir:xmark" width="14"></iconify-icon>Marcar como cerrada</button>' +
          '<button class="btn btn-subtle btn-sm" data-ra="investigar">' +
            '<iconify-icon icon="iconoir:search" width="14"></iconify-icon>Investigar relisting</button>' +
        '</div>' +
        '<div class="rev-actions-r">' +
          '<button class="btn btn-ghost btn-sm" data-ra="siguiente">Siguiente →</button>' +
        '</div>' +
      '</div>';
  }

  /* ── focus card dispatcher ────────────────────────────────── */
  function focusCardInner(item) {
    if (!item) {
      return '<div class="empty-state" style="min-height:180px">' +
        '<iconify-icon icon="iconoir:check-circle" width="32" style="color:var(--pos-ink)"></iconify-icon>' +
        '<h2 class="state-title">Sin pendientes en este filtro</h2></div>';
    }
    var pos = getPosition();
    var t   = effectiveType(item);
    if (t === 'conflicto')    return conflictoHTML(item, pos);
    if (t === 'solo_cpv')     return soloCpvHTML(item, pos);
    if (t === 'no_encontrado') return noEncontradoHTML(item, pos);
    return '';
  }

  /* ── tabs HTML ────────────────────────────────────────────── */
  function tabsHTML(c) {
    function tab(k, lbl, n) {
      return '<button class="cpv-filter-tab' + (_tab === k ? ' active' : '') + '" data-rtab="' + k + '">' +
        enc(lbl) + ' <span class="cpv-filter-tab-count">' + n + '</span></button>';
    }
    return '<div class="cpv-filter-tabs" style="margin-bottom:var(--space-5)">' +
      tab('todos', 'Todos', c.total) +
      tab('conflicto', 'Conflictos', c.conflicto) +
      tab('solo_cpv', 'Solo CPV', c.solo_cpv) +
      tab('no_encontrado', 'No encontrados', c.no_encontrado) +
    '</div>';
  }

  /* ── pending table ────────────────────────────────────────── */
  function tableRowsHTML(currentId) {
    var q = getVisible();
    return q.map(function (item) {
      var t = effectiveType(item);
      var pill = t === 'conflicto'
        ? '<span class="pill pill-warn pill-sm">Conflicto</span>'
        : t === 'solo_cpv'
        ? '<span class="pill pill-neutral pill-sm">Solo CPV</span>'
        : '<span class="pill pill-neg pill-sm">No encontrado</span>';
      var nombre = t === 'no_encontrado'
        ? (item.google ? item.google.name : item.id)
        : (item.cpv ? (item.cpv.GRUPO || item.cpv.CODIGO) : item.id);
      var codigo = t === 'no_encontrado' ? item.id : (item.cpv ? item.cpv.CODIGO : item.id);
      var cand0  = item.candidatos && item.candidatos[0];
      var motivo = t === 'conflicto' && cand0
        ? pct(cand0.score) + (cand0.metricas && cand0.metricas.codigo_postal === 1 ? ' · Mismo CP' : '')
        : t === 'no_encontrado' ? 'Ausente en sync' : 'Sin candidatos Google';
      var active = item.id === currentId;
      return '<tr class="rev-trow' + (active ? ' rev-trow-active' : '') + '" data-rrow="' + enc(item.id) + '">' +
        '<td>' + pill + '</td>' +
        '<td style="font-weight:' + (active ? '600' : '400') + '">' + enc(nombre) + '</td>' +
        '<td class="body-xs c-muted" style="font-family:var(--font-mono);font-size:11px">' + enc(codigo) + '</td>' +
        '<td class="body-xs c-muted">' + enc(motivo) + '</td>' +
        '<td class="body-xs c-muted tnum">' + enc(fmtF(item.detectado)) + '</td>' +
      '</tr>';
    }).join('');
  }
  function tableHTML(currentId) {
    var rows = tableRowsHTML(currentId);
    return '<div style="margin-top:var(--space-7)">' +
      '<p class="eyebrow-t" style="margin-bottom:var(--space-4)">Todos los pendientes</p>' +
      '<div class="table-wrap"><table class="table-dense">' +
        '<thead><tr>' +
          '<th style="width:120px">Tipo</th><th>Nombre</th>' +
          '<th style="width:130px">Código</th><th>Motivo</th>' +
          '<th style="width:90px">Detectado</th>' +
        '</tr></thead>' +
        '<tbody id="rev-tbody">' + (rows || '<tr><td colspan="5" style="padding:24px;color:var(--muted);text-align:center;font-size:13px">Sin pendientes</td></tr>') + '</tbody>' +
      '</table></div></div>';
  }

  /* ── modals ───────────────────────────────────────────────── */
  function overrideModalHTML() {
    return '<div class="modal-overlay" id="rev-ov-modal" style="display:none">' +
      '<div class="modal"><div class="modal-header">' +
        '<h2 class="modal-title" id="rev-ov-title">Corregir campo</h2>' +
        '<button class="btn-icon btn-lg" data-rmc="rev-ov-modal">' +
          '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button>' +
      '</div>' +
      '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">' +
          '<div class="form-group"><label class="form-label">Tabla</label>' +
            '<div id="rev-ov-tabla" class="rev-mono-chip"></div></div>' +
          '<div class="form-group"><label class="form-label">Campo</label>' +
            '<div id="rev-ov-campo" class="rev-mono-chip"></div></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">Valor original</label>' +
          '<div id="rev-ov-orig" class="body-sm c-muted" style="font-size:13px"></div></div>' +
        '<div class="form-group"><label class="form-label">Nuevo valor</label>' +
          '<input class="input" id="rev-ov-nuevo" type="text"></div>' +
        '<div class="form-group"><label class="form-label">Motivo <span class="form-hint" style="font-weight:400">(opcional)</span></label>' +
          '<input class="input" id="rev-ov-motivo" type="text" placeholder="Ej: Formato corregido manualmente"></div>' +
        '<div class="rev-warn-note">' +
          '<iconify-icon icon="iconoir:warning-triangle" width="13" style="flex-shrink:0;margin-top:1px"></iconify-icon>' +
          'Se registra en <code>opticas_overrides</code> y queda auditado. ' +
          'Se aplica on top del dato original, sin sobrescribirlo. <b>No crea ningún vínculo FK.</b>' +
        '</div>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button class="btn btn-ghost btn-sm" data-rmc="rev-ov-modal">Cancelar</button>' +
        '<button class="btn btn-primary btn-sm" id="rev-ov-ok">' +
          '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar override</button>' +
      '</div></div></div>';
  }

  function buscarModalHTML() {
    return '<div class="modal-overlay" id="rev-bs-modal" style="display:none">' +
      '<div class="modal" style="max-width:560px"><div class="modal-header">' +
        '<h2 class="modal-title">Buscar óptica en Google Maps</h2>' +
        '<button class="btn-icon btn-lg" data-rmc="rev-bs-modal">' +
          '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button>' +
      '</div>' +
      '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' +
        '<p class="body-sm c-muted">Busca por nombre para encontrar el place_id correcto y crear el vínculo.</p>' +
        '<div class="form-group"><label class="form-label">Nombre de la óptica</label>' +
          '<input class="input" id="rev-bs-q" type="text" placeholder="Ej: Óptica Pérez Madrid" autocomplete="off"></div>' +
        '<div id="rev-bs-results" style="display:none;max-height:280px;overflow-y:auto;border:1px solid var(--line-2);border-radius:var(--radius-md)"></div>' +
        '<input type="hidden" id="rev-bs-sel">' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button class="btn btn-ghost btn-sm" data-rmc="rev-bs-modal">Cancelar</button>' +
        '<button class="btn btn-primary btn-sm" id="rev-bs-ok" disabled>' +
          '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Vincular con esta óptica</button>' +
      '</div></div></div>';
  }

  /* ── page header ──────────────────────────────────────────── */
  function pageHeader(total) {
    return '<div class="page-header"><div class="page-header-left">' +
      '<h1 class="page-title">Revisión de datos</h1>' +
      '<p class="page-subtitle">' + total + ' registros pendientes</p>' +
    '</div></div>';
  }

  /* ════ RENDER DEFAULT ═══════════════════════════════════════ */
  function renderDefault(ctx) {
    var md = ctx.md;
    _allItems = buildItems(md);
    var counts  = countByType();
    var current = getCurrent();
    var nav     = window.cpvAdmin ? window.cpvAdmin.subnav('revision', md) : '';

    if (!current) return renderEmpty(ctx);

    return pageHeader(counts.total) + nav + tabsHTML(counts) +
      '<div class="card card-accent rev-focus-card" id="rev-focus-card">' +
        '<div id="rev-focus-inner">' + focusCardInner(current) + '</div>' +
      '</div>' +
      tableHTML(current.id) +
      overrideModalHTML() +
      buscarModalHTML();
  }

  /* ════ RENDER EMPTY (celebratorio) ═════════════════════════ */
  function renderEmpty(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('revision', ctx.md) : '';
    return pageHeader(0) + nav +
      '<div class="card" style="text-align:center;padding:64px var(--space-8)">' +
        '<iconify-icon icon="iconoir:check-circle" width="48" style="color:var(--pos-ink);display:block;margin:0 auto var(--space-4)"></iconify-icon>' +
        '<h2 style="font-family:var(--font-display);font-size:24px;font-weight:700;letter-spacing:-.02em;margin-bottom:var(--space-2)">Todo al día</h2>' +
        '<p class="body-sm c-muted" style="margin-bottom:var(--space-6)">Sin registros pendientes de revisión.</p>' +
        '<a class="btn btn-primary btn-sm" href="#/admin/operaciones">Lanzar nueva sincronización →</a>' +
      '</div>';
  }

  /* ════ RENDER LOADING / ERROR ════════════════════════════════ */
  function renderLoading(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('revision', ctx.md) : '';
    return pageHeader(0) + nav +
      '<div class="card card-accent" style="min-height:340px">' +
        '<div style="padding:var(--space-5)">' +
          '<span class="skeleton" style="display:block;height:280px;border-radius:var(--radius-md)"></span>' +
        '</div>' +
      '</div>';
  }
  function renderError(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('revision', ctx.md) : '';
    return pageHeader(0) + nav +
      '<div class="card view-stub"><div class="error-state">' +
        '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
        '<h2 class="state-title">Error al cargar revisión</h2>' +
        '<button class="btn btn-primary btn-sm" data-action="retry">' +
          '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
  }

  /* ── fade transition ──────────────────────────────────────── */
  function fadeCard(root, html, cb) {
    var inner = root.querySelector('#rev-focus-inner');
    if (!inner) { if (cb) cb(); return; }
    inner.style.transition = 'opacity 120ms ease';
    inner.style.opacity    = '0';
    setTimeout(function () {
      inner.innerHTML = html;
      inner.style.opacity = '0';
      requestAnimationFrame(function () {
        inner.style.opacity = '1';
        if (cb) setTimeout(cb, 120);
      });
    }, 120);
  }

  /* ── update helpers ───────────────────────────────────────── */
  function refreshTabs(root) {
    var c = countByType();
    root.querySelectorAll('[data-rtab]').forEach(function (btn) {
      var k = btn.getAttribute('data-rtab');
      var n = k === 'todos' ? c.total : (c[k] || 0);
      var el = btn.querySelector('.cpv-filter-tab-count');
      if (el) el.textContent = n;
      btn.classList.toggle('active', k === _tab);
    });
  }

  function refreshTableRow(root, id, dismiss) {
    var row = root.querySelector('[data-rrow="' + id + '"]');
    if (!row) return;
    if (dismiss) {
      row.style.transition = 'opacity 200ms';
      row.style.opacity    = '0';
      setTimeout(function () { row.style.display = 'none'; }, 200);
    } else {
      root.querySelectorAll('[data-rrow]').forEach(function (r) {
        r.classList.toggle('rev-trow-active', r.getAttribute('data-rrow') === id);
        var nameTd = r.querySelector('td:nth-child(2)');
        if (nameTd) nameTd.style.fontWeight = r.getAttribute('data-rrow') === id ? '600' : '400';
      });
    }
  }

  /* ── advance to next ──────────────────────────────────────── */
  function advanceTo(root, nextId, ctx) {
    _currentId = nextId;
    var c = getCurrent();
    fadeCard(root, focusCardInner(c), function () { bindInner(root, ctx); });
    if (nextId) refreshTableRow(root, nextId, false);
  }

  /* ── actions ──────────────────────────────────────────────── */
  function doVincular(root, ctx) {
    var item = getCurrent(); if (!item) return;
    var id   = item.id;
    var cIdx = _activeCand[id] || 0;
    var cand = (item.candidatos || [])[cIdx] || {};
    var pid  = cand.place_id || '';
    var gname = (cand.google && cand.google.name) || pid || '—';
    var cpvCode = item.cpv ? item.cpv.CODIGO : id;

    _dismissed[id] = 'vincular';
    refreshTableRow(root, id, true);

    var next = getNextItem(id);
    advanceTo(root, next ? next.id : null, ctx);
    if (!getCurrent()) {
      /* All done — show celebratory state */
      setTimeout(function () {
        var fc = root.querySelector('#rev-focus-card');
        if (fc) fc.outerHTML =
          '<div class="card" style="text-align:center;padding:64px var(--space-8)">' +
          '<iconify-icon icon="iconoir:check-circle" width="48" style="color:var(--pos-ink);display:block;margin:0 auto var(--space-4)"></iconify-icon>' +
          '<h2 style="font-family:var(--font-display);font-size:24px;font-weight:700;letter-spacing:-.02em;margin-bottom:var(--space-2)">Todo al día</h2>' +
          '<p class="body-sm c-muted" style="margin-bottom:var(--space-6)">Has revisado todos los registros pendientes.</p>' +
          '<a class="btn btn-primary btn-sm" href="#/admin/operaciones">Lanzar nueva sincronización →</a>' +
          '</div>';
      }, 300);
    }
    refreshTabs(root);
    toastUndo(ctx, 'Vinculado: ' + cpvCode + ' ↔ ' + gname, function () {
      delete _dismissed[id];
      _currentId = id;
      refreshTableRow(root, id, false);
      var r = root.querySelector('[data-rrow="' + id + '"]');
      if (r) { r.style.display = ''; r.style.opacity = '1'; }
      var c2 = getCurrent();
      fadeCard(root, focusCardInner(c2), function () { bindInner(root, ctx); });
      refreshTabs(root);
      ctx.toast('info', 'Vínculo deshecho', 'El registro vuelve a la cola de revisión.');
    });
  }

  function doDistintas(root, ctx) {
    var item = getCurrent(); if (!item) return;
    var id   = item.id;
    var type = effectiveType(item);

    if (type === 'conflicto') {
      var cIdx   = _activeCand[id] || 0;
      var total  = (item.candidatos || []).length;
      if (total > 1 && cIdx < total - 1) {
        _activeCand[id] = cIdx + 1;
        fadeCard(root, focusCardInner(item), function () { bindInner(root, ctx); });
        ctx.toast('info', 'Candidato descartado', 'Mostrando siguiente candidato (' + (_activeCand[id] + 1) + ' de ' + total + ').');
      } else {
        /* Last/only candidate: transform to solo_cpv in place */
        _transformed[id] = true;
        _activeCand[id]  = 0;
        fadeCard(root, focusCardInner(item), function () { bindInner(root, ctx); });
        refreshTabs(root);
        ctx.toast('info', 'Sin coincidencias', 'El registro pasa a modo Solo CPV. Búscalo manualmente o mantenlo pendiente.');
      }
      return;
    }

    /* solo_cpv / no_encontrado: "Mantener pendiente" = advance without action */
    var next = getNextItem(id);
    advanceTo(root, next ? next.id : null, ctx);
  }

  function doSaltar(root, ctx) {
    var item = getCurrent(); if (!item) return;
    var id   = item.id;
    _skippedIds[id] = true;
    var next = getNextItem(id) || getVisible().find(function (i) { return i.id !== id; });
    advanceTo(root, (next && next.id !== id) ? next.id : null, ctx);
    ctx.toast('info', 'Saltado', 'Movido al final de la cola de revisión.');
  }

  function doSiguiente(root, ctx) {
    var next = getNextItem(_currentId);
    if (!next) { ctx.toast('info', 'Último registro', 'No hay más en este filtro.'); return; }
    advanceTo(root, next.id, ctx);
  }

  function doCerrada(root, ctx) {
    var item = getCurrent(); if (!item) return;
    var id   = item.id;
    _dismissed[id] = 'cerrada';
    refreshTableRow(root, id, true);
    var next = getNextItem(id);
    advanceTo(root, next ? next.id : null, ctx);
    refreshTabs(root);
    ctx.toast('success', 'Marcado como cerrada', 'Se insertará un override de business_status=closed en opticas_overrides.');
  }

  function doMantenerNE(root, ctx) {
    var item = getCurrent(); if (!item) return;
    var id   = item.id;
    _dismissed[id] = 'mantener';
    refreshTableRow(root, id, true);
    var next = getNextItem(id);
    advanceTo(root, next ? next.id : null, ctx);
    refreshTabs(root);
    ctx.toast('success', 'Mantenido', 'El registro permanece activo y se revisará en la próxima sync.');
  }

  /* ── toast with undo ──────────────────────────────────────── */
  function toastUndo(ctx, message, undoFn) {
    if (_undoTimer) clearTimeout(_undoTimer);
    var tc = document.getElementById('toast-container');
    if (!tc) { ctx.toast('success', message, ''); return; }
    var t = document.createElement('div');
    t.className = 'toast toast-success';
    t.setAttribute('role', 'alert');
    var secs = 10;
    t.innerHTML =
      '<div class="toast-body">' +
        '<iconify-icon icon="iconoir:check-circle" width="16"></iconify-icon>' +
        '<div class="toast-text">' +
          '<div class="toast-title">' + enc(message) + '</div>' +
          '<div class="toast-sub" id="rev-tc-cd">Deshacer disponible 10s</div>' +
        '</div>' +
        '<button class="btn btn-ghost btn-sm" id="rev-tc-undo" style="flex-shrink:0;white-space:nowrap">Deshacer</button>' +
        '<button class="toast-dismiss" id="rev-tc-x"><iconify-icon icon="iconoir:xmark" width="14"></iconify-icon></button>' +
      '</div>';
    tc.appendChild(t);

    var iv = setInterval(function () {
      secs--;
      var el = t.querySelector('#rev-tc-cd');
      if (el) el.textContent = 'Deshacer disponible ' + secs + 's';
      if (secs <= 0) { clearInterval(iv); dismiss(); }
    }, 1000);

    function dismiss() {
      t.classList.add('dismissing');
      setTimeout(function () { try { t.remove(); } catch (e) {} }, 300);
    }
    var undoBtn = t.querySelector('#rev-tc-undo');
    if (undoBtn) undoBtn.addEventListener('click', function () { clearInterval(iv); dismiss(); undoFn(); });
    var xBtn = t.querySelector('#rev-tc-x');
    if (xBtn) xBtn.addEventListener('click', function () { clearInterval(iv); dismiss(); });
    _undoTimer = setTimeout(function () { clearInterval(iv); }, 11000);
  }

  /* ── override modal ───────────────────────────────────────── */
  function openOverride(root, field, tabla, value, ctx) {
    var m = root.querySelector('#rev-ov-modal'); if (!m) return;
    var set = function (s, v) { var el = m.querySelector(s); if (el) el.textContent = v; };
    set('#rev-ov-title', 'Corregir ' + field);
    set('#rev-ov-tabla', tabla);
    set('#rev-ov-campo', field);
    set('#rev-ov-orig', value || '(vacío)');
    var nv = m.querySelector('#rev-ov-nuevo'); if (nv) { nv.value = value || ''; }
    var mv = m.querySelector('#rev-ov-motivo'); if (mv) mv.value = '';
    m.dataset.field = field; m.dataset.tabla = tabla;
    m.style.display = 'flex';
    if (nv) setTimeout(function () { nv.focus(); }, 80);
  }

  /* ── buscar modal: search ─────────────────────────────────── */
  function attachBuscar(root, ctx) {
    var md      = ctx.md;
    var input   = root.querySelector('#rev-bs-q');
    var results = root.querySelector('#rev-bs-results');
    var selId   = root.querySelector('#rev-bs-sel');
    var okBtn   = root.querySelector('#rev-bs-ok');
    if (!input || !results || !selId || !okBtn) return;

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { results.style.display = 'none'; return; }
      var matches = (md.opticas_google || []).filter(function (g) {
        return g.name && g.name.toLowerCase().includes(q);
      }).slice(0, 10);
      if (!matches.length) {
        results.innerHTML = '<div style="padding:var(--space-4);font-size:13px;color:var(--muted)">Sin resultados</div>';
        results.style.display = 'block'; return;
      }
      results.innerHTML = matches.map(function (g) {
        return '<div class="rev-bs-row" data-pid="' + enc(g.place_id) + '">' +
          '<div style="font-weight:500;font-size:13px">' + enc(g.name) + '</div>' +
          '<div style="font-size:11px;color:var(--muted)">' + enc(g.address || g.city || '') + '</div>' +
        '</div>';
      }).join('');
      results.style.display = 'block';
    });

    results.addEventListener('click', function (e) {
      var row = e.target.closest('[data-pid]'); if (!row) return;
      var pid = row.getAttribute('data-pid');
      selId.value = pid;
      okBtn.disabled = false;
      input.value   = row.querySelector('[style*="font-weight"]').textContent;
      results.querySelectorAll('[data-pid]').forEach(function (r) {
        r.style.background = r.getAttribute('data-pid') === pid ? 'var(--accent-6)' : '';
      });
      results.style.display = 'none';
    });

    okBtn.addEventListener('click', function () {
      var pid = selId.value; if (!pid) return;
      var modal = root.querySelector('#rev-bs-modal'); if (modal) modal.style.display = 'none';
      var item  = getCurrent(); if (!item) return;
      var id    = item.id;
      _dismissed[id] = 'vincular-manual';
      refreshTableRow(root, id, true);
      var next = getNextItem(id);
      advanceTo(root, next ? next.id : null, ctx);
      refreshTabs(root);
      ctx.toast('success', 'Vínculo manual creado', 'CPV vinculado con place_id: ' + pid + '.');
    });
  }

  /* ── highlight edit pencils ───────────────────────────────── */
  function hlEdit(root, ctx) {
    var btns = root.querySelectorAll('.rev-field-edit');
    btns.forEach(function (b) { b.classList.add('rev-field-edit-hl'); });
    if (_hlTimer) clearTimeout(_hlTimer);
    _hlTimer = setTimeout(function () {
      btns.forEach(function (b) { b.classList.remove('rev-field-edit-hl'); });
    }, 2000);
    ctx.toast('info', 'Haz click en el lápiz ✎', 'Aparece junto a cada campo al pasar el cursor. No crea vínculo.');
  }

  /* ── bind inner (after fade) ──────────────────────────────── */
  function bindInner(root, ctx) {
    /* Candidate select dropdown */
    var candSel = root.querySelector('#rev-cand-sel');
    if (candSel) {
      candSel.addEventListener('change', function () {
        var item = getCurrent(); if (!item) return;
        _activeCand[item.id] = parseInt(candSel.value, 10);
        var inner = root.querySelector('#rev-focus-inner');
        if (inner) { inner.innerHTML = focusCardInner(item); bindInner(root, ctx); }
      });
    }
    /* Edit pencils */
    root.querySelectorAll('.rev-field-edit').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openOverride(root,
          btn.getAttribute('data-edit-field'),
          btn.getAttribute('data-edit-tabla'),
          btn.getAttribute('data-edit-value'),
          ctx);
      });
    });
  }

  /* ════ MOUNTED ══════════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    if (state !== 'default') return;

    bindInner(root, ctx);
    attachBuscar(root, ctx);

    /* Modal close */
    root.querySelectorAll('[data-rmc]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var m = root.querySelector('#' + btn.getAttribute('data-rmc'));
        if (m) m.style.display = 'none';
      });
    });
    root.querySelectorAll('.modal-overlay').forEach(function (ov) {
      ov.addEventListener('click', function (e) { if (e.target === ov) ov.style.display = 'none'; });
    });

    /* Override OK */
    var ovOk = root.querySelector('#rev-ov-ok');
    if (ovOk) ovOk.addEventListener('click', function () {
      var nuevo = (root.querySelector('#rev-ov-nuevo') || {}).value || '';
      if (!nuevo.trim()) { ctx.toast('error', 'Campo requerido', 'Escribe el nuevo valor.'); return; }
      var campo = (root.querySelector('#rev-ov-modal') || {}).dataset.field || '';
      root.querySelector('#rev-ov-modal').style.display = 'none';
      ctx.toast('success', 'Override guardado', 'Campo "' + campo + '" registrado en opticas_overrides.');
    });

    /* Delegation */
    root.addEventListener('click', function (e) {
      /* Tab switch */
      var rtab = e.target.closest('[data-rtab]');
      if (rtab) {
        _tab = rtab.getAttribute('data-rtab');
        root.querySelectorAll('[data-rtab]').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-rtab') === _tab);
        });
        var q = getVisible();
        _currentId = q.length ? q[0].id : null;
        var cur = getCurrent();
        fadeCard(root, focusCardInner(cur), function () { bindInner(root, ctx); });
        var tbody = root.querySelector('#rev-tbody');
        if (tbody) tbody.innerHTML = tableRowsHTML(_currentId);
        return;
      }
      /* Table row click */
      var rrow = e.target.closest('[data-rrow]');
      if (rrow) {
        var rid = rrow.getAttribute('data-rrow');
        if (_dismissed[rid]) return;
        _currentId = rid;
        var c = getCurrent();
        fadeCard(root, focusCardInner(c), function () { bindInner(root, ctx); });
        refreshTableRow(root, rid, false);
        var fc = root.querySelector('#rev-focus-card');
        if (fc) { var y = fc.getBoundingClientRect().top + window.pageYOffset - 80; window.scrollTo({ top: y, behavior: 'smooth' }); }
        return;
      }
      /* Action buttons */
      var ra = e.target.closest('[data-ra]');
      if (!ra) return;
      var a = ra.getAttribute('data-ra');
      if      (a === 'vincular')   doVincular(root, ctx);
      else if (a === 'distintas')  doDistintas(root, ctx);
      else if (a === 'mantener')   doDistintas(root, ctx); /* solo_cpv: mantener = advance */
      else if (a === 'saltar')     doSaltar(root, ctx);
      else if (a === 'siguiente')  doSiguiente(root, ctx);
      else if (a === 'cerrada')    doCerrada(root, ctx);
      else if (a === 'mantener-ne') doMantenerNE(root, ctx);
      else if (a === 'buscar' || a === 'investigar') {
        var bm = root.querySelector('#rev-bs-modal');
        if (bm) {
          bm.style.display = 'flex';
          var bq = bm.querySelector('#rev-bs-q'); if (bq) { bq.value = ''; bq.focus(); }
          var br = bm.querySelector('#rev-bs-results'); if (br) br.style.display = 'none';
          var bs = bm.querySelector('#rev-bs-sel');     if (bs) bs.value = '';
          var bo = bm.querySelector('#rev-bs-ok');      if (bo) bo.disabled = true;
        }
      }
      else if (a === 'hl-edit')    hlEdit(root, ctx);
    });

    /* Keyboard shortcuts */
    if (_kbdHandler) document.removeEventListener('keydown', _kbdHandler);
    _kbdHandler = function (e) {
      var tag = document.activeElement && document.activeElement.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      var openM = root.querySelector('.modal-overlay[style*="flex"]');
      if (openM) return;
      if (e.key === 'v' || e.key === 'V') { e.preventDefault(); doVincular(root, ctx); }
      else if (e.key === 'd' || e.key === 'D') { e.preventDefault(); doDistintas(root, ctx); }
      else if (e.key === 's' || e.key === 'S') { e.preventDefault(); doSaltar(root, ctx); }
    };
    document.addEventListener('keydown', _kbdHandler);
  }

  /* ── register ─────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/admin/revision'] = {
    render: function (state, ctx) {
      /* Reset on navigate */
      _tab = 'todos'; _currentId = null; _dismissed = {};
      _skippedIds = {}; _transformed = {}; _activeCand = {};
      if (_kbdHandler) { document.removeEventListener('keydown', _kbdHandler); _kbdHandler = null; }
      if (state === 'loading') return renderLoading(ctx);
      if (state === 'empty')   return renderEmpty(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted,
  };
})();
