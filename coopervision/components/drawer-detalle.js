/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · components/drawer-detalle.js — V5
   Drawer lateral de detalle de óptica. Componente GLOBAL: se monta
   en el <body> (no en #view-root), por lo que funciona desde V4
   (tabla), V3 (popup del mapa) y como deep-link ?optica=<place_id>.

   API pública:  window.cpvDrawer.open(place_id)  ·  .close()
   Enganches:    - V4 bbdd.js llama cpvDrawer.open(pid) en openDetalle()
                 - botones [data-action="open-detalle"][data-place-id]
                   (popup del mapa V3) se capturan por delegación global
                 - deep-link: ?optica=<pid> en el hash al cargar

   URL: persiste ?optica=<pid> vía history.replaceState (no dispara el
   router; el hash conserva la ruta + filtros previos). Cierre limpia
   el parámetro. Datos 100% desde window.mockData + md.helpers.
   Spec: 5.vistas_spec_parte2.md §V5. DS: 3.design_system.md §6.11/§8.6.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const md = window.mockData;
  if (!md) return;
  const h = md.helpers;
  const NOW = new Date('2026-06-13T12:00:00');

  /* ── estado del módulo (instancia única) ─────────────────────── */
  let _root = null;        // overlay + drawer (en body)
  let _modal = null;       // modal "Corregir dato" (en body)
  let _pid = null;         // place_id activo
  let _tab = 'google';     // pestaña activa
  let _histN = 8;          // nº de eventos de timeline mostrados
  let _roleObs = null;     // observa cambios de rol

  const TABS = [
    { key: 'google',  label: 'Google Maps' },
    { key: 'cpv',     label: 'CooperVision' },
    { key: 'cambios', label: 'Cambios' },
    { key: 'app',     label: 'App' },
    { key: 'estado',  label: 'Estado' },
  ];

  /* ════ utilidades ════ */
  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function role() { return document.body.getAttribute('data-role') || 'admin'; }
  function isAdmin() { return role() === 'admin'; }

  function fechaHora(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
  function fechaCorta(iso) {
    return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
  function rel(iso) {
    const days = Math.floor((NOW - new Date(iso)) / 86400000);
    if (days <= 0) return 'hoy';
    if (days === 1) return 'ayer';
    if (days < 30) return 'hace ' + days + ' días';
    const m = Math.floor(days / 30);
    if (m < 12) return 'hace ' + m + (m === 1 ? ' mes' : ' meses');
    const y = Math.floor(m / 12);
    return 'hace ' + y + (y === 1 ? ' año' : ' años');
  }
  function userName(id) {
    const u = md.usuarios.find((x) => x.id === id);
    if (!u) return 'Sistema';
    const w = u.nombre.split(/\s+/).filter(Boolean);
    return w[1] ? w[0] + ' ' + w[1][0] + '.' : w[0];
  }

  /* ── toast (replica el patrón del shell para uso standalone) ─── */
  function toast(type, title, body) {
    const cont = document.getElementById('toast-container');
    if (!cont) return;
    const icons = { success: 'check-circle', error: 'warning-triangle', warn: 'warning-triangle', info: 'bell' };
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML =
      '<span class="toast-icon ' + type + '"><iconify-icon icon="iconoir:' + (icons[type] || 'bell') + '" width="18"></iconify-icon></span>' +
      '<div class="toast-content"><div class="toast-title">' + enc(title) + '</div>' +
      (body ? '<div class="toast-body">' + enc(body) + '</div>' : '') + '</div>' +
      '<button class="toast-close" aria-label="Cerrar"><iconify-icon icon="iconoir:xmark" width="14"></iconify-icon></button>';
    const t = setTimeout(() => dismiss(), type === 'error' ? 8000 : type === 'warn' ? 6000 : 4000);
    function dismiss() {
      clearTimeout(t);
      if (!el.isConnected) return;
      el.classList.add('leaving');
      setTimeout(() => el.remove(), 180);
    }
    el.querySelector('.toast-close').addEventListener('click', dismiss);
    cont.appendChild(el);
  }

  function copyText(text) {
    const done = () => toast('success', 'Copiado', text + ' en el portapapeles.');
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

  /* ════ URL: ?optica=<pid> sin disparar el router ════ */
  function hashParts() {
    let raw = (location.hash || '').replace(/^#/, '');
    const qi = raw.indexOf('?');
    const path = qi === -1 ? raw : raw.slice(0, qi);
    const params = new URLSearchParams(qi === -1 ? '' : raw.slice(qi + 1));
    return { path: path || '/', params };
  }
  function setOpticaParam(pid) {
    const { path, params } = hashParts();
    if (pid) params.set('optica', pid); else params.delete('optica');
    const qs = params.toString();
    history.replaceState(null, '', '#' + path + (qs ? '?' + qs : ''));
  }
  function readOpticaParam() { return hashParts().params.get('optica'); }

  /* ════ modelo de datos para un place_id ════ */
  function cpvOverrideAplicado(cpv, overrides) {
    if (!cpv) return cpv;
    const out = Object.assign({}, cpv);
    overrides.filter((o) => o.tabla_origen === 'opticas_cpv' && o.registro_id === cpv.CODIGO)
      .forEach((o) => { out[o.campo] = o.valor_nuevo; });
    return out;
  }
  function buildModel(pid) {
    const gBase = md.opticas_google.find((g) => g.place_id === pid) || null;
    if (!gBase) return null;
    const overrides = h.overrides_de(pid);
    const cpvBase = h.cpv_de(pid);
    return {
      pid: pid,
      gBase: gBase,
      g: h.aplica_overrides_google(pid) || gBase,
      isClient: h.is_client(pid),
      cpvBase: cpvBase,
      cpv: cpvOverrideAplicado(cpvBase, overrides),
      app: h.app_data_de(pid),
      cadena: h.cadena_de(pid),
      overrides: overrides,
    };
  }
  function findOverride(model, tabla, campo) {
    const regId = tabla === 'opticas_cpv' ? (model.cpvBase && model.cpvBase.CODIGO) : model.pid;
    return model.overrides.find((o) => o.tabla_origen === tabla && o.campo === campo && o.registro_id === regId) || null;
  }

  /* ════ render: helper de campo label-valor ════
     opts = { mono, link, copy, editable, tabla, campo, chips:[], html, empty } */
  function field(model, label, value, opts) {
    opts = opts || {};
    const ov = (opts.tabla && opts.campo) ? findOverride(model, opts.tabla, opts.campo) : null;
    let valHtml;
    const isEmpty = !opts.html && !opts.chips && (value == null || value === '');

    if (opts.chips) {
      valHtml = opts.chips.length
        ? '<div class="cpv-valchips">' + opts.chips.map((c) => '<span class="cpv-valchip">' + enc(c) + '</span>').join('') + '</div>'
        : '<span>—</span>';
    } else if (opts.html) {
      valHtml = opts.html;
    } else if (isEmpty) {
      valHtml = '<span>—</span>';
    } else if (opts.link) {
      valHtml = '<a class="cpv-extlink" href="' + enc(value) + '" target="_blank" rel="noopener">' +
        enc(String(value).replace(/^https?:\/\//, '')) + '<iconify-icon icon="iconoir:open-new-window" width="12"></iconify-icon></a>';
    } else if (opts.mono) {
      valHtml = '<span class="cpv-mono">' + enc(value) + '</span>';
    } else {
      valHtml = '<span>' + enc(value) + '</span>';
    }

    // botón copy o pencil a la derecha del valor
    let trailing = '';
    if (opts.copy) {
      trailing = '<button class="cpv-copy" data-copy="' + enc(value) + '" aria-label="Copiar"><iconify-icon icon="iconoir:copy" width="13"></iconify-icon></button>';
    } else if (opts.editable && isAdmin() && opts.tabla && opts.campo) {
      trailing = '<button class="cpv-field-edit" data-edit-tabla="' + enc(opts.tabla) + '" data-edit-campo="' + enc(opts.campo) +
        '" data-edit-label="' + enc(label) + '" aria-label="Corregir ' + enc(label) + '"><iconify-icon icon="iconoir:edit-pencil" width="13"></iconify-icon></button>';
    }

    let body =
      '<div class="cpv-field-main">' + valHtml + (ov ? ' <span class="pill pill-warn pill-sm"><iconify-icon icon="iconoir:edit-pencil" width="10"></iconify-icon>Corregido manualmente</span>' : '') + trailing + '</div>';

    if (ov) {
      const orig = ov.valor_anterior == null ? '(vacío)' : ov.valor_anterior;
      body += '<div class="cpv-orig">Valor original: <s>' + enc(orig) + '</s> · por <b>' + enc(userName(ov.usuario_id)) + '</b> · ' + fechaCorta(ov.fecha) + '</div>';
    }

    return '<div class="cpv-field"><div class="cpv-field-label">' + enc(label) + '</div>' +
      '<div class="cpv-field-value' + (isEmpty && !ov ? ' is-empty' : '') + '">' + body + '</div></div>';
  }
  function group(title, rows) {
    return '<div class="cpv-group"><div class="cpv-group-eyebrow">' + enc(title) + '</div>' + rows.join('') + '</div>';
  }
  function stars(r) {
    const full = Math.round(r); let s = '';
    for (let i = 1; i <= 5; i++) s += '<span class="cpv-star' + (i <= full ? '' : ' off') + '">★</span>';
    return '<span class="cpv-stars">' + s + '</span>';
  }

  /* ════════════════════════════════════════════════════════════
     TAB 1 · Google Maps
     ════════════════════════════════════════════════════════════ */
  function bizStatusPill(status) {
    if (status === 'CLOSED_PERMANENTLY') return '<span class="pill pill-neg pill-sm">Cerrada permanentemente</span>';
    if (status === 'CLOSED_TEMPORARILY') return '<span class="pill pill-warn pill-sm">Cerrada temporalmente</span>';
    return '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Activa</span>';
  }
  function hoursHTML(csv) {
    if (!csv) return '<span>—</span>';
    const lines = String(csv).split(';').map((s) => s.trim()).filter(Boolean);
    return '<div class="cpv-hours">' + lines.map((l) => '<span>' + enc(l) + '</span>').join('') + '</div>';
  }
  function tabGoogle(m) {
    const g = m.g;
    const out = [];
    out.push(group('Identidad', [
      field(m, 'Nombre', g.name, { editable: true, tabla: 'opticas_google', campo: 'name' }),
      field(m, 'Nombre emails', g.name_for_emails, { editable: true, tabla: 'opticas_google', campo: 'name_for_emails' }),
      field(m, 'Descripción', g.description),
      field(m, 'Acerca de', g.about),
    ]));
    out.push(group('Contacto', [
      field(m, 'Teléfono', g.phone, { editable: true, tabla: 'opticas_google', campo: 'phone' }),
      field(m, 'Sitio web', g.website, { link: !!g.website, editable: true, tabla: 'opticas_google', campo: 'website' }),
      field(m, 'Gestor de cita', g.booking_appointment_link, { link: !!g.booking_appointment_link }),
    ]));
    out.push(group('Ubicación', [
      field(m, 'Dirección', g.address, { editable: true, tabla: 'opticas_google', campo: 'address' }),
      field(m, 'Calle', g.street),
      field(m, 'Ciudad', g.city, { editable: true, tabla: 'opticas_google', campo: 'city' }),
      field(m, 'Provincia', g.state),
      field(m, 'Código postal', g.postal_code, { editable: true, tabla: 'opticas_google', campo: 'postal_code' }),
      field(m, 'País', g.country + ' (' + g.country_code + ')'),
      field(m, 'Coordenadas', null, { html: '<div class="cpv-field-main"><span class="cpv-mono">' + g.latitude.toFixed(4) + ', ' + g.longitude.toFixed(4) + '</span>' +
        '<button class="btn btn-subtle btn-sm" data-foot="mapa"><iconify-icon icon="iconoir:map-pin" width="13"></iconify-icon>Ver en mapa</button></div>' }),
    ]));
    out.push(group('Reputación', [
      field(m, 'Valoración', null, { html: '<div class="cpv-field-main">' + stars(g.rating) + ' <span class="tnum" style="font-weight:600">' + g.rating.toFixed(1).replace('.', ',') + '</span> <span class="c-muted">· ' + g.reviews + ' reseñas</span></div>' }),
      field(m, 'Reseñas 5★', String(g.reviews_per_score_5)),
      field(m, 'Reseñas 1★', String(g.reviews_per_score_1)),
      field(m, 'Enlace reseñas', g.reviews_link && g.reviews_link !== '#' ? g.reviews_link : null, { link: !!(g.reviews_link && g.reviews_link !== '#'), html: g.reviews_link === '#' ? '<a class="cpv-extlink" href="#" onclick="return false">Ver en Google<iconify-icon icon="iconoir:open-new-window" width="12"></iconify-icon></a>' : null }),
      field(m, 'Fotos', String(g.photos_count)),
    ]));
    out.push(group('Operativa', [
      field(m, 'Estado negocio', null, { html: '<div class="cpv-field-main">' + bizStatusPill(g.business_status) + '</div>' }),
      field(m, 'Verificada', null, { html: '<div class="cpv-field-main">' + (g.verified ? '<span class="pill pill-pos pill-sm"><iconify-icon icon="iconoir:verified-badge" width="11"></iconify-icon>Sí</span>' : '<span class="pill pill-paused pill-sm">No</span>') + '</div>' }),
      field(m, 'Horario', null, { html: hoursHTML(g.working_hours_csv_compatible) }),
      field(m, 'Categoría', g.category),
      field(m, 'Subtipos', null, { chips: g.subtypes || [] }),
    ]));
    out.push(group('Identificadores', [
      field(m, 'place_id', g.place_id, { mono: true, copy: true }),
      field(m, 'google_id', g.google_id, { mono: true, copy: true }),
      field(m, 'cid', g.cid, { mono: true, copy: true }),
    ]));
    return out.join('');
  }

  /* ════════════════════════════════════════════════════════════
     TAB 2 · CooperVision
     ════════════════════════════════════════════════════════════ */
  function tabCpv(m) {
    if (!m.isClient || !m.cpv) {
      return '<div class="empty-state" style="min-height:280px">' +
        '<iconify-icon class="empty-state-icon" icon="iconoir:database-xmark" width="32"></iconify-icon>' +
        '<h2 class="state-title">Sin datos comerciales</h2>' +
        '<p class="state-body">Esta óptica no es cliente CooperVision. No hay un registro de <span class="mono-sm">opticas_cpv</span> vinculado.</p>' +
        '</div>';
    }
    const c = m.cpv;
    const out = [];
    out.push(group('Identidad CPV', [
      field(m, 'Código', c.CPV_ID, { mono: true, copy: !!c.CPV_ID }),
      field(m, 'Grupo', null, { chips: [c.GRUPO] }),
    ]));
    out.push(group('Contacto (declarado CPV)', [
      field(m, 'Teléfono', c.TEL, { editable: true, tabla: 'opticas_cpv', campo: 'TEL' }),
      field(m, 'Email', c.EMAIL, { editable: true, tabla: 'opticas_cpv', campo: 'EMAIL' }),
      field(m, 'Dirección', c.DIRECCION, { editable: true, tabla: 'opticas_cpv', campo: 'DIRECCION' }),
      field(m, 'Localidad', c.LOCALIDAD, { editable: true, tabla: 'opticas_cpv', campo: 'LOCALIDAD' }),
      field(m, 'Provincia', c.PROVINCIA, { editable: true, tabla: 'opticas_cpv', campo: 'PROVINCIA' }),
    ]));
    out.push(group('Comercial', [
      field(m, 'Delegado (DP)', c.DP, { editable: true, tabla: 'opticas_cpv', campo: 'DP' }),
      field(m, 'Comercial', c.COM, { editable: true, tabla: 'opticas_cpv', campo: 'COM' }),
      field(m, 'Tipología', null, { chips: [c.TIPOLOGIA] }),
      field(m, 'Segmentación', null, { chips: ['Segmento ' + c.SEGMENTACION] }),
    ]));
    out.push(group('Datos técnicos', [
      field(m, 'Precisión geo', c.LOCATION_ACC, { html: '<div class="cpv-field-main"><span>' + enc(c.LOCATION_ACC) + '</span> <span class="c-muted body-xs">(accuracy Salesforce)</span></div>' }),
    ]));
    return out.join('');
  }

  /* ════════════════════════════════════════════════════════════
     TAB 3 · Cambios y overrides
     ════════════════════════════════════════════════════════════ */
  const TL_META = {
    sync_outscraper:     { icon: 'refresh-double', cls: 'info',   title: 'Sincronización Outscraper' },
    sync_salesforce:     { icon: 'refresh-double', cls: 'info',   title: 'Sincronización Salesforce' },
    override_aplicado:   { icon: 'edit-pencil',    cls: 'warn',   title: 'Corrección aplicada' },
    override_revertido:  { icon: 'edit-pencil',    cls: 'muted',  title: 'Corrección revertida' },
    vinculo_creado:      { icon: 'check-circle',   cls: 'pos',    title: 'Vínculo CPV ↔ Google creado' },
    vinculo_eliminado:   { icon: 'xmark',          cls: 'neg',    title: 'Vínculo eliminado' },
    app_data_actualizado:{ icon: 'settings',       cls: 'accent', title: 'Datos de app actualizados' },
    alta_inicial:        { icon: 'plus',           cls: 'muted',  title: 'Alta inicial en la base de datos' },
  };
  function buildHistorico(m) {
    const ev = [];
    // eventos reales del log para este place_id (incluye override_aplicado mapeado)
    md.cambios_historicos.filter((c) => c.place_id === m.pid).forEach((c) => ev.push(Object.assign({}, c)));
    const has = (tipo) => ev.some((e) => e.tipo === tipo);
    // sintéticos: syncs que la tocaron
    ev.push({ fecha: '2026-05-10T14:32:00', tipo: 'sync_outscraper', motivo: 'Datos de Google refrescados' });
    ev.push({ fecha: '2026-02-08T13:20:00', tipo: 'sync_outscraper', motivo: 'Datos de Google refrescados' });
    // vínculo si es cliente y no hay ya uno
    if (m.isClient && !has('vinculo_creado')) {
      ev.push({ fecha: '2025-08-20T09:12:00', tipo: 'vinculo_creado', usuario_id: 1,
        motivo: 'Match confirmado: ' + (m.cpvBase ? m.cpvBase.CODIGO : 'CPV') + ' ↔ Google' });
    }
    // alta inicial
    const alta = (m.app && m.app.fecha_alta_en_app) ? m.app.fecha_alta_en_app : '2025-08-15';
    ev.push({ fecha: alta + 'T08:00:00', tipo: 'alta_inicial' });
    ev.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    return ev;
  }
  function tlItem(e) {
    const meta = TL_META[e.tipo] || { icon: 'circle', cls: 'muted', title: e.tipo };
    let detail = '';
    if (e.tipo === 'override_aplicado' || e.tipo === 'override_revertido') {
      detail = '<b>' + enc(e.campo) + '</b>: ' + enc(e.valor_nuevo) +
        (e.valor_anterior != null ? ' <s>(antes: ' + enc(e.valor_anterior) + ')</s>' : ' <span class="c-muted2">(antes vacío)</span>');
    } else if (e.tipo === 'app_data_actualizado') {
      detail = '<b>' + enc(e.campo) + '</b>: ' + enc(e.valor_nuevo);
    } else if (e.motivo) {
      detail = enc(e.motivo);
    }
    const who = e.usuario_id ? ' · <span class="cpv-tl-user">' + enc(userName(e.usuario_id)) + '</span>' : '';
    return '<div class="cpv-tl"><div class="cpv-tl-icon ' + meta.cls + '"><iconify-icon icon="iconoir:' + meta.icon + '" width="13"></iconify-icon></div>' +
      '<div class="cpv-tl-body"><div class="cpv-tl-head"><span class="cpv-tl-title">' + enc(meta.title) + '</span>' +
      '<span class="cpv-tl-date">' + fechaHora(e.fecha) + '</span></div>' +
      (detail ? '<div class="cpv-tl-detail">' + detail + who + '</div>' : (who ? '<div class="cpv-tl-detail">' + who.replace(' · ', '') + '</div>' : '')) +
      '</div></div>';
  }
  function tabCambios(m) {
    const overrides = m.overrides.slice().sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    let block1;
    if (!overrides.length) {
      block1 = '<p class="body-sm c-muted" style="margin:0 0 var(--space-6)">Sin correcciones manuales activas sobre esta óptica.</p>';
    } else {
      block1 = '<div style="margin-bottom:var(--space-6)">' + overrides.map((o) => {
        const orig = o.valor_anterior == null ? '(vacío)' : o.valor_anterior;
        const tablaCorta = o.tabla_origen.replace('opticas_', '');
        return '<div class="cpv-ov-card">' +
          '<div class="cpv-ov-top"><span class="cpv-ov-icon"><iconify-icon icon="iconoir:edit-pencil" width="14"></iconify-icon></span>' +
          '<span class="cpv-ov-field">' + enc(o.campo) + '</span><span class="cpv-ov-table">· ' + enc(tablaCorta) + '</span></div>' +
          '<div class="cpv-ov-change">' + enc(o.valor_nuevo) + ' <s>(era: ' + enc(orig) + ')</s></div>' +
          '<div class="cpv-ov-meta">por ' + enc(userName(o.usuario_id)) + ' · ' + rel(o.fecha) + '</div>' +
          '<div class="cpv-ov-foot"><span class="cpv-ov-motivo">' + (o.motivo ? '“' + enc(o.motivo) + '”' : '') + '</span>' +
          (isAdmin() ? '<button class="btn btn-ghost btn-sm cpv-ov-revert" data-ov-id="' + o.id + '"><iconify-icon icon="iconoir:undo" width="13"></iconify-icon>Revertir</button>' : '') +
          '</div></div>';
      }).join('') + '</div>';
    }

    const ev = buildHistorico(m);
    const shown = ev.slice(0, _histN);
    const more = ev.length > _histN
      ? '<button class="btn btn-ghost btn-sm cpv-tl-more"><iconify-icon icon="iconoir:plus" width="13"></iconify-icon>Cargar más (' + (ev.length - _histN) + ')</button>'
      : '';
    const changelogLink = isAdmin()
      ? '<a class="cpv-tl-changelog" href="#/changelog?optica=' + enc(m.pid) + '">Ver en changelog completo →</a>'
      : '';

    return '<p class="cpv-sub-eyebrow">Overrides activos · ' + overrides.length + '</p>' + block1 +
      '<p class="cpv-sub-eyebrow">Histórico de cambios</p>' +
      '<div class="cpv-timeline">' + shown.map(tlItem).join('') + '</div>' +
      ((more || changelogLink) ? '<div class="cpv-dd-morewrap">' + more + changelogLink + '</div>' : '');
  }

  /* ════════════════════════════════════════════════════════════
     TAB 4 · App
     ════════════════════════════════════════════════════════════ */
  function tabApp(m) {
    const a = m.app || {};
    const admin = isAdmin();
    const out = [];
    out.push(group('Identidad app', [
      field(m, 'place_id (FK)', m.pid, { mono: true, copy: true }),
      field(m, 'Alta en app', a.fecha_alta_en_app ? fechaCorta(a.fecha_alta_en_app) : null),
    ]));

    let cadenaHtml;
    if (m.cadena) {
      cadenaHtml = '<div class="cpv-field-main"><span class="pill pill-neutral pill-sm">' + enc(m.cadena.nombre) + '</span> <span class="c-muted body-xs">· ' + (m.cadena.pais === 'PT' ? 'Portugal' : 'España') + '</span></div>';
    } else {
      cadenaHtml = '<div class="cpv-cadena-empty"><span class="is-empty" style="color:var(--muted-2)">Sin cadena asignada</span>' +
        (admin ? '<button class="btn btn-ghost btn-sm" data-app-action="reaplicar-cadena"><iconify-icon icon="iconoir:refresh" width="13"></iconify-icon>Re-aplicar detección</button>' : '') + '</div>';
    }
    out.push(group('Cadena', [ field(m, 'Cadena resuelta', null, { html: cadenaHtml }) ]));

    return out.join('');
  }

  /* ════════════════════════════════════════════════════════════
     TAB 5 · Estado y campañas
     ════════════════════════════════════════════════════════════ */
  function matchingPill(m) {
    if (m.isClient) return '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Match confirmado</span>';
    return '<span class="pill pill-paused pill-sm">Sin vínculo CPV</span>';
  }
  function tabEstado(m) {
    const a = m.app || {};
    const admin = isAdmin();
    const out = [];
    out.push(group('Estado del registro', [
      field(m, 'Matching', null, { html: '<div class="cpv-field-main">' + matchingPill(m) + '</div>' }),
      field(m, 'Estado negocio', null, { html: '<div class="cpv-field-main">' + bizStatusPill(m.g.business_status) + '</div>' }),
      field(m, 'Última verificación', fechaCorta(md.ultima_sync_outscraper)),
    ]));

    const tgl = (key, name, desc, on) =>
      '<div class="cpv-toggle-row"><div class="cpv-toggle-info"><div class="cpv-toggle-name">' + enc(name) + '</div>' +
      '<div class="cpv-toggle-desc">' + enc(desc) + '</div></div>' +
      '<label class="toggle-label"><input type="checkbox" data-toggle="' + key + '"' + (on ? ' checked' : '') + (admin ? '' : ' disabled') + '><span class="toggle-track"></span></label></div>';

    out.push('<div class="cpv-group"><div class="cpv-group-eyebrow">Visibilidad en campañas</div>' +
      tgl('show_campañas_core', 'Campañas Core', 'Mostrar en campañas generales de CooperVision.', !!a.show_campañas_core) +
      tgl('show_campañas_miopia', 'Control de Miopía', 'Mostrar en campañas del programa de control de miopía.', !!a.show_campañas_miopia) +
      '<div class="cpv-context-note">Estos toggles controlarán si la óptica aparece en el mapa público (Fase 2). Actualmente <b>no se aplica</b>.</div></div>');

    if (admin) {
      out.push('<div class="cpv-group"><div class="cpv-danger">' +
        '<div class="cpv-danger-head"><iconify-icon icon="iconoir:warning-triangle" width="14"></iconify-icon><span class="cpv-danger-title">Zona de peligro</span></div>' +
        '<button class="btn btn-ghost btn-sm" data-danger="cerrada"><iconify-icon icon="iconoir:building" width="14"></iconify-icon>Marcar como cerrada permanentemente</button>' +
        '<button class="btn btn-ghost btn-sm" data-danger="deteccion"><iconify-icon icon="iconoir:network-left" width="14"></iconify-icon>Solicitar nueva detección de cadena</button>' +
        '</div></div>');
    }
    return out.join('');
  }

  /* ════ tab dispatcher ════ */
  function tabContent(m) {
    switch (_tab) {
      case 'cpv':     return tabCpv(m);
      case 'cambios': return tabCambios(m);
      case 'app':     return tabApp(m);
      case 'estado':  return tabEstado(m);
      default:        return tabGoogle(m);
    }
  }

  /* ════ header / tabs / footer ════ */
  function headHTML(m) {
    const pills = [];
    pills.push(m.isClient
      ? '<span class="pill pill-accent pill-sm"><iconify-icon icon="iconoir:verified-badge" width="11"></iconify-icon>Cliente CPV</span>'
      : '<span class="pill pill-paused pill-sm">No cliente</span>');
    // matching: solo si ≠ match_confirmado
    if (!m.isClient) pills.push('<span class="pill pill-neutral pill-sm">Sin vínculo</span>');
    if (m.overrides.length) pills.push('<span class="pill pill-warn pill-sm"><iconify-icon icon="iconoir:edit-pencil" width="10"></iconify-icon>' + m.overrides.length + '</span>');

    return '<div class="cpv-dd-name-row"><h2 class="cpv-dd-name">' + enc(m.g.name) + '</h2>' +
      '<button class="cpv-dd-close" data-foot="cerrar" aria-label="Cerrar ficha"><iconify-icon icon="iconoir:xmark" width="20"></iconify-icon></button></div>' +
      '<div class="cpv-dd-pills">' + pills.join('') + '</div>' +
      '<div class="cpv-dd-addr"><iconify-icon icon="iconoir:map-pin" width="13"></iconify-icon>' + enc(m.g.address) + '</div>';
  }
  function tabsHTML(m) {
    return TABS.map((t) => {
      let count = '';
      if (t.key === 'cambios' && m.overrides.length) count = '<span class="cpv-dd-tab-count">' + m.overrides.length + '</span>';
      return '<button class="cpv-dd-tab' + (t.key === _tab ? ' on' : '') + '" data-tab="' + t.key + '">' + enc(t.label) + count + '</button>';
    }).join('');
  }
  function footHTML(m) {
    if (isAdmin()) {
      const corregible = _tab === 'google' || (_tab === 'cpv' && m.isClient);
      const corregirBtn = '<button class="btn btn-primary btn-sm" data-foot="corregir"' + (corregible ? '' : ' disabled title="Sin campos corregibles vía override en esta pestaña"') +
        '><iconify-icon icon="iconoir:edit-pencil" width="13"></iconify-icon>Corregir dato</button>';
      return '<button class="btn btn-ghost btn-sm" data-foot="mapa"><iconify-icon icon="iconoir:map-pin" width="13"></iconify-icon>Ver en mapa →</button>' + corregirBtn;
    }
    return '<button class="btn btn-subtle btn-sm" data-foot="cerrar">Cerrar</button>' +
      '<button class="btn btn-ghost btn-sm" data-foot="mapa"><iconify-icon icon="iconoir:map-pin" width="13"></iconify-icon>Ver en mapa →</button>';
  }

  /* ════ render incremental (sin re-animar el slide-in) ════ */
  function renderParts() {
    const m = buildModel(_pid);
    if (!m) return;
    _root.querySelector('.cpv-dd-head').innerHTML = headHTML(m);
    _root.querySelector('.cpv-dd-tabs').innerHTML = tabsHTML(m);
    _root.querySelector('.cpv-dd-body').innerHTML = tabContent(m);
    _root.querySelector('.cpv-dd-foot').innerHTML = footHTML(m);
  }
  function renderBodyFoot() {
    const m = buildModel(_pid);
    if (!m) return;
    _root.querySelector('.cpv-dd-tabs').innerHTML = tabsHTML(m);
    _root.querySelector('.cpv-dd-body').innerHTML = tabContent(m);
    _root.querySelector('.cpv-dd-foot').innerHTML = footHTML(m);
    _root.querySelector('.cpv-dd-body').scrollTop = 0;
  }

  /* ════ apertura / cierre ════ */
  function open(pid) {
    if (!pid) return;
    if (_root && _pid === pid) return; // idempotente (evita doble-disparo)
    const m = buildModel(pid);
    _pid = pid; _tab = 'google'; _histN = 8;

    if (!_root) {
      _root = document.createElement('div');
      document.body.appendChild(_root);
      attachRoleObserver();
    }

    if (!m) {
      _root.innerHTML =
        '<div class="drawer-overlay" data-foot="cerrar"></div>' +
        '<aside class="drawer cpv-dd" role="dialog" aria-label="Óptica no encontrada">' +
        '<div class="cpv-dd-head"><div class="cpv-dd-name-row"><h2 class="cpv-dd-name">Óptica no encontrada</h2>' +
        '<button class="cpv-dd-close" data-foot="cerrar"><iconify-icon icon="iconoir:xmark" width="20"></iconify-icon></button></div></div>' +
        '<div class="cpv-dd-notfound"><iconify-icon icon="iconoir:minus-circle" width="32" style="color:var(--muted-2)"></iconify-icon>' +
        '<p class="state-body">No existe ninguna óptica con el identificador <span class="mono-sm">' + enc(pid) + '</span>.</p>' +
        '<button class="btn btn-ghost btn-sm" data-foot="cerrar">Cerrar</button></div></aside>';
      setOpticaParam(pid);
      bindRoot();
      return;
    }

    _root.innerHTML =
      '<div class="drawer-overlay" data-foot="cerrar"></div>' +
      '<aside class="drawer cpv-dd" role="dialog" aria-label="Detalle de óptica" tabindex="-1">' +
      '<div class="cpv-dd-head"></div>' +
      '<div class="cpv-dd-tabs"></div>' +
      '<div class="cpv-dd-body"></div>' +
      '<div class="cpv-dd-foot"></div>' +
      '</aside>';
    renderParts();
    setOpticaParam(pid);
    bindRoot();
    const dr = _root.querySelector('.drawer');
    if (dr) dr.focus();
  }

  function close() {
    closeModal();
    if (_root) { _root.innerHTML = ''; }
    _pid = null;
    if (readOpticaParam()) setOpticaParam(null);
  }

  function switchTab(key) {
    if (key === _tab) return;
    _tab = key; _histN = 8;
    renderBodyFoot();
    const tabs = _root.querySelectorAll('.cpv-dd-tab');
    tabs.forEach((t) => t.classList.toggle('on', t.getAttribute('data-tab') === key));
  }

  function verEnMapa() {
    const { path } = hashParts();
    if (path === '/mapa') { close(); toast('info', 'Ya estás en el mapa', 'La óptica está situada en el mapa actual.'); return; }
    close();
    location.hash = '#/mapa?optica=' + encodeURIComponent(_pid || '');
  }

  /* ════ eventos del drawer (delegación sobre _root) ════ */
  function bindRoot() {
    _root.onclick = function (e) {
      const close_ = e.target.closest('[data-foot="cerrar"]');
      if (close_) { close(); return; }

      const tab = e.target.closest('.cpv-dd-tab');
      if (tab) { switchTab(tab.getAttribute('data-tab')); return; }

      const copy = e.target.closest('[data-copy]');
      if (copy) { copyText(copy.getAttribute('data-copy')); return; }

      const edit = e.target.closest('.cpv-field-edit');
      if (edit) { openModal({ tabla: edit.getAttribute('data-edit-tabla'), campo: edit.getAttribute('data-edit-campo') }); return; }

      const corregir = e.target.closest('[data-foot="corregir"]');
      if (corregir && !corregir.disabled) {
        openModal({ tabla: _tab === 'cpv' ? 'opticas_cpv' : 'opticas_google' });
        return;
      }

      const mapa = e.target.closest('[data-foot="mapa"]');
      if (mapa) { verEnMapa(); return; }

      const revert = e.target.closest('.cpv-ov-revert');
      if (revert) { toast('warn', 'Override revertido', 'Se registró un override de neutralización. El valor original vuelve a aplicarse.'); return; }

      const more = e.target.closest('.cpv-tl-more');
      if (more) { _histN += 20; renderBodyFoot(); return; }

      const appAct = e.target.closest('[data-app-action]');
      if (appAct) {
        const act = appAct.getAttribute('data-app-action');
        if (act === 'reaplicar-cadena') toast('info', 'Detección lanzada', 'Recalculando la cadena de esta óptica…');
        return;
      }

      const danger = e.target.closest('[data-danger]');
      if (danger) {
        const d = danger.getAttribute('data-danger');
        if (d === 'cerrada') toast('warn', 'Marcada como cerrada', 'Se registró un override de business_status = cerrada permanentemente.');
        else toast('info', 'Detección solicitada', 'Se ha encolado una nueva detección de cadena para esta óptica.');
        return;
      }
    };
    // toggles de campaña
    _root.onchange = function (e) {
      const tg = e.target.closest('[data-toggle]');
      if (!tg) return;
      const key = tg.getAttribute('data-toggle');
      const a = m_app();
      if (a) a[key] = tg.checked;
      toast('success', 'Visibilidad actualizada', (key === 'show_campañas_miopia' ? 'Control de Miopía' : 'Campañas Core') + ': ' + (tg.checked ? 'visible' : 'oculta') + '.');
    };
  }
  function m_app() { return h.app_data_de(_pid); }

  /* ════════════════════════════════════════════════════════════
     MODAL · Corregir dato
     ════════════════════════════════════════════════════════════ */
  const GOOGLE_FIELDS = [
    { campo: 'name', label: 'Nombre' }, { campo: 'phone', label: 'Teléfono' },
    { campo: 'website', label: 'Sitio web' }, { campo: 'address', label: 'Dirección' },
    { campo: 'city', label: 'Ciudad' }, { campo: 'postal_code', label: 'Código postal' },
    { campo: 'category', label: 'Categoría' }, { campo: 'business_status', label: 'Estado del negocio' },
  ];
  const CPV_FIELDS = [
    { campo: 'TEL', label: 'Teléfono CPV' }, { campo: 'EMAIL', label: 'Email CPV' },
    { campo: 'DIRECCION', label: 'Dirección CPV' }, { campo: 'LOCALIDAD', label: 'Localidad' },
    { campo: 'PROVINCIA', label: 'Provincia' }, { campo: 'DP', label: 'Delegado (DP)' },
    { campo: 'COM', label: 'Comercial' },
  ];
  function fieldsFor(tabla) { return tabla === 'opticas_cpv' ? CPV_FIELDS : GOOGLE_FIELDS; }
  function origValue(tabla, campo) {
    const m = buildModel(_pid);
    if (!m) return '';
    if (tabla === 'opticas_cpv') return m.cpvBase ? (m.cpvBase[campo] == null ? '' : m.cpvBase[campo]) : '';
    return m.gBase[campo] == null ? '' : m.gBase[campo];
  }
  function currentValue(tabla, campo) {
    const m = buildModel(_pid);
    if (!m) return '';
    if (tabla === 'opticas_cpv') return m.cpv ? (m.cpv[campo] == null ? '' : m.cpv[campo]) : '';
    return m.g[campo] == null ? '' : m.g[campo];
  }

  function openModal(opts) {
    const tabla = opts.tabla || 'opticas_google';
    const fields = fieldsFor(tabla);
    let campo = opts.campo;
    if (!campo || !fields.some((f) => f.campo === campo)) campo = fields[0].campo;

    if (!_modal) { _modal = document.createElement('div'); document.body.appendChild(_modal); }
    _modal.innerHTML =
      '<div class="modal-overlay" data-cor="cancel">' +
        '<div class="modal" role="dialog" aria-label="Corregir dato" onclick="event.stopPropagation()">' +
          '<div class="modal-header"><h3 class="modal-title">Corregir dato</h3>' +
            '<button class="btn-icon" data-cor="cancel" aria-label="Cerrar"><iconify-icon icon="iconoir:xmark" width="18"></iconify-icon></button></div>' +
          '<div class="modal-body">' +
            '<div class="form-group" style="margin-bottom:var(--space-5)"><label class="form-label">Campo a corregir</label>' +
              '<select class="select select-sm" id="cpv-cor-campo">' +
                fields.map((f) => '<option value="' + f.campo + '"' + (f.campo === campo ? ' selected' : '') + '>' + enc(f.label) + '</option>').join('') +
              '</select></div>' +
            '<div class="cpv-cor-readonly">' +
              '<div class="cpv-cor-ro-row"><span class="cpv-cor-ro-label">Tabla origen</span><span class="cpv-cor-ro-val mono">' + enc(tabla) + '</span></div>' +
              '<div class="cpv-cor-ro-row"><span class="cpv-cor-ro-label">Campo</span><span class="cpv-cor-ro-val mono" id="cpv-cor-campo-lbl">' + enc(campo) + '</span></div>' +
              '<div class="cpv-cor-ro-row"><span class="cpv-cor-ro-label">Valor original</span><span class="cpv-cor-ro-val" id="cpv-cor-orig">' + enc(origValue(tabla, campo) || '(vacío)') + '</span></div>' +
            '</div>' +
            '<div class="form-group" style="margin-bottom:var(--space-5)"><label class="form-label">Nuevo valor</label>' +
              '<input class="input input-sm" id="cpv-cor-nuevo" type="text" value="' + enc(currentValue(tabla, campo)) + '"></div>' +
            '<div class="form-group"><label class="form-label">Motivo (opcional)</label>' +
              '<input class="input input-sm" id="cpv-cor-motivo" type="text" placeholder="p. ej. Formato corregido manualmente"></div>' +
            '<div class="cpv-cor-note"><iconify-icon icon="iconoir:lock" width="14"></iconify-icon>' +
              '<span>Este cambio se registra en <b>opticas_overrides</b> y queda auditado. Se aplica encima del dato original sin sobrescribirlo.</span></div>' +
          '</div>' +
          '<div class="modal-footer"><button class="btn btn-ghost btn-sm" data-cor="cancel">Cancelar</button>' +
            '<button class="btn btn-primary btn-sm" data-cor="save"><iconify-icon icon="iconoir:check" width="13"></iconify-icon>Guardar override</button></div>' +
        '</div></div>';

    const sel = _modal.querySelector('#cpv-cor-campo');
    sel.addEventListener('change', () => {
      const c = sel.value;
      _modal.querySelector('#cpv-cor-campo-lbl').textContent = c;
      _modal.querySelector('#cpv-cor-orig').textContent = origValue(tabla, c) || '(vacío)';
      _modal.querySelector('#cpv-cor-nuevo').value = currentValue(tabla, c);
    });
    _modal.onclick = (e) => {
      if (e.target.closest('[data-cor="cancel"]')) { closeModal(); return; }
      if (e.target.closest('[data-cor="save"]')) {
        const c = sel.value;
        const nuevo = (_modal.querySelector('#cpv-cor-nuevo').value || '').trim();
        closeModal();
        toast('success', 'Override registrado', c + ' → “' + (nuevo || '(vacío)') + '”. Registrado en opticas_overrides.');
      }
    };
    const inp = _modal.querySelector('#cpv-cor-nuevo');
    if (inp) inp.focus();
  }
  function closeModal() { if (_modal) _modal.innerHTML = ''; }

  /* ════ rol: re-render al cambiar admin/user con drawer abierto ════ */
  function attachRoleObserver() {
    if (_roleObs) return;
    _roleObs = new MutationObserver(() => { if (_root && _pid) renderParts(); });
    _roleObs.observe(document.body, { attributes: true, attributeFilter: ['data-role'] });
  }

  /* ════ teclado + hashchange + deep-link ════ */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (_modal && _modal.innerHTML) { closeModal(); return; }
    if (_root && _pid) close();
  });

  // Captura global de botones "Ver detalle completo" (popup mapa V3, etc.)
  document.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-action="open-detalle"][data-place-id]');
    if (b) { e.preventDefault(); open(b.getAttribute('data-place-id')); }
  });

  // Cambios de hash: si desaparece ?optica= o cambia la ruta base, cierra
  window.addEventListener('hashchange', () => {
    const opt = readOpticaParam();
    if (!_pid) { if (opt) open(opt); return; }
    if (!opt) { _root.innerHTML = ''; _pid = null; closeModal(); }
    else if (opt !== _pid) open(opt);
  });

  function initDeepLink() {
    const opt = readOpticaParam();
    if (opt) open(opt);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeepLink);
  } else {
    initDeepLink();
  }

  /* ════ API pública ════ */
  window.cpvDrawer = { open: open, close: close };
})();
