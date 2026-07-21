/* global React */
const CHANNEL_COLORS = {
  LinkedIn: { bg: '#0A66C2', glyph: 'in' },
  Meta:     { bg: '#0866FF', glyph: 'f' },
  TikTok:   { bg: '#282A2D', glyph: '♪' },
  Google:   { bg: '#fff',    glyph: 'G', border: true },
  Bing:     { bg: '#5E5E5E', glyph: 'b' },
};

const ChannelDot = ({ name, size = 20 }) => {
  const c = CHANNEL_COLORS[name] || { bg: '#A8AAAE', glyph: '·' };
  return (
    <span style={{
      width: size, height: size, borderRadius: 99, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: c.bg, color: name === 'Google' ? '#1A1D21' : '#fff',
      fontSize: size * 0.45, fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em',
      border: c.border ? '1px solid var(--line)' : 'none', flexShrink: 0,
    }}>{c.glyph}</span>
  );
};

const STATUS_PILL = {
  Activo:  { bg: 'rgba(197,232,24,.18)', fg: '#3F4E07' },
  Pausado: { bg: '#E5E7EB', fg: '#6B7280' },
  Test:    { bg: '#FEF3C7', fg: '#92400E' },
  Borrador:{ bg: '#F1F2F2', fg: '#4A4C4F' },
};

const StatusPill = ({ status }) => {
  const s = STATUS_PILL[status] || STATUS_PILL.Borrador;
  return <span style={{ display: 'inline-flex', padding: '3px 8px', borderRadius: 6, background: s.bg, color: s.fg, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.02em' }}>{status}</span>;
};

const CampaignTable = ({ rows }) => (
  <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
      <h3 className="h3">Campañas activas</h3>
      <button className="btn btn--ghost" style={{ padding: '6px 12px', fontSize: 12 }}>Ver todas →</button>
    </div>
    <div>
      {/* header */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr 0.9fr 1fr 0.8fr', padding: '10px 18px', background: 'var(--bg)', borderBottom: '1px solid var(--line)', fontSize: 10.5, color: 'var(--fg3)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        <span>Campaña</span><span>Spend</span><span>ROAS</span><span>CPL</span><span>Status</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr 0.9fr 1fr 0.8fr', padding: '12px 18px', borderBottom: i < rows.length - 1 ? '1px solid var(--line-2)' : 'none', alignItems: 'center', fontSize: 13, color: 'var(--fg1)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500 }}><ChannelDot name={r.channel}/>{r.name}</span>
          <span className="tnum">€{r.spend.toLocaleString('es-ES')}</span>
          <span className="tnum" style={{ color: r.roas >= 3 ? '#047857' : '#BE123C', fontWeight: 600 }}>{r.roas.toFixed(1)}×</span>
          <span className="tnum">€{r.cpl.toFixed(2)}</span>
          <StatusPill status={r.status}/>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, { CHANNEL_COLORS, ChannelDot, StatusPill, CampaignTable });
