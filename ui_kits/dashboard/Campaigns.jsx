/* global React, ChannelDot, StatusPill, MiniSpark, SearchInput, FilterChips, StatStrip, Icon, ICONS, eur, num, CAMPAIGNS_FULL */
const { useState: useCState, useMemo } = React;

const CampaignsView = ({ rows, onNew, fireToast }) => {
  const [q, setQ] = useCState('');
  const [filter, setFilter] = useCState('Todos');
  const [sortKey, setSortKey] = useCState('spend');
  const data = rows && rows.length ? rows : CAMPAIGNS_FULL;

  const filtered = useMemo(() => {
    let r = data.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.channel.toLowerCase().includes(q.toLowerCase()));
    if (filter !== 'Todos') r = r.filter(c => c.status === filter);
    r = [...r].sort((a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0));
    return r;
  }, [data, q, filter, sortKey]);

  const totalSpend = data.reduce((s, c) => s + c.spend, 0);
  const totalConv = data.reduce((s, c) => s + (c.conv || 0), 0);
  const activeCount = data.filter(c => c.status === 'Activo').length;
  const avgRoas = (data.reduce((s, c) => s + c.roas, 0) / data.length);

  const cols = '2.6fr 1fr 1.05fr 0.9fr 1fr 0.85fr 1fr 0.95fr';
  const Th = ({ children, k, right }) => (
    <button onClick={() => k && setSortKey(k)} style={{
      background: 'none', border: 'none', padding: 0, cursor: k ? 'pointer' : 'default', font: 'inherit',
      display: 'flex', alignItems: 'center', gap: 4, justifyContent: right ? 'flex-end' : 'flex-start',
      fontSize: 10.5, color: sortKey === k ? 'var(--fg1)' : 'var(--fg3)', fontWeight: 600,
      letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-ui)',
    }}>
      {children}{k && <span style={{ opacity: sortKey === k ? 1 : 0.3 }}><Icon d={ICONS.arrowDown} size={10} stroke={2}/></span>}
    </button>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <StatStrip items={[
        { label: 'Campañas', value: num(data.length) },
        { label: 'Activas', value: num(activeCount) },
        { label: 'Inversión total', value: eur(totalSpend) },
        { label: 'Conversiones', value: num(totalConv) },
        { label: 'ROAS medio', value: avgRoas.toFixed(1) + '×' },
      ]}/>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <FilterChips options={['Todos', 'Activo', 'Test', 'Pausado', 'Borrador']} value={filter} onChange={setFilter}/>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <SearchInput value={q} onChange={setQ} placeholder="Buscar campaña o canal…"/>
          <button className="btn btn--ghost" onClick={() => fireToast?.('Filtros avanzados próximamente')}><Icon d={ICONS.filter} size={14}/>Filtros</button>
        </div>
      </div>

      {/* Tabla */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, padding: '12px 20px', background: 'var(--bg)', borderBottom: '1px solid var(--line)', gap: 12 }}>
          <Th k="name">Campaña</Th>
          <Th>Canal</Th>
          <Th k="spend" right>Inversión</Th>
          <Th k="conv" right>Conv.</Th>
          <Th k="roas" right>ROAS</Th>
          <Th k="cpl" right>CPL</Th>
          <Th>Tendencia</Th>
          <Th>Estado</Th>
        </div>
        {filtered.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: cols, padding: '13px 20px', gap: 12,
            borderBottom: i < filtered.length - 1 ? '1px solid var(--line-2)' : 'none', alignItems: 'center', fontSize: 13, color: 'var(--fg1)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500, minWidth: 0 }}>
              <ChannelDot name={r.channel}/>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</span>
            </span>
            <span style={{ fontSize: 12.5, color: 'var(--fg3)' }}>{r.channel}</span>
            <span className="tnum" style={{ textAlign: 'right' }}>{eur(r.spend)}</span>
            <span className="tnum" style={{ textAlign: 'right', color: 'var(--fg3)' }}>{num(r.conv || 0)}</span>
            <span className="tnum" style={{ textAlign: 'right', color: r.roas >= 3 ? 'var(--pos-ink)' : 'var(--neg-ink)', fontWeight: 600 }}>{r.roas.toFixed(1)}×</span>
            <span className="tnum" style={{ textAlign: 'right' }}>€{r.cpl.toFixed(2)}</span>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <MiniSpark data={r.trend || [50,50,50]} color={r.roas >= 3 ? 'var(--accent)' : 'var(--neg)'} w={84} h={24} fill={false}/>
            </span>
            <span><StatusPill status={r.status}/></span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--fg3)', fontSize: 13.5 }}>
            No hay campañas que coincidan con «{q || filter}».
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
          <span style={{ fontSize: 12, color: 'var(--fg3)' }}>{filtered.length} de {data.length} campañas</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn--ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => fireToast?.('Exportando selección…')}><Icon d={ICONS.download} size={13}/>Exportar</button>
            <button className="btn btn--primary" style={{ padding: '6px 12px', fontSize: 12 }} onClick={onNew}><Icon d={ICONS.plus} size={13}/>Nueva campaña</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { CampaignsView });
