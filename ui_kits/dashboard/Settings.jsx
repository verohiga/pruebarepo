/* global React, Segmented, Toggle, Avatar, ChannelDot, CardHead, Icon, ICONS, MEMBERS, CHANNELS_FULL */
const { useState: useSState } = React;

const Field = ({ label, children, hint }) => (
  <label style={{ display: 'block' }}>
    <div style={{ fontSize: 11.5, color: 'var(--fg2)', fontWeight: 600, marginBottom: 6 }}>{label}</div>
    {children}
    {hint && <div style={{ fontSize: 11.5, color: 'var(--fg4)', marginTop: 5 }}>{hint}</div>}
  </label>
);

const Row = ({ children, last }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: last ? 'none' : '1px solid var(--line-2)' }}>{children}</div>
);

const AccountPanel = ({ fireToast }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
    <div className="card" style={{ padding: 22 }}>
      <CardHead title="Workspace"/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Nombre del workspace"><input className="input" style={{ width: '100%' }} defaultValue="Acme S.L."/></Field>
        <Field label="Dominio" hint="Se usa para invitar miembros automáticamente."><input className="input" style={{ width: '100%' }} defaultValue="acme.es"/></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Zona horaria"><input className="input" style={{ width: '100%' }} defaultValue="Europe/Madrid (GMT+1)"/></Field>
          <Field label="Moneda"><input className="input" style={{ width: '100%' }} defaultValue="EUR · €"/></Field>
        </div>
      </div>
    </div>
    <div className="card" style={{ padding: 22 }}>
      <CardHead title="Plan"/>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span className="kpi" style={{ fontSize: 32 }}>Pro</span>
        <span style={{ fontSize: 13, color: 'var(--fg3)' }}>· €290/mes · facturación anual</span>
      </div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[['Workspaces', '1 de 3'], ['Miembros', '5 de 10'], ['Canales conectados', '4 de ∞'], ['Inversión gestionada', '€1.28M / mes']].map(([k, v], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: 'var(--fg3)' }}>{k}</span><span className="tnum" style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
        <button className="btn btn--primary" style={{ padding: '8px 14px', fontSize: 12.5 }} onClick={() => fireToast?.('Abriendo gestión de plan…')}>Gestionar plan</button>
        <button className="btn btn--ghost" style={{ padding: '8px 14px', fontSize: 12.5 }}>Ver facturas</button>
      </div>
    </div>
  </div>
);

const IntegrationsPanel = ({ fireToast }) => {
  const [conn, setConn] = useSState(Object.fromEntries(CHANNELS_FULL.map(c => [c.label, c.status !== 'Sincronizando'])));
  return (
    <div className="card" style={{ padding: '6px 22px 14px' }}>
      <div style={{ padding: '16px 0 4px' }}><CardHead title="Canales conectados" action={<span style={{ fontSize: 11.5, color: 'var(--fg4)' }}>{Object.values(conn).filter(Boolean).length} activos</span>}/></div>
      {CHANNELS_FULL.map((c, i) => (
        <Row key={c.label} last={i === CHANNELS_FULL.length - 1}>
          <ChannelDot name={c.label} size={32}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{c.label} Ads</div>
            <div style={{ fontSize: 12, color: 'var(--fg3)' }}>{conn[c.label] ? `Sincronizado · ${num0(c.spend)} este mes` : 'Sin conectar'}</div>
          </div>
          <span style={{ fontSize: 12, color: conn[c.label] ? 'var(--pos-ink)' : 'var(--fg4)', fontWeight: 600 }}>{conn[c.label] ? 'Conectado' : 'Desconectado'}</span>
          <Toggle on={conn[c.label]} onClick={() => { setConn(s => ({ ...s, [c.label]: !s[c.label] })); fireToast?.(`${c.label} ${conn[c.label] ? 'desconectado' : 'conectado'}`); }}/>
        </Row>
      ))}
    </div>
  );
};
const num0 = n => '€' + n.toLocaleString('es-ES');

const ROLE_PILL = { Owner: { bg: 'var(--accent-soft)', fg: 'var(--accent-deep)' }, Admin: { bg: 'rgba(10,102,194,.12)', fg: '#0A66C2' }, Editor: { bg: 'var(--line-2)', fg: '#4A4C4F' }, Lectura: { bg: 'var(--line-2)', fg: '#7E8084' } };

const MembersPanel = ({ fireToast }) => (
  <div className="card" style={{ padding: '6px 22px 14px' }}>
    <div style={{ padding: '16px 0 4px' }}><CardHead title="Miembros del equipo" action={<button className="btn btn--primary" style={{ padding: '7px 13px', fontSize: 12 }} onClick={() => fireToast?.('Invitación enviada')}><Icon d={ICONS.plus} size={13}/>Invitar</button>}/></div>
    {MEMBERS.map((m, i) => {
      const r = ROLE_PILL[m.role] || ROLE_PILL.Editor;
      return (
        <Row key={i} last={i === MEMBERS.length - 1}>
          <Avatar initials={m.initials} color={m.color}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
            <div style={{ fontSize: 12, color: 'var(--fg3)' }}>{m.email}</div>
          </div>
          <span style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: 6, background: r.bg, color: r.fg, fontSize: 11, fontWeight: 600 }}>{m.role}</span>
          <button className="btn btn--ghost" style={{ padding: '6px 10px', fontSize: 12 }}>Gestionar</button>
        </Row>
      );
    })}
  </div>
);

const NotificationsPanel = () => {
  const [n, setN] = useSState({ insights: true, alerts: true, weekly: true, budget: false, members: true });
  const items = [
    ['insights', 'Nuevos insights de IA', 'Recibe un aviso cuando la IA detecta una oportunidad o riesgo.'],
    ['alerts', 'Alertas de rendimiento', 'Campañas que caen por debajo del umbral de ROAS objetivo.'],
    ['budget', 'Límites de presupuesto', 'Avisa al alcanzar el 80% del presupuesto mensual.'],
    ['weekly', 'Resumen semanal', 'Digest de rendimiento cada lunes por la mañana.'],
    ['members', 'Actividad del equipo', 'Invitaciones, cambios de rol y nuevas campañas creadas.'],
  ];
  return (
    <div className="card" style={{ padding: '6px 22px 14px', maxWidth: 720 }}>
      <div style={{ padding: '16px 0 4px' }}><CardHead title="Notificaciones por email"/></div>
      {items.map(([k, t, d], i) => (
        <Row key={k} last={i === items.length - 1}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{t}</div>
            <div style={{ fontSize: 12, color: 'var(--fg3)', marginTop: 2 }}>{d}</div>
          </div>
          <Toggle on={n[k]} onClick={() => setN(s => ({ ...s, [k]: !s[k] }))}/>
        </Row>
      ))}
    </div>
  );
};

const SettingsView = ({ fireToast }) => {
  const [tab, setTab] = useSState('Cuenta');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Segmented options={['Cuenta', 'Integraciones', 'Miembros', 'Notificaciones']} value={tab} onChange={setTab}/>
      {tab === 'Cuenta' && <AccountPanel fireToast={fireToast}/>}
      {tab === 'Integraciones' && <IntegrationsPanel fireToast={fireToast}/>}
      {tab === 'Miembros' && <MembersPanel fireToast={fireToast}/>}
      {tab === 'Notificaciones' && <NotificationsPanel/>}
    </div>
  );
};

Object.assign(window, { SettingsView });
