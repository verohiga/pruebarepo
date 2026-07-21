# CooperVision Iberia · BBDD Maestra de Ópticas

**Prototipo HTML de alta fidelidad** generado con Claude Design (Newno, Mayo–Junio 2026).

---

## Cómo abrir

1. **Abrir directamente:** abre `index.html` en cualquier navegador moderno.
   - No necesita servidor web. Todos los datos viven en `window.mockData` (ver `data.js`).
   - Mínimo 1280px de ancho (aplicación desktop interna).

2. **Si hay problemas con `fetch` sobre `file://`:** lanza un servidor local:
   ```bash
   npx http-server . -p 8080
   # o:
   python3 -m http.server 8080
   ```
   Luego abre `http://localhost:8080/`.

3. **Punto de entrada alternativo:** `views/login.html` — pantalla de login standalone que redirige a `index.html#/`.

---

## Arquitectura del prototipo

```
coopervision/
├── index.html              ← Shell principal del SPA (topbar + rail + #view-root)
├── app.js                  ← Router hash, gestión de estado, delegación de eventos
├── data.js                 ← window.mockData: todas las tablas relacionales + mock data
│
├── styles/
│   ├── tokens.css          ← Variables CSS del DS Newno v1.1 (colores, espaciado, tipo)
│   └── components.css      ← Componentes base: card, btn, input, pill, table, modal, toast…
│
├── views/
│   ├── views.css           ← Estilos específicos de vistas (bbdd, mapa, admin, A3…)
│   ├── charts.js           ← window.cpvCharts: helpers SVG para gráficos (sin deps)
│   ├── resumen.js          ← V1 Resumen
│   ├── bi.js               ← V2 Business Intelligence
│   ├── mapa.js             ← V3 Mapa (Leaflet)
│   ├── bbdd.js             ← V4 Base de datos
│   ├── changelog.js        ← V6 Changelog / Auditoría
│   ├── admin-shared.js     ← Subnav horizontal compartido del área admin
│   ├── admin-operaciones.js ← A2 Operaciones de datos (sync)
│   ├── admin-revision.js   ← A3 Revisión de datos (matching FK)
│   ├── admin-usuarios.js   ← A1 Gestión de usuarios
│   ├── admin-cadenas.js    ← A4 Lista maestra de cadenas
│   ├── admin-logs.js       ← A5 Logs de actividad
│   └── login.html          ← Login standalone
│
├── components/
│   ├── drawer-detalle.css  ← Estilos del drawer V5 Detalle de óptica
│   └── drawer-detalle.js   ← V5 Detalle de óptica (drawer 480px, 5 tabs)
│
├── preview.html            ← Styleguide standalone del DS (tokens + componentes)
└── design_handoff_bbdd_opticas/
    └── README.md           ← Handoff técnico detallado (spec por vista + decisiones pendientes)
```

> **Equipo técnico:** empieza por `design_handoff_bbdd_opticas/README.md` — spec pantalla por pantalla, modelo de datos, interacciones globales y decisiones pendientes con CooperVision.

**Patrón de vistas:** cada módulo `views/*.js` registra un objeto en `window.cpvViews['/ruta']`:
```js
window.cpvViews['/ruta'] = {
  render(state, ctx) { return htmlString; },  // state: 'default'|'loading'|'empty'|'error'
  mounted(root, state, ctx) { /* bind events */ },
};
```
`app.js` llama a `render()` + `mounted()` en cada navegación. Sin React, sin build.

---

## Vistas y rutas

| Ruta | Vista | Rol | Estado |
|---|---|---|---|
| `#/` | V1 Resumen | todos | ✅ Completo |
| `#/bi` | V2 Business Intelligence | todos | ✅ Completo |
| `#/mapa` | V3 Mapa (Leaflet) | todos | ✅ Completo |
| `#/bbdd` | V4 Base de datos | todos | ✅ Completo |
| `#/changelog` | V6 Changelog / Auditoría | admin | ✅ Completo |
| `#/admin/usuarios` | A1 Gestión de usuarios | admin | ✅ Completo |
| `#/admin/operaciones` | A2 Operaciones de datos | admin | ✅ Completo |
| `#/admin/revision` | A3 Revisión de datos | admin | ✅ Completo |
| `#/admin/cadenas` | A4 Lista maestra de cadenas | admin | ✅ Completo |
| `#/admin/logs` | A5 Logs de actividad | admin | ✅ Completo |
| `#/login` | Login inline | — | ✅ Completo |
| `#/perfil` | Mi perfil | todos | ✅ Completo |
| `#/styleguide` | Styleguide DS Newno v1.1 | todos | ✅ Completo |
| `views/login.html` | Login standalone | — | ✅ Completo |

**Todos los estados:** cada vista implementa `default`, `loading`, `empty`, `error`.  
El selector **ESTADO** del topbar del prototipo alterna entre ellos.

---

## Controles del prototipo (topbar)

| Control | Función |
|---|---|
| **ROL Admin / User** | Alterna permisos. User no ve Admin ni puede editar. |
| **ESTADO Default / Loading / Empty / Error** | Fuerza el estado de la vista activa. |

Persistidos en `localStorage`: `cpv_role`, `cpv_screen_state`.

---

## Modelo de datos mock

`data.js` expone `window.mockData` con ~40 ópticas de ejemplo:

| Colección | Descripción |
|---|---|
| `opticas_google` | ~40 registros Outscraper/Google Maps |
| `opticas_cpv` | ~15 registros Salesforce CooperVision (FK `place_id_fk`) |
| `opticas_app_data` | 1:1 con `opticas_google`, campos app |
| `opticas_overrides` | Log append-only de correcciones manuales |
| `cadenas` | 25 cadenas (ES + PT) |
| `usuarios` | 14 usuarios |
| `syncs_historial` | Histórico de sincronizaciones |
| `syncs_config` | Configuración de frecuencia |
| `matching_candidatos` | 3 registros para A3 Revisión |
| `no_encontrados` | 2 registros para A3 Revisión |
| `logs_actividad` | 25 eventos de auditoría |
| `cambios_historicos` | Eventos para V6 Changelog |
| `resumen_kpis` | KPIs precomputados para V1 |

---

## Design System · Tokens principales

### Colores

| Token | Valor | Uso |
|---|---|---|
| `--accent` | `#C5E817` | Lime Newno — acento primario |
| `--accent-ink` | `#1A1A1A` | Texto sobre acento |
| `--accent-ink-deep` | `#4A5C06` | Links/íconos sobre fondo claro |
| `--bg` | `oklch(97.5% .005 80)` | Fondo página (warm off-white) |
| `--card` | `oklch(99.5% .003 80)` | Fondo card |
| `--ink` | `oklch(14% .008 270)` | Texto principal |
| `--ink-2` | `oklch(26% .008 270)` | Texto secundario |
| `--muted` | `oklch(55% .008 270)` | Texto muted |
| `--line-2` | `oklch(91% .008 270)` | Bordes / divisores |
| `--pos-ink` | `oklch(38% .14 145)` | Verde positivo |
| `--warn-ink` | `oklch(47% .14 55)` | Ámbar warning |
| `--neg-ink` | `oklch(42% .18 20)` | Rojo error |

### Tipografía

| Token | Valor |
|---|---|
| `--font-display` | `'Outfit', system-ui` |
| `--font-body` | `'Inter', system-ui` |
| `--font-mono` | `'JetBrains Mono', monospace` |

### Espaciado (múltiplos de 4px)

`--space-1: 4px` · `--space-2: 8px` · `--space-3: 12px` · `--space-4: 16px`  
`--space-5: 20px` · `--space-6: 24px` · `--space-7: 32px` · `--space-8: 40px`

### Radios

`--radius-sm: 4px` · `--radius-md: 8px` · `--radius-lg: 12px` · `--radius-xl: 16px` · `--radius-full: 9999px`

---

## Componentes reutilizables (components.css)

### Botones
```html
<button class="btn btn-primary btn-sm">Acción</button>
<button class="btn btn-ghost btn-sm">Secundario</button>
<button class="btn btn-subtle btn-sm">Sutil</button>
<button class="btn btn-destructive btn-sm">Eliminar</button>
<button class="btn-icon"><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button>
```

### Pills / badges
```html
<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Activa</span>
<span class="pill pill-warn pill-sm">Pendiente</span>
<span class="pill pill-neg pill-sm">Error</span>
<span class="pill pill-accent pill-sm">Admin</span>
<span class="pill pill-neutral pill-sm">Usuario</span>
```

### Tablas
```html
<div class="table-wrap">
  <table class="table-dense"><!-- filas 40px -->
  <table class="table-dense table-ultra"><!-- filas 32px (A5 Logs) -->
```

### Iconos
Iconoir via `iconify-icon` web component:
```html
<iconify-icon icon="iconoir:check-circle" width="16"></iconify-icon>
```
Catálogo completo: [iconoir.com](https://iconoir.com)

---

## Notas para el equipo técnico

### Stack de producción (confirmado)
- **Backend:** Python + Django + DRF
- **Frontend:** React + Vite + TypeScript
- **Estilos:** Bootstrap (base) + tokens DS Newno v1.1 por encima
- **Iconos:** `iconoir-react` (en prototipo: `iconify-icon` web component)
- **Charts:** Recharts (en prototipo: SVG a mano vía `cpvCharts`)
- **Mapa:** Leaflet (igual en producción)

### Patrón de overrides
Los overrides son append-only en `opticas_overrides`. Al leer una óptica, se aplican on-top del valor original. El prototipo simula esto en `data.js` con `mockData.helpers.applyOverrides(place_id)`.

### A3 Revisión: flujo crítico
La vista más compleja. Gestiona una cola de matching post-sync. Ver `views/admin-revision.js` para la lógica completa de estados (conflicto → solo_cpv → no_encontrado), transiciones fade y atajos de teclado (V/D/S).

### Drawer V5 Detalle de óptica
`components/drawer-detalle.js` implementa el drawer de 480px con 5 tabs. Se activa desde V4 haciendo click en cualquier fila de la tabla. Incluye modal "Corregir dato" para insertar overrides.

### Datos sensibles en rol `user`
Pendiente decisión con CooperVision (ver PRD §10.1): ¿los campos `CODIGO`, `GRUPO`, `DP`, `COM`, `TIPOLOGIA`, `SEGMENTACION` son visibles para rol `user`? El prototipo los muestra a todos. Implementar como capa de permisos en el backend.

---

*Generado por Claude Design · Newno · Junio 2026*
