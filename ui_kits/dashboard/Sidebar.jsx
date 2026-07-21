/* global React */
const { useState } = React;

/* Icon · Iconoir (estándar único) vía web component de Iconify.
   Mantiene la API <Icon d={ICONS.x} size=… />; `d` es ahora el nombre
   Iconoir (p. ej. "iconoir:home-simple"). El stroke lo fija la propia
   librería (1.5 por defecto), por eso no se expone como prop. */
const Icon = ({ d, size = 18 }) => (
  <iconify-icon icon={d} width={size} height={size} style={{ display: 'inline-flex', flexShrink: 0 }}></iconify-icon>
);

const ICONS = {
  home:      'iconoir:home-simple',
  campaigns: 'iconoir:megaphone',
  insights:  'iconoir:graph-up',
  channels:  'iconoir:globe',
  audiences: 'iconoir:group',
  settings:  'iconoir:settings',
  search:    'iconoir:search',
  chevron:   'iconoir:nav-arrow-down',
  plus:      'iconoir:plus',
  download:  'iconoir:download',
  arrowUp:   'iconoir:arrow-up',
  arrowDown: 'iconoir:arrow-down',
  sparkles:  'iconoir:sparks',
  filter:    'iconoir:filter',
};

const Sidebar = ({ active, onNav }) => {
  const items = [
    ['home', 'Resumen'],
    ['campaigns', 'Campañas'],
    ['insights', 'Insights'],
    ['channels', 'Canales'],
    ['audiences', 'Audiencias'],
    ['settings', 'Ajustes'],
  ];
  return (
    <aside style={{ width: 240, background: '#fff', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', padding: '20px 16px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', marginBottom: 28 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', color: 'var(--fg1)' }}>
          Newno
        </span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {items.map(([k, label]) => {
          const on = active === k;
          return (
            <button key={k} onClick={() => onNav(k)} className={'nav-item' + (on ? ' nav-item--on' : '')}>
              <Icon d={ICONS[k]} />{label}
            </button>
          );
        })}
      </nav>
      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent-ink)', fontSize: 14 }}>A</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fg1)' }}>Acme S.L.</div>
          <div style={{ fontSize: 11, color: 'var(--fg3)' }}>Plan Pro · 3 users</div>
        </div>
      </div>
    </aside>
  );
};

Object.assign(window, { Icon, ICONS, Sidebar });
