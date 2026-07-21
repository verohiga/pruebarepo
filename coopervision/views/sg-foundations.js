/* ════════════════════════════════════════════════════════════════
   views/sg-foundations.js  ·  Fundamentos (5 cards)
   Colores · Tipografía · Espaciado · Iconos · Radios y sombras
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var SG = window.cpvSG;
  var enc = SG.enc;

  /* ── COLORES ─────────────────────────────────────────────── */
  function swatch(bg, border, token, value) {
    var b = border || 'rgba(0,0,0,.08)';
    return '<div style="display:flex;flex-direction:column;gap:6px">' +
      '<div style="width:56px;height:56px;background:' + bg + ';border:1px solid ' + b + ';border-radius:var(--radius-md)"></div>' +
      '<div style="font-size:11px;font-weight:600;color:var(--ink-2);max-width:84px;word-break:break-all">' + enc(token) + '</div>' +
      '<div style="font-family:var(--font-mono);font-size:10px;color:var(--muted)">' + enc(value) + '</div>' +
    '</div>';
  }
  function swatchGroup(label, items) {
    return SG.block(label, '', SG.stage('', SG.samples(items)));
  }
  function coloresDetail() {
    return swatchGroup('Acento', [
      swatch('#C5E817', null, '--accent', '#C5E817'),
      swatch('#282A2D', null, '--accent-ink', '#282A2D'),
      swatch('rgba(197,232,23,.18)', 'rgba(197,232,23,.4)', '--accent-soft', '.18'),
      swatch('#3F4E07', null, '--accent-ink-deep', '#3F4E07'),
    ]) + swatchGroup('Neutrales', [
      swatch('#282A2D', null, '--ink', '#282A2D'),
      swatch('#4A4C4F', null, '--ink-2', '#4A4C4F'),
      swatch('#7E8084', null, '--muted', '#7E8084'),
      swatch('#A8AAAE', null, '--muted-2', '#A8AAAE'),
      swatch('#C5C8CC', null, '--line', '#C5C8CC'),
      swatch('#E7EAEE', '#C5C8CC', '--line-2', '#E7EAEE'),
      swatch('#FFFFFF', '#C5C8CC', '--bg / --card', '#FFFFFF'),
    ]) + swatchGroup('Semánticos', [
      swatch('#10B981', null, '--pos', '#10B981'),
      swatch('#D1FAE5', '#10B981', '--pos-soft', '#D1FAE5'),
      swatch('#047857', null, '--pos-ink', '#047857'),
      swatch('#F43F5E', null, '--neg', '#F43F5E'),
      swatch('#FFE4E6', '#F43F5E', '--neg-soft', '#FFE4E6'),
      swatch('#BE123C', null, '--neg-ink', '#BE123C'),
      swatch('#FEF3C7', '#D97706', '--warn-bg', '#FEF3C7'),
      swatch('#92400E', null, '--warn-ink', '#92400E'),
      swatch('#E5E7EB', '#C5C8CC', '--paused-bg', '#E5E7EB'),
      swatch('#6B7280', null, '--paused-ink', '#6B7280'),
    ]);
  }
  function coloresPreview() {
    var s = function (bg, br) { return '<div style="width:34px;height:34px;border-radius:var(--radius-sm);background:' + bg + ';border:1px solid ' + (br || 'rgba(0,0,0,.08)') + '"></div>'; };
    return '<div style="display:grid;grid-template-columns:repeat(4,34px);gap:8px">' +
      s('#C5E817') + s('#282A2D') + s('#10B981') + s('#F43F5E') +
      s('#7E8084') + s('#FEF3C7', '#D97706') + s('#D1FAE5', '#10B981') + s('#FFFFFF', '#C5C8CC') +
    '</div>';
  }

  /* ── TIPOGRAFÍA ──────────────────────────────────────────── */
  function tipoRow(cls, sample, meta) {
    return '<div style="display:grid;grid-template-columns:1fr 260px;gap:var(--space-5);align-items:center;padding:var(--space-4) 0;border-bottom:1px solid var(--line-2)">' +
      '<span class="' + cls + '">' + enc(sample) + '</span>' +
      '<div style="font-size:11px;color:var(--muted);display:flex;flex-direction:column;gap:2px;text-align:right">' +
        '<span style="font-weight:600;color:var(--ink-2)">.' + cls + '</span>' +
        '<span style="font-family:var(--font-mono)">' + enc(meta) + '</span>' +
      '</div>' +
    '</div>';
  }
  function tipografiaDetail() {
    return SG.stage('Escala (DS §2.2)',
      tipoRow('display-xl', 'Plataforma Ópticas Iberia', 'Outfit 32px/700 · display') +
      tipoRow('display-lg', 'Base de datos maestra', 'Outfit 24px/700 · display') +
      tipoRow('display-md', 'Gestión de usuarios', 'Outfit 20px/600 · subtítulos') +
      tipoRow('kpi-xl', '18.234', 'Outfit 36px/700 · KPI grande') +
      tipoRow('kpi-md', '3.142', 'Outfit 24px/700 · KPI medio') +
      tipoRow('body-md', 'Datos de ópticas actualizados', 'Inter 14px/400 · cuerpo') +
      tipoRow('body-sm', 'Última sync hace 12 días · 18.234 registros', 'Inter 13px/400 · secundario') +
      tipoRow('body-xs', 'place_id · Metadata · Timestamps', 'Inter 12px/400 · metadatos') +
      tipoRow('label-md', 'Filtrar por provincia', 'Inter 13px/500 · labels') +
      tipoRow('label-sm', 'Solo clientes', 'Inter 12px/500 · labels sm') +
      tipoRow('eyebrow-t', 'Administración', 'Inter 11px/600 UPPER · eyebrows') +
      tipoRow('mono-sm', 'ChIJ_madrid_001 · CPV-08234', 'JetBrains Mono 12px · IDs'));
  }
  function tipoPreview() {
    return '<div style="display:flex;flex-direction:column;gap:4px;align-items:flex-start">' +
      '<span class="display-lg">Aa Editorial</span>' +
      '<span class="body-sm c-muted">Outfit · Inter · JetBrains Mono</span>' +
      '<span class="mono-sm" style="color:var(--muted-2)">CPV-08234</span>' +
    '</div>';
  }

  /* ── ESPACIADO ───────────────────────────────────────────── */
  function espaciadoDetail() {
    var tokens = [
      ['--space-1', '4px'], ['--space-2', '8px'], ['--space-3', '12px'], ['--space-4', '14px'],
      ['--space-5', '16px'], ['--space-6', '20px'], ['--space-7', '26px'], ['--space-8', '32px'],
    ];
    return SG.stage('Escala de espaciado',
      '<div style="display:flex;flex-direction:column;gap:var(--space-3)">' +
      tokens.map(function (t) {
        var px = parseInt(t[1], 10);
        return '<div style="display:grid;grid-template-columns:100px 48px 1fr;align-items:center;gap:var(--space-5)">' +
          '<span style="font-family:var(--font-mono);font-size:11px;color:var(--ink-2)">' + enc(t[0]) + '</span>' +
          '<span style="font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums">' + enc(t[1]) + '</span>' +
          '<div style="height:' + Math.max(px, 4) + 'px;width:' + (px * 5) + 'px;background:var(--accent);border-radius:var(--radius-xs)"></div>' +
        '</div>';
      }).join('') + '</div>');
  }
  function espaciadoPreview() {
    return '<div style="display:flex;align-items:flex-end;gap:8px">' +
      [4, 8, 12, 16, 20, 26].map(function (px) {
        return '<div style="width:' + px + 'px;height:' + (px * 2.2) + 'px;background:var(--accent);border-radius:var(--radius-xs)"></div>';
      }).join('') + '</div>';
  }

  /* ── ICONOS ──────────────────────────────────────────────── */
  var ICONS = [
    'home-simple', 'graph-up', 'map-pin', 'database', 'clock-rotate-right',
    'group', 'refresh-double', 'warning-circle', 'network-left', 'page',
    'user', 'view-grid', 'check-circle', 'xmark', 'warning-triangle',
    'plus', 'edit-pencil', 'trash', 'download', 'search',
    'filter', 'arrow-right', 'more-horiz', 'check', 'star-solid',
    'log-in', 'log-out', 'settings', 'nav-arrow-left', 'nav-arrow-right',
    'lock', 'mail', 'calendar', 'eye', 'eye-closed', 'expand',
  ];
  function iconosDetail() {
    return SG.stage('Librería Iconoir · stroke 1.5',
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:var(--space-3)">' +
      ICONS.map(function (icon) {
        return '<div style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:var(--space-4) var(--space-3);border:1px solid var(--line-2);border-radius:var(--radius-md)">' +
          '<iconify-icon icon="iconoir:' + enc(icon) + '" width="24" style="color:var(--ink-2)"></iconify-icon>' +
          '<span style="font-size:10px;color:var(--muted);text-align:center;word-break:break-all;font-family:var(--font-mono);line-height:1.3">' + enc(icon) + '</span>' +
        '</div>';
      }).join('') + '</div>');
  }
  function iconosPreview() {
    return '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;color:var(--ink-2)">' +
      ['home-simple', 'graph-up', 'map-pin', 'database', 'group', 'view-grid', 'search', 'settings'].map(function (i) {
        return '<iconify-icon icon="iconoir:' + i + '" width="22"></iconify-icon>';
      }).join('') + '</div>';
  }

  /* ── RADIOS Y SOMBRAS ────────────────────────────────────── */
  function radiosDetail() {
    var radii = [
      ['--radius-xs', '3px'], ['--radius-sm', '6px'], ['--radius-md', '8px'], ['--radius-lg', '10px'],
      ['--radius-xl', '14px'], ['--radius-2xl', '30px'], ['--radius-full', '99px'],
    ];
    var radiiHTML = '<div style="display:flex;flex-wrap:wrap;gap:var(--space-5)">' +
      radii.map(function (r) {
        return '<div style="display:flex;flex-direction:column;gap:8px;align-items:center">' +
          '<div style="width:64px;height:64px;background:var(--accent-soft);border:1.5px solid var(--accent);border-radius:var(' + r[0] + ')"></div>' +
          '<div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-2)">' + enc(r[0]) + '</div>' +
          '<div style="font-family:var(--font-mono);font-size:10px;color:var(--muted)">' + enc(r[1]) + '</div>' +
        '</div>';
      }).join('') + '</div>';

    var shadows = [
      ['--shadow-e1', 'e1 · reposo (cards, inputs)'],
      ['--shadow-e2', 'e2 · elevado (dropdowns, toasts)'],
      ['--shadow-e3', 'e3 · overlay (modal, drawer)'],
    ];
    var shadowsHTML = '<div style="display:flex;flex-wrap:wrap;gap:var(--space-7);padding:var(--space-4) 0">' +
      shadows.map(function (s) {
        return '<div style="display:flex;flex-direction:column;gap:12px;align-items:center">' +
          '<div style="width:120px;height:72px;background:var(--card);border:1px solid var(--line-2);border-radius:var(--radius-lg);box-shadow:var(' + s[0] + ')"></div>' +
          '<div style="text-align:center"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-2)">' + enc(s[0]) + '</div>' +
          '<div style="font-size:11px;color:var(--muted);margin-top:2px">' + enc(s[1].split('·')[1]) + '</div></div>' +
        '</div>';
      }).join('') +
      '<div style="display:flex;flex-direction:column;gap:12px;align-items:center">' +
        '<div style="width:120px;height:72px;background:var(--card);border:1px solid var(--accent);border-radius:var(--radius-lg);box-shadow:var(--shadow-focus)"></div>' +
        '<div style="text-align:center"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-2)">--shadow-focus</div>' +
        '<div style="font-size:11px;color:var(--muted);margin-top:2px">anillo de foco</div></div>' +
      '</div>' +
    '</div>';

    return SG.block('Radios', 'de 3px a totalmente redondeado (99px)', SG.stage('', radiiHTML)) +
      SG.block('Sombras / elevación', 'separación por elevación, no por color de fondo', SG.stage('', shadowsHTML));
  }
  function radiosPreview() {
    return '<div style="display:flex;gap:14px;align-items:center">' +
      '<div style="width:46px;height:46px;background:var(--accent-soft);border:1.5px solid var(--accent);border-radius:3px"></div>' +
      '<div style="width:46px;height:46px;background:var(--accent-soft);border:1.5px solid var(--accent);border-radius:10px"></div>' +
      '<div style="width:46px;height:46px;background:var(--card);border:1px solid var(--line-2);border-radius:10px;box-shadow:var(--shadow-e2)"></div>' +
    '</div>';
  }

  /* ── Registro ────────────────────────────────────────────── */
  SG.reg({ id: 'colores', group: 'fundamentos', title: 'Colores', tag: 'Tokens', tagIcon: 'palette', file: 'tokens.css',
    desc: 'Acento lima + neutrales Black 500→Gray 400 + semánticos pos/neg/warn/paused.',
    descLong: 'Acento lima #C5E817 con derivados ink/soft/deep, rampa neutra de Black 500 a Gray 400, y la paleta semántica (positivo, negativo, aviso, pausado) cada una con su soft e ink.',
    preview: coloresPreview, detail: coloresDetail });

  SG.reg({ id: 'tipografia', group: 'fundamentos', title: 'Tipografía', tag: 'Tokens', tagIcon: 'text', file: 'tokens.css §2.2',
    desc: 'Outfit (display/KPI) · Inter (cuerpo/labels) · JetBrains Mono (IDs).',
    descLong: 'Tres familias: Outfit para titulares y KPIs, Inter para cuerpo y labels, JetBrains Mono para identificadores. Doce niveles de escala.',
    preview: tipoPreview, detail: tipografiaDetail });

  SG.reg({ id: 'espaciado', group: 'fundamentos', title: 'Espaciado', tag: 'Tokens', tagIcon: 'ruler-combine', file: 'tokens.css',
    desc: 'Escala de 4px a 32px en 8 pasos (--space-1 … --space-8).',
    descLong: 'Escala de espaciado de ocho pasos, de 4px a 32px, usada para padding, gap y márgenes en todo el sistema.',
    preview: espaciadoPreview, detail: espaciadoDetail });

  SG.reg({ id: 'iconos', group: 'fundamentos', title: 'Iconos', tag: 'Librería', tagIcon: 'view-grid', file: 'Iconoir',
    desc: 'Set Iconoir con stroke 1.5. Tamaños 13–24px según contexto.',
    descLong: 'Iconografía de la librería Iconoir, trazo 1.5. Inventario de los iconos usados en navegación, acciones, estados y datos.',
    preview: iconosPreview, detail: iconosDetail });

  SG.reg({ id: 'radios', group: 'fundamentos', title: 'Radios y sombras', tag: 'Tokens', tagIcon: 'rounded-corner', file: 'tokens.css',
    desc: 'Radios 3→99px y elevación e1/e2/e3 + anillo de foco.',
    descLong: 'Radios de esquina de 3px a totalmente redondeado, y tres niveles de sombra (reposo, elevado, overlay) más el anillo de foco accesible.',
    preview: radiosPreview, detail: radiosDetail });
})();
