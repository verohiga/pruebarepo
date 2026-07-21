/* global React, ChannelDonut, ChannelDot, MiniSpark, BarRow, CardHead, Delta, Icon, ICONS, eur, num, CHANNELS_FULL */

const STATUS_DOT = {
  Conectado:     'var(--pos)',
  Sincronizando: 'var(--warn-ink)',
  Desconectado:  'var(--gray-400)',
};

const ChannelCard = ({ c, total, fireToast }) => (
  <div className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <ChannelDot name={c.label} size={28}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15.5, letterSpacing: '-0.01em' }}>{c.label}</div>
        <div style={{ fontSize: 11, color: 'var(--fg4)', display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: STATUS_DOT[c.status] || 'var(--gray-400)' }}/>{c.status}
        </div>
      </div>
      <Delta value={c.delta}/>
    </div>

    <MiniSpark data={c.trend} color={c.color} w={260} h={40}/>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 16px' }}>
      {[
        ['Inversión', eur(c.spend)],
        ['Cuota', Math.round((c.spend / total) * 100) + '%'],
        ['ROAS', c.roas.toFixed(1) + '×'],
        ['CPL', '€' + c.cpl.toFixed(2)],
      ].map(([k, v], i) => (
        <div key={i}>
          <div style={{ fontSize: 10.5, color: 'var(--fg4)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{k}</div>
          <div className="tnum" style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: i === 2 ? (c.roas >= 3 ? 'var(--pos-ink)' : 'var(--neg-ink)') : 'var(--fg1)', marginTop: 3 }}>{v}</div>
        </div>
      ))}
    </div>

    <button className="btn btn--ghost" style={{ justifyContent: 'center', padding: '8px 12px', fontSize: 12.5 }}
      onClick={() => fireToast?.(`Abriendo detalle de ${c.label}…`)}>Ver detalle</button>
  </div>
);

const ChannelsView = ({ fireToast }) => {
  const total = CHANNELS_FULL.reduce((s, c) => s + c.spend, 0);
  const donutData = CHANNELS_FULL.map(c => ({ label: c.label, value: c.spend, color: c.color }));
  const maxRoas = Math.max(...CHANNELS_FULL.map(c => c.roas));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Fila superior: donut + comparativa ROAS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14, alignItems: 'stretch' }}>
        <ChannelDonut data={donutData}/>
        <div className="card" style={{ padding: 18 }}>
          <CardHead title="ROAS por canal" action={<span style={{ fontSize: 11, color: 'var(--fg4)' }}>objetivo ≥ 3.0×</span>}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
            {[...CHANNELS_FULL].sort((a, b) => b.roas - a.roas).map((c, i) => (
              <BarRow key={i} label={c.label} value={c.roas} max={maxRoas} suffix="×"
                color={c.roas >= 3 ? c.color : 'var(--neg)'}/>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line-2)', fontSize: 12, color: 'var(--fg3)', lineHeight: 1.5 }}>
            Google y LinkedIn superan ampliamente el objetivo; TikTok está por debajo del umbral de rentabilidad.
          </div>
        </div>
      </div>

      {/* Tarjetas por canal */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {CHANNELS_FULL.map((c, i) => <ChannelCard key={i} c={c} total={total} fireToast={fireToast}/>)}
      </div>
    </div>
  );
};

Object.assign(window, { ChannelsView, ChannelCard });
