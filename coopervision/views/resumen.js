/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/resumen.js — V1 Resumen
   Registra window.cpvViews['/'] consumido por app.js renderView().
   render(state, ctx) -> htmlString ; mounted(root, state, ctx).
   Lee de window.mockData; agregaciones precomputadas en resumen_kpis,
   top_provincias, dist_categorias, dist_valoraciones,
   top_ciudades_engagement. Charts dibujados a mano vía cpvCharts.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const C = window.cpvCharts;

  /* ── formato (1.234 miles · 1,5 decimales · 1,2K/1,2M) ─────── */
  // toLocaleString('es-ES') no agrupa de forma fiable en todos los
  // runtimes, así que formateamos a mano: punto miles, coma decimal.
  function groupThousands(intStr) {
    return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  const fmtInt = (n) => groupThousands(String(Math.round(Math.abs(n)))) ;
  function fmtDec(n, d) {
    const fixed = Math.abs(Number(n)).toFixed(d);
    const parts = fixed.split('.');
    return groupThousands(parts[0]) + (parts[1] ? ',' + parts[1] : '');
  }
  function fmtCompact(n) {
    if (n >= 1e6) return fmtDec(n / 1e6, 1).replace(',0', '') + 'M';
    if (n >= 1e3) return fmtDec(n / 1e3, 1).replace(',0', '') + 'k';
    return fmtInt(n);
  }
  const enc = C._enc;

  /* ── KPI card ──────────────────────────────────────────────── */
  function kpi(o) {
    const tag = o.href ? 'a' : 'div';
    const hrefAttr = o.href ? ` href="${o.href}"` : '';
    const cls = 'card card-compact cpv-kpi' + (o.accent ? ' card-accent' : '') + (o.href ? ' cpv-kpi-link' : '');
    let headRight = '';
    if (o.accent) {
      headRight += `<iconify-icon icon="iconoir:star-solid" width="14" style="color:var(--accent-ink-deep)"></iconify-icon>`;
    }
    if (o.href) {
      headRight += `<iconify-icon class="cpv-kpi-arrow" icon="iconoir:arrow-right" width="16"></iconify-icon>`;
    }
    let head = `<span class="eyebrow-t">${enc(o.label)}</span>`;
    if (headRight) {
      head = `<span class="cpv-kpi-head"><span class="eyebrow-t">${enc(o.label)}</span>` +
             `<span class="cpv-kpi-head-right">${headRight}</span></span>`;
    }
    let meta = '';
    if (o.delta || o.metaRight) {
      meta = `<div class="cpv-kpi-meta">` +
        (o.delta ? `<span class="kpi-delta pos"><iconify-icon icon="iconoir:arrow-up-right" width="13"></iconify-icon>${enc(o.delta)}</span>` : '') +
        (o.metaRight ? `<span class="body-xs c-muted">${enc(o.metaRight)}</span>` : '') +
        `</div>`;
    }
    const sub = o.sub ? `<div class="kpi-subtitle">${enc(o.sub)}</div>` : '';
    return `<${tag}${hrefAttr} class="${cls}">${head}` +
           `<div class="kpi-value">${o.value}</div>${meta}${sub}</${tag}>`;
  }

  /* ── card header ───────────────────────────────────────────── */
  function cardHead(title, right) {
    return `<div class="card-head"><div><h3 class="display-md" style="margin:0">${enc(title)}</h3></div>` +
           (right || '') + `</div>`;
  }

  /* ── legend (donut) ────────────────────────────────────────── */
  function donutLegend(data, total) {
    const pal = C.PALETTE;
    return `<div class="cpv-legend">` + data.map((d, i) => {
      const pct = fmtDec(d.count / total * 100, 1);
      return `<div class="cpv-legend-row">` +
        `<span class="cpv-legend-dot" style="background:${pal[i % pal.length]}"></span>` +
        `<span class="cpv-legend-label truncate">${enc(d.categoria)}</span>` +
        `<span class="cpv-legend-val">${pct}%</span></div>`;
    }).join('') + `</div>`;
  }

  /* ════ RENDER · DEFAULT ════ */
  function renderDefault(ctx) {
    const md = ctx.md, k = md.resumen_kpis;
    const total = md.dist_categorias.reduce((s, d) => s + d.count, 0);

    /* Header */
    const header =
      '<div class="page-header"><div class="page-header-left">' +
      '<h1 class="page-title">Resumen</h1>' +
      '<p class="page-subtitle">Visión global del mercado óptico ibérico · Actualizado hace ' +
      md.dias_desde_ultima_sync + ' días</p>' +
      '</div></div>';

    /* Row 1 + 2 — 8 KPIs */
    const row1 = '<div class="kpi-grid">' +
      kpi({ label: 'Total ópticas', value: fmtInt(k.total_opticas), sub: 'En la base de datos', href: '#/bbdd' }) +
      kpi({ label: 'Partners CooperVision', accent: true, value: fmtInt(k.total_clientes),
            delta: '+' + k.nuevos_ult_sync, metaRight: fmtDec(k.pct_clientes, 1) + '% del total',
            sub: 'Nuevos esta sincronización', href: '#/bbdd' }) +
      kpi({ label: 'Valoración media', value: fmtDec(k.valoracion_media, 2) + ' <span class="cpv-star">★</span>',
            sub: 'Global de la red', href: '#/bi' }) +
      kpi({ label: 'Reseñas totales', value: fmtCompact(k.reseñas_total), sub: 'Acumuladas en Google' }) +
      '</div>';

    const row2 = '<div class="kpi-grid" style="margin-top:var(--space-4)">' +
      kpi({ label: '% con web', value: fmtDec(k.pct_con_web, 1) + '%', sub: 'Cobertura digital', href: '#/bi' }) +
      kpi({ label: '% con teléfono', value: fmtDec(k.pct_con_telefono, 1) + '%', sub: 'Contactabilidad', href: '#/bi' }) +
      kpi({ label: 'Nº provincias', value: fmtInt(k.n_provincias), sub: 'Cobertura territorial', href: '#/bi' }) +
      kpi({ label: 'Nº ciudades', value: fmtInt(k.n_ciudades), sub: 'Municipios con presencia' }) +
      '</div>';

    /* Row 3 — provincias (hbar) + categorías (donut) */
    const provChart = C.hbar({
      data: md.top_provincias, label: 'provincia', value: 'total',
      accentTop: 3, fmt: fmtInt, labelW: 92, w: 540, rowH: 24, gap: 9,
      tip: (d) => `<b>${d.provincia}</b> · ${fmtInt(d.total)} ópticas · ${d.clientes} partners`,
    });
    const donutChart = C.donut({
      data: md.dist_categorias, value: 'count', size: 178, inner: 0.6,
      centerTop: fmtCompact(total), centerSub: 'ópticas',
      tip: (d, f) => `<b>${d.categoria}</b> · ${fmtInt(d.count)} · ${fmtDec(f * 100, 1)}%`,
    });
    const row3 =
      '<div class="cpv-grid-2" style="margin-top:var(--space-4)">' +
      '<div class="card">' + cardHead('Top 10 provincias', '<span class="body-xs c-muted">por nº de ópticas</span>') +
        '<div class="cpv-chart">' + provChart + '</div></div>' +
      '<div class="card">' + cardHead('Distribución por categoría') +
        '<div class="cpv-donut-wrap">' + donutChart + donutLegend(md.dist_categorias, total) + '</div></div>' +
      '</div>';

    /* Row 4 — histograma + reseñas por ciudad */
    const totalVal = md.dist_valoraciones.reduce((s, d) => s + d.count, 0);
    const histChart = C.vbars({
      data: md.dist_valoraciones, label: 'rango', value: 'count', fmt: fmtCompact, w: 540, h: 248,
      tip: (d) => `<b>${d.rango}</b> · ${fmtInt(d.count)} · ${fmtDec(d.count / totalVal * 100, 1)}%`,
    });
    const ciudadChart = C.hbar({
      data: md.top_ciudades_engagement, label: 'ciudad', value: 'reseñas_total',
      accentTop: 3, fmt: fmtCompact, labelW: 84, w: 540, rowH: 18, gap: 6.5,
      tip: (d) => `<b>${d.ciudad}</b> · ${fmtInt(d.reseñas_total)} reseñas`,
    });
    const row4 =
      '<div class="cpv-grid-2" style="margin-top:var(--space-4)">' +
      '<div class="card">' + cardHead('Distribución de valoraciones', '<span class="body-xs c-muted">nº de ópticas</span>') +
        '<div class="cpv-chart">' + histChart + '</div></div>' +
      '<div class="card">' + cardHead('Reseñas totales por ciudad', '<span class="body-xs c-muted">top 10</span>') +
        '<div class="cpv-chart">' + ciudadChart + '</div></div>' +
      '</div>';

    /* Row 5 — Top 10 ópticas (tabla densa) */
    const top = md.opticas_google.slice()
      .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 10);
    const rows = top.map((o, i) => {
      const client = md.helpers.is_client(o.place_id);
      const badge = client ? ' <span class="pill pill-accent pill-sm"><span class="pill-dot"></span>Cliente</span>' : '';
      return `<tr data-place-id="${enc(o.place_id)}">` +
        `<td class="col-sticky cpv-rank">${i + 1}</td>` +
        `<td><span class="cpv-cell-name">${enc(o.name)}</span>${badge}</td>` +
        `<td class="c-ink2">${enc(o.city)}</td>` +
        `<td class="c-ink2">${enc(o.state)}</td>` +
        `<td class="tnum" style="text-align:right"><span class="cpv-star">★</span> ${fmtDec(o.rating, 2)}</td>` +
        `<td class="tnum c-muted" style="text-align:right">${fmtInt(o.reviews)}</td>` +
        `</tr>`;
    }).join('');
    const table =
      '<div class="card" style="margin-top:var(--space-4);padding:0;overflow:hidden">' +
      '<div class="card-head" style="padding:var(--space-6) var(--space-6) var(--space-5)">' +
      '<div><h3 class="display-md" style="margin:0">Top 10 ópticas por valoración</h3></div>' +
      '<a class="btn btn-ghost btn-sm" href="#/bbdd">Ver todas<iconify-icon icon="iconoir:arrow-right" width="14"></iconify-icon></a>' +
      '</div>' +
      '<div class="table-wrap" style="border:0;border-top:1px solid var(--line);border-radius:0;max-height:none">' +
      '<table class="table-dense"><thead><tr>' +
      '<th class="col-sticky" style="width:48px">#</th><th>Óptica</th><th>Ciudad</th><th>Provincia</th>' +
      '<th style="text-align:right">Valoración</th><th style="text-align:right">Reseñas</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div></div>';

    return header + row1 + row2 + row3 + row4 + table;
  }

  /* ════ RENDER · LOADING (skeleton por componente) ════ */
  function renderLoading() {
    const kCard = () =>
      '<div class="card card-compact" style="display:flex;flex-direction:column;gap:10px;min-height:104px">' +
      '<span class="skeleton sk-text-sm" style="width:55%"></span>' +
      '<span class="skeleton" style="height:32px;width:68%"></span>' +
      '<span class="skeleton sk-text-sm" style="width:40%"></span></div>';
    const kGrid = (mt) => '<div class="kpi-grid"' + (mt ? ' style="margin-top:var(--space-4)"' : '') + '>' +
      kCard() + kCard() + kCard() + kCard() + '</div>';
    const chartCard = (h) =>
      '<div class="card"><span class="skeleton sk-text-sm" style="width:38%;margin-bottom:18px"></span>' +
      '<span class="skeleton" style="height:' + h + 'px;border-radius:var(--radius-lg)"></span></div>';
    const chartRow = (h) => '<div class="cpv-grid-2" style="margin-top:var(--space-4)">' + chartCard(h) + chartCard(h) + '</div>';
    let tableRows = '';
    for (let i = 0; i < 10; i++) tableRows += '<div style="padding:0 16px"><span class="skeleton sk-row" style="margin:0"></span></div>';

    return '<div class="page-header"><div class="page-header-left">' +
      '<span class="skeleton sk-text-sm" style="width:240px"></span>' +
      '<span class="skeleton" style="width:180px;height:30px;margin-top:8px"></span>' +
      '<span class="skeleton sk-text-sm" style="width:320px;margin-top:8px"></span></div></div>' +
      kGrid(false) + kGrid(true) + chartRow(258) + chartRow(248) +
      '<div class="card" style="margin-top:var(--space-4);padding:14px 0">' + tableRows + '</div>';
  }

  /* ════ RENDER · EMPTY ════ */
  function renderEmpty(ctx) {
    const adminCTA = ctx.role === 'admin'
      ? '<a class="btn btn-primary btn-sm" href="#/admin/operaciones"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Lanzar primera sincronización</a>'
      : '';
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'sin datos disponibles') +
      '<div class="card view-stub"><div class="empty-state">' +
      '<iconify-icon class="empty-state-icon" icon="iconoir:database-xmark" width="32"></iconify-icon>' +
      '<h2 class="state-title">Aún no hay datos</h2>' +
      '<p class="state-body">No se ha cargado ninguna óptica todavía. ' +
      (ctx.role === 'admin' ? 'Lanza la primera sincronización desde Administración · Operaciones.' : 'Un administrador debe lanzar la primera sincronización.') +
      '</p>' + adminCTA + '</div></div>';
  }

  /* ════ RENDER · ERROR ════ */
  function renderError(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'error al cargar') +
      '<div class="card view-stub"><div class="error-state">' +
      '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
      '<h2 class="state-title">No se pudo cargar el resumen</h2>' +
      '<p class="state-body">Ha ocurrido un error al recuperar las agregaciones. Inténtalo de nuevo.</p>' +
      '<button class="btn btn-primary btn-sm" data-action="retry"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
  }

  /* ── registro ──────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/'] = {
    render(state, ctx) {
      if (state === 'loading') return renderLoading();
      if (state === 'empty')   return renderEmpty(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted(root, state, ctx) {
      if (state === 'default') C.bindTips(root);
    },
  };
})();
