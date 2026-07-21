/* global React, Icon, ICONS, FilterChips, CardHead, INSIGHTS */
const { useState: useIState } = React;

const SEV = {
  opportunity: { label: 'Oportunidad', dot: 'var(--accent)',  pill: { bg: 'var(--accent-soft)', fg: 'var(--accent-deep)' }, bar: 'var(--accent)',  metric: 'var(--pos-ink)' },
  critical:    { label: 'Crítico',     dot: 'var(--neg)',     pill: { bg: 'var(--neg-soft)',    fg: 'var(--neg-ink)' },    bar: 'var(--neg)',     metric: 'var(--neg-ink)' },
  info:        { label: 'A revisar',   dot: 'var(--gray-400)',pill: { bg: 'var(--line-2)',      fg: '#4A4C4F' },           bar: 'var(--gray-300)',metric: 'var(--fg2)' },
};

const InsightCard = ({ data, onApply, feature }) => {
  const s = SEV[data.severity] || SEV.info;
  return (
    <div className="card" style={{ padding: feature ? 24 : 20, borderLeft: `3px solid ${s.bar}`, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ width: 28, height: 28, borderRadius: 8, background: s.pill.bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: s.pill.fg }}>
          <Icon d={ICONS.sparkles} size={16}/>
        </span>
        <span style={{ padding: '3px 8px', borderRadius: 6, background: s.pill.bg, color: s.pill.fg, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.02em' }}>{s.label}</span>
        <span style={{ fontSize: 10.5, color: 'var(--fg4)', fontWeight: 600, letterSpacing: '0.02em' }}>· {data.category}</span>
        <span style={{ fontSize: 10.5, color: 'var(--fg4)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginLeft: 'auto' }}>IA · hoy</span>
      </div>

      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className={feature ? 'h2' : 'h3'} style={feature ? { fontSize: 22, marginBottom: 8 } : {}}>{data.title}</h3>
          <p style={{ fontSize: feature ? 14.5 : 13, color: 'var(--fg3)', margin: '6px 0 14px', lineHeight: 1.55, maxWidth: '62ch' }}>{data.body}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--primary" style={{ padding: '7px 13px', fontSize: 12 }} onClick={() => onApply?.(data.title)}>Aplicar sugerencia</button>
            <button className="btn btn--ghost" style={{ padding: '7px 13px', fontSize: 12 }}>Ver análisis</button>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: 8, borderLeft: '1px solid var(--line-2)', minWidth: 96 }}>
          <div className="tnum" style={{ fontFamily: 'var(--font-display)', fontSize: feature ? 34 : 26, fontWeight: 700, color: s.metric, letterSpacing: '-0.01em', lineHeight: 1 }}>{data.metric}</div>
          <div style={{ fontSize: 10.5, color: 'var(--fg4)', marginTop: 4, fontWeight: 500 }}>{data.metricLabel}</div>
        </div>
      </div>
    </div>
  );
};

const DigestCard = () => (
  <div className="card" style={{ padding: 20 }}>
    <CardHead title="Resumen semanal · IA"/>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        ['+€48K', 'pipeline atribuido a LinkedIn, el canal con mejor ROAS de la cuenta.'],
        ['3 campañas', 'superaron su objetivo de conversiones; 2 quedaron por debajo del umbral.'],
        ['−12%', 'CPL medio frente al periodo anterior gracias a la rotación de creatividades.'],
        ['1 alerta', 'de presupuesto: TikTok creators sigue por debajo de rentabilidad.'],
      ].map(([k, v], i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
          <span className="tnum" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--fg1)', minWidth: 78, flexShrink: 0 }}>{k}</span>
          <span style={{ fontSize: 13, color: 'var(--fg3)', lineHeight: 1.5 }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

const InsightsView = ({ fireToast }) => {
  const [cat, setCat] = useIState('Todas');
  const apply = t => fireToast?.(`Sugerencia aplicada · ${t.length > 30 ? t.slice(0, 30) + '…' : t}`);
  const cats = ['Todas', 'Presupuesto', 'Creatividades', 'Audiencias', 'Pujas'];
  const list = cat === 'Todas' ? INSIGHTS : INSIGHTS.filter(i => i.category === cat);
  const feature = list[0];
  const rest = list.slice(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <FilterChips options={cats} value={cat} onChange={setCat}/>
        <span style={{ fontSize: 12.5, color: 'var(--fg3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--accent)', boxShadow: '0 0 0 4px var(--accent-soft)' }}/>
          {list.length} recomendaciones · actualizado hace 4 min
        </span>
      </div>

      {feature && <InsightCard data={feature} onApply={apply} feature/>}

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {rest.map((ins, i) => <InsightCard key={i} data={ins} onApply={apply}/>)}
          {rest.length === 0 && !feature && (
            <div className="card" style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--fg3)' }}>Sin insights en esta categoría.</div>
          )}
        </div>
        <DigestCard/>
      </div>
    </div>
  );
};

Object.assign(window, { InsightsView, InsightCard });
