---
name: newno-design
description: Use this skill to generate well-branded interfaces and assets for Newno, a full-stack marketing agency. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping or production work.
user-invocable: true
---

Read the `readme.md` file within this skill first, then explore the other available files.

## Plantilla primero — regla de oro

**Antes de generar cualquier superficie, comprueba si ya existe un kit o plantilla.** Si existe: ábrelo, cópialo a la carpeta de tu artefacto y **rellénalo** con el contenido real. Nunca empieces de cero lo que ya está hecho.

| Si te piden… | Usa |
|---|---|
| Dashboard / producto / panel | `ui_kits/dashboard/index.html` |
| Cualquier superficie | `ui_kits/` — explora primero |

## Archivos clave (lee en este orden)

1. `readme.md` — arquitectura, fundamentos de marca, índice de archivos
2. `tokens/newno-design-system.md` — spec canónica exhaustiva (colores, tipo, componentes, layout, iconos, do's/don'ts)
3. `tokens/colors_and_type.css` — fuente de verdad de tokens + cargador de fuentes
4. `ui_kits/dashboard/index.html` — UI kit del producto principal (dashboard interactivo)
5. `components/` — componentes React reutilizables (Button, Card, Badge, Input, KPICard, Delta, Sparkline, NavItem)
6. `brand/` — wordmarks, favicon, iconos de plataforma, ilustraciones de personajes

## Reglas irrenunciables

- **Un solo acento:** lima `#C5E818`. Nunca un segundo acento en la misma vista.
- Texto sobre lima = `#282A2D`. Nunca blanco.
- Fondos de app, página, card, modal, sidebar = **blanco puro `#FFFFFF`**.
- Todos los números = `tabular-nums`.
- **Outfit** para display, **Inter** para UI, **JetBrains Mono** solo para valores técnicos.
- Radio de card = 14px máximo.
- Sin emoji como iconos. Sin gradientes decorativos.
- **Iconoir** es la única librería de iconos (stroke 1.5). Carga con el web component de Iconify.
- Copy por defecto en **español**. Cambia a inglés solo si el usuario lo pide.
- **Newno Lab:** cinco productos (Markus, Luca, Bárbara, Haruka, Teresa) que heredan todo el sistema y solo cambian el acento con `data-theme="<nombre>"`. Un solo tema por vista.

## Si creas artefactos visuales (slides, mocks, prototipos)

Copia los assets necesarios y enlaza `tokens/colors_and_type.css`. Úsalo como fuente única de fuentes, tokens y clases utilitarias.

## Si trabajas en código de producción

Referencia los assets en su lugar y lee las reglas aquí para convertirte en un experto en diseñar con esta marca.

## Si el usuario invoca este skill sin más contexto

Pregúntale qué quiere construir o diseñar. Ofrece algunos puntos de partida comunes:
- Una nueva pantalla para el dashboard de marketing
- Una landing page de producto Newno Lab
- Un deck de presentación para una revisión de paid media
- Una infografía de resultados de campaña

Actúa como diseñador experto que produce artefactos HTML o código de producción según la necesidad.
