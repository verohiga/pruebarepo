/* global React, Icon, ICONS */
const PageHeader = ({ workspace, title, subtitle, range, onRangeChange, onExport, onNew,
  showRange = true, showExport = true, showPrimary = true, primaryLabel = 'Nueva campaña' }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 24 }}>
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--fg3)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--accent)', boxShadow: '0 0 0 4px var(--accent-soft)' }}/>{workspace}
      </div>
      <h1 className="h1">{title}</h1>
      <div style={{ fontSize: 13.5, color: 'var(--fg3)', marginTop: 6, maxWidth: 560 }}>{subtitle}</div>
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      {showRange && <button className="btn btn--ghost" onClick={() => onRangeChange?.()}>{range} <Icon d={ICONS.chevron} size={14}/></button>}
      {showExport && <button className="btn btn--ghost" onClick={onExport}><Icon d={ICONS.download} size={14}/>Export</button>}
      {showPrimary && <button className="btn btn--primary" onClick={onNew}><Icon d={ICONS.plus} size={14}/>{primaryLabel}</button>}
    </div>
  </div>
);

const Delta = ({ value, invert = false }) => {
  const good = invert ? value < 0 : value > 0;
  const Arrow = value > 0 ? ICONS.arrowUp : ICONS.arrowDown;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 600, color: good ? '#047857' : '#BE123C', fontVariantNumeric: 'tabular-nums' }}>
      <Icon d={Arrow} size={10} stroke={2}/>{Math.abs(value).toFixed(1)}%
    </span>
  );
};

const Sparkline = ({ data, color = '#C5E818', height = 28 }) => {
  const w = 220, h = height;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`).join(' L');
  const id = `g${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" width="100%" height={h} style={{ marginTop: 10 }}>
      <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".3"/><stop offset="1" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <path d={`M${pts} L${w},${h} L0,${h} Z`} fill={`url(#${id})`}/>
      <path d={`M${pts}`} stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round"/>
    </svg>
  );
};

const KPI = ({ label, value, delta, data, accent, invert, prefix = '', suffix = '' }) => (
  <div className={`card${accent ? ' card--accent' : ''}`} style={{ padding: 18 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 11, color: 'var(--fg4)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>
      <Delta value={delta} invert={invert}/>
    </div>
    <div className="kpi" style={{ marginTop: 10, fontSize: 30 }}>{prefix}{value}{suffix}</div>
    <Sparkline data={data}/>
  </div>
);

Object.assign(window, { PageHeader, KPI, Delta, Sparkline });
