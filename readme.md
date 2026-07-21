# Newno Design System

A self-contained design system for **Newno**, a full-stack marketing agency based in Spain. The visual identity is **editorial-calm + data-confident**: lots of air, a firm grid, one lime-yellow accent (`#C5E818`) over pure white, big tabular numbers, and contemporary display type.

> **Ethos:** _Editorial calm, data-confident._  
> **Mental references:** Linear · Vercel Analytics · Stripe Dashboard · Notion (density) · Bloomberg Terminal (data hierarchy).

---

## Brand context

| | Value |
|---|---|
| Tagline | **Full Stack Marketing.** |
| Domain | `www.newno.marketing` |
| Language | **Spanish-first** (English only for tokens, KPI labels, platform names) |
| Sub-brand | **Newno Lab** — internal lab building five products: Markus, Luca, Bárbara, Haruka, Teresa |

- **Wordmark is "Newno"** — no trailing period.
- **Tagline appears only on cover/closing surfaces** (deck cover, thank-you, marketing hero). Never on content slides or product UI.
- **Newno Lab** products each inherit the whole brand system and swap only the accent via `data-theme="<name>"` on `<html>`.

## Sources

This project was built from the official Newno brand manual (90-page PDF, absorbed into spec and tokens). No external Figma file or production codebase was attached.

| File | What it is |
|---|---|
| `tokens/newno-design-system.md` | Canonical agent-facing spec — color, type, components, layout, icons, do's/don'ts. **Treat as truth.** |
| `tokens/colors_and_type.css` | THE foundation file — @font-face + CSS vars + semantic classes. Single font loader. |
| `tokens/newno-tokens.css` | Mirror with `--newno-*` prefix for drop-in use. |
| `tokens/newno-tokens.json` | Style Dictionary / Figma Tokens JSON. |
| `tokens/newno-tailwind.preset.js` | Tailwind preset. |

---

## CONTENT FUNDAMENTALS

### Tone & voice
- **Confiable, contemporánea, técnica pero accesible.** Short, declarative phrases; rules in imperative.
- **Spanish-first.** All UI copy, buttons, marketing in Spanish. English only for technical terms (`ROAS`, `CPL`, `CTR`), platform names (`LinkedIn`, `Meta`), and tokens (`--accent`).
- Marketing uses **tú/tu** (informal), never _usted_.
- Switch to English only if the user explicitly requests it.

### Casing & punctuation
- **Sentence case for all headings.** Example: "Resumen de campañas" not "RESUMEN DE CAMPAÑAS".
- **UPPERCASE reserved for eyebrows only** — KPI labels, table column headers.
- Numbers matter: deltas, percentages, and currency always present and always tabular.
- **No emoji as icons** in product UI. Emoji belong in documentation annotations only.

### Copy examples (tone calibration)
| Context | Example |
|---|---|
| CTA primario | `+ Nueva campaña` |
| Eyebrow KPI | `INVERSIÓN` |
| Subtítulo de vista | `Últimos 30 días vs. periodo anterior. Datos sincronizados hace 4 min.` |
| Insight IA | `Tu mejor ROAS (5.2×) viene de LinkedIn pero solo recibe el 18% del presupuesto.` |
| Toast | `Campaña "Q3 Lead-gen" creada` |

---

## VISUAL FOUNDATIONS

### Color
- **One accent:** lime `#C5E818` (hover `#B9D50D`). **Text on lime is always `#282A2D`, never white.**
- **All backgrounds — app, page, card, modal, sidebar — are pure white `#FFFFFF`**, separated by Gray 300 `#C5C8CC` border + soft `e1` shadow, not by background color.
- Gray ramp: `#282A2D → #4A4C4F → #7E8084 → #A8AAAE` over scale `#C5C8CC / #E7EAEE / #F1F2F2`.
- Semantic: green `#10B981` (pos), red `#F43F5E` (neg), amber `#FEF3C7` (warn), gray `#E5E7EB` (paused).
- Channel colors are official hex values — never redefine them.
- **Never two accents in one view.**

### Typography
- **Outfit** — display: ≥16px headings, KPI numbers, hero copy. Weights 500–800.
- **Inter** — UI/body: everything else. Weights 400–700.
- **JetBrains Mono** — technical values only: IDs, code, live counters. Weights 400/500.
- Negative tracking on display (`-0.01em` to `-0.025em`).
- `tabular-nums` on every number.
- `text-wrap: balance` on H1/hero; `text-wrap: pretty` on paragraphs.
- Minimum 11px. Two families per view max (Outfit + Inter).
- **UPPERCASE only for eyebrows**, never for headings.

### Backgrounds & surfaces
- Pure white everywhere. No warm/ivory tones, no gray page backgrounds.
- Cards float on white via a 1px Gray-300 border + ultra-soft shadow.
- Dark mode uses near-black `#0A0B0D` (bg) / `#1A1D21` (card) / `#0F1114` (sidebar).
- **Borders > shadows.** In light mode, almost everything is delimited with `1px solid var(--line)`.

### Gradients
Only three legitimate uses:
1. **Hero radial glow** — `radial-gradient(circle, rgba(197,232,24,0.18) 0%, transparent 70%)` with blur 40–60px on dark bg.
2. **Area chart fill** — `linear-gradient(180deg, accent 30% opacity → 0%)`.
3. **Funnel bar** — `linear-gradient(90deg, #C5E818 0%, #B8DC0F 100%)`.

No decorative gradients anywhere else.

### Animation & motion
- Easing: `cubic-bezier(0.2, 0, 0, 1)` (Material's standard out).
- Durations: 120ms (fast), 180ms (base), 280ms (slow).
- Restrained transitions — color/background changes only. No bounce, no spring.
- Slide entrance: animate from hidden to visible end-state, gated on `[data-deck-active]`.

### Hover / press states
- **Primary button hover:** `background: var(--accent-strong)` + `outline: 2px solid var(--accent-soft)`.
- **Ghost button hover:** `background: var(--gray-100)`.
- **Nav item hover:** `background: var(--line-2)`.
- **Active nav item:** `background: var(--accent)`, `color: var(--accent-ink)`, `font-weight: 600`.
- No opacity-only hovers. No shrink press states.

### Cards
- **Standard:** white bg, `1px solid var(--line)`, radius 14px, padding 20px, shadow `e1`.
- **Highlighted (one per view):** `1.5px solid var(--accent)` border.
- **Never radius > 14px** on dashboard/product cards — "consumer app" feel, avoid in B2B.
- Compact variant: padding 16px, min-height reduced.

### Corner radii
| Token | px | Use |
|---|---|---|
| `--r-xs` | 3 | Bar charts |
| `--r-sm` | 6 | Pills, small badges |
| `--r-md` | 8 | Table buttons, small inputs |
| `--r-lg` | 10 | Buttons, nav items, inputs |
| `--r-xl` | 14 | Cards (max for product surfaces) |
| `--r-2xl` | 30 | Mobile bezel |
| `--r-full` | 9999 | Dots, circular avatars |

### Elevation / depth
| Level | Use | Shadow |
|---|---|---|
| `e0` | App bg | none |
| `e1` | Cards | `0 1px 0 rgba(16,24,40,.02), 0 1px 2px rgba(16,24,40,.04)` |
| `e2` | Dropdowns | `0 4px 12px rgba(16,24,40,.08)` |
| `e3` | Modals | `0 12px 32px rgba(16,24,40,.12)` |
| `e-hero` | Floating mockups | `0 30px 80px rgba(0,0,0,.5)` |

### Layout
- **Canonical artboard:** 1440×900 desktop.
- **Sidebar:** 240px fixed → 64px icon-rail (<1024px) → bottom-tab bar (<768px).
- **KPI grid:** 4×1 (≥1280) → 2×2 → stack (<768).
- **Two-column dashboard:** `1.45fr / 1fr` (narrative left, summary right).
- **Tables:** CSS grid with `fr` weights — never `<table>` element.
- Main content padding: `26px 30px` (regular), `22px 26px` (compact).

### Imagery
- The system ships no photography. Use real client/brand imagery.
- Color tone guidance: editorial cool/neutral, not warm or high-saturation.
- No AI-generated stock imagery in brand materials.

---

## ICONOGRAPHY

**Iconoir is the sole icon library.** Stroke-based monoline, **stroke 1.5** (2 for principal/active element), no fills, no emoji, SVG only.

**Load in HTML:**
```html
<script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
<style>iconify-icon{display:inline-flex;line-height:1;vertical-align:-0.125em}</style>
```
Then: `<iconify-icon icon="iconoir:home-simple" width="18" height="18"></iconify-icon>`

**Load in React (with bundler):** `import { HomeSimple } from 'iconoir-react';`

**Standard sizes:**
| Context | Size | Stroke |
|---|---|---|
| Sidebar nav | 18×18 | 1.5 |
| Buttons / inputs | 16×16 | 1.5 |
| Card headers | 20×20 | 1.5 |
| Empty states | 24–48 | 1.5 |
| Principal / active | any | **2** |

**When NOT to use Iconoir:** platform logos (LinkedIn, Meta, Google), Newno/Lab product logos, illustrations. Missing icons → draw custom at `/icons/custom/`, 24×24 grid, stroke 1.5.

### Brand assets (in `brand/`)
| File | Use |
|---|---|
| `newno-wordmark.svg` | Primary wordmark on light grounds |
| `newno-wordmark-dark.svg` | Wordmark inside `#0A0B0D` capsule for dark contexts |
| `newno-favicon.svg` | `N` monogram, 64×64, dark |
| `newno-icon-google-business.jpg` | Raster JPG for Google Business profile only |
| `characters/<name>.svg` | Character illustrations for each Lab product |
| `platform-icons/<name>.svg` | Product mark icons (Markus/Luca/Bárbara/Haruka/Teresa) |

---

## Architecture — three layers

```
┌─────────────────────────────────────────────────────┐
│  LAYER 1 · NÚCLEO / RULES                           │
│  tokens/ · brand/ · styles.css · this readme        │
│  The truth for values and rules.                    │
├─────────────────────────────────────────────────────┤
│  LAYER 2 · COMPONENTS                               │
│  components/ (Button, Card, Badge, Input,           │
│  KPICard, Delta, Sparkline, NavItem…)               │
│  The same button/card everywhere.                   │
├─────────────────────────────────────────────────────┤
│  LAYER 3 · SURFACES / UI KITS                       │
│  ui_kits/dashboard/     ← product dashboard         │
│  ui_kits/content/       ← articles, whitepapers     │
│  Surfaces compose components; never redefine tokens.│
└─────────────────────────────────────────────────────┘
```

## File index

| Path | What it is |
|---|---|
| `styles.css` | CSS entry point (`@import` only) |
| `tokens/colors_and_type.css` | **Foundation file** — @font-face + all CSS vars + semantic classes |
| `tokens/newno-design-system.md` | Canonical spec (exhaustive rules, Spanish) |
| `tokens/fonts/` | Self-hosted font TTFs (Outfit, Inter variable; JetBrains Mono 400/500) |
| `brand/` | Wordmarks, favicon, characters, platform icons |
| `assets/` | Reference imagery |
| `components/core/` | Button, Card, Badge, Input |
| `components/data/` | KPICard, Delta, Sparkline |
| `components/navigation/` | NavItem, Sidebar |
| `ui_kits/dashboard/` | Interactive marketing dashboard UI kit (React, 1440×900) |
| `ui_kits/content/` | Blog articles, case studies, whitepapers |
| `guidelines/` | Foundation specimen cards (colors, type, spacing, brand) |
| `SKILL.md` | Agent entry-point for AI agents |

## Products of Newno Lab

Each product inherits the full system; only the accent changes. Apply with `data-theme` on `<html>`:

| Product | Accent | `data-theme` | Text on accent |
|---|---|---|---|
| Markus | `#84FF58` | `markus` | `#282A2D` |
| Luca | `#FFCB26` | `luca` | `#282A2D` |
| Bárbara | `#00F2A9` | `barbara` | `#282A2D` |
| Haruka | `#00F9FF` | `haruka` | `#282A2D` |
| Teresa | `#9D6DFB` | `teresa` | `#FFFFFF` |

> One product per view, never alongside `data-theme="dark"`.

## Caveats

- **No Figma file, no production codebase.** UI kits are reconstructed from the brand spec + tokens. If a real Figma library or deployed app exists, pixel-fidelity should be re-grounded against it.
- **Iconoir is the corporate icon standard.** Use exclusively; load via `iconoir-react` or Iconify web component.
- **Font loading is self-hosted & GDPR-clean.** Zero Google Fonts requests. Link `tokens/colors_and_type.css` once — it loads all three font families automatically.

---

_v2.4 · June 2026 · Newno Design System_
