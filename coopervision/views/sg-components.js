/* ════════════════════════════════════════════════════════════════
   views/sg-components.js  ·  Componentes con variantes funcionales
   Categorías: Acciones · Feedback y estado · Formularios ·
   Contenedores · Navegación · Datos y visualización · Marcadores y mapa
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var SG = window.cpvSG;
  var enc = SG.enc;
  var stage = SG.stage, block = SG.block, samples = SG.samples, sample = SG.sample;

  /* fila simple de elementos con gap */
  function row(items, gap) {
    return '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:' + (gap || 'var(--space-3)') + '">' + items.join('') + '</div>';
  }

  /* ══════════════════════════════════════════════════════════
     ACCIONES
  ══════════════════════════════════════════════════════════ */

  /* ── Button ── */
  function buttonDetail() {
    return block('Variantes × tamaños', 'primary / ghost / subtle / destructive / icon-only',
      stage('Primary', row([
        '<button class="btn btn-primary btn-sm"><iconify-icon icon="iconoir:plus" width="13"></iconify-icon>sm</button>',
        '<button class="btn btn-primary">md · default</button>',
        '<button class="btn btn-primary btn-lg">lg</button>',
        '<button class="btn btn-primary" disabled>disabled</button>',
        '<button class="btn btn-primary"><iconify-icon icon="iconoir:refresh-double" width="14" style="animation:spin 1s linear infinite"></iconify-icon>loading</button>',
      ]))
    ) +
    '<div class="sg-cols">' +
      stage('Ghost', row([
        '<button class="btn btn-ghost btn-sm"><iconify-icon icon="iconoir:download" width="13"></iconify-icon>sm</button>',
        '<button class="btn btn-ghost">md</button>',
        '<button class="btn btn-ghost btn-lg">lg</button>',
        '<button class="btn btn-ghost" disabled>disabled</button>',
      ])) +
      stage('Subtle', row([
        '<button class="btn btn-subtle btn-sm">sm</button>',
        '<button class="btn btn-subtle">md</button>',
        '<button class="btn btn-subtle btn-lg">lg</button>',
      ])) +
      stage('Destructive', row([
        '<button class="btn btn-destructive btn-sm"><iconify-icon icon="iconoir:trash" width="13"></iconify-icon>Eliminar sm</button>',
        '<button class="btn btn-destructive">Eliminar md</button>',
        '<button class="btn btn-destructive" disabled>disabled</button>',
      ])) +
      stage('Icon-only', row([
        '<button class="btn-icon"><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button>',
        '<button class="btn-icon btn-lg"><iconify-icon icon="iconoir:edit-pencil" width="18"></iconify-icon></button>',
        '<button class="btn-icon" disabled><iconify-icon icon="iconoir:trash" width="16"></iconify-icon></button>',
      ])) +
    '</div>' +
    '<style>@keyframes spin{to{transform:rotate(360deg)}}</style>';
  }
  function buttonPreview() {
    return '<div style="display:flex;flex-direction:column;gap:10px;align-items:center">' +
      '<button class="btn btn-primary btn-sm">Primary</button>' +
      '<button class="btn btn-ghost btn-sm">Ghost</button>' +
    '</div>';
  }

  /* ── Toggle ── */
  function toggle(checked, disabled, label) {
    return '<label class="toggle-label"' + (disabled ? ' style="opacity:.5;cursor:not-allowed"' : '') + '>' +
      '<input type="checkbox"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '>' +
      '<span class="toggle-track"></span>' +
      '<span class="toggle-text">' + enc(label) + '</span></label>';
  }
  function toggleDetail() {
    return block('Estados', 'on / off / disabled · usado en V5 Tab Estado',
      stage('', samples([
        sample('on', toggle(true, false, 'Activa')),
        sample('off', toggle(false, false, 'Pausada')),
        sample('disabled · on', toggle(true, true, 'Bloqueada')),
        sample('disabled · off', toggle(false, true, 'Bloqueada')),
      ])));
  }

  /* ── Chip de filtro ── */
  function filterChip(label, removable) {
    return '<div data-chip style="display:inline-flex;align-items:center;gap:4px;padding:4px 8px 4px 12px;background:var(--accent-soft);color:var(--accent-ink-deep);border-radius:var(--radius-full);font-size:12px;font-weight:500;border:1px solid rgba(197,232,23,.4)">' +
      enc(label) +
      (removable ? '<button data-chip-rm style="background:none;border:none;cursor:pointer;padding:0;display:flex;color:inherit;opacity:.65;margin-left:2px"><iconify-icon icon="iconoir:xmark" width="12"></iconify-icon></button>' : '') +
    '</div>';
  }
  function chipDetail() {
    return block('Chips de filtro', 'con valor / eliminable / limpiar todo',
      stage('', row([
        filterChip('Madrid', true),
        filterChip('Solo clientes', true),
        filterChip('Rating ≥ 4.0', true),
        '<button class="btn btn-ghost btn-sm">Limpiar todo</button>',
      ], 'var(--space-2)')));
  }
  function chipPreview() {
    return row([filterChip('Madrid', true), filterChip('Clientes', true)], 'var(--space-2)');
  }

  /* ══════════════════════════════════════════════════════════
     FEEDBACK Y ESTADO
  ══════════════════════════════════════════════════════════ */

  function toastItem(type, icon, title, sub) {
    return '<div class="toast toast-' + type + '" style="position:static;margin:0;animation:none;max-width:360px">' +
      '<span class="toast-icon ' + type + '"><iconify-icon icon="iconoir:' + icon + '" width="18"></iconify-icon></span>' +
      '<div class="toast-content"><div class="toast-title">' + enc(title) + '</div>' +
      (sub ? '<div class="toast-body">' + enc(sub) + '</div>' : '') + '</div>' +
      '<button class="toast-close"><iconify-icon icon="iconoir:xmark" width="14"></iconify-icon></button>' +
    '</div>';
  }
  function toastDetail() {
    return block('Tipos × subtítulo', 'success / error / warn / info',
      '<div style="display:flex;flex-direction:column;gap:var(--space-3);max-width:380px">' +
        toastItem('success', 'check-circle', 'Cambios guardados', 'El override se registró en opticas_overrides.') +
        toastItem('error', 'warning-triangle', 'Error al sincronizar', 'No se pudo conectar con Outscraper.') +
        toastItem('warn', 'warning-triangle', '23 conflictos detectados', 'Revisar en Administración → Revisión.') +
        toastItem('info', 'refresh-double', 'Sincronización en curso', 'Puede tardar entre 30 min y varias horas.') +
        toastItem('success', 'check-circle', 'Sin subtítulo', '') +
      '</div>');
  }
  function toastPreview() {
    return toastItem('success', 'check-circle', 'Cambios guardados', 'Override registrado.');
  }

  /* ── Empty state ── */
  function emptyBox(icon, title, body, action) {
    return '<div class="card" style="margin:0"><div class="empty-state" style="min-height:200px">' +
      '<iconify-icon class="empty-state-icon" icon="iconoir:' + icon + '" width="30"></iconify-icon>' +
      '<h2 class="state-title">' + enc(title) + '</h2>' +
      '<p class="state-body">' + enc(body) + '</p>' +
      (action ? '<button class="btn btn-ghost btn-sm">' + enc(action) + '</button>' : '') +
    '</div></div>';
  }
  function emptyDetail() {
    return '<div class="sg-cols">' +
      stage('BBDD vacía', emptyBox('database', 'Sin datos iniciales', 'Importa la primera sincronización para empezar.', 'Importar datos'), true) +
      stage('Sin resultados', emptyBox('search', 'Sin resultados', 'No hay ópticas que coincidan con los filtros.', 'Limpiar filtros'), true) +
      stage('Sin permisos', emptyBox('lock', 'Acceso restringido', 'No tienes permisos para ver esta sección.', ''), true) +
    '</div>';
  }
  function emptyPreview() {
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--muted)">' +
      '<iconify-icon icon="iconoir:search" width="28" style="color:var(--muted-2)"></iconify-icon>' +
      '<span class="state-title" style="font-size:14px">Sin resultados</span></div>';
  }

  /* ── Error state ── */
  function errorBox(retry) {
    return '<div class="card" style="margin:0"><div class="error-state" style="min-height:200px">' +
      '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="30"></iconify-icon>' +
      '<h2 class="state-title">No se pudo cargar</h2>' +
      '<p class="state-body">Ha ocurrido un error al recuperar los datos.</p>' +
      (retry ? '<button class="btn btn-primary btn-sm"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' : '') +
    '</div></div>';
  }
  function errorDetail() {
    return '<div class="sg-cols">' +
      stage('Con retry', errorBox(true), true) +
      stage('Sin retry', errorBox(false), true) +
    '</div>';
  }

  /* ── Skeleton ── */
  function skeletonDetail() {
    var kpi = '<div class="card card-compact" style="margin:0;display:flex;flex-direction:column;gap:10px;min-height:86px">' +
      '<span class="skeleton sk-text-sm" style="width:45%"></span>' +
      '<span class="skeleton" style="height:34px;width:70%"></span>' +
      '<span class="skeleton sk-text-sm" style="width:35%"></span></div>';
    var rowSk = '<div class="card" style="margin:0;padding:14px 0">' +
      Array(4).fill(0).map(function () { return '<div style="padding:0 16px"><span class="skeleton sk-row" style="margin:0;margin-bottom:8px"></span></div>'; }).join('') + '</div>';
    var chart = '<div class="card" style="margin:0"><span class="skeleton sk-text-sm" style="width:40%;display:block;margin-bottom:14px"></span>' +
      '<span class="skeleton" style="height:160px;width:100%"></span></div>';
    var list = '<div style="display:flex;flex-direction:column;gap:10px">' +
      Array(4).fill(0).map(function () { return '<div style="display:flex;gap:10px;align-items:center"><span class="skeleton" style="width:36px;height:36px;border-radius:var(--radius-md)"></span><span class="skeleton sk-text-sm" style="flex:1"></span></div>'; }).join('') + '</div>';
    return '<div class="sg-cols">' +
      stage('KPI card', kpi) + stage('Fila de tabla', rowSk) +
      stage('Chart card', chart) + stage('Lista del mapa', list) +
    '</div>';
  }
  function skeletonPreview() {
    return '<div style="width:100%;max-width:200px;display:flex;flex-direction:column;gap:10px">' +
      '<span class="skeleton sk-text-sm" style="width:50%"></span>' +
      '<span class="skeleton" style="height:30px;width:80%"></span>' +
      '<span class="skeleton sk-text-sm" style="width:40%"></span></div>';
  }

  /* ── Banner persistente ── */
  function bannerDetail() {
    return block('Banner persistente', 'sync en curso — el único caso actual',
      stage('', '<div class="banner banner-info" style="border-radius:var(--radius-md);border:1px solid rgba(197,232,23,.35)">' +
        '<iconify-icon icon="iconoir:refresh-double" width="16" style="animation:spin 1.4s linear infinite"></iconify-icon>' +
        '<span><b>Sincronización en curso</b> — actualizando 18.234 registros desde Outscraper. Puede tardar varias horas.</span>' +
        '<button class="btn-icon banner-close"><iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></button>' +
      '</div>') + '<style>@keyframes spin{to{transform:rotate(360deg)}}</style>');
  }
  function bannerPreview() {
    return '<div class="banner banner-info" style="border-radius:var(--radius-md);max-width:220px;font-size:12px;padding:8px 12px">' +
      '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon><span>Sync en curso</span></div>';
  }

  /* ── Badge de notificación ── */
  function badgeDetail() {
    return block('Badge de notificación', 'sobre ícono de nav (sidebar admin)',
      stage('', samples([
        sample('con contador', '<span class="sg-badge-host"><button class="nav-item" style="cursor:default"><iconify-icon icon="iconoir:warning-circle" width="20"></iconify-icon></button><span class="sg-badge-dot">23</span></span>'),
        sample('99+', '<span class="sg-badge-host"><button class="nav-item" style="cursor:default"><iconify-icon icon="iconoir:settings" width="20"></iconify-icon></button><span class="sg-badge-dot">99+</span></span>'),
        sample('punto', '<span class="sg-badge-host"><button class="nav-item" style="cursor:default"><iconify-icon icon="iconoir:bell" width="20"></iconify-icon></button><span class="sg-badge-dot" style="min-width:9px;height:9px;padding:0"></span></span>'),
      ])));
  }
  function badgePreview() {
    return '<span class="sg-badge-host"><button class="nav-item on" style="cursor:default"><iconify-icon icon="iconoir:warning-circle" width="22"></iconify-icon></button><span class="sg-badge-dot">23</span></span>';
  }

  function tooltipDetail() {
    return block('Tooltip flotante', 'fondo tinta + texto blanco + flecha — aparece en hover/focus',
      stage('', '<div style="display:flex;gap:56px;align-items:center;padding:36px 12px 8px">' +
        '<span class="tip-wrap"><button class="btn btn-ghost btn-sm" style="pointer-events:none">Hover</button><span class="tip-content" style="opacity:1">Campañas</span></span>' +
        '<span class="tip-wrap"><button class="btn-icon" style="pointer-events:none"><iconify-icon icon="iconoir:info-circle" width="16"></iconify-icon></button><span class="tip-content" style="opacity:1">Más información</span></span>' +
      '</div>')) +
    block('Tooltip del rail', 'variante lateral — flecha a la izquierda; solo visible con el sidebar plegado',
      stage('', '<div style="padding:8px 0"><div class="nav-item" style="cursor:default;background:var(--gray-100);color:var(--ink)"><iconify-icon icon="iconoir:graph-up" width="20"></iconify-icon><span class="tip" style="opacity:1">Business Intelligence</span></div></div>'));
  }
  function tooltipPreview() {
    return '<span class="tip-wrap" style="margin-top:30px"><button class="btn btn-ghost btn-sm" style="pointer-events:none">Elemento</button><span class="tip-content" style="opacity:1">Campañas</span></span>';
  }

  /* ══════════════════════════════════════════════════════════
     FORMULARIOS
  ══════════════════════════════════════════════════════════ */

  function inputDetail() {
    return '<div class="sg-cols">' +
      stage('Default · focus · disabled',
        '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' +
          '<input class="input" type="text" placeholder="Placeholder…">' +
          '<input class="input" type="text" value="Con foco" style="border-color:var(--accent);box-shadow:var(--shadow-focus)">' +
          '<input class="input" type="text" value="No editable" disabled>' +
        '</div>') +
      stage('Error · con ícono · con limpiar',
        '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' +
          '<div><input class="input error" type="text" value="Valor inválido"><span class="form-error" style="margin-top:6px;display:block">Este campo es obligatorio</span></div>' +
          '<div class="input-wrap"><span class="input-icon"><iconify-icon icon="iconoir:search" width="16"></iconify-icon></span><input class="input" type="text" placeholder="Buscar óptica…"></div>' +
          '<div class="input-wrap"><input class="input" type="text" value="Texto a limpiar"><span class="input-suffix"><iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></span></div>' +
        '</div>') +
    '</div>';
  }
  function inputPreview() {
    return '<div class="input-wrap" style="width:200px"><span class="input-icon"><iconify-icon icon="iconoir:search" width="15"></iconify-icon></span><input class="input input-sm" type="text" placeholder="Buscar…"></div>';
  }

  function inputDateDetail() {
    return block('Variante unitaria', 'input[type=date] — ícono de calendario Iconoir (DS v3.2); selector de fecha nativo del navegador',
      stage('', samples([
        sample('md', '<input class="input" type="date" value="2026-06-18" style="width:180px">'),
        sample('sm', '<input class="input input-sm" type="date" value="2026-06-18" style="width:160px">'),
        sample('vacío', '<input class="input input-sm" type="date" style="width:160px">'),
        sample('disabled', '<input class="input input-sm" type="date" value="2026-06-18" style="width:160px" disabled>'),
      ]))) +
    block('Par desde / hasta', 'siempre en par separado por guión — único caso: A5 Logs, rango personalizado',
      stage('', '<div style="display:flex;gap:8px;align-items:center"><input type="date" class="input input-sm" style="width:140px" value="2026-05-01"><span class="c-muted" style="font-size:13px">—</span><input type="date" class="input input-sm" style="width:140px" value="2026-06-18"></div>'));
  }
  function inputDatePreview() {
    return '<div style="display:flex;gap:6px;align-items:center"><input type="date" class="input input-sm" style="width:120px" value="2026-05-01"><span class="c-muted" style="font-size:12px">—</span><input type="date" class="input input-sm" style="width:120px" value="2026-06-18"></div>';
  }

  function selectDetail() {
    return block('Tamaños y estados', 'md / sm / disabled',
      stage('', samples([
        sample('md', '<select class="select" style="width:200px"><option>Madrid</option><option>Barcelona</option></select>'),
        sample('sm', '<select class="select select-sm" style="width:200px"><option>Todas las provincias</option></select>'),
        sample('disabled', '<select class="select" style="width:200px" disabled><option>Bloqueado</option></select>'),
      ])));
  }
  function selectPreview() {
    return '<select class="select select-sm" style="width:180px"><option>Madrid</option></select>';
  }

  function textareaDetail() {
    return '<div class="sg-cols">' +
      stage('Default', '<textarea class="textarea" rows="3" placeholder="Notas internas…"></textarea>') +
      stage('Con contador', '<div><textarea class="textarea" rows="3">Óptica con datos verificados manualmente.</textarea><div style="text-align:right;font-size:11px;color:var(--muted);margin-top:4px">46 / 280</div></div>') +
    '</div>';
  }
  function textareaPreview() {
    return '<textarea class="textarea" rows="2" style="width:200px;min-height:56px" placeholder="Notas…"></textarea>';
  }

  function radioCtl(checked, disabled, label) {
    return '<label class="radio-wrap"' + (disabled ? ' style="opacity:.5"' : '') + '><input class="radio" type="radio" name="sg-r"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '><span class="toggle-text">' + enc(label) + '</span></label>';
  }
  function radioDetail() {
    return block('Radio', 'seleccionado / no seleccionado / disabled',
      stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-3)">' +
        radioCtl(true, false, 'Seleccionado') + radioCtl(false, false, 'No seleccionado') + radioCtl(false, true, 'Disabled') + '</div>'));
  }
  function radioPreview() {
    return '<div style="display:flex;flex-direction:column;gap:8px">' + radioCtl(true, false, 'Opción A') + radioCtl(false, false, 'Opción B') + '</div>';
  }

  function checkCtl(state, disabled, label) {
    var attr = state === 'checked' ? ' checked' : '';
    var ind = state === 'indeterminate' ? ' data-ind="1"' : '';
    return '<label class="checkbox-wrap"' + (disabled ? ' style="opacity:.5"' : '') + '><input class="checkbox" type="checkbox"' + attr + ind + (disabled ? ' disabled' : '') + '><span class="toggle-text">' + enc(label) + '</span></label>';
  }
  function checkDetail() {
    return block('Checkbox', 'marcado / no marcado / indeterminado / disabled',
      stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-3)">' +
        checkCtl('checked', false, 'Marcado') + checkCtl('', false, 'No marcado') +
        checkCtl('indeterminate', false, 'Indeterminado') + checkCtl('checked', true, 'Disabled') + '</div>'));
  }
  function checkPreview() {
    return '<div style="display:flex;flex-direction:column;gap:8px">' + checkCtl('checked', false, 'Marcado') + checkCtl('', false, 'Sin marcar') + '</div>';
  }
  function checkMounted(root) {
    root.querySelectorAll('input[data-ind]').forEach(function (i) { i.indeterminate = true; });
  }

  function sliderDetail() {
    return block('Slider', 'valoración mínima — el único caso actual',
      stage('Valoración mínima: 4.0★', '<div style="max-width:320px"><input class="slider" type="range" min="0" max="5" step="0.1" value="4"><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:8px"><span>0★</span><span>5★</span></div></div>'));
  }
  function sliderPreview() {
    return '<div style="width:180px"><input class="slider" type="range" min="0" max="5" step="0.1" value="4"></div>';
  }

  function formGroupDetail() {
    return '<div class="sg-cols">' +
      stage('label + input', '<div class="form-group"><label class="form-label">Provincia</label><input class="input" type="text" placeholder="Madrid"></div>') +
      stage('label + input + hint', '<div class="form-group"><label class="form-label">Código óptica</label><input class="input" type="text" placeholder="CPV-08234"><span class="form-hint">Formato CPV-NNNNN del maestro de Salesforce.</span></div>') +
      stage('label + input + error', '<div class="form-group"><label class="form-label">Email</label><input class="input error" type="text" value="correo-mal"><span class="form-error">Introduce un email válido.</span></div>') +
    '</div>';
  }
  function formGroupPreview() {
    return '<div class="form-group" style="width:200px"><label class="form-label">Provincia</label><input class="input input-sm" type="text" placeholder="Madrid"></div>';
  }

  /* ══════════════════════════════════════════════════════════
     CONTENEDORES
  ══════════════════════════════════════════════════════════ */

  function cardDetail() {
    return '<div class="sg-cols">' +
      stage('Estándar', '<div class="card" style="margin:0"><div class="card-head"><h3 class="display-md" style="margin:0">Card estándar</h3></div><p class="body-sm c-muted">Fondo blanco, borde sutil, sombra e1.</p></div>') +
      stage('Accent', '<div class="card card-accent" style="margin:0"><div class="card-head"><h3 class="display-md" style="margin:0">Card accent</h3><iconify-icon icon="iconoir:star-solid" width="14" style="color:var(--accent-ink-deep)"></iconify-icon></div><p class="body-sm c-muted">Borde lime para métricas destacadas (A3).</p></div>') +
      stage('Compact', '<div class="card card-compact" style="margin:0"><div style="display:flex;justify-content:space-between;align-items:center"><div><div class="body-sm" style="font-weight:500">Card compact</div><div class="body-xs c-muted">Padding reducido.</div></div><button class="btn btn-primary btn-sm">Acción</button></div></div>') +
      stage('Clickeable (KPI link)', '<a href="#/styleguide?c=kpi" class="card card-compact" style="margin:0;display:block;text-decoration:none"><div style="display:flex;justify-content:space-between;align-items:start"><div><div class="eyebrow-t">Partners</div><div class="kpi-value-md" style="margin-top:6px">3.142</div></div><iconify-icon icon="iconoir:arrow-right" width="16" style="color:var(--muted-2)"></iconify-icon></div></a>') +
    '</div>';
  }
  function cardPreview() {
    return '<div class="card card-compact" style="margin:0;width:180px"><div class="body-sm" style="font-weight:600">Card</div><div class="body-xs c-muted">estándar · accent · compact</div></div>';
  }

  function modalDetail() {
    var modal = '<div class="modal-overlay" id="sg-modal" style="display:none;position:fixed;z-index:60">' +
      '<div class="modal"><div class="modal-header"><h2 class="modal-title">Confirmar eliminación</h2>' +
      '<button class="btn-icon btn-lg" data-sg-modal-close><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
      '<div class="modal-body">Vas a eliminar el override manual de <b>Óptica San Carlos</b>. El dato volverá al valor de Google Maps. Esta acción no se puede deshacer.</div>' +
      '<div class="modal-footer"><button class="btn btn-ghost btn-sm" data-sg-modal-close>Cancelar</button>' +
      '<button class="btn btn-destructive btn-sm">Eliminar override</button></div></div></div>';
    return block('Estructura base', 'base / confirmación destructiva / formulario corto / corregir dato',
      stage('Demo interactivo', '<button class="btn btn-ghost btn-sm" data-sg-modal-open="sg-modal"><iconify-icon icon="iconoir:eye" width="14"></iconify-icon>Abrir modal de confirmación</button>' + modal)) +
    '<div class="sg-cols">' +
      stage('Formulario corto', '<div class="modal" style="box-shadow:none;max-width:none;padding:var(--space-6)"><div class="modal-header" style="margin-bottom:var(--space-5)"><h2 class="modal-title">Nuevo usuario</h2></div><div class="form-group"><label class="form-label">Email</label><input class="input" placeholder="nombre@coopervision.es"></div></div>') +
      stage('Corregir dato', '<div class="modal" style="box-shadow:none;max-width:none;padding:var(--space-6)"><div class="modal-header" style="margin-bottom:var(--space-5)"><h2 class="modal-title">Corregir teléfono</h2></div><div class="form-group"><label class="form-label">Teléfono</label><input class="input" value="+34 91 234 56 78"><span class="form-hint">Se registrará como override manual.</span></div></div>') +
    '</div>';
  }
  function modalPreview() {
    return '<div style="width:180px;height:110px;background:var(--card);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--shadow-e2);padding:12px"><div style="font-family:var(--font-display);font-weight:600;font-size:13px">Confirmar</div><div style="height:1px;background:var(--line-2);margin:34px -12px 8px"></div><div style="display:flex;justify-content:flex-end;gap:6px"><span style="font-size:10px;padding:3px 8px;border:1px solid var(--line);border-radius:6px">Cancelar</span><span style="font-size:10px;padding:3px 8px;background:var(--accent);border-radius:6px">OK</span></div></div>';
  }

  function drawerDetail() {
    var panel = '<div class="sg-drawer-demo" id="sg-drawer">' +
      '<div class="sg-drawer-panel">' +
        '<div class="drawer-header" style="padding:var(--space-5)"><div><div class="eyebrow-t">Óptica · ChIJ_madrid_001</div><h3 class="drawer-title" style="margin-top:4px">Óptica San Carlos</h3></div><button class="btn-icon" data-sg-drawer-close><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
        '<nav class="tabs-list" style="margin:0 var(--space-5)"><button class="tab-trigger active">Resumen</button><button class="tab-trigger">Datos</button><button class="tab-trigger">Cambios<span class="pill pill-neutral pill-sm" style="margin-left:6px">2</span></button></nav>' +
        '<div class="drawer-body" style="padding:var(--space-5)"><div class="data-pair" style="margin-bottom:14px"><span class="data-label">Dirección</span><span class="data-value">Calle Mayor 24, Madrid</span></div><div class="data-pair"><span class="data-label">Rating</span><span class="data-value">★ 4.8 · 324 reseñas</span></div></div>' +
      '</div></div>';
    return block('Drawer lateral', 'base / con tabs / empty state dentro',
      stage('Demo interactivo (480/560px en producción)', '<button class="btn btn-ghost btn-sm" data-sg-drawer-open="sg-drawer"><iconify-icon icon="iconoir:eye" width="14"></iconify-icon>Abrir drawer</button>' +
        '<div style="height:14px"></div>' + panel.replace('id="sg-drawer"', 'id="sg-drawer" style="display:none"')));
  }
  function drawerPreview() {
    return '<div style="display:flex;width:180px;height:120px;border:1px solid var(--line-2);border-radius:var(--radius-md);overflow:hidden"><div style="flex:1;background:rgba(231,234,238,.4)"></div><div style="width:96px;background:var(--card);border-left:1px solid var(--line);box-shadow:var(--shadow-e2);padding:10px"><div style="font-size:10px;font-weight:600">Detalle</div><div style="height:1px;background:var(--line-2);margin:8px -10px"></div></div></div>';
  }

  function popoverDetail() {
    var pop = '<div class="sg-popanchor"><button class="btn btn-ghost btn-sm" data-sg-toggle="sg-pop-filters"><iconify-icon icon="iconoir:filter" width="14"></iconify-icon>Filtros</button>' +
      '<div class="sg-pop" id="sg-pop-filters" style="min-width:240px">' +
        '<div class="sg-mini-label">Tipo de óptica</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px">' + '<label class="checkbox-wrap"><input class="checkbox" type="checkbox" checked><span class="toggle-text">Clientes</span></label><label class="checkbox-wrap"><input class="checkbox" type="checkbox"><span class="toggle-text">Mercado</span></label>' + '</div>' +
        '<div style="height:1px;background:var(--line-2);margin:12px 0"></div>' +
        '<button class="btn btn-primary btn-sm" style="width:100%;justify-content:center">Aplicar</button>' +
      '</div></div>';
    return block('Popover', 'filtros de V4 — el único caso actual',
      stage('Demo interactivo', pop));
  }
  function popoverPreview() {
    return '<div style="width:180px;background:var(--card);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--shadow-e2);padding:12px"><div class="sg-mini-label" style="margin-bottom:8px">Filtros</div><label class="checkbox-wrap"><input class="checkbox" type="checkbox" checked><span class="toggle-text">Clientes</span></label></div>';
  }

  function flyoutDetail() {
    var fly = '<div class="sg-popanchor"><button class="btn btn-ghost btn-sm" data-sg-toggle="sg-pop-admin"><iconify-icon icon="iconoir:settings" width="14"></iconify-icon>Admin</button>' +
      '<div class="sg-pop is-menu" id="sg-pop-admin" style="min-width:200px">' +
        '<div class="admin-flyout-header">Administración</div>' +
        '<a class="admin-flyout-item"><iconify-icon icon="iconoir:group" width="16"></iconify-icon>Usuarios</a>' +
        '<a class="admin-flyout-item"><iconify-icon icon="iconoir:refresh-double" width="16"></iconify-icon>Operaciones</a>' +
        '<a class="admin-flyout-item"><iconify-icon icon="iconoir:warning-circle" width="16"></iconify-icon>Revisión</a>' +
        '<a class="admin-flyout-item"><iconify-icon icon="iconoir:page" width="16"></iconify-icon>Logs</a>' +
      '</div></div>';
    return block('Flyout', 'menú admin del sidebar',
      stage('Demo interactivo', fly));
  }
  function flyoutPreview() {
    return '<div style="width:170px;background:var(--card);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--shadow-e2);padding:4px"><div class="admin-flyout-header">Administración</div><div class="admin-flyout-item"><iconify-icon icon="iconoir:group" width="15"></iconify-icon>Usuarios</div></div>';
  }

  /* ══════════════════════════════════════════════════════════
     NAVEGACIÓN
  ══════════════════════════════════════════════════════════ */

  function railItem(icon, state, badge) {
    var cls = 'nav-item' + (state === 'active' ? ' on' : '');
    var st = state === 'hover' ? 'background:var(--gray-100);color:var(--ink);' : '';
    var inner = '<div class="' + cls + '" style="cursor:default;' + st + '"><iconify-icon icon="iconoir:' + icon + '" width="20"></iconify-icon></div>';
    if (badge) inner = '<span class="sg-badge-host">' + inner + '<span class="sg-badge-dot">' + badge + '</span></span>';
    return '<div style="display:flex;align-items:center;gap:var(--space-4)">' + inner +
      '<div><div class="body-sm" style="font-weight:500">' + (state === 'active' ? 'Activo' : state === 'hover' ? 'Hover' : badge ? 'Con badge' : 'Normal') + '</div></div></div>';
  }
  function railDetail() {
    return '<div class="sg-cols">' +
      stage('Estados del ítem', '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' +
        railItem('home-simple', 'active') + railItem('database', 'hover') + railItem('graph-up', 'normal') + railItem('warning-circle', 'normal', '23') + '</div>') +
      stage('Rol user vs admin', '<div style="display:flex;gap:var(--space-6)">' +
        '<div><div class="sg-mini-label">User</div><div style="width:48px;display:flex;flex-direction:column;gap:6px;padding:8px;border:1px solid var(--line-2);border-radius:var(--radius-lg)">' +
          ['home-simple', 'graph-up', 'map-pin', 'database'].map(function (i) { return '<div class="nav-item" style="cursor:default;width:32px;height:32px"><iconify-icon icon="iconoir:' + i + '" width="17"></iconify-icon></div>'; }).join('') + '</div></div>' +
        '<div><div class="sg-mini-label">Admin</div><div style="width:48px;display:flex;flex-direction:column;gap:6px;padding:8px;border:1px solid var(--line-2);border-radius:var(--radius-lg)">' +
          ['home-simple', 'graph-up', 'map-pin', 'database', 'clock-rotate-right', 'settings'].map(function (i) { return '<div class="nav-item" style="cursor:default;width:32px;height:32px"><iconify-icon icon="iconoir:' + i + '" width="17"></iconify-icon></div>'; }).join('') + '</div></div>' +
        '</div>') +
    '</div>';
  }
  function railPreview() {
    return '<div style="width:48px;display:flex;flex-direction:column;gap:6px;padding:8px;background:var(--card);border:1px solid var(--line);border-radius:var(--radius-lg)">' +
      '<div class="nav-item on" style="cursor:default;width:32px;height:32px"><iconify-icon icon="iconoir:home-simple" width="17"></iconify-icon></div>' +
      ['graph-up', 'map-pin', 'database'].map(function (i) { return '<div class="nav-item" style="cursor:default;width:32px;height:32px"><iconify-icon icon="iconoir:' + i + '" width="17"></iconify-icon></div>'; }).join('') + '</div>';
  }

  function tabsDetail() {
    return block('Tabs', '5 del drawer V5 · con contador',
      stage('Demo interactivo', '<nav class="tabs-list">' +
        '<button class="tab-trigger active" data-sgtabs="d" data-sgtab="a">Resumen</button>' +
        '<button class="tab-trigger" data-sgtabs="d" data-sgtab="b">Google Maps</button>' +
        '<button class="tab-trigger" data-sgtabs="d" data-sgtab="c">CooperVision</button>' +
        '<button class="tab-trigger" data-sgtabs="d" data-sgtab="d">App data</button>' +
        '<button class="tab-trigger" data-sgtabs="d" data-sgtab="e">Cambios <span class="pill pill-neutral pill-sm" style="margin-left:4px">2</span></button>' +
      '</nav>' +
      '<div data-sgpane data-sgtabs="d" data-sgtab="a" style="padding-top:var(--space-4);font-size:13px;color:var(--ink-2)">Contenido <b>Resumen</b>.</div>' +
      ['b', 'c', 'd', 'e'].map(function (t) { return '<div data-sgpane data-sgtabs="d" data-sgtab="' + t + '" style="display:none;padding-top:var(--space-4);font-size:13px;color:var(--ink-2)">Contenido pestaña <b>' + t.toUpperCase() + '</b>.</div>'; }).join('')));
  }
  function tabsPreview() {
    return '<nav class="tabs-list" style="margin:0;border:none"><button class="tab-trigger active">Resumen</button><button class="tab-trigger">Datos</button><button class="tab-trigger">Cambios</button></nav>';
  }

  function anchorDetail() {
    return block('Anchor nav', 'barra sticky de V2 BI · ítem activo por scroll',
      stage('', '<div class="sg-anchor">' +
        '<a class="sg-anchor-item active">Resumen</a><a class="sg-anchor-item">Cuadrante</a><a class="sg-anchor-item">Oportunidad</a><a class="sg-anchor-item">Ranking</a></div>'));
  }
  function anchorPreview() {
    return '<div class="sg-anchor"><span class="sg-anchor-item active">Resumen</span><span class="sg-anchor-item">Cuadrante</span></div>';
  }

  function pageBtn(label, active, disabled) {
    return '<button class="page-btn' + (active ? ' active' : '') + '"' + (disabled ? ' disabled' : '') + '>' + label + '</button>';
  }
  function pagiDetail() {
    var prev  = '<button class="page-btn"><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon></button>';
    var next  = '<button class="page-btn"><iconify-icon icon="iconoir:nav-arrow-right" width="15"></iconify-icon></button>';
    var prevD = '<button class="page-btn" disabled><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon></button>';
    var nextD = '<button class="page-btn" disabled><iconify-icon icon="iconoir:nav-arrow-right" width="15"></iconify-icon></button>';
    return '<div class="sg-cols">' +
      stage('Numerada con elipsis', '<div class="pagination">' + prev + pageBtn('1') + pageBtn('2') + pageBtn('3', true) + '<span class="page-ellipsis">…</span>' + pageBtn('12') + next + '</div>') +
      stage('Primera página · «anterior» disabled', '<div class="pagination">' + prevD + pageBtn('1', true) + pageBtn('2') + pageBtn('3') + '<span class="page-ellipsis">…</span>' + pageBtn('12') + next + '</div>') +
      stage('Última página · «siguiente» disabled', '<div class="pagination">' + prev + pageBtn('1') + '<span class="page-ellipsis">…</span>' + pageBtn('10') + pageBtn('11') + pageBtn('12', true) + nextD + '</div>') +
    '</div>';
  }
  function pagiPreview() {
    return '<div class="pagination">' + pageBtn('1') + pageBtn('2', true) + pageBtn('3') + '<span class="page-ellipsis">…</span>' + pageBtn('12') + '</div>';
  }

  /* ── Subnav admin ── */
  function adminTab(label, active, badge) {
    return '<span class="tab-trigger' + (active ? ' active' : '') + '" style="display:inline-flex;align-items:center;gap:5px;cursor:default">' +
      enc(label) + (badge ? '<span class="cpv-admin-badge">' + enc(badge) + '</span>' : '') + '</span>';
  }
  function subnavDetail() {
    var full = '<nav class="tabs-list cpv-admin-subnav" style="margin:0">' +
      adminTab('Usuarios', false) + adminTab('Operaciones', false) +
      adminTab('Revisión', false, '23') + adminTab('Cadenas', false) + adminTab('Logs', false) + '</nav>';
    return block('Conjunto completo', 'las 5 rutas de /admin/* · Revisión con badge de pendientes',
      stage('Producción', full)) +
    '<div class="sg-cols">' +
      stage('Ítem normal', '<nav class="tabs-list cpv-admin-subnav" style="margin:0">' + adminTab('Usuarios', false) + '</nav>') +
      stage('Ítem activo (vista actual)', '<nav class="tabs-list cpv-admin-subnav" style="margin:0">' + adminTab('Operaciones', true) + '</nav>') +
      stage('Ítem con badge de pendientes', '<nav class="tabs-list cpv-admin-subnav" style="margin:0">' + adminTab('Revisión', false, '23') + '</nav>') +
      stage('Sin pendientes (sin badge)', '<nav class="tabs-list cpv-admin-subnav" style="margin:0">' + adminTab('Revisión', false) + '</nav>') +
    '</div>' +
    block('Notas de implementación', '',
      stage('', '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:var(--ink-2)">' +
        '<li>Navegación <b>real entre rutas</b> (cada ítem es un <code style="font-family:var(--font-mono);font-size:11px">&lt;a href="#/admin/*"&gt;</code>), no tabs dentro de una vista.</li>' +
        '<li>El badge de <b>Revisión</b> usa <code style="font-family:var(--font-mono);font-size:11px">.cpv-admin-badge</code> y solo se renderiza cuando hay pendientes en A3 (matching + no encontrados &gt; 0).</li>' +
        '<li>Reutiliza <code style="font-family:var(--font-mono);font-size:11px">.tabs-list</code> + <code style="font-family:var(--font-mono);font-size:11px">.tab-trigger</code> del DS — el contenedor es <code style="font-family:var(--font-mono);font-size:11px">.cpv-admin-subnav</code>.</li>' +
        '</ul>', true));
  }
  function subnavPreview() {
    return '<nav class="tabs-list cpv-admin-subnav" style="margin:0;border:none;flex-wrap:wrap;justify-content:center">' +
      adminTab('Usuarios', true) + adminTab('Revisión', false, '23') + '</nav>';
  }

  /* ── Menú contextual de fila (⋯) ── */
  function rowMenu(withDanger) {
    return '<div class="cpv-row-menu open" style="position:static;display:inline-block;min-width:198px;opacity:1;pointer-events:auto;transform:none;box-shadow:var(--shadow-e2)">' +
      '<button class="dropdown-item"><iconify-icon icon="iconoir:edit-pencil" width="16"></iconify-icon>Editar</button>' +
      (withDanger
        ? '<button class="dropdown-item"><iconify-icon icon="iconoir:refresh-double" width="16"></iconify-icon>Re-aplicar detección</button>' +
          '<div class="dropdown-divider"></div>' +
          '<button class="dropdown-item danger"><iconify-icon icon="iconoir:trash" width="16"></iconify-icon>Eliminar</button>'
        : '') +
    '</div>';
  }
  function rowMenuTable() {
    return '<div class="table-wrap"><table class="table-dense"><thead><tr><th>Nombre</th><th>Email</th><th class="cpv-bbdd-menu-col"></th></tr></thead><tbody>' +
      '<tr><td>Ana Soto</td><td class="c-muted">ana@coopervision.es</td><td class="cpv-bbdd-menu-col"><button class="cpv-bbdd-menu-btn" style="color:var(--ink-2)"><iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button></td></tr>' +
      '<tr><td>Luis Vega</td><td class="c-muted">luis@coopervision.es</td><td class="cpv-bbdd-menu-col"><button class="cpv-bbdd-menu-btn"><iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button></td></tr>' +
      '</tbody></table></div>';
  }
  function rowmenuDetail() {
    return block('Fila con ⋯', 'el ícono solo aparece en hover sobre la fila (1ª fila simulada en hover)',
      stage('A1 Usuarios / A4 Cadenas', rowMenuTable(), true)) +
    '<div class="sg-cols">' +
      stage('Con acción destructiva (A4 Cadenas)', '<div style="padding:8px 0">' + rowMenu(true) + '</div>') +
      stage('Sin acción destructiva', '<div style="padding:8px 0">' + rowMenu(false) + '</div>') +
    '</div>' +
    block('Notas de implementación', '',
      stage('', '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:var(--ink-2)">' +
        '<li>El botón <code style="font-family:var(--font-mono);font-size:11px">.cpv-bbdd-menu-btn</code> (⋯) está atenuado y solo gana color en <code style="font-family:var(--font-mono);font-size:11px">tr:hover</code> — visibilidad condicional.</li>' +
        '<li>El menú flotante <code style="font-family:var(--font-mono);font-size:11px">.cpv-row-menu</code> se ancla a la fila con <code style="font-family:var(--font-mono);font-size:11px">position:fixed</code> (fuera del overflow de la tabla) y se cierra al hacer clic fuera.</li>' +
        '<li>La opción <b>Eliminar</b> usa <code style="font-family:var(--font-mono);font-size:11px">.dropdown-item.danger</code> (color negativo + papelera).</li>' +
        '</ul>', true));
  }
  function rowmenuPreview() {
    return '<div style="transform:scale(.82)">' + rowMenu(true) + '</div>';
  }

  function breadcrumbDetail() {
    return block('Breadcrumb', 'no aplica en este producto',
      stage('', '<div class="card" style="margin:0;background:var(--line-2);border:none"><div style="display:flex;align-items:center;gap:10px;color:var(--muted)"><iconify-icon icon="iconoir:minus-circle" width="18"></iconify-icon><span class="body-sm">La jerarquía de navegación es plana (rail de un nivel). No se usa breadcrumb.</span></div></div>'));
  }
  function breadcrumbPreview() {
    return '<div style="display:flex;align-items:center;gap:8px;color:var(--muted-2)"><iconify-icon icon="iconoir:minus-circle" width="22"></iconify-icon><span class="body-sm">No aplica</span></div>';
  }

  /* ══════════════════════════════════════════════════════════
     DATOS Y VISUALIZACIÓN
  ══════════════════════════════════════════════════════════ */

  function pillDetail() {
    var variants = ['accent', 'pos', 'neg', 'warn', 'neutral', 'paused'];
    var lg = variants.map(function (v) { return '<span class="pill pill-' + v + '"><span class="pill-dot"></span>' + v + '</span>'; });
    var sm = variants.map(function (v) { return '<span class="pill pill-' + v + ' pill-sm">' + v + ' sm</span>'; });
    return '<div class="sg-cols">' +
      stage('lg · con dot', row(lg)) +
      stage('sm · solo texto', row(sm)) +
      stage('con ícono', row([
        '<span class="pill pill-pos"><iconify-icon icon="iconoir:check" width="11"></iconify-icon>Verificada</span>',
        '<span class="pill pill-warn"><iconify-icon icon="iconoir:warning-triangle" width="11"></iconify-icon>Conflicto</span>',
        '<span class="pill pill-accent"><iconify-icon icon="iconoir:star-solid" width="11"></iconify-icon>Cliente</span>',
      ])) +
    '</div>' +
    block('Nota sobre la variante paused', '',
      '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:var(--ink-2)">' +
        '<li>La clase <code style="font-family:var(--font-mono);font-size:11px">.pill-paused</code> está declarada en <code style="font-family:var(--font-mono);font-size:11px">components.css</code> (fondo <code style="font-family:var(--font-mono);font-size:11px">--paused-bg</code>, texto <code style="font-family:var(--font-mono);font-size:11px">--paused-ink</code>).</li>' +
        '<li>Es el estado para <b>usuarios inactivos en A1 Usuarios</b> — no se usa para el estado de ópticas.</li>' +
      '</ul>');
  }
  function pillPreview() {
    return '<div style="display:flex;flex-direction:column;gap:8px;align-items:center"><span class="pill pill-pos"><span class="pill-dot"></span>Activa</span><span class="pill pill-warn"><span class="pill-dot"></span>Conflicto</span></div>';
  }

  function kpiCard(label, value, delta, deltaType, sub, link) {
    return '<div class="card card-compact" style="margin:0">' +
      '<div style="display:flex;justify-content:space-between;align-items:start">' +
        '<div class="eyebrow-t">' + enc(label) + '</div>' +
        (link ? '<iconify-icon icon="iconoir:arrow-right" width="15" style="color:var(--muted-2)"></iconify-icon>' : '') + '</div>' +
      '<div class="kpi-value-md" style="margin-top:8px">' + enc(value) + '</div>' +
      (delta ? '<div class="kpi-delta ' + deltaType + '" style="margin-top:6px"><iconify-icon icon="iconoir:' + (deltaType === 'pos' ? 'arrow-up' : 'arrow-down') + '" width="12"></iconify-icon>' + enc(delta) + '</div>' : '') +
      (sub ? '<div class="kpi-subtitle">' + enc(sub) + '</div>' : '') +
    '</div>';
  }
  function kpiDetail() {
    return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:var(--space-4)">' +
      stage('Valor solo', kpiCard('Ópticas totales', '18.234', '', '', ''), true) +
      stage('Delta positivo', kpiCard('Partners', '3.142', '+12.4%', 'pos', ''), true) +
      stage('Delta negativo', kpiCard('Sin web', '1.087', '−3.1%', 'neg', ''), true) +
      stage('Con subtítulo', kpiCard('Valoración media', '4.4★', '', '', 'sobre 5 · 12.8K reseñas'), true) +
      stage('Valor con unidad inline', '<div style="display:flex;gap:var(--space-4);flex-wrap:wrap">' + kpiCard('Valoración', '4.4★', '', '', '') + kpiCard('Reseñas', '1,2M', '', '', '') + '</div>', true) +
      stage('Clickeable (link)', kpiCard('Reseñas', '1,2M', '', '', '', true), true) +
    '</div>';
  }
  function kpiPreview() {
    return kpiCard('Partners', '3.142', '+12.4%', 'pos', '');
  }

  function tableMock(ultra) {
    var rows = [
      ['Óptica San Carlos', 'Madrid', '4.8', 'cliente', 'override'],
      ['Visionlab Diagonal', 'Barcelona', '4.6', 'cliente', ''],
      ['Óptica Pérez & Hijos', 'Valencia', '4.2', 'mercado', ''],
      ['Multiópticas Sevilla', 'Sevilla', '4.5', 'cliente', ''],
    ];
    var head = '<thead><tr><th class="sortable sorted col-sticky">Nombre <span class="sort-icon"><iconify-icon icon="iconoir:nav-arrow-down" width="12"></iconify-icon></span></th><th>Ciudad</th><th style="width:64px">Rating</th><th style="width:90px">Tipo</th><th style="width:54px;text-align:center">Web</th></tr></thead>';
    var body = rows.map(function (r, i) {
      return '<tr' + (i === 0 ? ' class="selected"' : '') + '>' +
        '<td class="col-sticky">' + enc(r[0]) + (r[4] ? ' <iconify-icon icon="iconoir:edit-pencil" width="12" style="color:var(--accent-ink-deep);vertical-align:-1px" title="override"></iconify-icon>' : '') + '</td>' +
        '<td class="c-muted">' + enc(r[1]) + '</td>' +
        '<td class="tnum">★ ' + enc(r[2]) + '</td>' +
        '<td>' + (r[3] === 'cliente' ? '<span class="pill pill-pos pill-sm">Cliente</span>' : '<span class="pill pill-neutral pill-sm">Mercado</span>') + '</td>' +
        '<td style="text-align:center">' + (i !== 2 ? '<iconify-icon icon="iconoir:check" width="14" style="color:var(--pos-ink)"></iconify-icon>' : '<iconify-icon icon="iconoir:minus" width="14" style="color:var(--muted-2)"></iconify-icon>') + '</td>' +
      '</tr>';
    }).join('');
    return '<div class="table-wrap"><table class="table-dense' + (ultra ? ' table-ultra' : '') + '">' + head + '<tbody>' + body + '</tbody></table></div>';
  }
  function tableDenseDetail() {
    return block('Tabla densa · filas 40px', 'fila normal · seleccionada · badge Cliente · override · ordenación · presencia',
      stage('', tableMock(false), true)) +
      block('Columna sticky', '',
        '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:var(--ink-2)">' +
          '<li>La clase <code style="font-family:var(--font-mono);font-size:11px">.col-sticky</code> fija la <b>primera columna</b> cuando la tabla tiene scroll horizontal.</li>' +
          '<li>El <b>encabezado</b> correspondiente lleva también la clase <code style="font-family:var(--font-mono);font-size:11px">.col-sticky</code>.</li>' +
          '<li>La <b>sombra de separación</b> entre la columna fija y el contenido desplazado es automática vía CSS.</li>' +
          '<li>Se usa en <b>V4 Base de datos</b>, donde la tabla supera el ancho del contenedor.</li>' +
        '</ul>');
  }
  function tableDensePreview() {
    return '<div style="width:100%;transform:scale(.78);transform-origin:center">' + tableMock(false) + '</div>';
  }
  function tableUltraDetail() {
    return block('Tabla ultra · filas 32px', 'Changelog, Logs — misma estructura, altura reducida',
      stage('', tableMock(true), true));
  }
  function tableUltraPreview() {
    return '<div style="width:100%;transform:scale(.78);transform-origin:center">' + tableMock(true) + '</div>';
  }

  function presenceDetail() {
    return block('Chip de presencia', 'con web / sin web / con tel / sin tel (iconos de V4)',
      stage('', samples([
        sample('con web', '<span class="sg-presence on"><iconify-icon icon="iconoir:globe" width="13"></iconify-icon>Web</span>'),
        sample('sin web', '<span class="sg-presence off"><iconify-icon icon="iconoir:globe" width="13"></iconify-icon>Sin web</span>'),
        sample('con tel', '<span class="sg-presence on"><iconify-icon icon="iconoir:phone" width="13"></iconify-icon>Tel</span>'),
        sample('sin tel', '<span class="sg-presence off"><iconify-icon icon="iconoir:phone" width="13"></iconify-icon>Sin tel</span>'),
      ])));
  }
  function presencePreview() {
    return '<div style="display:flex;flex-direction:column;gap:8px"><span class="sg-presence on"><iconify-icon icon="iconoir:globe" width="13"></iconify-icon>Web</span><span class="sg-presence off"><iconify-icon icon="iconoir:phone" width="13"></iconify-icon>Sin tel</span></div>';
  }

  function bar(pct, cls, label) {
    return '<div style="display:flex;align-items:center;gap:var(--space-3)"><div class="sg-bar ' + (cls || '') + '" style="flex:1;max-width:220px"><span style="width:' + pct + '%"></span></div><span style="font-size:12px;font-weight:600;color:var(--ink-2);font-variant-numeric:tabular-nums;width:42px">' + label + '</span></div>';
  }
  function scoreDetail() {
    return block('Score bar', 'barra de progreso inline en tabla (S3 de BI)',
      stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' +
        bar(86, '', '86') + bar(54, '', '54') + bar(28, 'is-neg', '28') + '</div>'));
  }
  function scorePreview() {
    return '<div style="width:200px;display:flex;flex-direction:column;gap:10px">' + bar(86, '', '86') + bar(42, 'is-neg', '42') + '</div>';
  }

  function progressDetail() {
    return block('Progress bar', 'la de A3 Revisión',
      stage('', '<div style="max-width:360px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="label-md">Revisión de conflictos</span><span class="body-sm c-muted">142 / 234</span></div><div class="sg-bar" style="height:8px"><span style="width:61%"></span></div></div>'));
  }
  function progressPreview() {
    return '<div style="width:200px"><div class="sg-bar" style="height:8px"><span style="width:61%"></span></div></div>';
  }

  /* ══════════════════════════════════════════════════════════
     MARCADORES Y MAPA
  ══════════════════════════════════════════════════════════ */

  function markerDetail() {
    return block('Marcador de mapa', 'partner (lima) / otra óptica (gris) / nuevo con halo',
      stage('', '<div style="display:flex;gap:var(--space-8);align-items:center;padding:var(--space-4) var(--space-5)">' +
        ['partner', 'other', 'new'].map(function (k) {
          var lbl = k === 'partner' ? 'Partner' : k === 'other' ? 'Otra óptica' : 'Nuevo (halo)';
          return '<div style="display:flex;flex-direction:column;align-items:center;gap:14px"><span class="sg-marker ' + k + '"></span><span class="sg-sample-cap">' + lbl + '</span></div>';
        }).join('') + '</div>'));
  }
  function markerPreview() {
    return '<div style="display:flex;gap:22px;align-items:center;padding-top:8px"><span class="sg-marker partner"></span><span class="sg-marker other"></span><span class="sg-marker new"></span></div>';
  }

  function mapPopup(tel, web) {
    return '<div class="sg-mappop">' +
      '<div class="sg-mappop-head"><div style="display:flex;justify-content:space-between;align-items:start;gap:8px"><div style="font-family:var(--font-display);font-weight:600;font-size:13px">Óptica San Carlos</div><span class="pill pill-pos pill-sm">Cliente</span></div><div class="body-xs c-muted" style="margin-top:2px">Calle Mayor 24, Madrid</div></div>' +
      '<div class="sg-mappop-row"><iconify-icon icon="iconoir:star-solid" width="13" style="color:var(--accent-ink-deep)"></iconify-icon>4.8 · 324 reseñas</div>' +
      (tel ? '<div class="sg-mappop-row"><iconify-icon icon="iconoir:phone" width="13"></iconify-icon>+34 91 234 56 78</div>' : '') +
      (web ? '<div class="sg-mappop-row"><iconify-icon icon="iconoir:globe" width="13"></iconify-icon>opticasancarlos.es</div>' : '') +
    '</div>';
  }
  function popupDetail() {
    return '<div class="sg-cols">' +
      stage('Con todos los datos', mapPopup(true, true)) +
      stage('Sin teléfono', mapPopup(false, true)) +
      stage('Sin web', mapPopup(true, false)) +
    '</div>';
  }
  function popupPreview() {
    return '<div style="transform:scale(.82)">' + mapPopup(true, true) + '</div>';
  }

  function mapListItem(partner) {
    return '<div class="sg-maplist"><span class="sg-maplist-dot" style="background:' + (partner ? 'var(--accent)' : 'var(--muted-2)') + '"></span>' +
      '<div style="flex:1"><div class="body-sm" style="font-weight:500">' + (partner ? 'Óptica San Carlos' : 'Óptica del Sol') + '</div><div class="body-xs c-muted">Madrid · ★ ' + (partner ? '4.8' : '4.1') + '</div></div>' +
      (partner ? '<span class="pill pill-pos pill-sm">Partner</span>' : '<span class="pill pill-neutral pill-sm">Mercado</span>') + '</div>';
  }
  function mapItemDetail() {
    return block('Item de lista del mapa', 'partner / no partner',
      stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-3);max-width:380px">' + mapListItem(true) + mapListItem(false) + '</div>'));
  }
  function mapItemPreview() {
    return '<div style="width:220px;display:flex;flex-direction:column;gap:8px">' + mapListItem(true) + mapListItem(false) + '</div>';
  }

  /* ══════════════════════════════════════════════════════════
     REGISTRO
  ══════════════════════════════════════════════════════════ */
  function reg(id, cat, title, desc, file, preview, detail, extra) {
    var e = { id: id, group: 'componentes', cat: cat, title: title, desc: desc, file: file, tag: 'Componente', tagIcon: 'component', preview: preview, detail: detail };
    if (extra) for (var k in extra) e[k] = extra[k];
    SG.reg(e);
  }

  // Acciones
  reg('button', 'Acciones', 'Button', 'primary / ghost / subtle / destructive / icon-only × sm·md·lg, disabled, con ícono, loading.', 'components.css §5', buttonPreview, buttonDetail);
  reg('toggle', 'Acciones', 'Toggle', 'on / off / disabled. Aparece en V5 Tab Estado.', 'components.css §7', function () { return toggle(true, false, 'Activa'); }, toggleDetail);
  reg('chip-filtro', 'Acciones', 'Chip de filtro', 'con valor / eliminable / limpiar todo.', 'components.css §17', chipPreview, chipDetail);

  // Feedback y estado
  reg('toast', 'Feedback y estado', 'Toast', 'success / error / warn / info × con o sin subtítulo.', 'components.css §13', toastPreview, toastDetail);
  reg('empty', 'Feedback y estado', 'Empty state', 'BBDD vacía / sin resultados / sin permisos.', 'components.css §19', emptyPreview, emptyDetail);
  reg('error', 'Feedback y estado', 'Error state', 'con retry / sin retry.', 'components.css §19', function () { return errorBox(true).replace('min-height:200px', 'min-height:120px'); }, errorDetail);
  reg('skeleton', 'Feedback y estado', 'Skeleton', 'KPI card / fila de tabla / chart card / lista del mapa.', 'components.css §18', skeletonPreview, skeletonDetail);
  reg('banner', 'Feedback y estado', 'Banner persistente', 'sync en curso (el único caso actual).', 'components.css §20', bannerPreview, bannerDetail);
  reg('badge-notif', 'Feedback y estado', 'Badge de notificación', 'sobre ícono de nav (sidebar admin).', 'styleguide.css', badgePreview, badgeDetail);
  reg('tooltip', 'Feedback y estado', 'Tooltip', 'flotante superior / lateral del rail — tinta + texto blanco + flecha (DS v3.2).', 'components.css §14', tooltipPreview, tooltipDetail);

  // Formularios
  reg('input', 'Formularios', 'Input text', 'default / focus / error / disabled / con ícono / con limpiar.', 'components.css §7', inputPreview, inputDetail);
  reg('input-date', 'Formularios', 'Input fecha', 'input[type=date] unitario (md/sm/disabled) + par desde/hasta con guión (A5 Logs).', 'components.css §7', inputDatePreview, inputDateDetail);
  reg('select', 'Formularios', 'Select', 'md / sm / disabled.', 'components.css §7', selectPreview, selectDetail);
  reg('textarea', 'Formularios', 'Textarea', 'default / con contador de caracteres.', 'components.css §7', textareaPreview, textareaDetail);
  reg('radio', 'Formularios', 'Radio', 'seleccionado / no seleccionado / disabled.', 'components.css §7', radioPreview, radioDetail);
  reg('checkbox', 'Formularios', 'Checkbox', 'marcado / no marcado / indeterminado / disabled.', 'components.css §7', checkPreview, checkDetail, { mounted: checkMounted });
  reg('slider', 'Formularios', 'Slider', 'valoración mínima (el único caso actual).', 'components.css §7', sliderPreview, sliderDetail);
  reg('form-group', 'Formularios', 'Form group', 'label + input / + hint / + error.', 'components.css §7', formGroupPreview, formGroupDetail);

  // Contenedores
  reg('card', 'Contenedores', 'Card', 'estándar / accent / compact / con card-head / clickeable (KPI link).', 'components.css §8', cardPreview, cardDetail);
  reg('modal', 'Contenedores', 'Modal', 'base / confirmación destructiva / formulario corto / corregir dato.', 'components.css §11', modalPreview, modalDetail);
  reg('drawer', 'Contenedores', 'Drawer', 'base / con tabs / empty state dentro del drawer.', 'components.css §12', drawerPreview, drawerDetail);
  reg('popover', 'Contenedores', 'Popover', 'filtros de V4 (el único caso actual).', 'styleguide.css', popoverPreview, popoverDetail);
  reg('flyout', 'Contenedores', 'Flyout', 'menú admin del sidebar.', 'components.css §4', flyoutPreview, flyoutDetail);
  reg('row-menu', 'Contenedores', 'Menú contextual de fila', '⋯ por fila (A1 Usuarios / A4 Cadenas) · sin acción destructiva / con eliminar · visible en hover.', 'views.css', rowmenuPreview, rowmenuDetail);

  // Navegación
  reg('rail', 'Navegación', 'Sidebar rail', 'colapsable 64↔240 (toggle chevrón) · activo con barra de acento / hover / con badge / rol user vs admin.', 'components.css §4', railPreview, railDetail);
  reg('tabs', 'Navegación', 'Tabs', 'las 5 del drawer V5 / con contador (badge en Cambios).', 'components.css §15', tabsPreview, tabsDetail);
  reg('anchor', 'Navegación', 'Anchor nav', 'barra sticky de V2 BI / ítem activo por scroll.', 'styleguide.css', anchorPreview, anchorDetail);
  reg('subnav-admin', 'Navegación', 'Subnav admin', 'navegación horizontal de /admin/* · normal / activo / con badge de pendientes / set completo.', 'admin-shared.js', subnavPreview, subnavDetail);
  reg('pagination', 'Navegación', 'Paginación', 'numerada con elipsis / primera / última página.', 'components.css §16', pagiPreview, pagiDetail);
  reg('breadcrumb', 'Navegación', 'Breadcrumb', 'no aplica en este producto (jerarquía plana).', '—', breadcrumbPreview, breadcrumbDetail);

  // Datos y visualización
  reg('pill', 'Datos y visualización', 'Pill / Badge', 'accent / pos / neg / warn / neutral / paused × lg·sm × dot·ícono·texto.', 'components.css §6', pillPreview, pillDetail);
  reg('kpi', 'Datos y visualización', 'KPI card', 'valor solo / delta + / delta − / subtítulo / clickeable.', 'components.css §8', kpiPreview, kpiDetail);
  reg('table-dense', 'Datos y visualización', 'Tabla densa', 'fila normal · badge Cliente · override · hover · sticky · ordenación · presencia.', 'components.css §10', tableDensePreview, tableDenseDetail);
  reg('table-ultra', 'Datos y visualización', 'Tabla ultra', 'igual que densa pero 32px (Changelog, Logs).', 'components.css §10', tableUltraPreview, tableUltraDetail);
  reg('presence', 'Datos y visualización', 'Chip de presencia', 'con web / sin web / con tel / sin tel.', 'styleguide.css', presencePreview, presenceDetail);
  reg('score', 'Datos y visualización', 'Score bar', 'barra de progreso inline en tabla (S3 de BI).', 'styleguide.css', scorePreview, scoreDetail);
  reg('progress', 'Datos y visualización', 'Progress bar', 'la de A3 Revisión.', 'styleguide.css', progressPreview, progressDetail);

  // Marcadores y mapa
  reg('marker', 'Marcadores y mapa', 'Marcador de mapa', 'partner (lima) / otra óptica (gris) / nuevo con halo.', 'mapa.js', markerPreview, markerDetail);
  reg('map-popup', 'Marcadores y mapa', 'Popup de mapa', 'con todos los datos / sin teléfono / sin web.', 'mapa.js', popupPreview, popupDetail);
  reg('map-item', 'Marcadores y mapa', 'Item de lista del mapa', 'partner / no partner.', 'mapa.js', mapItemPreview, mapItemDetail);
})();
