/* ════════════════════════════════════════════════════════════════
   views/sg-patterns.js  ·  Pattern by View
   Componentes del catálogo usados en contexto de vista, con las
   variantes de DATOS que cambian el significado.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var SG = window.cpvSG;
  var enc = SG.enc;
  var stage = SG.stage, block = SG.block;

  /* lista de variantes a documentar */
  function variantList(items) {
    return '<ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:var(--space-3)">' +
      items.map(function (it) {
        return '<li style="display:flex;gap:var(--space-3);align-items:flex-start">' +
          '<iconify-icon icon="iconoir:arrow-right" width="14" style="color:var(--accent-ink-deep);margin-top:3px;flex-shrink:0"></iconify-icon>' +
          '<span class="body-sm" style="color:var(--ink-2)"><b style="color:var(--ink)">' + enc(it[0]) + '</b>' + (it[1] ? ' — ' + enc(it[1]) : '') + '</span></li>';
      }).join('') + '</ul>';
  }

  /* mini KPI para previews */
  function miniKpi(label, value, delta, type) {
    return '<div class="card card-compact" style="margin:0;min-width:120px"><div class="eyebrow-t">' + enc(label) + '</div>' +
      '<div class="kpi-value-md" style="margin-top:6px">' + enc(value) + '</div>' +
      (delta ? '<div class="kpi-delta ' + type + '" style="margin-top:4px"><iconify-icon icon="iconoir:' + (type === 'pos' ? 'arrow-up' : 'arrow-down') + '" width="11"></iconify-icon>' + enc(delta) + '</div>' : '') + '</div>';
  }

  /* ── RESUMEN ─────────────────────────────────────────────── */
  function resumenDetail() {
    return block('KPIs del resumen', 'el delta cambia el significado de la misma card',
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:var(--space-4)">' +
        stage('Delta positivo', miniKpi('Partners', '3.142', '+12.4%', 'pos'), true) +
        stage('Delta negativo', miniKpi('Sin web', '1.087', '−3.1%', 'neg'), true) +
        stage('Primera sync (sin delta)', miniKpi('Ópticas', '18.234', '', ''), true) +
        stage('Valoración con estrella', miniKpi('Valoración', '4.4★', '', ''), true) +
        stage('Reseñas compacto', miniKpi('Reseñas', '1,2M', '', ''), true) +
      '</div>') +
      block('Empty state', 'cuando la BBDD está vacía',
        stage('', '<div class="card" style="margin:0"><div class="empty-state" style="min-height:160px"><iconify-icon class="empty-state-icon" icon="iconoir:database" width="30"></iconify-icon><h2 class="state-title">Sin datos iniciales</h2><p class="state-body">Lanza la primera sincronización para poblar el resumen.</p></div></div>', true));
  }
  function resumenPreview() {
    return '<div style="display:flex;gap:10px">' + miniKpi('Partners', '3.142', '+12.4%', 'pos') + miniKpi('Sin web', '1.087', '−3.1%', 'neg') + '</div>';
  }

  /* ── BUSINESS INTELLIGENCE ───────────────────────────────── */
  function biDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Anchor nav', 'estado normal vs sticky al hacer scroll'],
        ['Cuadrante', 'datos solo partners / solo otras / ambos'],
        ['Oportunidad alta vs baja', 'la barra de progreso cambia de color y largo'],
      ]), true)) +
      block('Anchor nav', 'normal / sticky',
        stage('', '<div class="sg-anchor"><a class="sg-anchor-item active">Resumen</a><a class="sg-anchor-item">Cuadrante</a><a class="sg-anchor-item">Oportunidad</a><a class="sg-anchor-item">Ranking</a></div>')) +
      block('Oportunidad (score bar)', 'alta vs baja',
        stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' +
          '<div style="display:flex;align-items:center;gap:12px"><span class="label-md" style="width:80px">Alta</span><div class="sg-bar" style="flex:1;max-width:240px"><span style="width:88%"></span></div></div>' +
          '<div style="display:flex;align-items:center;gap:12px"><span class="label-md" style="width:80px">Baja</span><div class="sg-bar is-neg" style="flex:1;max-width:240px"><span style="width:22%"></span></div></div>' + '</div>'));
  }
  function biPreview() {
    return '<div style="width:220px;display:flex;flex-direction:column;gap:10px"><div class="sg-anchor" style="font-size:11px"><span class="sg-anchor-item active" style="padding:4px 8px">Cuadrante</span><span class="sg-anchor-item" style="padding:4px 8px">Ranking</span></div><div class="sg-bar"><span style="width:72%"></span></div></div>';
  }

  /* ── MAPA ────────────────────────────────────────────────── */
  function mapaDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Sin resultados', 'con filtros activos (no es BBDD vacía)'],
        ['Marcador', 'seleccionado vs no seleccionado'],
        ['Popup', 'sin datos de contacto'],
      ]), true)) +
      block('Marcadores', 'no seleccionado vs seleccionado',
        stage('', '<div style="display:flex;gap:40px;align-items:center;padding:12px 8px"><div style="display:flex;flex-direction:column;align-items:center;gap:12px"><span class="sg-marker partner"></span><span class="sg-sample-cap">normal</span></div><div style="display:flex;flex-direction:column;align-items:center;gap:12px"><span class="sg-marker new"></span><span class="sg-sample-cap">seleccionado</span></div></div>')) +
      block('Sin resultados con filtros', '',
        stage('', '<div class="card" style="margin:0"><div class="empty-state" style="min-height:150px"><iconify-icon class="empty-state-icon" icon="iconoir:map-pin" width="28"></iconify-icon><h2 class="state-title">Sin ópticas en el área</h2><p class="state-body">Ninguna óptica coincide con los filtros activos.</p><button class="btn btn-ghost btn-sm">Limpiar filtros</button></div></div>', true));
  }
  function mapaPreview() {
    return '<div style="display:flex;gap:20px;align-items:center"><span class="sg-marker partner"></span><span class="sg-marker other"></span><span class="sg-marker new"></span></div>';
  }

  /* ── BASE DE DATOS ───────────────────────────────────────── */
  function bbddDetail() {
    function chip(label) { return '<div data-chip style="display:inline-flex;align-items:center;gap:4px;padding:4px 8px 4px 12px;background:var(--accent-soft);color:var(--accent-ink-deep);border-radius:var(--radius-full);font-size:12px;font-weight:500;border:1px solid rgba(197,232,23,.4)">' + enc(label) + '<button data-chip-rm style="background:none;border:none;cursor:pointer;padding:0;display:flex;color:inherit;opacity:.65"><iconify-icon icon="iconoir:xmark" width="12"></iconify-icon></button></div>'; }
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Fila con badge Cliente + ícono override', 'dato corregido manualmente'],
        ['Fila solo Google sin badge', 'óptica de mercado, no cliente'],
        ['Filtros', '0 activos / 3 activos / todos limpiados'],
        ['Exportar', 'con filtros vs sin filtros'],
      ]), true)) +
      block('Filtros activos', '3 activos · clic en × para limpiar',
        stage('', '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">' + chip('Madrid') + chip('Solo clientes') + chip('Rating ≥ 4.0') + '<button class="btn btn-ghost btn-sm">Limpiar todo</button><div style="flex:1"></div><button class="btn btn-ghost btn-sm"><iconify-icon icon="iconoir:download" width="13"></iconify-icon>Exportar (con filtros)</button></div>'));
  }
  function bbddPreview() {
    return '<div style="width:220px;display:flex;flex-wrap:wrap;gap:6px"><span class="pill pill-accent pill-sm">Madrid</span><span class="pill pill-accent pill-sm">Clientes</span><span class="pill pill-pos pill-sm">Cliente</span></div>';
  }

  /* ── DETALLE (Drawer V5) ─────────────────────────────────── */
  function detalleDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Tab CPV en óptica no cliente', 'empty state dentro del tab'],
        ['Campo con badge "Corregido manualmente"', 'override visible'],
        ['Campo editable en hover', 'lápiz visible al pasar el cursor'],
        ['Pestaña Cambios', 'sin overrides / con 2 overrides (badge contador)'],
      ]), true)) +
      block('Campo con override', 'badge + meta de origen',
        stage('', '<div class="override-wrap"><div class="override-row"><span class="data-value">+34 91 234 56 78</span><span class="pill pill-accent pill-sm">Corregido manualmente</span><iconify-icon icon="iconoir:edit-pencil" width="13" style="color:var(--muted-2)"></iconify-icon></div><div class="override-meta">antes: +34 91 000 00 00 · Ana S. · hace 3 días</div></div>')) +
      block('Tab Cambios', 'badge contador en la pestaña',
        stage('', '<nav class="tabs-list" style="margin:0"><button class="tab-trigger">Resumen</button><button class="tab-trigger active">Cambios <span class="pill pill-neutral pill-sm" style="margin-left:4px">2</span></button></nav>')) +

      /* ── Contenido real de los 5 tabs ── */
      block('Contenido de los 5 tabs', 'estado real de cada pestaña del drawer',
        '<nav class="tabs-list" style="margin:0 0 var(--space-5)">' +
          '<button class="tab-trigger active" style="cursor:default">Resumen</button>' +
          '<button class="tab-trigger" style="cursor:default">Google Maps</button>' +
          '<button class="tab-trigger" style="cursor:default">CooperVision</button>' +
          '<button class="tab-trigger" style="cursor:default">App Data</button>' +
          '<button class="tab-trigger" style="cursor:default">Cambios <span class="pill pill-neutral pill-sm" style="margin-left:4px">2</span></button>' +
        '</nav>' +
        '<div class="sg-cols">' +
          stage('Tab Resumen', dPairs([
            ['Dirección', 'Calle Mayor 24, Madrid'],
            ['Rating', '★ 4.8'],
            ['Valoración', '324 reseñas'],
            ['Web', 'opticasancarlos.es'],
            ['Teléfono', '+34 91 234 56 78'],
          ])) +
          stage('Tab Google Maps · fuente Outscraper', dPairs([
            ['place_id', 'ChIJ_madrid_001'],
            ['Nombre', 'Óptica San Carlos'],
            ['Dirección', 'Calle Mayor 24, 28013 Madrid'],
            ['Teléfono', '+34 91 234 56 78'],
            ['Web', 'opticasancarlos.es'],
            ['Rating', '★ 4.8 · 324 reseñas'],
            ['Categoría', 'Óptica'],
            ['Horario', 'L–V 10:00–20:00'],
          ], true)) +
          stage('Tab CooperVision · óptica no cliente', '<div class="empty-state" style="min-height:180px"><iconify-icon class="empty-state-icon" icon="iconoir:database" width="28"></iconify-icon><h2 class="state-title" style="font-size:15px">Esta óptica no está en el maestro CooperVision</h2></div>') +
          stage('Tab App Data · campos gestionables', '<div class="form-group" style="margin-bottom:var(--space-5)"><label class="form-label">Notas internas</label><textarea class="textarea" rows="3">Cliente prioritario — visitado en Q1.</textarea></div>' + toggleField('show_campañas', true, 'Mostrar en campañas')) +
          stage('Tab Cambios · con registros', changeRows(2)) +
        '</div>') +

      block('Tab Cambios · estado vacío', 'sin overrides aplicados',
        stage('', '<div class="empty-state" style="min-height:150px"><iconify-icon class="empty-state-icon" icon="iconoir:edit-pencil" width="26"></iconify-icon><h2 class="state-title" style="font-size:15px">Sin modificaciones registradas</h2></div>', true)) +

      block('Tab CooperVision · óptica cliente (con datos)', 'campos del maestro de Salesforce — el caso más frecuente',
        stage('', '<div style="max-width:360px">' + dPairs([
          ['CODIGO', 'CPV-08234'],
          ['GRUPO', 'Visionlab'],
          ['DP', '28013'],
          ['COM', 'Madrid'],
          ['TIPOLOGIA', 'Óptica independiente'],
          ['SEGMENTACION', 'Premium'],
        ]) + '</div>', true)) +

      /* ── Campo editable en hover ── */
      block('Campo editable en hover', 'lápiz a la derecha al pasar el cursor — invitación a editar, distinto del campo ya corregido',
        '<div class="sg-cols">' +
          stage('Hover (lápiz visible)', editField('Teléfono', '+34 91 234 56 78', true)) +
          stage('Reposo (sin lápiz) — pasa el cursor', editField('Teléfono', '+34 91 234 56 78', false)) +
        '</div>') +

      /* ── Loading del drawer ── */
      block('Loading del drawer', 'header ya resuelto (nombre + place_id), cuerpo con skeletons',
        stage('', '<div style="max-width:360px;border:1px solid var(--line-2);border-radius:var(--radius-lg);overflow:hidden">' +
          '<div style="padding:var(--space-5);border-bottom:1px solid var(--line-2)"><div class="eyebrow-t">Óptica · ChIJ_madrid_001</div><h3 class="drawer-title" style="margin-top:4px">Óptica San Carlos</h3></div>' +
          '<div style="padding:var(--space-5);display:flex;flex-direction:column;gap:14px">' +
            Array(5).fill(0).map(function () { return '<div style="display:flex;justify-content:space-between;gap:20px"><span class="skeleton sk-text-sm" style="width:32%"></span><span class="skeleton sk-text-sm" style="width:48%"></span></div>'; }).join('') +
          '</div></div>', true));
  }
  function dPairs(rows, mono) {
    return '<div style="display:flex;flex-direction:column;gap:10px">' +
      rows.map(function (r) {
        return '<div class="data-pair"><span class="data-label">' + enc(r[0]) + '</span><span class="data-value"' + (mono && r[0] === 'place_id' ? ' style="font-family:var(--font-mono);font-size:12px"' : '') + '>' + enc(r[1]) + '</span></div>';
      }).join('') + '</div>';
  }
  function toggleField(name, on, label) {
    return '<label class="toggle-label"><input type="checkbox"' + (on ? ' checked' : '') + '><span class="toggle-track"></span><span class="toggle-text">' + enc(label) + '</span></label>';
  }
  function editField(label, val, shown) {
    return '<div class="sg-editfield' + (shown ? ' is-shown' : '') + '">' +
      '<div style="display:flex;flex-direction:column;gap:2px"><span class="data-label">' + enc(label) + '</span><span class="data-value">' + enc(val) + '</span></div>' +
      '<iconify-icon class="sg-edit-pencil" icon="iconoir:edit-pencil" width="15"></iconify-icon></div>';
  }
  function changeRows(n) {
    var rows = [
      ['Teléfono', '+34 91 000 00 00', '+34 91 234 56 78', 'Ana S.', 'hace 3 días'],
      ['Web', '—', 'opticasancarlos.es', 'Luis V.', 'hace 8 días'],
    ].slice(0, n);
    return '<div style="display:flex;flex-direction:column;gap:10px">' +
      rows.map(function (r) {
        return '<div class="override-wrap"><div class="override-row"><span class="body-sm" style="font-weight:600">' + enc(r[0]) + '</span><span class="pill pill-accent pill-sm">Corregido</span></div>' +
          '<div class="override-meta">' + enc(r[1]) + ' → <b>' + enc(r[2]) + '</b> · ' + enc(r[3]) + ' · ' + enc(r[4]) + '</div></div>';
      }).join('') + '</div>';
  }
  function detallePreview() {
    return '<div style="width:230px"><div class="override-row" style="margin-bottom:6px"><span class="body-sm" style="font-weight:500">Teléfono</span><span class="pill pill-accent pill-sm">Corregido</span></div><div class="body-xs c-muted">↳ Ana S. · hace 3 días</div></div>';
  }

  /* ── REVISIÓN (A3) ───────────────────────────────────────── */
  function revisionDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Focus card · conflicto con 1 candidato', ''],
        ['Focus card · múltiples candidatos', ''],
        ['Solo CPV', 'sin match de Google'],
        ['No encontrado', 'sin candidatos'],
        ['Bandeja vacía', 'todo revisado'],
      ]), true)) +
      block('Focus card (accent)', 'conflicto con candidato',
        stage('', '<div class="card card-accent" style="margin:0;max-width:420px"><div class="card-head"><div><div class="eyebrow-t">Conflicto · 1 candidato</div><h3 class="display-md" style="margin-top:4px">Óptica Central</h3></div><span class="pill pill-warn"><span class="pill-dot"></span>Revisar</span></div><div class="data-pair" style="margin-bottom:10px"><span class="data-label">CPV</span><span class="data-value">Calle Sol 4</span></div><div class="data-pair"><span class="data-label">Google</span><span class="data-value">Calle del Sol 4, Madrid</span></div><div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-primary btn-sm">Vincular</button><button class="btn btn-ghost btn-sm">Descartar</button></div></div>')) +

      /* ── Múltiples candidatos ── */
      block('Múltiples candidatos', 'lista de candidatos seleccionable · acción "Vincular seleccionado"',
        stage('', '<div class="card card-accent" style="margin:0;max-width:460px">' +
          '<div class="card-head"><div><div class="eyebrow-t">Conflicto · 3 candidatos</div><h3 class="display-md" style="margin-top:4px">Óptica Visión Plus</h3></div><span class="pill pill-warn"><span class="pill-dot"></span>Revisar</span></div>' +
          '<div class="data-pair" style="margin-bottom:14px"><span class="data-label">CPV</span><span class="data-value">Av. Diagonal 401, Barcelona</span></div>' +
          '<div class="sg-mini-label">Candidatos de Google Maps</div>' +
          '<div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">' +
            candRow('Visión Plus Diagonal', 'Av. Diagonal 401', '0.92', true) +
            candRow('Òptica Visió+', 'Diagonal 399', '0.78', false) +
            candRow('Centre Òptic Diagonal', 'Av. Diagonal 405', '0.64', false) +
          '</div>' +
          '<div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-primary btn-sm">Vincular seleccionado</button><button class="btn btn-ghost btn-sm">Ninguno coincide</button></div></div>')) +

      /* ── Solo CPV ── */
      block('Solo CPV', 'existe en el maestro CooperVision pero sin match en Google',
        stage('', '<div class="card" style="margin:0;max-width:420px">' +
          '<div class="card-head"><div><div class="eyebrow-t">Solo CPV · sin match</div><h3 class="display-md" style="margin-top:4px">Óptica Levante</h3></div><span class="pill pill-neutral"><span class="pill-dot"></span>Sin Google</span></div>' +
          '<div class="data-pair" style="margin-bottom:10px"><span class="data-label">CPV</span><span class="data-value">Calle del Mar 12, Valencia</span></div>' +
          '<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--line-2);border-radius:var(--radius-md);font-size:13px;color:var(--ink-2);margin-bottom:4px"><iconify-icon icon="iconoir:search" width="15" style="color:var(--muted)"></iconify-icon>No se encontró ningún registro coincidente en Google Maps.</div>' +
          '<div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-ghost btn-sm">Marcar como no encontrado</button><button class="btn btn-subtle btn-sm">Buscar manualmente</button></div></div>')) +

      /* ── No encontrado ── */
      block('No encontrado', 'óptica marcada previamente como no encontrada',
        stage('', '<div class="card" style="margin:0;max-width:420px;opacity:.85">' +
          '<div class="card-head"><div><div class="eyebrow-t">No encontrado</div><h3 class="display-md" style="margin-top:4px">Óptica del Puerto</h3></div><span class="pill pill-neg"><span class="pill-dot"></span>No encontrada</span></div>' +
          '<div class="data-pair" style="margin-bottom:10px"><span class="data-label">CPV</span><span class="data-value">Muelle 3, Cádiz</span></div>' +
          '<div class="override-meta" style="margin-bottom:4px">Marcada por Ana S. · hace 5 días</div>' +
          '<div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-subtle btn-sm">Reabrir revisión</button><button class="btn btn-ghost btn-sm">Buscar manualmente</button></div></div>')) +

      /* ── Bandeja vacía ── */
      block('Bandeja vacía', 'todos los pendientes procesados — sin contador',
        stage('', '<div class="card" style="margin:0"><div class="empty-state" style="min-height:200px"><iconify-icon class="empty-state-icon" icon="iconoir:check-circle" width="32" style="color:var(--pos-ink)"></iconify-icon><h2 class="state-title">¡Todo revisado!</h2><p class="state-body">No quedan conflictos pendientes en la bandeja. Buen trabajo.</p></div></div>', true));
  }
  function candRow(name, addr, score, sel) {
    return '<label class="radio-wrap" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid ' + (sel ? 'var(--accent)' : 'var(--line-2)') + ';border-radius:var(--radius-md);background:' + (sel ? 'var(--accent-soft)' : 'var(--card)') + ';cursor:default">' +
      '<input class="radio" type="radio" name="sg-cand"' + (sel ? ' checked' : '') + '>' +
      '<div style="flex:1"><div class="body-sm" style="font-weight:600">' + enc(name) + '</div><div class="body-xs c-muted">' + enc(addr) + '</div></div>' +
      '<span class="pill ' + (parseFloat(score) >= 0.85 ? 'pill-pos' : 'pill-neutral') + ' pill-sm">' + enc(score) + '</span></label>';
  }
  function revisionPreview() {
    return '<div class="card card-accent" style="margin:0;width:200px;padding:14px"><div class="eyebrow-t">Conflicto</div><div class="display-md" style="font-size:15px;margin-top:4px">Óptica Central</div><span class="pill pill-warn pill-sm" style="margin-top:8px"><span class="pill-dot"></span>Revisar</span></div>';
  }

  /* ── CHANGELOG ───────────────────────────────────────────── */
  function changelogRow(type, ultra) {
    var map = {
      override: ['edit-pencil', 'Override', 'pill-accent', 'Teléfono corregido'],
      sync: ['refresh-double', 'Sync', 'pill-neutral', 'Sincronización Outscraper'],
      vinculo: ['network-left', 'Vínculo', 'pill-pos', 'Óptica vinculada a CPV'],
    };
    var m = map[type];
    return '<tr><td class="mono-sm c-muted">14:0' + (type === 'sync' ? '2' : type === 'override' ? '7' : '9') + '</td>' +
      '<td><span class="pill ' + m[2] + ' pill-sm"><iconify-icon icon="iconoir:' + m[0] + '" width="10"></iconify-icon>' + m[1] + '</span></td>' +
      '<td>' + m[3] + '</td><td class="c-muted">Ana S.</td></tr>';
  }
  function changelogDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Fila tipo override', 'corrección manual'],
        ['Fila tipo sync', 'sincronización automática'],
        ['Fila tipo vínculo', 'óptica vinculada a CPV'],
        ['Con filtro de óptica activo', 'chip de filtro visible'],
      ]), true)) +
      block('Tabla ultra (32px) con tipos', '',
        stage('', '<div style="display:flex;gap:8px;margin-bottom:12px"><span style="display:inline-flex;align-items:center;gap:4px;padding:4px 8px 4px 12px;background:var(--accent-soft);color:var(--accent-ink-deep);border-radius:var(--radius-full);font-size:12px;font-weight:500;border:1px solid rgba(197,232,23,.4)">Óptica San Carlos<iconify-icon icon="iconoir:xmark" width="12"></iconify-icon></span></div>' +
          '<div class="table-wrap"><table class="table-dense table-ultra"><thead><tr><th style="width:70px">Hora</th><th style="width:110px">Tipo</th><th>Detalle</th><th style="width:90px">Usuario</th></tr></thead><tbody>' +
          changelogRow('override') + changelogRow('sync') + changelogRow('vinculo') + '</tbody></table></div>', true));
  }
  function changelogPreview() {
    return '<div style="width:220px;display:flex;flex-direction:column;gap:8px"><span class="pill pill-accent pill-sm"><iconify-icon icon="iconoir:edit-pencil" width="10"></iconify-icon>Override</span><span class="pill pill-neutral pill-sm"><iconify-icon icon="iconoir:refresh-double" width="10"></iconify-icon>Sync</span><span class="pill pill-pos pill-sm"><iconify-icon icon="iconoir:network-left" width="10"></iconify-icon>Vínculo</span></div>';
  }

  /* ── USUARIOS (A1) ───────────────────────────────────────── */
  function userRow(role, active) {
    return '<tr><td>' + (role === 'admin' ? 'Ana Soto' : 'Luis Vega') + '</td>' +
      '<td class="c-muted">' + (role === 'admin' ? 'ana@coopervision.es' : 'luis@coopervision.es') + '</td>' +
      '<td>' + (role === 'admin' ? '<span class="pill pill-accent pill-sm">Admin</span>' : '<span class="pill pill-neutral pill-sm">User</span>') + '</td>' +
      '<td>' + (active ? '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Activo</span>' : '<span class="pill pill-paused pill-sm"><span class="pill-dot"></span>Inactivo</span>') + '</td></tr>';
  }
  function usuariosDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Fila usuario activo · admin', ''],
        ['Fila usuario activo · user', ''],
        ['Fila usuario inactivo', ''],
      ]), true)) +
      block('Tabla de usuarios', 'rol × estado',
        stage('', '<div class="table-wrap"><table class="table-dense"><thead><tr><th>Nombre</th><th>Email</th><th style="width:90px">Rol</th><th style="width:100px">Estado</th></tr></thead><tbody>' +
          userRow('admin', true) + userRow('user', true) + userRow('user', false) + '</tbody></table></div>', true)) +
      block('Menú contextual de fila', 'el label de la 4ª opción es dinámico según el estado del usuario',
        '<div class="sg-cols">' +
          stage('Usuario activo → "Desactivar"', '<div style="padding:8px 0">' + usrMenu(true) + '</div>') +
          stage('Usuario inactivo → "Reactivar"', '<div style="padding:8px 0">' + usrMenu(false) + '</div>') +
        '</div>') +
      block('Modal "Nuevo usuario"', 'nombre · email · selector de rol (radio) · aviso de email con contraseña temporal',
        stage('', '<div style="max-width:440px">' + usrNewModal() + '</div>'));
  }
  function usrMenu(activo) {
    return '<div class="cpv-row-menu open" style="position:static;display:inline-block;min-width:208px;opacity:1;pointer-events:auto;transform:none;box-shadow:var(--shadow-e2)">' +
      '<button class="dropdown-item"><iconify-icon icon="iconoir:edit-pencil" width="16"></iconify-icon>Editar</button>' +
      '<button class="dropdown-item"><iconify-icon icon="iconoir:user-badge-check" width="16"></iconify-icon>Cambiar rol</button>' +
      '<button class="dropdown-item"><iconify-icon icon="iconoir:lock" width="16"></iconify-icon>Resetear contraseña</button>' +
      '<button class="dropdown-item"><iconify-icon icon="iconoir:' + (activo ? 'user-xmark' : 'user') + '" width="16"></iconify-icon>' + (activo ? 'Desactivar' : 'Reactivar') + '</button>' +
      '<div class="dropdown-divider"></div>' +
      '<button class="dropdown-item danger"><iconify-icon icon="iconoir:trash" width="16"></iconify-icon>Eliminar</button></div>';
  }
  function usrNewModal() {
    return '<div class="modal" style="box-shadow:none;max-width:none;margin:0">' +
      '<div class="modal-header"><h2 class="modal-title">Nuevo usuario</h2><button class="btn-icon btn-lg" style="cursor:default"><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
      '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' +
        '<div class="form-group"><label class="form-label">Nombre completo</label><input class="input" type="text" placeholder="Nombre Apellido"></div>' +
        '<div class="form-group"><label class="form-label">Email</label><input class="input" type="email" placeholder="nombre@coopervision.es"></div>' +
        '<div class="form-group"><label class="form-label">Rol</label><div style="display:flex;flex-direction:column;gap:var(--space-3);margin-top:4px">' +
          '<label class="radio-wrap"><input class="radio" type="radio" name="sg-newrol" checked><span class="toggle-text">Usuario — solo lectura</span></label>' +
          '<label class="radio-wrap"><input class="radio" type="radio" name="sg-newrol"><span class="toggle-text">Administrador — acceso total</span></label>' +
        '</div></div>' +
        '<p class="form-hint" style="display:flex;align-items:center;gap:5px;margin:0"><iconify-icon icon="iconoir:mail" width="13" style="color:var(--muted)"></iconify-icon>Se enviará un email con contraseña temporal.</p>' +
      '</div>' +
      '<div class="modal-footer"><button class="btn btn-ghost btn-sm">Cancelar</button><button class="btn btn-primary btn-sm"><iconify-icon icon="iconoir:check" width="14"></iconify-icon>Crear usuario</button></div></div>';
  }
  function usuariosPreview() {
    return '<div style="width:220px;display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between"><span class="body-sm">Ana Soto</span><span class="pill pill-accent pill-sm">Admin</span></div><div style="display:flex;justify-content:space-between"><span class="body-sm">Luis Vega</span><span class="pill pill-paused pill-sm">Inactivo</span></div></div>';
  }

  /* ── OPERACIONES (A2) ────────────────────────────────────── */
  function opsCard(title, src, opts) {
    opts = opts || {};
    var pill = opts.estado === 'curso'
      ? '<span class="pill pill-warn pill-sm"><span class="pill-dot"></span>En curso</span>'
      : opts.estado === 'error'
      ? '<span class="pill pill-neg pill-sm"><span class="pill-dot"></span>Error</span>'
      : '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Completada</span>';
    var head = '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">' +
      '<div><div style="font-family:var(--font-display);font-size:15px;font-weight:700">' + enc(title) + '</div>' +
      '<div style="font-size:11px;color:var(--muted);margin-top:2px;display:flex;align-items:center;gap:5px"><iconify-icon icon="iconoir:arrow-right" width="11"></iconify-icon><code style="font-family:var(--font-mono);background:var(--line-2);padding:1px 6px;border-radius:var(--radius-sm)">' + enc(src) + '</code></div></div>' +
      '<span>' + pill + '</span></div>';
    var stats = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">' +
      '<div class="data-pair"><span class="data-label">Última sync</span><span class="data-value tnum">12/06 02:14</span></div>' +
      '<div class="data-pair"><span class="data-label">Duración</span><span class="data-value">2h 41min</span></div>' +
      '<div class="data-pair" style="grid-column:span 2"><span class="data-label">Cambios</span><span class="data-value" style="display:flex;gap:10px;flex-wrap:wrap"><span style="color:var(--pos-ink);font-weight:600">+127 nuevos</span><span style="color:var(--warn-ink);font-weight:600">⚠ 23 conflictos</span></span></div></div>';
    var foot;
    if (opts.estado === 'curso') {
      foot = '<div style="display:flex;align-items:center;gap:12px;padding:4px 0"><span class="cpv-spin-icon" style="color:var(--warn-ink);font-size:0"><iconify-icon icon="iconoir:refresh-double" width="24"></iconify-icon></span><div><div style="font-weight:600;font-size:13px">Sincronización en curso…</div><div class="body-xs c-muted">Puede tardar entre 30 min y varias horas.</div></div></div>' +
        '<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center" disabled><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>En curso…</button>';
    } else if (opts.estado === 'completado') {
      foot = '<div style="background:var(--warn-bg);color:var(--warn-ink);border-radius:var(--radius-md);padding:10px 12px;font-size:12px;display:flex;align-items:center;gap:8px"><iconify-icon icon="iconoir:warning-triangle" width="14"></iconify-icon><span>23 conflictos detectados — <b>Revisar en A3 →</b></span></div>' +
        '<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Sincronizar ahora</button>';
    } else if (opts.estado === 'error') {
      foot = '<div style="background:var(--neg-soft);color:var(--neg-ink);border-radius:var(--radius-md);padding:10px 12px;font-size:12px;display:flex;align-items:flex-start;gap:8px"><iconify-icon icon="iconoir:warning-triangle" width="14" style="margin-top:1px;flex-shrink:0"></iconify-icon><span><b>Error en la sincronización.</b> No se pudo conectar con la fuente. Los datos no se actualizaron.</span></div>' +
        '<button class="btn btn-primary btn-sm" style="width:100%;justify-content:center"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar sincronización</button>';
    } else {
      foot = '<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Sincronizar ahora</button>';
    }
    return '<div class="card" style="margin:0;display:flex;flex-direction:column;gap:var(--space-4)">' + head + stats + foot + '</div>';
  }
  function opsBanner() {
    return '<div style="display:flex;align-items:center;gap:14px;padding:10px 20px;background:var(--warn-bg);color:var(--warn-ink);border:1px solid rgba(146,64,14,.18);border-radius:var(--radius-lg);font-size:13px;font-weight:500">' +
      '<span class="cpv-spin-icon" style="font-size:0"><iconify-icon icon="iconoir:refresh-double" width="16"></iconify-icon></span>' +
      '<span><b>Sincronización en curso.</b> Los datos pueden no estar actualizados hasta que finalice.</span></div>';
  }
  function opsConfirmModal() {
    return '<div class="modal" style="box-shadow:none;max-width:none;margin:0">' +
      '<div class="modal-header"><h2 class="modal-title">¿Lanzar sincronización manual?</h2><button class="btn-icon btn-lg" style="cursor:default"><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
      '<p class="modal-body" style="margin:0">La sincronización con <b>Outscraper / Google Maps</b> se iniciará ahora. Puede tardar entre 30 min y varias horas. Los datos pueden no estar actualizados durante este período.</p>' +
      '<div class="modal-footer"><button class="btn btn-ghost btn-sm">Cancelar</button><button class="btn btn-primary btn-sm"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Iniciar sincronización</button></div></div>';
  }
  function opsDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Estado idle', 'cards de fuente con última sync + botón "Sincronizar ahora"'],
        ['Estado en curso', 'banner persistente + pill "En curso" + spinner, sin botón'],
        ['Estado completado', 'resumen de resultados + aviso con link a A3 si hay conflictos'],
        ['Estado error', 'pill rojo + aviso de error + botón "Reintentar"'],
        ['Modal de confirmación', 'título fijo, cuerpo según fuente, botón primary (no destructive)'],
      ]), true)) +
      block('Estado idle', 'dos cards de fuente de datos',
        stage('', '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5)">' +
          opsCard('Outscraper / Google Maps', 'opticas_google', {}) +
          opsCard('Salesforce / CooperVision', 'opticas_cpv', {}) + '</div>')) +
      block('Estado en curso', 'banner arriba + card de la fuente sincronizando',
        stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' + opsBanner() +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5)">' +
            opsCard('Outscraper / Google Maps', 'opticas_google', { estado: 'curso' }) +
            opsCard('Salesforce / CooperVision', 'opticas_cpv', {}) + '</div></div>')) +
      block('Estado completado', 'resumen + aviso con link a Revisión',
        stage('', '<div style="max-width:420px">' + opsCard('Outscraper / Google Maps', 'opticas_google', { estado: 'completado' }) + '</div>')) +
      block('Estado error', 'la sync falló — pill rojo, aviso de error y acción de reintentar',
        stage('', '<div style="max-width:420px">' + opsCard('Outscraper / Google Maps', 'opticas_google', { estado: 'error' }) + '</div>')) +
      block('Modal de confirmación', 'no destructive — el botón de acción es primary',
        stage('', '<div style="max-width:440px">' + opsConfirmModal() + '</div>'));
  }
  function opsPreview() {
    return '<div style="width:220px">' + opsCard('Outscraper', 'opticas_google', { estado: 'curso' }) + '</div>';
  }

  /* ── CADENAS (A4) ────────────────────────────────────────── */
  function cadFilterTabs() {
    return '<div class="cpv-filter-tabs"><button class="cpv-filter-tab active">Todas <span class="cpv-filter-tab-count">42</span></button><button class="cpv-filter-tab">España <span class="cpv-filter-tab-count">34</span></button><button class="cpv-filter-tab">Portugal <span class="cpv-filter-tab-count">8</span></button></div>';
  }
  function cadTable() {
    var rows = [
      ['Visionlab', 'visionlab, vision lab', 'ES'],
      ['Multiópticas', 'multiopticas', 'ES'],
      ['Alain Afflelou', 'afflelou', 'PT'],
    ];
    var body = rows.map(function (r) {
      return '<tr><td style="font-weight:600">' + enc(r[0]) + '</td><td class="body-xs c-ink2">' + enc(r[1]) + '</td><td>' +
        (r[2] === 'ES' ? '<span class="pill pill-accent pill-sm">ES</span>' : '<span class="pill pill-neutral pill-sm">PT</span>') +
        '</td><td class="cpv-bbdd-menu-col"><button class="cpv-bbdd-menu-btn"><iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button></td></tr>';
    }).join('');
    return '<div class="table-wrap"><table class="table-dense"><thead><tr><th style="width:180px">Nombre</th><th>Keywords</th><th style="width:70px">País</th><th class="cpv-bbdd-menu-col"></th></tr></thead><tbody>' + body + '</tbody></table></div>';
  }
  function cadDelModal() {
    return '<div class="modal" style="box-shadow:none;max-width:none;margin:0">' +
      '<div class="modal-header"><h2 class="modal-title">Eliminar cadena</h2><button class="btn-icon btn-lg" style="cursor:default"><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
      '<div class="modal-body" style="margin:0">¿Eliminar la cadena <b>Visionlab</b>?<br><span class="body-sm c-muted" style="display:block;margin-top:6px">Hay <b>214 ópticas</b> asociadas. Elige qué hacer con ellas.</span></div>' +
      '<div class="modal-footer"><button class="btn btn-ghost btn-sm">Cancelar</button>' +
      '<button class="btn btn-subtle btn-sm" style="margin-right:auto">Convertir en independientes</button>' +
      '<button class="btn btn-destructive btn-sm"><iconify-icon icon="iconoir:trash" width="14"></iconify-icon>Eliminar también las ópticas</button></div></div>';
  }
  function cadDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Filtro de país', 'tabs Todas / España / Portugal con contador'],
        ['Tabla', 'nombre · keywords · país (ES/PT) · columna de acciones ⋯'],
        ['Modal de edición', 'formulario nombre / keywords / dominios / país'],
        ['Modal de eliminación', 'bifurcación única — independientes vs eliminar ópticas'],
      ]), true)) +
      block('Barra de filtros + tabla', '',
        stage('', cadFilterTabs() + '<div style="height:12px"></div>' + cadTable(), true)) +
      block('Modal de eliminación', 'la bifurcación de ópticas asociadas es única en el producto',
        stage('', '<div style="max-width:520px">' + cadDelModal() + '</div>'));
  }
  function cadPreview() {
    return '<div style="width:220px">' + cadFilterTabs() + '</div>';
  }

  /* ── LOGS (A5) ───────────────────────────────────────────── */
  function logsFilterBar(custom) {
    var dates = custom
      ? '<div style="display:flex;gap:4px;align-items:center;margin-top:4px"><input type="date" class="input input-sm" style="width:120px;font-size:12px" value="2026-05-01"><span class="c-muted" style="font-size:11px">—</span><input type="date" class="input input-sm" style="width:120px;font-size:12px" value="2026-06-18"></div>'
      : '';
    return '<div style="display:flex;flex-wrap:wrap;gap:var(--space-4);align-items:flex-start">' +
      '<div style="display:flex;flex-direction:column;gap:4px"><span class="sg-mini-label" style="margin:0">Usuario</span><select class="select select-sm" style="width:150px"><option>Todos</option></select></div>' +
      '<div style="display:flex;flex-direction:column;gap:4px"><span class="sg-mini-label" style="margin:0">Acción</span><select class="select select-sm" style="width:150px"><option>Todas</option></select></div>' +
      '<div style="display:flex;flex-direction:column;gap:4px"><span class="sg-mini-label" style="margin:0">Fechas</span><select class="select select-sm" style="width:150px"><option' + (custom ? '' : ' selected') + '>Todas</option><option' + (custom ? ' selected' : '') + '>Personalizado</option></select>' + dates + '</div>' +
    '</div>';
  }
  var LOGS_PILLS = [
    ['Login', 'pill-neutral'], ['Descarga CSV', 'pill-accent'], ['Override creado', 'pill-warn'],
    ['Override revertido', 'pill-warn'], ['Vínculo creado', 'pill-pos'], ['Nuevo usuario', 'pill-accent'],
    ['Reset password', 'pill-warn'], ['Sync lanzada', 'pill-pos'], ['Cadena creada', 'pill-accent'],
    ['Config. modificada', 'pill-warn'],
  ];
  function logsPalette() {
    return '<div style="display:flex;flex-wrap:wrap;gap:10px">' +
      LOGS_PILLS.map(function (p) { return '<span class="pill ' + p[1] + ' pill-sm">' + enc(p[0]) + '</span>'; }).join('') + '</div>';
  }
  function logsDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Barra de filtros', 'usuario · tipo de acción · rango de fechas'],
        ['Selector de fechas "Personalizado"', 'revela dos campos desde/hasta — visibilidad condicional'],
        ['Paleta de pills de acción', 'más variantes que el componente Pill genérico'],
      ]), true)) +
      block('Barra de filtros', 'modo estándar (sin campos de fecha)',
        stage('Rango: Todas', logsFilterBar(false), true)) +
      block('Selector de fechas en "Personalizado"', 'aparecen dos campos desde/hasta',
        stage('Rango: Personalizado', logsFilterBar(true), true)) +
      block('Paleta de pills de tipo de acción', 'referencia rápida con el texto exacto de cada label',
        stage('', logsPalette()));
  }
  function logsPreview() {
    return '<div style="width:230px;display:flex;flex-wrap:wrap;gap:6px"><span class="pill pill-warn pill-sm">Override creado</span><span class="pill pill-pos pill-sm">Vínculo creado</span><span class="pill pill-accent pill-sm">Descarga CSV</span></div>';
  }

  /* ── MI PERFIL ───────────────────────────────────────────── */
  function perfilDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Datos personales', 'nombre editable · email no editable (disabled + hint)'],
        ['Cambio de contraseña', 'actual / nueva / confirmación con validación'],
        ['Estado de éxito', 'toast + campos de contraseña vuelven a vacío'],
      ]), true)) +
      block('Datos personales', 'el email es de solo lectura',
        stage('', '<div style="max-width:420px;display:flex;flex-direction:column;gap:var(--space-5)">' +
          '<div class="form-group"><label class="form-label">Nombre completo</label><input class="input" type="text" value="Ana Soto"></div>' +
          '<div class="form-group"><label class="form-label">Email</label><input class="input" type="email" value="ana@coopervision.es" disabled><span class="form-hint">El email no se puede modificar desde aquí. Contacta con el administrador.</span></div>' +
          '<div class="form-group"><label class="form-label">Rol</label><div style="margin-top:4px;display:flex;align-items:center;gap:8px"><span class="pill pill-accent pill-sm">Admin</span><span class="body-xs c-muted">Acceso total a todas las funciones.</span></div></div>' +
          '<div style="display:flex;justify-content:flex-end"><button class="btn btn-primary btn-sm"><iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar cambios</button></div>' +
        '</div>')) +
      block('Cambio de contraseña', 'actual · nueva · confirmación',
        '<div class="sg-cols">' +
          stage('Reposo', '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' +
            '<div class="form-group"><label class="form-label">Contraseña actual</label><input class="input" type="password" placeholder="••••••••"></div>' +
            '<div class="form-group"><label class="form-label">Nueva contraseña</label><input class="input" type="password" placeholder="Mínimo 8 caracteres"></div>' +
            '<div class="form-group"><label class="form-label">Confirmar nueva contraseña</label><input class="input" type="password" placeholder="Repite la contraseña"></div>' +
            '<div style="display:flex;justify-content:flex-end"><button class="btn btn-ghost btn-sm"><iconify-icon icon="iconoir:lock" width="14"></iconify-icon>Cambiar contraseña</button></div></div>') +
          stage('Error de validación (no coinciden)', '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' +
            '<div class="form-group"><label class="form-label">Contraseña actual</label><input class="input" type="password" value="oldpass"></div>' +
            '<div class="form-group"><label class="form-label">Nueva contraseña</label><input class="input" type="password" value="newpass1"></div>' +
            '<div class="form-group"><label class="form-label">Confirmar nueva contraseña</label><input class="input error" type="password" value="newpass2"><span class="form-error">Las contraseñas no coinciden.</span></div></div>') +
        '</div>') +
      block('Estado de éxito', 'tras guardar: toast de confirmación + los campos de contraseña se vacían',
        stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-5);max-width:420px">' +
          toastMini('success', 'check-circle', 'Contraseña cambiada', 'Tu contraseña se ha actualizado correctamente.') +
          '<div class="form-group"><label class="form-label">Nueva contraseña</label><input class="input" type="password" placeholder="Mínimo 8 caracteres"></div>' +
        '</div>', true));
  }
  function toastMini(type, icon, title, sub) {
    return '<div class="toast toast-' + type + '" style="position:static;margin:0;animation:none;max-width:360px"><span class="toast-icon ' + type + '"><iconify-icon icon="iconoir:' + icon + '" width="18"></iconify-icon></span><div class="toast-content"><div class="toast-title">' + enc(title) + '</div><div class="toast-body">' + enc(sub) + '</div></div></div>';
  }
  function perfilPreview() {
    return '<div style="width:220px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:10px"><div class="avatar" style="width:36px;height:36px;font-size:13px;font-weight:700">AS</div><div><div class="body-sm" style="font-weight:600">Ana Soto</div><span class="pill pill-accent pill-sm">Admin</span></div></div><div class="form-group"><input class="input input-sm" type="text" value="Ana Soto"></div></div>';
  }

  /* ── LOGIN ───────────────────────────────────────────────── */
  function loginForm(opts) {
    opts = opts || {};
    var err = opts.error
      ? '<div style="background:var(--neg-soft);border:1px solid rgba(190,18,60,.2);border-radius:var(--radius-md);padding:10px 14px;font-size:13px;color:var(--neg-ink);display:flex;align-items:center;gap:6px;margin-bottom:var(--space-4)"><iconify-icon icon="iconoir:warning-circle" width="14"></iconify-icon>Email o contraseña incorrectos.</div>'
      : '';
    var btn = opts.loading
      ? '<button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:var(--space-6)" disabled><iconify-icon icon="iconoir:refresh-double" width="16" style="animation:spin 1s linear infinite"></iconify-icon>Iniciando sesión…</button>'
      : '<button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:var(--space-6)">Iniciar sesión</button>';
    return '<div style="width:100%;max-width:320px">' +
      '<h2 style="font-family:var(--font-display);font-weight:700;font-size:22px;letter-spacing:-.02em;color:var(--ink);margin:0 0 var(--space-6)">Acceso interno</h2>' +
      err +
      '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' +
        '<div class="form-group"><label class="form-label">Email</label><input class="input' + (opts.error ? ' error' : '') + '" type="email" value="' + (opts.error ? 'ana@coopervision.es' : '') + '" placeholder="nombre@coopervision.es"></div>' +
        '<div class="form-group"><label class="form-label">Contraseña</label><input class="input' + (opts.error ? ' error' : '') + '" type="password" value="' + (opts.error ? '••••••' : '') + '" placeholder="••••••••"><span style="display:block;text-align:right;font-size:12px;color:var(--muted);margin-top:6px">¿Olvidaste tu contraseña?</span></div>' +
      '</div>' + btn +
      '<div style="height:1px;background:var(--line-2);margin:var(--space-6) 0 var(--space-4)"></div>' +
      '<div style="font-size:12px;color:var(--muted)">Built by <strong style="color:var(--ink-2)">Newno</strong></div>' +
    '</div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>';
  }
  function loginSplit() {
    return '<div style="display:flex;width:100%;max-width:760px;min-height:360px;border:1px solid var(--line);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-e1)">' +
      '<div style="flex:1 1 52%;position:relative;background:var(--ink);color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:24px 28px;overflow:hidden">' +
        '<div style="position:absolute;inset:0;background:radial-gradient(58% 48% at 80% 36%, rgba(197,232,23,.30), rgba(197,232,23,0) 68%);pointer-events:none"></div>' +
        '<div style="position:relative;display:flex;align-items:center;gap:9px">' +
          '<span style="width:30px;height:30px;background:#fff;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;flex-shrink:0"><img src="assets/cpv-logo.png" alt="" style="width:19px;height:19px;object-fit:contain;display:block"></span>' +
          '<span><span style="display:block;font-family:var(--font-display);font-weight:700;font-size:12px;color:#fff">CooperVision</span>' +
          '<span style="display:block;font-size:10px;color:rgba(255,255,255,.52)">BBDD Ópticas Iberia</span></span>' +
        '</div>' +
        '<div style="position:relative">' +
          '<div style="font-family:var(--font-display);font-weight:800;font-size:32px;line-height:1;letter-spacing:-.03em">Plataforma de Ópticas Iberia<span style="color:var(--accent)">.</span></div>' +
          '<p style="margin:10px 0 0;font-size:12px;line-height:1.5;color:rgba(255,255,255,.6)">Acceso centralizado a la base de datos de ópticas de España y Portugal.</p>' +
        '</div>' +
        '<div style="position:relative;font-size:10px;color:rgba(255,255,255,.4)">© 2026 CooperVision Iberia. Desarrollado por Newno</div>' +
      '</div>' +
      '<div style="flex:1 1 48%;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:28px">' + loginForm({}) + '</div>' +
    '</div>';
  }
  function loginCard(opts) {
    return '<div class="card" style="margin:0;max-width:380px;padding:var(--space-8)">' + loginForm(opts) + '</div>';
  }
  function loginDetail() {
    return block('Variantes a documentar', '',
      stage('', variantList([
        ['Split-screen', 'hero oscuro con glow de acento + panel de formulario'],
        ['Formulario', 'email + contraseña + botón + link "Olvidé mi contraseña" + Built by Newno'],
        ['Estado de error', 'credenciales incorrectas — aviso + inputs en error'],
        ['Estado de loading', 'botón en spinner mientras valida'],
      ]), true)) +
      block('Pantalla completa', 'split-screen — hero oscuro (única superficie no blanca aprobada) + formulario',
        stage('', loginSplit())) +
    '<div class="sg-cols">' +
      stage('Estado de error', loginCard({ error: true })) +
      stage('Estado de loading (botón)', loginCard({ loading: true })) +
    '</div>';
  }
  function loginPreview() {
    return '<div style="display:flex;width:210px;height:120px;border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden">' +
      '<div style="flex:1 1 52%;position:relative;background:var(--ink);color:#fff;padding:10px;overflow:hidden">' +
        '<div style="position:absolute;inset:0;background:radial-gradient(70% 55% at 80% 30%, rgba(197,232,23,.32), rgba(197,232,23,0) 70%)"></div>' +
        '<div style="position:relative;font-family:var(--font-display);font-weight:800;font-size:13px;line-height:1.05;letter-spacing:-.02em;margin-top:34px">Plataforma de Ópticas Iberia<span style="color:var(--accent)">.</span></div>' +
      '</div>' +
      '<div style="flex:1 1 48%;background:var(--bg);display:flex;flex-direction:column;justify-content:center;gap:6px;padding:10px">' +
        '<input class="input input-sm" type="text" placeholder="Email" disabled style="height:24px;font-size:10px">' +
        '<input class="input input-sm" type="password" placeholder="••••••" disabled style="height:24px;font-size:10px">' +
        '<div class="btn btn-primary" style="width:100%;justify-content:center;pointer-events:none;padding:5px 0;font-size:10px">Iniciar sesión</div>' +
      '</div>' +
    '</div>';
  }

  /* ── Registro ────────────────────────────────────────────── */
  function reg(id, title, desc, file, preview, detail) {
    SG.reg({ id: 'pv-' + id, group: 'patterns', title: title, desc: desc, file: file, tag: 'Vista', tagIcon: 'app-window', preview: preview, detail: detail });
  }

  reg('resumen', 'Resumen', 'KPI Partners con delta +/− / primera sync sin delta · Valoración con estrella · Reseñas compacto · empty BBDD vacía.', 'views/resumen.js', resumenPreview, resumenDetail);
  reg('bi', 'Business Intelligence', 'Anchor nav normal/sticky · cuadrante solo partners/otras/ambos · oportunidad alta vs baja.', 'views/bi.js', biPreview, biDetail);
  reg('mapa', 'Mapa', 'Sin resultados con filtros · marcador seleccionado vs no · popup sin contacto.', 'views/mapa.js', mapaPreview, mapaDetail);
  reg('bbdd', 'Base de datos', 'Fila badge Cliente + override · fila solo Google · filtros 0/3/limpiados · exportar con/sin filtros.', 'views/bbdd.js', bbddPreview, bbddDetail);
  reg('detalle', 'Detalle (Drawer V5)', 'Tab CPV no cliente (empty) · campo corregido manualmente · editable hover · Cambios sin/con overrides.', 'components/drawer-detalle.js', detallePreview, detalleDetail);
  reg('revision', 'Revisión (A3)', 'Focus card 1 candidato / múltiples · solo CPV · no encontrado · bandeja vacía.', 'views/admin-revision.js', revisionPreview, revisionDetail);
  reg('changelog', 'Changelog', 'Fila override / sync / vínculo · con filtro de óptica activo (chip).', 'views/changelog.js', changelogPreview, changelogDetail);
  reg('usuarios', 'Usuarios (A1)', 'Fila usuario activo admin / activo user / inactivo.', 'views/admin-usuarios.js', usuariosPreview, usuariosDetail);
  reg('operaciones', 'Operaciones (A2)', 'Estado idle / en curso / completado · cards de fuente · modal de confirmación (primary, no destructive).', 'views/admin-operaciones.js', opsPreview, opsDetail);
  reg('cadenas', 'Cadenas (A4)', 'Filtro ES/PT · tabla con ⋯ · modal de edición · modal de eliminación con bifurcación de ópticas.', 'views/admin-cadenas.js', cadPreview, cadDetail);
  reg('logs', 'Logs de actividad (A5)', 'Filtros usuario/acción/fechas · fechas "Personalizado" condicional · paleta completa de pills de acción.', 'views/admin-logs.js', logsPreview, logsDetail);
  reg('perfil', 'Mi perfil', 'Datos personales (email no editable) · cambio de contraseña con validación · estado de éxito.', 'views/perfil.js', perfilPreview, perfilDetail);
  reg('login', 'Login', 'Formulario email + contraseña + "olvidé contraseña" · estado de error · loading del botón.', 'views/login.html', loginPreview, loginDetail);
})();
