/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/bi.js — V2 Business Intelligence
   Registra window.cpvViews['/bi']. Scroll vertical largo, 7 secciones
   con nav de anclas sticky. Charts SVG a mano vía cpvCharts.
   Enfoque MIXTO de datos:
     · nube sintética (seeded, ~230 pts) en scatter S4 y cuadrantes S5
       — superpuesta con las 40 ópticas reales (clicables, place_id)
     · datos reales de mockData en rankings y tablas (S3, S6, S7)
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const C = window.cpvCharts;
  const enc = C._enc;

  /* ── formato es-ES manual ──────────────────────────────────── */
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

  /* ── RNG determinista (mulberry32) ─────────────────────────── */
  function rngFrom(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* ── nube sintética + reales (cache por sesión de render) ──── */
  let _cloud = null;
  function buildCloud(md) {
    if (_cloud) return _cloud;
    const rng = rngFrom(20260512);
    const rngC = rngFrom(77001); // asignación de país, independiente del resto
    const pts = [];
    // ~230 sintéticos
    for (let i = 0; i < 230; i++) {
      const client = rng() < 0.172;
      let r = (client ? 4.41 : 4.18) + (rng() - 0.5) * 1.15;
      r = Math.max(2.7, Math.min(5, r));
      const mu = client ? 4.25 : 3.45;
      const rev = Math.max(3, Math.round(Math.exp(mu + (rng() - 0.5) * 2.3)));
      const country = rngC() < 0.875 ? 'ES' : 'PT';
      pts.push({ x: +r.toFixed(2), y: rev, client: client, synthetic: true, country: country,
                 tip: `<b>${client ? 'Partner' : 'Óptica'}</b> · ${fmtDec(r, 1)}★ · ${fmtInt(rev)} reseñas` });
    }
    // 40 reales superpuestas (clicables vía place_id)
    md.opticas_google.forEach((o) => {
      const client = md.helpers.is_client(o.place_id);
      pts.push({ x: o.rating, y: o.reviews, client: client, place_id: o.place_id, country: o.country_code,
                 tip: `<b>${o.name}</b> · ${fmtDec(o.rating, 1)}★ · ${fmtInt(o.reviews)} reseñas` });
    });
    // medias globales (para cuadrantes)
    const mx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
    const my = pts.reduce((s, p) => s + p.y, 0) / pts.length;
    _cloud = { pts: pts, meanX: mx, meanY: my };
    return _cloud;
  }
  function cloudByCountry(cloud, country) {
    if (country === 'todos') return cloud.pts;
    return cloud.pts.filter((p) => p.country === country.toUpperCase());
  }

  /* ── datos Portugal (fabricados, mismo criterio que resumen_kpis ES) ── */
  const PT_PROVINCIAS = [
    { provincia: 'Lisboa',  total: 1450, clientes: 205 },
    { provincia: 'Porto',   total: 1280, clientes: 178 },
    { provincia: 'Braga',   total: 320,  clientes: 42 },
    { provincia: 'Coimbra', total: 210,  clientes: 28 },
    { provincia: 'Faro',    total: 195,  clientes: 24 },
  ];
  const PT_CIUDADES_ENGAGEMENT = [
    { ciudad: 'Lisboa',  reseñas_total: 128325, n_opticas: 1450, ratio: 88.5 },
    { ciudad: 'Porto',   reseñas_total: 101504, n_opticas: 1280, ratio: 79.3 },
    { ciudad: 'Faro',    reseñas_total: 18642,  n_opticas: 195,  ratio: 95.6 },
    { ciudad: 'Braga',   reseñas_total: 20864,  n_opticas: 320,  ratio: 65.2 },
    { ciudad: 'Coimbra', reseñas_total: 14721,  n_opticas: 210,  ratio: 70.1 },
  ];
  const PT_PROVINCIA_SET = PT_PROVINCIAS.reduce((s, p) => (s[p.provincia] = true, s), {});
  function provinciasByCountry(md, country) {
    if (country === 'es') return md.top_provincias;
    if (country === 'pt') return PT_PROVINCIAS;
    return md.top_provincias.concat(PT_PROVINCIAS).sort((a, b) => b.total - a.total);
  }
  function ciudadesByCountry(md, country) {
    if (country === 'es') return md.top_ciudades_engagement;
    if (country === 'pt') return PT_CIUDADES_ENGAGEMENT;
    return md.top_ciudades_engagement.concat(PT_CIUDADES_ENGAGEMENT).sort((a, b) => b.ratio - a.ratio).slice(0, 10);
  }
  function oportunidadesByCountry(md, country) {
    return provinciasByCountry(md, country)
      .map((p) => ({ ...p, no_clientes: p.total - p.clientes, pct_partners: ((p.clientes / p.total) * 100).toFixed(1), oportunidad: p.total * (1 - p.clientes / p.total) }))
      .sort((a, b) => b.oportunidad - a.oportunidad);
  }
  function countrySeg(id, active) {
    const b = (c, l) => `<button data-c="${c}"${c === active ? ' class="on"' : ''}>${l}</button>`;
    return `<div class="cpv-seg" id="${id}" data-filter="${active}">` + b('es', 'España') + b('pt', 'Portugal') + b('todos', 'Todos') + '</div>';
  }

  /* ── helpers de sección ────────────────────────────────────── */
  const SECTIONS = [
    { id: 'hero',          n: '1', label: 'Hero',         title: 'Visión ejecutiva' },
    { id: 'competitive',   n: '2', label: 'Competitivo',  title: 'Partners vs. resto del mercado' },
    { id: 'performers',    n: '3', label: 'Performers',   title: 'Top performers por score compuesto' },
    { id: 'engagement',    n: '4', label: 'Engagement',   title: 'Valoración × volumen de reseñas' },
    { id: 'quadrants',     n: '5', label: 'Cuadrantes',   title: 'Segmentación por cuadrantes' },
    { id: 'digital',       n: '6', label: 'Digital',      title: 'Presencia digital por provincia' },
    { id: 'opportunities', n: '7', label: 'Oportunidades', title: 'Provincias por oportunidad comercial' },
  ];

  function anchorNav() {
    return '<div class="cpv-anchor-nav" id="bi-anchors">' +
      SECTIONS.map((s, i) => `<a class="cpv-anchor-link${i === 0 ? ' on' : ''}" data-anchor="${s.id}">${s.label}</a>`).join('') +
      '</div>';
  }
  function sectionHead(s, sub) {
    return '<div class="cpv-section-head">' +
      `<span class="cpv-section-num">${s.n}</span>` +
      `<div><h2 class="cpv-section-title">${enc(s.title)}</h2>` +
      (sub ? `<p class="cpv-section-sub">${enc(sub)}</p>` : '') + '</div></div>';
  }
  const serieLegend = (items) => '<div class="cpv-serie-legend">' +
    items.map((it) => `<span class="cpv-serie-item"><span class="cpv-serie-dot" style="background:${it.c}"></span>${enc(it.l)}</span>`).join('') + '</div>';

  /* ════ S1 · HERO ════ */
  function s1(md) {
    const k = md.resumen_kpis;
    const s = SECTIONS[0];
    const diff = (k.valoracion_media_clientes - k.valoracion_media_no_clientes);
    // establecimientos por provincia (media + extremos) desde top_provincias
    const tp = md.top_provincias;
    const media = Math.round(k.total_opticas / k.n_provincias);
    const card1 =
      '<div class="card card-accent cpv-hero-kpi">' +
      '<span class="cpv-kpi-head"><span class="eyebrow-t">Penetración CooperVision</span>' +
      '<iconify-icon icon="iconoir:star-solid" width="15" style="color:var(--accent-ink-deep)"></iconify-icon></span>' +
      `<div class="cpv-hero-value">${fmtDec(k.pct_clientes, 1)}%</div>` +
      `<div class="kpi-subtitle">${fmtInt(k.total_clientes)} partners de ${fmtInt(k.total_opticas)} ópticas</div>` +
      '</div>';
    const card2 =
      '<div class="card cpv-hero-kpi">' +
      '<span class="eyebrow-t">Valoración · partners vs. otros</span>' +
      `<div class="cpv-hero-vs"><span class="cpv-hero-value">${fmtDec(k.valoracion_media_clientes, 2)}</span>` +
      `<span class="sub">vs ${fmtDec(k.valoracion_media_no_clientes, 2)}</span></div>` +
      `<div class="kpi-subtitle"><span class="kpi-delta pos"><iconify-icon icon="iconoir:arrow-up-right" width="13"></iconify-icon>+${fmtDec(diff, 2)}</span> a favor de los partners</div>` +
      '</div>';
    const card3 =
      '<div class="card cpv-hero-kpi">' +
      '<span class="eyebrow-t">Establecimientos por provincia</span>' +
      `<div class="cpv-hero-value">${fmtInt(media)}</div>` +
      `<div class="kpi-subtitle">Media · de ${fmtInt(tp[tp.length - 1].total)} (${enc(tp[tp.length - 1].provincia)}) a ${fmtInt(tp[0].total)} (${enc(tp[0].provincia)})</div>` +
      '</div>';
    return `<section class="cpv-section" id="sec-hero" data-screen-label="S1 Hero">` +
      sectionHead(s, 'Lectura de 10 segundos del estado de la red.') +
      '<div class="cpv-hero-grid">' + card1 + card2 + card3 + '</div></section>';
  }

  /* ── S2 · perfil competitivo por país ───────────────────────── */
  const RADAR_AXES = ['Valoración', 'Reseñas', '% Web', '% Teléfono', '% Cita', '% Email'];
  const RADAR_BY_COUNTRY = {
    es: { otras: [84, 52, 68, 92, 14, 31], partners: [92, 78, 86, 97, 29, 64] },
    pt: { otras: [79, 45, 72, 89, 11, 38], partners: [88, 71, 90, 95, 24, 58] },
    todos: { otras: [83, 50, 69, 91, 13, 33], partners: [91, 76, 87, 96, 27, 62] },
  };
  function radarFor(country) {
    const d = RADAR_BY_COUNTRY[country];
    return C.radar({
      size: 300,
      axes: RADAR_AXES,
      series: [
        { name: 'Otras', color: '#A8AAAE', fill: 'rgba(168,170,174,.16)', values: d.otras },
        { name: 'Partners', color: '#8FA710', fill: 'rgba(197,232,23,.28)', values: d.partners },
      ],
    });
  }

  /* ── S2 · reparto por franja de valoración, por país ─────────── */
  const GROUPED_BY_COUNTRY = {
    es:    { labels: ['<3.5', '3.5–3.9', '4.0–4.4', '4.5–5.0'], a: [3, 11, 39, 47],  b: [9, 19, 41, 31] },
    pt:    { labels: ['<3.5', '3.5–3.9', '4.0–4.4', '4.5–5.0'], a: [5, 14, 35, 46],  b: [12, 22, 38, 28] },
    todos: { labels: ['<3.5', '3.5–3.9', '4.0–4.4', '4.5–5.0'], a: [4, 12, 38, 46],  b: [10, 20, 40, 30] },
  };
  function groupedFor(country) {
    const d = GROUPED_BY_COUNTRY[country];
    return C.groupedBars({
      w: 540, h: 270, fmt: (n) => fmtDec(n, 0) + '%',
      groups: d.labels.map((label, i) => ({ label: label, a: d.a[i], b: d.b[i] })),
      tip: (dd, w) => `<b>${dd.label}</b> · ${w === 'a' ? 'Partners' : 'Otras'} ${w === 'a' ? dd.a : dd.b}%`,
    });
  }

  /* ════ S2 · COMPETITIVO ════ */
  function s2(md) {
    const s = SECTIONS[1];
    const radar = radarFor('es');
    const grouped = groupedFor('es');
    return `<section class="cpv-section" id="sec-competitive" data-screen-label="S2 Competitivo">` +
      sectionHead(s, 'Perfil medio normalizado (0–100) y reparto por franja de valoración.') +
      '<div class="cpv-grid-2">' +
      '<div class="card"><div class="card-head"><h3 class="display-md" style="margin:0">Perfil competitivo</h3>' +
      countrySeg('bi-radar-seg', 'es') + '</div>' +
      '<div class="cpv-chart cpv-chart-radar" id="bi-radar-chart">' + radar + '</div>' +
      serieLegend([{ l: 'Partners', c: '#C5E817' }, { l: 'Otras ópticas', c: '#A8AAAE' }]) + '</div>' +
      '<div class="card"><div class="card-head"><h3 class="display-md" style="margin:0">Reparto por franja de valoración</h3>' +
      countrySeg('bi-grouped-seg', 'es') + '</div>' +
      '<div class="cpv-chart" id="bi-grouped-chart">' + grouped + '</div>' +
      serieLegend([{ l: 'Partners', c: '#C5E817' }, { l: 'Otras ópticas', c: '#C7C9CD' }]) + '</div>' +
      '</div></section>';
  }

  /* ════ S3 · TOP PERFORMERS ════ */
  function performersRows(md, country) {
    const pool = country === 'todos' ? md.opticas_google : md.opticas_google.filter((o) => o.country_code === country.toUpperCase());
    return pool.map((o) => ({
      o: o, client: md.helpers.is_client(o.place_id),
      cadena: md.helpers.cadena_de(o.place_id),
      score: o.rating * Math.log(1 + o.reviews),
    })).sort((a, b) => b.score - a.score).slice(0, 20);
  }
  function performersTable(scored) {
    if (!scored.length) {
      return '<tr><td colspan="8"><div class="empty-state" style="min-height:160px">' +
        '<iconify-icon class="empty-state-icon" icon="iconoir:filter-list-xmark" width="26"></iconify-icon>' +
        '<h2 class="state-title" style="font-size:15px">Sin \u00f3pticas para este pa\u00eds</h2></div></td></tr>';
    }
    const max = scored[0].score;
    return scored.map((r, i) => {
      const pct = r.score / max * 100;
      const badge = r.client ? ' <span class="pill pill-accent pill-sm"><span class="pill-dot"></span>Cliente</span>' : '';
      return `<tr data-place-id="${enc(r.o.place_id)}">` +
        `<td class="col-sticky cpv-rank">${i + 1}</td>` +
        `<td><span class="cpv-cell-name">${enc(r.o.name)}</span>${badge}</td>` +
        `<td class="c-ink2">${enc(r.o.city)}</td>` +
        `<td class="c-ink2">${r.cadena ? enc(r.cadena.nombre) : '<span class="cpv-bbdd-cadena-empty">—</span>'}</td>` +
        `<td style="text-align:center">${r.o.booking_appointment_link ? '<a class="cpv-bbdd-booking-link" href="' + enc(r.o.booking_appointment_link) + '" target="_blank" rel="noopener" title="Abrir gestor de cita" aria-label="Abrir gestor de cita"><iconify-icon icon="iconoir:calendar" width="16"></iconify-icon></a>' : '<span class="cpv-bbdd-cadena-empty">—</span>'}</td>` +
        `<td class="tnum" style="text-align:right"><span class="cpv-star">★</span> ${fmtDec(r.o.rating, 2)}</td>` +
        `<td class="tnum c-muted" style="text-align:right">${fmtInt(r.o.reviews)}</td>` +
        `<td><span class="cpv-scorebar"><span class="cpv-scorebar-track"><span class="cpv-scorebar-fill" style="width:${pct.toFixed(0)}%"></span></span>` +
        `<span class="cpv-scorebar-val">${fmtDec(r.score, 1)}</span></span></td>` +
        `</tr>`;
    }).join('');
  }
  function s3(md) {
    const s = SECTIONS[2];
    const rows = performersTable(performersRows(md, 'es'));
    return `<section class="cpv-section" id="sec-performers" data-screen-label="S3 Top Performers">` +
      sectionHead(s, 'Score compuesto = valoración × log(1 + reseñas). Top 20.') +
      '<div class="cpv-section-filter">' + countrySeg('bi-performers-seg', 'es') + '</div>' +
      '<div class="card" style="padding:0;overflow:hidden">' +
      '<div class="table-wrap" style="border:0;border-radius:0;max-height:560px">' +
      '<table class="table-dense"><thead><tr>' +
      '<th class="col-sticky" style="width:48px">#</th><th>Óptica</th><th>Ciudad</th><th>Cadena</th>' +
      '<th style="text-align:center">Gestor de ópticas</th>' +
      '<th style="text-align:right">Valoración</th><th style="text-align:right">Reseñas</th><th>Score compuesto</th>' +
      '</tr></thead><tbody id="bi-performers-body">' + rows + '</tbody></table></div></div></section>';
  }

  /* ════ S4 · ENGAGEMENT ════ */
  function scatterFor(cloud, country) {
    const pts = cloudByCountry(cloud, country);
    return { html: C.scatter({
      w: 560, h: 330, xMin: 2.5, xMax: 5, points: pts,
      xLabel: 'Valoración', yLabel: 'Reseñas (escala log)',
    }), count: pts.length };
  }
  function ciudadHbarFor(md, country) {
    const ciudadesOrd = ciudadesByCountry(md, country).slice().sort((a, b) => b.ratio - a.ratio);
    return C.hbar({
      data: ciudadesOrd, label: 'ciudad', value: 'ratio',
      accentTop: 3, fmt: (n) => fmtDec(n, 0), labelW: 82, w: 540, rowH: 20, gap: 7,
      tip: (d) => `<b>${d.ciudad}</b> · ${fmtDec(d.ratio, 1)} reseñas/óptica · ${fmtInt(d.reseñas_total)} total`,
    });
  }
  function s4(md) {
    const s = SECTIONS[3];
    const cloud = buildCloud(md);
    const sc = scatterFor(cloud, 'es');
    const ciudad = ciudadHbarFor(md, 'es');
    return `<section class="cpv-section" id="sec-engagement" data-screen-label="S4 Engagement">` +
      sectionHead(s, 'Cada punto es una óptica. En verde, partners CooperVision.') +
      '<div class="cpv-section-filter">' + countrySeg('bi-engagement-seg', 'es') + '</div>' +
      '<div class="cpv-grid-2">' +
      '<div class="card"><div class="card-head"><h3 class="display-md" style="margin:0">Valoración × reseñas</h3>' +
      '<span class="body-xs c-muted" id="bi-engagement-count">' + fmtInt(sc.count) + ' ópticas</span></div>' +
      '<div class="cpv-chart" id="bi-scatter-chart">' + sc.html + '</div>' +
      serieLegend([{ l: 'Partners', c: '#C5E817' }, { l: 'Otras ópticas', c: '#C7C9CD' }]) + '</div>' +
      '<div class="card"><div class="card-head"><h3 class="display-md" style="margin:0">Top ciudades por engagement</h3>' +
      '<span class="body-xs c-muted">reseñas / óptica</span></div>' +
      '<div class="cpv-chart" id="bi-ciudad-chart">' + ciudad + '</div></div>' +
      '</div></section>';
  }

  /* ════ S5 · CUADRANTES ════ */
  function quadCounts(pts, mx, my, filter) {
    const c = { tr: 0, tl: 0, br: 0, bl: 0 };
    pts.forEach((p) => {
      if (filter === 'partners' && !p.client) return;
      if (filter === 'otros' && p.client) return;
      const right = p.x >= mx, top = p.y >= my;
      if (top && right) c.tr++; else if (top && !right) c.tl++;
      else if (!top && right) c.br++; else c.bl++;
    });
    return c;
  }
  function s5(md) {
    const s = SECTIONS[4];
    const cloud = buildCloud(md);
    const ptsEs = cloudByCountry(cloud, 'es');
    const yMax = Math.max.apply(null, cloud.pts.map((p) => p.y));
    const chart = C.quadrant({
      w: 560, h: 360, points: ptsEs,
      xMin: 2.5, xMax: 5, yMin: 0, yMax: yMax,
      xMean: cloud.meanX, yMean: cloud.meanY,
      labels: { tr: 'Stars', tl: 'Rising', br: 'Hidden gems', bl: 'Developing' },
    });
    const c = quadCounts(ptsEs, cloud.meanX, cloud.meanY, 'ambos');
    const card = (key, name, desc, cuad) =>
      `<a class="card cpv-quad-card" href="#/bbdd" data-cuadrante="${cuad}">` +
      `<iconify-icon class="cpv-quad-arrow" icon="iconoir:arrow-right" width="16"></iconify-icon>` +
      `<span class="cpv-quad-count" data-quad="${key}">${fmtInt(c[key])}</span>` +
      `<span class="cpv-quad-name">${enc(name)}</span>` +
      `<span class="cpv-quad-desc">${enc(desc)}</span></a>`;
    const cards =
      '<div class="cpv-quad-cards" id="bi-quad-cards">' +
      card('tr', 'Stars', 'Alta valoración · muchas reseñas', 'stars') +
      card('tl', 'Rising', 'Baja valoración · muchas reseñas', 'rising') +
      card('br', 'Hidden gems', 'Alta valoración · pocas reseñas', 'hidden') +
      card('bl', 'Developing', 'Baja valoración · pocas reseñas', 'developing') +
      '</div>';
    return `<section class="cpv-section" id="sec-quadrants" data-screen-label="S5 Cuadrantes">` +
      sectionHead(s, 'Divisiones por la valoración y el nº de reseñas medios del mercado.') +
      '<div class="card"><div class="card-head"><h3 class="display-md" style="margin:0">Mapa de cuadrantes</h3>' +
      '<div style="display:flex;gap:var(--space-3);flex-wrap:wrap">' +
      countrySeg('bi-quad-country-seg', 'es') +
      '<div class="cpv-seg" id="bi-quad-seg" data-filter="ambos">' +
      '<button data-f="ambos" class="on">Ambos</button>' +
      '<button data-f="partners">Solo partners</button>' +
      '<button data-f="otros">Solo otras</button></div></div></div>' +
      '<div class="cpv-chart" id="bi-quad-chart">' + chart + '</div>' +
      serieLegend([{ l: 'Partners', c: '#C5E817' }, { l: 'Otras ópticas', c: '#C7C9CD' }]) + '</div>' +
      cards + '</section>';
  }

  /* ════ S6 · PRESENCIA DIGITAL ════ */
  function digitalRows(md, country) {
    const k = md.resumen_kpis;
    // deriva métricas por provincia desde globales con variación determinista;
    // las filas de Portugal parten de una base algo distinta (mercado más pequeño)
    return provinciasByCountry(md, country).map((p) => {
      const rng = rngFrom(p.provincia.length * 7919 + p.total);
      const isPt = country === 'pt' || (country === 'todos' && PT_PROVINCIA_SET[p.provincia]);
      const baseWeb = isPt ? k.pct_con_web - 6 : k.pct_con_web;
      const baseTel = isPt ? k.pct_con_telefono - 3 : k.pct_con_telefono;
      const baseEmail = isPt ? k.pct_con_email - 5 : k.pct_con_email;
      const web = Math.max(40, Math.min(96, baseWeb + (rng() - 0.5) * 22));
      const tel = Math.max(80, Math.min(99, baseTel + (rng() - 0.5) * 10));
      const email = Math.max(18, Math.min(62, baseEmail + (rng() - 0.5) * 26));
      const baseCita = isPt ? k.pct_con_booking - 3 : k.pct_con_booking;
      const cita = Math.max(3, Math.min(42, baseCita + (rng() - 0.5) * 14));
      const comp = web * 0.4 + tel * 0.3 + email * 0.3;
      return { provincia: p.provincia, total: p.total, web: web, tel: tel, email: email, cita: cita, comp: comp };
    });
  }
  function digitalTable(data) {
    return data.map((d) => {
      return `<tr data-provincia="${enc(d.provincia)}">` +
        `<td class="col-sticky cpv-cell-name">${enc(d.provincia)}</td>` +
        `<td class="tnum" style="text-align:right">${fmtInt(d.total)}</td>` +
        `<td class="tnum" style="text-align:right">${fmtDec(d.web, 1)}%</td>` +
        `<td class="tnum" style="text-align:right">${fmtDec(d.tel, 1)}%</td>` +
        `<td class="tnum" style="text-align:right">${fmtDec(d.cita, 1)}%</td>` +
        `<td class="tnum" style="text-align:right">${fmtDec(d.email, 1)}%</td>` +
        `<td><span class="cpv-prog"><span class="cpv-prog-track"><span class="cpv-prog-fill" style="width:${d.comp.toFixed(0)}%"></span></span>` +
        `<span class="cpv-prog-val">${fmtDec(d.comp, 0)}%</span></span></td>` +
        `</tr>`;
    }).join('');
  }
  function s6(md) {
    const s = SECTIONS[5];
    const data = digitalRows(md, 'es');
    const cols = [
      { k: 'provincia', l: 'Provincia', num: false },
      { k: 'total', l: 'Total', num: true },
      { k: 'web', l: '% Web', num: true },
      { k: 'tel', l: '% Teléfono', num: true },
      { k: 'cita', l: '% Cita', num: true },
      { k: 'email', l: '% Email', num: true },
      { k: 'comp', l: 'Completitud', num: true },
    ];
    const ths = cols.map((c, i) =>
      `<th class="sortable${i === 0 ? ' col-sticky' : ''}${c.k === 'comp' ? ' sorted' : ''}" data-sort="${c.k}"${c.num ? ' style="text-align:right"' : ''}>` +
      `${c.l}<span class="sort-icon"><iconify-icon icon="iconoir:nav-arrow-down" width="13"></iconify-icon></span></th>`).join('');
    return `<section class="cpv-section" id="sec-digital" data-screen-label="S6 Presencia Digital">` +
      sectionHead(s, 'Cobertura de web, teléfono y email por provincia. Ordenable.') +
      '<div class="cpv-section-filter">' + countrySeg('bi-digital-seg', 'es') + '</div>' +
      '<div class="card" style="padding:0;overflow:hidden">' +
      '<div class="table-wrap" id="bi-digital-wrap" style="border:0;border-radius:0;max-height:520px">' +
      '<table class="table-dense"><thead><tr>' + ths + '</tr></thead>' +
      '<tbody id="bi-digital-body">' + digitalTable(data) + '</tbody></table></div></div></section>';
  }

  /* ════ S7 · OPORTUNIDADES ════ */
  function opportunitiesTable(data) {
    const max = Math.max.apply(null, data.map((d) => d.oportunidad));
    return data.map((d, i) => {
      const pct = d.oportunidad / max * 100;
      return `<tr data-provincia="${enc(d.provincia)}" data-tipo="no_cliente">` +
        `<td class="col-sticky cpv-rank">${i + 1}</td>` +
        `<td class="cpv-cell-name">${enc(d.provincia)}</td>` +
        `<td class="tnum" style="text-align:right">${fmtInt(d.total)}</td>` +
        `<td class="tnum" style="text-align:right">${fmtInt(d.clientes)}</td>` +
        `<td class="tnum c-muted" style="text-align:right">${fmtDec(parseFloat(d.pct_partners), 1)}%</td>` +
        `<td><span class="cpv-prog"><span class="cpv-prog-track"><span class="cpv-prog-fill" style="width:${pct.toFixed(0)}%"></span></span>` +
        `<span class="cpv-prog-val">${fmtInt(d.oportunidad)}</span></span></td>` +
        `</tr>`;
    }).join('');
  }
  function s7(md) {
    const s = SECTIONS[6];
    const rows = opportunitiesTable(oportunidadesByCountry(md, 'es'));
    return `<section class="cpv-section" id="sec-opportunities" data-screen-label="S7 Oportunidades">` +
      sectionHead(s, 'Oportunidad = total × (1 − tasa de partners). Provincias con más recorrido.') +
      '<div class="cpv-section-filter">' + countrySeg('bi-opportunities-seg', 'es') + '</div>' +
      '<div class="card" style="padding:0;overflow:hidden">' +
      '<div class="table-wrap" style="border:0;border-radius:0;max-height:520px">' +
      '<table class="table-dense"><thead><tr>' +
      '<th class="col-sticky" style="width:48px">#</th><th>Provincia</th>' +
      '<th style="text-align:right">Total</th><th style="text-align:right">Partners</th>' +
      '<th style="text-align:right">% Partners</th><th>Oportunidad</th>' +
      '</tr></thead><tbody id="bi-opportunities-body">' + rows + '</tbody></table></div></div></section>';
  }

  /* ════ RENDER · DEFAULT ════ */
  function renderDefault(ctx) {
    const md = ctx.md;
    _cloud = null; // recomputa por render
    const header =
      '<div class="page-header"><div class="page-header-left">' +
      '<h1 class="page-title">Business Intelligence</h1>' +
      '<p class="page-subtitle">Partners frente al mercado · segmentación · presencia digital · oportunidades</p>' +
      '</div></div>';
    return header + anchorNav() +
      s1(md) + s2(md) + s3(md) + s4(md) + s5(md) + s6(md) + s7(md);
  }

  /* ════ RENDER · LOADING ════ */
  function renderLoading() {
    const block = (h) =>
      '<div class="cpv-section" style="padding-top:var(--space-7)">' +
      '<span class="skeleton sk-text-sm" style="width:32%;margin-bottom:16px"></span>' +
      '<div class="card"><span class="skeleton" style="height:' + h + 'px;border-radius:var(--radius-lg)"></span></div></div>';
    return '<div class="page-header"><div class="page-header-left">' +
      '<span class="skeleton sk-text-sm" style="width:220px"></span>' +
      '<span class="skeleton" style="width:280px;height:30px;margin-top:8px"></span></div></div>' +
      '<div class="cpv-anchor-nav" style="border:0">' +
      Array.from({ length: 7 }).map(() => '<span class="skeleton" style="width:84px;height:30px;border-radius:99px"></span>').join('') +
      '</div>' + block(150) + block(300) + block(320);
  }

  /* ════ RENDER · EMPTY / ERROR ════ */
  function renderEmpty(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'sin datos para analizar') +
      '<div class="card view-stub"><div class="empty-state">' +
      '<iconify-icon class="empty-state-icon" icon="iconoir:graph-up" width="32"></iconify-icon>' +
      '<h2 class="state-title">Nada que analizar todavía</h2>' +
      '<p class="state-body">El análisis se generará en cuanto haya ópticas en la base de datos.</p>' +
      '</div></div>';
  }
  function renderError(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'error al cargar') +
      '<div class="card view-stub"><div class="error-state">' +
      '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
      '<h2 class="state-title">No se pudo cargar el análisis</h2>' +
      '<p class="state-body">Ha ocurrido un error al recuperar los datos de BI. Inténtalo de nuevo.</p>' +
      '<button class="btn btn-primary btn-sm" data-action="retry"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
  }

  /* ── interacciones (mounted) ───────────────────────────────── */
  let _scrollHandler = null;
  function mounted(root, state, ctx) {
    if (state !== 'default') return;
    const md = ctx.md;
    C.bindTips(root);

    const scroller = document.querySelector('.main-content');
    const nav = root.querySelector('#bi-anchors');
    const links = nav ? Array.from(nav.querySelectorAll('[data-anchor]')) : [];
    const secs = SECTIONS.map((s) => root.querySelector('#sec-' + s.id)).filter(Boolean);

    // click ancla → scroll suave dentro de .main-content
    if (nav) nav.addEventListener('click', (e) => {
      const a = e.target.closest('[data-anchor]'); if (!a) return;
      e.preventDefault();
      const sec = root.querySelector('#sec-' + a.getAttribute('data-anchor'));
      if (sec && scroller) {
        const top = sec.offsetTop - 8;
        scroller.scrollTo({ top: top, behavior: 'smooth' });
      }
    });

    // scroll-spy
    if (_scrollHandler && scroller) scroller.removeEventListener('scroll', _scrollHandler);
    // umbral de fijado capturado una vez (offsetTop es estable sólo antes de pinned)
    const stickThreshold = nav ? Math.max(0, nav.offsetTop) : 0;
    // barra full-bleed: cruza a todo el ancho por detrás del rail al fijarse.
    // va en el subárbol de la vista → se limpia sola al cambiar de vista.
    let bleed = null;
    if (nav) {
      bleed = document.createElement('div');
      bleed.className = 'cpv-anchor-bleed';
      root.appendChild(bleed);
    }
    _scrollHandler = function () {
      const y = scroller.scrollTop + 80;
      let active = 0;
      secs.forEach((sec, i) => { if (sec.offsetTop <= y) active = i; });
      links.forEach((l, i) => l.classList.toggle('on', i === active));
      // estética: al fijarse, el nav se vuelve transparente y la barra
      // full-bleed (bleed) pinta fondo + línea inferior a todo el ancho
      const stuck = scroller.scrollTop > stickThreshold;
      if (nav) nav.classList.toggle('is-stuck', stuck);
      if (bleed) {
        if (stuck) {
          // cubre desde el tope del área de scroll (justo bajo la topbar)
          // hasta la línea inferior del nav → sin hueco visible
          const sr = scroller.getBoundingClientRect();
          const r = nav.getBoundingClientRect();
          bleed.style.top = sr.top + 'px';
          bleed.style.height = (r.bottom - sr.top) + 'px';
          bleed.classList.add('is-on');
        } else {
          bleed.classList.remove('is-on');
        }
      }
    };
    if (scroller) { scroller.addEventListener('scroll', _scrollHandler, { passive: true }); _scrollHandler(); }

    // selector de país (radar competitivo)
    const radarSeg = root.querySelector('#bi-radar-seg');
    if (radarSeg) radarSeg.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-c]'); if (!b) return;
      const cVal = b.getAttribute('data-c');
      radarSeg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
      const host = root.querySelector('#bi-radar-chart');
      if (host) host.innerHTML = radarFor(cVal);
    });

    // selector de país (reparto por franja de valoración)
    const groupedSeg = root.querySelector('#bi-grouped-seg');
    if (groupedSeg) groupedSeg.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-c]'); if (!b) return;
      const cVal = b.getAttribute('data-c');
      groupedSeg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
      const host = root.querySelector('#bi-grouped-chart');
      if (host) host.innerHTML = groupedFor(cVal);
    });

    // selector de país (top performers)
    const perfSeg = root.querySelector('#bi-performers-seg');
    if (perfSeg) perfSeg.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-c]'); if (!b) return;
      const cVal = b.getAttribute('data-c');
      perfSeg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
      const body = root.querySelector('#bi-performers-body');
      if (body) body.innerHTML = performersTable(performersRows(md, cVal));
    });

    // selector de país (engagement: scatter + top ciudades)
    const engSeg = root.querySelector('#bi-engagement-seg');
    if (engSeg) engSeg.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-c]'); if (!b) return;
      const cVal = b.getAttribute('data-c');
      engSeg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
      const cloud = buildCloud(md);
      const sc = scatterFor(cloud, cVal);
      const scHost = root.querySelector('#bi-scatter-chart');
      if (scHost) scHost.innerHTML = sc.html;
      const countEl = root.querySelector('#bi-engagement-count');
      if (countEl) countEl.textContent = fmtInt(sc.count) + ' ópticas';
      const ciudadHost = root.querySelector('#bi-ciudad-chart');
      if (ciudadHost) ciudadHost.innerHTML = ciudadHbarFor(md, cVal);
      C.bindTips(root);
    });

    // selector de cuadrantes (país + ámbito combinados)
    let quadCountry = 'es', quadAmbito = 'ambos';
    function renderQuad() {
      const cloud = buildCloud(md);
      const pts = cloudByCountry(cloud, quadCountry);
      const yMax = Math.max.apply(null, cloud.pts.map((p) => p.y));
      const filtered = pts.filter((p) => quadAmbito === 'ambos' || (quadAmbito === 'partners' ? p.client : !p.client));
      const host = root.querySelector('#bi-quad-chart');
      if (host) host.innerHTML = C.quadrant({
        w: 560, h: 360, points: filtered, xMin: 2.5, xMax: 5, yMin: 0, yMax: yMax,
        xMean: cloud.meanX, yMean: cloud.meanY,
        labels: { tr: 'Stars', tl: 'Rising', br: 'Hidden gems', bl: 'Developing' },
      });
      const c = quadCounts(pts, cloud.meanX, cloud.meanY, quadAmbito);
      root.querySelectorAll('#bi-quad-cards [data-quad]').forEach((el) => {
        el.textContent = fmtInt(c[el.getAttribute('data-quad')]);
      });
      C.bindTips(root);
    }
    const quadCountrySeg = root.querySelector('#bi-quad-country-seg');
    if (quadCountrySeg) quadCountrySeg.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-c]'); if (!b) return;
      quadCountry = b.getAttribute('data-c');
      quadCountrySeg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
      renderQuad();
    });
    const seg = root.querySelector('#bi-quad-seg');
    if (seg) seg.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-f]'); if (!b) return;
      quadAmbito = b.getAttribute('data-f');
      seg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
      renderQuad();
    });

    // tabla digital ordenable + selector de país
    const dwrap = root.querySelector('#bi-digital-wrap');
    if (dwrap) {
      let country = 'es';
      let data = digitalRows(md, country);
      let sortKey = 'comp', sortDir = 'desc';
      const body = root.querySelector('#bi-digital-body');
      const ths = Array.from(dwrap.querySelectorAll('th[data-sort]'));
      function applySort() {
        data = data.slice().sort((a, b) => {
          const va = a[sortKey], vb = b[sortKey];
          const r = typeof va === 'string' ? va.localeCompare(vb) : va - vb;
          return sortDir === 'asc' ? r : -r;
        });
        body.innerHTML = digitalTable(data);
      }
      dwrap.addEventListener('click', (e) => {
        const th = e.target.closest('th[data-sort]'); if (!th) return;
        const key = th.getAttribute('data-sort');
        if (key === sortKey) sortDir = sortDir === 'desc' ? 'asc' : 'desc';
        else { sortKey = key; sortDir = key === 'provincia' ? 'asc' : 'desc'; }
        applySort();
        ths.forEach((t) => {
          const on = t.getAttribute('data-sort') === sortKey;
          t.classList.toggle('sorted', on);
          const ic = t.querySelector('iconify-icon');
          if (ic) ic.setAttribute('icon', on && sortDir === 'asc' ? 'iconoir:nav-arrow-up' : 'iconoir:nav-arrow-down');
        });
      });
      const digitalSeg = root.querySelector('#bi-digital-seg');
      if (digitalSeg) digitalSeg.addEventListener('click', (e) => {
        const b = e.target.closest('button[data-c]'); if (!b) return;
        country = b.getAttribute('data-c');
        digitalSeg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
        data = digitalRows(md, country);
        applySort();
      });
    }

    // selector de país (oportunidades)
    const oppSeg = root.querySelector('#bi-opportunities-seg');
    if (oppSeg) oppSeg.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-c]'); if (!b) return;
      const cVal = b.getAttribute('data-c');
      oppSeg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
      const body = root.querySelector('#bi-opportunities-body');
      if (body) body.innerHTML = opportunitiesTable(oportunidadesByCountry(md, cVal));
    });

    // S7 · filas de oportunidades navegan a /bbdd (los query params
    // ?provincia=&tipo=no_cliente llegan en el Lote 2 con V4)
    const oppSec = root.querySelector('#sec-opportunities');
    if (oppSec) oppSec.addEventListener('click', (e) => {
      const tr = e.target.closest('tr[data-provincia]'); if (!tr) return;
      location.hash = '#/bbdd';
    });
  }

  /* ── registro ──────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/bi'] = {
    render(state, ctx) {
      if (state === 'loading') return renderLoading();
      if (state === 'empty')   return renderEmpty(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted,
  };
})();
