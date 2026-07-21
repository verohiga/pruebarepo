/* global React, Icon, ICONS */
const { useState: usePState } = React;

/* Mini sparkline compacta (sin gradiente de área por defecto) */
const MiniSpark = ({ data, color = 'var(--accent)', w = 96, h = 28, fill = true, strokeW = 1.75 }) => {
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`);
  const line = 'M' + pts.join(' L');
  const id = `ms${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
      {fill && <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".28"/><stop offset="1" stopColor={color} stopOpacity="0"/></linearGradient></defs>}
      {fill && <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id})`}/>}
      <path d={line} stroke={color} strokeWidth={strokeW} fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
};

/* Barra de progreso horizontal con etiqueta y valor */
const BarRow = ({ label, value, max, suffix = '%', color = 'var(--fg1)', sub }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{ width: 96, flexShrink: 0, fontSize: 12.5, color: 'var(--fg1)', fontWeight: 500 }}>{label}</div>
    <div style={{ flex: 1, height: 8, background: 'var(--line-2)', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ width: `${(value / max) * 100}%`, height: '100%', background: color, borderRadius: 99 }}/>
    </div>
    <div className="tnum" style={{ width: 52, textAlign: 'right', fontSize: 12.5, color: 'var(--fg3)', fontWeight: 600 }}>
      {value}{suffix}{sub ? <span style={{ color: 'var(--fg4)', fontWeight: 400 }}> {sub}</span> : null}
    </div>
  </div>
);

/* Cabecera de tarjeta reutilizable */
const CardHead = ({ title, action }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
    <h3 className="h3">{title}</h3>
    {action}
  </div>
);

/* Input de búsqueda con icono */
const SearchInput = ({ value, onChange, placeholder = 'Buscar…', width = 260 }) => (
  <div style={{ position: 'relative', width }}>
    <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg4)', pointerEvents: 'none' }}>
      <Icon d={ICONS.search} size={15}/>
    </span>
    <input className="input" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: '100%', paddingLeft: 34 }}/>
  </div>
);

/* Chips de filtro (segmentado, selección única) */
const FilterChips = ({ options, value, onChange }) => (
  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
    {options.map(opt => {
      const on = value === opt;
      return (
        <button key={opt} onClick={() => onChange(opt)} style={{
          padding: '7px 13px', fontSize: 12.5, fontWeight: on ? 600 : 500,
          borderRadius: 'var(--r-full)', cursor: 'pointer', fontFamily: 'var(--font-ui)',
          background: on ? 'var(--fg1)' : 'var(--card)',
          color: on ? 'var(--bg)' : 'var(--fg2)',
          border: `1px solid ${on ? 'var(--fg1)' : 'var(--line)'}`,
          transition: 'background 120ms var(--ease)',
        }}>{opt}</button>
      );
    })}
  </div>
);

/* Control segmentado (sub-nav, p. ej. Ajustes) */
const Segmented = ({ options, value, onChange }) => (
  <div style={{ display: 'inline-flex', background: 'var(--line-2)', borderRadius: 'var(--r-lg)', padding: 3, gap: 2 }}>
    {options.map(opt => {
      const on = value === opt;
      return (
        <button key={opt} onClick={() => onChange(opt)} style={{
          padding: '7px 14px', fontSize: 13, fontWeight: on ? 600 : 500,
          borderRadius: 'var(--r-md)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-ui)',
          background: on ? 'var(--card)' : 'transparent',
          color: on ? 'var(--fg1)' : 'var(--fg3)',
          boxShadow: on ? 'var(--shadow-e1)' : 'none',
          transition: 'background 120ms var(--ease)',
        }}>{opt}</button>
      );
    })}
  </div>
);

/* Toggle switch */
const Toggle = ({ on, onClick }) => (
  <button onClick={onClick} aria-pressed={on} style={{
    width: 40, height: 23, borderRadius: 99, border: 'none', cursor: 'pointer', padding: 0,
    background: on ? 'var(--accent)' : 'var(--gray-300)', position: 'relative',
    transition: 'background 160ms var(--ease)', flexShrink: 0,
  }}>
    <span style={{
      position: 'absolute', top: 3, left: on ? 20 : 3, width: 17, height: 17, borderRadius: 99,
      background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.2)', transition: 'left 160ms var(--ease)',
    }}/>
  </button>
);

/* Tira compacta de stats (label + valor + delta opcional) */
const StatStrip = ({ items }) => (
  <div className="card" style={{ padding: 0, display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, overflow: 'hidden' }}>
    {items.map((it, i) => (
      <div key={i} style={{ padding: '16px 20px', borderLeft: i ? '1px solid var(--line-2)' : 'none' }}>
        <div style={{ fontSize: 11, color: 'var(--fg4)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{it.label}</div>
        <div className="tnum" style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--fg1)', marginTop: 6, letterSpacing: '-0.01em' }}>{it.value}</div>
      </div>
    ))}
  </div>
);

/* Avatar circular con iniciales */
const Avatar = ({ initials, color = 'var(--fg3)', size = 34 }) => (
  <span style={{
    width: size, height: size, borderRadius: 99, background: color, color: '#fff', flexShrink: 0,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size * 0.36, letterSpacing: '-0.01em',
  }}>{initials}</span>
);

/* fmt helpers */
const eur = n => '€' + n.toLocaleString('es-ES');
const eurK = n => n >= 1000 ? '€' + (n / 1000).toFixed(n >= 100000 ? 0 : 1).replace('.', ',') + 'K' : '€' + n;
const num = n => n.toLocaleString('es-ES');
const compact = n => n >= 1000000 ? (n / 1000000).toFixed(1).replace('.', ',') + 'M' : n >= 1000 ? Math.round(n / 1000) + 'K' : '' + n;

Object.assign(window, {
  MiniSpark, BarRow, CardHead, SearchInput, FilterChips, Segmented, Toggle, StatStrip, Avatar,
  eur, eurK, num, compact,
});
