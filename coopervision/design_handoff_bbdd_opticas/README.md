# Handoff: BBDD Maestra de Ópticas Iberia — CooperVision

**Para:** equipo técnico Newno (implementación React + Django)  
**Fecha:** Junio 2026  
**Generado por:** Claude Design

---

## Overview

Aplicación web interna para CooperVision Iberia que consolida una base de datos maestra de ~15.000-19.000 ópticas de España y Portugal, combinando dos fuentes (Outscraper/Google Maps + Salesforce CRM) en un modelo relacional con FK opcional. Permite visualización analítica, gestión del dato con trazabilidad total (overrides), y un flujo admin de revisión post-sync.

## Sobre los archivos de diseño

Los archivos en la carpeta `coopervision/` son **referencias de diseño en HTML** — prototipos de alta fidelidad que muestran el aspecto visual y el comportamiento interactivo pretendidos. **No son código de producción para copiar directamente.**

La tarea del equipo técnico es **recrear estos diseños en el stack de producción** (React + Vite + TypeScript + Bootstrap + tokens DS Newno v1.1) usando sus patrones y librerías establecidas.

## Fidelidad

**Alta fidelidad (hifi).** Colores, tipografía, espaciado e interacciones son los definitivos. El equipo debe recrear la UI pixel-perfectamente usando el stack de producción.

---

## Pantallas / Vistas

### V1 · Resumen — `#/`
**Propósito:** Dashboard ejecutivo. KPIs globales del mercado y presencia CPV.

**Layout:** Grid de 4 KPI cards + 2 secciones de charts (2-col). Max-width 1440px, padding lateral `space-6`.

**Componentes:**
- 4 KPI cards (`card card-compact`): Total ópticas (18.234), Partners CPV (3.142, `card-accent` con estrella), Valoración media (4,32 ★), Reseñas totales (1,2M)
- Chart "Distribución por provincias" — barras horizontales SVG
- Chart "Valoraciones" — barras verticales SVG
- Top 10 provincias — tabla `table-dense`
- Tabla "Top ciudades por engagement"
- KPIs de presencia digital (% con web, teléfono, email)

**Estado empty:** CTA "Lanzar primera sincronización →" a `/admin/operaciones`

---

### V2 · Business Intelligence — `#/bi`
**Propósito:** Análisis profundo. Partners vs mercado, segmentación, oportunidades.

**Layout:** Secciones colapsables `cpv-section`. Mismo max-width que V1.

**Componentes:**
- KPIs CPV vs mercado (penetración, valoración comparada)
- Chart scatter penetración por provincia (SVG)
- Top oportunidades por provincia — tabla ordenable
- Distribución de valoraciones — barras
- Presencia digital CPV vs no-CPV — comparativa

---

### V3 · Mapa — `#/mapa`
**Propósito:** Visualización geográfica de todas las ópticas.

**Layout:** Split panel: sidebar 320px izquierda + mapa full-bleed derecha. Rompe el max-width del `#view-root`.

**Componentes:**
- Leaflet map con marcadores coloreados (cliente = acento lime, no cliente = gris)
- Panel izquierdo: búsqueda + filtros (tipo, valoración mínima, solo clientes)
- Lista de ópticas filtradas en el panel
- Click marcador/fila → popup con datos básicos + "Ver ficha completa →"

---

### V4 · Base de datos — `#/bbdd`
**Propósito:** Tabla densa con todas las ópticas. Búsqueda, filtros, orden, exportación.

**Layout:** Toolbar (búsqueda + filtros rápidos + filtros avanzados popover) + tabla paginada 20/pág + paginación.

**Componentes:**
- Búsqueda debounce 300ms
- Filtros rápidos: Provincia, Categoría, Tipo (todas/clientes/no-clientes), Cadena
- Filtros avanzados: rating mínimo, con/sin web, show_campañas_core/miopia, con overrides activos
- Tabla: Nombre, Dirección, Cadena (pill), Rating, Reseñas, Cliente (pill), Override (badge), ⋯
- Menú ⋯: "Ver ficha completa" → drawer V5
- Exportar CSV (filtros aplicados)
- Paginación con input de página directa

**Columnas solo-admin:** CODIGO, GRUPO, DP, COM (ocultos en rol user — ver PRD §10.1)

---

### V5 · Detalle de óptica — Drawer lateral
**Propósito:** Consulta y edición (admin) completa de una óptica sin romper contexto.

**Layout:** Drawer 480px (560px en ≥1600px). Header sticky 120px + tabs 44px + contenido scroll + footer sticky 60px (admin).

**5 tabs:**
1. **Google Maps** — todos los campos `opticas_google` con overrides marcados
2. **CooperVision** — campos `opticas_cpv` (solo si `is_client = true`)
3. **Cambios y overrides** — timeline cronológico + lista overrides activos
4. **App** — `cadena_resuelta_id` + `notas_internas` (editable admin)
5. **Estado y campañas** — toggles `show_campañas_core/miopia` + zona peligro

**Modal "Corregir dato" (admin):** tabla + campo + valor original + nuevo valor + motivo. Inserta en `opticas_overrides` (append-only).

---

### V6 · Changelog — `#/changelog`
**Propósito:** Auditoría global de `opticas_overrides` + eventos de sync. Solo admin.

**Layout:** Toolbar (búsqueda óptica + filtros) + tabla ultra-densa 32px (50/pág).

**Columnas:** Fecha (DD/MM HH:mm), Óptica (click → drawer V5), Tabla (pill), Campo (mono), Cambio (A → B, truncar 60 chars), Tipo (pill semántico), Usuario, ⋯ (revertir).

**Filtros:** nombre/place_id óptica, tipo_cambio, tabla, campo, usuario, rango fechas (presets 24h/semana/mes/personalizado).

---

### A1 · Usuarios — `#/admin/usuarios`
**Propósito:** CRUD de usuarios del sistema (10-25). Sin paginación.

**Tabla:** Nombre (avatar initials 24px + nombre), Email, Rol (pill Admin accent / Usuario paused), Último acceso (relativo), ⋯

**Menú ⋯:** Editar (modal), Cambiar rol, Resetear contraseña (email), Desactivar/Reactivar (toggle in-row), Eliminar (destructivo + modal confirm)

**Modal "Nuevo usuario":** Nombre, Email, Rol (radio). Toast "email de bienvenida enviado".

---

### A2 · Operaciones — `#/admin/operaciones`
**Propósito:** Centro de control de sincronizaciones.

**Secciones:**
1. **2 cards de estado** (Outscraper / Salesforce): última sync, resultado (pill OK/Fallo parcial/Error), deltas (+nuevos/conflictos), próxima estimada, "Sincronizar ahora" → modal confirm → estado "En curso" + spinner + banner persistente
2. **Configuración de frecuencia:** selects (frecuencia Outscraper 1/2/3/6 meses/manual, Salesforce 3/6/12 meses/manual, día semana, hora)
3. **Historial** tabla densa: Fecha, Fuente, Resultado, Cambios, "Ver →" expandible inline
4. **Descarga BBDD completa:** info + botón CSV

**Variante "en curso":** banner top lime→warn + spinner animado en la card activa.

---

### A3 · Revisión — `#/admin/revision` ⭐ Vista crítica
**Propósito:** Bandeja de matching post-sync. Decide si `opticas_cpv` y `opticas_google` son el mismo establecimiento (crear FK `place_id_fk`). **No consolida campos.**

**Layout:** Tabs filtro + Focus card (`card-accent`) + Tabla "Todos los pendientes".

**3 tipos de focus card:**
- **Conflicto:** 2 columnas side-by-side (opticas_google | opticas_cpv), métricas de similitud en header, dropdown si >1 candidato Google
- **Solo CPV:** 1 columna con datos Salesforce + texto explicativo
- **No encontrado:** datos previos del Google que desapareció

**Botones por tipo:**
- Conflicto: [✓ Es la misma · Vincular (V)] [✗ Son distintas (D)] [✎ Corregir datos]
- Solo CPV: [🔍 Buscar manualmente] [✗ Marcar cerrada] [Mantener pendiente (D)]
- No encontrado: [✓ Mantener] [✗ Marcar cerrada] [🔍 Investigar relisting]

**UX crítico:**
- Transición fade 120ms entre cards
- "Son distintas" con 1 candidato → card se transforma en Solo CPV in-place (sin saltar)
- "Siguiente →" avanza sin acción | "Saltar este" mueve al final de la cola
- Toast post-decisión 10s con [Deshacer] funcional
- Atajos de teclado: V / D / S (con hints en botones)
- Progress bar sutil en header de la focus card
- Click en fila tabla → jump a esa card + scroll automático

**Estado celebratorio vacío:** icono check-circle 48px `--pos-ink` + "Todo al día" + CTA "Lanzar nueva sincronización →"

---

### A4 · Cadenas — `#/admin/cadenas`
**Propósito:** CRUD de la tabla `cadenas` (~25 ES + PT).

**Filter tabs:** Todas | España | Portugal (con contadores dinámicos)

**Tabla:** Nombre, Keywords (comma-sep, truncar a 3), Dominios (comma-sep, truncar a 2), País (pill ES/PT), ⋯

**Menú ⋯:** Editar (modal), Re-aplicar detección a toda la BBDD (toast lanzar + finalizar), Eliminar → modal con conteo de ópticas asociadas y opción "Convertir en independientes".

---

### A5 · Logs — `#/admin/logs`
**Propósito:** Auditoría de acciones de usuarios sobre el sistema.

**Tabla ultra-densa 32px:** Fecha (DD/MM HH:mm:ss, font-mono 11px), Usuario (avatar 18px + nombre), Acción (pill semántico), Detalle.

**Filtros encadenados:** Usuario (select), Tipo de acción (select), Rango fechas (select + inputs custom). Paginación 50/pág. Exportar CSV real (Blob descarga).

---

## Interacciones globales

- **Router:** hash-based (`#/ruta`). `hashchange` → `renderView()` → `view.render()` → `view.mounted()`.
- **Toasts:** `.toast-container` en `document.body`. 4 variantes: success / info / warn / error. Auto-dismiss 4s (A3: 10s con undo).
- **Modales:** `.modal-overlay` con click-fuera para cerrar. Siempre dentro del `#view-root`.
- **Menús ⋯:** `position:fixed` anclado al botón, fuera del overflow de la tabla. Se cierran al click fuera.
- **Drawer V5:** slide-in 240ms, Esc para cerrar, actualiza URL con `?optica=<place_id>`.
- **Skeleton loading:** clase `.skeleton` con animación shimmer. Se aplica en `state === 'loading'`.

---

## Gestión de estado

```typescript
// Variables de sesión en localStorage
'cpv_role'         // 'admin' | 'user'
'cpv_screen_state' // 'default' | 'loading' | 'empty' | 'error'
```

Cada vista recibe `state` y `ctx` en `render(state, ctx)`:
```typescript
interface Ctx {
  def: RouteDefinition;
  path: string;
  md: MockData;           // window.mockData
  role: 'admin' | 'user';
  headerHTML: Function;   // generador de encabezado de página
  toast: Function;        // toast(type, title, body)
}
```

El estado de UI per-vista (filtros, paginación, selecciones) vive en closures del módulo JS. Se resetea en cada navegación a la ruta.

---

## Tokens de diseño

Ver `styles/tokens.css` para el listado completo. Valores principales en `coopervision/README.md §Design System`.

---

## Assets

- **Iconos:** Iconoir (open source). En producción usar `iconoir-react`. En prototipo: `iconify-icon` web component.
- **Fuentes:** Outfit (display) + Inter (body) — Google Fonts en producción.
- **Logo CooperVision:** placeholder "CV" en el prototipo. Solicitar asset oficial (ver PRD §10.6).
- **Mapa:** Leaflet + tiles OpenStreetMap.

---

## Archivos de referencia

| Archivo | Qué contiene |
|---|---|
| `coopervision/index.html` | Shell SPA completo |
| `coopervision/app.js` | Router, estado, delegación de eventos |
| `coopervision/data.js` | Modelo de datos + mock (~40 ópticas, 25 cadenas, 14 usuarios…) |
| `coopervision/styles/tokens.css` | Variables CSS del DS |
| `coopervision/styles/components.css` | Componentes base |
| `coopervision/views/views.css` | Estilos específicos de vistas |
| `coopervision/views/admin-revision.js` | A3 Revisión — la vista más compleja |
| `coopervision/components/drawer-detalle.js` | V5 Drawer detalle óptica |

---

## Decisiones pendientes con CooperVision

1. **Visibilidad rol `user`** — campos sensibles CPV (CODIGO, GRUPO, DP, COM…)
2. **Logo CooperVision** — asset oficial pendiente de recibir
3. **Umbrales de similitud A3** — >85% auto-match, 60-85% conflicto, <60% distintas (recomendación Newno)
4. **Retención logs** — mínimo 12 meses recomendado
5. **Recuperación contraseña** — enlace autoservicio por email

---

*Handoff generado por Claude Design · Newno · Junio 2026*
