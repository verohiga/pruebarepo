/* global React, Sidebar, PageHeader, KPI, AreaChart, CampaignTable, ChannelDonut, AIInsight, CHANNEL_COLORS,
   CampaignsView, InsightsView, ChannelsView, AudiencesView, SettingsView, CAMPAIGNS_FULL */
const { useState } = React;

const SAMPLE_TIMELINE = [820, 880, 760, 940, 910, 1020, 970, 1080, 1140, 1090, 1180, 1240, 1220, 1280];
const SAMPLE_COMPARE  = [780, 820, 800, 860, 840, 900, 870, 910, 960, 940, 990, 1020, 1010, 1050];

const SAMPLE_ROWS = [
  { name: 'Q2 · Lead-gen senior',       channel: 'LinkedIn', spend: 48210, roas: 5.2, cpl:  8.20, status: 'Activo'  },
  { name: 'Awareness · Retargeting EU', channel: 'Meta',     spend: 32440, roas: 4.1, cpl: 11.40, status: 'Activo'  },
  { name: 'Brand · TikTok creators',    channel: 'TikTok',   spend: 18700, roas: 1.8, cpl: 14.90, status: 'Test'    },
  { name: 'Search · Brand keywords',    channel: 'Google',   spend:  9120, roas: 6.0, cpl:  5.40, status: 'Pausado' },
  { name: 'Display · Prospecting',      channel: 'Bing',     spend:  4280, roas: 2.4, cpl: 12.10, status: 'Activo'  },
];

const SAMPLE_CHANNELS = [
  { label: 'LinkedIn', value: 48210, color: '#0A66C2' },
  { label: 'Meta',     value: 32440, color: '#0866FF' },
  { label: 'TikTok',   value: 18700, color: '#282A2D' },
  { label: 'Google',   value:  9120, color: '#4285F4' },
  { label: 'Bing',     value:  4280, color: '#5E5E5E' },
];

const NewCampaignModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('LinkedIn');
  const [budget, setBudget] = useState('');
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,17,20,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-e3)', width: 460, padding: 26 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: 'var(--fg4)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Nueva campaña</span>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg3)', fontSize: 18 }}>×</button>
        </div>
        <h2 className="h2" style={{ marginBottom: 18 }}>Configura tu campaña</h2>
        <label style={{ display: 'block', marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--fg3)', fontWeight: 600, marginBottom: 6 }}>Nombre</div>
          <input className="input" style={{ width: '100%' }} value={name} onChange={e => setName(e.target.value)} placeholder="Q3 · Lead-gen · Madrid"/>
        </label>
        <label style={{ display: 'block', marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--fg3)', fontWeight: 600, marginBottom: 6 }}>Canal</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Object.keys(CHANNEL_COLORS).map(c => (
              <button key={c} type="button" onClick={() => setChannel(c)} className="btn" style={{
                padding: '7px 12px', fontSize: 12, fontWeight: 500, borderRadius: 8,
                background: channel === c ? 'var(--fg1)' : '#fff',
                color: channel === c ? 'var(--bg)' : 'var(--fg1)',
                border: `1px solid ${channel === c ? 'var(--fg1)' : 'var(--line)'}`,
              }}>{c}</button>
            ))}
          </div>
        </label>
        <label style={{ display: 'block', marginBottom: 22 }}>
          <div style={{ fontSize: 11, color: 'var(--fg3)', fontWeight: 600, marginBottom: 6 }}>Presupuesto diario</div>
          <input className="input" style={{ width: '100%' }} value={budget} onChange={e => setBudget(e.target.value)} placeholder="€ 250,00"/>
        </label>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button className="btn btn--ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn--primary" onClick={() => { onSubmit({ name: name || 'Campaña sin nombre', channel, budget }); }}>Crear campaña</button>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ msg }) => (
  <div style={{ position: 'fixed', bottom: 24, right: 24, background: 'var(--fg1)', color: 'var(--bg)', padding: '10px 16px', borderRadius: 10, fontSize: 13, fontWeight: 500, boxShadow: 'var(--shadow-e3)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 2000 }}>
    <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--accent)', boxShadow: '0 0 0 4px var(--accent-soft)' }}/>
    {msg}
  </div>
);

const HomeView = ({ rows, fireToast }) => (
  <React.Fragment>
    {/* KPI row */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 14 }}>
      <KPI label="Inversión" prefix="€" value="1.28M" delta={12.4} data={SAMPLE_TIMELINE}/>
      <KPI label="Conversiones" value="2,184" delta={8.1} data={[120,140,138,160,170,182,205,210,228,240,250,260,272,284]} accent/>
      <KPI label="ROAS medio" value="4.82" suffix="×" delta={4.0} data={[3.2,3.4,3.5,3.7,3.6,3.9,4.0,4.2,4.4,4.5,4.6,4.7,4.8,4.82]}/>
      <KPI label="CPL" prefix="€" value="8.20" delta={-3.1} invert data={[10.2,9.9,9.6,9.4,9.5,9.2,9.1,8.9,8.7,8.6,8.4,8.3,8.2,8.20]}/>
    </div>

    {/* Two column */}
    <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 14 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AreaChart title="Inversión por día" data={SAMPLE_TIMELINE} compare={SAMPLE_COMPARE}/>
        <CampaignTable rows={rows.slice(0, 5)}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <ChannelDonut data={SAMPLE_CHANNELS}/>
        <AIInsight
          title="LinkedIn Lead-gen está infrautilizada"
          body="Tu mejor ROAS (5.2×) viene de LinkedIn pero solo recibe el 18% del presupuesto. Subir a 30% podría aportar +€42K en pipeline este mes."
          onApply={() => fireToast('Reasignación aplicada · revisa la simulación')}
        />
      </div>
    </div>
  </React.Fragment>
);

const PAGES = {
  home:      { title: 'Resumen de campañas', subtitle: 'Últimos 30 días vs. periodo anterior. Datos sincronizados hace 4 min.', range: true, exp: true, primary: true },
  campaigns: { title: 'Campañas',  subtitle: 'Todas las campañas de la cuenta. Filtra, ordena y compara su rendimiento.', range: true, exp: true, primary: false },
  insights:  { title: 'Insights',  subtitle: 'Recomendaciones generadas por IA sobre presupuesto, creatividades y audiencias.', range: true, exp: false, primary: false },
  channels:  { title: 'Canales',   subtitle: 'Rendimiento y estado de conexión de cada canal de adquisición.', range: true, exp: true, primary: false },
  audiences: { title: 'Audiencias',subtitle: 'Segmentos activos, calidad de match y composición demográfica.', range: false, exp: true, primary: false },
  settings:  { title: 'Ajustes',   subtitle: 'Workspace, integraciones, miembros del equipo y notificaciones.', range: false, exp: false, primary: false },
};

const App = () => {
  const [active, setActive] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [rows, setRows] = useState(SAMPLE_ROWS);
  const [campaigns, setCampaigns] = useState(CAMPAIGNS_FULL);
  const [range, setRange] = useState('Últimos 30 días');

  const fireToast = m => { setToast(m); setTimeout(() => setToast(null), 2400); };

  const handleNew = data => {
    const fresh = { name: data.name, channel: data.channel, spend: 0, conv: 0, roas: 0, cpl: 0, status: 'Borrador', trend: [50,50,50] };
    setRows([fresh, ...rows]);
    setCampaigns([fresh, ...campaigns]);
    setShowModal(false);
    fireToast(`Campaña "${data.name}" creada`);
  };

  const cfg = PAGES[active] || PAGES.home;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar active={active} onNav={setActive}/>
      <main style={{ flex: 1, padding: '26px 30px', minWidth: 0 }}>
        <PageHeader
          workspace="Acme S.L. · Workspace"
          title={cfg.title}
          subtitle={cfg.subtitle}
          range={range}
          showRange={cfg.range}
          showExport={cfg.exp}
          showPrimary={cfg.primary}
          onRangeChange={() => { const opts = ['Hoy', 'Últimos 7 días', 'Últimos 30 días', 'Últimos 90 días', 'YTD']; setRange(opts[(opts.indexOf(range) + 1) % opts.length]); }}
          onExport={() => fireToast('Exportando CSV…')}
          onNew={() => setShowModal(true)}
        />

        {active === 'home'      && <HomeView rows={rows} fireToast={fireToast}/>}
        {active === 'campaigns' && <CampaignsView rows={campaigns} onNew={() => setShowModal(true)} fireToast={fireToast}/>}
        {active === 'insights'  && <InsightsView fireToast={fireToast}/>}
        {active === 'channels'  && <ChannelsView fireToast={fireToast}/>}
        {active === 'audiences' && <AudiencesView fireToast={fireToast}/>}
        {active === 'settings'  && <SettingsView fireToast={fireToast}/>}
      </main>

      {showModal && <NewCampaignModal onClose={() => setShowModal(false)} onSubmit={handleNew}/>}
      {toast && <Toast msg={toast}/>}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
