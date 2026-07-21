/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · charts.js
   Charts SVG dibujados a mano, fieles al estilo Recharts del DS §7.2.
   NO usa ninguna librería de charts. Expuesto como window.cpvCharts.
   chartTheme: primary #C5E817 · grid #E7EAEE (solo horizontal) ·
   secundaria #A8AAAE · tooltip custom bg --card / borde --line / e2.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const PALETTE = ['#C5E817', '#A4C313', '#82960F', '#7E8084', '#A8AAAE'];
  const PRIMARY = '#C5E817';
  const SOFTBAR = '#E4F1A6';

  /* ── utils ─────────────────────────────────────────────────── */
  function enc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function truncate(s, n) {
    s = String(s);
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  }
  function niceMax(v) {
    if (v <= 0) return 1;
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    const n = v / p;
    let m;
    if (n <= 1) m = 1; else if (n <= 2) m = 2; else if (n <= 2.5) m = 2.5;
    else if (n <= 5) m = 5; else m = 10;
    return m * p;
  }
  function fmtAxis(v) {
    v = Math.round(v);
    if (v >= 1000) return (v / 1000).toFixed(v % 1000 ? 1 : 0).replace('.', ',') + 'k';
    return String(v);
  }
  function pt(cx, cy, r, a) { return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
  function annular(cx, cy, r, ir, a1, a2) {
    const large = (a2 - a1) > Math.PI ? 1 : 0;
    const [x1, y1] = pt(cx, cy, r, a1), [x2, y2] = pt(cx, cy, r, a2);
    const [x3, y3] = pt(cx, cy, ir, a2), [x4, y4] = pt(cx, cy, ir, a1);
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} ` +
           `L${x3.toFixed(2)} ${y3.toFixed(2)} A${ir} ${ir} 0 ${large} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
  }
  function svg(w, h, inner, extra) {
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" preserveAspectRatio="xMidYMid meet" ` +
           `style="display:block;${extra || ''}">${inner}</svg>`;
  }

  /* ── horizontal bar chart ──────────────────────────────────── */
  function hbar(o) {
    const data = o.data, label = o.label, value = o.value;
    const w = o.w || 520, rowH = o.rowH || 26, gap = o.gap || 9;
    const fmt = o.fmt || ((n) => n), accentTop = o.accentTop == null ? 3 : o.accentTop, tip = o.tip;
    const pad = { l: o.labelW || 118, r: 56, t: 6, b: 6 };
    const n = data.length, ih = n * rowH + (n - 1) * gap, h = ih + pad.t + pad.b;
    const iw = w - pad.l - pad.r, max = Math.max.apply(null, data.map((d) => d[value])) || 1;
    let bars = '';
    data.forEach((d, i) => {
      const y = pad.t + i * (rowH + gap);
      const bw = Math.max(3, iw * d[value] / max);
      const fill = i < accentTop ? PRIMARY : SOFTBAR;
      const tipAttr = tip ? ` data-tip="${enc(tip(d))}"` : '';
      bars +=
        `<text class="cc-cat" x="${pad.l - 10}" y="${y + rowH / 2 + 4}" text-anchor="end">${enc(truncate(d[label], 16))}</text>` +
        `<g class="cc-bar"${tipAttr}>` +
        `<rect x="${pad.l}" y="${y}" width="${iw}" height="${rowH}" rx="5" fill="#F3F5EF"></rect>` +
        `<rect x="${pad.l}" y="${y}" width="${bw.toFixed(1)}" height="${rowH}" rx="5" fill="${fill}"></rect>` +
        `<text class="cc-val" x="${pad.l + bw + 8}" y="${y + rowH / 2 + 4}">${enc(fmt(d[value]))}</text>` +
        `</g>`;
    });
    return svg(w, h, bars);
  }

  /* ── vertical bars / histogram ─────────────────────────────── */
  function vbars(o) {
    const data = o.data, label = o.label, value = o.value;
    const w = o.w || 520, h = o.h || 260, fmt = o.fmt || ((n) => n), steps = o.steps || 4, tip = o.tip;
    const pad = { l: 46, r: 14, t: 16, b: 38 };
    const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
    const max = niceMax(Math.max.apply(null, data.map((d) => d[value])));
    let grid = '';
    for (let i = 0; i <= steps; i++) {
      const val = max * i / steps, y = pad.t + ih - (ih * i / steps);
      grid += `<line class="cc-grid" x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}"></line>`;
      grid += `<text class="cc-axis" x="${pad.l - 8}" y="${y + 3}" text-anchor="end">${fmtAxis(val)}</text>`;
    }
    const n = data.length, slot = iw / n, bw = Math.min(72, slot * 0.56);
    let bars = '';
    data.forEach((d, i) => {
      const x = pad.l + slot * i + (slot - bw) / 2;
      const bh = ih * d[value] / max, y = pad.t + ih - bh;
      const tipAttr = tip ? ` data-tip="${enc(tip(d))}"` : '';
      bars +=
        `<g class="cc-vbar"${tipAttr}>` +
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="5" fill="url(#ccGrad)"></rect>` +
        `<text class="cc-val" x="${(x + bw / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle">${enc(fmt(d[value]))}</text>` +
        `<text class="cc-cat" x="${(x + bw / 2).toFixed(1)}" y="${h - 14}" text-anchor="middle">${enc(d[label])}</text>` +
        `</g>`;
    });
    const defs =
      `<defs><linearGradient id="ccGrad" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="#C5E817"></stop><stop offset="1" stop-color="#E2F08C"></stop>` +
      `</linearGradient></defs>`;
    return svg(w, h, defs + grid + bars);
  }

  /* ── donut ─────────────────────────────────────────────────── */
  function donut(o) {
    const data = o.data, value = o.value, size = o.size || 190, inner = o.inner || 0.6;
    const palette = o.palette || PALETTE, tip = o.tip;
    const total = data.reduce((s, d) => s + d[value], 0) || 1;
    const cx = size / 2, cy = size / 2, r = size / 2 - 2, ir = r * inner;
    let segs = '', a = -Math.PI / 2;
    data.forEach((d, i) => {
      const frac = d[value] / total, a2 = a + frac * 2 * Math.PI, mid = (a + a2) / 2;
      const tx = (Math.cos(mid) * 4).toFixed(2), ty = (Math.sin(mid) * 4).toFixed(2);
      const tipAttr = tip ? ` data-tip="${enc(tip(d, frac))}"` : '';
      segs += `<path class="cc-seg" style="--tx:${tx}px;--ty:${ty}px" d="${annular(cx, cy, r, ir, a, a2)}" ` +
              `fill="${palette[i % palette.length]}"${tipAttr}></path>`;
      a = a2;
    });
    if (o.centerTop) segs += `<text class="cc-donut-num" x="${cx}" y="${cy - 3}" text-anchor="middle">${enc(o.centerTop)}</text>`;
    if (o.centerSub) segs += `<text class="cc-donut-cap" x="${cx}" y="${cy + 14}" text-anchor="middle">${enc(o.centerSub)}</text>`;
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="display:block;flex-shrink:0">${segs}</svg>`;
  }

  /* ── scatter (val × reseñas log) ───────────────────────────── */
  function scatter(o) {
    // o.points: [{x, y, client, tip}]  x in [xMin,xMax], y raw (log scale)
    const w = o.w || 560, h = o.h || 320;
    const pad = { l: 46, r: 16, t: 16, b: 42 };
    const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
    const xMin = o.xMin != null ? o.xMin : 0, xMax = o.xMax != null ? o.xMax : 5;
    const yMaxRaw = Math.max.apply(null, o.points.map((p) => p.y));
    const yLogMax = Math.log10(yMaxRaw + 1);
    const X = (x) => pad.l + iw * (x - xMin) / (xMax - xMin);
    const Y = (y) => pad.t + ih - ih * Math.log10(y + 1) / yLogMax;
    let grid = '';
    // horizontal gridlines at log ticks 10,100,1000
    [10, 100, 1000].forEach((t) => {
      if (t > yMaxRaw) return;
      const y = Y(t);
      grid += `<line class="cc-grid" x1="${pad.l}" y1="${y.toFixed(1)}" x2="${w - pad.r}" y2="${y.toFixed(1)}"></line>`;
      grid += `<text class="cc-axis" x="${pad.l - 8}" y="${(y + 3).toFixed(1)}" text-anchor="end">${t}</text>`;
    });
    // x axis ticks
    let xa = '';
    for (let v = Math.ceil(xMin); v <= xMax; v++) {
      xa += `<text class="cc-axis" x="${X(v).toFixed(1)}" y="${h - 22}" text-anchor="middle">${v},0</text>`;
    }
    let dots = '';
    o.points.forEach((p) => {
      const cx = X(p.x), cy = Y(p.y);
      const fill = p.client ? PRIMARY : '#C7C9CD';
      const stroke = p.client ? '#8FA710' : '#A8AAAE';
      const rr = p.client ? 5.5 : 4.5;
      const tipAttr = p.tip ? ` data-tip="${enc(p.tip)}"` : '';
      const pid = p.place_id ? ` data-place-id="${enc(p.place_id)}"` : '';
      dots += `<circle class="cc-dot" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rr}" fill="${fill}" ` +
              `stroke="${stroke}" stroke-width="1.2" fill-opacity="0.82"${tipAttr}${pid}></circle>`;
    });
    const axisLabels =
      `<text class="cc-axis-title" x="${pad.l + iw / 2}" y="${h - 4}" text-anchor="middle">${enc(o.xLabel || 'Valoración')}</text>` +
      `<text class="cc-axis-title" x="14" y="${pad.t + ih / 2}" text-anchor="middle" transform="rotate(-90 14 ${pad.t + ih / 2})">${enc(o.yLabel || 'Reseñas (log)')}</text>`;
    return svg(w, h, grid + xa + dots + axisLabels);
  }

  /* ── quadrant scatter (divided by means) ───────────────────── */
  function quadrant(o) {
    const w = o.w || 560, h = o.h || 360;
    const pad = { l: 24, r: 18, t: 22, b: 28 };
    const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
    // Banda reservada en la base para las etiquetas inferiores (Hidden gems /
    // Developing): los dots se mapean SOLO dentro de ih2, de modo que la línea
    // punteada horizontal actúa de tope y ningún punto invade el texto inferior.
    const labelBand = 30;
    const ih2 = ih - labelBand;
    const xMin = o.xMin, xMax = o.xMax, yMin = o.yMin, yMax = o.yMax;
    const X = (x) => pad.l + iw * (x - xMin) / (xMax - xMin);
    const Y = (y) => pad.t + ih2 - ih2 * (y - yMin) / (yMax - yMin);
    const mx = X(o.xMean), my = Y(o.yMean);
    const plotBottom = pad.t + ih2;
    let g = '';
    // quadrant tint (subtle) — top-right "stars" highlighted accent-soft
    // Línea horizontal punteada justo por encima de las etiquetas inferiores
    // (con margen): actúa de base del campo de puntos.
    const hLineY = plotBottom;
    g += `<rect x="${mx}" y="${pad.t}" width="${pad.l + iw - mx}" height="${hLineY - pad.t}" fill="rgba(197,232,23,0.07)"></rect>`;
    // divider lines (dashed --line) — la vertical termina en el tope de los dots
    g += `<line x1="${mx}" y1="${pad.t}" x2="${mx}" y2="${hLineY}" stroke="#C5C8CC" stroke-width="1" stroke-dasharray="4 4"></line>`;
    g += `<line x1="${pad.l}" y1="${hLineY}" x2="${pad.l + iw}" y2="${hLineY}" stroke="#C5C8CC" stroke-width="1" stroke-dasharray="4 4"></line>`;
    // corner labels (se construyen aquí pero se añaden DESPUÉS de los puntos
    // para que el texto quede siempre por encima de los dots)
    const corner = (x, y, anchor, t1) =>
      `<text class="cc-quad-label" x="${x}" y="${y}" text-anchor="${anchor}">${enc(t1)}</text>`;
    let labels = '';
    labels += corner(pad.l + iw - 6, pad.t + 14, 'end', (o.labels && o.labels.tr) || 'Stars');
    labels += corner(pad.l + 6, pad.t + 14, 'start', (o.labels && o.labels.tl) || 'Rising');
    labels += corner(pad.l + iw - 6, h - pad.b + 6, 'end', (o.labels && o.labels.br) || 'Hidden gems');
    labels += corner(pad.l + 6, h - pad.b + 6, 'start', (o.labels && o.labels.bl) || 'Developing');
    let dots = '';
    o.points.forEach((p) => {
      const cx = X(p.x), cy = Y(p.y);
      const fill = p.client ? PRIMARY : '#C7C9CD';
      const stroke = p.client ? '#8FA710' : '#A8AAAE';
      const tipAttr = p.tip ? ` data-tip="${enc(p.tip)}"` : '';
      const pid = p.place_id ? ` data-place-id="${enc(p.place_id)}"` : '';
      dots += `<circle class="cc-dot" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${p.client ? 5.5 : 4.5}" ` +
              `fill="${fill}" stroke="${stroke}" stroke-width="1.2" fill-opacity="0.82"${tipAttr}${pid}></circle>`;
    });
    return svg(w, h, g + dots + labels);
  }

  /* ── radar (multi-axis) ────────────────────────────────────── */
  function radar(o) {
    // o.axes: ['Valoración', ...]; o.series: [{name,color,fill,values:[0..100]}]
    const size = o.size || 320, cx = size / 2, cy = size / 2, r = size / 2 - 38;
    const axes = o.axes, N = axes.length;
    const ang = (i) => -Math.PI / 2 + i * 2 * Math.PI / N;
    let rings = '';
    [0.25, 0.5, 0.75, 1].forEach((f) => {
      let pts = '';
      for (let i = 0; i < N; i++) { const [x, y] = pt(cx, cy, r * f, ang(i)); pts += `${x.toFixed(1)},${y.toFixed(1)} `; }
      rings += `<polygon points="${pts.trim()}" fill="none" stroke="#E7EAEE" stroke-width="1"></polygon>`;
    });
    let spokes = '', labels = '';
    for (let i = 0; i < N; i++) {
      const [x, y] = pt(cx, cy, r, ang(i));
      spokes += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#E7EAEE" stroke-width="1"></line>`;
      const [lx, ly] = pt(cx, cy, r + 20, ang(i));
      const anchor = Math.abs(lx - cx) < 6 ? 'middle' : (lx > cx ? 'start' : 'end');
      labels += `<text class="cc-axis" x="${lx.toFixed(1)}" y="${(ly + 3).toFixed(1)}" text-anchor="${anchor}">${enc(axes[i])}</text>`;
    }
    let polys = '';
    o.series.forEach((s) => {
      let pts = '';
      for (let i = 0; i < N; i++) { const [x, y] = pt(cx, cy, r * (s.values[i] / 100), ang(i)); pts += `${x.toFixed(1)},${y.toFixed(1)} `; }
      polys += `<polygon points="${pts.trim()}" fill="${s.fill}" stroke="${s.color}" stroke-width="2"></polygon>`;
      for (let i = 0; i < N; i++) { const [x, y] = pt(cx, cy, r * (s.values[i] / 100), ang(i)); polys += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${s.color}"></circle>`; }
    });
    return `<svg viewBox="0 0 ${size} ${size}" width="100%" preserveAspectRatio="xMidYMid meet" style="display:block">${rings + spokes + labels + polys}</svg>`;
  }

  /* ── grouped bars (2 series) ───────────────────────────────── */
  function groupedBars(o) {
    // o.groups: [{label, a, b}]  a=primary b=secondary ; o.fmt
    const data = o.groups, w = o.w || 520, h = o.h || 270, fmt = o.fmt || ((n) => n), steps = o.steps || 4, tip = o.tip;
    const pad = { l: 40, r: 14, t: 16, b: 38 };
    const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
    const max = niceMax(Math.max.apply(null, data.map((d) => Math.max(d.a, d.b))));
    let grid = '';
    for (let i = 0; i <= steps; i++) {
      const val = max * i / steps, y = pad.t + ih - (ih * i / steps);
      grid += `<line class="cc-grid" x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}"></line>`;
      grid += `<text class="cc-axis" x="${pad.l - 8}" y="${y + 3}" text-anchor="end">${fmtAxis(val)}</text>`;
    }
    const n = data.length, slot = iw / n, bw = Math.min(26, slot * 0.3), gp = 4;
    let bars = '';
    data.forEach((d, i) => {
      const cxs = pad.l + slot * i + slot / 2;
      const xa = cxs - bw - gp / 2, xb = cxs + gp / 2;
      const ha = ih * d.a / max, hb = ih * d.b / max;
      const ta = tip ? ` data-tip="${enc(tip(d, 'a'))}"` : '';
      const tb = tip ? ` data-tip="${enc(tip(d, 'b'))}"` : '';
      bars +=
        `<g class="cc-vbar"${ta}><rect x="${xa.toFixed(1)}" y="${(pad.t + ih - ha).toFixed(1)}" width="${bw}" height="${ha.toFixed(1)}" rx="3" fill="${PRIMARY}"></rect></g>` +
        `<g class="cc-vbar"${tb}><rect x="${xb.toFixed(1)}" y="${(pad.t + ih - hb).toFixed(1)}" width="${bw}" height="${hb.toFixed(1)}" rx="3" fill="#C7C9CD"></rect></g>` +
        `<text class="cc-cat" x="${cxs.toFixed(1)}" y="${h - 14}" text-anchor="middle">${enc(d.label)}</text>`;
    });
    return svg(w, h, grid + bars);
  }

  /* ── tooltip (singleton, fixed) ────────────────────────────── */
  let tipEl = null;
  function ensureTip() {
    if (tipEl && document.body.contains(tipEl)) return tipEl;
    tipEl = document.createElement('div');
    tipEl.className = 'cc-tip';
    document.body.appendChild(tipEl);
    return tipEl;
  }
  function bindTips(root) {
    const tip = ensureTip();
    const show = (e) => {
      const t = e.target.closest('[data-tip]');
      if (!t) return;
      tip.innerHTML = t.getAttribute('data-tip');
      tip.style.opacity = '1';
      move(e);
    };
    const move = (e) => {
      tip.style.left = e.clientX + 'px';
      tip.style.top = (e.clientY - 14) + 'px';
    };
    const hide = (e) => {
      if (e.target.closest && e.target.closest('[data-tip]')) tip.style.opacity = '0';
    };
    root.addEventListener('mouseover', show);
    root.addEventListener('mousemove', (e) => { if (tip.style.opacity === '1') move(e); });
    root.addEventListener('mouseout', hide);
  }

  /* ── styles (injected once) ────────────────────────────────── */
  function ensureStyles() {
    if (document.getElementById('cpv-charts-style')) return;
    const css = `
      .cc-cat{font-family:var(--font-body);font-size:12px;fill:var(--ink-2)}
      .cc-val{font-family:var(--font-body);font-size:12px;font-weight:600;fill:var(--ink)}
      .cc-axis{font-family:var(--font-body);font-size:11px;fill:var(--muted-2)}
      .cc-axis-title{font-family:var(--font-body);font-size:11px;font-weight:500;fill:var(--muted)}
      .cc-grid{stroke:#E7EAEE;stroke-width:1}
      .cc-bar,.cc-vbar,.cc-seg,.cc-dot{cursor:default}
      .cc-bar:hover rect:last-of-type{filter:brightness(.95)}
      .cc-vbar:hover{opacity:.86}
      .cc-vbar{transition:opacity .12s ease}
      .cc-seg{transition:transform .12s cubic-bezier(.16,1,.3,1)}
      .cc-seg:hover{transform:translate(var(--tx,0),var(--ty,0))}
      .cc-dot{transition:r .12s ease,fill-opacity .12s ease}
      .cc-dot:hover{fill-opacity:1}
      .cc-donut-num{font-family:var(--font-display);font-size:19px;font-weight:700;fill:var(--ink)}
      .cc-donut-cap{font-family:var(--font-body);font-size:9px;fill:var(--muted);letter-spacing:.06em;text-transform:uppercase}
      .cc-quad-label{font-family:var(--font-body);font-size:11px;font-weight:600;fill:var(--muted);letter-spacing:.02em;text-transform:uppercase;paint-order:stroke;stroke:var(--card);stroke-width:3px;stroke-linejoin:round}
      .cc-tip{position:fixed;z-index:120;pointer-events:none;background:var(--card);border:1px solid var(--line);
        border-radius:var(--radius-md);box-shadow:var(--shadow-e2);padding:6px 10px;font-size:12px;color:var(--ink);
        font-weight:500;line-height:1.4;opacity:0;transition:opacity .12s ease;white-space:nowrap;
        transform:translate(-50%,-100%);font-variant-numeric:tabular-nums}
    `;
    const el = document.createElement('style');
    el.id = 'cpv-charts-style';
    el.textContent = css;
    document.head.appendChild(el);
  }
  ensureStyles();

  window.cpvCharts = {
    PALETTE, hbar, vbars, donut, scatter, quadrant, radar, groupedBars,
    bindTips, ensureStyles, _enc: enc,
  };
})();
