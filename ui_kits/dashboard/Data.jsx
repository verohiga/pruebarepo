/* global React */
/* Datasets compartidos por las vistas del dashboard.
   Mismos canales y paleta que Table.jsx (CHANNEL_COLORS). */

// trayectorias cortas para mini-sparklines (14 puntos)
const T = {
  up:   [42,46,44,50,48,55,53,60,64,62,70,74,72,80],
  up2:  [30,34,33,38,40,44,47,49,53,56,58,62,66,70],
  flat: [50,52,49,51,50,53,51,52,50,53,52,54,53,55],
  down: [78,74,76,70,68,64,62,58,54,52,48,44,42,38],
  dip:  [60,64,58,52,48,44,46,50,54,52,56,60,63,66],
};

const CHANNELS_FULL = [
  { label: 'LinkedIn', color: '#0A66C2', spend: 482100, conv: 612, roas: 5.2, cpl:  8.20, delta:  14.2, trend: T.up,   status: 'Conectado'   },
  { label: 'Meta',     color: '#0866FF', spend: 324400, conv: 884, roas: 4.1, cpl: 11.40, delta:   6.4, trend: T.up2,  status: 'Conectado'   },
  { label: 'TikTok',   color: '#282A2D', spend: 187000, conv: 301, roas: 1.8, cpl: 14.90, delta:  -8.1, trend: T.down, status: 'Sincronizando' },
  { label: 'Google',   color: '#4285F4', spend:  91200, conv: 268, roas: 6.0, cpl:  5.40, delta:   9.7, trend: T.up,   status: 'Conectado'   },
  { label: 'Bing',     color: '#5E5E5E', spend:  42800, conv:  74, roas: 2.4, cpl: 12.10, delta:   2.1, trend: T.flat, status: 'Conectado'   },
];

const CAMPAIGNS_FULL = [
  { name: 'Q2 · Lead-gen senior',        channel: 'LinkedIn', spend: 48210, conv: 312, roas: 5.2, cpl:  8.20, status: 'Activo',   trend: T.up   },
  { name: 'Awareness · Retargeting EU',  channel: 'Meta',     spend: 32440, conv: 421, roas: 4.1, cpl: 11.40, status: 'Activo',   trend: T.up2  },
  { name: 'Brand · TikTok creators',     channel: 'TikTok',   spend: 18700, conv: 198, roas: 1.8, cpl: 14.90, status: 'Test',     trend: T.dip  },
  { name: 'Search · Brand keywords',     channel: 'Google',   spend:  9120, conv: 168, roas: 6.0, cpl:  5.40, status: 'Pausado',  trend: T.flat },
  { name: 'Display · Prospecting',       channel: 'Bing',     spend:  4280, conv:  44, roas: 2.4, cpl: 12.10, status: 'Activo',   trend: T.flat },
  { name: 'ABM · Cuentas enterprise',    channel: 'LinkedIn', spend: 27600, conv: 121, roas: 4.7, cpl:  9.80, status: 'Activo',   trend: T.up   },
  { name: 'Lookalike · Compradores 1%',  channel: 'Meta',     spend: 21300, conv: 356, roas: 3.6, cpl: 10.20, status: 'Activo',   trend: T.up2  },
  { name: 'Reels · Producto Q2',         channel: 'TikTok',   spend: 12450, conv: 142, roas: 2.1, cpl: 13.40, status: 'Test',     trend: T.dip  },
  { name: 'PMax · Catálogo',             channel: 'Google',   spend: 15800, conv: 233, roas: 5.4, cpl:  6.10, status: 'Activo',   trend: T.up   },
  { name: 'Webinar · Nurturing',         channel: 'LinkedIn', spend:  8900, conv:  62, roas: 3.9, cpl: 11.90, status: 'Pausado',  trend: T.down },
  { name: 'Stories · Black week',        channel: 'Meta',     spend:  6100, conv:  88, roas: 2.9, cpl: 12.80, status: 'Borrador', trend: T.flat },
];

const INSIGHTS = [
  { severity: 'opportunity', category: 'Presupuesto',  title: 'LinkedIn Lead-gen está infrautilizada',
    body: 'Tu mejor ROAS (5.2×) viene de LinkedIn pero solo recibe el 18% del presupuesto. Subir a 30% podría aportar +€42K en pipeline este mes.',
    metric: '+€42K', metricLabel: 'pipeline est.' },
  { severity: 'critical', category: 'Pujas', title: 'TikTok creators quema presupuesto',
    body: 'ROAS de 1.8× y CPL un 38% por encima de la media. La campaña "Brand · TikTok creators" lleva 9 días por debajo del umbral de rentabilidad.',
    metric: '−€7.4K', metricLabel: 'pérdida 30d' },
  { severity: 'opportunity', category: 'Creatividades', title: '3 creatividades de Meta con fatiga',
    body: 'La frecuencia superó 4.2 y el CTR cayó un 27% en 7 días. Rotar creatividades en "Awareness · Retargeting EU" recuperaría el rendimiento inicial.',
    metric: '+19%', metricLabel: 'CTR potencial' },
  { severity: 'info', category: 'Audiencias', title: 'Solapamiento entre 2 lookalikes',
    body: 'Las audiencias "Lookalike 1%" y "Compradores 90d" comparten un 31% de usuarios, inflando el coste por puja. Excluye una en prospecting.',
    metric: '31%', metricLabel: 'solapamiento' },
  { severity: 'opportunity', category: 'Presupuesto', title: 'Google Search escala con margen',
    body: 'Search Brand mantiene ROAS 6.0× con cuota de impresiones del 62%. Hay espacio para +€6K/mes sin saturar la subasta.',
    metric: '+€6K', metricLabel: 'margen escala' },
];

const AUDIENCES = [
  { name: 'Lookalike · Compradores 1%', type: 'Lookalike',   reach: 1240000, match: 92, roas: 3.6, cpl: 10.20, status: 'Activo'  },
  { name: 'Retargeting · 30 días',      type: 'Retargeting', reach:  186000, match: 98, roas: 5.8, cpl:  6.40, status: 'Activo'  },
  { name: 'ABM · Cuentas enterprise',   type: 'Lista',       reach:   12400, match: 71, roas: 4.7, cpl:  9.80, status: 'Activo'  },
  { name: 'Intereses · SaaS B2B',       type: 'Interés',     reach: 3100000, match: 64, roas: 2.4, cpl: 13.10, status: 'Test'    },
  { name: 'Visitantes web · 90 días',   type: 'Retargeting', reach:  420000, match: 95, roas: 4.9, cpl:  7.90, status: 'Activo'  },
  { name: 'Newsletter · Suscriptores',  type: 'Lista',       reach:   58000, match: 88, roas: 4.2, cpl:  8.60, status: 'Pausado' },
];

const DEMOGRAPHICS = {
  age: [
    { label: '18–24', value: 12 },
    { label: '25–34', value: 38 },
    { label: '35–44', value: 29 },
    { label: '45–54', value: 14 },
    { label: '55+',   value: 7 },
  ],
  device: [
    { label: 'Móvil',     value: 64, color: '#0A66C2' },
    { label: 'Desktop',   value: 29, color: '#4285F4' },
    { label: 'Tablet',    value: 7,  color: '#A8AAAE' },
  ],
  geo: [
    { label: 'Madrid',     value: 31 },
    { label: 'Barcelona',  value: 24 },
    { label: 'Valencia',   value: 12 },
    { label: 'Sevilla',    value: 9 },
    { label: 'Bilbao',     value: 7 },
  ],
};

const MEMBERS = [
  { name: 'Elena Ruiz',     email: 'elena@acme.es',    role: 'Owner',  initials: 'ER', color: '#0A66C2' },
  { name: 'Marc Soler',     email: 'marc@acme.es',     role: 'Admin',  initials: 'MS', color: '#0866FF' },
  { name: 'Nora Calvo',     email: 'nora@acme.es',     role: 'Editor', initials: 'NC', color: '#9D6DFB' },
  { name: 'David Ferrer',   email: 'david@acme.es',    role: 'Editor', initials: 'DF', color: '#00F9FF' },
  { name: 'Lucía Méndez',   email: 'lucia@acme.es',    role: 'Lectura',initials: 'LM', color: '#5E5E5E' },
];

Object.assign(window, {
  CHANNELS_FULL, CAMPAIGNS_FULL, INSIGHTS, AUDIENCES, DEMOGRAPHICS, MEMBERS, TRENDS: T,
});
