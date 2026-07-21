/* global React, BarRow, CardHead, StatusPill, MiniSpark, Icon, ICONS, num, compact, AUDIENCES, DEMOGRAPHICS, TRENDS */

const TYPE_PILL = {
  Lookalike:   { bg: 'rgba(10,102,194,.12)',  fg: '#0A66C2' },
  Retargeting: { bg: 'var(--accent-soft)',     fg: 'var(--accent-deep)' },
  Lista:       { bg: 'rgba(157,109,251,.14)',  fg: '#5B36B0' },
  Interés:     { bg: 'var(--line-2)',          fg: '#4A4C4F' },
};
const TypePill = ({ type }) => {
  const s = TYPE_PILL[type] || TYPE_PILL.Interés;
  return <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 6, background: s.bg, color: s.fg, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.02em' }}>{type}</span>;
};

const AudiencesView = ({ fireToast }) => {
  const cols = '2.4fr 1fr 1.2fr 0.9fr 0.9fr 0.9fr';
  const totalReach = AUDIENCES.reduce((s, a) => s + a.reach, 0);
  const maxAge = Math.max(...DEMOGRAPHICS.age.map(d => d.value));
  const maxGeo = Math.max(...DEMOGRAPHICS.geo.map(d => d.value));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Tabla de segmentos */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--line)' }}>
          <div>
            <h3 className="h3">Segmentos de audiencia</h3>
            <div style={{ fontSize: 12, color: 'var(--fg3)', marginTop: 3 }}>{AUDIENCES.length} segmentos · alcance combinado {compact(totalReach)}</div>
          </div>
          <button className="btn btn--primary" style={{ padding: '7px 13px', fontSize: 12 }} onClick={() => fireToast?.('Nuevo segmento de audiencia')}><Icon d={ICONS.plus} size={13}/>Nuevo segmento</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: cols, padding: '11px 20px', background: 'var(--bg)', borderBottom: '1px solid var(--line)', gap: 12, fontSize: 10.5, color: 'var(--fg3)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          <span>Segmento</span><span>Tipo</span><span style={{ textAlign: 'right' }}>Alcance</span><span style={{ textAlign: 'right' }}>Match</span><span style={{ textAlign: 'right' }}>ROAS</span><span>Estado</span>
        </div>
        {AUDIENCES.map((a, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: cols, padding: '13px 20px', gap: 12, borderBottom: i < AUDIENCES.length - 1 ? '1px solid var(--line-2)' : 'none', alignItems: 'center', fontSize: 13 }}>
            <span style={{ fontWeight: 500 }}>{a.name}</span>
            <span><TypePill type={a.type}/></span>
            <span className="tnum" style={{ textAlign: 'right' }}>{compact(a.reach)}</span>
            <span className="tnum" style={{ textAlign: 'right', color: 'var(--fg3)' }}>{a.match}%</span>
            <span className="tnum" style={{ textAlign: 'right', color: a.roas >= 3 ? 'var(--pos-ink)' : 'var(--neg-ink)', fontWeight: 600 }}>{a.roas.toFixed(1)}×</span>
            <span><StatusPill status={a.status}/></span>
          </div>
        ))}
      </div>

      {/* Demografía */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <div className="card" style={{ padding: 18 }}>
          <CardHead title="Edad"/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DEMOGRAPHICS.age.map((d, i) => <BarRow key={i} label={d.label} value={d.value} max={maxAge} color="var(--fg2)"/>)}
          </div>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <CardHead title="Dispositivo"/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 12, borderRadius: 99, overflow: 'hidden', marginBottom: 16, marginTop: 2 }}>
            {DEMOGRAPHICS.device.map((d, i) => (
              <div key={i} style={{ width: `${d.value}%`, height: '100%', background: d.color }}/>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {DEMOGRAPHICS.device.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: d.color }}/>
                <span style={{ flex: 1 }}>{d.label}</span>
                <span className="tnum" style={{ color: 'var(--fg3)', fontWeight: 600 }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <CardHead title="Top ubicaciones"/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DEMOGRAPHICS.geo.map((d, i) => <BarRow key={i} label={d.label} value={d.value} max={maxGeo} color="var(--accent-strong)"/>)}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AudiencesView });
