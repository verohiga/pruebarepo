/* global React */
const AreaChart = ({ data, compare, title }) => {
  const w = 720, h = 220, pad = { l: 48, r: 12, t: 16, b: 28 };
  const all = [...data, ...compare];
  const max = Math.max(...all) * 1.1;
  const min = 0;
  const sx = i => pad.l + (i / (data.length - 1)) * (w - pad.l - pad.r);
  const sy = v => pad.t + (1 - (v - min) / (max - min)) * (h - pad.t - pad.b);
  const path = arr => arr.map((v, i) => `${i ? 'L' : 'M'}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(' ');
  const area = `${path(data)} L${sx(data.length - 1)},${h - pad.b} L${sx(0)},${h - pad.b} Z`;
  const gy = [0, 0.25, 0.5, 0.75, 1].map(t => max * (1 - t));
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <h3 className="h3">{title}</h3>
        <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--fg3)' }}>
          <span><span style={{ display: 'inline-block', width: 16, height: 3, background: '#C5E818', borderRadius: 2, verticalAlign: 'middle', marginRight: 6 }}/>Actual</span>
          <span><span style={{ display: 'inline-block', width: 16, height: 0, borderTop: '2px dashed #4A4C4F', verticalAlign: 'middle', marginRight: 6 }}/>Periodo anterior</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
        <defs><linearGradient id="ac-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#C5E818" stopOpacity=".3"/><stop offset="1" stopColor="#C5E818" stopOpacity="0"/></linearGradient></defs>
        {gy.map((v, i) => (
          <g key={i}>
            <line x1={pad.l} x2={w - pad.r} y1={sy(v)} y2={sy(v)} stroke="#E7EAEE" strokeWidth={1} strokeDasharray={i === gy.length - 1 ? '' : '2 4'}/>
            <text x={pad.l - 6} y={sy(v) + 3} textAnchor="end" fontFamily="Inter" fontSize="10" fill="#A8AAAE">€{Math.round(v / 1000)}K</text>
          </g>
        ))}
        <path d={area} fill="url(#ac-fill)"/>
        <path d={path(data)} stroke="#C5E818" strokeWidth={2} fill="none" strokeLinejoin="round"/>
        <path d={path(compare)} stroke="#4A4C4F" strokeWidth={1.5} fill="none" strokeDasharray="4 4"/>
      </svg>
    </div>
  );
};

const ChannelDonut = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 56, sw = 16, cx = 70, cy = 70, C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="card" style={{ padding: 18 }}>
      <h3 className="h3" style={{ marginBottom: 12 }}>Inversión por canal</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width={140} height={140} viewBox="0 0 140 140">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F1F2F2" strokeWidth={sw}/>
          {data.map((d, i) => {
            const frac = d.value / total;
            const dashOff = -C * (acc);
            acc += frac;
            return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth={sw} strokeDasharray={`${C * frac} ${C}`} strokeDashoffset={dashOff} transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt"/>;
          })}
          <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="Outfit" fontWeight="700" fontSize="22" fill="#282A2D" letterSpacing="-0.01em" style={{ fontVariantNumeric: 'tabular-nums' }}>€1.28M</text>
          <text x={cx} y={cy + 16} textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#A8AAAE" letterSpacing="0.04em" style={{ textTransform: 'uppercase' }}>TOTAL</text>
        </svg>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: 'var(--fg1)' }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: d.color }}/>
              <span style={{ flex: 1 }}>{d.label}</span>
              <span className="tnum" style={{ color: 'var(--fg3)' }}>{Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AIInsight = ({ severity = 'opportunity', title, body, onApply }) => {
  const sev = severity === 'critical'
    ? { pill: { bg: '#FFE4E6', fg: '#BE123C' }, label: 'Crítico' }
    : { pill: { bg: 'rgba(197,232,24,.18)', fg: '#3F4E07' }, label: 'Oportunidad' };
  return (
    <div className="card" style={{ padding: 18, borderLeft: '3px solid var(--accent)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(197,232,24,.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#3F4E07' }}>
          <Icon d={ICONS.sparkles} size={16}/>
        </span>
        <span style={{ padding: '3px 8px', borderRadius: 6, background: sev.pill.bg, color: sev.pill.fg, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.02em' }}>{sev.label}</span>
        <span style={{ fontSize: 10.5, color: 'var(--fg4)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginLeft: 'auto' }}>IA · hace 4 min</span>
      </div>
      <h3 className="h3">{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--fg3)', margin: '6px 0 12px', lineHeight: 1.5 }}>{body}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn--primary" style={{ padding: '7px 12px', fontSize: 12 }} onClick={onApply}>Aplicar sugerencia</button>
        <button className="btn btn--ghost" style={{ padding: '7px 12px', fontSize: 12 }}>Ver análisis</button>
      </div>
    </div>
  );
};

Object.assign(window, { AreaChart, ChannelDonut, AIInsight });
