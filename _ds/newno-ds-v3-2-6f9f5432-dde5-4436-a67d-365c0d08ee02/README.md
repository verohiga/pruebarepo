# Newno Design System — cómo construir con él

Sistema de marca de **Newno** (agencia de marketing full-stack). Un solo acento, fondos blancos, tipografía Outfit/Inter/JetBrains Mono. Construye **componiendo** los componentes de la librería; el "pegamento" de layout lo estilas con las **CSS variables** y las **clases semánticas** de abajo. **No es Tailwind ni props de tema** — el idioma es `style={{…}}` con `var(--*)` + clases.

## Montaje y setup
- Enlaza `styles.css`: importa `fonts/fonts.css` (`@font-face`) y `_ds_bundle.css` (tokens + clases). Es lo único que necesitas para color, fuentes y clases. Sin él, todo cae a fuente del navegador.
- Los componentes se resuelven entre sí en runtime vía el global del bundle — no necesitan provider de React. **No** envuelvas en ningún ThemeProvider.
- **Toda pantalla de producto empieza en `<AppShell>`** (rail flotante + main, con push y overlay+scrim <1024). El menú es `Sidebar` con items por props (data del producto). No montes un layout de panel a mano.
- **Acento por tema**: el acento sale de `--accent`. Para un producto de Newno Lab, pon `data-theme` en un ancestro: `data-theme="barbara" | "haruka" | "luca" | "markus" | "teresa"`. `data-theme="dark"` para modo oscuro (opt-in).

## Reglas duras (no las rompas)
- **Un solo acento: lima `var(--accent)` (#C5E818).** Nunca un segundo acento en la misma vista. Hover = `--accent-strong`.
- **Texto sobre lima = `--accent-ink` (#282A2D)**, nunca blanco (excepto Teresa).
- **Todos los fondos son blancos** (`--bg`/`--card`). Separa superficies con borde `--line` + sombra `--shadow-e1`, nunca con color de fondo.
- **Nav activo = barra de acento a la izquierda, nunca relleno lima** (un fill compite con el CTA primary).
- **Radio de card ≤ 14px** (`--r-xl`). Iconos: solo el componente `Icon` (Iconoir). Sin emoji como icono.

## El idioma de estilo (vocabulario real)
Estila tu layout con estas **CSS vars** (definidas en `_ds_bundle.css`):
- Color: `--accent`, `--accent-strong`, `--accent-ink`, `--accent-soft`, `--accent-deep`; tinta `--fg1 --fg2 --fg3 --fg4`; gris `--gray-100…600`; bordes `--line --line-2`; superficie `--bg --card`; semánticos `--pos --neg --warn-* --paused-*`.
- Tipo: `--font-display` (Outfit, ≥16px/KPIs/headings), `--font-ui` (Inter, body/UI), `--font-mono` (JetBrains Mono, valores técnicos). Todo número lleva `font-variant-numeric: tabular-nums`.
- Espacio/radio/sombra/motion: `--space-1…9`, `--r-sm/md/lg/xl/island`, `--shadow-e1/e2/e3`, `--ease`, `--dur-fast/base/slow`.

Clases semánticas listas (de `styles.css`): `.card`, `.btn .btn--primary|--ghost|--dark`, `.pill .pill--accent|--pos|--neg|--paused|--test|--neutral|--dark`, `.kpi`, `.tnum`, `.eyebrow`, `.body-s`, `.caption`, `.input`, `.mono`, `h1/.h1 h2/.h2 h3/.h3`.

## Dónde está la verdad
Lee antes de estilar: `styles.css` y sus `@import` — `_ds_bundle.css` (tokens + clases) y `fonts/fonts.css`. Por componente: `components/<grupo>/<Name>/<Name>.d.ts` (API) y `<Name>.prompt.md` (uso). Componentes: **atoms** (Button, Pill, Delta, ChannelChip, Toggle, Segmented, SearchInput, FilterChips, Avatar) · **data** (KPICard, Sparkline, AreaChart, ChannelDonut, ProgressBar, DataTable, AIInsight) · **icons** (Icon) · **shell** (AppShell, Sidebar, PageHeader). También importables: `StatusPill`, `ChannelDot`, `DEFAULT_NAV`, `NEWNO_ICONS`, `CHANNEL_COLORS`.

## Ejemplo idiomático
```jsx
<AppShell active="home" brand="Newno" account="Acme S.L." accountMeta="Plan Pro">
  <PageHeader workspace="Acme S.L." title="Resumen" range="Últimos 30 días" />
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
    <KPICard label="Spend total" value="€128,4K" delta={12.4} data={serie} />
    <KPICard label="ROAS" value="4,2×" delta={8.1} data={serie} accent />
    <KPICard label="CPL" value="€18,40" delta={-6.3} invert data={cpl} />
  </div>
</AppShell>
```
El control viene de la librería (`KPICard`); el grid lo estilas tú con `var(--space-4)`. Idioma español (UI), inglés solo para labels técnicos (`ROAS`, `CPL`).

# NewnoDesignSystem019e1d (@newno/ds@3.2.0)

This design system is the published @newno/ds React library, bundled as a single
browser global. All 20 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.NewnoDesignSystem019e1d`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.NewnoDesignSystem019e1d.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { AIInsight } = window.NewnoDesignSystem019e1d;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<AIInsight />);
```

## Tokens

112 CSS custom properties from @newno/ds. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **spacing** (9): `--space-1`, `--space-2`, `--space-3`, …
- **typography** (3): `--font-display`, `--font-ui`, `--font-mono`
- **shadow** (5): `--shadow-e0`, `--shadow-e1`, `--shadow-e2`, …
- **other** (95): `--accent`, `--accent-strong`, `--accent-ink`, …

## Components

### data
- `AIInsight`
- `AreaChart`
- `ChannelDonut`
- `DataTable`
- `KPICard`
- `ProgressBar`
- `Sparkline`

### shell
- `AppShell`
- `PageHeader`
- `Sidebar`

### atoms
- `Avatar`
- `Button`
- `ChannelChip`
- `Delta`
- `FilterChips`
- `Pill`
- `SearchInput`
- `Segmented`
- `Toggle`

### icons
- `Icon`
