/* @ds-bundle: {"format":4,"namespace":"NewnoDesignSystem_7929a3","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Delta","sourcePath":"components/data/Delta.jsx"},{"name":"KPICard","sourcePath":"components/data/KPICard.jsx"},{"name":"Sparkline","sourcePath":"components/data/Sparkline.jsx"},{"name":"NavItem","sourcePath":"components/navigation/NavItem.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"09e046d5eda0","components/core/Button.jsx":"b1f5feb291dc","components/core/Card.jsx":"4f3d00e3734e","components/core/Input.jsx":"c7b6721a36f6","components/data/Delta.jsx":"85f0bbfb773d","components/data/KPICard.jsx":"37669b2ad3cb","components/data/Sparkline.jsx":"488b8da47c61","components/navigation/NavItem.jsx":"519dd4e4e682","coopervision/app.js":"0b381ea4d8d7","coopervision/components/drawer-detalle.js":"7851590c70ee","coopervision/data.js":"295f2942830c","coopervision/views/admin-cadenas.js":"e58101f3d7d3","coopervision/views/admin-logs.js":"fa4d04e2bdb6","coopervision/views/admin-operaciones.js":"33aa767f2e60","coopervision/views/admin-revision.js":"dbaba2eded52","coopervision/views/admin-shared.js":"4e11af75b2e2","coopervision/views/admin-usuarios.js":"d72380d954d8","coopervision/views/bbdd.js":"dc989a8f873c","coopervision/views/bi.js":"8c608c52185b","coopervision/views/changelog.js":"252612da871e","coopervision/views/charts.js":"d68b3b4157e9","coopervision/views/mapa.js":"f84ba66bed00","coopervision/views/perfil.js":"866f0c5e369e","coopervision/views/resumen.js":"318bf35f6924","coopervision/views/sg-components.js":"58bad526c075","coopervision/views/sg-foundations.js":"0f5aa3a2ebd9","coopervision/views/sg-patterns.js":"c725e2733227","coopervision/views/styleguide.js":"9b2f880e77f8","ui_kits/dashboard/App.jsx":"e4b01d3ac3a1","ui_kits/dashboard/Audiences.jsx":"7b40ebf844d7","ui_kits/dashboard/Campaigns.jsx":"ac3b92dc9dc5","ui_kits/dashboard/Channels.jsx":"85c797d18c2a","ui_kits/dashboard/Charts.jsx":"64e56f26abd1","ui_kits/dashboard/Data.jsx":"e0fa8b9805a1","ui_kits/dashboard/Header.jsx":"266ed2ade245","ui_kits/dashboard/Insights.jsx":"571271e77f4d","ui_kits/dashboard/Primitives.jsx":"579e3dcc4aff","ui_kits/dashboard/Settings.jsx":"be73d493bd56","ui_kits/dashboard/Sidebar.jsx":"575b612d98a3","ui_kits/dashboard/Table.jsx":"094c75190a64"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NewnoDesignSystem_7929a3 = window.NewnoDesignSystem_7929a3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * Badge (Pill) — compact status/tag label.
 * Variants map to semantic color roles in the Newno palette.
 */
function Badge({
  children,
  variant = 'neutral',
  dot = false
}) {
  const variantStyles = {
    accent: {
      background: 'var(--accent-soft)',
      color: 'var(--accent-deep)'
    },
    pos: {
      background: 'var(--pos-soft)',
      color: 'var(--pos-ink)'
    },
    neg: {
      background: 'var(--neg-soft)',
      color: 'var(--neg-ink)'
    },
    paused: {
      background: 'var(--paused-bg)',
      color: 'var(--paused-ink)'
    },
    test: {
      background: 'var(--warn-bg)',
      color: 'var(--warn-ink)'
    },
    neutral: {
      background: 'var(--line-2)',
      color: '#4A4C4F'
    },
    dark: {
      background: 'var(--fg1)',
      color: 'var(--bg)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '3px 8px',
    borderRadius: 'var(--r-sm)',
    fontSize: 'var(--fs-eyebrow)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: '0.02em',
    fontFamily: 'var(--font-ui)',
    whiteSpace: 'nowrap'
  };
  const dotStyle = {
    width: '6px',
    height: '6px',
    borderRadius: '999px',
    background: 'currentColor',
    flexShrink: 0
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...base,
      ...variantStyles[variant]
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: dotStyle
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * Button — primary CTA, ghost secondary, or dark variant.
 * Uses CSS custom properties from tokens/colors_and_type.css.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  onClick,
  type = 'button',
  style: extraStyle
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: size === 'sm' ? '6px' : '8px',
    fontFamily: 'var(--font-ui)',
    fontSize: size === 'sm' ? '12px' : '13px',
    fontWeight: variant === 'ghost' ? 500 : 600,
    borderRadius: 'var(--r-lg)',
    padding: size === 'sm' ? variant === 'ghost' ? '7px 11px' : '7px 12px' : variant === 'ghost' ? '10px 14px' : '10px 16px',
    border: variant === 'ghost' ? '1px solid var(--line)' : '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background var(--dur-fast) var(--ease), outline-color var(--dur-fast) var(--ease)',
    outline: '2px solid transparent',
    textDecoration: 'none',
    letterSpacing: variant === 'primary' ? '0.01em' : 0,
    WebkitFontSmoothing: variant === 'primary' ? 'auto' : 'antialiased'
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--accent-ink)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--fg1)'
    },
    dark: {
      background: 'var(--fg1)',
      color: 'var(--bg)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    style: {
      ...base,
      ...variants[variant],
      ...extraStyle
    },
    disabled: disabled,
    onClick: onClick
  }, icon && icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/**
 * Card — white container with border + e1 shadow. Variants: default, accent (highlighted), dark.
 */
function Card({
  children,
  variant = 'default',
  padding = 'default',
  style: extraStyle
}) {
  const padValue = padding === 'compact' ? '14px 16px' : '20px';
  const base = {
    background: variant === 'dark' ? 'var(--dark-card)' : 'var(--card)',
    borderRadius: 'var(--r-xl)',
    padding: padValue,
    boxShadow: variant === 'dark' ? 'none' : 'var(--shadow-e1)'
  };
  const borders = {
    default: {
      border: '1px solid var(--line)'
    },
    accent: {
      border: '1.5px solid var(--accent)'
    },
    dark: {
      border: '1px solid var(--dark-line)'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...base,
      ...borders[variant],
      ...extraStyle
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
/**
 * Input — text input with optional label, icon and error state.
 */
function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  label,
  disabled = false,
  error,
  icon,
  style: extraStyle
}) {
  const inputStyle = {
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--fs-body-s)',
    padding: icon ? '10px 12px 10px 36px' : '10px 12px',
    background: 'var(--card)',
    border: error ? '1px solid var(--neg)' : '1px solid var(--line)',
    borderRadius: 'var(--r-lg)',
    color: 'var(--fg1)',
    outline: 'none',
    transition: 'border-color var(--dur-fast) var(--ease)',
    width: '100%',
    boxSizing: 'border-box',
    opacity: disabled ? 0.6 : 1
  };
  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%'
  };
  const labelStyle = {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--fg3)',
    fontFamily: 'var(--font-ui)'
  };
  const iconWrapStyle = {
    position: 'relative',
    width: '100%'
  };
  const iconStyle = {
    position: 'absolute',
    left: '11px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--fg4)',
    pointerEvents: 'none',
    display: 'inline-flex'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrapStyle
  }, label && /*#__PURE__*/React.createElement("label", {
    style: labelStyle
  }, label), /*#__PURE__*/React.createElement("div", {
    style: iconWrapStyle
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: iconStyle
  }, icon), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    onChange: e => onChange?.(e.target.value),
    placeholder: placeholder,
    disabled: disabled,
    style: {
      ...inputStyle,
      ...extraStyle
    }
  })), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '11px',
      color: 'var(--neg-ink)',
      fontFamily: 'var(--font-ui)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/data/Delta.jsx
try { (() => {
/**
 * Delta — positive/negative percentage change indicator.
 * Arrow icon via Iconify iconoir web component.
 */
function Delta({
  value,
  invert = false
}) {
  if (value === null || value === undefined) return null;
  const good = invert ? value < 0 : value > 0;
  const color = good ? '#047857' : '#BE123C';
  const icon = value > 0 ? 'iconoir:arrow-up' : 'iconoir:arrow-down';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px',
      fontSize: '12px',
      fontWeight: 600,
      color,
      fontVariantNumeric: 'tabular-nums',
      fontFamily: 'var(--font-ui)',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    width: "10",
    height: "10"
  }), Math.abs(value).toFixed(1), "%");
}
Object.assign(__ds_scope, { Delta });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Delta.jsx", error: String((e && e.message) || e) }); }

// components/data/Sparkline.jsx
try { (() => {
/**
 * Sparkline — minimal SVG line chart with optional gradient fill.
 */
function Sparkline({
  data,
  color = 'var(--accent)',
  width = 220,
  height = 28,
  fill = true,
  strokeWidth = 2
}) {
  if (!data || data.length < 2) return null;
  const w = width;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${i / (data.length - 1) * w},${h - (v - min) / range * (h - 4) - 2}`);
  const linePath = 'M' + pts.join(' L');
  const id = 'spark-' + Math.abs(data[0] * 1000 | 0) + '-' + data.length;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    width: "100%",
    height: h,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, fill && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: color,
    stopOpacity: "0.30"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: color,
    stopOpacity: "0"
  }))), fill && /*#__PURE__*/React.createElement("path", {
    d: `${linePath} L${w},${h} L0,${h} Z`,
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: linePath,
    stroke: color,
    strokeWidth: strokeWidth,
    fill: "none",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }));
}
Object.assign(__ds_scope, { Sparkline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Sparkline.jsx", error: String((e && e.message) || e) }); }

// components/data/KPICard.jsx
try { (() => {
/**
 * KPICard — metric card with eyebrow label, large number, delta and sparkline.
 * Pass `accent` for the one highlighted card per view (1.5px lime border).
 */
function KPICard({
  label,
  value,
  delta,
  data,
  accent = false,
  invert = false,
  prefix = '',
  suffix = '',
  compact = false
}) {
  const cardStyle = {
    background: 'var(--card)',
    border: accent ? '1.5px solid var(--accent)' : '1px solid var(--line)',
    borderRadius: 'var(--r-xl)',
    padding: compact ? '14px 16px' : '18px 20px',
    boxShadow: 'var(--shadow-e1)',
    display: 'flex',
    flexDirection: 'column'
  };
  const eyebrowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: compact ? '6px' : '10px'
  };
  const labelStyle = {
    fontSize: 'var(--fs-eyebrow)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: 'var(--tr-eyebrow)',
    textTransform: 'uppercase',
    color: 'var(--fg4)',
    fontFamily: 'var(--font-ui)'
  };
  const valueStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: compact ? '26px' : '30px',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    color: 'var(--fg1)',
    fontVariantNumeric: 'tabular-nums',
    lineHeight: 1
  };
  return /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: eyebrowStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, label), delta !== undefined && delta !== null && /*#__PURE__*/React.createElement(__ds_scope.Delta, {
    value: delta,
    invert: invert
  })), /*#__PURE__*/React.createElement("div", {
    style: valueStyle
  }, prefix, value, suffix), data && data.length >= 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: compact ? '8px' : '10px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Sparkline, {
    data: data,
    height: compact ? 22 : 28
  })));
}
Object.assign(__ds_scope, { KPICard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KPICard.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavItem.jsx
try { (() => {
/**
 * NavItem — sidebar navigation button with icon and label.
 * Active state uses lime accent background.
 */
function NavItem({
  icon,
  label,
  active = false,
  onClick
}) {
  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '11px 14px',
    borderRadius: 'var(--r-lg)',
    fontFamily: 'var(--font-ui)',
    fontSize: '13.5px',
    fontWeight: active ? 600 : 500,
    color: active ? 'var(--accent-ink)' : 'var(--fg1)',
    background: active ? 'var(--accent)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'background var(--dur-fast) var(--ease)'
  };
  return /*#__PURE__*/React.createElement("button", {
    style: style,
    onClick: onClick,
    onMouseEnter: e => {
      if (!active) e.currentTarget.style.background = 'var(--line-2)';
    },
    onMouseLeave: e => {
      if (!active) e.currentTarget.style.background = 'transparent';
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexShrink: 0,
      color: active ? 'var(--accent-ink)' : 'var(--fg2)'
    }
  }, icon), label);
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavItem.jsx", error: String((e && e.message) || e) }); }

// coopervision/app.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · BBDD Ópticas — app.js
   Lógica global del shell: rol, estado de pantalla, router hash,
   flyout admin y dropdown de avatar.
   Sin dependencias de build. Funciona abriendo index.html en file://.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const md = window.mockData;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const LS_ROLE = 'cpv_role';
  const LS_STATE = 'cpv_screen_state';

  /* ── Definición de rutas ───────────────────────────────────────
     nav   → valor data-nav del item del rail a marcar como activo
     group → eyebrow contextual del header de vista
     admin → requiere rol admin (guard + ocultación en rail)
     chrome:false → vista sin topbar/rail (login)                  */
  const ROUTES = {
    '/': {
      title: 'Resumen',
      icon: 'home-simple',
      nav: 'resumen',
      group: 'Datos'
    },
    '/bi': {
      title: 'Business Intelligence',
      icon: 'graph-up',
      nav: 'bi',
      group: 'Datos'
    },
    '/mapa': {
      title: 'Mapa',
      icon: 'map-pin',
      nav: 'mapa',
      group: 'Datos'
    },
    '/bbdd': {
      title: 'Base de datos',
      icon: 'database',
      nav: 'bbdd',
      group: 'Datos'
    },
    '/changelog': {
      title: 'Changelog',
      icon: 'clock-rotate-right',
      nav: 'changelog',
      group: 'Administración',
      admin: true
    },
    '/admin/usuarios': {
      title: 'Usuarios',
      icon: 'group',
      nav: 'admin',
      group: 'Administración',
      admin: true
    },
    '/admin/operaciones': {
      title: 'Operaciones',
      icon: 'refresh-double',
      nav: 'admin',
      group: 'Administración',
      admin: true
    },
    '/admin/revision': {
      title: 'Revisión',
      icon: 'warning-circle',
      nav: 'admin',
      group: 'Administración',
      admin: true
    },
    '/admin/cadenas': {
      title: 'Cadenas',
      icon: 'network-left',
      nav: 'admin',
      group: 'Administración',
      admin: true
    },
    '/admin/logs': {
      title: 'Logs',
      icon: 'scroll',
      nav: 'admin',
      group: 'Administración',
      admin: true
    },
    '/perfil': {
      title: 'Mi perfil',
      icon: 'user',
      nav: 'perfil',
      group: 'Cuenta'
    },
    '/styleguide': {
      title: 'Componentes',
      icon: 'view-grid',
      nav: 'styleguide',
      group: 'Desarrollo'
    },
    '/login': {
      title: 'Iniciar sesión',
      icon: 'log-in',
      nav: null,
      group: 'Acceso',
      chrome: false
    }
  };
  let currentPath = '/';

  /* ════ Rol (admin/user) — persistente ════ */
  function getRole() {
    return localStorage.getItem(LS_ROLE) || 'admin';
  }
  function applyRole(role) {
    document.body.setAttribute('data-role', role);
    $$('.role-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.role === role));
  }
  function chooseRole(role) {
    localStorage.setItem(LS_ROLE, role);
    if (md && md.sesion) md.sesion.rol_activo = role;
    applyRole(role);
    route(); // re-evalúa guard de la ruta actual
  }

  /* ════ Estado de pantalla (default/loading/empty/error) — persistente ════ */
  function getState() {
    return localStorage.getItem(LS_STATE) || 'default';
  }
  function applyState(state) {
    document.body.setAttribute('data-screen-state', state);
    $$('.segmented-btn').forEach(b => b.classList.toggle('active', b.dataset.state === state));
  }
  function chooseState(state) {
    localStorage.setItem(LS_STATE, state);
    applyState(state);
    renderView();
  }

  /* ════ Toasts ════ */
  function toast(type, title, body) {
    const cont = $('#toast-container');
    if (!cont) return;
    const icons = {
      success: 'check-circle',
      error: 'warning-triangle',
      warn: 'warning-triangle',
      info: 'bell'
    };
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML = '<span class="toast-icon ' + type + '"><iconify-icon icon="iconoir:' + (icons[type] || 'bell') + '" width="18"></iconify-icon></span>' + '<div class="toast-content"><div class="toast-title">' + title + '</div>' + (body ? '<div class="toast-body">' + body + '</div>' : '') + '</div>' + '<button class="toast-close" aria-label="Cerrar"><iconify-icon icon="iconoir:xmark" width="14"></iconify-icon></button>';
    el.querySelector('.toast-close').addEventListener('click', () => dismiss(el));
    cont.appendChild(el);
    const t = setTimeout(() => dismiss(el), type === 'error' ? 8000 : type === 'warn' ? 6000 : 4000);
    function dismiss(node) {
      clearTimeout(t);
      if (!node.isConnected) return;
      node.classList.add('leaving');
      setTimeout(() => node.remove(), 180);
    }
  }

  /* ════ Overlays: flyout admin + dropdown avatar ════ */
  function closeFlyout() {
    const f = $('#admin-flyout');
    if (f) f.classList.remove('open');
    const b = $('#admin-nav');
    if (b) b.setAttribute('aria-expanded', 'false');
  }
  function toggleFlyout() {
    const f = $('#admin-flyout');
    if (!f) return;
    const open = f.classList.toggle('open');
    const b = $('#admin-nav');
    if (b) b.setAttribute('aria-expanded', String(open));
    closeAvatar();
    closePerfilFlyout();
  }
  function closeAvatar() {
    const m = $('#avatar-menu');
    if (m) m.classList.remove('open');
  }
  function toggleAvatar() {
    const m = $('#avatar-menu');
    if (!m) return;
    m.classList.toggle('open');
    closeFlyout();
    closePerfilFlyout();
  }
  function closePerfilFlyout() {
    const f = $('#perfil-flyout');
    if (f) f.classList.remove('open');
    const b = $('#perfil-nav');
    if (b) b.setAttribute('aria-expanded', 'false');
  }
  function togglePerfilFlyout() {
    const f = $('#perfil-flyout');
    if (!f) return;
    const open = f.classList.toggle('open');
    const b = $('#perfil-nav');
    if (b) b.setAttribute('aria-expanded', String(open));
    closeFlyout();
    closeAvatar();
  }

  /* ════ Router hash ════ */
  function parseHash() {
    let h = (location.hash || '').replace(/^#/, '');
    // Las vistas cruzadas enlazan con query/anclas (#/bbdd?tipo=cliente,
    // #/bi#competitive). En este lote resolvemos a la ruta base; los
    // filtros y el scroll a ancla se honran en lotes posteriores.
    h = h.split('?')[0].replace(/#.*$/, '');
    if (!h || h === '/') return '/';
    return h.replace(/\/+$/, '') || '/';
  }
  function route() {
    const path = parseHash();
    const def = ROUTES[path];

    // Guard de permisos: user no entra en zonas admin
    if (def && def.admin && getRole() === 'user') {
      toast('warn', 'Sin permisos', 'No tienes permisos para acceder a esa sección.');
      location.hash = '#/';
      return;
    }
    currentPath = path;

    // Chrome on/off (login = sin topbar/rail)
    document.body.setAttribute('data-chrome', def && def.chrome === false ? 'off' : 'on');

    // Marca el nav-item activo
    const navKey = def ? def.nav : null;
    $$('.nav-item[data-nav]').forEach(el => el.classList.toggle('on', !!navKey && el.dataset.nav === navKey));

    // Cierra overlays al navegar
    closeFlyout();
    closeAvatar();
    renderView();
  }

  /* ════ Render del área principal (placeholder por estado) ════ */
  function headerHTML(def, path) {
    return '<div class="page-header"><div class="page-header-left">' + '<span class="eyebrow"><span class="dot"></span>' + def.group + '</span>' + '<h1 class="page-title">' + def.title + '</h1>' + '<p class="page-subtitle">Ruta <span class="mono-sm">#' + path + '</span> · vista pendiente de construcción</p>' + '</div></div>';
  }
  function stubDefault(def, path) {
    return headerHTML(def, path) + '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:' + def.icon + '" width="32"></iconify-icon>' + '<h2 class="state-title">' + def.title + '</h2>' + '<p class="state-body">Selecciona una vista en la barra lateral. El contenido de esta pantalla se construirá en el siguiente paso.</p>' + '</div></div>';
  }
  function stubLoading(def, path) {
    let kpis = '';
    for (let i = 0; i < 4; i++) {
      kpis += '<div class="card card-compact stub-kpi">' + '<span class="skeleton sk-text-sm" style="width:45%"></span>' + '<span class="skeleton" style="height:34px;width:70%"></span>' + '<span class="skeleton sk-text-sm" style="width:35%"></span></div>';
    }
    let rows = '';
    for (let i = 0; i < 7; i++) {
      rows += '<div style="padding:0 16px"><span class="skeleton sk-row" style="margin:0"></span></div>';
    }
    return headerHTML(def, path) + '<div class="kpi-grid" style="margin-bottom:var(--space-4)">' + kpis + '</div>' + '<div class="card" style="padding:14px 0">' + rows + '</div>';
  }
  function stubEmpty(def, path) {
    return headerHTML(def, path) + '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:search" width="32"></iconify-icon>' + '<h2 class="state-title">Sin resultados</h2>' + '<p class="state-body">No hay datos que mostrar con los filtros actuales.</p>' + '<button class="btn btn-ghost btn-sm" data-action="retry">Limpiar filtros</button>' + '</div></div>';
  }
  function stubError(def, path) {
    return headerHTML(def, path) + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">No se pudo cargar la vista</h2>' + '<p class="state-body">Ha ocurrido un error al recuperar los datos. Inténtalo de nuevo.</p>' + '<button class="btn btn-primary btn-sm" data-action="retry"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }
  function notFoundHTML(path) {
    return '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:minus-circle" width="32"></iconify-icon>' + '<h2 class="state-title">Ruta no encontrada</h2>' + '<p class="state-body"><span class="mono-sm">#' + path + '</span> no corresponde a ninguna vista.</p>' + '<a class="btn btn-ghost btn-sm" href="#/">Ir al resumen</a>' + '</div></div>';
  }
  function loginHTML() {
    return '<div class="login-split">' +
    // ── Panel izquierdo (hero, oscuro) ──
    '<div class="login-left">' + '<div class="login-left-brand">' + '<span class="login-logo"><img src="assets/cpv-logo.png" alt="CooperVision"></span>' + '<div><div class="login-brand-name">CooperVision</div>' + '<div class="login-brand-sub">BBDD Ópticas Iberia</div></div>' + '</div>' + '<div class="login-left-hero">' + '<h1 class="login-hero-title">Plataforma de Ópticas Iberia<span class="login-hero-dot">.</span></h1>' + '<p class="login-hero-sub">Acceso centralizado a la base de datos de establecimientos ópticos de España y Portugal. Solo para profesionales autorizados de CooperVision.</p>' + '</div>' + '<div class="login-left-foot">© 2026 CooperVision Iberia. Desarrollado por Newno</div>' + '</div>' +
    // ── Panel derecho (formulario) ──
    '<div class="login-right">' + '<form class="login-form">' + '<h2 class="login-form-title">Acceso interno</h2>' + '<div class="form-group" style="margin-bottom:var(--space-6)"><label class="form-label" for="login-email">Email</label>' + '<input class="input" id="login-email" type="email" placeholder="nombre@coopervision.es" autocomplete="email"></div>' + '<div class="form-group"><label class="form-label" for="login-pwd">Contraseña</label>' + '<input class="input" id="login-pwd" type="password" placeholder="••••••••" autocomplete="current-password"></div>' + '<a href="#" id="login-forgot" class="login-forgot-link">¿Olvidaste tu contraseña?</a>' + '<button class="btn btn-primary btn-lg" id="login-submit-btn" type="button" style="width:100%;justify-content:center">Iniciar sesión</button>' + '<div class="login-divider"></div>' + '<div class="login-builtby">Built by <strong>Newno</strong></div>' + '</form>' + '</div>' + '</div>';
  }
  function footerHTML() {
    return '';
  }
  function renderView() {
    const root = $('#view-root');
    if (!root) return;
    const def = ROUTES[currentPath];
    // Expone la ruta activa al CSS (p.ej. V3 Mapa rompe el padding/max-width
    // del #view-root para ir full-bleed: #view-root[data-route="/mapa"]).
    root.setAttribute('data-route', currentPath);
    if (!def) {
      root.innerHTML = notFoundHTML(currentPath);
      root.insertAdjacentHTML('beforeend', footerHTML());
      return;
    }
    if (def.chrome === false) {
      root.innerHTML = loginHTML();
      return;
    }
    const state = getState();

    // ── Vistas modulares registradas en window.cpvViews ──────────
    // Cada módulo expone { render(state, ctx) -> htmlString } y un
    // hook opcional mounted(root, state, ctx) para dibujar charts /
    // enlazar tooltips tras inyectar el HTML.
    const view = window.cpvViews && window.cpvViews[currentPath];
    if (view && typeof view.render === 'function') {
      const ctx = {
        def,
        path: currentPath,
        md,
        role: getRole(),
        headerHTML,
        stubLoading,
        stubEmpty,
        stubError,
        toast
      };
      root.innerHTML = view.render(state, ctx);
      if (currentPath !== '/mapa') root.insertAdjacentHTML('beforeend', footerHTML());
      if (typeof view.mounted === 'function') view.mounted(root, state, ctx);
      return;
    }

    // ── Fallback: stubs por estado (vistas aún sin construir) ────
    switch (state) {
      case 'loading':
        root.innerHTML = stubLoading(def, currentPath);
        break;
      case 'empty':
        root.innerHTML = stubEmpty(def, currentPath);
        break;
      case 'error':
        root.innerHTML = stubError(def, currentPath);
        break;
      default:
        root.innerHTML = stubDefault(def, currentPath);
    }
    root.insertAdjacentHTML('beforeend', footerHTML());
  }

  /* ════ Usuario de sesión (desde mockData) ════ */
  function setupUser() {
    if (!md || !md.usuarios) return;
    const u = md.usuarios.find(x => x.id === md.sesion.usuario_actual_id) || md.usuarios[0];
    if (!u) return;
    const words = u.nombre.split(/\s+/).filter(Boolean);
    const initials = ((words[0] || '')[0] + (words[1] || '')[0] || '').toUpperCase();
    const shortName = words[1] ? words[0] + ' ' + words[1][0] + '.' : words[0];
    const set = (sel, txt) => {
      const el = $(sel);
      if (el) el.textContent = txt;
    };
    set('#avatar-initials', initials);
    set('#rail-avatar', initials);
    set('#avatar-name', shortName);
    set('#avatar-menu-name', u.nombre);
    set('#avatar-menu-email', u.email);
  }

  /* ════ Delegación de eventos ════ */
  function onClick(e) {
    const roleBtn = e.target.closest('.role-toggle-btn');
    if (roleBtn) {
      chooseRole(roleBtn.dataset.role);
      return;
    }
    const segBtn = e.target.closest('.segmented-btn');
    if (segBtn) {
      chooseState(segBtn.dataset.state);
      return;
    }
    const retry = e.target.closest('[data-action="retry"]');
    if (retry) {
      chooseState('default');
      return;
    }
    const loginBtn = e.target.closest('#login-submit-btn');
    if (loginBtn) {
      e.preventDefault();
      applyRole('admin');
      location.hash = '#/';
      return;
    }
    const loginForgot = e.target.closest('#login-forgot');
    if (loginForgot) {
      e.preventDefault();
      toast('info', 'Restablecimiento de contraseña', 'Contacta con el administrador del sistema.');
      return;
    }
    if (e.target.closest('#admin-nav')) {
      e.preventDefault();
      toggleFlyout();
      return;
    }
    if (e.target.closest('#avatar-btn')) {
      e.preventDefault();
      toggleAvatar();
      return;
    }

    // Clicks fuera → cerrar overlays
    if (!e.target.closest('#avatar-wrap')) closeAvatar();
    if (!e.target.closest('#admin-nav') && !e.target.closest('#admin-flyout')) closeFlyout();
  }
  function onKey(e) {
    if (e.key === 'Escape') {
      closeFlyout();
      closeAvatar();
      closePerfilFlyout();
    }
  }

  /* ════ Init ════ */
  function init() {
    applyRole(getRole());
    applyState(getState());
    if (md && md.sesion) md.sesion.rol_activo = getRole();
    setupUser();
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', route);
    route();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/app.js", error: String((e && e.message) || e) }); }

// coopervision/components/drawer-detalle.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · components/drawer-detalle.js — V5
   Drawer lateral de detalle de óptica. Componente GLOBAL: se monta
   en el <body> (no en #view-root), por lo que funciona desde V4
   (tabla), V3 (popup del mapa) y como deep-link ?optica=<place_id>.

   API pública:  window.cpvDrawer.open(place_id)  ·  .close()
   Enganches:    - V4 bbdd.js llama cpvDrawer.open(pid) en openDetalle()
                 - botones [data-action="open-detalle"][data-place-id]
                   (popup del mapa V3) se capturan por delegación global
                 - deep-link: ?optica=<pid> en el hash al cargar

   URL: persiste ?optica=<pid> vía history.replaceState (no dispara el
   router; el hash conserva la ruta + filtros previos). Cierre limpia
   el parámetro. Datos 100% desde window.mockData + md.helpers.
   Spec: 5.vistas_spec_parte2.md §V5. DS: 3.design_system.md §6.11/§8.6.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const md = window.mockData;
  if (!md) return;
  const h = md.helpers;
  const NOW = new Date('2026-06-13T12:00:00');

  /* ── estado del módulo (instancia única) ─────────────────────── */
  let _root = null; // overlay + drawer (en body)
  let _modal = null; // modal "Corregir dato" (en body)
  let _pid = null; // place_id activo
  let _tab = 'google'; // pestaña activa
  let _histN = 8; // nº de eventos de timeline mostrados
  let _roleObs = null; // observa cambios de rol

  const TABS = [{
    key: 'google',
    label: 'Google Maps'
  }, {
    key: 'cpv',
    label: 'CooperVision'
  }, {
    key: 'cambios',
    label: 'Cambios'
  }, {
    key: 'app',
    label: 'App'
  }, {
    key: 'estado',
    label: 'Estado'
  }];

  /* ════ utilidades ════ */
  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function role() {
    return document.body.getAttribute('data-role') || 'admin';
  }
  function isAdmin() {
    return role() === 'admin';
  }
  function fechaHora(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' · ' + d.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  function fechaCorta(iso) {
    return new Date(iso).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  function rel(iso) {
    const days = Math.floor((NOW - new Date(iso)) / 86400000);
    if (days <= 0) return 'hoy';
    if (days === 1) return 'ayer';
    if (days < 30) return 'hace ' + days + ' días';
    const m = Math.floor(days / 30);
    if (m < 12) return 'hace ' + m + (m === 1 ? ' mes' : ' meses');
    const y = Math.floor(m / 12);
    return 'hace ' + y + (y === 1 ? ' año' : ' años');
  }
  function userName(id) {
    const u = md.usuarios.find(x => x.id === id);
    if (!u) return 'Sistema';
    const w = u.nombre.split(/\s+/).filter(Boolean);
    return w[1] ? w[0] + ' ' + w[1][0] + '.' : w[0];
  }

  /* ── toast (replica el patrón del shell para uso standalone) ─── */
  function toast(type, title, body) {
    const cont = document.getElementById('toast-container');
    if (!cont) return;
    const icons = {
      success: 'check-circle',
      error: 'warning-triangle',
      warn: 'warning-triangle',
      info: 'bell'
    };
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML = '<span class="toast-icon ' + type + '"><iconify-icon icon="iconoir:' + (icons[type] || 'bell') + '" width="18"></iconify-icon></span>' + '<div class="toast-content"><div class="toast-title">' + enc(title) + '</div>' + (body ? '<div class="toast-body">' + enc(body) + '</div>' : '') + '</div>' + '<button class="toast-close" aria-label="Cerrar"><iconify-icon icon="iconoir:xmark" width="14"></iconify-icon></button>';
    const t = setTimeout(() => dismiss(), type === 'error' ? 8000 : type === 'warn' ? 6000 : 4000);
    function dismiss() {
      clearTimeout(t);
      if (!el.isConnected) return;
      el.classList.add('leaving');
      setTimeout(() => el.remove(), 180);
    }
    el.querySelector('.toast-close').addEventListener('click', dismiss);
    cont.appendChild(el);
  }
  function copyText(text) {
    const done = () => toast('success', 'Copiado', text + ' en el portapapeles.');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      done();
    } catch (e) {}
  }

  /* ════ URL: ?optica=<pid> sin disparar el router ════ */
  function hashParts() {
    let raw = (location.hash || '').replace(/^#/, '');
    const qi = raw.indexOf('?');
    const path = qi === -1 ? raw : raw.slice(0, qi);
    const params = new URLSearchParams(qi === -1 ? '' : raw.slice(qi + 1));
    return {
      path: path || '/',
      params
    };
  }
  function setOpticaParam(pid) {
    const {
      path,
      params
    } = hashParts();
    if (pid) params.set('optica', pid);else params.delete('optica');
    const qs = params.toString();
    history.replaceState(null, '', '#' + path + (qs ? '?' + qs : ''));
  }
  function readOpticaParam() {
    return hashParts().params.get('optica');
  }

  /* ════ modelo de datos para un place_id ════ */
  function cpvOverrideAplicado(cpv, overrides) {
    if (!cpv) return cpv;
    const out = Object.assign({}, cpv);
    overrides.filter(o => o.tabla_origen === 'opticas_cpv' && o.registro_id === cpv.CODIGO).forEach(o => {
      out[o.campo] = o.valor_nuevo;
    });
    return out;
  }
  function buildModel(pid) {
    const gBase = md.opticas_google.find(g => g.place_id === pid) || null;
    if (!gBase) return null;
    const overrides = h.overrides_de(pid);
    const cpvBase = h.cpv_de(pid);
    return {
      pid: pid,
      gBase: gBase,
      g: h.aplica_overrides_google(pid) || gBase,
      isClient: h.is_client(pid),
      cpvBase: cpvBase,
      cpv: cpvOverrideAplicado(cpvBase, overrides),
      app: h.app_data_de(pid),
      cadena: h.cadena_de(pid),
      overrides: overrides
    };
  }
  function findOverride(model, tabla, campo) {
    const regId = tabla === 'opticas_cpv' ? model.cpvBase && model.cpvBase.CODIGO : model.pid;
    return model.overrides.find(o => o.tabla_origen === tabla && o.campo === campo && o.registro_id === regId) || null;
  }

  /* ════ render: helper de campo label-valor ════
     opts = { mono, link, copy, editable, tabla, campo, chips:[], html, empty } */
  function field(model, label, value, opts) {
    opts = opts || {};
    const ov = opts.tabla && opts.campo ? findOverride(model, opts.tabla, opts.campo) : null;
    let valHtml;
    const isEmpty = !opts.html && !opts.chips && (value == null || value === '');
    if (opts.chips) {
      valHtml = opts.chips.length ? '<div class="cpv-valchips">' + opts.chips.map(c => '<span class="cpv-valchip">' + enc(c) + '</span>').join('') + '</div>' : '<span>—</span>';
    } else if (opts.html) {
      valHtml = opts.html;
    } else if (isEmpty) {
      valHtml = '<span>—</span>';
    } else if (opts.link) {
      valHtml = '<a class="cpv-extlink" href="' + enc(value) + '" target="_blank" rel="noopener">' + enc(String(value).replace(/^https?:\/\//, '')) + '<iconify-icon icon="iconoir:open-new-window" width="12"></iconify-icon></a>';
    } else if (opts.mono) {
      valHtml = '<span class="cpv-mono">' + enc(value) + '</span>';
    } else {
      valHtml = '<span>' + enc(value) + '</span>';
    }

    // botón copy o pencil a la derecha del valor
    let trailing = '';
    if (opts.copy) {
      trailing = '<button class="cpv-copy" data-copy="' + enc(value) + '" aria-label="Copiar"><iconify-icon icon="iconoir:copy" width="13"></iconify-icon></button>';
    } else if (opts.editable && isAdmin() && opts.tabla && opts.campo) {
      trailing = '<button class="cpv-field-edit" data-edit-tabla="' + enc(opts.tabla) + '" data-edit-campo="' + enc(opts.campo) + '" data-edit-label="' + enc(label) + '" aria-label="Corregir ' + enc(label) + '"><iconify-icon icon="iconoir:edit-pencil" width="13"></iconify-icon></button>';
    }
    let body = '<div class="cpv-field-main">' + valHtml + (ov ? ' <span class="pill pill-warn pill-sm"><iconify-icon icon="iconoir:edit-pencil" width="10"></iconify-icon>Corregido manualmente</span>' : '') + trailing + '</div>';
    if (ov) {
      const orig = ov.valor_anterior == null ? '(vacío)' : ov.valor_anterior;
      body += '<div class="cpv-orig">Valor original: <s>' + enc(orig) + '</s> · por <b>' + enc(userName(ov.usuario_id)) + '</b> · ' + fechaCorta(ov.fecha) + '</div>';
    }
    return '<div class="cpv-field"><div class="cpv-field-label">' + enc(label) + '</div>' + '<div class="cpv-field-value' + (isEmpty && !ov ? ' is-empty' : '') + '">' + body + '</div></div>';
  }
  function group(title, rows) {
    return '<div class="cpv-group"><div class="cpv-group-eyebrow">' + enc(title) + '</div>' + rows.join('') + '</div>';
  }
  function stars(r) {
    const full = Math.round(r);
    let s = '';
    for (let i = 1; i <= 5; i++) s += '<span class="cpv-star' + (i <= full ? '' : ' off') + '">★</span>';
    return '<span class="cpv-stars">' + s + '</span>';
  }

  /* ════════════════════════════════════════════════════════════
     TAB 1 · Google Maps
     ════════════════════════════════════════════════════════════ */
  function bizStatusPill(status) {
    if (status === 'CLOSED_PERMANENTLY') return '<span class="pill pill-neg pill-sm">Cerrada permanentemente</span>';
    if (status === 'CLOSED_TEMPORARILY') return '<span class="pill pill-warn pill-sm">Cerrada temporalmente</span>';
    return '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Activa</span>';
  }
  function hoursHTML(csv) {
    if (!csv) return '<span>—</span>';
    const lines = String(csv).split(';').map(s => s.trim()).filter(Boolean);
    return '<div class="cpv-hours">' + lines.map(l => '<span>' + enc(l) + '</span>').join('') + '</div>';
  }
  function tabGoogle(m) {
    const g = m.g;
    const out = [];
    out.push(group('Identidad', [field(m, 'Nombre', g.name, {
      editable: true,
      tabla: 'opticas_google',
      campo: 'name'
    }), field(m, 'Nombre emails', g.name_for_emails, {
      editable: true,
      tabla: 'opticas_google',
      campo: 'name_for_emails'
    }), field(m, 'Descripción', g.description), field(m, 'Acerca de', g.about)]));
    out.push(group('Contacto', [field(m, 'Teléfono', g.phone, {
      editable: true,
      tabla: 'opticas_google',
      campo: 'phone'
    }), field(m, 'Sitio web', g.website, {
      link: !!g.website,
      editable: true,
      tabla: 'opticas_google',
      campo: 'website'
    }), field(m, 'Gestor de cita', g.booking_appointment_link, {
      link: !!g.booking_appointment_link
    })]));
    out.push(group('Ubicación', [field(m, 'Dirección', g.address, {
      editable: true,
      tabla: 'opticas_google',
      campo: 'address'
    }), field(m, 'Calle', g.street), field(m, 'Ciudad', g.city, {
      editable: true,
      tabla: 'opticas_google',
      campo: 'city'
    }), field(m, 'Provincia', g.state), field(m, 'Código postal', g.postal_code, {
      editable: true,
      tabla: 'opticas_google',
      campo: 'postal_code'
    }), field(m, 'País', g.country + ' (' + g.country_code + ')'), field(m, 'Coordenadas', null, {
      html: '<div class="cpv-field-main"><span class="cpv-mono">' + g.latitude.toFixed(4) + ', ' + g.longitude.toFixed(4) + '</span>' + '<button class="btn btn-subtle btn-sm" data-foot="mapa"><iconify-icon icon="iconoir:map-pin" width="13"></iconify-icon>Ver en mapa</button></div>'
    })]));
    out.push(group('Reputación', [field(m, 'Valoración', null, {
      html: '<div class="cpv-field-main">' + stars(g.rating) + ' <span class="tnum" style="font-weight:600">' + g.rating.toFixed(1).replace('.', ',') + '</span> <span class="c-muted">· ' + g.reviews + ' reseñas</span></div>'
    }), field(m, 'Reseñas 5★', String(g.reviews_per_score_5)), field(m, 'Reseñas 1★', String(g.reviews_per_score_1)), field(m, 'Enlace reseñas', g.reviews_link && g.reviews_link !== '#' ? g.reviews_link : null, {
      link: !!(g.reviews_link && g.reviews_link !== '#'),
      html: g.reviews_link === '#' ? '<a class="cpv-extlink" href="#" onclick="return false">Ver en Google<iconify-icon icon="iconoir:open-new-window" width="12"></iconify-icon></a>' : null
    }), field(m, 'Fotos', String(g.photos_count))]));
    out.push(group('Operativa', [field(m, 'Estado negocio', null, {
      html: '<div class="cpv-field-main">' + bizStatusPill(g.business_status) + '</div>'
    }), field(m, 'Verificada', null, {
      html: '<div class="cpv-field-main">' + (g.verified ? '<span class="pill pill-pos pill-sm"><iconify-icon icon="iconoir:verified-badge" width="11"></iconify-icon>Sí</span>' : '<span class="pill pill-paused pill-sm">No</span>') + '</div>'
    }), field(m, 'Horario', null, {
      html: hoursHTML(g.working_hours_csv_compatible)
    }), field(m, 'Categoría', g.category), field(m, 'Subtipos', null, {
      chips: g.subtypes || []
    })]));
    out.push(group('Identificadores', [field(m, 'place_id', g.place_id, {
      mono: true,
      copy: true
    }), field(m, 'google_id', g.google_id, {
      mono: true,
      copy: true
    }), field(m, 'cid', g.cid, {
      mono: true,
      copy: true
    })]));
    return out.join('');
  }

  /* ════════════════════════════════════════════════════════════
     TAB 2 · CooperVision
     ════════════════════════════════════════════════════════════ */
  function tabCpv(m) {
    if (!m.isClient || !m.cpv) {
      return '<div class="empty-state" style="min-height:280px">' + '<iconify-icon class="empty-state-icon" icon="iconoir:database-xmark" width="32"></iconify-icon>' + '<h2 class="state-title">Sin datos comerciales</h2>' + '<p class="state-body">Esta óptica no es cliente CooperVision. No hay un registro de <span class="mono-sm">opticas_cpv</span> vinculado.</p>' + '</div>';
    }
    const c = m.cpv;
    const out = [];
    out.push(group('Identidad CPV', [field(m, 'Código', c.CPV_ID, {
      mono: true,
      copy: !!c.CPV_ID
    }), field(m, 'Grupo', null, {
      chips: [c.GRUPO]
    })]));
    out.push(group('Contacto (declarado CPV)', [field(m, 'Teléfono', c.TEL, {
      editable: true,
      tabla: 'opticas_cpv',
      campo: 'TEL'
    }), field(m, 'Email', c.EMAIL, {
      editable: true,
      tabla: 'opticas_cpv',
      campo: 'EMAIL'
    }), field(m, 'Dirección', c.DIRECCION, {
      editable: true,
      tabla: 'opticas_cpv',
      campo: 'DIRECCION'
    }), field(m, 'Localidad', c.LOCALIDAD, {
      editable: true,
      tabla: 'opticas_cpv',
      campo: 'LOCALIDAD'
    }), field(m, 'Provincia', c.PROVINCIA, {
      editable: true,
      tabla: 'opticas_cpv',
      campo: 'PROVINCIA'
    })]));
    out.push(group('Comercial', [field(m, 'Delegado (DP)', c.DP, {
      editable: true,
      tabla: 'opticas_cpv',
      campo: 'DP'
    }), field(m, 'Comercial', c.COM, {
      editable: true,
      tabla: 'opticas_cpv',
      campo: 'COM'
    }), field(m, 'Tipología', null, {
      chips: [c.TIPOLOGIA]
    }), field(m, 'Segmentación', null, {
      chips: ['Segmento ' + c.SEGMENTACION]
    })]));
    out.push(group('Datos técnicos', [field(m, 'Precisión geo', c.LOCATION_ACC, {
      html: '<div class="cpv-field-main"><span>' + enc(c.LOCATION_ACC) + '</span> <span class="c-muted body-xs">(accuracy Salesforce)</span></div>'
    })]));
    return out.join('');
  }

  /* ════════════════════════════════════════════════════════════
     TAB 3 · Cambios y overrides
     ════════════════════════════════════════════════════════════ */
  const TL_META = {
    sync_outscraper: {
      icon: 'refresh-double',
      cls: 'info',
      title: 'Sincronización Outscraper'
    },
    sync_salesforce: {
      icon: 'refresh-double',
      cls: 'info',
      title: 'Sincronización Salesforce'
    },
    override_aplicado: {
      icon: 'edit-pencil',
      cls: 'warn',
      title: 'Corrección aplicada'
    },
    override_revertido: {
      icon: 'edit-pencil',
      cls: 'muted',
      title: 'Corrección revertida'
    },
    vinculo_creado: {
      icon: 'check-circle',
      cls: 'pos',
      title: 'Vínculo CPV ↔ Google creado'
    },
    vinculo_eliminado: {
      icon: 'xmark',
      cls: 'neg',
      title: 'Vínculo eliminado'
    },
    app_data_actualizado: {
      icon: 'settings',
      cls: 'accent',
      title: 'Datos de app actualizados'
    },
    alta_inicial: {
      icon: 'plus',
      cls: 'muted',
      title: 'Alta inicial en la base de datos'
    }
  };
  function buildHistorico(m) {
    const ev = [];
    // eventos reales del log para este place_id (incluye override_aplicado mapeado)
    md.cambios_historicos.filter(c => c.place_id === m.pid).forEach(c => ev.push(Object.assign({}, c)));
    const has = tipo => ev.some(e => e.tipo === tipo);
    // sintéticos: syncs que la tocaron
    ev.push({
      fecha: '2026-05-10T14:32:00',
      tipo: 'sync_outscraper',
      motivo: 'Datos de Google refrescados'
    });
    ev.push({
      fecha: '2026-02-08T13:20:00',
      tipo: 'sync_outscraper',
      motivo: 'Datos de Google refrescados'
    });
    // vínculo si es cliente y no hay ya uno
    if (m.isClient && !has('vinculo_creado')) {
      ev.push({
        fecha: '2025-08-20T09:12:00',
        tipo: 'vinculo_creado',
        usuario_id: 1,
        motivo: 'Match confirmado: ' + (m.cpvBase ? m.cpvBase.CODIGO : 'CPV') + ' ↔ Google'
      });
    }
    // alta inicial
    const alta = m.app && m.app.fecha_alta_en_app ? m.app.fecha_alta_en_app : '2025-08-15';
    ev.push({
      fecha: alta + 'T08:00:00',
      tipo: 'alta_inicial'
    });
    ev.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    return ev;
  }
  function tlItem(e) {
    const meta = TL_META[e.tipo] || {
      icon: 'circle',
      cls: 'muted',
      title: e.tipo
    };
    let detail = '';
    if (e.tipo === 'override_aplicado' || e.tipo === 'override_revertido') {
      detail = '<b>' + enc(e.campo) + '</b>: ' + enc(e.valor_nuevo) + (e.valor_anterior != null ? ' <s>(antes: ' + enc(e.valor_anterior) + ')</s>' : ' <span class="c-muted2">(antes vacío)</span>');
    } else if (e.tipo === 'app_data_actualizado') {
      detail = '<b>' + enc(e.campo) + '</b>: ' + enc(e.valor_nuevo);
    } else if (e.motivo) {
      detail = enc(e.motivo);
    }
    const who = e.usuario_id ? ' · <span class="cpv-tl-user">' + enc(userName(e.usuario_id)) + '</span>' : '';
    return '<div class="cpv-tl"><div class="cpv-tl-icon ' + meta.cls + '"><iconify-icon icon="iconoir:' + meta.icon + '" width="13"></iconify-icon></div>' + '<div class="cpv-tl-body"><div class="cpv-tl-head"><span class="cpv-tl-title">' + enc(meta.title) + '</span>' + '<span class="cpv-tl-date">' + fechaHora(e.fecha) + '</span></div>' + (detail ? '<div class="cpv-tl-detail">' + detail + who + '</div>' : who ? '<div class="cpv-tl-detail">' + who.replace(' · ', '') + '</div>' : '') + '</div></div>';
  }
  function tabCambios(m) {
    const overrides = m.overrides.slice().sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    let block1;
    if (!overrides.length) {
      block1 = '<p class="body-sm c-muted" style="margin:0 0 var(--space-6)">Sin correcciones manuales activas sobre esta óptica.</p>';
    } else {
      block1 = '<div style="margin-bottom:var(--space-6)">' + overrides.map(o => {
        const orig = o.valor_anterior == null ? '(vacío)' : o.valor_anterior;
        const tablaCorta = o.tabla_origen.replace('opticas_', '');
        return '<div class="cpv-ov-card">' + '<div class="cpv-ov-top"><span class="cpv-ov-icon"><iconify-icon icon="iconoir:edit-pencil" width="14"></iconify-icon></span>' + '<span class="cpv-ov-field">' + enc(o.campo) + '</span><span class="cpv-ov-table">· ' + enc(tablaCorta) + '</span></div>' + '<div class="cpv-ov-change">' + enc(o.valor_nuevo) + ' <s>(era: ' + enc(orig) + ')</s></div>' + '<div class="cpv-ov-meta">por ' + enc(userName(o.usuario_id)) + ' · ' + rel(o.fecha) + '</div>' + '<div class="cpv-ov-foot"><span class="cpv-ov-motivo">' + (o.motivo ? '“' + enc(o.motivo) + '”' : '') + '</span>' + (isAdmin() ? '<button class="btn btn-ghost btn-sm cpv-ov-revert" data-ov-id="' + o.id + '"><iconify-icon icon="iconoir:undo" width="13"></iconify-icon>Revertir</button>' : '') + '</div></div>';
      }).join('') + '</div>';
    }
    const ev = buildHistorico(m);
    const shown = ev.slice(0, _histN);
    const more = ev.length > _histN ? '<button class="btn btn-ghost btn-sm cpv-tl-more"><iconify-icon icon="iconoir:plus" width="13"></iconify-icon>Cargar más (' + (ev.length - _histN) + ')</button>' : '';
    const changelogLink = isAdmin() ? '<a class="cpv-tl-changelog" href="#/changelog?optica=' + enc(m.pid) + '">Ver en changelog completo →</a>' : '';
    return '<p class="cpv-sub-eyebrow">Overrides activos · ' + overrides.length + '</p>' + block1 + '<p class="cpv-sub-eyebrow">Histórico de cambios</p>' + '<div class="cpv-timeline">' + shown.map(tlItem).join('') + '</div>' + (more || changelogLink ? '<div class="cpv-dd-morewrap">' + more + changelogLink + '</div>' : '');
  }

  /* ════════════════════════════════════════════════════════════
     TAB 4 · App
     ════════════════════════════════════════════════════════════ */
  function tabApp(m) {
    const a = m.app || {};
    const admin = isAdmin();
    const out = [];
    out.push(group('Identidad app', [field(m, 'place_id (FK)', m.pid, {
      mono: true,
      copy: true
    }), field(m, 'Alta en app', a.fecha_alta_en_app ? fechaCorta(a.fecha_alta_en_app) : null)]));
    let cadenaHtml;
    if (m.cadena) {
      cadenaHtml = '<div class="cpv-field-main"><span class="pill pill-neutral pill-sm">' + enc(m.cadena.nombre) + '</span> <span class="c-muted body-xs">· ' + (m.cadena.pais === 'PT' ? 'Portugal' : 'España') + '</span></div>';
    } else {
      cadenaHtml = '<div class="cpv-cadena-empty"><span class="is-empty" style="color:var(--muted-2)">Sin cadena asignada</span>' + (admin ? '<button class="btn btn-ghost btn-sm" data-app-action="reaplicar-cadena"><iconify-icon icon="iconoir:refresh" width="13"></iconify-icon>Re-aplicar detección</button>' : '') + '</div>';
    }
    out.push(group('Cadena', [field(m, 'Cadena resuelta', null, {
      html: cadenaHtml
    })]));
    return out.join('');
  }

  /* ════════════════════════════════════════════════════════════
     TAB 5 · Estado y campañas
     ════════════════════════════════════════════════════════════ */
  function matchingPill(m) {
    if (m.isClient) return '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Match confirmado</span>';
    return '<span class="pill pill-paused pill-sm">Sin vínculo CPV</span>';
  }
  function tabEstado(m) {
    const a = m.app || {};
    const admin = isAdmin();
    const out = [];
    out.push(group('Estado del registro', [field(m, 'Matching', null, {
      html: '<div class="cpv-field-main">' + matchingPill(m) + '</div>'
    }), field(m, 'Estado negocio', null, {
      html: '<div class="cpv-field-main">' + bizStatusPill(m.g.business_status) + '</div>'
    }), field(m, 'Última verificación', fechaCorta(md.ultima_sync_outscraper))]));
    const tgl = (key, name, desc, on) => '<div class="cpv-toggle-row"><div class="cpv-toggle-info"><div class="cpv-toggle-name">' + enc(name) + '</div>' + '<div class="cpv-toggle-desc">' + enc(desc) + '</div></div>' + '<label class="toggle-label"><input type="checkbox" data-toggle="' + key + '"' + (on ? ' checked' : '') + (admin ? '' : ' disabled') + '><span class="toggle-track"></span></label></div>';
    out.push('<div class="cpv-group"><div class="cpv-group-eyebrow">Visibilidad en campañas</div>' + tgl('show_campañas_core', 'Campañas Core', 'Mostrar en campañas generales de CooperVision.', !!a.show_campañas_core) + tgl('show_campañas_miopia', 'Control de Miopía', 'Mostrar en campañas del programa de control de miopía.', !!a.show_campañas_miopia) + '<div class="cpv-context-note">Estos toggles controlarán si la óptica aparece en el mapa público (Fase 2). Actualmente <b>no se aplica</b>.</div></div>');
    if (admin) {
      out.push('<div class="cpv-group"><div class="cpv-danger">' + '<div class="cpv-danger-head"><iconify-icon icon="iconoir:warning-triangle" width="14"></iconify-icon><span class="cpv-danger-title">Zona de peligro</span></div>' + '<button class="btn btn-ghost btn-sm" data-danger="cerrada"><iconify-icon icon="iconoir:building" width="14"></iconify-icon>Marcar como cerrada permanentemente</button>' + '<button class="btn btn-ghost btn-sm" data-danger="deteccion"><iconify-icon icon="iconoir:network-left" width="14"></iconify-icon>Solicitar nueva detección de cadena</button>' + '</div></div>');
    }
    return out.join('');
  }

  /* ════ tab dispatcher ════ */
  function tabContent(m) {
    switch (_tab) {
      case 'cpv':
        return tabCpv(m);
      case 'cambios':
        return tabCambios(m);
      case 'app':
        return tabApp(m);
      case 'estado':
        return tabEstado(m);
      default:
        return tabGoogle(m);
    }
  }

  /* ════ header / tabs / footer ════ */
  function headHTML(m) {
    const pills = [];
    pills.push(m.isClient ? '<span class="pill pill-accent pill-sm"><iconify-icon icon="iconoir:verified-badge" width="11"></iconify-icon>Cliente CPV</span>' : '<span class="pill pill-paused pill-sm">No cliente</span>');
    // matching: solo si ≠ match_confirmado
    if (!m.isClient) pills.push('<span class="pill pill-neutral pill-sm">Sin vínculo</span>');
    if (m.overrides.length) pills.push('<span class="pill pill-warn pill-sm"><iconify-icon icon="iconoir:edit-pencil" width="10"></iconify-icon>' + m.overrides.length + '</span>');
    return '<div class="cpv-dd-name-row"><h2 class="cpv-dd-name">' + enc(m.g.name) + '</h2>' + '<button class="cpv-dd-close" data-foot="cerrar" aria-label="Cerrar ficha"><iconify-icon icon="iconoir:xmark" width="20"></iconify-icon></button></div>' + '<div class="cpv-dd-pills">' + pills.join('') + '</div>' + '<div class="cpv-dd-addr"><iconify-icon icon="iconoir:map-pin" width="13"></iconify-icon>' + enc(m.g.address) + '</div>';
  }
  function tabsHTML(m) {
    return TABS.map(t => {
      let count = '';
      if (t.key === 'cambios' && m.overrides.length) count = '<span class="cpv-dd-tab-count">' + m.overrides.length + '</span>';
      return '<button class="cpv-dd-tab' + (t.key === _tab ? ' on' : '') + '" data-tab="' + t.key + '">' + enc(t.label) + count + '</button>';
    }).join('');
  }
  function footHTML(m) {
    if (isAdmin()) {
      const corregible = _tab === 'google' || _tab === 'cpv' && m.isClient;
      const corregirBtn = '<button class="btn btn-primary btn-sm" data-foot="corregir"' + (corregible ? '' : ' disabled title="Sin campos corregibles vía override en esta pestaña"') + '><iconify-icon icon="iconoir:edit-pencil" width="13"></iconify-icon>Corregir dato</button>';
      return '<button class="btn btn-ghost btn-sm" data-foot="mapa"><iconify-icon icon="iconoir:map-pin" width="13"></iconify-icon>Ver en mapa →</button>' + corregirBtn;
    }
    return '<button class="btn btn-subtle btn-sm" data-foot="cerrar">Cerrar</button>' + '<button class="btn btn-ghost btn-sm" data-foot="mapa"><iconify-icon icon="iconoir:map-pin" width="13"></iconify-icon>Ver en mapa →</button>';
  }

  /* ════ render incremental (sin re-animar el slide-in) ════ */
  function renderParts() {
    const m = buildModel(_pid);
    if (!m) return;
    _root.querySelector('.cpv-dd-head').innerHTML = headHTML(m);
    _root.querySelector('.cpv-dd-tabs').innerHTML = tabsHTML(m);
    _root.querySelector('.cpv-dd-body').innerHTML = tabContent(m);
    _root.querySelector('.cpv-dd-foot').innerHTML = footHTML(m);
  }
  function renderBodyFoot() {
    const m = buildModel(_pid);
    if (!m) return;
    _root.querySelector('.cpv-dd-tabs').innerHTML = tabsHTML(m);
    _root.querySelector('.cpv-dd-body').innerHTML = tabContent(m);
    _root.querySelector('.cpv-dd-foot').innerHTML = footHTML(m);
    _root.querySelector('.cpv-dd-body').scrollTop = 0;
  }

  /* ════ apertura / cierre ════ */
  function open(pid) {
    if (!pid) return;
    if (_root && _pid === pid) return; // idempotente (evita doble-disparo)
    const m = buildModel(pid);
    _pid = pid;
    _tab = 'google';
    _histN = 8;
    if (!_root) {
      _root = document.createElement('div');
      document.body.appendChild(_root);
      attachRoleObserver();
    }
    if (!m) {
      _root.innerHTML = '<div class="drawer-overlay" data-foot="cerrar"></div>' + '<aside class="drawer cpv-dd" role="dialog" aria-label="Óptica no encontrada">' + '<div class="cpv-dd-head"><div class="cpv-dd-name-row"><h2 class="cpv-dd-name">Óptica no encontrada</h2>' + '<button class="cpv-dd-close" data-foot="cerrar"><iconify-icon icon="iconoir:xmark" width="20"></iconify-icon></button></div></div>' + '<div class="cpv-dd-notfound"><iconify-icon icon="iconoir:minus-circle" width="32" style="color:var(--muted-2)"></iconify-icon>' + '<p class="state-body">No existe ninguna óptica con el identificador <span class="mono-sm">' + enc(pid) + '</span>.</p>' + '<button class="btn btn-ghost btn-sm" data-foot="cerrar">Cerrar</button></div></aside>';
      setOpticaParam(pid);
      bindRoot();
      return;
    }
    _root.innerHTML = '<div class="drawer-overlay" data-foot="cerrar"></div>' + '<aside class="drawer cpv-dd" role="dialog" aria-label="Detalle de óptica" tabindex="-1">' + '<div class="cpv-dd-head"></div>' + '<div class="cpv-dd-tabs"></div>' + '<div class="cpv-dd-body"></div>' + '<div class="cpv-dd-foot"></div>' + '</aside>';
    renderParts();
    setOpticaParam(pid);
    bindRoot();
    const dr = _root.querySelector('.drawer');
    if (dr) dr.focus();
  }
  function close() {
    closeModal();
    if (_root) {
      _root.innerHTML = '';
    }
    _pid = null;
    if (readOpticaParam()) setOpticaParam(null);
  }
  function switchTab(key) {
    if (key === _tab) return;
    _tab = key;
    _histN = 8;
    renderBodyFoot();
    const tabs = _root.querySelectorAll('.cpv-dd-tab');
    tabs.forEach(t => t.classList.toggle('on', t.getAttribute('data-tab') === key));
  }
  function verEnMapa() {
    const {
      path
    } = hashParts();
    if (path === '/mapa') {
      close();
      toast('info', 'Ya estás en el mapa', 'La óptica está situada en el mapa actual.');
      return;
    }
    close();
    location.hash = '#/mapa?optica=' + encodeURIComponent(_pid || '');
  }

  /* ════ eventos del drawer (delegación sobre _root) ════ */
  function bindRoot() {
    _root.onclick = function (e) {
      const close_ = e.target.closest('[data-foot="cerrar"]');
      if (close_) {
        close();
        return;
      }
      const tab = e.target.closest('.cpv-dd-tab');
      if (tab) {
        switchTab(tab.getAttribute('data-tab'));
        return;
      }
      const copy = e.target.closest('[data-copy]');
      if (copy) {
        copyText(copy.getAttribute('data-copy'));
        return;
      }
      const edit = e.target.closest('.cpv-field-edit');
      if (edit) {
        openModal({
          tabla: edit.getAttribute('data-edit-tabla'),
          campo: edit.getAttribute('data-edit-campo')
        });
        return;
      }
      const corregir = e.target.closest('[data-foot="corregir"]');
      if (corregir && !corregir.disabled) {
        openModal({
          tabla: _tab === 'cpv' ? 'opticas_cpv' : 'opticas_google'
        });
        return;
      }
      const mapa = e.target.closest('[data-foot="mapa"]');
      if (mapa) {
        verEnMapa();
        return;
      }
      const revert = e.target.closest('.cpv-ov-revert');
      if (revert) {
        toast('warn', 'Override revertido', 'Se registró un override de neutralización. El valor original vuelve a aplicarse.');
        return;
      }
      const more = e.target.closest('.cpv-tl-more');
      if (more) {
        _histN += 20;
        renderBodyFoot();
        return;
      }
      const appAct = e.target.closest('[data-app-action]');
      if (appAct) {
        const act = appAct.getAttribute('data-app-action');
        if (act === 'reaplicar-cadena') toast('info', 'Detección lanzada', 'Recalculando la cadena de esta óptica…');
        return;
      }
      const danger = e.target.closest('[data-danger]');
      if (danger) {
        const d = danger.getAttribute('data-danger');
        if (d === 'cerrada') toast('warn', 'Marcada como cerrada', 'Se registró un override de business_status = cerrada permanentemente.');else toast('info', 'Detección solicitada', 'Se ha encolado una nueva detección de cadena para esta óptica.');
        return;
      }
    };
    // toggles de campaña
    _root.onchange = function (e) {
      const tg = e.target.closest('[data-toggle]');
      if (!tg) return;
      const key = tg.getAttribute('data-toggle');
      const a = m_app();
      if (a) a[key] = tg.checked;
      toast('success', 'Visibilidad actualizada', (key === 'show_campañas_miopia' ? 'Control de Miopía' : 'Campañas Core') + ': ' + (tg.checked ? 'visible' : 'oculta') + '.');
    };
  }
  function m_app() {
    return h.app_data_de(_pid);
  }

  /* ════════════════════════════════════════════════════════════
     MODAL · Corregir dato
     ════════════════════════════════════════════════════════════ */
  const GOOGLE_FIELDS = [{
    campo: 'name',
    label: 'Nombre'
  }, {
    campo: 'phone',
    label: 'Teléfono'
  }, {
    campo: 'website',
    label: 'Sitio web'
  }, {
    campo: 'address',
    label: 'Dirección'
  }, {
    campo: 'city',
    label: 'Ciudad'
  }, {
    campo: 'postal_code',
    label: 'Código postal'
  }, {
    campo: 'category',
    label: 'Categoría'
  }, {
    campo: 'business_status',
    label: 'Estado del negocio'
  }];
  const CPV_FIELDS = [{
    campo: 'TEL',
    label: 'Teléfono CPV'
  }, {
    campo: 'EMAIL',
    label: 'Email CPV'
  }, {
    campo: 'DIRECCION',
    label: 'Dirección CPV'
  }, {
    campo: 'LOCALIDAD',
    label: 'Localidad'
  }, {
    campo: 'PROVINCIA',
    label: 'Provincia'
  }, {
    campo: 'DP',
    label: 'Delegado (DP)'
  }, {
    campo: 'COM',
    label: 'Comercial'
  }];
  function fieldsFor(tabla) {
    return tabla === 'opticas_cpv' ? CPV_FIELDS : GOOGLE_FIELDS;
  }
  function origValue(tabla, campo) {
    const m = buildModel(_pid);
    if (!m) return '';
    if (tabla === 'opticas_cpv') return m.cpvBase ? m.cpvBase[campo] == null ? '' : m.cpvBase[campo] : '';
    return m.gBase[campo] == null ? '' : m.gBase[campo];
  }
  function currentValue(tabla, campo) {
    const m = buildModel(_pid);
    if (!m) return '';
    if (tabla === 'opticas_cpv') return m.cpv ? m.cpv[campo] == null ? '' : m.cpv[campo] : '';
    return m.g[campo] == null ? '' : m.g[campo];
  }
  function openModal(opts) {
    const tabla = opts.tabla || 'opticas_google';
    const fields = fieldsFor(tabla);
    let campo = opts.campo;
    if (!campo || !fields.some(f => f.campo === campo)) campo = fields[0].campo;
    if (!_modal) {
      _modal = document.createElement('div');
      document.body.appendChild(_modal);
    }
    _modal.innerHTML = '<div class="modal-overlay" data-cor="cancel">' + '<div class="modal" role="dialog" aria-label="Corregir dato" onclick="event.stopPropagation()">' + '<div class="modal-header"><h3 class="modal-title">Corregir dato</h3>' + '<button class="btn-icon" data-cor="cancel" aria-label="Cerrar"><iconify-icon icon="iconoir:xmark" width="18"></iconify-icon></button></div>' + '<div class="modal-body">' + '<div class="form-group" style="margin-bottom:var(--space-5)"><label class="form-label">Campo a corregir</label>' + '<select class="select select-sm" id="cpv-cor-campo">' + fields.map(f => '<option value="' + f.campo + '"' + (f.campo === campo ? ' selected' : '') + '>' + enc(f.label) + '</option>').join('') + '</select></div>' + '<div class="cpv-cor-readonly">' + '<div class="cpv-cor-ro-row"><span class="cpv-cor-ro-label">Tabla origen</span><span class="cpv-cor-ro-val mono">' + enc(tabla) + '</span></div>' + '<div class="cpv-cor-ro-row"><span class="cpv-cor-ro-label">Campo</span><span class="cpv-cor-ro-val mono" id="cpv-cor-campo-lbl">' + enc(campo) + '</span></div>' + '<div class="cpv-cor-ro-row"><span class="cpv-cor-ro-label">Valor original</span><span class="cpv-cor-ro-val" id="cpv-cor-orig">' + enc(origValue(tabla, campo) || '(vacío)') + '</span></div>' + '</div>' + '<div class="form-group" style="margin-bottom:var(--space-5)"><label class="form-label">Nuevo valor</label>' + '<input class="input input-sm" id="cpv-cor-nuevo" type="text" value="' + enc(currentValue(tabla, campo)) + '"></div>' + '<div class="form-group"><label class="form-label">Motivo (opcional)</label>' + '<input class="input input-sm" id="cpv-cor-motivo" type="text" placeholder="p. ej. Formato corregido manualmente"></div>' + '<div class="cpv-cor-note"><iconify-icon icon="iconoir:lock" width="14"></iconify-icon>' + '<span>Este cambio se registra en <b>opticas_overrides</b> y queda auditado. Se aplica encima del dato original sin sobrescribirlo.</span></div>' + '</div>' + '<div class="modal-footer"><button class="btn btn-ghost btn-sm" data-cor="cancel">Cancelar</button>' + '<button class="btn btn-primary btn-sm" data-cor="save"><iconify-icon icon="iconoir:check" width="13"></iconify-icon>Guardar override</button></div>' + '</div></div>';
    const sel = _modal.querySelector('#cpv-cor-campo');
    sel.addEventListener('change', () => {
      const c = sel.value;
      _modal.querySelector('#cpv-cor-campo-lbl').textContent = c;
      _modal.querySelector('#cpv-cor-orig').textContent = origValue(tabla, c) || '(vacío)';
      _modal.querySelector('#cpv-cor-nuevo').value = currentValue(tabla, c);
    });
    _modal.onclick = e => {
      if (e.target.closest('[data-cor="cancel"]')) {
        closeModal();
        return;
      }
      if (e.target.closest('[data-cor="save"]')) {
        const c = sel.value;
        const nuevo = (_modal.querySelector('#cpv-cor-nuevo').value || '').trim();
        closeModal();
        toast('success', 'Override registrado', c + ' → “' + (nuevo || '(vacío)') + '”. Registrado en opticas_overrides.');
      }
    };
    const inp = _modal.querySelector('#cpv-cor-nuevo');
    if (inp) inp.focus();
  }
  function closeModal() {
    if (_modal) _modal.innerHTML = '';
  }

  /* ════ rol: re-render al cambiar admin/user con drawer abierto ════ */
  function attachRoleObserver() {
    if (_roleObs) return;
    _roleObs = new MutationObserver(() => {
      if (_root && _pid) renderParts();
    });
    _roleObs.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-role']
    });
  }

  /* ════ teclado + hashchange + deep-link ════ */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (_modal && _modal.innerHTML) {
      closeModal();
      return;
    }
    if (_root && _pid) close();
  });

  // Captura global de botones "Ver detalle completo" (popup mapa V3, etc.)
  document.addEventListener('click', e => {
    const b = e.target.closest('button[data-action="open-detalle"][data-place-id]');
    if (b) {
      e.preventDefault();
      open(b.getAttribute('data-place-id'));
    }
  });

  // Cambios de hash: si desaparece ?optica= o cambia la ruta base, cierra
  window.addEventListener('hashchange', () => {
    const opt = readOpticaParam();
    if (!_pid) {
      if (opt) open(opt);
      return;
    }
    if (!opt) {
      _root.innerHTML = '';
      _pid = null;
      closeModal();
    } else if (opt !== _pid) open(opt);
  });
  function initDeepLink() {
    const opt = readOpticaParam();
    if (opt) open(opt);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeepLink);
  } else {
    initDeepLink();
  }

  /* ════ API pública ════ */
  window.cpvDrawer = {
    open: open,
    close: close
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/components/drawer-detalle.js", error: String((e && e.message) || e) }); }

// coopervision/data.js
try { (() => {
// 6.mock_data.js
//
// Single source of truth de todos los datos mock del prototipo.
// Modelo de 4 tablas relacionales (ver 1.prd.md §2):
//   - opticas_google      (PK: place_id) — 40 registros
//   - opticas_cpv         (PK: CODIGO, FK: place_id_fk) — 18 registros
//   - opticas_app_data    (FK: place_id, 1:1) — alineado con opticas_google
//   - opticas_overrides   (append-only log) — 8 overrides activos
// + auxiliares: cadenas, usuarios, logs_actividad, syncs_historial, cambios_historicos
//
// Expuesto como objeto global `mockData` (evita problemas de fetch sobre file://).
// En la reescritura React, importar como módulo ES.

window.mockData = function () {
  // ─────────────────────────────────────────────────────────────────
  // CADENAS (25)
  // ─────────────────────────────────────────────────────────────────
  const cadenas = [{
    id: 1,
    nombre: 'Visionlab',
    keywords: ['visionlab'],
    dominios: ['visionlab.es'],
    pais: 'ES'
  }, {
    id: 2,
    nombre: 'Multiópticas',
    keywords: ['multiopticas'],
    dominios: ['multiopticas.com'],
    pais: 'ES'
  }, {
    id: 3,
    nombre: 'Alain Afflelou',
    keywords: ['afflelou'],
    dominios: ['afflelou.es'],
    pais: 'ES'
  }, {
    id: 4,
    nombre: 'General Óptica',
    keywords: ['general optica'],
    dominios: ['generaloptica.es'],
    pais: 'ES'
  }, {
    id: 5,
    nombre: 'Soloptical',
    keywords: ['soloptical'],
    dominios: ['soloptical.com'],
    pais: 'ES'
  }, {
    id: 6,
    nombre: '+Visión',
    keywords: ['masvision', '+vision'],
    dominios: ['masvision.es'],
    pais: 'ES'
  }, {
    id: 7,
    nombre: 'Federópticos',
    keywords: ['federopticos'],
    dominios: ['federopticos.com'],
    pais: 'ES'
  }, {
    id: 8,
    nombre: 'Cottet',
    keywords: ['cottet'],
    dominios: ['cottet.com'],
    pais: 'ES'
  }, {
    id: 9,
    nombre: 'Opticalia',
    keywords: ['opticalia'],
    dominios: ['opticalia.com'],
    pais: 'ES'
  }, {
    id: 10,
    nombre: 'Specsavers',
    keywords: ['specsavers'],
    dominios: ['specsavers.es'],
    pais: 'ES'
  }, {
    id: 11,
    nombre: 'GrandVision',
    keywords: ['grandvision'],
    dominios: ['grandvision.es'],
    pais: 'ES'
  }, {
    id: 12,
    nombre: 'Óptica 2000',
    keywords: ['optica 2000'],
    dominios: ['optica2000.com'],
    pais: 'ES'
  }, {
    id: 13,
    nombre: 'Natural Optics',
    keywords: ['natural optics'],
    dominios: ['naturaloptics.com'],
    pais: 'ES'
  }, {
    id: 14,
    nombre: 'Óptica Universitaria',
    keywords: ['optica universitaria'],
    dominios: ['opticauniversitaria.es'],
    pais: 'ES'
  }, {
    id: 15,
    nombre: 'Optimil',
    keywords: ['optimil'],
    dominios: ['optimil.com'],
    pais: 'ES'
  }, {
    id: 16,
    nombre: 'Mister Spex',
    keywords: ['mister spex'],
    dominios: ['misterspex.es'],
    pais: 'ES'
  }, {
    id: 17,
    nombre: 'MultiOpticas PT',
    keywords: ['multiopticas portugal'],
    dominios: ['multiopticas.pt'],
    pais: 'PT'
  }, {
    id: 18,
    nombre: 'Óticas Lince',
    keywords: ['oticas lince'],
    dominios: ['lince.pt'],
    pais: 'PT'
  }, {
    id: 19,
    nombre: 'Wells Óptica',
    keywords: ['wells'],
    dominios: ['wells.pt'],
    pais: 'PT'
  }, {
    id: 20,
    nombre: 'Instituto Óptico',
    keywords: ['instituto optico'],
    dominios: ['institutooptico.pt'],
    pais: 'PT'
  }, {
    id: 21,
    nombre: 'Óticas Visão',
    keywords: ['oticas visao'],
    dominios: ['oticasvisao.pt'],
    pais: 'PT'
  }, {
    id: 22,
    nombre: 'Optivisão',
    keywords: ['optivisao'],
    dominios: ['optivisao.pt'],
    pais: 'PT'
  }, {
    id: 23,
    nombre: 'José de Mello',
    keywords: ['jose de mello'],
    dominios: ['jdmsaude.pt'],
    pais: 'PT'
  }, {
    id: 24,
    nombre: 'Óculos Centro',
    keywords: ['oculos centro'],
    dominios: [],
    pais: 'PT'
  }, {
    id: 25,
    nombre: 'Óticas SA',
    keywords: ['oticas sa'],
    dominios: [],
    pais: 'PT'
  }];

  // Helper para no repetir campos constantes
  const G = (id, name, lat, lng, city, state, postal, addr, rating, reviews, phone, website, verified, cat, owner, photos) => ({
    place_id: `ChIJ_${id}`,
    google_id: `0x${id}`,
    cid: `${id}_cid`,
    name,
    name_for_emails: name,
    phone,
    website,
    business_status: 'OPERATIONAL',
    verified,
    description: null,
    about: null,
    address: `${addr}, ${postal} ${city}, ${phone && phone.indexOf('+351') === 0 ? 'Portugal' : 'España'}`,
    street: addr,
    city,
    state,
    postal_code: postal,
    country: phone && phone.indexOf('+351') === 0 ? 'Portugal' : 'España',
    country_code: phone && phone.indexOf('+351') === 0 ? 'PT' : 'ES',
    latitude: lat,
    longitude: lng,
    located_in: null,
    category: cat || 'Optician',
    subtypes: ['Optician'],
    query: `optica ${city.toLowerCase()}`,
    rating,
    reviews,
    reviews_per_score_1: Math.floor(reviews * 0.05),
    reviews_per_score_5: Math.floor(reviews * 0.7),
    reviews_link: '#',
    photos_count: photos || Math.floor(reviews / 5),
    working_hours_csv_compatible: 'Lun-Vie: 10:00-14:00, 17:00-20:30; Sáb: 10:00-14:00',
    booking_appointment_link: null,
    owner_title: owner,
    location_link: '#'
  });

  // ─────────────────────────────────────────────────────────────────
  // OPTICAS_GOOGLE (40 registros, mix por provincia)
  // ─────────────────────────────────────────────────────────────────
  const opticas_google = [
  // Madrid (10)
  G('madrid_001', 'Óptica San Carlos', 40.4154, -3.7090, 'Madrid', 'Madrid', '28013', 'C/ Mayor 23', 4.8, 324, '+34 91 555 1234', 'https://opticasancarlos.es', true, 'Optician', 'Carlos Martínez', 47), G('madrid_002', 'Visionlab Gran Vía', 40.4200, -3.7048, 'Madrid', 'Madrid', '28013', 'Gran Vía 32', 4.2, 187, '+34 91 222 8800', 'https://www.visionlab.es/gran-via', true, 'Optician', null, 23), G('madrid_003', 'General Óptica Castellana', 40.4441, -3.6907, 'Madrid', 'Madrid', '28046', 'Paseo de la Castellana 89', 4.5, 412, '+34 91 411 2233', 'https://www.generaloptica.es/castellana', true, 'Optician', null, 31), G('madrid_004', 'Óptica Bermejo', 40.4324, -3.7008, 'Madrid', 'Madrid', '28010', 'C/ Fuencarral 121', 4.9, 156, '+34 91 446 5566', 'https://opticabermejo.com', true, 'Optician', 'María Bermejo', 89), G('madrid_005', 'Alain Afflelou Serrano', 40.4279, -3.6889, 'Madrid', 'Madrid', '28001', 'C/ Serrano 47', 4.1, 89, '+34 91 575 9988', 'https://www.afflelou.es/serrano', true, 'Optician', null, 14), G('madrid_006', 'Multiópticas Atocha', 40.4119, -3.6979, 'Madrid', 'Madrid', '28012', 'C/ Atocha 89', 3.8, 67, '+34 91 530 1122', 'https://www.multiopticas.com/atocha', false, 'Optician', null, 8), G('madrid_007', 'Óptica Vista Norte', 40.4546, -3.7034, 'Madrid', 'Madrid', '28020', 'C/ Bravo Murillo 234', 4.6, 78, '+34 91 388 7766', null, true, 'Optician', 'Antonio Ruiz', 12), G('madrid_008', '+Visión Princesa', 40.4302, -3.7117, 'Madrid', 'Madrid', '28008', 'C/ Princesa 45', 4.0, 134, '+34 91 540 3344', 'https://www.masvision.es/princesa', true, 'Optician', null, 18), G('madrid_009', 'Óptica Vega', 40.4264, -3.6797, 'Madrid', 'Madrid', '28009', 'C/ Goya 78', 4.7, 203, '+34 91 575 1122', 'https://opticavega.es', true, 'Optician', 'Pedro Vega', 35), G('madrid_010', 'Cottet Salamanca', 40.4259, -3.6857, 'Madrid', 'Madrid', '28001', 'C/ Velázquez 35', 4.3, 92, '+34 91 435 2244', 'https://www.cottet.com/salamanca', true, 'Optician', null, 21),
  // Barcelona (8)
  G('bcn_001', 'Visionlab Diagonal', 41.3909, 2.1494, 'Barcelona', 'Barcelona', '08036', 'Av. Diagonal 477', 4.3, 245, '+34 93 444 5566', 'https://www.visionlab.es/diagonal-bcn', true, 'Optician', null, 27), G('bcn_002', 'Óptica Universitaria PG', 41.3936, 2.1622, 'Barcelona', 'Barcelona', '08008', 'Passeig de Gràcia 71', 4.6, 511, '+34 93 215 8877', 'https://www.opticauniversitaria.es/paseo-gracia', true, 'Optician', null, 64), G('bcn_003', 'Òptica Gràcia', 41.4030, 2.1554, 'Barcelona', 'Barcelona', '08012', 'C/ Gran de Gràcia 122', 4.9, 167, '+34 93 217 4455', null, true, 'Optician', 'Joan Puig', 22), G('bcn_004', 'Multiópticas Aragó', 41.3897, 2.1612, 'Barcelona', 'Barcelona', '08007', 'C/ Aragó 256', 3.6, 54, '+34 93 453 2233', 'https://www.multiopticas.com/arago', false, 'Optician', null, 6), G('bcn_005', 'Òptica Bofill', 41.3922, 2.1639, 'Barcelona', 'Barcelona', '08008', 'Rambla de Catalunya 88', 4.8, 289, '+34 93 487 9911', 'https://opticabofill.cat', true, 'Optician', 'Marta Bofill', 98), G('bcn_006', 'Federópticos Sants', 41.3756, 2.1356, 'Barcelona', 'Barcelona', '08028', 'C/ Sants 142', 4.4, 124, '+34 93 332 4488', 'https://www.federopticos.com/sants', true, 'Optician', null, 17), G('bcn_007', 'Alain Afflelou Diagonal', 41.3911, 2.1394, 'Barcelona', 'Barcelona', '08029', 'Av. Diagonal 561', 4.0, 76, '+34 93 419 5566', 'https://www.afflelou.es/diagonal', true, 'Optician', null, 11), G('bcn_008', 'Óptica Sarrià', 41.4007, 2.1224, 'Barcelona', 'Barcelona', '08017', 'C/ Major de Sarrià 56', 4.7, 142, '+34 93 204 3322', 'https://opticasarria.com', true, 'Optician', 'Laura Tort', 24),
  // Valencia (4)
  G('val_001', 'Óptica Valenciana', 39.4699, -0.3763, 'Valencia', 'Valencia', '46004', 'C/ Colón 12', 4.6, 198, '+34 96 351 2233', 'https://opticavalenciana.es', true, 'Optician', 'Vicente López', 28), G('val_002', 'Visionlab Valencia Centro', 39.4702, -0.3768, 'Valencia', 'Valencia', '46002', 'Pl. Ayuntamiento 19', 4.1, 134, '+34 96 392 7788', 'https://www.visionlab.es/valencia', true, 'Optician', null, 14), G('val_003', 'Òptica Russafa', 39.4622, -0.3713, 'Valencia', 'Valencia', '46006', 'C/ Cuba 24', 4.8, 89, '+34 96 333 4455', null, true, 'Optician', 'Carmen Soler', 31), G('val_004', 'General Óptica Blasco Ibáñez', 39.4724, -0.3514, 'Valencia', 'Valencia', '46022', 'Av. Blasco Ibáñez 122', 4.4, 145, '+34 96 339 6677', 'https://www.generaloptica.es/blasco', true, 'Optician', null, 19),
  // Sevilla (3)
  G('sev_001', 'Óptica Macarena', 37.4061, -5.9897, 'Sevilla', 'Sevilla', '41003', 'C/ Feria 67', 4.5, 167, '+34 95 437 5566', 'https://opticamacarena.es', true, 'Optician', 'Manuel Jiménez', 22), G('sev_002', 'Multiópticas Nervión', 37.3826, -5.9712, 'Sevilla', 'Sevilla', '41005', 'Av. Eduardo Dato 33', 3.9, 89, '+34 95 463 1122', 'https://www.multiopticas.com/nervion', false, 'Optician', null, 10), G('sev_003', 'Òptica Triana', 37.3852, -6.0024, 'Sevilla', 'Sevilla', '41010', 'C/ Pagés del Corro 145', 4.7, 234, '+34 95 433 9988', 'https://opticatriana.com', true, 'Optician', 'Rocío Romero', 41),
  // Bilbao (2)
  G('bio_001', 'Óptica Indautxu', 43.2630, -2.9395, 'Bilbao', 'Bizkaia', '48010', 'C/ Iparragirre 23', 4.6, 187, '+34 94 421 3344', 'https://opticaindautxu.com', true, 'Optician', 'Iñaki Beitia', 28), G('bio_002', 'Visionlab Bilbao Gran Vía', 43.2603, -2.9347, 'Bilbao', 'Bizkaia', '48001', 'Gran Vía 45', 4.2, 156, '+34 94 442 5577', 'https://www.visionlab.es/bilbao', true, 'Optician', null, 18),
  // Zaragoza (2)
  G('zgz_001', 'Òptica Pilar', 41.6488, -0.8891, 'Zaragoza', 'Zaragoza', '50001', 'C/ Alfonso I 23', 4.7, 203, '+34 97 622 4455', 'https://opticapilar.es', true, 'Optician', 'Pilar Aragón', 33), G('zgz_002', 'General Óptica Independencia', 41.6499, -0.8829, 'Zaragoza', 'Zaragoza', '50001', 'Pº Independencia 18', 4.3, 124, '+34 97 621 8899', 'https://www.generaloptica.es/zgz', true, 'Optician', null, 16),
  // Málaga (2)
  G('mlg_001', 'Óptica Larios', 36.7196, -4.4200, 'Málaga', 'Málaga', '29005', 'C/ Marqués de Larios 12', 4.6, 245, '+34 95 221 3344', 'https://opticalarios.es', true, 'Optician', 'José Luis Pérez', 39), G('mlg_002', '+Visión Málaga Centro', 36.7213, -4.4214, 'Málaga', 'Málaga', '29008', 'C/ Granada 45', 3.9, 78, '+34 95 222 5566', 'https://www.masvision.es/malaga', false, 'Optician', null, 9),
  // Otras ciudades ES (4)
  G('mur_001', 'Óptica Murciana', 37.9922, -1.1307, 'Murcia', 'Murcia', '30001', 'C/ Trapería 33', 4.5, 134, '+34 96 822 1144', 'https://opticamurciana.es', true, 'Optician', 'Asunción García', 19), G('vig_001', 'Óptica Casablanca Vigo', 42.2406, -8.7207, 'Vigo', 'Pontevedra', '36202', 'C/ Príncipe 12', 4.8, 178, '+34 98 643 2255', 'https://opticacasablanca.gal', true, 'Optician', 'Manuel Vázquez', 25), G('plm_001', 'Òptica Palma', 39.5696, 2.6502, 'Palma', 'Illes Balears', '07001', 'C/ Sant Miquel 56', 4.6, 156, '+34 97 172 3344', 'https://opticapalma.com', true, 'Optician', 'Joana Morey', 22), G('sant_001', 'Visionlab Santander', 43.4623, -3.8099, 'Santander', 'Cantabria', '39003', 'C/ Burgos 13', 4.2, 98, '+34 94 221 5566', 'https://www.visionlab.es/santander', true, 'Optician', null, 13),
  // Portugal (5)
  G('lis_001', 'Optivisão Chiado', 38.7104, -9.1418, 'Lisboa', 'Lisboa', '1200-094', 'R. Garrett 41', 4.6, 312, '+351 21 346 7788', 'https://www.optivisao.pt/chiado', true, 'Optician', null, 38), G('lis_002', 'Óculos Centro Avenida', 38.7223, -9.1462, 'Lisboa', 'Lisboa', '1050-016', 'Av. da Liberdade 89', 4.8, 234, '+351 21 354 9911', 'https://oculoscentro.pt', true, 'Optician', 'João Silva', 42), G('lis_003', 'MultiOpticas Saldanha', 38.7338, -9.1450, 'Lisboa', 'Lisboa', '1050-185', 'Pç. Duque de Saldanha 24', 4.0, 167, '+351 21 359 4422', 'https://www.multiopticas.pt/saldanha', true, 'Optician', null, 19), G('opo_001', 'Wells Óptica Boavista', 41.1546, -8.6303, 'Porto', 'Porto', '4100-129', 'Av. da Boavista 1289', 4.4, 198, '+351 22 605 7733', 'https://wells.pt/boavista', true, 'Optician', null, 24), G('opo_002', 'Óticas Lince Aliados', 41.1496, -8.6109, 'Porto', 'Porto', '4000-064', 'Av. dos Aliados 67', 4.7, 143, '+351 22 200 8855', 'https://lince.pt/aliados', true, 'Optician', 'Maria Santos', 29)];

  // Enlace "Gestor de cita" (booking_appointment_link) para un subconjunto de ópticas.
  // El resto queda null → se muestra "—" en las tablas y fichas.
  const _booking_links = {
    ChIJ_madrid_001: 'https://opticasancarlos.es/reservar-cita',
    ChIJ_madrid_003: 'https://www.generaloptica.es/castellana/cita',
    ChIJ_madrid_004: 'https://opticabermejo.com/cita',
    ChIJ_madrid_009: 'https://opticavega.es/reserva',
    ChIJ_bcn_001: 'https://www.visionlab.es/diagonal-bcn/cita',
    ChIJ_bcn_002: 'https://www.opticauniversitaria.es/paseo-gracia/cita',
    ChIJ_bcn_005: 'https://opticabofill.cat/reservar',
    ChIJ_val_001: 'https://opticavalenciana.es/cita-previa',
    ChIJ_sev_003: 'https://opticatriana.com/reservar',
    ChIJ_bio_001: 'https://opticaindautxu.com/cita',
    ChIJ_zgz_001: 'https://opticapilar.es/reserva',
    ChIJ_lis_001: 'https://www.optivisao.pt/chiado/marcacao',
    ChIJ_opo_002: 'https://lince.pt/aliados/marcacao'
  };
  opticas_google.forEach(g => {
    if (_booking_links[g.place_id]) g.booking_appointment_link = _booking_links[g.place_id];
  });

  // ─────────────────────────────────────────────────────────────────
  // OPTICAS_CPV (18 registros, 15 vinculados + 3 sin vincular)
  // ─────────────────────────────────────────────────────────────────
  const opticas_cpv = [
  // 15 clientes vinculados
  {
    CODIGO: 'CPV-08234',
    GRUPO: 'Independiente',
    DIRECCION: 'Calle Mayor 23',
    LOCALIDAD: 'Madrid',
    PROVINCIA: 'Madrid',
    TEL: '915551234',
    EMAIL: 'info@opticasancarlos.es',
    DP: 'Juan García',
    COM: 'Sara Pérez',
    TIPOLOGIA: 'Optometría premium',
    SEGMENTACION: 'A',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_madrid_001'
  }, {
    CODIGO: 'CPV-04122',
    GRUPO: 'Visionlab',
    DIRECCION: 'Gran Vía 32',
    LOCALIDAD: 'Madrid',
    PROVINCIA: 'Madrid',
    TEL: '912228800',
    EMAIL: null,
    DP: 'Juan García',
    COM: 'Sara Pérez',
    TIPOLOGIA: 'Cadena',
    SEGMENTACION: 'B',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_madrid_002'
  }, {
    CODIGO: 'CPV-04567',
    GRUPO: 'General Óptica',
    DIRECCION: 'P. de la Castellana 89',
    LOCALIDAD: 'Madrid',
    PROVINCIA: 'Madrid',
    TEL: '914112233',
    EMAIL: 'castellana@generaloptica.es',
    DP: 'Juan García',
    COM: 'Diego Romero',
    TIPOLOGIA: 'Cadena premium',
    SEGMENTACION: 'A',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_madrid_003'
  }, {
    CODIGO: 'CPV-09812',
    GRUPO: 'Independiente',
    DIRECCION: 'C/ Fuencarral 121',
    LOCALIDAD: 'Madrid',
    PROVINCIA: 'Madrid',
    TEL: '914465566',
    EMAIL: 'maria@opticabermejo.com',
    DP: 'Juan García',
    COM: 'Sara Pérez',
    TIPOLOGIA: 'Boutique',
    SEGMENTACION: 'A',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_madrid_004'
  }, {
    CODIGO: 'CPV-06432',
    GRUPO: 'Independiente',
    DIRECCION: 'C/ Goya 78',
    LOCALIDAD: 'Madrid',
    PROVINCIA: 'Madrid',
    TEL: '915751122',
    EMAIL: 'cita@opticavega.es',
    DP: 'Juan García',
    COM: 'Diego Romero',
    TIPOLOGIA: 'Optometría',
    SEGMENTACION: 'A',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_madrid_009'
  }, {
    CODIGO: 'CPV-02345',
    GRUPO: 'Visionlab',
    DIRECCION: 'Av. Diagonal 477',
    LOCALIDAD: 'Barcelona',
    PROVINCIA: 'Barcelona',
    TEL: '934445566',
    EMAIL: null,
    DP: 'Núria Vidal',
    COM: 'Marc Esteve',
    TIPOLOGIA: 'Cadena',
    SEGMENTACION: 'B',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_bcn_001'
  }, {
    CODIGO: 'CPV-08899',
    GRUPO: 'Óptica Universitaria',
    DIRECCION: 'Passeig de Gràcia 71',
    LOCALIDAD: 'Barcelona',
    PROVINCIA: 'Barcelona',
    TEL: '932158877',
    EMAIL: 'pg@opticauniversitaria.es',
    DP: 'Núria Vidal',
    COM: 'Marc Esteve',
    TIPOLOGIA: 'Cadena premium',
    SEGMENTACION: 'A',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_bcn_002'
  }, {
    CODIGO: 'CPV-07711',
    GRUPO: 'Independiente',
    DIRECCION: 'C/ Gran de Gràcia 122',
    LOCALIDAD: 'Barcelona',
    PROVINCIA: 'Barcelona',
    TEL: '932174455',
    EMAIL: null,
    DP: 'Núria Vidal',
    COM: 'Joan Bosch',
    TIPOLOGIA: 'Optometría barrio',
    SEGMENTACION: 'B',
    LOCATION_ACC: 'Approx',
    place_id_fk: 'ChIJ_bcn_003'
  }, {
    CODIGO: 'CPV-05544',
    GRUPO: 'Independiente',
    DIRECCION: 'Rambla de Catalunya 88',
    LOCALIDAD: 'Barcelona',
    PROVINCIA: 'Barcelona',
    TEL: '934879911',
    EMAIL: 'marta@opticabofill.cat',
    DP: 'Núria Vidal',
    COM: 'Marc Esteve',
    TIPOLOGIA: 'Boutique',
    SEGMENTACION: 'A',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_bcn_005'
  }, {
    CODIGO: 'CPV-04488',
    GRUPO: 'Independiente',
    DIRECCION: 'C/ Colón 12',
    LOCALIDAD: 'Valencia',
    PROVINCIA: 'Valencia',
    TEL: '963512233',
    EMAIL: 'vicente@opticavalenciana.es',
    DP: 'Vicente Beltrán',
    COM: 'Lucía Ferrer',
    TIPOLOGIA: 'Optometría',
    SEGMENTACION: 'A',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_val_001'
  }, {
    CODIGO: 'CPV-06677',
    GRUPO: 'Independiente',
    DIRECCION: 'C/ Cuba 24',
    LOCALIDAD: 'Valencia',
    PROVINCIA: 'Valencia',
    TEL: '963334455',
    EMAIL: null,
    DP: 'Vicente Beltrán',
    COM: 'Lucía Ferrer',
    TIPOLOGIA: 'Boutique',
    SEGMENTACION: 'B',
    LOCATION_ACC: 'Approx',
    place_id_fk: 'ChIJ_val_003'
  }, {
    CODIGO: 'CPV-03366',
    GRUPO: 'Independiente',
    DIRECCION: 'C/ Feria 67',
    LOCALIDAD: 'Sevilla',
    PROVINCIA: 'Sevilla',
    TEL: '954375566',
    EMAIL: 'manuel@opticamacarena.es',
    DP: 'Manuel Quintana',
    COM: 'Ana Ramírez',
    TIPOLOGIA: 'Optometría',
    SEGMENTACION: 'B',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_sev_001'
  }, {
    CODIGO: 'CPV-04477',
    GRUPO: 'Independiente',
    DIRECCION: 'C/ Pagés del Corro 145',
    LOCALIDAD: 'Sevilla',
    PROVINCIA: 'Sevilla',
    TEL: '954339988',
    EMAIL: 'rocio@opticatriana.com',
    DP: 'Manuel Quintana',
    COM: 'Ana Ramírez',
    TIPOLOGIA: 'Optometría premium',
    SEGMENTACION: 'A',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_sev_003'
  }, {
    CODIGO: 'CPV-02288',
    GRUPO: 'Independiente',
    DIRECCION: 'C/ Iparragirre 23',
    LOCALIDAD: 'Bilbao',
    PROVINCIA: 'Bizkaia',
    TEL: '944213344',
    EMAIL: 'inaki@opticaindautxu.com',
    DP: 'Iñaki Larrazabal',
    COM: 'Maite Etxeberria',
    TIPOLOGIA: 'Optometría',
    SEGMENTACION: 'A',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_bio_001'
  }, {
    CODIGO: 'CPV-01199',
    GRUPO: 'Independiente',
    DIRECCION: 'C/ Alfonso I 23',
    LOCALIDAD: 'Zaragoza',
    PROVINCIA: 'Zaragoza',
    TEL: '976224455',
    EMAIL: 'pilar@opticapilar.es',
    DP: 'Carlos Aragüés',
    COM: 'Eva Tena',
    TIPOLOGIA: 'Optometría premium',
    SEGMENTACION: 'A',
    LOCATION_ACC: 'Rooftop',
    place_id_fk: 'ChIJ_zgz_001'
  },
  // 3 sin vincular: para A3 Revisión
  // conflicto (76% similitud con madrid_010): nombre y dirección parecidos pero código distinto
  {
    CODIGO: 'CPV-99001',
    GRUPO: 'Cottet',
    DIRECCION: 'Calle Velazquez 35',
    LOCALIDAD: 'Madrid',
    PROVINCIA: 'Madrid',
    TEL: '914352244',
    EMAIL: null,
    DP: 'Juan García',
    COM: 'Sara Pérez',
    TIPOLOGIA: 'Cadena',
    SEGMENTACION: 'B',
    LOCATION_ACC: 'Approx',
    place_id_fk: null
  },
  // solo_cpv: sin candidato viable
  {
    CODIGO: 'CPV-99002',
    GRUPO: 'Independiente',
    DIRECCION: 'Calle Alcalde Andrés 12',
    LOCALIDAD: 'Alcorcón',
    PROVINCIA: 'Madrid',
    TEL: '916441122',
    EMAIL: 'opticaalcorcon@gmail.com',
    DP: 'Juan García',
    COM: 'Diego Romero',
    TIPOLOGIA: 'Optometría',
    SEGMENTACION: 'C',
    LOCATION_ACC: 'Approx',
    place_id_fk: null
  },
  // conflicto (68% similitud con bcn_007): nombre y zona compatibles
  {
    CODIGO: 'CPV-99003',
    GRUPO: 'Alain Afflelou',
    DIRECCION: 'Avda Diagonal 561',
    LOCALIDAD: 'Barcelona',
    PROVINCIA: 'Barcelona',
    TEL: '934195566',
    EMAIL: null,
    DP: 'Núria Vidal',
    COM: 'Marc Esteve',
    TIPOLOGIA: 'Cadena',
    SEGMENTACION: 'B',
    LOCATION_ACC: 'Approx',
    place_id_fk: null
  }];

  // CPV_ID: código real de la base de datos de CooperVision (Salesforce).
  // Valores extraídos del CSV "Bases - España y Portugal completas-12.05.2026 - ESP.csv".
  const _cpv_ids = ['430284805', '430500603', '430140502', '430350336', '430284844', '430120049', '430030956', '430150835', '430461781', '430070256', '430082492', '430360294', '430460978', '430030209', '430150405', '430283731', '430082197', '430150604'];
  opticas_cpv.forEach((c, i) => {
    c.CPV_ID = _cpv_ids[i] || _cpv_ids[i % _cpv_ids.length];
  });

  // ─────────────────────────────────────────────────────────────────
  // OPTICAS_APP_DATA
  // ─────────────────────────────────────────────────────────────────
  const opticas_app_data = opticas_google.map(g => {
    // resuelve cadena por matching de nombre+website contra cadenas.keywords+dominios
    let cadena_id = null;
    const nameL = g.name.toLowerCase();
    const webL = (g.website || '').toLowerCase();
    for (const c of cadenas) {
      if (c.keywords.some(k => nameL.includes(k.toLowerCase())) || c.dominios.some(d => webL.includes(d.toLowerCase()))) {
        cadena_id = c.id;
        break;
      }
    }
    return {
      place_id: g.place_id,
      show_campañas_core: true,
      show_campañas_miopia: ['ChIJ_madrid_001', 'ChIJ_madrid_004', 'ChIJ_madrid_009', 'ChIJ_bcn_005', 'ChIJ_val_001', 'ChIJ_sev_003', 'ChIJ_bio_001', 'ChIJ_zgz_001'].includes(g.place_id),
      cadena_resuelta_id: cadena_id,
      fecha_alta_en_app: '2025-08-15',
      notas_internas: null
    };
  });

  // Algunas notas internas para varias ópticas
  opticas_app_data.find(a => a.place_id === 'ChIJ_madrid_001').notas_internas = 'Cliente histórico. Pedido especial de lentes esclerales en Q2.';
  opticas_app_data.find(a => a.place_id === 'ChIJ_bcn_005').notas_internas = 'Solicitan formación MyDay en septiembre.';
  opticas_app_data.find(a => a.place_id === 'ChIJ_val_001').notas_internas = 'Punto piloto programa Control de Miopía.';

  // ─────────────────────────────────────────────────────────────────
  // OPTICAS_OVERRIDES (8 activos)
  // ─────────────────────────────────────────────────────────────────
  const opticas_overrides = [{
    id: 1,
    tabla_origen: 'opticas_google',
    registro_id: 'ChIJ_madrid_001',
    campo: 'phone',
    valor_nuevo: '+34 91 555 12 34',
    valor_anterior: '+34 91 555 1234',
    usuario_id: 1,
    fecha: '2026-05-15T10:32:00',
    motivo: 'Formato corregido manualmente'
  }, {
    id: 2,
    tabla_origen: 'opticas_cpv',
    registro_id: 'CPV-08234',
    campo: 'EMAIL',
    valor_nuevo: 'info@opticasancarlos.es',
    valor_anterior: 'opticasancarlos@gmail.com',
    usuario_id: 1,
    fecha: '2026-05-15T10:34:00',
    motivo: 'Email actualizado por el cliente'
  }, {
    id: 3,
    tabla_origen: 'opticas_google',
    registro_id: 'ChIJ_bcn_003',
    campo: 'website',
    valor_nuevo: 'https://opticagracia.cat',
    valor_anterior: null,
    usuario_id: 2,
    fecha: '2026-05-12T16:18:00',
    motivo: 'Tenían web pero Google no la detectó'
  }, {
    id: 4,
    tabla_origen: 'opticas_google',
    registro_id: 'ChIJ_val_003',
    campo: 'website',
    valor_nuevo: 'https://opticarussafa.com',
    valor_anterior: null,
    usuario_id: 1,
    fecha: '2026-05-08T09:55:00',
    motivo: 'Lanzaron web hace 2 meses'
  }, {
    id: 5,
    tabla_origen: 'opticas_cpv',
    registro_id: 'CPV-06432',
    campo: 'TEL',
    valor_nuevo: '915751122',
    valor_anterior: '91 575 11 22',
    usuario_id: 1,
    fecha: '2026-04-28T11:12:00',
    motivo: 'Estandarización formato'
  }, {
    id: 6,
    tabla_origen: 'opticas_google',
    registro_id: 'ChIJ_madrid_006',
    campo: 'address',
    valor_nuevo: 'C/ Atocha 89, 28012 Madrid',
    valor_anterior: 'C/ Atocha 89 28012 Madrid',
    usuario_id: 2,
    fecha: '2026-04-22T14:00:00',
    motivo: 'Corrección de formato'
  }, {
    id: 7,
    tabla_origen: 'opticas_google',
    registro_id: 'ChIJ_sev_001',
    campo: 'phone',
    valor_nuevo: '+34 954 37 55 66',
    valor_anterior: '+34 95 437 5566',
    usuario_id: 1,
    fecha: '2026-04-15T17:30:00',
    motivo: 'Formato corregido'
  }, {
    id: 8,
    tabla_origen: 'opticas_cpv',
    registro_id: 'CPV-08899',
    campo: 'COM',
    valor_nuevo: 'Marc Esteve',
    valor_anterior: 'Por asignar',
    usuario_id: 1,
    fecha: '2026-04-10T08:45:00',
    motivo: 'Comercial asignado tras reorganización'
  }];

  // ─────────────────────────────────────────────────────────────────
  // USUARIOS (14)
  // ─────────────────────────────────────────────────────────────────
  const usuarios = [{
    id: 1,
    nombre: 'Alex Sánchez-Brunete',
    email: 'alex@newno.marketing',
    rol: 'admin',
    activo: true,
    ultimo_acceso: '2026-06-08T13:55:00',
    creado: '2025-09-10'
  }, {
    id: 2,
    nombre: 'Carla Mandado',
    email: 'carla@newno.marketing',
    rol: 'admin',
    activo: true,
    ultimo_acceso: '2026-06-08T10:12:00',
    creado: '2025-09-10'
  }, {
    id: 3,
    nombre: 'Tomás García',
    email: 'tomas@newno.marketing',
    rol: 'admin',
    activo: true,
    ultimo_acceso: '2026-06-07T18:45:00',
    creado: '2025-09-10'
  }, {
    id: 4,
    nombre: 'Mónica Gómez',
    email: 'monica.gomez@coopervision.es',
    rol: 'admin',
    activo: true,
    ultimo_acceso: '2026-06-06T16:33:00',
    creado: '2025-09-15'
  }, {
    id: 5,
    nombre: 'Silvia Doménech',
    email: 'silvia.domenech@coopervision.es',
    rol: 'user',
    activo: true,
    ultimo_acceso: '2026-06-05T11:20:00',
    creado: '2025-10-01'
  }, {
    id: 6,
    nombre: 'Pablo Marín',
    email: 'pablo.marin@coopervision.es',
    rol: 'user',
    activo: true,
    ultimo_acceso: '2026-06-03T09:45:00',
    creado: '2025-10-01'
  }, {
    id: 7,
    nombre: 'Elena Torres',
    email: 'elena.torres@coopervision.es',
    rol: 'user',
    activo: true,
    ultimo_acceso: '2026-06-02T15:10:00',
    creado: '2025-10-15'
  }, {
    id: 8,
    nombre: 'Javier Ramos',
    email: 'javier.ramos@coopervision.es',
    rol: 'user',
    activo: true,
    ultimo_acceso: '2026-05-28T17:22:00',
    creado: '2025-11-03'
  }, {
    id: 9,
    nombre: 'Lucía Fernández',
    email: 'lucia.fernandez@coopervision.es',
    rol: 'user',
    activo: true,
    ultimo_acceso: '2026-05-30T10:00:00',
    creado: '2025-11-03'
  }, {
    id: 10,
    nombre: 'Sergio Vidal',
    email: 'sergio.vidal@coopervision.es',
    rol: 'user',
    activo: true,
    ultimo_acceso: '2026-05-25T14:48:00',
    creado: '2026-01-10'
  }, {
    id: 11,
    nombre: 'Patricia Lara',
    email: 'patricia.lara@coopervision.es',
    rol: 'user',
    activo: true,
    ultimo_acceso: '2026-06-01T08:55:00',
    creado: '2026-01-10'
  }, {
    id: 12,
    nombre: 'Ramón Castro',
    email: 'ramon.castro@coopervision.es',
    rol: 'user',
    activo: true,
    ultimo_acceso: '2026-05-20T16:30:00',
    creado: '2026-02-05'
  }, {
    id: 13,
    nombre: 'Beatriz Soto',
    email: 'beatriz.soto@coopervision.es',
    rol: 'user',
    activo: false,
    ultimo_acceso: '2026-03-15T12:00:00',
    creado: '2025-12-01'
  }, {
    id: 14,
    nombre: 'Arthur Davoudi',
    email: 'arthur@newno.marketing',
    rol: 'admin',
    activo: true,
    ultimo_acceso: '2026-06-07T19:10:00',
    creado: '2025-09-10'
  }];

  // ─────────────────────────────────────────────────────────────────
  // SYNCS_HISTORIAL
  // ─────────────────────────────────────────────────────────────────
  const syncs_historial = [{
    id: 12,
    fuente: 'outscraper',
    fecha_inicio: '2026-05-10T02:00:00',
    fecha_fin: '2026-05-10T14:32:00',
    resultado: 'ok',
    deltas: {
      nuevos: 127,
      conflictos: 23,
      no_encontrados: 7
    }
  }, {
    id: 11,
    fuente: 'salesforce',
    fecha_inicio: '2026-02-03T02:00:00',
    fecha_fin: '2026-02-03T09:00:00',
    resultado: 'ok',
    deltas: {
      nuevos: 5,
      conflictos: 2,
      no_encontrados: 0
    }
  }, {
    id: 10,
    fuente: 'outscraper',
    fecha_inicio: '2026-02-08T02:00:00',
    fecha_fin: '2026-02-08T13:20:00',
    resultado: 'ok',
    deltas: {
      nuevos: 89,
      conflictos: 18,
      no_encontrados: 4
    }
  }, {
    id: 9,
    fuente: 'salesforce',
    fecha_inicio: '2025-11-03T02:00:00',
    fecha_fin: '2025-11-03T08:45:00',
    resultado: 'ok',
    deltas: {
      nuevos: 3,
      conflictos: 1,
      no_encontrados: 0
    }
  }, {
    id: 8,
    fuente: 'outscraper',
    fecha_inicio: '2025-11-10T02:00:00',
    fecha_fin: '2025-11-10T15:10:00',
    resultado: 'fallo_parcial',
    deltas: {
      nuevos: 156,
      conflictos: 31,
      no_encontrados: 9
    }
  }, {
    id: 7,
    fuente: 'outscraper',
    fecha_inicio: '2025-08-10T02:00:00',
    fecha_fin: '2025-08-10T13:55:00',
    resultado: 'ok',
    deltas: {
      nuevos: 178,
      conflictos: 28,
      no_encontrados: 5
    }
  }, {
    id: 6,
    fuente: 'salesforce',
    fecha_inicio: '2025-08-03T02:00:00',
    fecha_fin: '2025-08-03T08:30:00',
    resultado: 'ok',
    deltas: {
      nuevos: 11,
      conflictos: 0,
      no_encontrados: 0
    }
  }];

  // Configuración actual de sync
  const syncs_config = {
    outscraper: {
      frecuencia: '3_meses',
      dia: 'lunes',
      hora: '02:00',
      proxima: '2026-08-10T02:00:00'
    },
    salesforce: {
      frecuencia: '6_meses',
      dia: 'lunes',
      hora: '02:00',
      proxima: '2026-08-03T02:00:00'
    }
  };

  // ─────────────────────────────────────────────────────────────────
  // CAMBIOS_HISTORICOS (eventos para V6 Changelog y V5 tab 3)
  // Combina overrides + eventos de sync + vínculos + app_data
  // ─────────────────────────────────────────────────────────────────
  const cambios_historicos = [...opticas_overrides.map(o => ({
    fecha: o.fecha,
    tipo: 'override_aplicado',
    tabla: o.tabla_origen,
    place_id: o.tabla_origen === 'opticas_google' ? o.registro_id : (opticas_cpv.find(c => c.CODIGO === o.registro_id) || {}).place_id_fk,
    registro_id: o.registro_id,
    campo: o.campo,
    valor_nuevo: o.valor_nuevo,
    valor_anterior: o.valor_anterior,
    usuario_id: o.usuario_id,
    motivo: o.motivo
  })), {
    fecha: '2026-05-10T14:32:00',
    tipo: 'sync_outscraper',
    tabla: 'opticas_google',
    place_id: null,
    registro_id: null,
    campo: null,
    valor_nuevo: null,
    valor_anterior: null,
    usuario_id: null,
    motivo: '+127 nuevos · 23 conflictos · 7 desaparecidos'
  }, {
    fecha: '2026-05-11T09:15:00',
    tipo: 'vinculo_creado',
    tabla: 'opticas_cpv',
    place_id: 'ChIJ_madrid_010',
    registro_id: 'CPV-11200',
    campo: 'place_id_fk',
    valor_nuevo: 'ChIJ_madrid_010',
    valor_anterior: null,
    usuario_id: 1,
    motivo: 'Match confirmado tras revisión'
  }, {
    fecha: '2026-05-11T09:18:00',
    tipo: 'vinculo_creado',
    tabla: 'opticas_cpv',
    place_id: 'ChIJ_bcn_006',
    registro_id: 'CPV-11201',
    campo: 'place_id_fk',
    valor_nuevo: 'ChIJ_bcn_006',
    valor_anterior: null,
    usuario_id: 1,
    motivo: 'Match confirmado tras revisión'
  }, {
    fecha: '2026-04-30T13:22:00',
    tipo: 'app_data_actualizado',
    tabla: 'opticas_app_data',
    place_id: 'ChIJ_madrid_001',
    registro_id: 'ChIJ_madrid_001',
    campo: 'notas_internas',
    valor_nuevo: 'Cliente histórico. Pedido especial...',
    valor_anterior: null,
    usuario_id: 1,
    motivo: 'Nota añadida'
  }, {
    fecha: '2026-04-20T11:00:00',
    tipo: 'app_data_actualizado',
    tabla: 'opticas_app_data',
    place_id: 'ChIJ_val_001',
    registro_id: 'ChIJ_val_001',
    campo: 'show_campañas_miopia',
    valor_nuevo: 'true',
    valor_anterior: 'false',
    usuario_id: 2,
    motivo: 'Punto piloto miopía'
  }, {
    fecha: '2026-02-03T09:00:00',
    tipo: 'sync_salesforce',
    tabla: 'opticas_cpv',
    place_id: null,
    registro_id: null,
    campo: null,
    valor_nuevo: null,
    valor_anterior: null,
    usuario_id: null,
    motivo: '+5 clientes · 2 conflictos'
  }];

  // ─────────────────────────────────────────────────────────────────
  // LOGS_ACTIVIDAD (acciones de usuario, no cambios sobre datos)
  // ─────────────────────────────────────────────────────────────────
  const logs_actividad = [{
    fecha: '2026-06-08T13:55:23',
    usuario_id: 1,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-06-08T13:56:48',
    usuario_id: 1,
    accion: 'descarga_csv',
    detalle: '1.847 ópticas · provincia=Madrid'
  }, {
    fecha: '2026-06-08T10:12:05',
    usuario_id: 2,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-06-08T10:15:33',
    usuario_id: 2,
    accion: 'override_creado',
    detalle: 'place_id=ChIJ_madrid_004 · campo=website'
  }, {
    fecha: '2026-06-07T18:45:11',
    usuario_id: 3,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-06-07T18:50:24',
    usuario_id: 3,
    accion: 'descarga_csv',
    detalle: '18.234 ópticas · sin filtros'
  }, {
    fecha: '2026-06-07T19:10:02',
    usuario_id: 14,
    accion: 'sync_lanzada',
    detalle: 'outscraper · manual'
  }, {
    fecha: '2026-06-06T16:33:55',
    usuario_id: 4,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-06-06T16:40:12',
    usuario_id: 4,
    accion: 'vinculo_creado',
    detalle: 'CODIGO=CPV-08234 ↔ place_id=ChIJ_madrid_001'
  }, {
    fecha: '2026-06-06T16:45:33',
    usuario_id: 4,
    accion: 'creación_usuario',
    detalle: 'sergio.vidal@coopervision.es · rol=user'
  }, {
    fecha: '2026-06-05T11:20:18',
    usuario_id: 5,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-06-05T11:25:42',
    usuario_id: 5,
    accion: 'descarga_csv',
    detalle: '412 ópticas · tipo=cliente · provincia=Madrid'
  }, {
    fecha: '2026-06-04T09:00:00',
    usuario_id: null,
    accion: 'sync_lanzada',
    detalle: 'outscraper · programada'
  }, {
    fecha: '2026-06-03T09:45:11',
    usuario_id: 6,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-06-02T15:10:55',
    usuario_id: 7,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-05-30T10:00:32',
    usuario_id: 9,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-05-28T17:22:08',
    usuario_id: 8,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-05-25T14:48:19',
    usuario_id: 10,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-05-22T11:33:00',
    usuario_id: 1,
    accion: 'configuración_modificada',
    detalle: 'frecuencia_outscraper: 2_meses → 3_meses'
  }, {
    fecha: '2026-05-20T16:30:42',
    usuario_id: 12,
    accion: 'login',
    detalle: null
  }, {
    fecha: '2026-05-18T14:00:18',
    usuario_id: 2,
    accion: 'cadena_creada',
    detalle: 'nombre=Mister Spex · pais=ES'
  }, {
    fecha: '2026-05-15T10:32:00',
    usuario_id: 1,
    accion: 'override_creado',
    detalle: 'place_id=ChIJ_madrid_001 · campo=phone'
  }, {
    fecha: '2026-05-15T10:34:00',
    usuario_id: 1,
    accion: 'override_creado',
    detalle: 'CODIGO=CPV-08234 · campo=EMAIL'
  }, {
    fecha: '2026-05-12T16:18:00',
    usuario_id: 2,
    accion: 'override_creado',
    detalle: 'place_id=ChIJ_bcn_003 · campo=website'
  }, {
    fecha: '2026-05-10T02:00:00',
    usuario_id: null,
    accion: 'sync_lanzada',
    detalle: 'outscraper · programada'
  }];

  // ─────────────────────────────────────────────────────────────────
  // CANDIDATOS DE MATCHING (para A3 Revisión)
  // ─────────────────────────────────────────────────────────────────
  // Cada candidato representa un posible vínculo place_id ↔ CODIGO con score de similitud
  const matching_candidatos = [
  // Conflicto 1: CPV-99001 (Cottet Madrid mal escrito) vs ChIJ_madrid_010 (Cottet Salamanca real)
  {
    cpv_codigo: 'CPV-99001',
    estado: 'conflicto',
    candidatos: [{
      place_id: 'ChIJ_madrid_010',
      score: 0.76,
      metricas: {
        nombre: 0.85,
        direccion: 0.78,
        codigo_postal: 1.0,
        telefono: 1.0,
        distancia_m: 0
      }
    }],
    detectado: '2026-05-10T14:32:00'
  },
  // Conflicto 2: CPV-99003 (Afflelou Diagonal con formato distinto) vs ChIJ_bcn_007 (Afflelou Diagonal real)
  {
    cpv_codigo: 'CPV-99003',
    estado: 'conflicto',
    candidatos: [{
      place_id: 'ChIJ_bcn_007',
      score: 0.68,
      metricas: {
        nombre: 0.72,
        direccion: 0.65,
        codigo_postal: 1.0,
        telefono: 1.0,
        distancia_m: 0
      }
    }],
    detectado: '2026-05-10T14:32:00'
  },
  // Solo_cpv: CPV-99002 (Alcorcón, no hay candidato viable)
  {
    cpv_codigo: 'CPV-99002',
    estado: 'solo_cpv',
    candidatos: [],
    detectado: '2026-05-10T14:32:00'
  }];

  // No encontrados: lista de place_id que estaban antes y desaparecieron en la última sync
  const no_encontrados = [{
    place_id: 'ChIJ_madrid_legacy_01',
    name: 'Óptica Diaz (desaparecida)',
    city: 'Madrid',
    state: 'Madrid',
    rating: 4.4,
    reviews: 67,
    desaparecido_desde: '2026-05-10'
  }, {
    place_id: 'ChIJ_bcn_legacy_01',
    name: 'Òptica Vall (desaparecida)',
    city: 'Barcelona',
    state: 'Barcelona',
    rating: 4.2,
    reviews: 89,
    desaparecido_desde: '2026-05-10'
  }];

  // ─────────────────────────────────────────────────────────────────
  // AGREGADOS PRECOMPUTADOS (para V1 Resumen y V2 BI)
  // ─────────────────────────────────────────────────────────────────
  const total_opticas = 18234; // simula prod, no length del array (40 mock)
  const total_clientes = 3142;
  const ultima_sync_outscraper = '2026-05-10T14:32:00';
  const dias_desde_ultima_sync = 12;
  const resumen_kpis = {
    total_opticas,
    total_clientes,
    pct_clientes: 17.2,
    nuevos_ult_sync: 84,
    valoracion_media: 4.32,
    valoracion_media_clientes: 4.41,
    valoracion_media_no_clientes: 4.18,
    reseñas_total: 1247650,
    pct_con_web: 72.4,
    pct_con_telefono: 94.1,
    pct_con_email: 38.5,
    pct_con_booking: 12.7,
    n_provincias: 52,
    n_ciudades: 1847
  };
  const top_provincias = [{
    provincia: 'Madrid',
    total: 2840,
    clientes: 412
  }, {
    provincia: 'Barcelona',
    total: 2611,
    clientes: 389
  }, {
    provincia: 'Valencia',
    total: 1187,
    clientes: 178
  }, {
    provincia: 'Sevilla',
    total: 945,
    clientes: 142
  }, {
    provincia: 'Málaga',
    total: 887,
    clientes: 134
  }, {
    provincia: 'Bizkaia',
    total: 612,
    clientes: 98
  }, {
    provincia: 'Alicante',
    total: 588,
    clientes: 81
  }, {
    provincia: 'Zaragoza',
    total: 521,
    clientes: 76
  }, {
    provincia: 'Murcia',
    total: 487,
    clientes: 71
  }, {
    provincia: 'A Coruña',
    total: 445,
    clientes: 65
  }];
  const dist_categorias = [{
    categoria: 'Optician',
    count: 14210
  }, {
    categoria: 'Eye care center',
    count: 2456
  }, {
    categoria: 'Contact lenses supplier',
    count: 1024
  }, {
    categoria: 'Designer eyewear',
    count: 312
  }, {
    categoria: 'Otros',
    count: 232
  }];
  const dist_valoraciones = [{
    rango: '<3.5',
    count: 1567
  }, {
    rango: '3.5-3.9',
    count: 3245
  }, {
    rango: '4.0-4.4',
    count: 6892
  }, {
    rango: '4.5-5.0',
    count: 6530
  }];
  const top_ciudades_engagement = [{
    ciudad: 'Madrid',
    reseñas_total: 287450,
    n_opticas: 2840,
    ratio: 101.2
  }, {
    ciudad: 'Barcelona',
    reseñas_total: 245680,
    n_opticas: 2611,
    ratio: 94.1
  }, {
    ciudad: 'Valencia',
    reseñas_total: 87340,
    n_opticas: 1187,
    ratio: 73.6
  }, {
    ciudad: 'Sevilla',
    reseñas_total: 68220,
    n_opticas: 945,
    ratio: 72.2
  }, {
    ciudad: 'Málaga',
    reseñas_total: 64890,
    n_opticas: 887,
    ratio: 73.2
  }, {
    ciudad: 'Bilbao',
    reseñas_total: 39450,
    n_opticas: 401,
    ratio: 98.4
  }, {
    ciudad: 'Zaragoza',
    reseñas_total: 34120,
    n_opticas: 412,
    ratio: 82.8
  }, {
    ciudad: 'Palma',
    reseñas_total: 28870,
    n_opticas: 287,
    ratio: 100.6
  }, {
    ciudad: 'Vigo',
    reseñas_total: 26340,
    n_opticas: 298,
    ratio: 88.4
  }, {
    ciudad: 'Murcia',
    reseñas_total: 25890,
    n_opticas: 487,
    ratio: 53.2
  }];
  const oportunidades_provincias = top_provincias.map(p => ({
    ...p,
    no_clientes: p.total - p.clientes,
    pct_partners: (p.clientes / p.total * 100).toFixed(1),
    oportunidad: p.total * (1 - p.clientes / p.total)
  })).sort((a, b) => b.oportunidad - a.oportunidad);

  // ─────────────────────────────────────────────────────────────────
  // SESIÓN (rol activo en runtime, controlado por toggle del prototipo)
  // ─────────────────────────────────────────────────────────────────
  const sesion = {
    usuario_actual_id: 1,
    // por defecto, Alex (admin)
    rol_activo: 'admin' // 'admin' | 'user' — controlado por toggle topbar
  };

  // ─────────────────────────────────────────────────────────────────
  // EXPORT
  // ─────────────────────────────────────────────────────────────────
  return {
    // Tablas
    cadenas,
    opticas_google,
    opticas_cpv,
    opticas_app_data,
    opticas_overrides,
    // Operativa
    usuarios,
    syncs_historial,
    syncs_config,
    cambios_historicos,
    logs_actividad,
    // Matching
    matching_candidatos,
    no_encontrados,
    // Agregados
    resumen_kpis,
    top_provincias,
    dist_categorias,
    dist_valoraciones,
    top_ciudades_engagement,
    oportunidades_provincias,
    ultima_sync_outscraper,
    dias_desde_ultima_sync,
    // Sesión
    sesion,
    // Helpers (para usar desde las vistas)
    helpers: {
      // is_client: emergente - true si existe opticas_cpv con FK a este place_id
      is_client: place_id => opticas_cpv.some(c => c.place_id_fk === place_id),
      // cpv_de: devuelve la fila opticas_cpv vinculada o null
      cpv_de: place_id => opticas_cpv.find(c => c.place_id_fk === place_id) || null,
      // app_data_de: devuelve la fila opticas_app_data
      app_data_de: place_id => opticas_app_data.find(a => a.place_id === place_id) || null,
      // cadena_de: devuelve el objeto cadena resuelto
      cadena_de: place_id => {
        const a = opticas_app_data.find(a => a.place_id === place_id);
        if (!a || !a.cadena_resuelta_id) return null;
        return cadenas.find(c => c.id === a.cadena_resuelta_id) || null;
      },
      // overrides_de: lista de overrides activos para place_id (resuelve también los de opticas_cpv del cliente vinculado)
      overrides_de: place_id => {
        const cpv = opticas_cpv.find(c => c.place_id_fk === place_id);
        return opticas_overrides.filter(o => o.tabla_origen === 'opticas_google' && o.registro_id === place_id || o.tabla_origen === 'opticas_cpv' && cpv && o.registro_id === cpv.CODIGO);
      },
      // aplica_overrides: devuelve fila opticas_google con overrides on top
      aplica_overrides_google: place_id => {
        const base = opticas_google.find(g => g.place_id === place_id);
        if (!base) return null;
        const result = {
          ...base
        };
        opticas_overrides.filter(o => o.tabla_origen === 'opticas_google' && o.registro_id === place_id).forEach(o => {
          result[o.campo] = o.valor_nuevo;
        });
        return result;
      },
      // formato de números: 1.234, 1,5, 1.2K/1.2M
      fmt_int: n => n.toLocaleString('es-ES'),
      fmt_dec: n => n.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      fmt_compact: n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : String(n),
      fmt_pct: n => n.toFixed(1) + '%',
      fmt_fecha: iso => {
        const d = new Date(iso);
        return d.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      },
      fmt_fecha_hora: iso => {
        const d = new Date(iso);
        return d.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit'
        }) + ' ' + d.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    }
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/data.js", error: String((e && e.message) || e) }); }

// coopervision/views/admin-cadenas.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-cadenas.js — A4
   Lista maestra de cadenas. Filtro ES/PT · modal nueva/editar · ⋯.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function trunc(arr, n) {
    if (!arr || arr.length === 0) return '<span class="c-muted-2">—</span>';
    var str = arr.slice(0, n).join(', ');
    return enc(str) + (arr.length > n ? ' <span class="c-muted" style="font-size:11px">+' + (arr.length - n) + '</span>' : '');
  }

  /* ── module state ─────────────────────────────────────────── */
  var _filtro = 'todas'; // 'todas' | 'ES' | 'PT'
  var _menuEl = null,
    _menuCadId = null,
    _outsideH = null;
  function teardown() {
    if (_menuEl) {
      try {
        _menuEl.remove();
      } catch (e) {}
      _menuEl = null;
    }
    if (_outsideH) {
      document.removeEventListener('click', _outsideH);
      _outsideH = null;
    }
    _menuCadId = null;
  }

  /* ── row menu ─────────────────────────────────────────────── */
  function ensureMenu() {
    if (_menuEl) return _menuEl;
    _menuEl = document.createElement('div');
    _menuEl.className = 'cpv-row-menu';
    document.body.appendChild(_menuEl);
    return _menuEl;
  }
  function closeMenu() {
    if (_menuEl) _menuEl.classList.remove('open');
    _menuCadId = null;
  }

  /* ── count opticas for cadena ─────────────────────────────── */
  function countOpticas(md, cadenaId) {
    return (md.opticas_app_data || []).filter(function (a) {
      return a.cadena_resuelta_id === cadenaId;
    }).length;
  }

  /* ── table body ───────────────────────────────────────────── */
  function tbodyHTML(md, filtro) {
    var cadenas = (md.cadenas || []).filter(function (c) {
      if (filtro === 'ES') return c.pais === 'ES';
      if (filtro === 'PT') return c.pais === 'PT';
      return true;
    });
    if (cadenas.length === 0) {
      return '<tr><td colspan="5">' + '<div class="empty-state" style="min-height:180px">' + '<iconify-icon class="empty-state-icon" icon="iconoir:network-left" width="28"></iconify-icon>' + '<h2 class="state-title" style="font-size:16px">Sin cadenas para este filtro</h2>' + '</div></td></tr>';
    }
    return cadenas.map(function (c) {
      var paisPill = c.pais === 'ES' ? '<span class="pill pill-accent pill-sm">ES</span>' : '<span class="pill pill-neutral pill-sm">PT</span>';
      return '<tr data-cad-id="' + c.id + '">' + '<td style="font-weight:600">' + enc(c.nombre) + '</td>' + '<td class="body-xs c-ink2">' + trunc(c.keywords, 3) + '</td>' + '<td class="body-xs c-ink2">' + trunc(c.dominios, 2) + '</td>' + '<td>' + paisPill + '</td>' + '<td class="cpv-bbdd-menu-col">' + '<button class="cpv-bbdd-menu-btn" data-menu-cad="' + c.id + '" aria-label="Acciones">' + '<iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button>' + '</td>' + '</tr>';
    }).join('');
  }

  /* ── open row menu ────────────────────────────────────────── */
  function openMenu(btn, cadId, md, ctx) {
    var m = ensureMenu();
    if (_menuCadId === cadId && m.classList.contains('open')) {
      closeMenu();
      return;
    }
    _menuCadId = cadId;
    m.innerHTML = '<button class="dropdown-item" data-ca="edit"><iconify-icon icon="iconoir:edit-pencil" width="16"></iconify-icon>Editar</button>' + '<button class="dropdown-item" data-ca="reapply"><iconify-icon icon="iconoir:refresh-double" width="16"></iconify-icon>Re-aplicar detección</button>' + '<div class="dropdown-divider"></div>' + '<button class="dropdown-item danger" data-ca="del"><iconify-icon icon="iconoir:trash" width="16"></iconify-icon>Eliminar</button>';
    var r = btn.getBoundingClientRect();
    m.classList.add('open');
    var mw = m.offsetWidth || 198,
      mh = m.offsetHeight || 112;
    var top = r.bottom + 4;
    if (top + mh > window.innerHeight - 8) top = r.top - mh - 4;
    var lft = r.right - mw;
    if (lft < 8) lft = 8;
    m.style.left = lft + 'px';
    m.style.top = top + 'px';
    m.onclick = function (e) {
      var it = e.target.closest('[data-ca]');
      if (!it) return;
      closeMenu();
      handleAction(it.getAttribute('data-ca'), cadId, md, ctx);
    };
  }
  function handleAction(act, cadId, md, ctx) {
    var root = document.querySelector('#view-root');
    var c = (md.cadenas || []).find(function (x) {
      return x.id === cadId;
    });
    if (act === 'edit' && root && c) {
      var en = root.querySelector('#edit-cad-nombre');
      if (en) en.value = c.nombre;
      var ek = root.querySelector('#edit-cad-kw');
      if (ek) ek.value = (c.keywords || []).join(', ');
      var ed = root.querySelector('#edit-cad-dom');
      if (ed) ed.value = (c.dominios || []).join(', ');
      root.querySelectorAll('input[name="edit-cad-pais"]').forEach(function (r) {
        r.checked = r.value === c.pais;
      });
      var modal = root.querySelector('#cad-modal-edit');
      if (modal) {
        modal.dataset.editId = cadId;
        modal.style.display = 'flex';
      }
    } else if (act === 'reapply') {
      ctx.toast('info', 'Recalculando detección', 'Procesando ' + grp(18234) + ' ópticas…');
      setTimeout(function () {
        ctx.toast('success', 'Detección completada', 'Cadena actualizada en las ópticas de la BBDD.');
      }, 2500);
    } else if (act === 'del' && root) {
      var n = countOpticas(md, cadId);
      var db = root.querySelector('#cad-del-body');
      if (db) db.innerHTML = '¿Eliminar la cadena <b>' + enc(c ? c.nombre : '') + '</b>?<br>' + (n > 0 ? '<span class="body-sm c-muted" style="display:block;margin-top:6px">Hay <b>' + n + ' óptica' + (n === 1 ? '' : 's') + '</b> asociada' + (n === 1 ? '' : 's') + '. Quedarán como independientes.</span>' : '<span class="body-sm c-muted" style="display:block;margin-top:6px">No hay ópticas asociadas.</span>');
      var delModal = root.querySelector('#cad-modal-del');
      if (delModal) {
        delModal.dataset.delId = cadId;
        delModal.style.display = 'flex';
      }
    }
  }
  function grp(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  /* ── modals HTML ──────────────────────────────────────────── */
  function modalsHTML() {
    return /* ── Nueva cadena ── */'<div class="modal-overlay" id="cad-modal-new" style="display:none">' + '<div class="modal"><div class="modal-header">' + '<h2 class="modal-title">Nueva cadena</h2>' + '<button class="btn-icon btn-lg" data-modal-close="cad-modal-new">' + '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="form-group"><label class="form-label">Nombre</label>' + '<input class="input" id="new-cad-nombre" type="text" placeholder="Ej: Visionlab" autocomplete="off"></div>' + '<div class="form-group"><label class="form-label">Keywords <span class="form-hint" style="font-weight:400">(una por línea o separadas por comas)</span></label>' + '<textarea class="textarea" id="new-cad-kw" rows="3" placeholder="visionlab&#10;vision lab"></textarea></div>' + '<div class="form-group"><label class="form-label">Dominios</label>' + '<textarea class="textarea" id="new-cad-dom" rows="2" placeholder="visionlab.es"></textarea></div>' + '<div class="form-group"><label class="form-label">País</label>' + '<div style="display:flex;gap:var(--space-6);margin-top:4px">' + '<label class="radio-wrap"><input class="radio" type="radio" name="new-cad-pais" value="ES" checked>' + '<span class="toggle-text">España (ES)</span></label>' + '<label class="radio-wrap"><input class="radio" type="radio" name="new-cad-pais" value="PT">' + '<span class="toggle-text">Portugal (PT)</span></label>' + '</div></div>' + '</div>' + '<div class="modal-footer">' + '<button class="btn btn-ghost btn-sm" data-modal-close="cad-modal-new">Cancelar</button>' + '<button class="btn btn-primary btn-sm" id="new-cad-confirm">' + '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Crear cadena</button>' + '</div></div></div>' + /* ── Editar cadena ── */
    '<div class="modal-overlay" id="cad-modal-edit" style="display:none">' + '<div class="modal"><div class="modal-header">' + '<h2 class="modal-title">Editar cadena</h2>' + '<button class="btn-icon btn-lg" data-modal-close="cad-modal-edit">' + '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="form-group"><label class="form-label">Nombre</label>' + '<input class="input" id="edit-cad-nombre" type="text"></div>' + '<div class="form-group"><label class="form-label">Keywords</label>' + '<textarea class="textarea" id="edit-cad-kw" rows="3"></textarea></div>' + '<div class="form-group"><label class="form-label">Dominios</label>' + '<textarea class="textarea" id="edit-cad-dom" rows="2"></textarea></div>' + '<div class="form-group"><label class="form-label">País</label>' + '<div style="display:flex;gap:var(--space-6);margin-top:4px">' + '<label class="radio-wrap"><input class="radio" type="radio" name="edit-cad-pais" value="ES">' + '<span class="toggle-text">España (ES)</span></label>' + '<label class="radio-wrap"><input class="radio" type="radio" name="edit-cad-pais" value="PT">' + '<span class="toggle-text">Portugal (PT)</span></label>' + '</div></div>' + '</div>' + '<div class="modal-footer">' + '<button class="btn btn-ghost btn-sm" data-modal-close="cad-modal-edit">Cancelar</button>' + '<button class="btn btn-primary btn-sm" id="edit-cad-confirm">' + '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar cambios</button>' + '</div></div></div>' + /* ── Eliminar cadena ── */
    '<div class="modal-overlay" id="cad-modal-del" style="display:none">' + '<div class="modal"><div class="modal-header">' + '<h2 class="modal-title">Eliminar cadena</h2>' + '<button class="btn-icon btn-lg" data-modal-close="cad-modal-del">' + '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<div class="modal-body" id="cad-del-body" style="margin:0">¿Eliminar esta cadena?</div>' + '<div class="modal-footer">' + '<button class="btn btn-ghost btn-sm" data-modal-close="cad-modal-del">Cancelar</button>' + '<button class="btn btn-subtle btn-sm" id="del-cad-indie" style="margin-right:auto">' + 'Convertir en independientes</button>' + '<button class="btn btn-destructive btn-sm" id="del-cad-confirm">' + '<iconify-icon icon="iconoir:trash" width="14"></iconify-icon>Eliminar</button>' + '</div></div></div>';
  }

  /* ── page header ──────────────────────────────────────────── */
  function pageHeader(total) {
    return '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Lista maestra de cadenas</h1>' + '<p class="page-subtitle">' + total + ' cadenas</p>' + '</div><div class="page-header-right">' + '<button class="btn btn-primary btn-sm" id="cad-new-btn">' + '<iconify-icon icon="iconoir:plus" width="14"></iconify-icon>Nueva cadena</button>' + '</div></div>';
  }

  /* ── filter tabs ──────────────────────────────────────────── */
  function filterTabsHTML(md, filtro) {
    var total = (md.cadenas || []).length;
    var es = (md.cadenas || []).filter(function (c) {
      return c.pais === 'ES';
    }).length;
    var pt = (md.cadenas || []).filter(function (c) {
      return c.pais === 'PT';
    }).length;
    function tab(key, label, count) {
      return '<button class="cpv-filter-tab' + (filtro === key ? ' active' : '') + '" data-filter="' + key + '">' + enc(label) + ' <span class="cpv-filter-tab-count">' + count + '</span></button>';
    }
    return '<div class="cpv-filter-tabs" style="display:flex;gap:2px;margin-bottom:var(--space-5)">' + tab('todas', 'Todas', total) + tab('ES', 'España', es) + tab('PT', 'Portugal', pt) + '</div>';
  }

  /* ════ RENDER DEFAULT ═══════════════════════════════════════ */
  function renderDefault(ctx) {
    var md = ctx.md;
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('cadenas', md) : '';
    var total = (md.cadenas || []).length;
    return pageHeader(total) + nav + filterTabsHTML(md, _filtro) + '<div class="table-wrap" id="cad-table-wrap">' + '<table class="table-dense">' + '<thead><tr>' + '<th style="width:200px">Nombre</th>' + '<th>Keywords</th>' + '<th>Dominios</th>' + '<th style="width:70px">País</th>' + '<th class="cpv-bbdd-menu-col"></th>' + '</tr></thead>' + '<tbody id="cad-tbody">' + tbodyHTML(md, _filtro) + '</tbody>' + '</table>' + '</div>' + modalsHTML();
  }

  /* ════ RENDER LOADING ═══════════════════════════════════════ */
  function renderLoading(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('cadenas', ctx.md) : '';
    var rows = Array(10).fill(0).map(function () {
      return '<tr class="cpv-bbdd-skrow">' + '<td><span class="skeleton" style="width:55%"></span></td>' + '<td><span class="skeleton" style="width:70%"></span></td>' + '<td><span class="skeleton" style="width:60%"></span></td>' + '<td><span class="skeleton" style="width:30px"></span></td>' + '<td></td></tr>';
    }).join('');
    return '<div class="page-header"><div class="page-header-left">' + '<span class="skeleton sk-text-sm" style="width:100px;display:block;margin-bottom:8px"></span>' + '<span class="skeleton" style="width:220px;height:30px;display:block"></span>' + '</div></div>' + nav + '<div class="table-wrap"><table class="table-dense">' + '<thead><tr><th>Nombre</th><th>Keywords</th><th>Dominios</th><th>País</th><th></th></tr></thead>' + '<tbody>' + rows + '</tbody></table></div>';
  }

  /* ════ RENDER EMPTY / ERROR ═════════════════════════════════ */
  function renderEmpty(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('cadenas', ctx.md) : '';
    return pageHeader(0) + nav + '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:network-left" width="32"></iconify-icon>' + '<h2 class="state-title">Sin cadenas registradas</h2>' + '<button class="btn btn-primary btn-sm" id="cad-new-btn">' + '<iconify-icon icon="iconoir:plus" width="14"></iconify-icon>Nueva cadena</button>' + '</div></div>' + modalsHTML();
  }
  function renderError(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('cadenas', ctx.md) : '';
    return pageHeader(0) + nav + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">Error al cargar cadenas</h2>' + '<button class="btn btn-primary btn-sm" data-action="retry">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ── attach menu buttons ──────────────────────────────────── */
  function attachMenuBtns(root, md, ctx) {
    root.querySelectorAll('[data-menu-cad]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openMenu(btn, parseInt(btn.getAttribute('data-menu-cad'), 10), md, ctx);
      });
    });
  }

  /* ════ MOUNTED ══════════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    teardown();
    if (state !== 'default' && state !== 'empty') return;
    var md = ctx.md;
    attachMenuBtns(root, md, ctx);

    /* Filter tabs */
    root.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        _filtro = btn.getAttribute('data-filter');
        /* update active tab */
        root.querySelectorAll('[data-filter]').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-filter') === _filtro);
        });
        /* replace tbody */
        var tbody = root.querySelector('#cad-tbody');
        if (tbody) {
          tbody.innerHTML = tbodyHTML(md, _filtro);
          attachMenuBtns(root, md, ctx);
        }
      });
    });

    /* Modal close */
    root.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var m = root.querySelector('#' + btn.getAttribute('data-modal-close'));
        if (m) m.style.display = 'none';
      });
    });
    root.querySelectorAll('.modal-overlay').forEach(function (ov) {
      ov.addEventListener('click', function (e) {
        if (e.target === ov) ov.style.display = 'none';
      });
    });

    /* Nueva cadena — abrir */
    var newBtn = root.querySelector('#cad-new-btn');
    if (newBtn) newBtn.addEventListener('click', function () {
      var m = root.querySelector('#cad-modal-new');
      if (m) {
        m.style.display = 'flex';
        ['#new-cad-nombre', '#new-cad-kw', '#new-cad-dom'].forEach(function (s) {
          var el = m.querySelector(s);
          if (el) el.value = '';
        });
        var rb = m.querySelector('input[name="new-cad-pais"][value="ES"]');
        if (rb) rb.checked = true;
      }
    });

    /* Nueva cadena — confirmar */
    var newConfirm = root.querySelector('#new-cad-confirm');
    if (newConfirm) newConfirm.addEventListener('click', function () {
      var nombre = (root.querySelector('#new-cad-nombre') || {}).value || '';
      if (!nombre.trim()) {
        ctx.toast('error', 'Nombre requerido', 'Escribe un nombre para la cadena.');
        return;
      }
      root.querySelector('#cad-modal-new').style.display = 'none';
      ctx.toast('success', 'Cadena creada', '"' + nombre.trim() + '" añadida a la lista maestra.');
    });

    /* Editar — confirmar */
    var editConfirm = root.querySelector('#edit-cad-confirm');
    if (editConfirm) editConfirm.addEventListener('click', function () {
      root.querySelector('#cad-modal-edit').style.display = 'none';
      ctx.toast('success', 'Cambios guardados', 'Cadena actualizada correctamente.');
    });

    /* Eliminar — convertir */
    var delIndie = root.querySelector('#del-cad-indie');
    if (delIndie) delIndie.addEventListener('click', function () {
      root.querySelector('#cad-modal-del').style.display = 'none';
      ctx.toast('success', 'Ópticas actualizadas', 'Las ópticas asociadas quedan como independientes.');
    });

    /* Eliminar — confirmar */
    var delConfirm = root.querySelector('#del-cad-confirm');
    if (delConfirm) delConfirm.addEventListener('click', function () {
      root.querySelector('#cad-modal-del').style.display = 'none';
      ctx.toast('success', 'Cadena eliminada', 'La cadena ha sido eliminada del sistema.');
    });

    /* Cierre de menú */
    _outsideH = function (e) {
      if (!e.target.closest('.cpv-row-menu') && !e.target.closest('[data-menu-cad]')) closeMenu();
    };
    document.addEventListener('click', _outsideH);
  }

  /* ── register ─────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/admin/cadenas'] = {
    render: function (state, ctx) {
      _filtro = 'todas'; // reset on navigate
      if (state === 'loading') return renderLoading(ctx);
      if (state === 'empty') return renderEmpty(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/admin-cadenas.js", error: String((e && e.message) || e) }); }

// coopervision/views/admin-logs.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-logs.js — A5
   Auditoría de acciones de usuario. Tabla ultra-densa (32px).
   Filtros: Usuario · Tipo de acción · Rango fechas.
   Paginación 50/página · Exportar CSV.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function pad(n) {
    return String(n).padStart(2, '0');
  }
  function fmtFHS(iso) {
    // DD/MM HH:mm:ss
    var d = new Date(iso);
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }
  function grp(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function uniq(arr) {
    return Array.from(new Set(arr.filter(Boolean)));
  }
  var PAGE_SIZE = 50;

  /* ── action metadata ──────────────────────────────────────── */
  var ACTION_META = {
    login: {
      label: 'Login',
      pillCls: 'pill-neutral'
    },
    logout: {
      label: 'Logout',
      pillCls: 'pill-neutral'
    },
    descarga_csv: {
      label: 'Descarga CSV',
      pillCls: 'pill-accent'
    },
    override_creado: {
      label: 'Override creado',
      pillCls: 'pill-warn'
    },
    override_revertido: {
      label: 'Override revertido',
      pillCls: 'pill-warn'
    },
    vinculo_creado: {
      label: 'Vínculo creado',
      pillCls: 'pill-pos'
    },
    app_data_actualizado: {
      label: 'App data',
      pillCls: 'pill-neutral'
    },
    creación_usuario: {
      label: 'Nuevo usuario',
      pillCls: 'pill-accent'
    },
    edición_usuario: {
      label: 'Edición usuario',
      pillCls: 'pill-neutral'
    },
    reset_password: {
      label: 'Reset password',
      pillCls: 'pill-warn'
    },
    sync_lanzada: {
      label: 'Sync lanzada',
      pillCls: 'pill-pos'
    },
    cadena_creada: {
      label: 'Cadena creada',
      pillCls: 'pill-accent'
    },
    configuración_modificada: {
      label: 'Config. modificada',
      pillCls: 'pill-warn'
    }
  };

  /* ── module state ─────────────────────────────────────────── */
  var _page = 1;
  var _filters = initFilters();
  function initFilters() {
    return {
      usuario: '',
      accion: '',
      rango: 'all',
      desde: '',
      hasta: ''
    };
  }

  /* ── build rows from md ───────────────────────────────────── */
  function buildRows(md) {
    return (md.logs_actividad || []).map(function (l, i) {
      var u = l.usuario_id ? (md.usuarios || []).find(function (x) {
        return x.id === l.usuario_id;
      }) : null;
      return {
        _idx: i,
        fecha: l.fecha,
        uid: l.usuario_id,
        uname: u ? u.nombre : null,
        accion: l.accion,
        detalle: l.detalle
      };
    }).sort(function (a, b) {
      return b.fecha.localeCompare(a.fecha);
    });
  }

  /* ── filters ──────────────────────────────────────────────── */
  function applyFilters(rows, f) {
    var now = Date.now();
    return rows.filter(function (r) {
      if (f.usuario && String(r.uid) !== String(f.usuario)) return false;
      if (f.accion && r.accion !== f.accion) return false;
      if (f.rango !== 'all') {
        var t = new Date(r.fecha).getTime();
        if (f.rango === '24h' && t < now - 86400000) return false;
        if (f.rango === 'week' && t < now - 604800000) return false;
        if (f.rango === 'month' && t < now - 2592000000) return false;
        if (f.rango === 'custom') {
          if (f.desde && r.fecha.slice(0, 10) < f.desde) return false;
          if (f.hasta && r.fecha.slice(0, 10) > f.hasta) return false;
        }
      }
      return true;
    });
  }

  /* ── row HTML ─────────────────────────────────────────────── */
  function rowHTML(r) {
    var meta = ACTION_META[r.accion] || {
      label: r.accion,
      pillCls: 'pill-neutral'
    };
    var userCell = r.uname ? '<span style="display:inline-flex;align-items:center;gap:5px">' + '<span class="avatar" style="width:18px;height:18px;font-size:8px;flex-shrink:0">' + enc(r.uname.split(/\s+/).slice(0, 2).map(function (w) {
      return (w[0] || '').toUpperCase();
    }).join('')) + '</span>' + '<span>' + enc(r.uname.split(' ')[0]) + '</span>' + '</span>' : '<span class="body-xs" style="color:var(--muted-2);font-style:italic">Sistema</span>';
    return '<tr>' + '<td class="tnum" style="font-family:var(--font-mono);font-size:11px;color:var(--muted);white-space:nowrap">' + enc(fmtFHS(r.fecha)) + '</td>' + '<td>' + userCell + '</td>' + '<td><span class="pill ' + meta.pillCls + ' pill-sm">' + enc(meta.label) + '</span></td>' + '<td class="body-xs c-ink2">' + enc(r.detalle || '—') + '</td>' + '</tr>';
  }

  /* ── pagination HTML ──────────────────────────────────────── */
  function pagHTML(cur, total) {
    var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    var from = total === 0 ? 0 : (cur - 1) * PAGE_SIZE + 1;
    var to = Math.min(cur * PAGE_SIZE, total);
    /* page list */
    var pages = [1];
    var lo = Math.max(2, cur - 1),
      hi = Math.min(totalPages - 1, cur + 1);
    if (lo > 2) pages.push('…');
    for (var j = lo; j <= hi; j++) pages.push(j);
    if (hi < totalPages - 1) pages.push('…');
    if (totalPages > 1) pages.push(totalPages);
    var btns = pages.map(function (p) {
      return p === '…' ? '<span class="page-ellipsis">…</span>' : '<button class="page-btn' + (p === cur ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
    }).join('');
    return '<div class="pagination-info">Mostrando <b>' + grp(from) + '–' + grp(to) + '</b> de <b>' + grp(total) + '</b> entradas</div>' + '<div class="pagination">' + '<button class="page-btn" data-page="prev"' + (cur <= 1 ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon></button>' + btns + '<button class="page-btn" data-page="next"' + (cur >= totalPages ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-right" width="15"></iconify-icon></button>' + '</div>';
  }

  /* ── toolbar HTML ─────────────────────────────────────────── */
  function toolbarHTML(allRows, md) {
    /* unique users */
    var seenU = {};
    var userOpts = [];
    allRows.forEach(function (r) {
      if (r.uid && !seenU[r.uid]) {
        seenU[r.uid] = true;
        userOpts.push({
          v: r.uid,
          l: r.uname || 'Usuario ' + r.uid
        });
      }
    });
    userOpts.sort(function (a, b) {
      return a.l.localeCompare(b.l, 'es');
    });

    /* unique actions */
    var accionOpts = uniq(allRows.map(function (r) {
      return r.accion;
    })).sort().map(function (a) {
      return {
        v: a,
        l: (ACTION_META[a] || {
          label: a
        }).label
      };
    });
    function sel(id, opts, cur, placeholder) {
      return '<select class="select select-sm" id="' + id + '">' + '<option value="">' + enc(placeholder) + '</option>' + opts.map(function (o) {
        return '<option value="' + enc(o.v) + '"' + (String(o.v) === String(cur) ? ' selected' : '') + '>' + enc(o.l) + '</option>';
      }).join('') + '</select>';
    }
    var customVis = _filters.rango === 'custom' ? 'flex' : 'none';
    return '<div class="table-toolbar">' + '<div class="table-toolbar-left" style="flex-wrap:wrap;gap:var(--space-3)">' + '<div class="cpv-bbdd-quick-field">' + '<span class="cpv-bbdd-quick-label">Usuario</span>' + sel('logs-usr', userOpts, _filters.usuario, 'Todos') + '</div>' + '<div class="cpv-bbdd-quick-field">' + '<span class="cpv-bbdd-quick-label">Acción</span>' + sel('logs-accion', accionOpts, _filters.accion, 'Todas') + '</div>' + '<div class="cpv-bbdd-quick-field">' + '<span class="cpv-bbdd-quick-label">Fechas</span>' + '<div style="display:flex;flex-direction:column;gap:4px">' + '<select class="select select-sm" id="logs-rango">' + '<option value="all"' + (_filters.rango === 'all' ? ' selected' : '') + '>Todas</option>' + '<option value="24h"' + (_filters.rango === '24h' ? ' selected' : '') + '>Últimas 24h</option>' + '<option value="week"' + (_filters.rango === 'week' ? ' selected' : '') + '>Última semana</option>' + '<option value="month"' + (_filters.rango === 'month' ? ' selected' : '') + '>Último mes</option>' + '<option value="custom"' + (_filters.rango === 'custom' ? ' selected' : '') + '>Personalizado</option>' + '</select>' + '<div id="logs-custom-dates" style="display:' + customVis + ';gap:4px;align-items:center">' + '<input type="date" class="input input-sm" id="logs-desde" style="width:120px;font-size:12px" value="' + enc(_filters.desde) + '">' + '<span class="c-muted" style="font-size:11px">—</span>' + '<input type="date" class="input input-sm" id="logs-hasta" style="width:120px;font-size:12px" value="' + enc(_filters.hasta) + '">' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="table-toolbar-right">' + '<button class="btn btn-ghost btn-sm" id="logs-export">' + '<iconify-icon icon="iconoir:download" width="14"></iconify-icon>Exportar CSV</button>' + '</div>' + '</div>';
  }

  /* ── page header ──────────────────────────────────────────── */
  function pageHeader(count) {
    return '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Logs de actividad</h1>' + '<p class="page-subtitle">' + grp(count) + ' entradas registradas</p>' + '</div></div>';
  }

  /* ════ RENDER DEFAULT ═══════════════════════════════════════ */
  function renderDefault(ctx) {
    var md = ctx.md;
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('logs', md) : '';
    var allRows = buildRows(md);
    return pageHeader(allRows.length) + nav + '<div class="card cpv-bbdd-card">' + toolbarHTML(allRows, md) + '<div class="table-wrap cpv-bbdd-tablewrap" id="logs-tablewrap">' + '<table class="table-dense table-ultra">' + '<thead><tr>' + '<th style="width:130px">Fecha</th>' + '<th style="width:150px">Usuario</th>' + '<th style="width:160px">Acción</th>' + '<th>Detalle</th>' + '</tr></thead>' + '<tbody id="logs-tbody"></tbody>' + '</table>' + '</div>' + '<div class="pagination-wrap" id="logs-pag"></div>' + '</div>';
  }

  /* ════ RENDER LOADING ═══════════════════════════════════════ */
  function renderLoading(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('logs', ctx.md) : '';
    var rows = Array(15).fill(0).map(function () {
      return '<tr class="cpv-bbdd-skrow">' + '<td><span class="skeleton" style="width:90px"></span></td>' + '<td><span class="skeleton" style="width:70%"></span></td>' + '<td><span class="skeleton" style="width:80px"></span></td>' + '<td><span class="skeleton" style="width:60%"></span></td>' + '</tr>';
    }).join('');
    return '<div class="page-header"><div class="page-header-left">' + '<span class="skeleton sk-text-sm" style="width:100px;display:block;margin-bottom:8px"></span>' + '<span class="skeleton" style="width:200px;height:30px;display:block"></span>' + '</div></div>' + nav + '<div class="card cpv-bbdd-card">' + '<div class="cpv-bbdd-toolbar">' + '<span class="skeleton" style="width:140px;height:32px"></span>' + '<span class="skeleton" style="width:140px;height:32px"></span>' + '<span class="skeleton" style="width:140px;height:32px"></span>' + '</div>' + '<div class="table-wrap cpv-bbdd-tablewrap">' + '<table class="table-dense table-ultra"><thead><tr>' + '<th>Fecha</th><th>Usuario</th><th>Acción</th><th>Detalle</th>' + '</tr></thead><tbody>' + rows + '</tbody></table>' + '</div>' + '</div>';
  }

  /* ════ RENDER EMPTY / ERROR ═════════════════════════════════ */
  function renderEmpty(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('logs', ctx.md) : '';
    return pageHeader(0) + nav + '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:scroll" width="32"></iconify-icon>' + '<h2 class="state-title">Sin logs de actividad</h2>' + '<p class="state-body">Las acciones de los usuarios aparecerán aquí.</p>' + '</div></div>';
  }
  function renderError(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('logs', ctx.md) : '';
    return pageHeader(0) + nav + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">Error al cargar los logs</h2>' + '<button class="btn btn-primary btn-sm" data-action="retry">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ── export CSV ───────────────────────────────────────────── */
  function exportCSV(rows, ctx) {
    function esc(v) {
      var s = String(v == null ? '' : v);
      return /[",;\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }
    var lines = ['Fecha;Usuario;Acción;Detalle'];
    rows.forEach(function (r) {
      lines.push([r.fecha, r.uname || 'Sistema', r.accion, r.detalle].map(esc).join(';'));
    });
    var blob = new Blob(['\ufeff' + lines.join('\r\n')], {
      type: 'text/csv;charset=utf-8;'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'logs_actividad_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    ctx.toast('success', 'CSV exportado', grp(rows.length) + ' entradas exportadas.');
  }

  /* ════ MOUNTED ══════════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    if (state !== 'default') return;
    var md = ctx.md;
    var allRows = buildRows(md);
    var tbody = root.querySelector('#logs-tbody');
    var pagEl = root.querySelector('#logs-pag');
    var tablewrap = root.querySelector('#logs-tablewrap');
    function getProcessed() {
      return applyFilters(allRows, _filters);
    }
    function refresh(opts) {
      if (opts && opts.resetPage) _page = 1;
      var processed = getProcessed();
      var totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
      if (_page > totalPages) _page = totalPages;
      var slice = processed.slice((_page - 1) * PAGE_SIZE, _page * PAGE_SIZE);
      if (processed.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4"><div class="empty-state" style="min-height:200px">' + '<iconify-icon class="empty-state-icon" icon="iconoir:filter-list-xmark" width="28"></iconify-icon>' + '<h2 class="state-title" style="font-size:16px">Sin resultados</h2>' + '<p class="state-body">No hay logs para esos filtros.</p>' + '<button class="btn btn-ghost btn-sm" id="logs-clear-btn">Limpiar filtros</button>' + '</div></td></tr>';
        var cb = root.querySelector('#logs-clear-btn');
        if (cb) cb.addEventListener('click', resetAll);
      } else {
        tbody.innerHTML = slice.map(rowHTML).join('');
      }
      pagEl.innerHTML = pagHTML(_page, processed.length);
    }
    function resetAll() {
      _filters = initFilters();
      var uSel = root.querySelector('#logs-usr');
      if (uSel) uSel.value = '';
      var aSel = root.querySelector('#logs-accion');
      if (aSel) aSel.value = '';
      var rSel = root.querySelector('#logs-rango');
      if (rSel) rSel.value = 'all';
      var cd = root.querySelector('#logs-custom-dates');
      if (cd) cd.style.display = 'none';
      refresh({
        resetPage: true
      });
    }

    /* Dropdowns */
    var uSel = root.querySelector('#logs-usr');
    if (uSel) uSel.addEventListener('change', function () {
      _filters.usuario = uSel.value;
      refresh({
        resetPage: true
      });
    });
    var aSel = root.querySelector('#logs-accion');
    if (aSel) aSel.addEventListener('change', function () {
      _filters.accion = aSel.value;
      refresh({
        resetPage: true
      });
    });

    /* Rango fechas */
    var rSel = root.querySelector('#logs-rango');
    var cd = root.querySelector('#logs-custom-dates');
    if (rSel) rSel.addEventListener('change', function () {
      _filters.rango = rSel.value;
      if (cd) cd.style.display = _filters.rango === 'custom' ? 'flex' : 'none';
      refresh({
        resetPage: true
      });
    });
    var desdeIn = root.querySelector('#logs-desde');
    var hastaIn = root.querySelector('#logs-hasta');
    if (desdeIn) desdeIn.addEventListener('change', function () {
      _filters.desde = desdeIn.value;
      refresh({
        resetPage: true
      });
    });
    if (hastaIn) hastaIn.addEventListener('change', function () {
      _filters.hasta = hastaIn.value;
      refresh({
        resetPage: true
      });
    });

    /* Paginación */
    pagEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-page]');
      if (!b || b.disabled) return;
      var v = b.getAttribute('data-page');
      var totalPages = Math.max(1, Math.ceil(getProcessed().length / PAGE_SIZE));
      if (v === 'prev') _page = Math.max(1, _page - 1);else if (v === 'next') _page = Math.min(totalPages, _page + 1);else _page = parseInt(v, 10);
      refresh();
      if (tablewrap) tablewrap.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    /* Export CSV */
    var expBtn = root.querySelector('#logs-export');
    if (expBtn) expBtn.addEventListener('click', function () {
      exportCSV(getProcessed(), ctx);
    });
    refresh();
  }

  /* ── register ─────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/admin/logs'] = {
    render: function (state, ctx) {
      if (state === 'default') {
        _page = 1;
        _filters = initFilters();
      }
      if (state === 'loading') return renderLoading(ctx);
      if (state === 'empty') return renderEmpty(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/admin-logs.js", error: String((e && e.message) || e) }); }

// coopervision/views/admin-operaciones.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-operaciones.js — A2
   Centro de control de sincronizaciones.
   Cards Outscraper + Salesforce · config · historial · descarga.
   Variante "en curso": banner persistente + spinner en card.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function pad(n) {
    return String(n).padStart(2, '0');
  }
  function fmtFH(iso) {
    var d = new Date(iso);
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function fmtF(iso) {
    var d = new Date(iso);
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
  }
  function dur(iso1, iso2) {
    var ms = new Date(iso2) - new Date(iso1);
    var h = Math.floor(ms / 3600000),
      m = Math.floor(ms % 3600000 / 60000);
    return (h > 0 ? h + 'h ' : '') + m + 'min';
  }
  function grp(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function lastOf(md, fuente) {
    return (md.syncs_historial || []).filter(function (s) {
      return s.fuente === fuente;
    }).sort(function (a, b) {
      return b.id - a.id;
    })[0] || null;
  }

  /* ── module state ─────────────────────────────────────────── */
  var _pending = null; // fuente pendiente de confirmar
  var _inCurso = null; // fuente en ejecución
  var _syncTimer = null;

  /* ── sync card HTML ───────────────────────────────────────── */
  function syncCardHTML(md, fuente) {
    var last = lastOf(md, fuente);
    var cfg = (md.syncs_config || {})[fuente];
    var isOut = fuente === 'outscraper';
    var id = 'cpv-sync-' + fuente;
    var resPill = last ? last.resultado === 'ok' ? '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Completada</span>' : last.resultado === 'fallo_parcial' ? '<span class="pill pill-warn pill-sm"><span class="pill-dot"></span>Fallo parcial</span>' : '<span class="pill pill-neg pill-sm"><span class="pill-dot"></span>Error</span>' : '<span class="pill pill-neutral pill-sm">Sin datos</span>';
    var stats = last ? '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-5)">' + '<div class="data-pair"><span class="data-label">Última sync</span>' + '<span class="data-value tnum">' + enc(fmtFH(last.fecha_inicio)) + '</span></div>' + '<div class="data-pair"><span class="data-label">Duración</span>' + '<span class="data-value">' + enc(dur(last.fecha_inicio, last.fecha_fin)) + '</span></div>' + '<div class="data-pair" style="grid-column:span 2"><span class="data-label">Cambios</span>' + '<span class="data-value" style="display:flex;gap:10px;flex-wrap:wrap">' + '<span style="color:var(--pos-ink);font-weight:600">+' + last.deltas.nuevos + ' nuevos</span>' + (last.deltas.conflictos > 0 ? '<span style="color:var(--warn-ink);font-weight:600">⚠ ' + last.deltas.conflictos + ' conflictos</span>' : '') + (last.deltas.no_encontrados > 0 ? '<span class="c-muted">' + last.deltas.no_encontrados + ' no encontrados</span>' : '') + '</span></div>' + (cfg ? '<div class="data-pair"><span class="data-label">Próxima estimada</span>' + '<span class="data-value tnum">' + enc(fmtF(cfg.proxima)) + '</span></div>' : '') + '</div>' : '<p class="body-sm c-muted" style="margin-bottom:var(--space-5)">Sin sincronizaciones registradas.</p>';
    return '<div class="card" id="' + id + '" style="display:flex;flex-direction:column;gap:var(--space-3)">' + '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-3)">' + '<div>' + '<div style="font-family:var(--font-display);font-size:16px;font-weight:700;letter-spacing:-.01em;margin-bottom:3px">' + enc(isOut ? 'Outscraper / Google Maps' : 'Salesforce / CooperVision') + '</div>' + '<div style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted)">' + '<iconify-icon icon="iconoir:arrow-right" width="12"></iconify-icon>' + '<code style="font-family:var(--font-mono);font-size:11px;background:var(--line-2);padding:1px 6px;border-radius:var(--radius-sm)">' + enc(isOut ? 'opticas_google' : 'opticas_cpv') + '</code>' + '</div>' + '</div>' + '<span id="' + id + '-pill">' + resPill + '</span>' + '</div>' + '<div id="' + id + '-default" style="display:flex;flex-direction:column;gap:var(--space-4)">' + stats + '<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center" data-sync-now="' + fuente + '">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Sincronizar ahora</button>' + '</div>' + '<div id="' + id + '-curso" style="display:none;flex-direction:column;gap:var(--space-4)">' + '<div style="display:flex;align-items:center;gap:14px;padding:var(--space-2) 0">' + '<span class="cpv-spin-icon" style="color:var(--warn-ink);font-size:0;flex-shrink:0">' + '<iconify-icon icon="iconoir:refresh-double" width="28"></iconify-icon></span>' + '<div><div style="font-weight:600;font-size:14px">Sincronización en curso…</div>' + '<div class="body-xs c-muted">Puede tardar entre 30 min y varias horas.</div></div>' + '</div>' + '<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center" disabled>' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>En curso…</button>' + '</div>' + '</div>';
  }

  /* ── config form ──────────────────────────────────────────── */
  function configHTML(md) {
    var cfg = md.syncs_config || {};
    var oFreqs = [{
      v: '1_mes',
      l: 'Cada mes'
    }, {
      v: '2_meses',
      l: 'Cada 2 meses'
    }, {
      v: '3_meses',
      l: 'Cada 3 meses'
    }, {
      v: '6_meses',
      l: 'Cada 6 meses'
    }, {
      v: 'manual',
      l: 'Manual'
    }];
    var sfFreqs = [{
      v: '3_meses',
      l: 'Cada 3 meses'
    }, {
      v: '6_meses',
      l: 'Cada 6 meses'
    }, {
      v: '12_meses',
      l: 'Cada 12 meses'
    }, {
      v: 'manual',
      l: 'Manual'
    }];
    var dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    var horas = ['00:00', '01:00', '02:00', '03:00', '04:00', '22:00', '23:00'];
    function sel(id, opts, cur) {
      return '<select class="select select-sm" id="' + id + '">' + opts.map(function (o) {
        var v = o.v || o,
          l = o.l || o;
        return '<option value="' + enc(v) + '"' + (v === cur ? ' selected' : '') + '>' + enc(l) + '</option>';
      }).join('') + '</select>';
    }
    var oCur = cfg.outscraper ? cfg.outscraper.frecuencia : '3_meses';
    var sfCur = cfg.salesforce ? cfg.salesforce.frecuencia : '6_meses';
    var diaCur = cfg.outscraper ? cfg.outscraper.dia : 'lunes';
    var horaCur = cfg.outscraper ? cfg.outscraper.hora : '02:00';
    return '<div style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:var(--space-5)">' + '<div class="form-group" style="flex:0 0 auto"><label class="form-label">Frecuencia Outscraper</label>' + sel('cfg-out-freq', oFreqs, oCur) + '</div>' + '<div class="form-group" style="flex:0 0 auto"><label class="form-label">Frecuencia Salesforce</label>' + sel('cfg-sf-freq', sfFreqs, sfCur) + '</div>' + '<div class="form-group" style="flex:0 0 auto"><label class="form-label">Día de ejecución</label>' + sel('cfg-dia', dias, diaCur) + '</div>' + '<div class="form-group" style="flex:0 0 auto"><label class="form-label">Hora</label>' + sel('cfg-hora', horas, horaCur) + '</div>' + '<button class="btn btn-primary btn-sm" id="cfg-save" style="margin-bottom:2px">' + '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar configuración</button>' + '</div>';
  }

  /* ── history table ────────────────────────────────────────── */
  function historialHTML(md) {
    var rows = (md.syncs_historial || []).slice().sort(function (a, b) {
      return b.id - a.id;
    });
    var tbody = rows.map(function (s) {
      var resPill = s.resultado === 'ok' ? '<span class="pill pill-pos pill-sm">OK</span>' : s.resultado === 'fallo_parcial' ? '<span class="pill pill-warn pill-sm">Fallo parcial</span>' : '<span class="pill pill-neg pill-sm">Error</span>';
      var src = s.fuente === 'outscraper' ? '<span class="pill pill-accent pill-sm">Outscraper</span>' : '<span class="pill pill-neutral pill-sm">Salesforce</span>';
      var deltas = '+' + s.deltas.nuevos + ' · ' + s.deltas.conflictos + ' conf. · ' + s.deltas.no_encontrados + ' n/e';
      return '<tr>' + '<td class="tnum body-xs c-ink2">' + enc(fmtFH(s.fecha_inicio)) + '</td>' + '<td>' + src + '</td>' + '<td>' + resPill + '</td>' + '<td class="body-xs c-ink2">' + enc(deltas) + '</td>' + '<td><button class="btn-icon" style="color:var(--accent-ink-deep);font-size:12px;font-weight:600;height:auto;padding:0;background:none;border:none;cursor:pointer;white-space:nowrap" ' + 'data-hist-toggle="' + s.id + '">Ver →</button></td>' + '</tr>' + '<tr id="cpv-hist-' + s.id + '" style="display:none">' + '<td colspan="5" style="padding:4px 12px 12px">' + '<div style="background:var(--line-2);border-radius:var(--radius-md);padding:var(--space-4) var(--space-5);font-size:13px;color:var(--ink-2);line-height:1.8">' + '<b>' + enc(s.fuente === 'outscraper' ? 'Outscraper / Google Maps' : 'Salesforce / CooperVision') + '</b>' + ' · ' + enc(fmtF(s.fecha_inicio)) + ' · Duración: ' + enc(dur(s.fecha_inicio, s.fecha_fin)) + '<br>' + 'Nuevos: <b>' + s.deltas.nuevos + '</b> · Conflictos: <b>' + s.deltas.conflictos + '</b>' + ' · No encontrados: <b>' + s.deltas.no_encontrados + '</b>' + (s.deltas.conflictos > 0 ? '<br><a href="#/admin/revision" style="color:var(--accent-ink-deep);font-weight:600;font-size:12px">' + 'Revisar ' + s.deltas.conflictos + ' conflictos →</a>' : '') + '</div>' + '</td>' + '</tr>';
    }).join('');
    return '<div class="table-wrap">' + '<table class="table-dense"><thead><tr>' + '<th style="width:100px">Fecha</th><th style="width:110px">Fuente</th>' + '<th style="width:110px">Resultado</th><th>Cambios</th><th style="width:56px"></th>' + '</tr></thead><tbody>' + (tbody || '<tr><td colspan="5" style="padding:24px;color:var(--muted);text-align:center;font-size:13px">Sin historial</td></tr>') + '</tbody></table>' + '</div>';
  }

  /* ── download block ───────────────────────────────────────── */
  function downloadHTML(md) {
    var total = md.resumen_kpis ? md.resumen_kpis.total_opticas : 18234;
    return '<div class="card card-compact" style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-6)">' + '<div><div style="font-weight:600;font-size:14px">Exportar base de datos completa</div>' + '<div class="body-sm c-muted" style="margin-top:3px">' + grp(total) + ' ópticas · ~12 MB · UTF-8, separador coma</div>' + '</div>' + '<button class="btn btn-ghost btn-sm" id="cpv-ops-dl">' + '<iconify-icon icon="iconoir:download" width="14"></iconify-icon>Descargar CSV</button>' + '</div>';
  }

  /* ── confirm modal ────────────────────────────────────────── */
  function confirmModalHTML() {
    return '<div class="modal-overlay" id="cpv-sync-modal" style="display:none">' + '<div class="modal">' + '<div class="modal-header">' + '<h2 class="modal-title">¿Lanzar sincronización manual?</h2>' + '<button class="btn-icon btn-lg" id="cpv-sync-modal-x">' + '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button>' + '</div>' + '<p class="modal-body" id="cpv-sync-modal-body" style="margin:0"></p>' + '<div class="modal-footer">' + '<button class="btn btn-ghost btn-sm" id="cpv-sync-modal-cancel">Cancelar</button>' + '<button class="btn btn-primary btn-sm" id="cpv-sync-modal-confirm">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Iniciar sincronización</button>' + '</div>' + '</div>' + '</div>';
  }

  /* ── section label ────────────────────────────────────────── */
  function sHead(t) {
    return '<p class="eyebrow-t" style="margin-bottom:var(--space-4)">' + enc(t) + '</p>';
  }

  /* ── page header ──────────────────────────────────────────── */
  function pageHeader() {
    return '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Operaciones de datos</h1>' + '</div></div>';
  }

  /* ════ RENDER DEFAULT ═══════════════════════════════════════ */
  function renderDefault(ctx) {
    var md = ctx.md;
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('operaciones', md) : '';
    return pageHeader() + nav + /* Banner (oculto por defecto, aparece cuando sync en curso) */
    '<div id="cpv-ops-banner" role="alert" style="display:none;align-items:center;gap:var(--space-4);' + 'padding:10px var(--space-6);margin-bottom:var(--space-5);background:var(--warn-bg);' + 'color:var(--warn-ink);border:1px solid rgba(146,64,14,.18);border-radius:var(--radius-lg);font-size:13px;font-weight:500">' + '<span class="cpv-spin-icon" style="font-size:0"><iconify-icon icon="iconoir:refresh-double" width="16"></iconify-icon></span>' + '<span><b>Sincronización en curso.</b> Los datos pueden no estar actualizados hasta que finalice.</span>' + '</div>' + /* Cards estado */
    '<div style="margin-bottom:var(--space-7)">' + sHead('Estado de sincronización') + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5)">' + syncCardHTML(md, 'outscraper') + syncCardHTML(md, 'salesforce') + '</div>' + '</div>' + /* Config */
    '<div style="margin-bottom:var(--space-7)">' + '<div class="card card-compact">' + sHead('Configuración de frecuencia') + configHTML(md) + '</div>' + '</div>' + /* Historial */
    '<div style="margin-bottom:var(--space-7)">' + sHead('Historial de sincronizaciones') + historialHTML(md) + '</div>' + /* Descarga */
    '<div>' + sHead('Descarga BBDD') + downloadHTML(md) + '</div>' + confirmModalHTML();
  }

  /* ════ RENDER LOADING ═══════════════════════════════════════ */
  function renderLoading(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('operaciones', ctx.md) : '';
    return pageHeader() + nav + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5);margin-bottom:var(--space-7)">' + '<div class="card" style="min-height:180px"><span class="skeleton" style="display:block;height:100%;border-radius:var(--radius-lg)"></span></div>' + '<div class="card" style="min-height:180px"><span class="skeleton" style="display:block;height:100%;border-radius:var(--radius-lg)"></span></div>' + '</div>' + '<div class="card card-compact" style="min-height:72px"><span class="skeleton" style="display:block;height:100%;border-radius:var(--radius-md)"></span></div>';
  }

  /* ════ RENDER EMPTY / ERROR ═════════════════════════════════ */
  function renderEmpty(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('operaciones', ctx.md) : '';
    return pageHeader() + nav + '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:refresh-double" width="32"></iconify-icon>' + '<h2 class="state-title">Sin datos de operaciones</h2>' + '</div></div>';
  }
  function renderError(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('operaciones', ctx.md) : '';
    return pageHeader() + nav + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">Error al cargar operaciones</h2>' + '<button class="btn btn-primary btn-sm" data-action="retry">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ── start sync (DOM manipulation) ───────────────────────── */
  function startSync(fuente, root, ctx) {
    _inCurso = fuente;
    if (_syncTimer) clearTimeout(_syncTimer);
    var banner = root.querySelector('#cpv-ops-banner');
    var defEl = root.querySelector('#cpv-sync-' + fuente + '-default');
    var crsEl = root.querySelector('#cpv-sync-' + fuente + '-curso');
    var pill = root.querySelector('#cpv-sync-' + fuente + '-pill');
    if (banner) banner.style.display = 'flex';
    if (defEl) defEl.style.display = 'none';
    if (crsEl) {
      crsEl.style.display = 'flex';
      crsEl.style.flexDirection = 'column';
    }
    if (pill) pill.innerHTML = '<span class="pill pill-warn pill-sm"><span class="pill-dot"></span>En curso</span>';
    ctx.toast('info', 'Sincronización lanzada', 'Puede tardar entre 30 min y varias horas.');
    _syncTimer = setTimeout(function () {
      _inCurso = null;
      if (banner) banner.style.display = 'none';
      if (defEl) defEl.style.display = 'flex';
      if (crsEl) crsEl.style.display = 'none';
      if (pill) pill.innerHTML = '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Completada</span>';
      var cf = fuente === 'outscraper' ? 23 : 2;
      ctx.toast('success', 'Sincronización completada', fuente === 'outscraper' ? '+127 nuevos · 23 conflictos detectados' : '+5 clientes importados');
      if (cf > 0) {
        setTimeout(function () {
          ctx.toast('warn', cf + ' conflictos pendientes', 'Revisar en Administración › Revisión →');
        }, 900);
      }
    }, 8000);
  }

  /* ════ MOUNTED ══════════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    if (state !== 'default') return;

    /* "Sincronizar ahora" → abre modal confirm */
    root.querySelectorAll('[data-sync-now]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        _pending = btn.getAttribute('data-sync-now');
        var isOut = _pending === 'outscraper';
        var mb = root.querySelector('#cpv-sync-modal-body');
        if (mb) mb.textContent = 'La sincronización con ' + (isOut ? 'Outscraper / Google Maps' : 'Salesforce / CooperVision') + ' se iniciará ahora. Puede tardar entre 30 min y varias horas.' + ' Los datos pueden no estar actualizados durante este período.';
        var m = root.querySelector('#cpv-sync-modal');
        if (m) m.style.display = 'flex';
      });
    });

    /* Modal — cerrar */
    ['#cpv-sync-modal-x', '#cpv-sync-modal-cancel'].forEach(function (sel) {
      var b = root.querySelector(sel);
      if (b) b.addEventListener('click', function () {
        var m = root.querySelector('#cpv-sync-modal');
        if (m) m.style.display = 'none';
        _pending = null;
      });
    });
    var modal = root.querySelector('#cpv-sync-modal');
    if (modal) modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        _pending = null;
      }
    });

    /* Modal — confirmar */
    var confirmBtn = root.querySelector('#cpv-sync-modal-confirm');
    if (confirmBtn) confirmBtn.addEventListener('click', function () {
      var m = root.querySelector('#cpv-sync-modal');
      if (m) m.style.display = 'none';
      if (_pending) startSync(_pending, root, ctx);
      _pending = null;
    });

    /* Config guardar */
    var cfgSave = root.querySelector('#cfg-save');
    if (cfgSave) cfgSave.addEventListener('click', function () {
      ctx.toast('success', 'Configuración guardada', 'Los cambios se aplicarán en la próxima ejecución programada.');
    });

    /* Historial expand/collapse */
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-hist-toggle]');
      if (!btn) return;
      var id = btn.getAttribute('data-hist-toggle');
      var row = root.querySelector('#cpv-hist-' + id);
      if (!row) return;
      var open = row.style.display !== 'none';
      row.style.display = open ? 'none' : 'table-row';
      btn.textContent = open ? 'Ver →' : 'Cerrar ↑';
    });

    /* Descarga */
    var dlBtn = root.querySelector('#cpv-ops-dl');
    if (dlBtn) dlBtn.addEventListener('click', function () {
      ctx.toast('info', 'Generando CSV…', 'El archivo se descargará en unos segundos.');
      setTimeout(function () {
        ctx.toast('success', 'Descarga lista', '18.234 ópticas exportadas correctamente.');
      }, 2000);
    });
  }

  /* ── register ─────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/admin/operaciones'] = {
    render: function (state, ctx) {
      if (state === 'loading') return renderLoading(ctx);
      if (state === 'empty') return renderEmpty(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/admin-operaciones.js", error: String((e && e.message) || e) }); }

// coopervision/views/admin-revision.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-revision.js — A3
   Bandeja de matching post-sync.
   Decide si un opticas_cpv es la misma óptica que un opticas_google
   (crear FK place_id_fk). NO consolida campos.

   Tipos: conflicto · solo_cpv · no_encontrado
   Transición: fade 120ms out + 120ms in
   Teclado: V = Vincular, D = Son distintas / Mantener, S = Saltar
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function pad2(n) {
    return String(n).padStart(2, '0');
  }
  function fmtF(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear();
  }
  function pct(v) {
    return Math.round((v || 0) * 100) + '%';
  }
  function stars(r) {
    if (!r) return '—';
    return '★ ' + Number(r).toFixed(1);
  }
  function dim(v) {
    return v == null || v === '' ? '<span style="color:var(--muted-2)">—</span>' : enc(v);
  }

  /* ── module state ─────────────────────────────────────────── */
  var _allItems = [];
  var _dismissed = {}; // { id: decision_label }
  var _skippedIds = {}; // { id: true } → moved to end
  var _transformed = {}; // { id: true } → conflicto turned solo_cpv after all candidates rejected
  var _activeCand = {}; // { id: candidatoIndex }
  var _tab = 'todos';
  var _currentId = null;
  var _kbdHandler = null;
  var _undoTimer = null;
  var _hlTimer = null;

  /* ── queue builder ────────────────────────────────────────── */
  function buildItems(md) {
    var items = [];
    var mc = md.matching_candidatos || [];
    var ne = md.no_encontrados || [];
    var mcIds = mc.map(function (m) {
      return m.cpv_codigo;
    });
    mc.forEach(function (m) {
      var cpv = findCPV(md, m.cpv_codigo) || makeSyntheticCPV(m.cpv_codigo);
      var candidatos = (m.candidatos || []).map(function (c) {
        return {
          place_id: c.place_id,
          score: c.score,
          metricas: c.metricas || {},
          google: findGoogle(md, c.place_id)
        };
      });
      items.push({
        id: m.cpv_codigo,
        type: m.estado,
        cpv: cpv,
        candidatos: candidatos,
        detectado: m.detectado
      });
    });
    ne.forEach(function (n) {
      items.push({
        id: n.place_id,
        type: 'no_encontrado',
        google: n,
        detectado: n.desaparecido_desde
      });
    });

    /* extra solo_cpv: opticas_cpv sin FK, not already in matching_candidatos */
    (md.opticas_cpv || []).forEach(function (cpv) {
      if (cpv.place_id_fk) return;
      if (mcIds.indexOf(cpv.CODIGO) !== -1) return;
      items.push({
        id: cpv.CODIGO,
        type: 'solo_cpv',
        cpv: cpv,
        candidatos: [],
        detectado: new Date().toISOString()
      });
    });
    return items;
  }
  function findCPV(md, codigo) {
    return (md.opticas_cpv || []).find(function (c) {
      return c.CODIGO === codigo;
    }) || null;
  }
  function findGoogle(md, pid) {
    return (md.opticas_google || []).find(function (g) {
      return g.place_id === pid;
    }) || null;
  }
  function makeSyntheticCPV(codigo) {
    return {
      CODIGO: codigo,
      GRUPO: codigo,
      LOCALIDAD: 'Madrid',
      PROVINCIA: 'Madrid',
      DIRECCION: 'Dirección desconocida',
      TEL: '—',
      EMAIL: '—',
      DP: '—',
      COM: '—',
      TIPOLOGIA: '—',
      SEGMENTACION: '—'
    };
  }

  /* ── queue helpers ────────────────────────────────────────── */
  function effectiveType(item) {
    return _transformed[item.id] ? 'solo_cpv' : item.type;
  }
  function getVisible() {
    var normal = [],
      skipped = [];
    _allItems.forEach(function (item) {
      if (_dismissed[item.id]) return;
      var t = effectiveType(item);
      if (_tab !== 'todos' && t !== _tab) return;
      (_skippedIds[item.id] ? skipped : normal).push(item);
    });
    return normal.concat(skipped);
  }
  function getCurrent() {
    var q = getVisible();
    if (!q.length) return null;
    if (_currentId) {
      var f = q.find(function (i) {
        return i.id === _currentId;
      });
      if (f) return f;
    }
    _currentId = q[0].id;
    return q[0];
  }
  function getNextItem(afterId) {
    var q = getVisible();
    if (!q.length) return null;
    var idx = q.findIndex(function (i) {
      return i.id === afterId;
    });
    return q[idx + 1] || null;
  }
  function getPosition() {
    var q = getVisible();
    var idx = q.findIndex(function (i) {
      return i.id === _currentId;
    });
    return {
      n: Math.max(1, idx + 1),
      total: q.length
    };
  }
  function countByType() {
    var r = {
      conflicto: 0,
      solo_cpv: 0,
      no_encontrado: 0
    };
    _allItems.forEach(function (item) {
      if (_dismissed[item.id]) return;
      r[effectiveType(item)] = (r[effectiveType(item)] || 0) + 1;
    });
    r.total = r.conflicto + r.solo_cpv + r.no_encontrado;
    return r;
  }

  /* ── field row ────────────────────────────────────────────── */
  function frow(label, value, fieldKey, tabla) {
    var edit = fieldKey ? '<button class="rev-field-edit" title="Corregir dato"' + ' data-edit-field="' + enc(fieldKey) + '"' + ' data-edit-tabla="' + enc(tabla) + '"' + ' data-edit-value="' + enc(value == null ? '' : String(value)) + '">' + '<iconify-icon icon="iconoir:edit-pencil" width="11"></iconify-icon></button>' : '';
    return '<div class="rev-field">' + '<span class="rev-field-label">' + enc(label) + '</span>' + '<span class="rev-field-value">' + dim(value) + '</span>' + edit + '</div>';
  }

  /* ── google column content ────────────────────────────────── */
  function googleColContent(google, item) {
    if (!google) {
      return '<div style="padding:var(--space-5);text-align:center;color:var(--muted);font-size:13px">' + '<iconify-icon icon="iconoir:warning-circle" width="20" style="display:block;margin:0 auto 8px"></iconify-icon>' + 'Candidato no disponible en el mock.</div>';
    }
    var cands = item.candidatos || [];
    var cIdx = _activeCand[item.id] || 0;
    var candSel = cands.length > 1 ? '<select class="select select-sm" id="rev-cand-sel" style="font-size:12px;margin-bottom:var(--space-4)">' + cands.map(function (c, i) {
      return '<option value="' + i + '"' + (i === cIdx ? ' selected' : '') + '>' + 'Candidato ' + (i + 1) + ' de ' + cands.length + ' · ' + pct(c.score) + '</option>';
    }).join('') + '</select>' : '';
    return candSel + frow('Nombre', google.name, 'name', 'opticas_google') + frow('Teléfono', google.phone, 'phone', 'opticas_google') + frow('Web', google.website, 'website', 'opticas_google') + frow('Dirección', google.address, 'address', 'opticas_google') + frow('Ciudad', google.city, 'city', 'opticas_google') + frow('CP', google.postal_code, 'postal_code', 'opticas_google') + frow('Valoración', google.rating ? stars(google.rating) + ' (' + (google.reviews || 0) + ' reseñas)' : null, null, null) + '<div class="rev-field-sep"></div>' + '<div class="rev-field-mono">place_id: ' + enc(google.place_id) + '</div>';
  }

  /* ── cpv column content ───────────────────────────────────── */
  function cpvColContent(cpv) {
    if (!cpv) return '<div style="padding:var(--space-5);color:var(--muted);font-size:13px">Sin datos CPV.</div>';
    return frow('CÓDIGO CPV', cpv.CODIGO, null, null) + frow('CÓDIGO BBDD', cpv.CPV_ID, null, null) + frow('Grupo', cpv.GRUPO, 'GRUPO', 'opticas_cpv') + frow('Teléfono', cpv.TEL, 'TEL', 'opticas_cpv') + frow('Email', cpv.EMAIL, 'EMAIL', 'opticas_cpv') + frow('Dirección', cpv.DIRECCION, 'DIRECCION', 'opticas_cpv') + frow('Localidad', cpv.LOCALIDAD, 'LOCALIDAD', 'opticas_cpv') + frow('Provincia', cpv.PROVINCIA, null, null) + '<div class="rev-field-sep"></div>' + frow('DP', cpv.DP, null, null) + frow('Comercial', cpv.COM, null, null) + frow('Tipología', cpv.TIPOLOGIA, null, null) + frow('Segmentación', cpv.SEGMENTACION, null, null);
  }

  /* ── score pill (header) ──────────────────────────────────── */
  function scorePill(label, v) {
    if (v == null) return '';
    if (v >= 0.999) {
      return '<span class="rev-sp rev-sp-ok">' + enc(label) + '<iconify-icon icon="iconoir:check" width="12"></iconify-icon></span>';
    }
    var cls = v >= 0.85 ? 'rev-sp-ok' : 'rev-sp-warn';
    return '<span class="rev-sp ' + cls + '">' + enc(label) + ' <b>' + pct(v) + '</b></span>';
  }

  /* ── conflict field row (2-col, highlightable) ────────────── */
  function rfield(label, value, fieldKey, tabla, conflict, strong) {
    var edit = fieldKey ? '<button class="rev-field-edit" title="Corregir dato"' + ' data-edit-field="' + enc(fieldKey) + '"' + ' data-edit-tabla="' + enc(tabla) + '"' + ' data-edit-value="' + enc(value == null ? '' : String(value)) + '">' + '<iconify-icon icon="iconoir:edit-pencil" width="11"></iconify-icon></button>' : '';
    return '<div class="rev-f' + (conflict ? ' rev-f-conflict' : '') + '">' + '<span class="rev-f-label">' + enc(label) + '</span>' + '<span class="rev-f-value' + (strong ? ' rev-f-value-strong' : '') + '">' + dim(value) + '</span>' + edit + '</div>';
  }

  /* ── source column header (icon + title + id) ─────────────── */
  function srcHead(icon, title, sub) {
    return '<div class="rev-src">' + '<div class="rev-src-icon"><iconify-icon icon="' + icon + '" width="18"></iconify-icon></div>' + '<div class="rev-src-meta">' + '<div class="rev-src-title">' + enc(title) + '</div>' + '<div class="rev-src-sub">' + enc(sub) + '</div>' + '</div></div>';
  }

  /* ── focus card: conflicto ────────────────────────────────── */
  function conflictoHTML(item, pos) {
    var cIdx = _activeCand[item.id] || 0;
    var cand = item.candidatos[cIdx] || {};
    var met = cand.metricas || {};
    var g = cand.google || {};
    var c = item.cpv || {};
    var conf = function (k) {
      return met[k] != null && met[k] < 0.8;
    };
    var fields = [{
      label: 'Nombre',
      gv: g.name,
      gk: 'name',
      cv: c.GRUPO,
      ck: 'GRUPO',
      conf: conf('nombre'),
      strong: true
    }, {
      label: 'Dirección',
      gv: g.address,
      gk: 'address',
      cv: c.DIRECCION,
      ck: 'DIRECCION',
      conf: conf('direccion'),
      strong: false
    }, {
      label: 'CP',
      gv: g.postal_code,
      gk: 'postal_code',
      cv: null,
      ck: null,
      conf: conf('codigo_postal'),
      strong: false
    }, {
      label: 'Teléfono',
      gv: g.phone,
      gk: 'phone',
      cv: c.TEL,
      ck: 'TEL',
      conf: conf('telefono'),
      strong: false
    }];
    var googleRows = fields.map(function (f) {
      return rfield(f.label, f.gv, f.gk, 'opticas_google', f.conf, f.strong);
    }).join('');
    var cpvRows = fields.map(function (f) {
      return rfield(f.label, f.cv, f.ck, 'opticas_cpv', f.conf, f.strong);
    }).join('');
    var cands = item.candidatos || [];
    var candSel = cands.length > 1 ? '<select class="select select-sm" id="rev-cand-sel" style="font-size:12px;margin-bottom:var(--space-4)">' + cands.map(function (cc, i) {
      return '<option value="' + i + '"' + (i === cIdx ? ' selected' : '') + '>' + 'Candidato ' + (i + 1) + ' de ' + cands.length + ' · ' + pct(cc.score) + '</option>';
    }).join('') + '</select>' : '';
    var scorePills = scorePill('Nombre', met.nombre) + scorePill('Dirección', met.direccion) + scorePill('CP', met.codigo_postal) + scorePill('Teléfono', met.telefono);
    return '<div class="rev-chead">' + '<div class="rev-chead-l">' + '<span class="pill pill-warn pill-sm">Conflicto</span>' + '<span class="body-sm c-muted">' + pos.n + ' de ' + pos.total + ' detectadas</span>' + '</div>' + '<div class="rev-scores">' + '<span class="rev-score-global">Score global <b>' + pct(cand.score) + '</b></span>' + '<div class="rev-score-pills">' + scorePills + '</div>' + '</div>' + '</div>' + '<div class="rev-cols">' + '<div class="rev-col rev-col-l">' + srcHead('iconoir:map-pin', 'Google Maps', 'place_id: ' + (g.place_id || '—')) + candSel + googleRows + '</div>' + '<div class="rev-col rev-col-r">' + srcHead('iconoir:db', 'CRM CooperVision', 'CÓDIGO CPV: ' + (c.CODIGO || '—') + ' · CÓDIGO BBDD: ' + (c.CPV_ID || '—')) + cpvRows + '</div>' + '</div>' + '<div class="rev-actions">' + '<div class="rev-actions-l">' + '<button class="btn btn-primary btn-sm" data-ra="vincular">' + '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Es la misma · Vincular' + '<span class="rev-kbd">V</span></button>' + '<button class="btn btn-ghost btn-sm" data-ra="distintas">' + '<iconify-icon icon="iconoir:xmark" width="14"></iconify-icon>Son distintas' + '<span class="rev-kbd">D</span></button>' + '<button class="btn btn-subtle btn-sm" data-ra="hl-edit">' + '<iconify-icon icon="iconoir:edit-pencil" width="14"></iconify-icon>Corregir datos</button>' + '</div>' + '<div class="rev-actions-r">' + '<button class="btn btn-ghost btn-sm" data-ra="siguiente">Siguiente →</button>' + '</div>' + '</div>';
  }

  /* ── focus card: solo_cpv ─────────────────────────────────── */
  function soloCpvHTML(item, pos) {
    var c = item.cpv || {};
    var fields = rfield('Grupo', c.GRUPO, 'GRUPO', 'opticas_cpv', false, true) + rfield('Dirección', c.DIRECCION, 'DIRECCION', 'opticas_cpv', false, false) + rfield('Localidad', c.LOCALIDAD, 'LOCALIDAD', 'opticas_cpv', false, false) + rfield('Provincia', c.PROVINCIA, null, null, false, false) + rfield('Teléfono', c.TEL, 'TEL', 'opticas_cpv', false, false);
    return '<div class="rev-chead">' + '<div class="rev-chead-l">' + '<span class="pill pill-neutral pill-sm">Solo CPV</span>' + '<span class="body-sm c-muted">' + pos.n + ' de ' + pos.total + ' detectadas</span>' + '</div>' + '</div>' + '<div style="padding:var(--space-5);border-top:1px solid var(--line-2)">' + srcHead('iconoir:db', 'CRM CooperVision', 'CÓDIGO CPV: ' + (c.CODIGO || '—') + ' · CÓDIGO BBDD: ' + (c.CPV_ID || '—')) + '<div class="rev-cpv-alert">' + '<iconify-icon icon="iconoir:warning-triangle" width="15"></iconify-icon>' + '<div>' + '<div class="rev-cpv-alert-title">Este cliente de Salesforce no tiene presencia verificada en Google Maps.</div>' + '<ul class="rev-cpv-alert-reasons">' + '<li>Óptica cerrada</li>' + '<li>No listada en Google</li>' + '<li>Nombre o dirección muy distintos al registro</li>' + '</ul>' + '</div>' + '</div>' + '<div style="max-width:520px">' + fields + '</div>' + '</div>' + '<div class="rev-actions">' + '<div class="rev-actions-l">' + '<button class="btn btn-primary btn-sm" data-ra="buscar">' + '<iconify-icon icon="iconoir:search" width="14"></iconify-icon>Buscar manualmente</button>' + '<button class="btn btn-ghost btn-sm" data-ra="cerrada">' + '<iconify-icon icon="iconoir:xmark" width="14"></iconify-icon>Marcar como cerrada</button>' + '<button class="btn btn-subtle btn-sm" data-ra="mantener">' + 'Mantener pendiente <span class="rev-kbd-i">D</span></button>' + '</div>' + '<div class="rev-actions-r">' + '<button class="btn btn-ghost btn-sm" data-ra="siguiente">Siguiente →</button>' + '</div>' + '</div>';
  }

  /* ── focus card: no_encontrado ────────────────────────────── */
  function noEncontradoHTML(item, pos) {
    var g = item.google || {};
    var fields = rfield('Nombre', g.name, null, null, false, true) + rfield('Ciudad', g.city, null, null, false, false) + rfield('Provincia', g.state, null, null, false, false) + rfield('Valoración', g.rating ? stars(g.rating) + ' (' + (g.reviews || 0) + ' reseñas)' : null, null, null, false, false) + rfield('Desaparecido', fmtF(g.desaparecido_desde), null, null, false, false);
    return '<div class="rev-chead">' + '<div class="rev-chead-l">' + '<span class="pill pill-neg pill-sm">No encontrado</span>' + '<span class="body-sm c-muted">' + pos.n + ' de ' + pos.total + ' detectadas</span>' + '</div>' + '</div>' + '<div style="padding:var(--space-5);border-top:1px solid var(--line-2)">' + srcHead('iconoir:map-pin', 'Google Maps', 'place_id: ' + (g.place_id || '—')) + '<div class="rev-cpv-alert">' + '<iconify-icon icon="iconoir:warning-triangle" width="15"></iconify-icon>' + '<div>' + '<div class="rev-cpv-alert-title">Ausente en la última sincronización</div>' + '<p class="rev-cpv-alert-body">El registro de Google Maps desapareció en la última sync. ' + 'Puede ser temporal (error de Google) o definitivo (negocio cerrado o relisting).</p>' + '</div>' + '</div>' + '<p class="eyebrow-t" style="margin-bottom:var(--space-4)">Últimos registros</p>' + '<div style="max-width:520px">' + fields + '</div>' + '</div>' + '<div class="rev-actions">' + '<div class="rev-actions-l">' + '<button class="btn btn-primary btn-sm" data-ra="mantener-ne">' + '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Mantener · Esperar próxima sync</button>' + '<button class="btn btn-ghost btn-sm" data-ra="cerrada">' + '<iconify-icon icon="iconoir:xmark" width="14"></iconify-icon>Marcar como cerrada</button>' + '<button class="btn btn-subtle btn-sm" data-ra="investigar">' + '<iconify-icon icon="iconoir:search" width="14"></iconify-icon>Investigar relisting</button>' + '</div>' + '<div class="rev-actions-r">' + '<button class="btn btn-ghost btn-sm" data-ra="siguiente">Siguiente →</button>' + '</div>' + '</div>';
  }

  /* ── focus card dispatcher ────────────────────────────────── */
  function focusCardInner(item) {
    if (!item) {
      return '<div class="empty-state" style="min-height:180px">' + '<iconify-icon icon="iconoir:check-circle" width="32" style="color:var(--pos-ink)"></iconify-icon>' + '<h2 class="state-title">Sin pendientes en este filtro</h2></div>';
    }
    var pos = getPosition();
    var t = effectiveType(item);
    if (t === 'conflicto') return conflictoHTML(item, pos);
    if (t === 'solo_cpv') return soloCpvHTML(item, pos);
    if (t === 'no_encontrado') return noEncontradoHTML(item, pos);
    return '';
  }

  /* ── tabs HTML ────────────────────────────────────────────── */
  function tabsHTML(c) {
    function tab(k, lbl, n) {
      return '<button class="cpv-filter-tab' + (_tab === k ? ' active' : '') + '" data-rtab="' + k + '">' + enc(lbl) + ' <span class="cpv-filter-tab-count">' + n + '</span></button>';
    }
    return '<div class="cpv-filter-tabs" style="margin-bottom:var(--space-5)">' + tab('todos', 'Todos', c.total) + tab('conflicto', 'Conflictos', c.conflicto) + tab('solo_cpv', 'Solo CPV', c.solo_cpv) + tab('no_encontrado', 'No encontrados', c.no_encontrado) + '</div>';
  }

  /* ── pending table ────────────────────────────────────────── */
  function tableRowsHTML(currentId) {
    var q = getVisible();
    return q.map(function (item) {
      var t = effectiveType(item);
      var pill = t === 'conflicto' ? '<span class="pill pill-warn pill-sm">Conflicto</span>' : t === 'solo_cpv' ? '<span class="pill pill-neutral pill-sm">Solo CPV</span>' : '<span class="pill pill-neg pill-sm">No encontrado</span>';
      var nombre = t === 'no_encontrado' ? item.google ? item.google.name : item.id : item.cpv ? item.cpv.GRUPO || item.cpv.CODIGO : item.id;
      var codigo = t === 'no_encontrado' ? item.id : item.cpv ? item.cpv.CODIGO : item.id;
      var cand0 = item.candidatos && item.candidatos[0];
      var motivo = t === 'conflicto' && cand0 ? pct(cand0.score) + (cand0.metricas && cand0.metricas.codigo_postal === 1 ? ' · Mismo CP' : '') : t === 'no_encontrado' ? 'Ausente en sync' : 'Sin candidatos Google';
      var active = item.id === currentId;
      return '<tr class="rev-trow' + (active ? ' rev-trow-active' : '') + '" data-rrow="' + enc(item.id) + '">' + '<td>' + pill + '</td>' + '<td style="font-weight:' + (active ? '600' : '400') + '">' + enc(nombre) + '</td>' + '<td class="body-xs c-muted" style="font-family:var(--font-mono);font-size:11px">' + enc(codigo) + '</td>' + '<td class="body-xs c-muted">' + enc(motivo) + '</td>' + '<td class="body-xs c-muted tnum">' + enc(fmtF(item.detectado)) + '</td>' + '</tr>';
    }).join('');
  }
  function tableHTML(currentId) {
    var rows = tableRowsHTML(currentId);
    return '<div style="margin-top:var(--space-7)">' + '<p class="eyebrow-t" style="margin-bottom:var(--space-4)">Todos los pendientes</p>' + '<div class="table-wrap"><table class="table-dense">' + '<thead><tr>' + '<th style="width:120px">Tipo</th><th>Nombre</th>' + '<th style="width:130px">Código</th><th>Motivo</th>' + '<th style="width:90px">Detectado</th>' + '</tr></thead>' + '<tbody id="rev-tbody">' + (rows || '<tr><td colspan="5" style="padding:24px;color:var(--muted);text-align:center;font-size:13px">Sin pendientes</td></tr>') + '</tbody>' + '</table></div></div>';
  }

  /* ── modals ───────────────────────────────────────────────── */
  function overrideModalHTML() {
    return '<div class="modal-overlay" id="rev-ov-modal" style="display:none">' + '<div class="modal"><div class="modal-header">' + '<h2 class="modal-title" id="rev-ov-title">Corregir campo</h2>' + '<button class="btn-icon btn-lg" data-rmc="rev-ov-modal">' + '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button>' + '</div>' + '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">' + '<div class="form-group"><label class="form-label">Tabla</label>' + '<div id="rev-ov-tabla" class="rev-mono-chip"></div></div>' + '<div class="form-group"><label class="form-label">Campo</label>' + '<div id="rev-ov-campo" class="rev-mono-chip"></div></div>' + '</div>' + '<div class="form-group"><label class="form-label">Valor original</label>' + '<div id="rev-ov-orig" class="body-sm c-muted" style="font-size:13px"></div></div>' + '<div class="form-group"><label class="form-label">Nuevo valor</label>' + '<input class="input" id="rev-ov-nuevo" type="text"></div>' + '<div class="form-group"><label class="form-label">Motivo <span class="form-hint" style="font-weight:400">(opcional)</span></label>' + '<input class="input" id="rev-ov-motivo" type="text" placeholder="Ej: Formato corregido manualmente"></div>' + '<div class="rev-warn-note">' + '<iconify-icon icon="iconoir:warning-triangle" width="13" style="flex-shrink:0;margin-top:1px"></iconify-icon>' + 'Se registra en <code>opticas_overrides</code> y queda auditado. ' + 'Se aplica on top del dato original, sin sobrescribirlo. <b>No crea ningún vínculo FK.</b>' + '</div>' + '</div>' + '<div class="modal-footer">' + '<button class="btn btn-ghost btn-sm" data-rmc="rev-ov-modal">Cancelar</button>' + '<button class="btn btn-primary btn-sm" id="rev-ov-ok">' + '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar override</button>' + '</div></div></div>';
  }
  function buscarModalHTML() {
    return '<div class="modal-overlay" id="rev-bs-modal" style="display:none">' + '<div class="modal" style="max-width:560px"><div class="modal-header">' + '<h2 class="modal-title">Buscar óptica en Google Maps</h2>' + '<button class="btn-icon btn-lg" data-rmc="rev-bs-modal">' + '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button>' + '</div>' + '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<p class="body-sm c-muted">Busca por nombre para encontrar el place_id correcto y crear el vínculo.</p>' + '<div class="form-group"><label class="form-label">Nombre de la óptica</label>' + '<input class="input" id="rev-bs-q" type="text" placeholder="Ej: Óptica Pérez Madrid" autocomplete="off"></div>' + '<div id="rev-bs-results" style="display:none;max-height:280px;overflow-y:auto;border:1px solid var(--line-2);border-radius:var(--radius-md)"></div>' + '<input type="hidden" id="rev-bs-sel">' + '</div>' + '<div class="modal-footer">' + '<button class="btn btn-ghost btn-sm" data-rmc="rev-bs-modal">Cancelar</button>' + '<button class="btn btn-primary btn-sm" id="rev-bs-ok" disabled>' + '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Vincular con esta óptica</button>' + '</div></div></div>';
  }

  /* ── page header ──────────────────────────────────────────── */
  function pageHeader(total) {
    return '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Revisión de datos</h1>' + '<p class="page-subtitle">' + total + ' registros pendientes</p>' + '</div></div>';
  }

  /* ════ RENDER DEFAULT ═══════════════════════════════════════ */
  function renderDefault(ctx) {
    var md = ctx.md;
    _allItems = buildItems(md);
    var counts = countByType();
    var current = getCurrent();
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('revision', md) : '';
    if (!current) return renderEmpty(ctx);
    return pageHeader(counts.total) + nav + tabsHTML(counts) + '<div class="card card-accent rev-focus-card" id="rev-focus-card">' + '<div id="rev-focus-inner">' + focusCardInner(current) + '</div>' + '</div>' + tableHTML(current.id) + overrideModalHTML() + buscarModalHTML();
  }

  /* ════ RENDER EMPTY (celebratorio) ═════════════════════════ */
  function renderEmpty(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('revision', ctx.md) : '';
    return pageHeader(0) + nav + '<div class="card" style="text-align:center;padding:64px var(--space-8)">' + '<iconify-icon icon="iconoir:check-circle" width="48" style="color:var(--pos-ink);display:block;margin:0 auto var(--space-4)"></iconify-icon>' + '<h2 style="font-family:var(--font-display);font-size:24px;font-weight:700;letter-spacing:-.02em;margin-bottom:var(--space-2)">Todo al día</h2>' + '<p class="body-sm c-muted" style="margin-bottom:var(--space-6)">Sin registros pendientes de revisión.</p>' + '<a class="btn btn-primary btn-sm" href="#/admin/operaciones">Lanzar nueva sincronización →</a>' + '</div>';
  }

  /* ════ RENDER LOADING / ERROR ════════════════════════════════ */
  function renderLoading(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('revision', ctx.md) : '';
    return pageHeader(0) + nav + '<div class="card card-accent" style="min-height:340px">' + '<div style="padding:var(--space-5)">' + '<span class="skeleton" style="display:block;height:280px;border-radius:var(--radius-md)"></span>' + '</div>' + '</div>';
  }
  function renderError(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('revision', ctx.md) : '';
    return pageHeader(0) + nav + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">Error al cargar revisión</h2>' + '<button class="btn btn-primary btn-sm" data-action="retry">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ── fade transition ──────────────────────────────────────── */
  function fadeCard(root, html, cb) {
    var inner = root.querySelector('#rev-focus-inner');
    if (!inner) {
      if (cb) cb();
      return;
    }
    inner.style.transition = 'opacity 120ms ease';
    inner.style.opacity = '0';
    setTimeout(function () {
      inner.innerHTML = html;
      inner.style.opacity = '0';
      requestAnimationFrame(function () {
        inner.style.opacity = '1';
        if (cb) setTimeout(cb, 120);
      });
    }, 120);
  }

  /* ── update helpers ───────────────────────────────────────── */
  function refreshTabs(root) {
    var c = countByType();
    root.querySelectorAll('[data-rtab]').forEach(function (btn) {
      var k = btn.getAttribute('data-rtab');
      var n = k === 'todos' ? c.total : c[k] || 0;
      var el = btn.querySelector('.cpv-filter-tab-count');
      if (el) el.textContent = n;
      btn.classList.toggle('active', k === _tab);
    });
  }
  function refreshTableRow(root, id, dismiss) {
    var row = root.querySelector('[data-rrow="' + id + '"]');
    if (!row) return;
    if (dismiss) {
      row.style.transition = 'opacity 200ms';
      row.style.opacity = '0';
      setTimeout(function () {
        row.style.display = 'none';
      }, 200);
    } else {
      root.querySelectorAll('[data-rrow]').forEach(function (r) {
        r.classList.toggle('rev-trow-active', r.getAttribute('data-rrow') === id);
        var nameTd = r.querySelector('td:nth-child(2)');
        if (nameTd) nameTd.style.fontWeight = r.getAttribute('data-rrow') === id ? '600' : '400';
      });
    }
  }

  /* ── advance to next ──────────────────────────────────────── */
  function advanceTo(root, nextId, ctx) {
    _currentId = nextId;
    var c = getCurrent();
    fadeCard(root, focusCardInner(c), function () {
      bindInner(root, ctx);
    });
    if (nextId) refreshTableRow(root, nextId, false);
  }

  /* ── actions ──────────────────────────────────────────────── */
  function doVincular(root, ctx) {
    var item = getCurrent();
    if (!item) return;
    var id = item.id;
    var cIdx = _activeCand[id] || 0;
    var cand = (item.candidatos || [])[cIdx] || {};
    var pid = cand.place_id || '';
    var gname = cand.google && cand.google.name || pid || '—';
    var cpvCode = item.cpv ? item.cpv.CODIGO : id;
    _dismissed[id] = 'vincular';
    refreshTableRow(root, id, true);
    var next = getNextItem(id);
    advanceTo(root, next ? next.id : null, ctx);
    if (!getCurrent()) {
      /* All done — show celebratory state */
      setTimeout(function () {
        var fc = root.querySelector('#rev-focus-card');
        if (fc) fc.outerHTML = '<div class="card" style="text-align:center;padding:64px var(--space-8)">' + '<iconify-icon icon="iconoir:check-circle" width="48" style="color:var(--pos-ink);display:block;margin:0 auto var(--space-4)"></iconify-icon>' + '<h2 style="font-family:var(--font-display);font-size:24px;font-weight:700;letter-spacing:-.02em;margin-bottom:var(--space-2)">Todo al día</h2>' + '<p class="body-sm c-muted" style="margin-bottom:var(--space-6)">Has revisado todos los registros pendientes.</p>' + '<a class="btn btn-primary btn-sm" href="#/admin/operaciones">Lanzar nueva sincronización →</a>' + '</div>';
      }, 300);
    }
    refreshTabs(root);
    toastUndo(ctx, 'Vinculado: ' + cpvCode + ' ↔ ' + gname, function () {
      delete _dismissed[id];
      _currentId = id;
      refreshTableRow(root, id, false);
      var r = root.querySelector('[data-rrow="' + id + '"]');
      if (r) {
        r.style.display = '';
        r.style.opacity = '1';
      }
      var c2 = getCurrent();
      fadeCard(root, focusCardInner(c2), function () {
        bindInner(root, ctx);
      });
      refreshTabs(root);
      ctx.toast('info', 'Vínculo deshecho', 'El registro vuelve a la cola de revisión.');
    });
  }
  function doDistintas(root, ctx) {
    var item = getCurrent();
    if (!item) return;
    var id = item.id;
    var type = effectiveType(item);
    if (type === 'conflicto') {
      var cIdx = _activeCand[id] || 0;
      var total = (item.candidatos || []).length;
      if (total > 1 && cIdx < total - 1) {
        _activeCand[id] = cIdx + 1;
        fadeCard(root, focusCardInner(item), function () {
          bindInner(root, ctx);
        });
        ctx.toast('info', 'Candidato descartado', 'Mostrando siguiente candidato (' + (_activeCand[id] + 1) + ' de ' + total + ').');
      } else {
        /* Last/only candidate: transform to solo_cpv in place */
        _transformed[id] = true;
        _activeCand[id] = 0;
        fadeCard(root, focusCardInner(item), function () {
          bindInner(root, ctx);
        });
        refreshTabs(root);
        ctx.toast('info', 'Sin coincidencias', 'El registro pasa a modo Solo CPV. Búscalo manualmente o mantenlo pendiente.');
      }
      return;
    }

    /* solo_cpv / no_encontrado: "Mantener pendiente" = advance without action */
    var next = getNextItem(id);
    advanceTo(root, next ? next.id : null, ctx);
  }
  function doSaltar(root, ctx) {
    var item = getCurrent();
    if (!item) return;
    var id = item.id;
    _skippedIds[id] = true;
    var next = getNextItem(id) || getVisible().find(function (i) {
      return i.id !== id;
    });
    advanceTo(root, next && next.id !== id ? next.id : null, ctx);
    ctx.toast('info', 'Saltado', 'Movido al final de la cola de revisión.');
  }
  function doSiguiente(root, ctx) {
    var next = getNextItem(_currentId);
    if (!next) {
      ctx.toast('info', 'Último registro', 'No hay más en este filtro.');
      return;
    }
    advanceTo(root, next.id, ctx);
  }
  function doCerrada(root, ctx) {
    var item = getCurrent();
    if (!item) return;
    var id = item.id;
    _dismissed[id] = 'cerrada';
    refreshTableRow(root, id, true);
    var next = getNextItem(id);
    advanceTo(root, next ? next.id : null, ctx);
    refreshTabs(root);
    ctx.toast('success', 'Marcado como cerrada', 'Se insertará un override de business_status=closed en opticas_overrides.');
  }
  function doMantenerNE(root, ctx) {
    var item = getCurrent();
    if (!item) return;
    var id = item.id;
    _dismissed[id] = 'mantener';
    refreshTableRow(root, id, true);
    var next = getNextItem(id);
    advanceTo(root, next ? next.id : null, ctx);
    refreshTabs(root);
    ctx.toast('success', 'Mantenido', 'El registro permanece activo y se revisará en la próxima sync.');
  }

  /* ── toast with undo ──────────────────────────────────────── */
  function toastUndo(ctx, message, undoFn) {
    if (_undoTimer) clearTimeout(_undoTimer);
    var tc = document.getElementById('toast-container');
    if (!tc) {
      ctx.toast('success', message, '');
      return;
    }
    var t = document.createElement('div');
    t.className = 'toast toast-success';
    t.setAttribute('role', 'alert');
    var secs = 10;
    t.innerHTML = '<div class="toast-body">' + '<iconify-icon icon="iconoir:check-circle" width="16"></iconify-icon>' + '<div class="toast-text">' + '<div class="toast-title">' + enc(message) + '</div>' + '<div class="toast-sub" id="rev-tc-cd">Deshacer disponible 10s</div>' + '</div>' + '<button class="btn btn-ghost btn-sm" id="rev-tc-undo" style="flex-shrink:0;white-space:nowrap">Deshacer</button>' + '<button class="toast-dismiss" id="rev-tc-x"><iconify-icon icon="iconoir:xmark" width="14"></iconify-icon></button>' + '</div>';
    tc.appendChild(t);
    var iv = setInterval(function () {
      secs--;
      var el = t.querySelector('#rev-tc-cd');
      if (el) el.textContent = 'Deshacer disponible ' + secs + 's';
      if (secs <= 0) {
        clearInterval(iv);
        dismiss();
      }
    }, 1000);
    function dismiss() {
      t.classList.add('dismissing');
      setTimeout(function () {
        try {
          t.remove();
        } catch (e) {}
      }, 300);
    }
    var undoBtn = t.querySelector('#rev-tc-undo');
    if (undoBtn) undoBtn.addEventListener('click', function () {
      clearInterval(iv);
      dismiss();
      undoFn();
    });
    var xBtn = t.querySelector('#rev-tc-x');
    if (xBtn) xBtn.addEventListener('click', function () {
      clearInterval(iv);
      dismiss();
    });
    _undoTimer = setTimeout(function () {
      clearInterval(iv);
    }, 11000);
  }

  /* ── override modal ───────────────────────────────────────── */
  function openOverride(root, field, tabla, value, ctx) {
    var m = root.querySelector('#rev-ov-modal');
    if (!m) return;
    var set = function (s, v) {
      var el = m.querySelector(s);
      if (el) el.textContent = v;
    };
    set('#rev-ov-title', 'Corregir ' + field);
    set('#rev-ov-tabla', tabla);
    set('#rev-ov-campo', field);
    set('#rev-ov-orig', value || '(vacío)');
    var nv = m.querySelector('#rev-ov-nuevo');
    if (nv) {
      nv.value = value || '';
    }
    var mv = m.querySelector('#rev-ov-motivo');
    if (mv) mv.value = '';
    m.dataset.field = field;
    m.dataset.tabla = tabla;
    m.style.display = 'flex';
    if (nv) setTimeout(function () {
      nv.focus();
    }, 80);
  }

  /* ── buscar modal: search ─────────────────────────────────── */
  function attachBuscar(root, ctx) {
    var md = ctx.md;
    var input = root.querySelector('#rev-bs-q');
    var results = root.querySelector('#rev-bs-results');
    var selId = root.querySelector('#rev-bs-sel');
    var okBtn = root.querySelector('#rev-bs-ok');
    if (!input || !results || !selId || !okBtn) return;
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      if (!q) {
        results.style.display = 'none';
        return;
      }
      var matches = (md.opticas_google || []).filter(function (g) {
        return g.name && g.name.toLowerCase().includes(q);
      }).slice(0, 10);
      if (!matches.length) {
        results.innerHTML = '<div style="padding:var(--space-4);font-size:13px;color:var(--muted)">Sin resultados</div>';
        results.style.display = 'block';
        return;
      }
      results.innerHTML = matches.map(function (g) {
        return '<div class="rev-bs-row" data-pid="' + enc(g.place_id) + '">' + '<div style="font-weight:500;font-size:13px">' + enc(g.name) + '</div>' + '<div style="font-size:11px;color:var(--muted)">' + enc(g.address || g.city || '') + '</div>' + '</div>';
      }).join('');
      results.style.display = 'block';
    });
    results.addEventListener('click', function (e) {
      var row = e.target.closest('[data-pid]');
      if (!row) return;
      var pid = row.getAttribute('data-pid');
      selId.value = pid;
      okBtn.disabled = false;
      input.value = row.querySelector('[style*="font-weight"]').textContent;
      results.querySelectorAll('[data-pid]').forEach(function (r) {
        r.style.background = r.getAttribute('data-pid') === pid ? 'var(--accent-6)' : '';
      });
      results.style.display = 'none';
    });
    okBtn.addEventListener('click', function () {
      var pid = selId.value;
      if (!pid) return;
      var modal = root.querySelector('#rev-bs-modal');
      if (modal) modal.style.display = 'none';
      var item = getCurrent();
      if (!item) return;
      var id = item.id;
      _dismissed[id] = 'vincular-manual';
      refreshTableRow(root, id, true);
      var next = getNextItem(id);
      advanceTo(root, next ? next.id : null, ctx);
      refreshTabs(root);
      ctx.toast('success', 'Vínculo manual creado', 'CPV vinculado con place_id: ' + pid + '.');
    });
  }

  /* ── highlight edit pencils ───────────────────────────────── */
  function hlEdit(root, ctx) {
    var btns = root.querySelectorAll('.rev-field-edit');
    btns.forEach(function (b) {
      b.classList.add('rev-field-edit-hl');
    });
    if (_hlTimer) clearTimeout(_hlTimer);
    _hlTimer = setTimeout(function () {
      btns.forEach(function (b) {
        b.classList.remove('rev-field-edit-hl');
      });
    }, 2000);
    ctx.toast('info', 'Haz click en el lápiz ✎', 'Aparece junto a cada campo al pasar el cursor. No crea vínculo.');
  }

  /* ── bind inner (after fade) ──────────────────────────────── */
  function bindInner(root, ctx) {
    /* Candidate select dropdown */
    var candSel = root.querySelector('#rev-cand-sel');
    if (candSel) {
      candSel.addEventListener('change', function () {
        var item = getCurrent();
        if (!item) return;
        _activeCand[item.id] = parseInt(candSel.value, 10);
        var inner = root.querySelector('#rev-focus-inner');
        if (inner) {
          inner.innerHTML = focusCardInner(item);
          bindInner(root, ctx);
        }
      });
    }
    /* Edit pencils */
    root.querySelectorAll('.rev-field-edit').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openOverride(root, btn.getAttribute('data-edit-field'), btn.getAttribute('data-edit-tabla'), btn.getAttribute('data-edit-value'), ctx);
      });
    });
  }

  /* ════ MOUNTED ══════════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    if (state !== 'default') return;
    bindInner(root, ctx);
    attachBuscar(root, ctx);

    /* Modal close */
    root.querySelectorAll('[data-rmc]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var m = root.querySelector('#' + btn.getAttribute('data-rmc'));
        if (m) m.style.display = 'none';
      });
    });
    root.querySelectorAll('.modal-overlay').forEach(function (ov) {
      ov.addEventListener('click', function (e) {
        if (e.target === ov) ov.style.display = 'none';
      });
    });

    /* Override OK */
    var ovOk = root.querySelector('#rev-ov-ok');
    if (ovOk) ovOk.addEventListener('click', function () {
      var nuevo = (root.querySelector('#rev-ov-nuevo') || {}).value || '';
      if (!nuevo.trim()) {
        ctx.toast('error', 'Campo requerido', 'Escribe el nuevo valor.');
        return;
      }
      var campo = (root.querySelector('#rev-ov-modal') || {}).dataset.field || '';
      root.querySelector('#rev-ov-modal').style.display = 'none';
      ctx.toast('success', 'Override guardado', 'Campo "' + campo + '" registrado en opticas_overrides.');
    });

    /* Delegation */
    root.addEventListener('click', function (e) {
      /* Tab switch */
      var rtab = e.target.closest('[data-rtab]');
      if (rtab) {
        _tab = rtab.getAttribute('data-rtab');
        root.querySelectorAll('[data-rtab]').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-rtab') === _tab);
        });
        var q = getVisible();
        _currentId = q.length ? q[0].id : null;
        var cur = getCurrent();
        fadeCard(root, focusCardInner(cur), function () {
          bindInner(root, ctx);
        });
        var tbody = root.querySelector('#rev-tbody');
        if (tbody) tbody.innerHTML = tableRowsHTML(_currentId);
        return;
      }
      /* Table row click */
      var rrow = e.target.closest('[data-rrow]');
      if (rrow) {
        var rid = rrow.getAttribute('data-rrow');
        if (_dismissed[rid]) return;
        _currentId = rid;
        var c = getCurrent();
        fadeCard(root, focusCardInner(c), function () {
          bindInner(root, ctx);
        });
        refreshTableRow(root, rid, false);
        var fc = root.querySelector('#rev-focus-card');
        if (fc) {
          var y = fc.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
        return;
      }
      /* Action buttons */
      var ra = e.target.closest('[data-ra]');
      if (!ra) return;
      var a = ra.getAttribute('data-ra');
      if (a === 'vincular') doVincular(root, ctx);else if (a === 'distintas') doDistintas(root, ctx);else if (a === 'mantener') doDistintas(root, ctx); /* solo_cpv: mantener = advance */else if (a === 'saltar') doSaltar(root, ctx);else if (a === 'siguiente') doSiguiente(root, ctx);else if (a === 'cerrada') doCerrada(root, ctx);else if (a === 'mantener-ne') doMantenerNE(root, ctx);else if (a === 'buscar' || a === 'investigar') {
        var bm = root.querySelector('#rev-bs-modal');
        if (bm) {
          bm.style.display = 'flex';
          var bq = bm.querySelector('#rev-bs-q');
          if (bq) {
            bq.value = '';
            bq.focus();
          }
          var br = bm.querySelector('#rev-bs-results');
          if (br) br.style.display = 'none';
          var bs = bm.querySelector('#rev-bs-sel');
          if (bs) bs.value = '';
          var bo = bm.querySelector('#rev-bs-ok');
          if (bo) bo.disabled = true;
        }
      } else if (a === 'hl-edit') hlEdit(root, ctx);
    });

    /* Keyboard shortcuts */
    if (_kbdHandler) document.removeEventListener('keydown', _kbdHandler);
    _kbdHandler = function (e) {
      var tag = document.activeElement && document.activeElement.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      var openM = root.querySelector('.modal-overlay[style*="flex"]');
      if (openM) return;
      if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        doVincular(root, ctx);
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        doDistintas(root, ctx);
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        doSaltar(root, ctx);
      }
    };
    document.addEventListener('keydown', _kbdHandler);
  }

  /* ── register ─────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/admin/revision'] = {
    render: function (state, ctx) {
      /* Reset on navigate */
      _tab = 'todos';
      _currentId = null;
      _dismissed = {};
      _skippedIds = {};
      _transformed = {};
      _activeCand = {};
      if (_kbdHandler) {
        document.removeEventListener('keydown', _kbdHandler);
        _kbdHandler = null;
      }
      if (state === 'loading') return renderLoading(ctx);
      if (state === 'empty') return renderEmpty(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/admin-revision.js", error: String((e && e.message) || e) }); }

// coopervision/views/admin-shared.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-shared.js
   Helper compartido: sub-navegación horizontal del área admin.
   Expuesto como window.cpvAdmin.subnav(active, md) → HTML string.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function subnav(active, md) {
    var pending = (md.matching_candidatos || []).length + (md.no_encontrados || []).length;
    var tabs = [{
      key: 'usuarios',
      label: 'Usuarios',
      href: '#/admin/usuarios'
    }, {
      key: 'operaciones',
      label: 'Operaciones',
      href: '#/admin/operaciones'
    }, {
      key: 'revision',
      label: 'Revisión',
      href: '#/admin/revision',
      badge: pending > 0 ? String(pending) : null
    }, {
      key: 'cadenas',
      label: 'Cadenas',
      href: '#/admin/cadenas'
    }, {
      key: 'logs',
      label: 'Logs',
      href: '#/admin/logs'
    }];
    return '<nav class="tabs-list cpv-admin-subnav">' + tabs.map(function (t) {
      var badge = t.badge ? '<span class="cpv-admin-badge">' + enc(t.badge) + '</span>' : '';
      return '<a class="tab-trigger' + (t.key === active ? ' active' : '') + '" href="' + enc(t.href) + '" style="display:inline-flex;align-items:center;gap:5px;text-decoration:none">' + enc(t.label) + badge + '</a>';
    }).join('') + '</nav>';
  }
  window.cpvAdmin = {
    subnav: subnav
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/admin-shared.js", error: String((e && e.message) || e) }); }

// coopervision/views/admin-usuarios.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-usuarios.js — A1
   CRUD de usuarios. Tabla densa · menú ⋯ · modales.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function initials(nombre) {
    return (nombre || '').split(/\s+/).slice(0, 2).map(function (w) {
      return (w[0] || '').toUpperCase();
    }).join('');
  }
  function timeAgo(iso) {
    var ms = Date.now() - new Date(iso).getTime();
    var m = Math.floor(ms / 60000),
      h = Math.floor(ms / 3600000),
      d = Math.floor(ms / 86400000);
    if (m < 60) return 'hace ' + m + ' min';
    if (h < 24) return 'hace ' + h + 'h';
    if (d === 1) return 'ayer';
    return 'hace ' + d + ' días';
  }

  /* ── module state ─────────────────────────────────────────── */
  var _menuEl = null;
  var _menuUid = null;
  var _outsideH = null;
  var _activoState = {}; // overrides in-memory: { userId: bool }

  function teardown() {
    if (_menuEl) {
      try {
        _menuEl.remove();
      } catch (e) {}
      _menuEl = null;
    }
    if (_outsideH) {
      document.removeEventListener('click', _outsideH);
      _outsideH = null;
    }
    _menuUid = null;
  }

  /* ── row menu ─────────────────────────────────────────────── */
  function ensureMenu() {
    if (_menuEl) return _menuEl;
    _menuEl = document.createElement('div');
    _menuEl.className = 'cpv-row-menu';
    document.body.appendChild(_menuEl);
    return _menuEl;
  }
  function closeMenu() {
    if (_menuEl) _menuEl.classList.remove('open');
    _menuUid = null;
  }

  /* ── row HTML ─────────────────────────────────────────────── */
  function userRow(u) {
    var activo = _activoState[u.id] !== undefined ? _activoState[u.id] : u.activo;
    var rolPill = u.rol === 'admin' ? '<span class="pill pill-accent pill-sm">Admin</span>' : '<span class="pill pill-paused pill-sm">Usuario</span>';
    var nameColor = activo ? '' : 'color:var(--muted);';
    return '<tr data-uid="' + u.id + '">' + '<td>' + '<div style="display:flex;align-items:center;gap:8px">' + '<div class="avatar" style="width:24px;height:24px;font-size:9px;flex-shrink:0">' + enc(initials(u.nombre)) + '</div>' + '<span style="font-weight:500;' + nameColor + '">' + enc(u.nombre) + (activo ? '' : ' <span class="body-xs" style="color:var(--muted-2)">(inactivo)</span>') + '</span>' + '</div>' + '</td>' + '<td class="body-xs c-ink2">' + enc(u.email) + '</td>' + '<td>' + rolPill + '</td>' + '<td class="body-xs c-muted tnum">' + enc(timeAgo(u.ultimo_acceso)) + '</td>' + '<td class="cpv-bbdd-menu-col">' + '<button class="cpv-bbdd-menu-btn" data-menu-user="' + u.id + '" aria-label="Acciones">' + '<iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button>' + '</td>' + '</tr>';
  }

  /* ── open row menu ────────────────────────────────────────── */
  function openMenu(btn, uid, md, ctx) {
    var m = ensureMenu();
    if (_menuUid === uid && m.classList.contains('open')) {
      closeMenu();
      return;
    }
    _menuUid = uid;
    var u = md.usuarios.find(function (x) {
      return x.id === uid;
    });
    var activo = _activoState[uid] !== undefined ? _activoState[uid] : u ? u.activo : true;
    m.innerHTML = '<button class="dropdown-item" data-ua="edit"><iconify-icon icon="iconoir:edit-pencil" width="16"></iconify-icon>Editar</button>' + '<button class="dropdown-item" data-ua="rol"><iconify-icon icon="iconoir:user-badge-check" width="16"></iconify-icon>Cambiar rol</button>' + '<button class="dropdown-item" data-ua="pwd"><iconify-icon icon="iconoir:lock" width="16"></iconify-icon>Resetear contraseña</button>' + '<button class="dropdown-item" data-ua="toggle">' + '<iconify-icon icon="iconoir:' + (activo ? 'user-x-mark' : 'user') + '" width="16"></iconify-icon>' + (activo ? 'Desactivar' : 'Reactivar') + '</button>' + '<div class="dropdown-divider"></div>' + '<button class="dropdown-item danger" data-ua="del"><iconify-icon icon="iconoir:trash" width="16"></iconify-icon>Eliminar</button>';
    var r = btn.getBoundingClientRect();
    m.classList.add('open');
    var mw = m.offsetWidth || 198,
      mh = m.offsetHeight || 148;
    var top = r.bottom + 4;
    if (top + mh > window.innerHeight - 8) top = r.top - mh - 4;
    var lft = r.right - mw;
    if (lft < 8) lft = 8;
    m.style.left = lft + 'px';
    m.style.top = top + 'px';
    m.onclick = function (e) {
      var it = e.target.closest('[data-ua]');
      if (!it) return;
      closeMenu();
      handleAction(it.getAttribute('data-ua'), uid, md, ctx);
    };
  }
  function handleAction(act, uid, md, ctx) {
    var root = document.querySelector('#view-root');
    var u = md.usuarios.find(function (x) {
      return x.id === uid;
    });
    var activo = _activoState[uid] !== undefined ? _activoState[uid] : u ? u.activo : true;
    if (act === 'edit' && root && u) {
      var nb = root.querySelector('#edit-nombre');
      if (nb) nb.value = u.nombre;
      var eb = root.querySelector('#edit-email');
      if (eb) eb.value = u.email;
      root.querySelectorAll('input[name="edit-rol"]').forEach(function (r) {
        r.checked = r.value === u.rol;
      });
      var modal = root.querySelector('#usr-modal-edit');
      if (modal) {
        modal.dataset.editId = uid;
        modal.style.display = 'flex';
      }
    } else if (act === 'rol') {
      var newRol = u && u.rol === 'admin' ? 'usuario' : 'admin';
      ctx.toast('success', 'Rol actualizado', (u ? u.nombre : 'Usuario') + ' ahora tiene rol ' + newRol + '.');
    } else if (act === 'pwd') {
      ctx.toast('info', 'Email enviado', 'Se ha enviado enlace de restablecimiento a ' + (u ? u.email : '') + '.');
    } else if (act === 'toggle' && root) {
      _activoState[uid] = !activo;
      var oldRow = root.querySelector('tr[data-uid="' + uid + '"]');
      if (oldRow) {
        var tmp = document.createElement('tbody');
        tmp.innerHTML = userRow(Object.assign({}, u, {
          activo: !activo
        }));
        var newRow = tmp.firstElementChild;
        oldRow.replaceWith(newRow);
        // re-attach menu btn
        var newBtn = newRow.querySelector('[data-menu-user]');
        if (newBtn) newBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          openMenu(newBtn, uid, md, ctx);
        });
      }
      ctx.toast('success', activo ? 'Usuario desactivado' : 'Usuario reactivado', u ? u.nombre : '');
    } else if (act === 'del' && root) {
      var db = root.querySelector('#usr-del-body');
      if (db) db.textContent = '¿Eliminar la cuenta de ' + (u ? u.nombre : 'este usuario') + '? Esta acción no se puede deshacer.';
      var delModal = root.querySelector('#usr-modal-del');
      if (delModal) {
        delModal.dataset.delId = uid;
        delModal.style.display = 'flex';
      }
    }
  }

  /* ── modals HTML ──────────────────────────────────────────── */
  function modalsHTML() {
    return /* ── Nuevo usuario ── */'<div class="modal-overlay" id="usr-modal-new" style="display:none">' + '<div class="modal"><div class="modal-header">' + '<h2 class="modal-title">Nuevo usuario</h2>' + '<button class="btn-icon btn-lg" data-modal-close="usr-modal-new">' + '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="form-group"><label class="form-label">Nombre completo</label>' + '<input class="input" id="new-nombre" type="text" placeholder="Nombre Apellido" autocomplete="off"></div>' + '<div class="form-group"><label class="form-label">Email</label>' + '<input class="input" id="new-email" type="email" placeholder="nombre@coopervision.es"></div>' + '<div class="form-group"><label class="form-label">Rol</label>' + '<div style="display:flex;flex-direction:column;gap:var(--space-3);margin-top:4px">' + '<label class="radio-wrap"><input class="radio" type="radio" name="new-rol" value="user" checked>' + '<span class="toggle-text">Usuario — solo lectura</span></label>' + '<label class="radio-wrap"><input class="radio" type="radio" name="new-rol" value="admin">' + '<span class="toggle-text">Administrador — acceso total</span></label>' + '</div></div>' + '<p class="form-hint" style="display:flex;align-items:center;gap:5px;margin:0">' + '<iconify-icon icon="iconoir:mail" width="13" style="color:var(--muted)"></iconify-icon>' + 'Se enviará un email con contraseña temporal.</p>' + '</div>' + '<div class="modal-footer">' + '<button class="btn btn-ghost btn-sm" data-modal-close="usr-modal-new">Cancelar</button>' + '<button class="btn btn-primary btn-sm" id="new-usr-confirm">' + '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Crear usuario</button>' + '</div></div></div>' + /* ── Editar usuario ── */
    '<div class="modal-overlay" id="usr-modal-edit" style="display:none">' + '<div class="modal"><div class="modal-header">' + '<h2 class="modal-title">Editar usuario</h2>' + '<button class="btn-icon btn-lg" data-modal-close="usr-modal-edit">' + '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="form-group"><label class="form-label">Nombre completo</label>' + '<input class="input" id="edit-nombre" type="text"></div>' + '<div class="form-group"><label class="form-label">Email</label>' + '<input class="input" id="edit-email" type="email"></div>' + '<div class="form-group"><label class="form-label">Rol</label>' + '<div style="display:flex;flex-direction:column;gap:var(--space-3);margin-top:4px">' + '<label class="radio-wrap"><input class="radio" type="radio" name="edit-rol" value="user">' + '<span class="toggle-text">Usuario</span></label>' + '<label class="radio-wrap"><input class="radio" type="radio" name="edit-rol" value="admin">' + '<span class="toggle-text">Administrador</span></label>' + '</div></div>' + '</div>' + '<div class="modal-footer">' + '<button class="btn btn-ghost btn-sm" data-modal-close="usr-modal-edit">Cancelar</button>' + '<button class="btn btn-primary btn-sm" id="edit-usr-confirm">' + '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar cambios</button>' + '</div></div></div>' + /* ── Confirmar eliminar ── */
    '<div class="modal-overlay" id="usr-modal-del" style="display:none">' + '<div class="modal"><div class="modal-header">' + '<h2 class="modal-title">Eliminar usuario</h2>' + '<button class="btn-icon btn-lg" data-modal-close="usr-modal-del">' + '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<p class="modal-body" id="usr-del-body" style="margin:0">¿Eliminar este usuario? Esta acción no se puede deshacer.</p>' + '<div class="modal-footer">' + '<button class="btn btn-ghost btn-sm" data-modal-close="usr-modal-del">Cancelar</button>' + '<button class="btn btn-destructive btn-sm" id="del-usr-confirm">' + '<iconify-icon icon="iconoir:trash" width="14"></iconify-icon>Eliminar</button>' + '</div></div></div>';
  }

  /* ── page header ──────────────────────────────────────────── */
  function pageHeader(count) {
    return '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Gestión de usuarios</h1>' + '<p class="page-subtitle">' + count + ' usuarios activos</p>' + '</div><div class="page-header-right">' + '<button class="btn btn-primary btn-sm" id="usr-new-btn">' + '<iconify-icon icon="iconoir:plus" width="14"></iconify-icon>Nuevo usuario</button>' + '</div></div>';
  }

  /* ════ RENDER DEFAULT ═══════════════════════════════════════ */
  function renderDefault(ctx) {
    var md = ctx.md;
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('usuarios', md) : '';
    var activos = md.usuarios.filter(function (u) {
      return u.activo;
    }).length;
    var rows = md.usuarios.map(userRow).join('');
    return pageHeader(activos) + nav + '<div class="table-wrap">' + '<table class="table-dense">' + '<thead><tr>' + '<th style="width:240px">Nombre</th>' + '<th>Email</th>' + '<th style="width:90px">Rol</th>' + '<th style="width:130px">Último acceso</th>' + '<th class="cpv-bbdd-menu-col"></th>' + '</tr></thead>' + '<tbody id="usr-tbody">' + rows + '</tbody>' + '</table>' + '</div>' + modalsHTML();
  }

  /* ════ RENDER LOADING ═══════════════════════════════════════ */
  function renderLoading(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('usuarios', ctx.md) : '';
    var rows = Array(8).fill(0).map(function () {
      return '<tr class="cpv-bbdd-skrow">' + '<td><span class="skeleton" style="width:60%"></span></td>' + '<td><span class="skeleton" style="width:75%"></span></td>' + '<td><span class="skeleton" style="width:50px"></span></td>' + '<td><span class="skeleton" style="width:60px"></span></td>' + '<td></td></tr>';
    }).join('');
    return '<div class="page-header"><div class="page-header-left">' + '<span class="skeleton sk-text-sm" style="width:100px;display:block;margin-bottom:8px"></span>' + '<span class="skeleton" style="width:220px;height:30px;display:block"></span>' + '</div></div>' + nav + '<div class="table-wrap"><table class="table-dense">' + '<thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Último acceso</th><th></th></tr></thead>' + '<tbody>' + rows + '</tbody></table></div>';
  }

  /* ════ RENDER EMPTY / ERROR ═════════════════════════════════ */
  function renderEmpty(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('usuarios', ctx.md) : '';
    return pageHeader(0) + nav + '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:group" width="32"></iconify-icon>' + '<h2 class="state-title">Sin usuarios</h2>' + '<button class="btn btn-primary btn-sm" id="usr-new-btn">' + '<iconify-icon icon="iconoir:plus" width="14"></iconify-icon>Nuevo usuario</button>' + '</div></div>' + modalsHTML();
  }
  function renderError(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('usuarios', ctx.md) : '';
    return pageHeader(0) + nav + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">Error al cargar usuarios</h2>' + '<button class="btn btn-primary btn-sm" data-action="retry">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ════ MOUNTED ══════════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    teardown();
    if (state !== 'default' && state !== 'empty') return;
    var md = ctx.md;

    /* Row menu buttons */
    root.querySelectorAll('[data-menu-user]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openMenu(btn, parseInt(btn.getAttribute('data-menu-user'), 10), md, ctx);
      });
    });

    /* Modal close buttons (generic) */
    root.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var m = root.querySelector('#' + btn.getAttribute('data-modal-close'));
        if (m) m.style.display = 'none';
      });
    });
    root.querySelectorAll('.modal-overlay').forEach(function (ov) {
      ov.addEventListener('click', function (e) {
        if (e.target === ov) ov.style.display = 'none';
      });
    });

    /* Nuevo usuario — abrir */
    var newBtn = root.querySelector('#usr-new-btn');
    if (newBtn) newBtn.addEventListener('click', function () {
      var m = root.querySelector('#usr-modal-new');
      if (m) {
        m.style.display = 'flex';
        var nb = m.querySelector('#new-nombre');
        if (nb) nb.value = '';
        var eb = m.querySelector('#new-email');
        if (eb) eb.value = '';
        var rb = m.querySelector('input[name="new-rol"][value="user"]');
        if (rb) rb.checked = true;
      }
    });

    /* Nuevo usuario — confirmar */
    var newConfirm = root.querySelector('#new-usr-confirm');
    if (newConfirm) newConfirm.addEventListener('click', function () {
      var nombre = (root.querySelector('#new-nombre') || {}).value || '';
      var email = (root.querySelector('#new-email') || {}).value || '';
      if (!nombre.trim() || !email.trim()) {
        ctx.toast('error', 'Campos requeridos', 'Completa nombre y email antes de continuar.');
        return;
      }
      root.querySelector('#usr-modal-new').style.display = 'none';
      ctx.toast('success', 'Usuario creado', 'Email de bienvenida enviado a ' + email + '.');
    });

    /* Editar — confirmar */
    var editConfirm = root.querySelector('#edit-usr-confirm');
    if (editConfirm) editConfirm.addEventListener('click', function () {
      root.querySelector('#usr-modal-edit').style.display = 'none';
      ctx.toast('success', 'Cambios guardados', 'Los datos del usuario se han actualizado.');
    });

    /* Eliminar — confirmar */
    var delConfirm = root.querySelector('#del-usr-confirm');
    if (delConfirm) delConfirm.addEventListener('click', function () {
      root.querySelector('#usr-modal-del').style.display = 'none';
      ctx.toast('success', 'Usuario eliminado', 'La cuenta ha sido eliminada del sistema.');
    });

    /* Cierre de menú al click fuera */
    _outsideH = function (e) {
      if (!e.target.closest('.cpv-row-menu') && !e.target.closest('[data-menu-user]')) closeMenu();
    };
    document.addEventListener('click', _outsideH);
  }

  /* ── register ─────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/admin/usuarios'] = {
    render: function (state, ctx) {
      if (state === 'loading') return renderLoading(ctx);
      if (state === 'empty') return renderEmpty(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/admin-usuarios.js", error: String((e && e.message) || e) }); }

// coopervision/views/bbdd.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/bbdd.js — V4 Base de datos
   Registra window.cpvViews['/bbdd']. Tabla densa sobre opticas_google
   (LEFT JOIN opticas_cpv para is_client + datos comerciales en admin)
   con overrides aplicados on top. Búsqueda (debounce 300ms), filtros
   (popover + selects rápidos), orden por columna, paginación 20/pág,
   exportación CSV. Toda la interacción es funcional sobre los 40 mock.
   Click fila → drawer V5 (Lote 3): por ahora toast informativo.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── formato es-ES manual (igual que resumen/bi/mapa) ───────── */
  const group = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const fmtInt = n => group(String(Math.round(Math.abs(n))));
  function fmtDec(n, d) {
    const f = Math.abs(Number(n)).toFixed(d),
      p = f.split('.');
    return group(p[0]) + (p[1] ? ',' + p[1] : '');
  }
  function fmtCompact(n) {
    if (n >= 1e6) return fmtDec(n / 1e6, 1).replace(',0', '') + 'M';
    if (n >= 1e3) return fmtDec(n / 1e3, 1).replace(',0', '') + 'k';
    return fmtInt(n);
  }
  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function debounce(fn, ms) {
    let t;
    return function () {
      const a = arguments,
        c = this;
      clearTimeout(t);
      t = setTimeout(() => fn.apply(c, a), ms);
    };
  }
  const PAGE_SIZE = 20;

  /* ── estado del módulo (instancia única por vista) ──────────── */
  const initFilters = () => ({
    q: '',
    provincia: '',
    categoria: '',
    tipo: 'todas',
    cadena: '',
    pais: 'todos',
    estados: [],
    showCore: false,
    showMiopia: false,
    minRating: 0,
    conOverrides: false
  });
  let _filters = initFilters();
  let _sort = {
    by: null,
    dir: 'asc'
  };
  let _page = 1;
  let _menuEl = null; // menú flotante ⋯ (en body)
  let _menuPid = null;
  let _outsideHandler = null;

  /* ── columnas (DRY para thead + filas) ──────────────────────── */
  const COLS = [{
    key: 'name',
    label: 'Nombre',
    sortable: true,
    cls: 'col-sticky'
  }, {
    key: 'city',
    label: 'Ciudad',
    sortable: true
  }, {
    key: 'provincia',
    label: 'Provincia',
    sortable: true
  }, {
    key: 'cadena',
    label: 'Cadena',
    sortable: true,
    cls: 'col-1440'
  }, {
    key: 'tipo',
    label: 'Tipo',
    sortable: true
  }, {
    key: 'rating',
    label: 'Valoración',
    sortable: true,
    align: 'right'
  }, {
    key: 'reviews',
    label: 'Reseñas',
    sortable: true,
    align: 'right'
  }, {
    key: 'web',
    label: 'Web',
    sortable: false,
    cls: 'col-1440',
    align: 'center'
  }, {
    key: 'tel',
    label: 'Tel',
    sortable: false,
    cls: 'col-1440',
    align: 'center'
  }, {
    key: 'booking',
    label: 'Gestor de cita',
    sortable: false,
    cls: 'col-1440',
    align: 'center'
  }, {
    key: 'email',
    label: 'Email',
    sortable: false,
    cls: 'col-1600',
    align: 'center'
  }, {
    key: 'estado',
    label: 'Estado',
    sortable: true,
    cls: 'col-admin'
  }, {
    key: 'menu',
    label: '',
    sortable: false,
    cls: 'cpv-bbdd-menu-col'
  }];

  /* ── normaliza filas: google + overrides + join cpv/cadena/app ── */
  function buildRows(md) {
    return md.opticas_google.map(g => {
      const eff = md.helpers.aplica_overrides_google(g.place_id) || g;
      const client = md.helpers.is_client(g.place_id);
      const cpv = md.helpers.cpv_de(g.place_id);
      const cadena = md.helpers.cadena_de(g.place_id);
      const app = md.helpers.app_data_de(g.place_id);
      const ov = md.helpers.overrides_de(g.place_id);
      return {
        place_id: g.place_id,
        name: eff.name,
        city: g.city,
        provincia: g.state,
        country: g.country_code,
        cadena: cadena ? cadena.nombre : null,
        client,
        categoria: g.category,
        rating: g.rating,
        reviews: g.reviews,
        website: eff.website || null,
        phone: eff.phone || null,
        email: client && cpv && cpv.EMAIL ? cpv.EMAIL : null,
        booking: g.booking_appointment_link || null,
        address: eff.address || g.address,
        showCore: !!(app && app.show_campañas_core),
        showMiopia: !!(app && app.show_campañas_miopia),
        hasOverrides: ov.length > 0,
        estado: client ? 'Vinculado' : 'Solo Google'
      };
    });
  }

  /* ── opciones únicas para selects/filtros ───────────────────── */
  function uniq(arr) {
    return Array.from(new Set(arr.filter(Boolean))).sort((a, b) => a.localeCompare(b, 'es'));
  }

  /* ── aplica filtros ─────────────────────────────────────────── */
  function applyFilters(rows, f) {
    const q = (f.q || '').trim().toLowerCase();
    return rows.filter(r => {
      if (f.provincia && r.provincia !== f.provincia) return false;
      if (f.pais !== 'todos' && r.country !== f.pais) return false;
      if (f.categoria && r.categoria !== f.categoria) return false;
      if (f.tipo === 'cliente' && !r.client) return false;
      if (f.tipo === 'otra' && r.client) return false;
      if (f.cadena && r.cadena !== f.cadena) return false;
      if (f.estados.length && f.estados.indexOf(r.estado) === -1) return false;
      if (f.showCore && !r.showCore) return false;
      if (f.showMiopia && !r.showMiopia) return false;
      if (r.rating < f.minRating) return false;
      if (f.conOverrides && !r.hasOverrides) return false;
      if (q) {
        const hay = (r.name + ' ' + r.city + ' ' + r.provincia + ' ' + r.address).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  /* ── ordena ─────────────────────────────────────────────────── */
  function applySort(rows, s) {
    if (!s.by) return rows;
    const dir = s.dir === 'desc' ? -1 : 1;
    const num = {
      rating: 1,
      reviews: 1
    };
    const val = r => {
      if (s.by === 'tipo') return r.client ? 1 : 0;
      if (s.by === 'cadena') return r.cadena || '\uffff';
      return r[s.by];
    };
    return rows.slice().sort((a, b) => {
      const va = val(a),
        vb = val(b);
      if (num[s.by] || s.by === 'tipo') return (va - vb) * dir;
      return String(va).localeCompare(String(vb), 'es') * dir;
    });
  }

  /* ── nº de grupos de filtro activos (badge) ─────────────────── */
  function activeCount(f) {
    let n = 0;
    if (f.provincia) n++;
    if (f.pais !== 'todos') n++;
    if (f.categoria) n++;
    if (f.tipo !== 'todas') n++;
    if (f.cadena) n++;
    if (f.estados.length) n++;
    if (f.showCore) n++;
    if (f.showMiopia) n++;
    if (f.minRating > 0) n++;
    if (f.conOverrides) n++;
    return n;
  }

  /* ════ THEAD ════ */
  function theadHTML() {
    return '<thead><tr>' + COLS.map(c => {
      const cls = [c.cls || '', c.sortable ? 'sortable' : ''].filter(Boolean).join(' ');
      const align = c.align === 'right' ? ' style="text-align:right"' : c.align === 'center' ? ' style="text-align:center"' : '';
      const attr = c.sortable ? ' data-sort-key="' + c.key + '"' : '';
      const icon = c.sortable ? '<span class="sort-icon"><iconify-icon icon="iconoir:sort" width="13"></iconify-icon></span>' : '';
      return '<th' + (cls ? ' class="' + cls + '"' : '') + align + attr + '>' + enc(c.label) + icon + '</th>';
    }).join('') + '</tr></thead>';
  }

  /* ════ CELDA por clave ════ */
  function presence(ok, icon) {
    return ok ? '<span class="cpv-presence yes"><iconify-icon icon="iconoir:' + icon + '" width="15"></iconify-icon></span>' : '<span class="cpv-presence no"><iconify-icon icon="iconoir:minus-circle" width="15"></iconify-icon></span>';
  }
  function cell(r, key) {
    switch (key) {
      case 'name':
        {
          const pencil = r.hasOverrides ? '<span class="cpv-bbdd-edit" title="Tiene correcciones manuales"><iconify-icon icon="iconoir:edit-pencil" width="12"></iconify-icon></span>' : '';
          return '<td class="col-sticky"><span class="cpv-bbdd-name">' + '<span class="cpv-bbdd-name-txt">' + enc(r.name) + '</span>' + pencil + '</span></td>';
        }
      case 'city':
        return '<td class="c-ink2">' + enc(r.city) + '</td>';
      case 'provincia':
        return '<td class="c-ink2">' + enc(r.provincia) + '</td>';
      case 'cadena':
        return '<td class="col-1440">' + (r.cadena ? enc(r.cadena) : '<span class="cpv-bbdd-cadena-empty">—</span>') + '</td>';
      case 'tipo':
        return '<td>' + (r.client ? '<span class="pill pill-accent pill-sm"><iconify-icon icon="iconoir:verified-badge" width="11"></iconify-icon>Cliente</span>' : '<span class="pill pill-paused pill-sm">Otra</span>') + '</td>';
      case 'rating':
        return '<td class="tnum" style="text-align:right"><span class="cpv-star">★</span> ' + fmtDec(r.rating, 2) + '</td>';
      case 'reviews':
        return '<td class="tnum c-muted" style="text-align:right">' + fmtCompact(r.reviews) + '</td>';
      case 'web':
        return '<td class="col-1440" style="text-align:center">' + presence(!!r.website, 'globe') + '</td>';
      case 'tel':
        return '<td class="col-1440" style="text-align:center">' + presence(!!r.phone, 'phone') + '</td>';
      case 'email':
        return '<td class="col-1600" style="text-align:center">' + presence(!!r.email, 'mail') + '</td>';
      case 'booking':
        return '<td class="col-1440" style="text-align:center">' + (r.booking ? '<a class="cpv-bbdd-booking-link" href="' + enc(r.booking) + '" target="_blank" rel="noopener" title="Abrir gestor de cita" aria-label="Abrir gestor de cita"><iconify-icon icon="iconoir:calendar" width="16"></iconify-icon></a>' : '<span class="cpv-bbdd-cadena-empty">—</span>') + '</td>';
      case 'estado':
        return '<td class="col-admin">' + (r.client ? '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Vinculado</span>' : '<span class="pill pill-neutral pill-sm">Solo Google</span>') + '</td>';
      case 'menu':
        return '<td class="cpv-bbdd-menu-col">' + '<button class="cpv-bbdd-menu-btn" data-menu-pid="' + enc(r.place_id) + '" aria-label="Acciones" aria-haspopup="true">' + '<iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button></td>';
      default:
        return '<td></td>';
    }
  }
  function rowHTML(r) {
    return '<tr data-place-id="' + enc(r.place_id) + '" data-action="open-detalle">' + COLS.map(c => cell(r, c.key)).join('') + '</tr>';
  }

  /* ════ FILTER POPOVER ════ */
  function selectOptions(opts, sel) {
    return '<option value="">Todas</option>' + opts.map(o => '<option value="' + enc(o) + '"' + (o === sel ? ' selected' : '') + '>' + enc(o) + '</option>').join('');
  }
  function filterPopHTML(md, role, opts) {
    const f = _filters;
    const adminEstado = role === 'admin' ? '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Estado de vínculo</span>' + '<div class="cpv-filter-check-row">' + ['Vinculado', 'Solo Google'].map(e => '<label class="checkbox-wrap"><input type="checkbox" class="checkbox" data-filter-estado="' + e + '"' + (f.estados.indexOf(e) > -1 ? ' checked' : '') + '><span class="toggle-text">' + e + '</span></label>').join('') + '</div></div>' : '';
    const adminOverrides = role === 'admin' ? '<div class="cpv-filter-sec"><label class="checkbox-wrap"><input type="checkbox" class="checkbox" id="cpv-f-overrides"' + (f.conOverrides ? ' checked' : '') + '><span class="toggle-text">Solo con correcciones manuales</span></label></div>' : '';
    return '<div class="cpv-filter-pop" id="cpv-filter-pop">' + '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Provincia</span>' + '<select class="select select-sm" id="cpv-f-provincia">' + selectOptions(opts.provincias, f.provincia) + '</select></div>' + '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Categoría</span>' + '<select class="select select-sm" id="cpv-f-categoria">' + selectOptions(opts.categorias, f.categoria) + '</select></div>' + '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Tipo de óptica</span>' + '<div class="cpv-filter-radio-row inline">' + [['todas', 'Todas'], ['cliente', 'Cliente'], ['otra', 'Otra']].map(t => '<label class="radio-wrap"><input type="radio" name="cpv-f-tipo" class="radio" value="' + t[0] + '"' + (f.tipo === t[0] ? ' checked' : '') + '><span class="toggle-text">' + t[1] + '</span></label>').join('') + '</div></div>' + '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Cadena</span>' + '<select class="select select-sm" id="cpv-f-cadena">' + selectOptions(opts.cadenas, f.cadena) + '</select></div>' + adminEstado + '<div class="cpv-filter-sec"><span class="cpv-filter-sec-label">Campañas activas</span>' + '<div class="cpv-filter-check-row">' + '<label class="checkbox-wrap"><input type="checkbox" class="checkbox" id="cpv-f-core"' + (f.showCore ? ' checked' : '') + '><span class="toggle-text">Mostrar Core</span></label>' + '<label class="checkbox-wrap"><input type="checkbox" class="checkbox" id="cpv-f-miopia"' + (f.showMiopia ? ' checked' : '') + '><span class="toggle-text">Mostrar Control de Miopía</span></label>' + '</div></div>' + '<div class="cpv-filter-sec"><div class="cpv-filter-slider-head"><span class="cpv-filter-sec-label">Valoración mínima</span>' + '<span class="cpv-filter-slider-val" id="cpv-f-rating-val">' + (f.minRating === 0 ? 'Todas' : fmtDec(f.minRating, 1) + ' ★') + '</span></div>' + '<input type="range" class="slider" id="cpv-f-rating" min="0" max="5" step="0.5" value="' + f.minRating + '"></div>' + adminOverrides + '<div class="cpv-filter-foot">' + '<button class="btn btn-ghost btn-sm" id="cpv-f-clear">Limpiar todo</button>' + '<button class="btn btn-primary btn-sm" id="cpv-f-apply">Aplicar</button>' + '</div></div>';
  }

  /* ════ CHIPS ════ */
  function chip(key, label) {
    return '<span class="chip"><span class="chip-label">' + enc(label) + '</span>' + '<button class="chip-remove" data-chip="' + enc(key) + '" aria-label="Quitar filtro">' + '<iconify-icon icon="iconoir:xmark" width="13"></iconify-icon></button></span>';
  }
  function chipsHTML(f) {
    const chips = [];
    if (f.provincia) chips.push(chip('provincia', 'Provincia: ' + f.provincia));
    if (f.pais !== 'todos') chips.push(chip('pais', 'País: ' + (f.pais === 'PT' ? 'Portugal' : 'España')));
    if (f.categoria) chips.push(chip('categoria', 'Categoría: ' + f.categoria));
    if (f.tipo !== 'todas') chips.push(chip('tipo', 'Tipo: ' + (f.tipo === 'cliente' ? 'Cliente' : 'Otra')));
    if (f.cadena) chips.push(chip('cadena', 'Cadena: ' + f.cadena));
    f.estados.forEach(e => chips.push(chip('estado:' + e, 'Estado: ' + e)));
    if (f.showCore) chips.push(chip('showCore', 'Campaña: Core'));
    if (f.showMiopia) chips.push(chip('showMiopia', 'Campaña: Miopía'));
    if (f.minRating > 0) chips.push(chip('minRating', '★ ≥ ' + fmtDec(f.minRating, 1)));
    if (f.conOverrides) chips.push(chip('conOverrides', 'Con correcciones'));
    if (!chips.length) return '';
    return '<div class="cpv-bbdd-chips" id="cpv-bbdd-chips">' + '<span class="cpv-bbdd-chips-label">Filtros</span>' + chips.join('') + '<button class="cpv-bbdd-clear-all" id="cpv-chips-clear">Limpiar todo</button></div>';
  }

  /* ════ PAGINACIÓN (numerada con elipsis) ════ */
  function pageList(cur, total) {
    if (total <= 7) {
      const a = [];
      for (let i = 1; i <= total; i++) a.push(i);
      return a;
    }
    const out = [1];
    const lo = Math.max(2, cur - 1),
      hi = Math.min(total - 1, cur + 1);
    if (lo > 2) out.push('…');
    for (let i = lo; i <= hi; i++) out.push(i);
    if (hi < total - 1) out.push('…');
    out.push(total);
    return out;
  }
  function paginationHTML(cur, totalRows) {
    const totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE));
    const from = totalRows === 0 ? 0 : (cur - 1) * PAGE_SIZE + 1;
    const to = Math.min(cur * PAGE_SIZE, totalRows);
    const btns = pageList(cur, totalPages).map(p => p === '…' ? '<span class="page-ellipsis">…</span>' : '<button class="page-btn' + (p === cur ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>').join('');
    return '<div class="pagination-info">Mostrando <b>' + fmtInt(from) + '–' + fmtInt(to) + '</b> de <b>' + fmtInt(totalRows) + '</b> ópticas</div>' + '<div class="pagination">' + '<button class="page-btn" data-page="prev"' + (cur <= 1 ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon></button>' + btns + '<button class="page-btn" data-page="next"' + (cur >= totalPages ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-right" width="15"></iconify-icon></button>' + '</div>';
  }

  /* ════ RENDER · DEFAULT ════ */
  function renderDefault(ctx) {
    const md = ctx.md,
      role = ctx.role;
    const rows = buildRows(md);
    const opts = {
      provincias: uniq(rows.map(r => r.provincia)),
      categorias: uniq(rows.map(r => r.categoria)),
      cadenas: uniq(rows.map(r => r.cadena))
    };
    const header = '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Base de datos</h1>' + '<p class="page-subtitle">' + fmtInt(rows.length) + ' ópticas · Última sincronización hace ' + md.dias_desde_ultima_sync + ' días</p>' + '</div><div class="page-header-right">' + '<button class="btn btn-ghost btn-sm" id="cpv-export"><iconify-icon icon="iconoir:download" width="15"></iconify-icon>Exportar CSV</button>' + '</div></div>';
    const toolbar = '<div class="cpv-bbdd-toolbar">' + '<div class="input-wrap">' + '<span class="input-icon"><iconify-icon icon="iconoir:search" width="16"></iconify-icon></span>' + '<input class="input input-sm" id="cpv-bbdd-q" type="text" placeholder="Buscar óptica, ciudad o provincia…" autocomplete="off" value="' + enc(_filters.q) + '">' + '<span class="input-suffix" id="cpv-bbdd-q-clear" style="display:' + (_filters.q ? 'flex' : 'none') + '"><iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></span>' + '</div>' + '<div class="dropdown-wrap cpv-filter-trigger">' + '<button class="btn btn-ghost btn-sm" id="cpv-filter-btn" aria-haspopup="true" aria-expanded="false">' + '<iconify-icon icon="iconoir:filter" width="15"></iconify-icon>Filtros' + '<span class="cpv-filter-badge" id="cpv-filter-badge" style="display:none">0</span>' + '</button>' + filterPopHTML(md, role, opts) + '</div>' + '<div class="cpv-bbdd-quick">' + '<div class="cpv-bbdd-quick-field"><span class="cpv-bbdd-quick-label">Tipo</span>' + '<select class="select select-sm" id="cpv-q-tipo">' + '<option value="todas"' + (_filters.tipo === 'todas' ? ' selected' : '') + '>Todas</option>' + '<option value="cliente"' + (_filters.tipo === 'cliente' ? ' selected' : '') + '>Cliente</option>' + '<option value="otra"' + (_filters.tipo === 'otra' ? ' selected' : '') + '>Otra</option>' + '</select></div>' + '<div class="cpv-bbdd-quick-field"><span class="cpv-bbdd-quick-label">Provincia</span>' + '<select class="select select-sm" id="cpv-q-provincia">' + selectOptions(opts.provincias, _filters.provincia) + '</select></div>' + '<div class="cpv-bbdd-quick-field"><span class="cpv-bbdd-quick-label">País</span>' + '<select class="select select-sm" id="cpv-q-pais">' + '<option value="todos"' + (_filters.pais === 'todos' ? ' selected' : '') + '>Todos</option>' + '<option value="ES"' + (_filters.pais === 'ES' ? ' selected' : '') + '>España</option>' + '<option value="PT"' + (_filters.pais === 'PT' ? ' selected' : '') + '>Portugal</option>' + '</select></div>' + '</div>' + '</div>';
    const card = '<div class="card cpv-bbdd-card">' + toolbar + '<div id="cpv-bbdd-chips-slot"></div>' + '<div class="table-wrap cpv-bbdd-tablewrap">' + '<table class="table-dense cpv-bbdd-table">' + theadHTML() + '<tbody id="cpv-bbdd-tbody"></tbody></table>' + '</div>' + '<div class="pagination-wrap cpv-bbdd-pagination" id="cpv-bbdd-pagination"></div>' + '</div>';
    return header + card;
  }

  /* ════ RENDER · LOADING ════ */
  function renderLoading() {
    let rows = '';
    for (let i = 0; i < PAGE_SIZE; i++) {
      const w = [62, 46, 40, 0, 0, 0, 0][0];
      rows += '<tr class="cpv-bbdd-skrow">' + '<td class="col-sticky"><span class="skeleton" style="width:' + (54 + i % 4 * 8) + '%"></span></td>' + '<td><span class="skeleton" style="width:60%"></span></td>' + '<td><span class="skeleton" style="width:55%"></span></td>' + '<td class="col-1440"><span class="skeleton" style="width:50%"></span></td>' + '<td><span class="skeleton" style="width:46px"></span></td>' + '<td style="text-align:right"><span class="skeleton" style="width:36px;margin-left:auto"></span></td>' + '<td style="text-align:right"><span class="skeleton" style="width:30px;margin-left:auto"></span></td>' + '<td class="col-1440" style="text-align:center"><span class="skeleton" style="width:15px;margin:0 auto"></span></td>' + '<td class="col-1440" style="text-align:center"><span class="skeleton" style="width:15px;margin:0 auto"></span></td>' + '<td class="col-1440" style="text-align:center"><span class="skeleton" style="width:15px;margin:0 auto"></span></td>' + '<td class="col-1600" style="text-align:center"><span class="skeleton" style="width:15px;margin:0 auto"></span></td>' + '<td class="col-admin"><span class="skeleton" style="width:60%"></span></td>' + '<td class="cpv-bbdd-menu-col"></td>' + '</tr>';
    }
    const header = '<div class="page-header"><div class="page-header-left">' + '<span class="skeleton sk-text-sm" style="width:80px"></span>' + '<span class="skeleton" style="width:220px;height:30px;margin-top:8px"></span>' + '<span class="skeleton sk-text-sm" style="width:300px;margin-top:8px"></span></div>' + '<div class="page-header-right"><span class="skeleton" style="width:130px;height:30px"></span></div></div>';
    const toolbar = '<div class="cpv-bbdd-toolbar">' + '<span class="skeleton" style="width:320px;height:32px"></span>' + '<span class="skeleton" style="width:88px;height:32px"></span>' + '<span class="skeleton" style="width:300px;height:32px;margin-left:auto"></span></div>';
    return header + '<div class="card cpv-bbdd-card">' + toolbar + '<div class="table-wrap cpv-bbdd-tablewrap">' + '<table class="table-dense cpv-bbdd-table">' + theadHTML() + '<tbody>' + rows + '</tbody></table></div>' + '<div class="pagination-wrap cpv-bbdd-pagination">' + '<span class="skeleton sk-text-sm" style="width:180px"></span>' + '<span class="skeleton" style="width:200px;height:32px"></span></div></div>';
  }

  /* ════ RENDER · EMPTY (BBDD vacía) ════ */
  function renderEmpty(ctx) {
    const adminCTA = ctx.role === 'admin' ? '<a class="btn btn-primary btn-sm" href="#/admin/operaciones"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Lanzar primera sincronización</a>' : '';
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'sin datos disponibles') + '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:database-xmark" width="32"></iconify-icon>' + '<h2 class="state-title">Sin ópticas</h2>' + '<p class="state-body">No hay ninguna óptica en la base de datos todavía. ' + (ctx.role === 'admin' ? 'Lanza la primera sincronización para poblarla.' : 'Un administrador debe lanzar la primera sincronización.') + '</p>' + adminCTA + '</div></div>';
  }

  /* ════ RENDER · ERROR ════ */
  function renderError(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'error al cargar') + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">No se pudo cargar la base de datos</h2>' + '<p class="state-body">Ha ocurrido un error al recuperar los registros. Inténtalo de nuevo.</p>' + '<button class="btn btn-primary btn-sm" data-action="retry"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ── parseo de query params del hash (deep-link desde V1/V2) ── */
  function readParams() {
    const h = location.hash || '';
    const qi = h.indexOf('?');
    if (qi === -1) return;
    const sp = new URLSearchParams(h.slice(qi + 1));
    if (sp.get('q')) _filters.q = sp.get('q');
    if (sp.get('provincia')) _filters.provincia = sp.get('provincia');
    if (sp.get('categoria')) _filters.categoria = sp.get('categoria');
    const tipo = sp.get('tipo');
    if (tipo === 'cliente' || tipo === 'no_cliente' || tipo === 'otra') _filters.tipo = tipo === 'cliente' ? 'cliente' : 'otra';
    if (sp.get('cadena')) _filters.cadena = sp.get('cadena');
    const mr = parseFloat(sp.get('min_rating'));
    if (!isNaN(mr)) _filters.minRating = mr;
    const ob = sp.get('orderBy');
    if (ob && COLS.some(c => c.key === ob && c.sortable)) {
      _sort.by = ob;
      _sort.dir = sp.get('order') === 'desc' ? 'desc' : 'asc';
    }
  }

  /* ════ MOUNTED ════ */
  function mounted(root, state, ctx) {
    teardownMenu();
    if (state !== 'default') return;
    const md = ctx.md,
      role = ctx.role;
    const allRows = buildRows(md);
    const tbody = root.querySelector('#cpv-bbdd-tbody');
    const chipsSlot = root.querySelector('#cpv-bbdd-chips-slot');
    const pagEl = root.querySelector('#cpv-bbdd-pagination');
    const badge = root.querySelector('#cpv-filter-badge');
    const thead = root.querySelector('.cpv-bbdd-table thead');

    /* ── núcleo: recalcula y pinta tbody + chips + paginación ── */
    function getProcessed() {
      return applySort(applyFilters(allRows, _filters), _sort);
    }
    function refresh(opts) {
      if (opts && opts.resetPage) _page = 1;
      const processed = getProcessed();
      const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
      if (_page > totalPages) _page = totalPages;
      const slice = processed.slice((_page - 1) * PAGE_SIZE, _page * PAGE_SIZE);
      if (processed.length === 0) {
        const span = COLS.length;
        tbody.innerHTML = '<tr><td colspan="' + span + '"><div class="empty-state cpv-bbdd-tablestate">' + '<iconify-icon class="empty-state-icon" icon="iconoir:search" width="30"></iconify-icon>' + '<h2 class="state-title">Sin resultados</h2>' + '<p class="state-body">No hay ópticas con esos filtros.</p>' + '<button class="btn btn-ghost btn-sm" data-action="bbdd-clear">Limpiar filtros</button></div></td></tr>';
      } else {
        tbody.innerHTML = slice.map(rowHTML).join('');
      }
      chipsSlot.innerHTML = chipsHTML(_filters);
      pagEl.innerHTML = paginationHTML(_page, processed.length);
      const n = activeCount(_filters);
      badge.textContent = n;
      badge.style.display = n ? 'inline-flex' : 'none';

      // sort icons
      thead.querySelectorAll('th[data-sort-key]').forEach(th => {
        const key = th.getAttribute('data-sort-key');
        const ic = th.querySelector('.sort-icon iconify-icon');
        if (_sort.by === key) {
          th.classList.add('sorted');
          ic.setAttribute('icon', _sort.dir === 'asc' ? 'iconoir:nav-arrow-up' : 'iconoir:nav-arrow-down');
        } else {
          th.classList.remove('sorted');
          ic.setAttribute('icon', 'iconoir:sort');
        }
      });
    }

    /* ── búsqueda (debounce 300ms) + limpiable ── */
    const qInput = root.querySelector('#cpv-bbdd-q');
    const qClear = root.querySelector('#cpv-bbdd-q-clear');
    const onSearch = debounce(() => refresh({
      resetPage: true
    }), 300);
    qInput.addEventListener('input', () => {
      _filters.q = qInput.value;
      qClear.style.display = qInput.value ? 'flex' : 'none';
      onSearch();
    });
    qClear.addEventListener('click', () => {
      qInput.value = '';
      _filters.q = '';
      qClear.style.display = 'none';
      qInput.focus();
      refresh({
        resetPage: true
      });
    });

    /* ── popover de filtros ── */
    const filterBtn = root.querySelector('#cpv-filter-btn');
    const pop = root.querySelector('#cpv-filter-pop');
    function openPop(o) {
      const open = o == null ? !pop.classList.contains('open') : o;
      pop.classList.toggle('open', open);
      filterBtn.setAttribute('aria-expanded', String(open));
    }
    filterBtn.addEventListener('click', e => {
      e.stopPropagation();
      openPop();
    });
    pop.addEventListener('click', e => e.stopPropagation());

    /* sincroniza selects rápidos + popover en ambos sentidos */
    const qTipo = root.querySelector('#cpv-q-tipo');
    const qProvincia = root.querySelector('#cpv-q-provincia');
    const qPais = root.querySelector('#cpv-q-pais');
    function syncControls() {
      qTipo.value = _filters.tipo;
      qProvincia.value = _filters.provincia;
      qPais.value = _filters.pais;
      const fp = root.querySelector('#cpv-f-provincia');
      if (fp) fp.value = _filters.provincia;
      const fc = root.querySelector('#cpv-f-categoria');
      if (fc) fc.value = _filters.categoria;
      const fch = root.querySelector('#cpv-f-cadena');
      if (fch) fch.value = _filters.cadena;
      root.querySelectorAll('input[name="cpv-f-tipo"]').forEach(r => {
        r.checked = r.value === _filters.tipo;
      });
      const fr = root.querySelector('#cpv-f-rating');
      if (fr) {
        fr.value = _filters.minRating;
        root.querySelector('#cpv-f-rating-val').textContent = _filters.minRating === 0 ? 'Todas' : fmtDec(_filters.minRating, 1) + ' ★';
      }
      const fco = root.querySelector('#cpv-f-core');
      if (fco) fco.checked = _filters.showCore;
      const fmi = root.querySelector('#cpv-f-miopia');
      if (fmi) fmi.checked = _filters.showMiopia;
      const fov = root.querySelector('#cpv-f-overrides');
      if (fov) fov.checked = _filters.conOverrides;
      root.querySelectorAll('input[data-filter-estado]').forEach(c => {
        c.checked = _filters.estados.indexOf(c.getAttribute('data-filter-estado')) > -1;
      });
    }

    // selects rápidos: aplicación inmediata
    qTipo.addEventListener('change', () => {
      _filters.tipo = qTipo.value;
      syncControls();
      refresh({
        resetPage: true
      });
    });
    qProvincia.addEventListener('change', () => {
      _filters.provincia = qProvincia.value;
      syncControls();
      refresh({
        resetPage: true
      });
    });
    qPais.addEventListener('change', () => {
      _filters.pais = qPais.value;
      syncControls();
      refresh({
        resetPage: true
      });
    });

    // popover: rating en vivo (preview de valor); el resto se aplica con "Aplicar"
    const fRating = root.querySelector('#cpv-f-rating');
    const fRatingVal = root.querySelector('#cpv-f-rating-val');
    if (fRating) fRating.addEventListener('input', () => {
      fRatingVal.textContent = fRating.value === '0' ? 'Todas' : fmtDec(parseFloat(fRating.value), 1) + ' ★';
    });
    root.querySelector('#cpv-f-apply').addEventListener('click', () => {
      _filters.provincia = root.querySelector('#cpv-f-provincia').value;
      _filters.categoria = root.querySelector('#cpv-f-categoria').value;
      _filters.cadena = root.querySelector('#cpv-f-cadena').value;
      const tr = root.querySelector('input[name="cpv-f-tipo"]:checked');
      _filters.tipo = tr ? tr.value : 'todas';
      _filters.minRating = parseFloat(fRating.value);
      _filters.showCore = root.querySelector('#cpv-f-core').checked;
      _filters.showMiopia = root.querySelector('#cpv-f-miopia').checked;
      const fov = root.querySelector('#cpv-f-overrides');
      _filters.conOverrides = fov ? fov.checked : false;
      _filters.estados = Array.from(root.querySelectorAll('input[data-filter-estado]:checked')).map(c => c.getAttribute('data-filter-estado'));
      syncControls();
      openPop(false);
      refresh({
        resetPage: true
      });
    });
    root.querySelector('#cpv-f-clear').addEventListener('click', () => {
      resetAll();
      openPop(false);
    });

    /* ── chips (delegación) ── */
    chipsSlot.addEventListener('click', e => {
      const rm = e.target.closest('[data-chip]');
      if (rm) {
        removeFilter(rm.getAttribute('data-chip'));
        return;
      }
      if (e.target.closest('#cpv-chips-clear')) {
        resetAll();
      }
    });
    function removeFilter(key) {
      if (key.indexOf('estado:') === 0) {
        const e = key.slice(7);
        _filters.estados = _filters.estados.filter(x => x !== e);
      } else if (key === 'minRating') _filters.minRating = 0;else if (key === 'tipo') _filters.tipo = 'todas';else if (key === 'showCore') _filters.showCore = false;else if (key === 'showMiopia') _filters.showMiopia = false;else if (key === 'conOverrides') _filters.conOverrides = false;else if (key === 'pais') _filters.pais = 'todos';else _filters[key] = '';
      syncControls();
      refresh({
        resetPage: true
      });
    }
    function resetAll() {
      _filters = initFilters();
      qInput.value = '';
      qClear.style.display = 'none';
      syncControls();
      refresh({
        resetPage: true
      });
    }

    /* ── orden por columna (asc → desc → ninguno) ── */
    thead.addEventListener('click', e => {
      const th = e.target.closest('th[data-sort-key]');
      if (!th) return;
      const key = th.getAttribute('data-sort-key');
      if (_sort.by !== key) {
        _sort.by = key;
        _sort.dir = 'asc';
      } else if (_sort.dir === 'asc') _sort.dir = 'desc';else {
        _sort.by = null;
        _sort.dir = 'asc';
      }
      refresh();
    });

    /* ── paginación + estado vacío + filas ── */
    pagEl.addEventListener('click', e => {
      const b = e.target.closest('[data-page]');
      if (!b || b.disabled) return;
      const v = b.getAttribute('data-page');
      const totalPages = Math.max(1, Math.ceil(getProcessed().length / PAGE_SIZE));
      if (v === 'prev') _page = Math.max(1, _page - 1);else if (v === 'next') _page = Math.min(totalPages, _page + 1);else _page = parseInt(v, 10);
      refresh();
      root.querySelector('.cpv-bbdd-tablewrap').scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    tbody.addEventListener('click', e => {
      if (e.target.closest('[data-action="bbdd-clear"]')) {
        resetAll();
        return;
      }
      if (e.target.closest('.cpv-bbdd-menu-btn')) return; // gestionado por delegación global
      if (e.target.closest('.cpv-bbdd-booking-link')) return; // abre el enlace sin abrir el drawer
      const tr = e.target.closest('tr[data-place-id]');
      if (tr) openDetalle(tr.getAttribute('data-place-id'), ctx);
    });

    /* ── menú contextual ⋯ (flotante, anclado al botón) ── */
    tbody.addEventListener('click', e => {
      const btn = e.target.closest('.cpv-bbdd-menu-btn');
      if (!btn) return;
      e.stopPropagation();
      openRowMenu(btn, btn.getAttribute('data-menu-pid'), ctx, allRows);
    });

    /* ── exportar CSV ── */
    root.querySelector('#cpv-export').addEventListener('click', () => exportCSV(getProcessed(), ctx));

    /* ── cierre de overlays al click fuera ── */
    _outsideHandler = e => {
      if (!e.target.closest('.cpv-filter-trigger')) openPop(false);
      if (!e.target.closest('.cpv-row-menu') && !e.target.closest('.cpv-bbdd-menu-btn')) closeRowMenu();
    };
    document.addEventListener('click', _outsideHandler);
    syncControls();
    refresh();
  }

  /* ════ MENÚ CONTEXTUAL FLOTANTE ════ */
  function ensureMenu() {
    if (_menuEl) return _menuEl;
    _menuEl = document.createElement('div');
    _menuEl.className = 'cpv-row-menu';
    document.body.appendChild(_menuEl);
    return _menuEl;
  }
  function closeRowMenu() {
    if (_menuEl) _menuEl.classList.remove('open');
    _menuPid = null;
  }
  function teardownMenu() {
    if (_outsideHandler) {
      document.removeEventListener('click', _outsideHandler);
      _outsideHandler = null;
    }
    if (_menuEl) {
      _menuEl.remove();
      _menuEl = null;
    }
    _menuPid = null;
  }
  function openRowMenu(btn, pid, ctx, allRows) {
    const m = ensureMenu();
    const admin = ctx.role === 'admin';
    if (_menuPid === pid && m.classList.contains('open')) {
      closeRowMenu();
      return;
    }
    _menuPid = pid;
    m.innerHTML = '<button class="dropdown-item" data-rm="detalle"><iconify-icon icon="iconoir:eye" width="16"></iconify-icon>Ver detalle</button>' + '<button class="dropdown-item" data-rm="mapa"><iconify-icon icon="iconoir:map-pin" width="16"></iconify-icon>Ver en mapa</button>' + '<button class="dropdown-item" data-rm="copy"><iconify-icon icon="iconoir:copy" width="16"></iconify-icon>Copiar place_id</button>' + (admin ? '<div class="dropdown-divider"></div>' + '<button class="dropdown-item" data-rm="corregir"><iconify-icon icon="iconoir:edit-pencil" width="16"></iconify-icon>Corregir dato</button>' + '<button class="dropdown-item" data-rm="changelog"><iconify-icon icon="iconoir:clock-rotate-right" width="16"></iconify-icon>Ver changelog</button>' : '');
    // posiciona bajo el botón, alineado a la derecha
    const r = btn.getBoundingClientRect();
    m.classList.add('open');
    const mw = m.offsetWidth || 198;
    let left = r.right - mw;
    if (left < 8) left = 8;
    let top = r.bottom + 4;
    const mh = m.offsetHeight || 180;
    if (top + mh > window.innerHeight - 8) top = r.top - mh - 4;
    m.style.left = left + 'px';
    m.style.top = top + 'px';
    m.onclick = e => {
      const it = e.target.closest('[data-rm]');
      if (!it) return;
      const act = it.getAttribute('data-rm');
      closeRowMenu();
      if (act === 'detalle') openDetalle(pid, ctx);else if (act === 'mapa') {
        location.hash = '#/mapa?optica=' + encodeURIComponent(pid);
      } else if (act === 'copy') copyText(pid, ctx);else if (act === 'corregir') ctx.toast('info', 'Corregir dato', 'El editor de correcciones llega en la ficha de óptica (V5).');else if (act === 'changelog') {
        location.hash = '#/changelog?optica=' + encodeURIComponent(pid);
      }
    };
  }

  /* ── acciones auxiliares ─────────────────────────────────────── */
  function openDetalle(pid, ctx) {
    // Lote 3: abre el drawer V5 (componente global montado en body).
    if (window.cpvDrawer && typeof window.cpvDrawer.open === 'function') {
      window.cpvDrawer.open(pid);
      return;
    }
    const o = ctx.md.opticas_google.find(g => g.place_id === pid);
    ctx.toast('info', 'Ficha de óptica', (o ? o.name + ' · ' : '') + 'la ficha completa (V5) no está disponible.');
  }
  function copyText(text, ctx) {
    const done = () => ctx.toast('success', 'Copiado', 'place_id ' + text + ' en el portapapeles.');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      done();
    } catch (e) {}
  }
  function exportCSV(rows, ctx) {
    const cols = ['place_id', 'name', 'city', 'provincia', 'tipo', 'cadena', 'rating', 'reviews', 'website', 'phone', 'email'];
    const esc = v => {
      const s = v == null ? '' : String(v);
      return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const lines = [cols.join(';')];
    rows.forEach(r => {
      lines.push([r.place_id, r.name, r.city, r.provincia, r.client ? 'Cliente' : 'Otra', r.cadena || '', String(r.rating).replace('.', ','), r.reviews, r.website || '', r.phone || '', r.email || ''].map(esc).join(';'));
    });
    const blob = new Blob(['\ufeff' + lines.join('\r\n')], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'opticas_export_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    ctx.toast('success', 'CSV exportado', fmtInt(rows.length) + ' ópticas · respeta los filtros activos.');
  }

  /* ── registro ──────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/bbdd'] = {
    render(state, ctx) {
      if (state === 'default') {
        _page = 1;
        _filters = initFilters();
        _sort = {
          by: null,
          dir: 'asc'
        };
        readParams();
      }
      if (state === 'loading') return renderLoading();
      if (state === 'empty') return renderEmpty(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/bbdd.js", error: String((e && e.message) || e) }); }

// coopervision/views/bi.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/bi.js — V2 Business Intelligence
   Registra window.cpvViews['/bi']. Scroll vertical largo, 7 secciones
   con nav de anclas sticky. Charts SVG a mano vía cpvCharts.
   Enfoque MIXTO de datos:
     · nube sintética (seeded, ~230 pts) en scatter S4 y cuadrantes S5
       — superpuesta con las 40 ópticas reales (clicables, place_id)
     · datos reales de mockData en rankings y tablas (S3, S6, S7)
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const C = window.cpvCharts;
  const enc = C._enc;

  /* ── formato es-ES manual ──────────────────────────────────── */
  const group = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const fmtInt = n => group(String(Math.round(Math.abs(n))));
  function fmtDec(n, d) {
    const f = Math.abs(Number(n)).toFixed(d),
      p = f.split('.');
    return group(p[0]) + (p[1] ? ',' + p[1] : '');
  }
  function fmtCompact(n) {
    if (n >= 1e6) return fmtDec(n / 1e6, 1).replace(',0', '') + 'M';
    if (n >= 1e3) return fmtDec(n / 1e3, 1).replace(',0', '') + 'k';
    return fmtInt(n);
  }

  /* ── RNG determinista (mulberry32) ─────────────────────────── */
  function rngFrom(seed) {
    return function () {
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* ── nube sintética + reales (cache por sesión de render) ──── */
  let _cloud = null;
  function buildCloud(md) {
    if (_cloud) return _cloud;
    const rng = rngFrom(20260512);
    const rngC = rngFrom(77001); // asignación de país, independiente del resto
    const pts = [];
    // ~230 sintéticos
    for (let i = 0; i < 230; i++) {
      const client = rng() < 0.172;
      let r = (client ? 4.41 : 4.18) + (rng() - 0.5) * 1.15;
      r = Math.max(2.7, Math.min(5, r));
      const mu = client ? 4.25 : 3.45;
      const rev = Math.max(3, Math.round(Math.exp(mu + (rng() - 0.5) * 2.3)));
      const country = rngC() < 0.875 ? 'ES' : 'PT';
      pts.push({
        x: +r.toFixed(2),
        y: rev,
        client: client,
        synthetic: true,
        country: country,
        tip: `<b>${client ? 'Partner' : 'Óptica'}</b> · ${fmtDec(r, 1)}★ · ${fmtInt(rev)} reseñas`
      });
    }
    // 40 reales superpuestas (clicables vía place_id)
    md.opticas_google.forEach(o => {
      const client = md.helpers.is_client(o.place_id);
      pts.push({
        x: o.rating,
        y: o.reviews,
        client: client,
        place_id: o.place_id,
        country: o.country_code,
        tip: `<b>${o.name}</b> · ${fmtDec(o.rating, 1)}★ · ${fmtInt(o.reviews)} reseñas`
      });
    });
    // medias globales (para cuadrantes)
    const mx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
    const my = pts.reduce((s, p) => s + p.y, 0) / pts.length;
    _cloud = {
      pts: pts,
      meanX: mx,
      meanY: my
    };
    return _cloud;
  }
  function cloudByCountry(cloud, country) {
    if (country === 'todos') return cloud.pts;
    return cloud.pts.filter(p => p.country === country.toUpperCase());
  }

  /* ── datos Portugal (fabricados, mismo criterio que resumen_kpis ES) ── */
  const PT_PROVINCIAS = [{
    provincia: 'Lisboa',
    total: 1450,
    clientes: 205
  }, {
    provincia: 'Porto',
    total: 1280,
    clientes: 178
  }, {
    provincia: 'Braga',
    total: 320,
    clientes: 42
  }, {
    provincia: 'Coimbra',
    total: 210,
    clientes: 28
  }, {
    provincia: 'Faro',
    total: 195,
    clientes: 24
  }];
  const PT_CIUDADES_ENGAGEMENT = [{
    ciudad: 'Lisboa',
    reseñas_total: 128325,
    n_opticas: 1450,
    ratio: 88.5
  }, {
    ciudad: 'Porto',
    reseñas_total: 101504,
    n_opticas: 1280,
    ratio: 79.3
  }, {
    ciudad: 'Faro',
    reseñas_total: 18642,
    n_opticas: 195,
    ratio: 95.6
  }, {
    ciudad: 'Braga',
    reseñas_total: 20864,
    n_opticas: 320,
    ratio: 65.2
  }, {
    ciudad: 'Coimbra',
    reseñas_total: 14721,
    n_opticas: 210,
    ratio: 70.1
  }];
  const PT_PROVINCIA_SET = PT_PROVINCIAS.reduce((s, p) => (s[p.provincia] = true, s), {});
  function provinciasByCountry(md, country) {
    if (country === 'es') return md.top_provincias;
    if (country === 'pt') return PT_PROVINCIAS;
    return md.top_provincias.concat(PT_PROVINCIAS).sort((a, b) => b.total - a.total);
  }
  function ciudadesByCountry(md, country) {
    if (country === 'es') return md.top_ciudades_engagement;
    if (country === 'pt') return PT_CIUDADES_ENGAGEMENT;
    return md.top_ciudades_engagement.concat(PT_CIUDADES_ENGAGEMENT).sort((a, b) => b.ratio - a.ratio).slice(0, 10);
  }
  function oportunidadesByCountry(md, country) {
    return provinciasByCountry(md, country).map(p => ({
      ...p,
      no_clientes: p.total - p.clientes,
      pct_partners: (p.clientes / p.total * 100).toFixed(1),
      oportunidad: p.total * (1 - p.clientes / p.total)
    })).sort((a, b) => b.oportunidad - a.oportunidad);
  }
  function countrySeg(id, active) {
    const b = (c, l) => `<button data-c="${c}"${c === active ? ' class="on"' : ''}>${l}</button>`;
    return `<div class="cpv-seg" id="${id}" data-filter="${active}">` + b('es', 'España') + b('pt', 'Portugal') + b('todos', 'Todos') + '</div>';
  }

  /* ── helpers de sección ────────────────────────────────────── */
  const SECTIONS = [{
    id: 'hero',
    n: '1',
    label: 'Hero',
    title: 'Visión ejecutiva'
  }, {
    id: 'competitive',
    n: '2',
    label: 'Competitivo',
    title: 'Partners vs. resto del mercado'
  }, {
    id: 'performers',
    n: '3',
    label: 'Performers',
    title: 'Top performers por score compuesto'
  }, {
    id: 'engagement',
    n: '4',
    label: 'Engagement',
    title: 'Valoración × volumen de reseñas'
  }, {
    id: 'quadrants',
    n: '5',
    label: 'Cuadrantes',
    title: 'Segmentación por cuadrantes'
  }, {
    id: 'digital',
    n: '6',
    label: 'Digital',
    title: 'Presencia digital por provincia'
  }, {
    id: 'opportunities',
    n: '7',
    label: 'Oportunidades',
    title: 'Provincias por oportunidad comercial'
  }];
  function anchorNav() {
    return '<div class="cpv-anchor-nav" id="bi-anchors">' + SECTIONS.map((s, i) => `<a class="cpv-anchor-link${i === 0 ? ' on' : ''}" data-anchor="${s.id}">${s.label}</a>`).join('') + '</div>';
  }
  function sectionHead(s, sub) {
    return '<div class="cpv-section-head">' + `<span class="cpv-section-num">${s.n}</span>` + `<div><h2 class="cpv-section-title">${enc(s.title)}</h2>` + (sub ? `<p class="cpv-section-sub">${enc(sub)}</p>` : '') + '</div></div>';
  }
  const serieLegend = items => '<div class="cpv-serie-legend">' + items.map(it => `<span class="cpv-serie-item"><span class="cpv-serie-dot" style="background:${it.c}"></span>${enc(it.l)}</span>`).join('') + '</div>';

  /* ════ S1 · HERO ════ */
  function s1(md) {
    const k = md.resumen_kpis;
    const s = SECTIONS[0];
    const diff = k.valoracion_media_clientes - k.valoracion_media_no_clientes;
    // establecimientos por provincia (media + extremos) desde top_provincias
    const tp = md.top_provincias;
    const media = Math.round(k.total_opticas / k.n_provincias);
    const card1 = '<div class="card card-accent cpv-hero-kpi">' + '<span class="cpv-kpi-head"><span class="eyebrow-t">Penetración CooperVision</span>' + '<iconify-icon icon="iconoir:star-solid" width="15" style="color:var(--accent-ink-deep)"></iconify-icon></span>' + `<div class="cpv-hero-value">${fmtDec(k.pct_clientes, 1)}%</div>` + `<div class="kpi-subtitle">${fmtInt(k.total_clientes)} partners de ${fmtInt(k.total_opticas)} ópticas</div>` + '</div>';
    const card2 = '<div class="card cpv-hero-kpi">' + '<span class="eyebrow-t">Valoración · partners vs. otros</span>' + `<div class="cpv-hero-vs"><span class="cpv-hero-value">${fmtDec(k.valoracion_media_clientes, 2)}</span>` + `<span class="sub">vs ${fmtDec(k.valoracion_media_no_clientes, 2)}</span></div>` + `<div class="kpi-subtitle"><span class="kpi-delta pos"><iconify-icon icon="iconoir:arrow-up-right" width="13"></iconify-icon>+${fmtDec(diff, 2)}</span> a favor de los partners</div>` + '</div>';
    const card3 = '<div class="card cpv-hero-kpi">' + '<span class="eyebrow-t">Establecimientos por provincia</span>' + `<div class="cpv-hero-value">${fmtInt(media)}</div>` + `<div class="kpi-subtitle">Media · de ${fmtInt(tp[tp.length - 1].total)} (${enc(tp[tp.length - 1].provincia)}) a ${fmtInt(tp[0].total)} (${enc(tp[0].provincia)})</div>` + '</div>';
    return `<section class="cpv-section" id="sec-hero" data-screen-label="S1 Hero">` + sectionHead(s, 'Lectura de 10 segundos del estado de la red.') + '<div class="cpv-hero-grid">' + card1 + card2 + card3 + '</div></section>';
  }

  /* ── S2 · perfil competitivo por país ───────────────────────── */
  const RADAR_AXES = ['Valoración', 'Reseñas', '% Web', '% Teléfono', '% Cita', '% Email'];
  const RADAR_BY_COUNTRY = {
    es: {
      otras: [84, 52, 68, 92, 14, 31],
      partners: [92, 78, 86, 97, 29, 64]
    },
    pt: {
      otras: [79, 45, 72, 89, 11, 38],
      partners: [88, 71, 90, 95, 24, 58]
    },
    todos: {
      otras: [83, 50, 69, 91, 13, 33],
      partners: [91, 76, 87, 96, 27, 62]
    }
  };
  function radarFor(country) {
    const d = RADAR_BY_COUNTRY[country];
    return C.radar({
      size: 300,
      axes: RADAR_AXES,
      series: [{
        name: 'Otras',
        color: '#A8AAAE',
        fill: 'rgba(168,170,174,.16)',
        values: d.otras
      }, {
        name: 'Partners',
        color: '#8FA710',
        fill: 'rgba(197,232,23,.28)',
        values: d.partners
      }]
    });
  }

  /* ── S2 · reparto por franja de valoración, por país ─────────── */
  const GROUPED_BY_COUNTRY = {
    es: {
      labels: ['<3.5', '3.5–3.9', '4.0–4.4', '4.5–5.0'],
      a: [3, 11, 39, 47],
      b: [9, 19, 41, 31]
    },
    pt: {
      labels: ['<3.5', '3.5–3.9', '4.0–4.4', '4.5–5.0'],
      a: [5, 14, 35, 46],
      b: [12, 22, 38, 28]
    },
    todos: {
      labels: ['<3.5', '3.5–3.9', '4.0–4.4', '4.5–5.0'],
      a: [4, 12, 38, 46],
      b: [10, 20, 40, 30]
    }
  };
  function groupedFor(country) {
    const d = GROUPED_BY_COUNTRY[country];
    return C.groupedBars({
      w: 540,
      h: 270,
      fmt: n => fmtDec(n, 0) + '%',
      groups: d.labels.map((label, i) => ({
        label: label,
        a: d.a[i],
        b: d.b[i]
      })),
      tip: (dd, w) => `<b>${dd.label}</b> · ${w === 'a' ? 'Partners' : 'Otras'} ${w === 'a' ? dd.a : dd.b}%`
    });
  }

  /* ════ S2 · COMPETITIVO ════ */
  function s2(md) {
    const s = SECTIONS[1];
    const radar = radarFor('es');
    const grouped = groupedFor('es');
    return `<section class="cpv-section" id="sec-competitive" data-screen-label="S2 Competitivo">` + sectionHead(s, 'Perfil medio normalizado (0–100) y reparto por franja de valoración.') + '<div class="cpv-grid-2">' + '<div class="card"><div class="card-head"><h3 class="display-md" style="margin:0">Perfil competitivo</h3>' + countrySeg('bi-radar-seg', 'es') + '</div>' + '<div class="cpv-chart cpv-chart-radar" id="bi-radar-chart">' + radar + '</div>' + serieLegend([{
      l: 'Partners',
      c: '#C5E817'
    }, {
      l: 'Otras ópticas',
      c: '#A8AAAE'
    }]) + '</div>' + '<div class="card"><div class="card-head"><h3 class="display-md" style="margin:0">Reparto por franja de valoración</h3>' + countrySeg('bi-grouped-seg', 'es') + '</div>' + '<div class="cpv-chart" id="bi-grouped-chart">' + grouped + '</div>' + serieLegend([{
      l: 'Partners',
      c: '#C5E817'
    }, {
      l: 'Otras ópticas',
      c: '#C7C9CD'
    }]) + '</div>' + '</div></section>';
  }

  /* ════ S3 · TOP PERFORMERS ════ */
  function performersRows(md, country) {
    const pool = country === 'todos' ? md.opticas_google : md.opticas_google.filter(o => o.country_code === country.toUpperCase());
    return pool.map(o => ({
      o: o,
      client: md.helpers.is_client(o.place_id),
      cadena: md.helpers.cadena_de(o.place_id),
      score: o.rating * Math.log(1 + o.reviews)
    })).sort((a, b) => b.score - a.score).slice(0, 20);
  }
  function performersTable(scored) {
    if (!scored.length) {
      return '<tr><td colspan="8"><div class="empty-state" style="min-height:160px">' + '<iconify-icon class="empty-state-icon" icon="iconoir:filter-list-xmark" width="26"></iconify-icon>' + '<h2 class="state-title" style="font-size:15px">Sin \u00f3pticas para este pa\u00eds</h2></div></td></tr>';
    }
    const max = scored[0].score;
    return scored.map((r, i) => {
      const pct = r.score / max * 100;
      const badge = r.client ? ' <span class="pill pill-accent pill-sm"><span class="pill-dot"></span>Cliente</span>' : '';
      return `<tr data-place-id="${enc(r.o.place_id)}">` + `<td class="col-sticky cpv-rank">${i + 1}</td>` + `<td><span class="cpv-cell-name">${enc(r.o.name)}</span>${badge}</td>` + `<td class="c-ink2">${enc(r.o.city)}</td>` + `<td class="c-ink2">${r.cadena ? enc(r.cadena.nombre) : '<span class="cpv-bbdd-cadena-empty">—</span>'}</td>` + `<td style="text-align:center">${r.o.booking_appointment_link ? '<a class="cpv-bbdd-booking-link" href="' + enc(r.o.booking_appointment_link) + '" target="_blank" rel="noopener" title="Abrir gestor de cita" aria-label="Abrir gestor de cita"><iconify-icon icon="iconoir:calendar" width="16"></iconify-icon></a>' : '<span class="cpv-bbdd-cadena-empty">—</span>'}</td>` + `<td class="tnum" style="text-align:right"><span class="cpv-star">★</span> ${fmtDec(r.o.rating, 2)}</td>` + `<td class="tnum c-muted" style="text-align:right">${fmtInt(r.o.reviews)}</td>` + `<td><span class="cpv-scorebar"><span class="cpv-scorebar-track"><span class="cpv-scorebar-fill" style="width:${pct.toFixed(0)}%"></span></span>` + `<span class="cpv-scorebar-val">${fmtDec(r.score, 1)}</span></span></td>` + `</tr>`;
    }).join('');
  }
  function s3(md) {
    const s = SECTIONS[2];
    const rows = performersTable(performersRows(md, 'es'));
    return `<section class="cpv-section" id="sec-performers" data-screen-label="S3 Top Performers">` + sectionHead(s, 'Score compuesto = valoración × log(1 + reseñas). Top 20.') + '<div class="cpv-section-filter">' + countrySeg('bi-performers-seg', 'es') + '</div>' + '<div class="card" style="padding:0;overflow:hidden">' + '<div class="table-wrap" style="border:0;border-radius:0;max-height:560px">' + '<table class="table-dense"><thead><tr>' + '<th class="col-sticky" style="width:48px">#</th><th>Óptica</th><th>Ciudad</th><th>Cadena</th>' + '<th style="text-align:center">Gestor de ópticas</th>' + '<th style="text-align:right">Valoración</th><th style="text-align:right">Reseñas</th><th>Score compuesto</th>' + '</tr></thead><tbody id="bi-performers-body">' + rows + '</tbody></table></div></div></section>';
  }

  /* ════ S4 · ENGAGEMENT ════ */
  function scatterFor(cloud, country) {
    const pts = cloudByCountry(cloud, country);
    return {
      html: C.scatter({
        w: 560,
        h: 330,
        xMin: 2.5,
        xMax: 5,
        points: pts,
        xLabel: 'Valoración',
        yLabel: 'Reseñas (escala log)'
      }),
      count: pts.length
    };
  }
  function ciudadHbarFor(md, country) {
    const ciudadesOrd = ciudadesByCountry(md, country).slice().sort((a, b) => b.ratio - a.ratio);
    return C.hbar({
      data: ciudadesOrd,
      label: 'ciudad',
      value: 'ratio',
      accentTop: 3,
      fmt: n => fmtDec(n, 0),
      labelW: 82,
      w: 540,
      rowH: 20,
      gap: 7,
      tip: d => `<b>${d.ciudad}</b> · ${fmtDec(d.ratio, 1)} reseñas/óptica · ${fmtInt(d.reseñas_total)} total`
    });
  }
  function s4(md) {
    const s = SECTIONS[3];
    const cloud = buildCloud(md);
    const sc = scatterFor(cloud, 'es');
    const ciudad = ciudadHbarFor(md, 'es');
    return `<section class="cpv-section" id="sec-engagement" data-screen-label="S4 Engagement">` + sectionHead(s, 'Cada punto es una óptica. En verde, partners CooperVision.') + '<div class="cpv-section-filter">' + countrySeg('bi-engagement-seg', 'es') + '</div>' + '<div class="cpv-grid-2">' + '<div class="card"><div class="card-head"><h3 class="display-md" style="margin:0">Valoración × reseñas</h3>' + '<span class="body-xs c-muted" id="bi-engagement-count">' + fmtInt(sc.count) + ' ópticas</span></div>' + '<div class="cpv-chart" id="bi-scatter-chart">' + sc.html + '</div>' + serieLegend([{
      l: 'Partners',
      c: '#C5E817'
    }, {
      l: 'Otras ópticas',
      c: '#C7C9CD'
    }]) + '</div>' + '<div class="card"><div class="card-head"><h3 class="display-md" style="margin:0">Top ciudades por engagement</h3>' + '<span class="body-xs c-muted">reseñas / óptica</span></div>' + '<div class="cpv-chart" id="bi-ciudad-chart">' + ciudad + '</div></div>' + '</div></section>';
  }

  /* ════ S5 · CUADRANTES ════ */
  function quadCounts(pts, mx, my, filter) {
    const c = {
      tr: 0,
      tl: 0,
      br: 0,
      bl: 0
    };
    pts.forEach(p => {
      if (filter === 'partners' && !p.client) return;
      if (filter === 'otros' && p.client) return;
      const right = p.x >= mx,
        top = p.y >= my;
      if (top && right) c.tr++;else if (top && !right) c.tl++;else if (!top && right) c.br++;else c.bl++;
    });
    return c;
  }
  function s5(md) {
    const s = SECTIONS[4];
    const cloud = buildCloud(md);
    const ptsEs = cloudByCountry(cloud, 'es');
    const yMax = Math.max.apply(null, cloud.pts.map(p => p.y));
    const chart = C.quadrant({
      w: 560,
      h: 360,
      points: ptsEs,
      xMin: 2.5,
      xMax: 5,
      yMin: 0,
      yMax: yMax,
      xMean: cloud.meanX,
      yMean: cloud.meanY,
      labels: {
        tr: 'Stars',
        tl: 'Rising',
        br: 'Hidden gems',
        bl: 'Developing'
      }
    });
    const c = quadCounts(ptsEs, cloud.meanX, cloud.meanY, 'ambos');
    const card = (key, name, desc, cuad) => `<a class="card cpv-quad-card" href="#/bbdd" data-cuadrante="${cuad}">` + `<iconify-icon class="cpv-quad-arrow" icon="iconoir:arrow-right" width="16"></iconify-icon>` + `<span class="cpv-quad-count" data-quad="${key}">${fmtInt(c[key])}</span>` + `<span class="cpv-quad-name">${enc(name)}</span>` + `<span class="cpv-quad-desc">${enc(desc)}</span></a>`;
    const cards = '<div class="cpv-quad-cards" id="bi-quad-cards">' + card('tr', 'Stars', 'Alta valoración · muchas reseñas', 'stars') + card('tl', 'Rising', 'Baja valoración · muchas reseñas', 'rising') + card('br', 'Hidden gems', 'Alta valoración · pocas reseñas', 'hidden') + card('bl', 'Developing', 'Baja valoración · pocas reseñas', 'developing') + '</div>';
    return `<section class="cpv-section" id="sec-quadrants" data-screen-label="S5 Cuadrantes">` + sectionHead(s, 'Divisiones por la valoración y el nº de reseñas medios del mercado.') + '<div class="card"><div class="card-head"><h3 class="display-md" style="margin:0">Mapa de cuadrantes</h3>' + '<div style="display:flex;gap:var(--space-3);flex-wrap:wrap">' + countrySeg('bi-quad-country-seg', 'es') + '<div class="cpv-seg" id="bi-quad-seg" data-filter="ambos">' + '<button data-f="ambos" class="on">Ambos</button>' + '<button data-f="partners">Solo partners</button>' + '<button data-f="otros">Solo otras</button></div></div></div>' + '<div class="cpv-chart" id="bi-quad-chart">' + chart + '</div>' + serieLegend([{
      l: 'Partners',
      c: '#C5E817'
    }, {
      l: 'Otras ópticas',
      c: '#C7C9CD'
    }]) + '</div>' + cards + '</section>';
  }

  /* ════ S6 · PRESENCIA DIGITAL ════ */
  function digitalRows(md, country) {
    const k = md.resumen_kpis;
    // deriva métricas por provincia desde globales con variación determinista;
    // las filas de Portugal parten de una base algo distinta (mercado más pequeño)
    return provinciasByCountry(md, country).map(p => {
      const rng = rngFrom(p.provincia.length * 7919 + p.total);
      const isPt = country === 'pt' || country === 'todos' && PT_PROVINCIA_SET[p.provincia];
      const baseWeb = isPt ? k.pct_con_web - 6 : k.pct_con_web;
      const baseTel = isPt ? k.pct_con_telefono - 3 : k.pct_con_telefono;
      const baseEmail = isPt ? k.pct_con_email - 5 : k.pct_con_email;
      const web = Math.max(40, Math.min(96, baseWeb + (rng() - 0.5) * 22));
      const tel = Math.max(80, Math.min(99, baseTel + (rng() - 0.5) * 10));
      const email = Math.max(18, Math.min(62, baseEmail + (rng() - 0.5) * 26));
      const baseCita = isPt ? k.pct_con_booking - 3 : k.pct_con_booking;
      const cita = Math.max(3, Math.min(42, baseCita + (rng() - 0.5) * 14));
      const comp = web * 0.4 + tel * 0.3 + email * 0.3;
      return {
        provincia: p.provincia,
        total: p.total,
        web: web,
        tel: tel,
        email: email,
        cita: cita,
        comp: comp
      };
    });
  }
  function digitalTable(data) {
    return data.map(d => {
      return `<tr data-provincia="${enc(d.provincia)}">` + `<td class="col-sticky cpv-cell-name">${enc(d.provincia)}</td>` + `<td class="tnum" style="text-align:right">${fmtInt(d.total)}</td>` + `<td class="tnum" style="text-align:right">${fmtDec(d.web, 1)}%</td>` + `<td class="tnum" style="text-align:right">${fmtDec(d.tel, 1)}%</td>` + `<td class="tnum" style="text-align:right">${fmtDec(d.cita, 1)}%</td>` + `<td class="tnum" style="text-align:right">${fmtDec(d.email, 1)}%</td>` + `<td><span class="cpv-prog"><span class="cpv-prog-track"><span class="cpv-prog-fill" style="width:${d.comp.toFixed(0)}%"></span></span>` + `<span class="cpv-prog-val">${fmtDec(d.comp, 0)}%</span></span></td>` + `</tr>`;
    }).join('');
  }
  function s6(md) {
    const s = SECTIONS[5];
    const data = digitalRows(md, 'es');
    const cols = [{
      k: 'provincia',
      l: 'Provincia',
      num: false
    }, {
      k: 'total',
      l: 'Total',
      num: true
    }, {
      k: 'web',
      l: '% Web',
      num: true
    }, {
      k: 'tel',
      l: '% Teléfono',
      num: true
    }, {
      k: 'cita',
      l: '% Cita',
      num: true
    }, {
      k: 'email',
      l: '% Email',
      num: true
    }, {
      k: 'comp',
      l: 'Completitud',
      num: true
    }];
    const ths = cols.map((c, i) => `<th class="sortable${i === 0 ? ' col-sticky' : ''}${c.k === 'comp' ? ' sorted' : ''}" data-sort="${c.k}"${c.num ? ' style="text-align:right"' : ''}>` + `${c.l}<span class="sort-icon"><iconify-icon icon="iconoir:nav-arrow-down" width="13"></iconify-icon></span></th>`).join('');
    return `<section class="cpv-section" id="sec-digital" data-screen-label="S6 Presencia Digital">` + sectionHead(s, 'Cobertura de web, teléfono y email por provincia. Ordenable.') + '<div class="cpv-section-filter">' + countrySeg('bi-digital-seg', 'es') + '</div>' + '<div class="card" style="padding:0;overflow:hidden">' + '<div class="table-wrap" id="bi-digital-wrap" style="border:0;border-radius:0;max-height:520px">' + '<table class="table-dense"><thead><tr>' + ths + '</tr></thead>' + '<tbody id="bi-digital-body">' + digitalTable(data) + '</tbody></table></div></div></section>';
  }

  /* ════ S7 · OPORTUNIDADES ════ */
  function opportunitiesTable(data) {
    const max = Math.max.apply(null, data.map(d => d.oportunidad));
    return data.map((d, i) => {
      const pct = d.oportunidad / max * 100;
      return `<tr data-provincia="${enc(d.provincia)}" data-tipo="no_cliente">` + `<td class="col-sticky cpv-rank">${i + 1}</td>` + `<td class="cpv-cell-name">${enc(d.provincia)}</td>` + `<td class="tnum" style="text-align:right">${fmtInt(d.total)}</td>` + `<td class="tnum" style="text-align:right">${fmtInt(d.clientes)}</td>` + `<td class="tnum c-muted" style="text-align:right">${fmtDec(parseFloat(d.pct_partners), 1)}%</td>` + `<td><span class="cpv-prog"><span class="cpv-prog-track"><span class="cpv-prog-fill" style="width:${pct.toFixed(0)}%"></span></span>` + `<span class="cpv-prog-val">${fmtInt(d.oportunidad)}</span></span></td>` + `</tr>`;
    }).join('');
  }
  function s7(md) {
    const s = SECTIONS[6];
    const rows = opportunitiesTable(oportunidadesByCountry(md, 'es'));
    return `<section class="cpv-section" id="sec-opportunities" data-screen-label="S7 Oportunidades">` + sectionHead(s, 'Oportunidad = total × (1 − tasa de partners). Provincias con más recorrido.') + '<div class="cpv-section-filter">' + countrySeg('bi-opportunities-seg', 'es') + '</div>' + '<div class="card" style="padding:0;overflow:hidden">' + '<div class="table-wrap" style="border:0;border-radius:0;max-height:520px">' + '<table class="table-dense"><thead><tr>' + '<th class="col-sticky" style="width:48px">#</th><th>Provincia</th>' + '<th style="text-align:right">Total</th><th style="text-align:right">Partners</th>' + '<th style="text-align:right">% Partners</th><th>Oportunidad</th>' + '</tr></thead><tbody id="bi-opportunities-body">' + rows + '</tbody></table></div></div></section>';
  }

  /* ════ RENDER · DEFAULT ════ */
  function renderDefault(ctx) {
    const md = ctx.md;
    _cloud = null; // recomputa por render
    const header = '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Business Intelligence</h1>' + '<p class="page-subtitle">Partners frente al mercado · segmentación · presencia digital · oportunidades</p>' + '</div></div>';
    return header + anchorNav() + s1(md) + s2(md) + s3(md) + s4(md) + s5(md) + s6(md) + s7(md);
  }

  /* ════ RENDER · LOADING ════ */
  function renderLoading() {
    const block = h => '<div class="cpv-section" style="padding-top:var(--space-7)">' + '<span class="skeleton sk-text-sm" style="width:32%;margin-bottom:16px"></span>' + '<div class="card"><span class="skeleton" style="height:' + h + 'px;border-radius:var(--radius-lg)"></span></div></div>';
    return '<div class="page-header"><div class="page-header-left">' + '<span class="skeleton sk-text-sm" style="width:220px"></span>' + '<span class="skeleton" style="width:280px;height:30px;margin-top:8px"></span></div></div>' + '<div class="cpv-anchor-nav" style="border:0">' + Array.from({
      length: 7
    }).map(() => '<span class="skeleton" style="width:84px;height:30px;border-radius:99px"></span>').join('') + '</div>' + block(150) + block(300) + block(320);
  }

  /* ════ RENDER · EMPTY / ERROR ════ */
  function renderEmpty(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'sin datos para analizar') + '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:graph-up" width="32"></iconify-icon>' + '<h2 class="state-title">Nada que analizar todavía</h2>' + '<p class="state-body">El análisis se generará en cuanto haya ópticas en la base de datos.</p>' + '</div></div>';
  }
  function renderError(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'error al cargar') + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">No se pudo cargar el análisis</h2>' + '<p class="state-body">Ha ocurrido un error al recuperar los datos de BI. Inténtalo de nuevo.</p>' + '<button class="btn btn-primary btn-sm" data-action="retry"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ── interacciones (mounted) ───────────────────────────────── */
  let _scrollHandler = null;
  function mounted(root, state, ctx) {
    if (state !== 'default') return;
    const md = ctx.md;
    C.bindTips(root);
    const scroller = document.querySelector('.main-content');
    const nav = root.querySelector('#bi-anchors');
    const links = nav ? Array.from(nav.querySelectorAll('[data-anchor]')) : [];
    const secs = SECTIONS.map(s => root.querySelector('#sec-' + s.id)).filter(Boolean);

    // click ancla → scroll suave dentro de .main-content
    if (nav) nav.addEventListener('click', e => {
      const a = e.target.closest('[data-anchor]');
      if (!a) return;
      e.preventDefault();
      const sec = root.querySelector('#sec-' + a.getAttribute('data-anchor'));
      if (sec && scroller) {
        const top = sec.offsetTop - 8;
        scroller.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });

    // scroll-spy
    if (_scrollHandler && scroller) scroller.removeEventListener('scroll', _scrollHandler);
    // umbral de fijado capturado una vez (offsetTop es estable sólo antes de pinned)
    const stickThreshold = nav ? Math.max(0, nav.offsetTop) : 0;
    // barra full-bleed: cruza a todo el ancho por detrás del rail al fijarse.
    // va en el subárbol de la vista → se limpia sola al cambiar de vista.
    let bleed = null;
    if (nav) {
      bleed = document.createElement('div');
      bleed.className = 'cpv-anchor-bleed';
      root.appendChild(bleed);
    }
    _scrollHandler = function () {
      const y = scroller.scrollTop + 80;
      let active = 0;
      secs.forEach((sec, i) => {
        if (sec.offsetTop <= y) active = i;
      });
      links.forEach((l, i) => l.classList.toggle('on', i === active));
      // estética: al fijarse, el nav se vuelve transparente y la barra
      // full-bleed (bleed) pinta fondo + línea inferior a todo el ancho
      const stuck = scroller.scrollTop > stickThreshold;
      if (nav) nav.classList.toggle('is-stuck', stuck);
      if (bleed) {
        if (stuck) {
          // cubre desde el tope del área de scroll (justo bajo la topbar)
          // hasta la línea inferior del nav → sin hueco visible
          const sr = scroller.getBoundingClientRect();
          const r = nav.getBoundingClientRect();
          bleed.style.top = sr.top + 'px';
          bleed.style.height = r.bottom - sr.top + 'px';
          bleed.classList.add('is-on');
        } else {
          bleed.classList.remove('is-on');
        }
      }
    };
    if (scroller) {
      scroller.addEventListener('scroll', _scrollHandler, {
        passive: true
      });
      _scrollHandler();
    }

    // selector de país (radar competitivo)
    const radarSeg = root.querySelector('#bi-radar-seg');
    if (radarSeg) radarSeg.addEventListener('click', e => {
      const b = e.target.closest('button[data-c]');
      if (!b) return;
      const cVal = b.getAttribute('data-c');
      radarSeg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      const host = root.querySelector('#bi-radar-chart');
      if (host) host.innerHTML = radarFor(cVal);
    });

    // selector de país (reparto por franja de valoración)
    const groupedSeg = root.querySelector('#bi-grouped-seg');
    if (groupedSeg) groupedSeg.addEventListener('click', e => {
      const b = e.target.closest('button[data-c]');
      if (!b) return;
      const cVal = b.getAttribute('data-c');
      groupedSeg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      const host = root.querySelector('#bi-grouped-chart');
      if (host) host.innerHTML = groupedFor(cVal);
    });

    // selector de país (top performers)
    const perfSeg = root.querySelector('#bi-performers-seg');
    if (perfSeg) perfSeg.addEventListener('click', e => {
      const b = e.target.closest('button[data-c]');
      if (!b) return;
      const cVal = b.getAttribute('data-c');
      perfSeg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      const body = root.querySelector('#bi-performers-body');
      if (body) body.innerHTML = performersTable(performersRows(md, cVal));
    });

    // selector de país (engagement: scatter + top ciudades)
    const engSeg = root.querySelector('#bi-engagement-seg');
    if (engSeg) engSeg.addEventListener('click', e => {
      const b = e.target.closest('button[data-c]');
      if (!b) return;
      const cVal = b.getAttribute('data-c');
      engSeg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      const cloud = buildCloud(md);
      const sc = scatterFor(cloud, cVal);
      const scHost = root.querySelector('#bi-scatter-chart');
      if (scHost) scHost.innerHTML = sc.html;
      const countEl = root.querySelector('#bi-engagement-count');
      if (countEl) countEl.textContent = fmtInt(sc.count) + ' ópticas';
      const ciudadHost = root.querySelector('#bi-ciudad-chart');
      if (ciudadHost) ciudadHost.innerHTML = ciudadHbarFor(md, cVal);
      C.bindTips(root);
    });

    // selector de cuadrantes (país + ámbito combinados)
    let quadCountry = 'es',
      quadAmbito = 'ambos';
    function renderQuad() {
      const cloud = buildCloud(md);
      const pts = cloudByCountry(cloud, quadCountry);
      const yMax = Math.max.apply(null, cloud.pts.map(p => p.y));
      const filtered = pts.filter(p => quadAmbito === 'ambos' || (quadAmbito === 'partners' ? p.client : !p.client));
      const host = root.querySelector('#bi-quad-chart');
      if (host) host.innerHTML = C.quadrant({
        w: 560,
        h: 360,
        points: filtered,
        xMin: 2.5,
        xMax: 5,
        yMin: 0,
        yMax: yMax,
        xMean: cloud.meanX,
        yMean: cloud.meanY,
        labels: {
          tr: 'Stars',
          tl: 'Rising',
          br: 'Hidden gems',
          bl: 'Developing'
        }
      });
      const c = quadCounts(pts, cloud.meanX, cloud.meanY, quadAmbito);
      root.querySelectorAll('#bi-quad-cards [data-quad]').forEach(el => {
        el.textContent = fmtInt(c[el.getAttribute('data-quad')]);
      });
      C.bindTips(root);
    }
    const quadCountrySeg = root.querySelector('#bi-quad-country-seg');
    if (quadCountrySeg) quadCountrySeg.addEventListener('click', e => {
      const b = e.target.closest('button[data-c]');
      if (!b) return;
      quadCountry = b.getAttribute('data-c');
      quadCountrySeg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      renderQuad();
    });
    const seg = root.querySelector('#bi-quad-seg');
    if (seg) seg.addEventListener('click', e => {
      const b = e.target.closest('button[data-f]');
      if (!b) return;
      quadAmbito = b.getAttribute('data-f');
      seg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      renderQuad();
    });

    // tabla digital ordenable + selector de país
    const dwrap = root.querySelector('#bi-digital-wrap');
    if (dwrap) {
      let country = 'es';
      let data = digitalRows(md, country);
      let sortKey = 'comp',
        sortDir = 'desc';
      const body = root.querySelector('#bi-digital-body');
      const ths = Array.from(dwrap.querySelectorAll('th[data-sort]'));
      function applySort() {
        data = data.slice().sort((a, b) => {
          const va = a[sortKey],
            vb = b[sortKey];
          const r = typeof va === 'string' ? va.localeCompare(vb) : va - vb;
          return sortDir === 'asc' ? r : -r;
        });
        body.innerHTML = digitalTable(data);
      }
      dwrap.addEventListener('click', e => {
        const th = e.target.closest('th[data-sort]');
        if (!th) return;
        const key = th.getAttribute('data-sort');
        if (key === sortKey) sortDir = sortDir === 'desc' ? 'asc' : 'desc';else {
          sortKey = key;
          sortDir = key === 'provincia' ? 'asc' : 'desc';
        }
        applySort();
        ths.forEach(t => {
          const on = t.getAttribute('data-sort') === sortKey;
          t.classList.toggle('sorted', on);
          const ic = t.querySelector('iconify-icon');
          if (ic) ic.setAttribute('icon', on && sortDir === 'asc' ? 'iconoir:nav-arrow-up' : 'iconoir:nav-arrow-down');
        });
      });
      const digitalSeg = root.querySelector('#bi-digital-seg');
      if (digitalSeg) digitalSeg.addEventListener('click', e => {
        const b = e.target.closest('button[data-c]');
        if (!b) return;
        country = b.getAttribute('data-c');
        digitalSeg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
        data = digitalRows(md, country);
        applySort();
      });
    }

    // selector de país (oportunidades)
    const oppSeg = root.querySelector('#bi-opportunities-seg');
    if (oppSeg) oppSeg.addEventListener('click', e => {
      const b = e.target.closest('button[data-c]');
      if (!b) return;
      const cVal = b.getAttribute('data-c');
      oppSeg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      const body = root.querySelector('#bi-opportunities-body');
      if (body) body.innerHTML = opportunitiesTable(oportunidadesByCountry(md, cVal));
    });

    // S7 · filas de oportunidades navegan a /bbdd (los query params
    // ?provincia=&tipo=no_cliente llegan en el Lote 2 con V4)
    const oppSec = root.querySelector('#sec-opportunities');
    if (oppSec) oppSec.addEventListener('click', e => {
      const tr = e.target.closest('tr[data-provincia]');
      if (!tr) return;
      location.hash = '#/bbdd';
    });
  }

  /* ── registro ──────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/bi'] = {
    render(state, ctx) {
      if (state === 'loading') return renderLoading();
      if (state === 'empty') return renderEmpty(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/bi.js", error: String((e && e.message) || e) }); }

// coopervision/views/changelog.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/changelog.js — V6 Changelog
   Registra window.cpvViews['/changelog'].
   Tabla densa ultra (32px) sobre cambios_historicos.
   Toolbar: búsqueda óptica + dropdowns Tipo / Campo / Usuario / Fechas.
   Exportar CSV · Paginación 50/pág · Integración drawer V5.
   Filtro especial ?optica= → chip eliminable encima de tabla.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ─────────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function debounce(fn, ms) {
    let t;
    return function () {
      const a = arguments,
        c = this;
      clearTimeout(t);
      t = setTimeout(() => fn.apply(c, a), ms);
    };
  }
  function grp(s) {
    return String(s).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function fmtInt(n) {
    return grp(String(Math.round(Math.abs(n))));
  }
  function uniq(arr) {
    return Array.from(new Set(arr.filter(Boolean))).sort((a, b) => String(a).localeCompare(String(b), 'es'));
  }
  function fmtFecha(iso) {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return dd + '/' + mm + ' ' + hh + ':' + mi;
  }
  const PAGE_SIZE = 50;

  /* ── tipo metadata ───────────────────────────────────────────── */
  const TIPO_META = {
    override_aplicado: {
      label: 'Override',
      pillCls: 'pill-warn',
      icon: 'iconoir:edit-pencil'
    },
    sync_outscraper: {
      label: 'Sync Google',
      pillCls: 'pill-pos',
      icon: 'iconoir:refresh-double'
    },
    sync_salesforce: {
      label: 'Sync CPV',
      pillCls: 'pill-neutral',
      icon: 'iconoir:cloud-sync'
    },
    vinculo_creado: {
      label: 'Vínculo',
      pillCls: 'pill-accent',
      icon: 'iconoir:link'
    },
    app_data_actualizado: {
      label: 'App data',
      pillCls: 'pill-neutral',
      icon: 'iconoir:database'
    }
  };

  /* ── tabla metadata ──────────────────────────────────────────── */
  const TABLA_PILL = {
    opticas_google: ['pill-neutral', 'Google'],
    opticas_cpv: ['pill-neutral', 'CPV'],
    opticas_app_data: ['pill-neutral', 'App data']
  };

  /* ── estado del módulo ───────────────────────────────────────── */
  const initFilters = () => ({
    q: '',
    // búsqueda nombre/place_id
    tipo: '',
    campo: '',
    usuario: '',
    rango: 'all',
    // all | 24h | week | month | custom
    fechaDesde: '',
    fechaHasta: '',
    optica: '' // pre-aplicado desde ?optica=
  });
  let _filters = initFilters();
  let _sort = {
    by: 'fecha',
    dir: 'desc'
  };
  let _page = 1;
  let _menuEl = null;
  let _menuIdx = null;
  let _outsideHandler = null;

  /* ── columnas ────────────────────────────────────────────────── */
  const COLS = [{
    key: 'fecha',
    label: 'Fecha',
    sortable: true,
    w: '96px'
  }, {
    key: 'optica',
    label: 'Óptica',
    sortable: false
  }, {
    key: 'tabla',
    label: 'Tabla',
    sortable: false,
    w: '108px'
  }, {
    key: 'campo',
    label: 'Campo',
    sortable: true,
    w: '120px'
  }, {
    key: 'cambio',
    label: 'Cambio',
    sortable: false
  }, {
    key: 'tipo',
    label: 'Tipo',
    sortable: false,
    w: '108px'
  }, {
    key: 'usuario',
    label: 'Usuario',
    sortable: false,
    w: '116px'
  }, {
    key: 'menu',
    label: '',
    sortable: false,
    w: '40px',
    cls: 'cpv-bbdd-menu-col'
  }];

  /* ── buildRows ───────────────────────────────────────────────── */
  function buildRows(md) {
    return md.cambios_historicos.map(function (ev, idx) {
      const user = ev.usuario_id ? md.usuarios.find(function (u) {
        return u.id === ev.usuario_id;
      }) : null;

      /* ── resolver óptica y place_id ── */
      var optica_name = null;
      var place_id = null;
      if (ev.tabla === 'opticas_google' && ev.registro_id) {
        var g = md.opticas_google.find(function (g) {
          return g.place_id === ev.registro_id;
        });
        if (g) {
          var eff = md.helpers && md.helpers.aplica_overrides_google ? md.helpers.aplica_overrides_google(ev.registro_id) || g : g;
          optica_name = eff.name || g.name;
          place_id = g.place_id;
        }
      } else if (ev.tabla === 'opticas_cpv' && ev.registro_id) {
        var c = md.opticas_cpv.find(function (c) {
          return c.CODIGO === ev.registro_id;
        });
        if (c) {
          optica_name = c.LOCALIDAD ? c.CODIGO + ' · ' + c.LOCALIDAD : c.CODIGO;
          if (c.place_id_fk) place_id = c.place_id_fk;
        }
      } else if (ev.tabla === 'opticas_app_data' && ev.registro_id) {
        var ga = md.opticas_google.find(function (g) {
          return g.place_id === ev.registro_id;
        });
        if (ga) {
          optica_name = ga.name;
          place_id = ga.place_id;
        }
      } else if (ev.tipo === 'vinculo_creado') {
        if (ev.place_id) {
          var gv = md.opticas_google.find(function (g) {
            return g.place_id === ev.place_id;
          });
          if (gv) {
            optica_name = gv.name;
            place_id = ev.place_id;
          }
        }
        if (!optica_name && ev.registro_id) {
          var cv = md.opticas_cpv.find(function (c) {
            return c.CODIGO === ev.registro_id;
          });
          if (cv) optica_name = cv.LOCALIDAD ? cv.CODIGO + ' · ' + cv.LOCALIDAD : cv.CODIGO;
        }
      }

      /* ── formatear cambio ── */
      var cambio = '';
      if (ev.tipo === 'override_aplicado' || ev.tipo === 'app_data_actualizado') {
        var a = ev.valor_anterior != null ? String(ev.valor_anterior) : '—';
        var b = ev.valor_nuevo != null ? String(ev.valor_nuevo) : '—';
        cambio = a + ' → ' + b;
      } else if (ev.tipo === 'sync_outscraper') {
        cambio = ev.motivo || 'Sincronización Google Maps';
      } else if (ev.tipo === 'sync_salesforce') {
        cambio = ev.motivo || 'Sincronización Salesforce';
      } else if (ev.tipo === 'vinculo_creado') {
        cambio = (ev.registro_id || '—') + ' → ' + (ev.place_id || '—');
      } else {
        cambio = ev.motivo || '';
      }
      return {
        _idx: idx,
        tipo: ev.tipo,
        fecha: ev.fecha,
        optica_name: optica_name,
        place_id: place_id,
        registro_id: ev.registro_id,
        tabla: ev.tabla,
        campo: ev.campo || null,
        cambio: cambio,
        valor_anterior: ev.valor_anterior,
        valor_nuevo: ev.valor_nuevo,
        usuario_id: ev.usuario_id,
        usuario_nombre: user ? user.nombre : null,
        motivo: ev.motivo,
        can_revert: ev.tipo === 'override_aplicado'
      };
    });
  }

  /* ── applyFilters ────────────────────────────────────────────── */
  function applyFilters(rows, f) {
    var q = (f.q || '').trim().toLowerCase();
    var oq = (f.optica || '').trim().toLowerCase();
    var now = Date.now();
    return rows.filter(function (r) {
      /* búsqueda libre */
      if (q) {
        var hay = ((r.optica_name || '') + ' ' + (r.place_id || '') + ' ' + (r.registro_id || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      /* chip ?optica= */
      if (oq) {
        var hay2 = ((r.optica_name || '') + ' ' + (r.place_id || '') + ' ' + (r.registro_id || '')).toLowerCase();
        if (hay2.indexOf(oq) === -1) return false;
      }
      if (f.tipo && r.tipo !== f.tipo) return false;
      if (f.campo && r.campo !== f.campo) return false;
      if (f.usuario && r.usuario_id !== f.usuario) return false;

      /* rango de fechas */
      if (f.rango !== 'all') {
        var t = new Date(r.fecha).getTime();
        if (f.rango === '24h' && t < now - 86400000) return false;
        if (f.rango === 'week' && t < now - 604800000) return false;
        if (f.rango === 'month' && t < now - 2592000000) return false;
        if (f.rango === 'custom') {
          if (f.fechaDesde && r.fecha.slice(0, 10) < f.fechaDesde) return false;
          if (f.fechaHasta && r.fecha.slice(0, 10) > f.fechaHasta) return false;
        }
      }
      return true;
    });
  }

  /* ── applySort ───────────────────────────────────────────────── */
  function applySort(rows, s) {
    if (!s.by) return rows;
    var dir = s.dir === 'desc' ? -1 : 1;
    return rows.slice().sort(function (a, b) {
      if (s.by === 'fecha') return a.fecha.localeCompare(b.fecha) * dir;
      if (s.by === 'campo') return (a.campo || '').localeCompare(b.campo || '', 'es') * dir;
      return 0;
    });
  }

  /* ── THEAD ───────────────────────────────────────────────────── */
  function theadHTML() {
    return '<thead><tr>' + COLS.map(function (c) {
      var cls = c.cls || '';
      var style = c.w ? ' style="width:' + c.w + '"' : '';
      var sa = c.sortable ? ' data-sort-key="' + c.key + '"' : '';
      var icon = c.sortable ? '<span class="sort-icon"><iconify-icon icon="iconoir:sort" width="13"></iconify-icon></span>' : '';
      return '<th' + (cls ? ' class="' + cls + '"' : '') + style + sa + '>' + enc(c.label) + icon + '</th>';
    }).join('') + '</tr></thead>';
  }

  /* ── CELL ────────────────────────────────────────────────────── */
  function cell(r, key) {
    switch (key) {
      case 'fecha':
        return '<td class="tnum c-ink2 cpv-cl-fecha">' + enc(fmtFecha(r.fecha)) + '</td>';
      case 'optica':
        {
          if (!r.optica_name) {
            return '<td><span class="c-muted" style="font-size:12px">—</span></td>';
          }
          var pidSnip = r.place_id ? '<span class="cpv-cl-pid">' + enc(r.place_id.slice(0, 22)) + (r.place_id.length > 22 ? '…' : '') + '</span>' : '';
          var clk = r.place_id ? ' data-cl-optica="' + enc(r.place_id) + '"' : '';
          return '<td><span class="cpv-cl-optica-cell"' + clk + (r.place_id ? ' style="cursor:pointer"' : '') + '>' + '<span class="cpv-cl-optica-name">' + enc(r.optica_name) + '</span>' + pidSnip + '</span></td>';
        }
      case 'tabla':
        {
          if (!r.tabla) {
            var sync = r.tipo && r.tipo.startsWith('sync_');
            return '<td><span class="pill ' + (sync ? 'pill-pos' : 'pill-neutral') + ' pill-sm">' + (sync ? 'sync' : '—') + '</span></td>';
          }
          var pm = TABLA_PILL[r.tabla] || ['pill-neutral', r.tabla];
          return '<td><span class="pill ' + pm[0] + ' pill-sm">' + enc(pm[1]) + '</span></td>';
        }
      case 'campo':
        if (!r.campo) return '<td><span class="c-muted" style="font-size:12px">—</span></td>';
        return '<td><code class="cpv-cl-campo">' + enc(r.campo) + '</code></td>';
      case 'cambio':
        {
          var full = r.cambio || '';
          var trunc = full.length > 62 ? full.slice(0, 62) + '…' : full;
          return '<td class="cpv-cl-cambio" title="' + enc(full) + '">' + enc(trunc) + '</td>';
        }
      case 'tipo':
        {
          var meta = TIPO_META[r.tipo] || {
            label: r.tipo,
            pillCls: 'pill-neutral',
            icon: 'iconoir:dot-arrow-right'
          };
          return '<td><span class="pill ' + meta.pillCls + ' pill-sm">' + '<iconify-icon icon="' + meta.icon + '" width="11"></iconify-icon>' + enc(meta.label) + '</span></td>';
        }
      case 'usuario':
        {
          if (!r.usuario_nombre) return '<td><span class="c-muted" style="font-size:11px;font-style:italic">Sistema</span></td>';
          var ini = r.usuario_nombre.trim().split(/\s+/).map(function (p) {
            return p[0] || '';
          }).slice(0, 2).join('').toUpperCase();
          var first = r.usuario_nombre.split(' ')[0];
          return '<td><span style="display:flex;align-items:center;gap:5px">' + '<span class="avatar" style="width:20px;height:20px;font-size:8px;font-weight:700;flex-shrink:0">' + enc(ini) + '</span>' + '<span class="body-xs c-ink2">' + enc(first) + '</span>' + '</span></td>';
        }
      case 'menu':
        return '<td class="cpv-bbdd-menu-col">' + '<button class="cpv-bbdd-menu-btn" data-menu-idx="' + r._idx + '" aria-label="Acciones" aria-haspopup="true">' + '<iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button></td>';
      default:
        return '<td></td>';
    }
  }
  function rowHTML(r) {
    return '<tr data-cl-row="' + r._idx + '">' + COLS.map(function (c) {
      return cell(r, c.key);
    }).join('') + '</tr>';
  }

  /* ── paginación ──────────────────────────────────────────────── */
  function pageList(cur, total) {
    if (total <= 7) {
      var a = [];
      for (var i = 1; i <= total; i++) a.push(i);
      return a;
    }
    var out = [1];
    var lo = Math.max(2, cur - 1),
      hi = Math.min(total - 1, cur + 1);
    if (lo > 2) out.push('…');
    for (var j = lo; j <= hi; j++) out.push(j);
    if (hi < total - 1) out.push('…');
    out.push(total);
    return out;
  }
  function paginationHTML(cur, totalRows) {
    var totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE));
    var from = totalRows === 0 ? 0 : (cur - 1) * PAGE_SIZE + 1;
    var to = Math.min(cur * PAGE_SIZE, totalRows);
    var btns = pageList(cur, totalPages).map(function (p) {
      return p === '…' ? '<span class="page-ellipsis">…</span>' : '<button class="page-btn' + (p === cur ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
    }).join('');
    return '<div class="pagination-info">Mostrando <b>' + fmtInt(from) + '–' + fmtInt(to) + '</b> de <b>' + fmtInt(totalRows) + '</b> cambios</div>' + '<div class="pagination">' + '<button class="page-btn" data-page="prev"' + (cur <= 1 ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon></button>' + btns + '<button class="page-btn" data-page="next"' + (cur >= totalPages ? ' disabled' : '') + '><iconify-icon icon="iconoir:nav-arrow-right" width="15"></iconify-icon></button>' + '</div>';
  }

  /* ── chip óptica (?optica=) ──────────────────────────────────── */
  function opticaChipHTML(f, md) {
    if (!f.optica) return '';
    var g = md.opticas_google.find(function (g) {
      return g.place_id === f.optica || g.name.toLowerCase().indexOf(f.optica.toLowerCase()) !== -1;
    });
    var label = g ? g.name : f.optica;
    return '<div class="cpv-bbdd-chips">' + '<span class="cpv-bbdd-chips-label">Filtros</span>' + '<span class="chip">' + '<span class="chip-label">Óptica: ' + enc(label) + '</span>' + '<button class="chip-remove" id="cpv-cl-remove-optica" aria-label="Quitar filtro">' + '<iconify-icon icon="iconoir:xmark" width="13"></iconify-icon></button>' + '</span>' + '</div>';
  }

  /* ── toolbar HTML ────────────────────────────────────────────── */
  function selectOpts(items, val, allLabel) {
    return '<option value="">' + enc(allLabel) + '</option>' + items.map(function (o) {
      return '<option value="' + enc(o.value) + '"' + (o.value === val ? ' selected' : '') + '>' + enc(o.label) + '</option>';
    }).join('');
  }
  function toolbarHTML(allRows) {
    /* opciones únicas a partir de todos los datos */
    var tipoOpts = [{
      value: 'override_aplicado',
      label: 'Override'
    }, {
      value: 'sync_outscraper',
      label: 'Sync Google'
    }, {
      value: 'sync_salesforce',
      label: 'Sync CPV'
    }, {
      value: 'vinculo_creado',
      label: 'Vínculo'
    }, {
      value: 'app_data_actualizado',
      label: 'App data'
    }];
    var campoVals = uniq(allRows.map(function (r) {
      return r.campo;
    }));
    var campoOpts = campoVals.map(function (v) {
      return {
        value: v,
        label: v
      };
    });
    var seenUsers = {};
    var usuarioOpts = [];
    allRows.forEach(function (r) {
      if (r.usuario_id && !seenUsers[r.usuario_id]) {
        seenUsers[r.usuario_id] = true;
        usuarioOpts.push({
          value: r.usuario_id,
          label: r.usuario_nombre || r.usuario_id
        });
      }
    });
    usuarioOpts.sort(function (a, b) {
      return a.label.localeCompare(b.label, 'es');
    });
    var customVis = _filters.rango === 'custom' ? 'flex' : 'none';
    return '<div class="cpv-bbdd-toolbar">' + /* búsqueda */
    '<div class="input-wrap">' + '<span class="input-icon"><iconify-icon icon="iconoir:search" width="16"></iconify-icon></span>' + '<input class="input input-sm" id="cpv-cl-q" type="text" placeholder="Buscar óptica…" autocomplete="off" value="' + enc(_filters.q) + '">' + '<span class="input-suffix" id="cpv-cl-q-clear" style="display:' + (_filters.q ? 'flex' : 'none') + '">' + '<iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></span>' + '</div>' + /* Tipo */
    '<div class="cpv-bbdd-quick-field">' + '<span class="cpv-bbdd-quick-label">Tipo</span>' + '<select class="select select-sm" id="cpv-cl-tipo">' + selectOpts(tipoOpts, _filters.tipo, 'Todos') + '</select>' + '</div>' + (/* Campo */
    campoOpts.length ? '<div class="cpv-bbdd-quick-field">' + '<span class="cpv-bbdd-quick-label">Campo</span>' + '<select class="select select-sm" id="cpv-cl-campo">' + selectOpts(campoOpts, _filters.campo, 'Todos') + '</select>' + '</div>' : '') + (/* Usuario */
    usuarioOpts.length ? '<div class="cpv-bbdd-quick-field">' + '<span class="cpv-bbdd-quick-label">Usuario</span>' + '<select class="select select-sm" id="cpv-cl-usuario">' + selectOpts(usuarioOpts, _filters.usuario, 'Todos') + '</select>' + '</div>' : '') + /* Rango fechas */
    '<div class="cpv-bbdd-quick-field cpv-cl-dates-field">' + '<span class="cpv-bbdd-quick-label">Fechas</span>' + '<div style="display:flex;flex-direction:column;gap:4px">' + '<select class="select select-sm" id="cpv-cl-rango">' + '<option value="all"' + (_filters.rango === 'all' ? ' selected' : '') + '>Todas las fechas</option>' + '<option value="24h"' + (_filters.rango === '24h' ? ' selected' : '') + '>Últimas 24h</option>' + '<option value="week"' + (_filters.rango === 'week' ? ' selected' : '') + '>Última semana</option>' + '<option value="month"' + (_filters.rango === 'month' ? ' selected' : '') + '>Último mes</option>' + '<option value="custom"' + (_filters.rango === 'custom' ? ' selected' : '') + '>Personalizado</option>' + '</select>' + '<div id="cpv-cl-custom-dates" style="display:' + customVis + ';gap:4px;align-items:center">' + '<input type="date" class="input input-sm cpv-cl-date-input" id="cpv-cl-desde" value="' + enc(_filters.fechaDesde) + '">' + '<span class="c-muted" style="font-size:11px;flex-shrink:0">—</span>' + '<input type="date" class="input input-sm cpv-cl-date-input" id="cpv-cl-hasta" value="' + enc(_filters.fechaHasta) + '">' + '</div>' + '</div>' + '</div>' + '</div>';
  }

  /* ════ RENDER · DEFAULT ════════════════════════════════════════ */
  function renderDefault(ctx) {
    var md = ctx.md;
    var allRows = buildRows(md);
    var header = '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Changelog</h1>' + '<p class="page-subtitle">' + fmtInt(allRows.length) + ' cambios registrados</p>' + '</div><div class="page-header-right">' + '<button class="btn btn-ghost btn-sm" id="cpv-cl-export">' + '<iconify-icon icon="iconoir:download" width="15"></iconify-icon>Exportar CSV</button>' + '</div></div>';
    var card = '<div class="card cpv-bbdd-card">' + toolbarHTML(allRows) + '<div id="cpv-cl-chip-slot">' + opticaChipHTML(_filters, md) + '</div>' + '<div class="table-wrap cpv-bbdd-tablewrap">' + '<table class="table-dense table-ultra cpv-bbdd-table">' + theadHTML() + '<tbody id="cpv-cl-tbody"></tbody>' + '</table>' + '</div>' + '<div class="pagination-wrap cpv-bbdd-pagination" id="cpv-cl-pagination"></div>' + '</div>';
    return header + card;
  }

  /* ════ RENDER · LOADING ════════════════════════════════════════ */
  function renderLoading() {
    var rows = '';
    var ws = [55, 70, 48, 63, 80, 42, 58, 75, 50, 66, 45, 72, 60, 38, 68];
    for (var i = 0; i < 15; i++) {
      rows += '<tr class="cpv-bbdd-skrow">' + '<td><span class="skeleton" style="width:78px"></span></td>' + '<td><span class="skeleton" style="width:' + ws[i] + '%"></span></td>' + '<td><span class="skeleton" style="width:64px"></span></td>' + '<td><span class="skeleton" style="width:60px"></span></td>' + '<td><span class="skeleton" style="width:' + ws[(i + 3) % 15] + '%"></span></td>' + '<td><span class="skeleton" style="width:72px"></span></td>' + '<td><span class="skeleton" style="width:68px"></span></td>' + '<td class="cpv-bbdd-menu-col"></td>' + '</tr>';
    }
    var header = '<div class="page-header"><div class="page-header-left">' + '<span class="skeleton sk-text-sm" style="width:80px;display:block"></span>' + '<span class="skeleton" style="width:160px;height:30px;margin-top:8px;display:block"></span>' + '<span class="skeleton sk-text-sm" style="width:220px;margin-top:8px;display:block"></span>' + '</div><div class="page-header-right">' + '<span class="skeleton" style="width:130px;height:30px;display:block"></span>' + '</div></div>';
    var toolbar = '<div class="cpv-bbdd-toolbar">' + '<span class="skeleton" style="width:280px;height:32px"></span>' + '<span class="skeleton" style="width:90px;height:32px"></span>' + '<span class="skeleton" style="width:90px;height:32px"></span>' + '<span class="skeleton" style="width:90px;height:32px"></span>' + '<span class="skeleton" style="width:120px;height:32px"></span>' + '</div>';
    return header + '<div class="card cpv-bbdd-card">' + toolbar + '<div class="table-wrap cpv-bbdd-tablewrap">' + '<table class="table-dense table-ultra cpv-bbdd-table">' + theadHTML() + '<tbody>' + rows + '</tbody></table>' + '</div>' + '<div class="pagination-wrap cpv-bbdd-pagination">' + '<span class="skeleton sk-text-sm" style="width:180px"></span>' + '<span class="skeleton" style="width:200px;height:32px"></span>' + '</div>' + '</div>';
  }

  /* ════ RENDER · EMPTY ══════════════════════════════════════════ */
  function renderEmpty(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path) + '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:clock-rotate-right" width="32"></iconify-icon>' + '<h2 class="state-title">Sin historial aún</h2>' + '<p class="state-body">Los eventos aparecerán aquí tras la primera sincronización o cuando se apliquen correcciones.</p>' + '</div></div>';
  }

  /* ════ RENDER · ERROR ══════════════════════════════════════════ */
  function renderError(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path) + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">No se pudo cargar el changelog</h2>' + '<p class="state-body">Ha ocurrido un error al recuperar el historial de cambios.</p>' + '<button class="btn btn-primary btn-sm" data-action="retry">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ── readParams (hash ?optica=) ──────────────────────────────── */
  function readParams() {
    var h = location.hash || '';
    var qi = h.indexOf('?');
    if (qi === -1) return;
    var sp = new URLSearchParams(h.slice(qi + 1));
    if (sp.get('optica')) _filters.optica = sp.get('optica');
    if (sp.get('tipo')) _filters.tipo = sp.get('tipo');
  }

  /* ════ MENÚ CONTEXTUAL FLOTANTE ════════════════════════════════ */
  function ensureMenu() {
    if (_menuEl) return _menuEl;
    _menuEl = document.createElement('div');
    _menuEl.className = 'cpv-row-menu';
    document.body.appendChild(_menuEl);
    return _menuEl;
  }
  function closeRowMenu() {
    if (_menuEl) _menuEl.classList.remove('open');
    _menuIdx = null;
  }
  function teardownMenu() {
    if (_outsideHandler) {
      document.removeEventListener('click', _outsideHandler);
      _outsideHandler = null;
    }
    if (_menuEl) {
      _menuEl.remove();
      _menuEl = null;
    }
    _menuIdx = null;
  }
  function openRowMenu(btn, idx, row, ctx) {
    var m = ensureMenu();
    if (_menuIdx === idx && m.classList.contains('open')) {
      closeRowMenu();
      return;
    }
    _menuIdx = idx;
    m.innerHTML = '<button class="dropdown-item" data-rm="detalle">' + '<iconify-icon icon="iconoir:eye" width="16"></iconify-icon>Ver óptica completa</button>' + (row.can_revert ? '<div class="dropdown-divider"></div>' + '<button class="dropdown-item cpv-item-danger" data-rm="revertir">' + '<iconify-icon icon="iconoir:undo" width="16"></iconify-icon>Revertir override</button>' : '');
    var r = btn.getBoundingClientRect();
    m.classList.add('open');
    var mw = m.offsetWidth || 200;
    var mh = m.offsetHeight || 90;
    var lft = r.right - mw;
    var top = r.bottom + 4;
    if (lft < 8) lft = 8;
    if (top + mh > window.innerHeight - 8) top = r.top - mh - 4;
    m.style.left = lft + 'px';
    m.style.top = top + 'px';
    m.onclick = function (e) {
      var it = e.target.closest('[data-rm]');
      if (!it) return;
      var act = it.getAttribute('data-rm');
      closeRowMenu();
      if (act === 'detalle') {
        if (row.place_id) openDetalle(row.place_id, ctx);else ctx.toast('info', 'Sin óptica vinculada', 'Este evento de sistema no está asociado a una óptica concreta.');
      } else if (act === 'revertir') {
        ctx.toast('info', 'Revertir override', 'La reversión de overrides está disponible en la ficha de la óptica (V5, pestaña Cambios).');
      }
    };
  }

  /* ── openDetalle → drawer V5 ─────────────────────────────────── */
  function openDetalle(placeId, ctx) {
    if (window.cpvDrawer && typeof window.cpvDrawer.open === 'function') {
      window.cpvDrawer.open(placeId);
      return;
    }
    var o = ctx.md.opticas_google.find(function (g) {
      return g.place_id === placeId;
    });
    ctx.toast('info', 'Ficha de óptica', (o ? o.name + ' · ' : '') + 'la ficha completa (V5) no está disponible aún.');
  }

  /* ── exportCSV ───────────────────────────────────────────────── */
  function exportCSV(rows, ctx) {
    var headers = ['Fecha', 'Óptica', 'place_id', 'Tabla', 'Campo', 'Cambio', 'Tipo', 'Usuario', 'Motivo'];
    function esc(v) {
      var s = v == null ? '' : String(v);
      return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }
    var lines = [headers.join(';')];
    rows.forEach(function (r) {
      lines.push([r.fecha, r.optica_name, r.place_id, r.tabla, r.campo, r.cambio, r.tipo, r.usuario_nombre, r.motivo].map(esc).join(';'));
    });
    var blob = new Blob(['\ufeff' + lines.join('\r\n')], {
      type: 'text/csv;charset=utf-8;'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'changelog_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    ctx.toast('success', 'CSV exportado', fmtInt(rows.length) + ' cambios exportados.');
  }

  /* ════ MOUNTED ════════════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    teardownMenu();
    if (state !== 'default') return;
    var md = ctx.md;
    var allRows = buildRows(md);
    var tbody = root.querySelector('#cpv-cl-tbody');
    var pagEl = root.querySelector('#cpv-cl-pagination');
    var thead = root.querySelector('.cpv-bbdd-table thead');
    var chipSlot = root.querySelector('#cpv-cl-chip-slot');

    /* ── refresh ── */
    function getProcessed() {
      return applySort(applyFilters(allRows, _filters), _sort);
    }
    function refresh(opts) {
      if (opts && opts.resetPage) _page = 1;
      var processed = getProcessed();
      var totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
      if (_page > totalPages) _page = totalPages;
      var slice = processed.slice((_page - 1) * PAGE_SIZE, _page * PAGE_SIZE);
      if (processed.length === 0) {
        tbody.innerHTML = '<tr><td colspan="' + COLS.length + '">' + '<div class="empty-state cpv-bbdd-tablestate">' + '<iconify-icon class="empty-state-icon" icon="iconoir:filter-list-xmark" width="30"></iconify-icon>' + '<h2 class="state-title">Sin resultados</h2>' + '<p class="state-body">No hay cambios para esos filtros.</p>' + '<button class="btn btn-ghost btn-sm" data-cl-clear>Limpiar filtros</button>' + '</div>' + '</td></tr>';
      } else {
        tbody.innerHTML = slice.map(rowHTML).join('');
      }
      pagEl.innerHTML = paginationHTML(_page, processed.length);

      /* iconos de orden */
      thead.querySelectorAll('th[data-sort-key]').forEach(function (th) {
        var key = th.getAttribute('data-sort-key');
        var ic = th.querySelector('.sort-icon iconify-icon');
        if (ic) {
          if (_sort.by === key) {
            th.classList.add('sorted');
            ic.setAttribute('icon', _sort.dir === 'asc' ? 'iconoir:nav-arrow-up' : 'iconoir:nav-arrow-down');
          } else {
            th.classList.remove('sorted');
            ic.setAttribute('icon', 'iconoir:sort');
          }
        }
      });
    }

    /* ── resetAll (conserva el chip ?optica=) ── */
    function resetAll() {
      var prevOptica = _filters.optica;
      _filters = initFilters();
      _filters.optica = prevOptica;
      var qIn = root.querySelector('#cpv-cl-q');
      var qCl = root.querySelector('#cpv-cl-q-clear');
      if (qIn) {
        qIn.value = '';
      }
      if (qCl) {
        qCl.style.display = 'none';
      }
      ['#cpv-cl-tipo', '#cpv-cl-campo', '#cpv-cl-usuario'].forEach(function (sel) {
        var el = root.querySelector(sel);
        if (el) el.value = '';
      });
      var rangoSel = root.querySelector('#cpv-cl-rango');
      if (rangoSel) rangoSel.value = 'all';
      var customDates = root.querySelector('#cpv-cl-custom-dates');
      if (customDates) customDates.style.display = 'none';
      refresh({
        resetPage: true
      });
    }

    /* ── búsqueda con debounce ── */
    var qInput = root.querySelector('#cpv-cl-q');
    var qClear = root.querySelector('#cpv-cl-q-clear');
    var onSearch = debounce(function () {
      refresh({
        resetPage: true
      });
    }, 300);
    qInput.addEventListener('input', function () {
      _filters.q = qInput.value;
      qClear.style.display = qInput.value ? 'flex' : 'none';
      onSearch();
    });
    qClear.addEventListener('click', function () {
      qInput.value = '';
      _filters.q = '';
      qClear.style.display = 'none';
      qInput.focus();
      refresh({
        resetPage: true
      });
    });

    /* ── dropdowns ── */
    var tipoSel = root.querySelector('#cpv-cl-tipo');
    if (tipoSel) tipoSel.addEventListener('change', function () {
      _filters.tipo = tipoSel.value;
      refresh({
        resetPage: true
      });
    });
    var campoSel = root.querySelector('#cpv-cl-campo');
    if (campoSel) campoSel.addEventListener('change', function () {
      _filters.campo = campoSel.value;
      refresh({
        resetPage: true
      });
    });
    var userSel = root.querySelector('#cpv-cl-usuario');
    if (userSel) userSel.addEventListener('change', function () {
      _filters.usuario = userSel.value;
      refresh({
        resetPage: true
      });
    });

    /* ── rango fechas ── */
    var rangoSel = root.querySelector('#cpv-cl-rango');
    var customDates = root.querySelector('#cpv-cl-custom-dates');
    if (rangoSel) rangoSel.addEventListener('change', function () {
      _filters.rango = rangoSel.value;
      if (customDates) customDates.style.display = _filters.rango === 'custom' ? 'flex' : 'none';
      refresh({
        resetPage: true
      });
    });
    var desdeInput = root.querySelector('#cpv-cl-desde');
    var hastaInput = root.querySelector('#cpv-cl-hasta');
    if (desdeInput) desdeInput.addEventListener('change', function () {
      _filters.fechaDesde = desdeInput.value;
      refresh({
        resetPage: true
      });
    });
    if (hastaInput) hastaInput.addEventListener('change', function () {
      _filters.fechaHasta = hastaInput.value;
      refresh({
        resetPage: true
      });
    });

    /* ── chip ?optica= ── */
    chipSlot.addEventListener('click', function (e) {
      if (e.target.closest('#cpv-cl-remove-optica')) {
        _filters.optica = '';
        chipSlot.innerHTML = '';
        refresh({
          resetPage: true
        });
      }
    });

    /* ── delegación en tabla: ⋯ menú + click óptica ── */
    root.querySelector('.cpv-bbdd-tablewrap').addEventListener('click', function (e) {
      /* botón ⋯ */
      var menuBtn = e.target.closest('.cpv-bbdd-menu-btn');
      if (menuBtn) {
        e.stopPropagation();
        var idx = parseInt(menuBtn.getAttribute('data-menu-idx'), 10);
        var row = allRows.find(function (r) {
          return r._idx === idx;
        });
        if (row) openRowMenu(menuBtn, idx, row, ctx);
        return;
      }
      /* click en celda óptica */
      var opticaCell = e.target.closest('[data-cl-optica]');
      if (opticaCell) {
        var pid = opticaCell.getAttribute('data-cl-optica');
        if (pid) openDetalle(pid, ctx);
        return;
      }
    });

    /* ── limpiar desde empty state ── */
    tbody.addEventListener('click', function (e) {
      if (e.target.closest('[data-cl-clear]')) resetAll();
    });

    /* ── paginación ── */
    pagEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-page]');
      if (!b || b.disabled) return;
      var v = b.getAttribute('data-page');
      var totalPages = Math.max(1, Math.ceil(getProcessed().length / PAGE_SIZE));
      if (v === 'prev') _page = Math.max(1, _page - 1);else if (v === 'next') _page = Math.min(totalPages, _page + 1);else _page = parseInt(v, 10);
      refresh();
      root.querySelector('.cpv-bbdd-tablewrap').scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    /* ── orden por columna ── */
    thead.addEventListener('click', function (e) {
      var th = e.target.closest('th[data-sort-key]');
      if (!th) return;
      var key = th.getAttribute('data-sort-key');
      if (_sort.by !== key) {
        _sort.by = key;
        _sort.dir = key === 'fecha' ? 'desc' : 'asc';
      } else if (_sort.dir === 'asc') {
        _sort.dir = 'desc';
      } else {
        _sort.by = null;
        _sort.dir = 'desc';
      }
      refresh();
    });

    /* ── exportar CSV ── */
    root.querySelector('#cpv-cl-export').addEventListener('click', function () {
      exportCSV(getProcessed(), ctx);
    });

    /* ── cierre de menú al click fuera ── */
    _outsideHandler = function (e) {
      if (!e.target.closest('.cpv-row-menu') && !e.target.closest('.cpv-bbdd-menu-btn')) closeRowMenu();
    };
    document.addEventListener('click', _outsideHandler);
    refresh();
  }

  /* ── registro ─────────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/changelog'] = {
    render: function (state, ctx) {
      if (state === 'default') {
        _page = 1;
        _filters = initFilters();
        _sort = {
          by: 'fecha',
          dir: 'desc'
        };
        readParams();
      }
      if (state === 'loading') return renderLoading();
      if (state === 'empty') return renderEmpty(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/changelog.js", error: String((e && e.message) || e) }); }

// coopervision/views/charts.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · charts.js
   Charts SVG dibujados a mano, fieles al estilo Recharts del DS §7.2.
   NO usa ninguna librería de charts. Expuesto como window.cpvCharts.
   chartTheme: primary #C5E817 · grid #E7EAEE (solo horizontal) ·
   secundaria #A8AAAE · tooltip custom bg --card / borde --line / e2.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const PALETTE = ['#C5E817', '#A4C313', '#82960F', '#7E8084', '#A8AAAE'];
  const PRIMARY = '#C5E817';
  const SOFTBAR = '#E4F1A6';

  /* ── utils ─────────────────────────────────────────────────── */
  function enc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function truncate(s, n) {
    s = String(s);
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  }
  function niceMax(v) {
    if (v <= 0) return 1;
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    const n = v / p;
    let m;
    if (n <= 1) m = 1;else if (n <= 2) m = 2;else if (n <= 2.5) m = 2.5;else if (n <= 5) m = 5;else m = 10;
    return m * p;
  }
  function fmtAxis(v) {
    v = Math.round(v);
    if (v >= 1000) return (v / 1000).toFixed(v % 1000 ? 1 : 0).replace('.', ',') + 'k';
    return String(v);
  }
  function pt(cx, cy, r, a) {
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }
  function annular(cx, cy, r, ir, a1, a2) {
    const large = a2 - a1 > Math.PI ? 1 : 0;
    const [x1, y1] = pt(cx, cy, r, a1),
      [x2, y2] = pt(cx, cy, r, a2);
    const [x3, y3] = pt(cx, cy, ir, a2),
      [x4, y4] = pt(cx, cy, ir, a1);
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} ` + `L${x3.toFixed(2)} ${y3.toFixed(2)} A${ir} ${ir} 0 ${large} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
  }
  function svg(w, h, inner, extra) {
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" preserveAspectRatio="xMidYMid meet" ` + `style="display:block;${extra || ''}">${inner}</svg>`;
  }

  /* ── horizontal bar chart ──────────────────────────────────── */
  function hbar(o) {
    const data = o.data,
      label = o.label,
      value = o.value;
    const w = o.w || 520,
      rowH = o.rowH || 26,
      gap = o.gap || 9;
    const fmt = o.fmt || (n => n),
      accentTop = o.accentTop == null ? 3 : o.accentTop,
      tip = o.tip;
    const pad = {
      l: o.labelW || 118,
      r: 56,
      t: 6,
      b: 6
    };
    const n = data.length,
      ih = n * rowH + (n - 1) * gap,
      h = ih + pad.t + pad.b;
    const iw = w - pad.l - pad.r,
      max = Math.max.apply(null, data.map(d => d[value])) || 1;
    let bars = '';
    data.forEach((d, i) => {
      const y = pad.t + i * (rowH + gap);
      const bw = Math.max(3, iw * d[value] / max);
      const fill = i < accentTop ? PRIMARY : SOFTBAR;
      const tipAttr = tip ? ` data-tip="${enc(tip(d))}"` : '';
      bars += `<text class="cc-cat" x="${pad.l - 10}" y="${y + rowH / 2 + 4}" text-anchor="end">${enc(truncate(d[label], 16))}</text>` + `<g class="cc-bar"${tipAttr}>` + `<rect x="${pad.l}" y="${y}" width="${iw}" height="${rowH}" rx="5" fill="#F3F5EF"></rect>` + `<rect x="${pad.l}" y="${y}" width="${bw.toFixed(1)}" height="${rowH}" rx="5" fill="${fill}"></rect>` + `<text class="cc-val" x="${pad.l + bw + 8}" y="${y + rowH / 2 + 4}">${enc(fmt(d[value]))}</text>` + `</g>`;
    });
    return svg(w, h, bars);
  }

  /* ── vertical bars / histogram ─────────────────────────────── */
  function vbars(o) {
    const data = o.data,
      label = o.label,
      value = o.value;
    const w = o.w || 520,
      h = o.h || 260,
      fmt = o.fmt || (n => n),
      steps = o.steps || 4,
      tip = o.tip;
    const pad = {
      l: 46,
      r: 14,
      t: 16,
      b: 38
    };
    const iw = w - pad.l - pad.r,
      ih = h - pad.t - pad.b;
    const max = niceMax(Math.max.apply(null, data.map(d => d[value])));
    let grid = '';
    for (let i = 0; i <= steps; i++) {
      const val = max * i / steps,
        y = pad.t + ih - ih * i / steps;
      grid += `<line class="cc-grid" x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}"></line>`;
      grid += `<text class="cc-axis" x="${pad.l - 8}" y="${y + 3}" text-anchor="end">${fmtAxis(val)}</text>`;
    }
    const n = data.length,
      slot = iw / n,
      bw = Math.min(72, slot * 0.56);
    let bars = '';
    data.forEach((d, i) => {
      const x = pad.l + slot * i + (slot - bw) / 2;
      const bh = ih * d[value] / max,
        y = pad.t + ih - bh;
      const tipAttr = tip ? ` data-tip="${enc(tip(d))}"` : '';
      bars += `<g class="cc-vbar"${tipAttr}>` + `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="5" fill="url(#ccGrad)"></rect>` + `<text class="cc-val" x="${(x + bw / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle">${enc(fmt(d[value]))}</text>` + `<text class="cc-cat" x="${(x + bw / 2).toFixed(1)}" y="${h - 14}" text-anchor="middle">${enc(d[label])}</text>` + `</g>`;
    });
    const defs = `<defs><linearGradient id="ccGrad" x1="0" y1="0" x2="0" y2="1">` + `<stop offset="0" stop-color="#C5E817"></stop><stop offset="1" stop-color="#E2F08C"></stop>` + `</linearGradient></defs>`;
    return svg(w, h, defs + grid + bars);
  }

  /* ── donut ─────────────────────────────────────────────────── */
  function donut(o) {
    const data = o.data,
      value = o.value,
      size = o.size || 190,
      inner = o.inner || 0.6;
    const palette = o.palette || PALETTE,
      tip = o.tip;
    const total = data.reduce((s, d) => s + d[value], 0) || 1;
    const cx = size / 2,
      cy = size / 2,
      r = size / 2 - 2,
      ir = r * inner;
    let segs = '',
      a = -Math.PI / 2;
    data.forEach((d, i) => {
      const frac = d[value] / total,
        a2 = a + frac * 2 * Math.PI,
        mid = (a + a2) / 2;
      const tx = (Math.cos(mid) * 4).toFixed(2),
        ty = (Math.sin(mid) * 4).toFixed(2);
      const tipAttr = tip ? ` data-tip="${enc(tip(d, frac))}"` : '';
      segs += `<path class="cc-seg" style="--tx:${tx}px;--ty:${ty}px" d="${annular(cx, cy, r, ir, a, a2)}" ` + `fill="${palette[i % palette.length]}"${tipAttr}></path>`;
      a = a2;
    });
    if (o.centerTop) segs += `<text class="cc-donut-num" x="${cx}" y="${cy - 3}" text-anchor="middle">${enc(o.centerTop)}</text>`;
    if (o.centerSub) segs += `<text class="cc-donut-cap" x="${cx}" y="${cy + 14}" text-anchor="middle">${enc(o.centerSub)}</text>`;
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="display:block;flex-shrink:0">${segs}</svg>`;
  }

  /* ── scatter (val × reseñas log) ───────────────────────────── */
  function scatter(o) {
    // o.points: [{x, y, client, tip}]  x in [xMin,xMax], y raw (log scale)
    const w = o.w || 560,
      h = o.h || 320;
    const pad = {
      l: 46,
      r: 16,
      t: 16,
      b: 42
    };
    const iw = w - pad.l - pad.r,
      ih = h - pad.t - pad.b;
    const xMin = o.xMin != null ? o.xMin : 0,
      xMax = o.xMax != null ? o.xMax : 5;
    const yMaxRaw = Math.max.apply(null, o.points.map(p => p.y));
    const yLogMax = Math.log10(yMaxRaw + 1);
    const X = x => pad.l + iw * (x - xMin) / (xMax - xMin);
    const Y = y => pad.t + ih - ih * Math.log10(y + 1) / yLogMax;
    let grid = '';
    // horizontal gridlines at log ticks 10,100,1000
    [10, 100, 1000].forEach(t => {
      if (t > yMaxRaw) return;
      const y = Y(t);
      grid += `<line class="cc-grid" x1="${pad.l}" y1="${y.toFixed(1)}" x2="${w - pad.r}" y2="${y.toFixed(1)}"></line>`;
      grid += `<text class="cc-axis" x="${pad.l - 8}" y="${(y + 3).toFixed(1)}" text-anchor="end">${t}</text>`;
    });
    // x axis ticks
    let xa = '';
    for (let v = Math.ceil(xMin); v <= xMax; v++) {
      xa += `<text class="cc-axis" x="${X(v).toFixed(1)}" y="${h - 22}" text-anchor="middle">${v},0</text>`;
    }
    let dots = '';
    o.points.forEach(p => {
      const cx = X(p.x),
        cy = Y(p.y);
      const fill = p.client ? PRIMARY : '#C7C9CD';
      const stroke = p.client ? '#8FA710' : '#A8AAAE';
      const rr = p.client ? 5.5 : 4.5;
      const tipAttr = p.tip ? ` data-tip="${enc(p.tip)}"` : '';
      const pid = p.place_id ? ` data-place-id="${enc(p.place_id)}"` : '';
      dots += `<circle class="cc-dot" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rr}" fill="${fill}" ` + `stroke="${stroke}" stroke-width="1.2" fill-opacity="0.82"${tipAttr}${pid}></circle>`;
    });
    const axisLabels = `<text class="cc-axis-title" x="${pad.l + iw / 2}" y="${h - 4}" text-anchor="middle">${enc(o.xLabel || 'Valoración')}</text>` + `<text class="cc-axis-title" x="14" y="${pad.t + ih / 2}" text-anchor="middle" transform="rotate(-90 14 ${pad.t + ih / 2})">${enc(o.yLabel || 'Reseñas (log)')}</text>`;
    return svg(w, h, grid + xa + dots + axisLabels);
  }

  /* ── quadrant scatter (divided by means) ───────────────────── */
  function quadrant(o) {
    const w = o.w || 560,
      h = o.h || 360;
    const pad = {
      l: 24,
      r: 18,
      t: 22,
      b: 28
    };
    const iw = w - pad.l - pad.r,
      ih = h - pad.t - pad.b;
    // Banda reservada en la base para las etiquetas inferiores (Hidden gems /
    // Developing): los dots se mapean SOLO dentro de ih2, de modo que la línea
    // punteada horizontal actúa de tope y ningún punto invade el texto inferior.
    const labelBand = 30;
    const ih2 = ih - labelBand;
    const xMin = o.xMin,
      xMax = o.xMax,
      yMin = o.yMin,
      yMax = o.yMax;
    const X = x => pad.l + iw * (x - xMin) / (xMax - xMin);
    const Y = y => pad.t + ih2 - ih2 * (y - yMin) / (yMax - yMin);
    const mx = X(o.xMean),
      my = Y(o.yMean);
    const plotBottom = pad.t + ih2;
    let g = '';
    // quadrant tint (subtle) — top-right "stars" highlighted accent-soft
    // Línea horizontal punteada justo por encima de las etiquetas inferiores
    // (con margen): actúa de base del campo de puntos.
    const hLineY = plotBottom;
    g += `<rect x="${mx}" y="${pad.t}" width="${pad.l + iw - mx}" height="${hLineY - pad.t}" fill="rgba(197,232,23,0.07)"></rect>`;
    // divider lines (dashed --line) — la vertical termina en el tope de los dots
    g += `<line x1="${mx}" y1="${pad.t}" x2="${mx}" y2="${hLineY}" stroke="#C5C8CC" stroke-width="1" stroke-dasharray="4 4"></line>`;
    g += `<line x1="${pad.l}" y1="${hLineY}" x2="${pad.l + iw}" y2="${hLineY}" stroke="#C5C8CC" stroke-width="1" stroke-dasharray="4 4"></line>`;
    // corner labels (se construyen aquí pero se añaden DESPUÉS de los puntos
    // para que el texto quede siempre por encima de los dots)
    const corner = (x, y, anchor, t1) => `<text class="cc-quad-label" x="${x}" y="${y}" text-anchor="${anchor}">${enc(t1)}</text>`;
    let labels = '';
    labels += corner(pad.l + iw - 6, pad.t + 14, 'end', o.labels && o.labels.tr || 'Stars');
    labels += corner(pad.l + 6, pad.t + 14, 'start', o.labels && o.labels.tl || 'Rising');
    labels += corner(pad.l + iw - 6, h - pad.b + 6, 'end', o.labels && o.labels.br || 'Hidden gems');
    labels += corner(pad.l + 6, h - pad.b + 6, 'start', o.labels && o.labels.bl || 'Developing');
    let dots = '';
    o.points.forEach(p => {
      const cx = X(p.x),
        cy = Y(p.y);
      const fill = p.client ? PRIMARY : '#C7C9CD';
      const stroke = p.client ? '#8FA710' : '#A8AAAE';
      const tipAttr = p.tip ? ` data-tip="${enc(p.tip)}"` : '';
      const pid = p.place_id ? ` data-place-id="${enc(p.place_id)}"` : '';
      dots += `<circle class="cc-dot" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${p.client ? 5.5 : 4.5}" ` + `fill="${fill}" stroke="${stroke}" stroke-width="1.2" fill-opacity="0.82"${tipAttr}${pid}></circle>`;
    });
    return svg(w, h, g + dots + labels);
  }

  /* ── radar (multi-axis) ────────────────────────────────────── */
  function radar(o) {
    // o.axes: ['Valoración', ...]; o.series: [{name,color,fill,values:[0..100]}]
    const size = o.size || 320,
      cx = size / 2,
      cy = size / 2,
      r = size / 2 - 38;
    const axes = o.axes,
      N = axes.length;
    const ang = i => -Math.PI / 2 + i * 2 * Math.PI / N;
    let rings = '';
    [0.25, 0.5, 0.75, 1].forEach(f => {
      let pts = '';
      for (let i = 0; i < N; i++) {
        const [x, y] = pt(cx, cy, r * f, ang(i));
        pts += `${x.toFixed(1)},${y.toFixed(1)} `;
      }
      rings += `<polygon points="${pts.trim()}" fill="none" stroke="#E7EAEE" stroke-width="1"></polygon>`;
    });
    let spokes = '',
      labels = '';
    for (let i = 0; i < N; i++) {
      const [x, y] = pt(cx, cy, r, ang(i));
      spokes += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#E7EAEE" stroke-width="1"></line>`;
      const [lx, ly] = pt(cx, cy, r + 20, ang(i));
      const anchor = Math.abs(lx - cx) < 6 ? 'middle' : lx > cx ? 'start' : 'end';
      labels += `<text class="cc-axis" x="${lx.toFixed(1)}" y="${(ly + 3).toFixed(1)}" text-anchor="${anchor}">${enc(axes[i])}</text>`;
    }
    let polys = '';
    o.series.forEach(s => {
      let pts = '';
      for (let i = 0; i < N; i++) {
        const [x, y] = pt(cx, cy, r * (s.values[i] / 100), ang(i));
        pts += `${x.toFixed(1)},${y.toFixed(1)} `;
      }
      polys += `<polygon points="${pts.trim()}" fill="${s.fill}" stroke="${s.color}" stroke-width="2"></polygon>`;
      for (let i = 0; i < N; i++) {
        const [x, y] = pt(cx, cy, r * (s.values[i] / 100), ang(i));
        polys += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${s.color}"></circle>`;
      }
    });
    return `<svg viewBox="0 0 ${size} ${size}" width="100%" preserveAspectRatio="xMidYMid meet" style="display:block">${rings + spokes + labels + polys}</svg>`;
  }

  /* ── grouped bars (2 series) ───────────────────────────────── */
  function groupedBars(o) {
    // o.groups: [{label, a, b}]  a=primary b=secondary ; o.fmt
    const data = o.groups,
      w = o.w || 520,
      h = o.h || 270,
      fmt = o.fmt || (n => n),
      steps = o.steps || 4,
      tip = o.tip;
    const pad = {
      l: 40,
      r: 14,
      t: 16,
      b: 38
    };
    const iw = w - pad.l - pad.r,
      ih = h - pad.t - pad.b;
    const max = niceMax(Math.max.apply(null, data.map(d => Math.max(d.a, d.b))));
    let grid = '';
    for (let i = 0; i <= steps; i++) {
      const val = max * i / steps,
        y = pad.t + ih - ih * i / steps;
      grid += `<line class="cc-grid" x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}"></line>`;
      grid += `<text class="cc-axis" x="${pad.l - 8}" y="${y + 3}" text-anchor="end">${fmtAxis(val)}</text>`;
    }
    const n = data.length,
      slot = iw / n,
      bw = Math.min(26, slot * 0.3),
      gp = 4;
    let bars = '';
    data.forEach((d, i) => {
      const cxs = pad.l + slot * i + slot / 2;
      const xa = cxs - bw - gp / 2,
        xb = cxs + gp / 2;
      const ha = ih * d.a / max,
        hb = ih * d.b / max;
      const ta = tip ? ` data-tip="${enc(tip(d, 'a'))}"` : '';
      const tb = tip ? ` data-tip="${enc(tip(d, 'b'))}"` : '';
      bars += `<g class="cc-vbar"${ta}><rect x="${xa.toFixed(1)}" y="${(pad.t + ih - ha).toFixed(1)}" width="${bw}" height="${ha.toFixed(1)}" rx="3" fill="${PRIMARY}"></rect></g>` + `<g class="cc-vbar"${tb}><rect x="${xb.toFixed(1)}" y="${(pad.t + ih - hb).toFixed(1)}" width="${bw}" height="${hb.toFixed(1)}" rx="3" fill="#C7C9CD"></rect></g>` + `<text class="cc-cat" x="${cxs.toFixed(1)}" y="${h - 14}" text-anchor="middle">${enc(d.label)}</text>`;
    });
    return svg(w, h, grid + bars);
  }

  /* ── tooltip (singleton, fixed) ────────────────────────────── */
  let tipEl = null;
  function ensureTip() {
    if (tipEl && document.body.contains(tipEl)) return tipEl;
    tipEl = document.createElement('div');
    tipEl.className = 'cc-tip';
    document.body.appendChild(tipEl);
    return tipEl;
  }
  function bindTips(root) {
    const tip = ensureTip();
    const show = e => {
      const t = e.target.closest('[data-tip]');
      if (!t) return;
      tip.innerHTML = t.getAttribute('data-tip');
      tip.style.opacity = '1';
      move(e);
    };
    const move = e => {
      tip.style.left = e.clientX + 'px';
      tip.style.top = e.clientY - 14 + 'px';
    };
    const hide = e => {
      if (e.target.closest && e.target.closest('[data-tip]')) tip.style.opacity = '0';
    };
    root.addEventListener('mouseover', show);
    root.addEventListener('mousemove', e => {
      if (tip.style.opacity === '1') move(e);
    });
    root.addEventListener('mouseout', hide);
  }

  /* ── styles (injected once) ────────────────────────────────── */
  function ensureStyles() {
    if (document.getElementById('cpv-charts-style')) return;
    const css = `
      .cc-cat{font-family:var(--font-body);font-size:12px;fill:var(--ink-2)}
      .cc-val{font-family:var(--font-body);font-size:12px;font-weight:600;fill:var(--ink)}
      .cc-axis{font-family:var(--font-body);font-size:11px;fill:var(--muted-2)}
      .cc-axis-title{font-family:var(--font-body);font-size:11px;font-weight:500;fill:var(--muted)}
      .cc-grid{stroke:#E7EAEE;stroke-width:1}
      .cc-bar,.cc-vbar,.cc-seg,.cc-dot{cursor:default}
      .cc-bar:hover rect:last-of-type{filter:brightness(.95)}
      .cc-vbar:hover{opacity:.86}
      .cc-vbar{transition:opacity .12s ease}
      .cc-seg{transition:transform .12s cubic-bezier(.16,1,.3,1)}
      .cc-seg:hover{transform:translate(var(--tx,0),var(--ty,0))}
      .cc-dot{transition:r .12s ease,fill-opacity .12s ease}
      .cc-dot:hover{fill-opacity:1}
      .cc-donut-num{font-family:var(--font-display);font-size:19px;font-weight:700;fill:var(--ink)}
      .cc-donut-cap{font-family:var(--font-body);font-size:9px;fill:var(--muted);letter-spacing:.06em;text-transform:uppercase}
      .cc-quad-label{font-family:var(--font-body);font-size:11px;font-weight:600;fill:var(--muted);letter-spacing:.02em;text-transform:uppercase;paint-order:stroke;stroke:var(--card);stroke-width:3px;stroke-linejoin:round}
      .cc-tip{position:fixed;z-index:120;pointer-events:none;background:var(--card);border:1px solid var(--line);
        border-radius:var(--radius-md);box-shadow:var(--shadow-e2);padding:6px 10px;font-size:12px;color:var(--ink);
        font-weight:500;line-height:1.4;opacity:0;transition:opacity .12s ease;white-space:nowrap;
        transform:translate(-50%,-100%);font-variant-numeric:tabular-nums}
    `;
    const el = document.createElement('style');
    el.id = 'cpv-charts-style';
    el.textContent = css;
    document.head.appendChild(el);
  }
  ensureStyles();
  window.cpvCharts = {
    PALETTE,
    hbar,
    vbars,
    donut,
    scatter,
    quadrant,
    radar,
    groupedBars,
    bindTips,
    ensureStyles,
    _enc: enc
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/charts.js", error: String((e && e.message) || e) }); }

// coopervision/views/mapa.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/mapa.js — V3 Mapa
   Registra window.cpvViews['/mapa']. Layout full-bleed: panel 360px +
   mapa Leaflet fluido (CartoDB Positron). Filtros (búsqueda / tipo /
   valoración) 100% funcionales sobre los 40 mock de opticas_google.
   Marcadores: cliente círculo 12px accent, no cliente 10px gris.
   data-place-id en items y en el botón del popup (drawer V5 en Lote 3).
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── formato es-ES manual (igual que resumen.js / bi.js) ───── */
  const group = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const fmtInt = n => group(String(Math.round(Math.abs(n))));
  function fmtDec(n, d) {
    const f = Math.abs(Number(n)).toFixed(d),
      p = f.split('.');
    return group(p[0]) + (p[1] ? ',' + p[1] : '');
  }
  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function debounce(fn, ms) {
    let t;
    return function () {
      const a = arguments,
        c = this;
      clearTimeout(t);
      t = setTimeout(() => fn.apply(c, a), ms);
    };
  }

  /* ── colores marcador ──────────────────────────────────────── */
  const M_CLIENT = {
    fillColor: '#C5E817',
    color: '#8FA710',
    radius: 6,
    weight: 1.6,
    fillOpacity: 0.92
  };
  const M_OTHER = {
    fillColor: '#C7C9CD',
    color: '#A8AAAE',
    radius: 5,
    weight: 1.3,
    fillOpacity: 0.85
  };
  const CENTER = [40.4168, -3.7038];
  const ZOOM = 6;
  const TILE = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

  /* ── estado del módulo (instancia única de mapa) ───────────── */
  let _map = null,
    _layer = null,
    _markers = {},
    _selected = null;

  /* ── opticas con flag client ───────────────────────────────── */
  function getOpticas(md) {
    return md.opticas_google.map(o => ({
      o: o,
      client: md.helpers.is_client(o.place_id)
    }));
  }
  function applyFilters(list, f) {
    const q = (f.q || '').trim().toLowerCase();
    return list.filter(x => {
      if (f.tipo === 'partners' && !x.client) return false;
      if (f.tipo === 'no' && x.client) return false;
      if (x.o.rating < f.min) return false;
      if (q) {
        const hay = (x.o.name + ' ' + x.o.city + ' ' + x.o.state + ' ' + x.o.address).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    }).sort((a, b) => b.o.rating - a.o.rating || b.o.reviews - a.o.reviews);
  }

  /* ── popup HTML (spec §V3.4, 280px) ────────────────────────── */
  function popupHTML(x) {
    const o = x.o;
    const pill = x.client ? '<span class="pill pill-accent pill-sm"><iconify-icon icon="iconoir:verified-badge" width="11"></iconify-icon>Cliente</span>' : '<span class="pill pill-paused pill-sm">Otra</span>';
    const web = o.website ? ' · <a href="' + enc(o.website) + '" target="_blank" rel="noopener">Web</a>' : '';
    const phone = o.phone ? enc(o.phone) : 'Sin teléfono';
    return '<div class="cpv-map-pop">' + '<div class="cpv-map-pop-head"><span class="cpv-map-pop-name">' + enc(o.name) + '</span>' + pill + '</div>' + '<div class="cpv-map-pop-addr">' + enc(o.address) + '</div>' + '<div class="cpv-map-pop-rating"><span class="cpv-star">★</span> ' + fmtDec(o.rating, 1) + ' <span style="color:var(--muted);font-weight:400">· ' + fmtInt(o.reviews) + ' reseñas</span></div>' + '<div class="cpv-map-pop-contact">' + phone + web + '</div>' + '<button class="btn btn-primary btn-sm" data-place-id="' + enc(o.place_id) + '" data-action="open-detalle">' + 'Ver detalle completo<iconify-icon icon="iconoir:arrow-right" width="14"></iconify-icon></button>' + '</div>';
  }

  /* ── item de lista (~56px) ─────────────────────────────────── */
  function itemHTML(x) {
    const o = x.o;
    const dot = '<span class="cpv-map-item-dot" style="background:' + (x.client ? '#C5E817' : '#C7C9CD') + '"></span>';
    const badge = x.client ? '<span class="pill pill-accent pill-sm"><span class="pill-dot"></span>Cliente</span>' : '';
    return '<button class="cpv-map-item" data-place-id="' + enc(o.place_id) + '">' + dot + '<span class="cpv-map-item-body">' + '<span class="cpv-map-item-name-row"><span class="cpv-map-item-name">' + enc(o.name) + '</span>' + badge + '</span>' + '<span class="cpv-map-item-meta">' + enc(o.city) + ' · <span class="cpv-star">★</span> ' + fmtDec(o.rating, 1) + ' · ' + fmtInt(o.reviews) + ' reseñas</span>' + '</span></button>';
  }

  /* ════ RENDER · shell full-bleed ════ */
  function panelControls() {
    return '<div class="cpv-mapa-head">' + '<h1 class="page-title">Mapa</h1>' + '</div>' + '<div class="cpv-mapa-controls">' + '<div class="input-wrap">' + '<span class="input-icon"><iconify-icon icon="iconoir:search" width="16"></iconify-icon></span>' + '<input class="input input-sm" id="cpv-map-q" type="text" placeholder="Buscar óptica, ciudad o provincia…" autocomplete="off">' + '<span class="input-suffix" id="cpv-map-q-clear" style="display:none"><iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></span>' + '</div>' + '<div class="cpv-map-field">' + '<span class="cpv-map-field-label">Tipo de óptica</span>' + '<div class="cpv-map-seg" id="cpv-map-tipo" data-tipo="todas">' + '<button data-t="todas" class="on">Todas</button>' + '<button data-t="partners">Partners</button>' + '<button data-t="no">No partners</button>' + '</div>' + '</div>' + '<div class="cpv-map-field">' + '<div class="cpv-map-field-head"><span class="cpv-map-field-label">Valoración mínima</span>' + '<span class="cpv-map-field-val" id="cpv-map-rating-val">Todas</span></div>' + '<input type="range" class="slider" id="cpv-map-rating" min="0" max="5" step="0.5" value="0">' + '<div class="cpv-map-ticks"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>' + '</div>' + '</div>';
  }
  function renderDefault() {
    return '<div class="cpv-mapa">' + '<aside class="cpv-mapa-panel">' + panelControls() + '<div class="cpv-map-results-head">' + '<span class="cpv-map-results-title">Resultados · <b id="cpv-map-count">0</b></span>' + '<button class="cpv-map-reset" id="cpv-map-reset"><iconify-icon icon="iconoir:refresh" width="13"></iconify-icon>Reset</button>' + '</div>' + '<div class="cpv-map-list" id="cpv-map-list"></div>' + '</aside>' + '<div class="cpv-mapa-map">' + '<div class="cpv-leaflet" id="cpv-leaflet"></div>' + '<div class="cpv-map-legend">' + '<span class="cpv-map-legend-item"><span class="cpv-map-legend-dot" style="background:#C5E817"></span>Partners</span>' + '<span class="cpv-map-legend-item"><span class="cpv-map-legend-dot" style="background:#C7C9CD"></span>Otras ópticas</span>' + '</div>' + '</div>' + '</div>';
  }

  /* ════ RENDER · loading (tiles + skeleton lista) ════ */
  function renderLoading() {
    let items = '';
    for (let i = 0; i < 7; i++) {
      items += '<div style="display:flex;gap:10px;align-items:center;padding:9px 11px">' + '<span class="skeleton" style="width:10px;height:10px;border-radius:99px"></span>' + '<div style="flex:1;display:flex;flex-direction:column;gap:6px">' + '<span class="skeleton sk-text-sm" style="width:70%"></span>' + '<span class="skeleton sk-text-sm" style="width:45%"></span></div></div>';
    }
    return '<div class="cpv-mapa">' + '<aside class="cpv-mapa-panel">' + '<div class="cpv-mapa-head">' + '<h1 class="page-title">Mapa</h1></div>' + '<div class="cpv-mapa-controls">' + '<span class="skeleton" style="height:32px"></span>' + '<span class="skeleton" style="height:36px;border-radius:var(--radius-md)"></span>' + '<span class="skeleton" style="height:30px"></span></div>' + '<div class="cpv-map-results-head"><span class="skeleton sk-text-sm" style="width:120px"></span></div>' + '<div class="cpv-map-list">' + items + '</div>' + '</aside>' + '<div class="cpv-mapa-map"><div class="cpv-map-placeholder">' + '<iconify-icon class="ph-icon" icon="iconoir:map" width="30"></iconify-icon>' + '<span class="ph-text">Cargando mapa…</span></div></div>' + '</div>';
  }

  /* ════ RENDER · empty (BBDD vacía) ════ */
  function renderEmpty(ctx) {
    return '<div class="cpv-mapa">' + '<aside class="cpv-mapa-panel">' + '<div class="cpv-mapa-head">' + '<h1 class="page-title">Mapa</h1></div>' + '<div class="cpv-map-results-head"><span class="cpv-map-results-title">Resultados · <b>0</b></span></div>' + '<div class="cpv-map-empty">' + '<iconify-icon class="cpv-map-empty-icon" icon="iconoir:map-xmark" width="30"></iconify-icon>' + '<span class="cpv-map-empty-text">No hay ópticas en la base de datos todavía.</span>' + (ctx.role === 'admin' ? '<a class="btn btn-primary btn-sm" href="#/admin/operaciones"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Lanzar sincronización</a>' : '') + '</div>' + '</aside>' + '<div class="cpv-mapa-map"><div class="cpv-map-placeholder">' + '<iconify-icon class="ph-icon" icon="iconoir:map-pin" width="30"></iconify-icon>' + '<span class="ph-text">Sin ópticas que situar en el mapa.</span></div></div>' + '</div>';
  }

  /* ════ RENDER · error ════ */
  function renderError() {
    return '<div class="cpv-mapa">' + '<aside class="cpv-mapa-panel">' + '<div class="cpv-mapa-head">' + '<h1 class="page-title">Mapa</h1></div>' + '<div class="cpv-map-empty" style="margin-top:var(--space-6)">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="30"></iconify-icon>' + '<span class="cpv-map-empty-text">No se pudieron cargar las ubicaciones.</span>' + '<button class="btn btn-primary btn-sm" data-action="retry"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div>' + '</aside>' + '<div class="cpv-mapa-map"><div class="cpv-map-placeholder">' + '<iconify-icon class="ph-icon" icon="iconoir:map" width="30"></iconify-icon>' + '<span class="ph-text">Error al cargar el mapa.</span></div></div>' + '</div>';
  }

  /* ── interacciones (solo en default) ───────────────────────── */
  function mounted(root, state, ctx) {
    if (state !== 'default') return;
    if (typeof L === 'undefined') return; // Leaflet no disponible

    const md = ctx.md;
    const all = getOpticas(md);
    const filters = {
      q: '',
      tipo: 'todas',
      min: 0
    };
    const listEl = root.querySelector('#cpv-map-list');
    const countEl = root.querySelector('#cpv-map-count');
    const mapEl = root.querySelector('#cpv-leaflet');

    /* destruye instancia previa (el DOM se reemplaza en cada render) */
    if (_map) {
      try {
        _map.remove();
      } catch (e) {}
      _map = null;
    }
    _markers = {};
    _selected = null;
    _map = L.map(mapEl, {
      center: CENTER,
      zoom: ZOOM,
      zoomControl: false,
      scrollWheelZoom: true
    });
    L.control.zoom({
      position: 'bottomright'
    }).addTo(_map);
    L.tileLayer(TILE, {
      attribution: TILE_ATTR,
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(_map);
    _layer = L.layerGroup().addTo(_map);
    // Leaflet necesita recalcular tamaño tras inyectar el contenedor full-bleed
    setTimeout(() => {
      if (_map) _map.invalidateSize();
    }, 60);

    // TODO: leaflet.markercluster en producción (19k puntos). Con los 40 mock
    // se renderizan marcadores sueltos sobre _layer; en prod, sustituir _layer
    // por un L.markerClusterGroup con clustering en zoom < 8.

    function baseStyle(x) {
      return x.client ? M_CLIENT : M_OTHER;
    }
    function buildMarkers(filtered) {
      _layer.clearLayers();
      _markers = {};
      filtered.forEach(x => {
        const m = L.circleMarker([x.o.latitude, x.o.longitude], baseStyle(x));
        m.bindPopup(popupHTML(x), {
          maxWidth: 280,
          minWidth: 280,
          className: 'cpv-map-popup',
          closeButton: true
        });
        m.on('click', () => highlight(x.o.place_id, false));
        m._pid = x.o.place_id;
        _layer.addLayer(m);
        _markers[x.o.place_id] = m;
      });
    }
    function setSelectedStyle() {
      Object.keys(_markers).forEach(pid => {
        const m = _markers[pid];
        const x = all.find(a => a.o.place_id === pid);
        const base = baseStyle(x);
        if (pid === _selected) m.setStyle({
          radius: base.radius + 3,
          weight: 2.4,
          color: '#5E7406',
          fillOpacity: 1
        });else m.setStyle(base);
      });
    }
    function highlight(pid, fly) {
      _selected = pid;
      // lista
      listEl.querySelectorAll('.cpv-map-item').forEach(el => el.classList.toggle('on', el.dataset.placeId === pid));
      const sel = listEl.querySelector('.cpv-map-item.on');
      if (sel) listEl.scrollTo({
        top: Math.max(0, sel.offsetTop - 8),
        behavior: 'smooth'
      });
      // marcador
      const m = _markers[pid];
      if (m) {
        if (fly) _map.flyTo(m.getLatLng(), 16, {
          duration: 0.7
        });
        m.openPopup();
      }
      setSelectedStyle();
    }
    function refresh(opts) {
      const filtered = applyFilters(all, filters);
      countEl.textContent = fmtInt(filtered.length);
      // lista
      if (filtered.length === 0) {
        listEl.innerHTML = '<div class="cpv-map-empty">' + '<iconify-icon class="cpv-map-empty-icon" icon="iconoir:filter-list" width="28"></iconify-icon>' + '<span class="cpv-map-empty-text">No hay ópticas con esos filtros.</span>' + '<button class="btn btn-ghost btn-sm" data-action="map-reset">Limpiar filtros</button></div>';
      } else {
        listEl.innerHTML = filtered.map(itemHTML).join('');
      }
      buildMarkers(filtered);
      // si la selección sigue visible, mantenla; si no, deselecciona
      if (_selected && !_markers[_selected]) _selected = null;
      setSelectedStyle();
      // búsqueda que deja 1 resultado → flyTo
      if (opts && opts.flyIfSingle && filtered.length === 1) {
        highlight(filtered[0].o.place_id, true);
      }
    }

    /* ── búsqueda (debounce 300ms) + limpiable ── */
    const qInput = root.querySelector('#cpv-map-q');
    const qClear = root.querySelector('#cpv-map-q-clear');
    const onSearch = debounce(() => {
      refresh({
        flyIfSingle: true
      });
    }, 300);
    qInput.addEventListener('input', () => {
      filters.q = qInput.value;
      qClear.style.display = qInput.value ? 'flex' : 'none';
      onSearch();
    });
    qClear.addEventListener('click', () => {
      qInput.value = '';
      filters.q = '';
      qClear.style.display = 'none';
      qInput.focus();
      refresh();
    });

    /* ── segmented tipo ── */
    const seg = root.querySelector('#cpv-map-tipo');
    seg.addEventListener('click', e => {
      const b = e.target.closest('button[data-t]');
      if (!b) return;
      filters.tipo = b.getAttribute('data-t');
      seg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      refresh();
    });

    /* ── slider valoración ── */
    const slider = root.querySelector('#cpv-map-rating');
    const ratingVal = root.querySelector('#cpv-map-rating-val');
    slider.addEventListener('input', () => {
      filters.min = parseFloat(slider.value);
      ratingVal.innerHTML = filters.min === 0 ? 'Todas' : fmtDec(filters.min, 1) + ' <span class="cpv-star" style="color:#E0B600">★</span>';
      refresh();
    });

    /* ── reset filtros ── */
    function resetFilters() {
      filters.q = '';
      filters.tipo = 'todas';
      filters.min = 0;
      qInput.value = '';
      qClear.style.display = 'none';
      ratingVal.textContent = 'Todas';
      slider.value = '0';
      seg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x.getAttribute('data-t') === 'todas'));
      _selected = null;
      refresh();
      _map.flyTo(CENTER, ZOOM, {
        duration: 0.6
      });
    }
    root.querySelector('#cpv-map-reset').addEventListener('click', resetFilters);

    /* ── click en item de lista → flyTo + selecciona ── */
    listEl.addEventListener('click', e => {
      const reset = e.target.closest('[data-action="map-reset"]');
      if (reset) {
        resetFilters();
        return;
      }
      const item = e.target.closest('.cpv-map-item');
      if (!item) return;
      highlight(item.dataset.placeId, true);
    });

    /* ── render inicial ── */
    refresh();
  }

  /* ── registro ──────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/mapa'] = {
    render(state, ctx) {
      if (state === 'loading') return renderLoading();
      if (state === 'empty') return renderEmpty(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault();
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/mapa.js", error: String((e && e.message) || e) }); }

// coopervision/views/perfil.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/perfil.js
   Vista de perfil de usuario. Accesible para ambos roles.
   3 cards: Datos personales · Seguridad · Acerca de.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ── get session user ─────────────────────────────────────── */
  function getUser(md) {
    var uid = md.sesion && md.sesion.usuario_actual_id;
    var u = uid && (md.usuarios || []).find(function (x) {
      return x.id === uid;
    });
    if (!u) u = (md.usuarios || []).find(function (x) {
      return x.rol === 'admin';
    });
    if (!u) u = (md.usuarios || [])[0];
    return u || {
      id: 1,
      nombre: 'Usuario',
      email: 'usuario@coopervision.es',
      rol: 'user',
      activo: true
    };
  }

  /* ════ RENDER DEFAULT ════════════════════════════════════ */
  function renderDefault(ctx) {
    var u = getUser(ctx.md);
    var role = ctx.role || 'user';
    var rolPill = role === 'admin' ? '<span class="pill pill-accent pill-sm">Admin</span>' : '<span class="pill pill-neutral pill-sm">Usuario</span>';
    var initials = (u.nombre || '').split(/\s+/).slice(0, 2).map(function (w) {
      return (w[0] || '').toUpperCase();
    }).join('');
    return '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Mi perfil</h1>' + '</div></div>' + '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' + /* ── Avatar + nombre (visual solo) ── */
    '<div style="display:flex;align-items:center;gap:var(--space-5);padding:var(--space-5) 0">' + '<div class="avatar" style="width:56px;height:56px;font-size:20px;font-weight:700;flex-shrink:0">' + enc(initials) + '</div>' + '<div>' + '<div style="font-family:var(--font-display);font-size:18px;font-weight:700;letter-spacing:-.015em">' + enc(u.nombre) + '</div>' + '<div style="display:flex;align-items:center;gap:8px;margin-top:4px">' + '<span class="body-sm c-muted">' + enc(u.email) + '</span>' + rolPill + '</div>' + '</div>' + '</div>' + /* ── Card Datos personales ── */
    '<div class="card">' + '<h2 class="display-md" style="margin-bottom:var(--space-5)">Datos personales</h2>' + '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="form-group">' + '<label class="form-label" for="prf-nombre">Nombre completo</label>' + '<input class="input" id="prf-nombre" type="text" value="' + enc(u.nombre) + '" autocomplete="name">' + '</div>' + '<div class="form-group">' + '<label class="form-label" for="prf-email">Email</label>' + '<input class="input" id="prf-email" type="email" value="' + enc(u.email) + '" disabled>' + '<span class="form-hint">El email no se puede modificar desde aquí. Contacta con el administrador.</span>' + '</div>' + '<div class="form-group">' + '<label class="form-label">Rol</label>' + '<div style="margin-top:4px;display:flex;align-items:center;gap:8px">' + rolPill + '<span class="body-xs c-muted">' + (role === 'admin' ? 'Acceso total a todas las funciones.' : 'Solo lectura · no puede editar datos.') + '</span>' + '</div>' + '</div>' + '</div>' + '<div style="margin-top:var(--space-6);display:flex;justify-content:flex-end">' + '<button class="btn btn-primary btn-sm" id="prf-save">' + '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar cambios</button>' + '</div>' + '</div>' + /* ── Card Seguridad ── */
    '<div class="card">' + '<h2 class="display-md" style="margin-bottom:var(--space-5)">Seguridad</h2>' + '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="form-group">' + '<label class="form-label" for="prf-pwd-cur">Contraseña actual</label>' + '<input class="input" id="prf-pwd-cur" type="password" placeholder="••••••••" autocomplete="current-password">' + '</div>' + '<div class="form-group">' + '<label class="form-label" for="prf-pwd-new">Nueva contraseña</label>' + '<input class="input" id="prf-pwd-new" type="password" placeholder="Mínimo 8 caracteres" autocomplete="new-password">' + '</div>' + '<div class="form-group">' + '<label class="form-label" for="prf-pwd-confirm">Confirmar nueva contraseña</label>' + '<input class="input" id="prf-pwd-confirm" type="password" placeholder="Repite la contraseña" autocomplete="new-password">' + '<span class="form-error" id="prf-pwd-err" style="display:none">Las contraseñas no coinciden.</span>' + '</div>' + '</div>' + '<div style="margin-top:var(--space-6);display:flex;justify-content:flex-end">' + '<button class="btn btn-ghost btn-sm" id="prf-pwd-save">' + '<iconify-icon icon="iconoir:lock" width="14"></iconify-icon>Cambiar contraseña</button>' + '</div>' + '</div>' + '</div>'; /* max-width wrapper */
  }

  /* ════ RENDER LOADING ════════════════════════════════════ */
  function renderLoading() {
    return '<div class="page-header"><div class="page-header-left">' + '<span class="skeleton sk-text-sm" style="width:80px;display:block;margin-bottom:8px"></span>' + '<span class="skeleton" style="width:180px;height:30px;display:block"></span>' + '</div></div>' + '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="card" style="min-height:240px"><span class="skeleton" style="display:block;height:100%;border-radius:var(--radius-md)"></span></div>' + '<div class="card" style="min-height:200px"><span class="skeleton" style="display:block;height:100%;border-radius:var(--radius-md)"></span></div>' + '</div>';
  }

  /* ════ RENDER ERROR ══════════════════════════════════════ */
  function renderError(ctx) {
    return '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Mi perfil</h1>' + '</div></div>' + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">Error al cargar el perfil</h2>' + '<button class="btn btn-primary btn-sm" data-action="retry">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ════ MOUNTED ═══════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    if (state !== 'default') return;

    /* Guardar datos personales */
    var saveBtn = root.querySelector('#prf-save');
    if (saveBtn) saveBtn.addEventListener('click', function () {
      var nombre = (root.querySelector('#prf-nombre') || {}).value || '';
      if (!nombre.trim()) {
        ctx.toast('error', 'Nombre requerido', 'El nombre no puede estar vacío.');
        return;
      }
      ctx.toast('success', 'Perfil actualizado', 'Los cambios se han guardado correctamente.');
    });

    /* Cambiar contraseña — validación live */
    var pwdNew = root.querySelector('#prf-pwd-new');
    var pwdConf = root.querySelector('#prf-pwd-confirm');
    var pwdErr = root.querySelector('#prf-pwd-err');
    function checkMatch() {
      if (!pwdNew || !pwdConf || !pwdErr) return;
      var mismatch = pwdNew.value.length > 0 && pwdConf.value.length > 0 && pwdNew.value !== pwdConf.value;
      pwdErr.style.display = mismatch ? '' : 'none';
      pwdConf.classList.toggle('input-error', mismatch);
    }
    if (pwdNew) pwdNew.addEventListener('input', checkMatch);
    if (pwdConf) pwdConf.addEventListener('input', checkMatch);

    /* Cambiar contraseña — submit */
    var pwdSave = root.querySelector('#prf-pwd-save');
    if (pwdSave) pwdSave.addEventListener('click', function () {
      var cur = (root.querySelector('#prf-pwd-cur') || {}).value || '';
      var nw = (pwdNew || {}).value || '';
      var conf = (pwdConf || {}).value || '';
      if (!cur.trim()) {
        ctx.toast('error', 'Campo requerido', 'Introduce tu contraseña actual.');
        return;
      }
      if (!nw.trim()) {
        ctx.toast('error', 'Campo requerido', 'Introduce la nueva contraseña.');
        return;
      }
      if (nw.length < 8) {
        ctx.toast('error', 'Contraseña demasiado corta', 'La nueva contraseña debe tener al menos 8 caracteres.');
        return;
      }
      if (nw !== conf) {
        ctx.toast('error', 'Las contraseñas no coinciden', 'La confirmación no coincide con la nueva contraseña.');
        return;
      }
      /* OK */
      ctx.toast('success', 'Contraseña cambiada', 'Tu contraseña se ha actualizado correctamente.');
      ['#prf-pwd-cur', '#prf-pwd-new', '#prf-pwd-confirm'].forEach(function (s) {
        var el = root.querySelector(s);
        if (el) el.value = '';
      });
      if (pwdErr) {
        pwdErr.style.display = 'none';
      }
      if (pwdConf) pwdConf.classList.remove('input-error');
    });
  }
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/perfil'] = {
    render: function (state, ctx) {
      if (state === 'loading') return renderLoading(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/perfil.js", error: String((e && e.message) || e) }); }

// coopervision/views/resumen.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/resumen.js — V1 Resumen
   Registra window.cpvViews['/'] consumido por app.js renderView().
   render(state, ctx) -> htmlString ; mounted(root, state, ctx).
   Lee de window.mockData; agregaciones precomputadas en resumen_kpis,
   top_provincias, dist_categorias, dist_valoraciones,
   top_ciudades_engagement. Charts dibujados a mano vía cpvCharts.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const C = window.cpvCharts;

  /* ── formato (1.234 miles · 1,5 decimales · 1,2K/1,2M) ─────── */
  // toLocaleString('es-ES') no agrupa de forma fiable en todos los
  // runtimes, así que formateamos a mano: punto miles, coma decimal.
  function groupThousands(intStr) {
    return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  const fmtInt = n => groupThousands(String(Math.round(Math.abs(n))));
  function fmtDec(n, d) {
    const fixed = Math.abs(Number(n)).toFixed(d);
    const parts = fixed.split('.');
    return groupThousands(parts[0]) + (parts[1] ? ',' + parts[1] : '');
  }
  function fmtCompact(n) {
    if (n >= 1e6) return fmtDec(n / 1e6, 1).replace(',0', '') + 'M';
    if (n >= 1e3) return fmtDec(n / 1e3, 1).replace(',0', '') + 'k';
    return fmtInt(n);
  }
  const enc = C._enc;

  /* ── KPI card ──────────────────────────────────────────────── */
  function kpi(o) {
    const tag = o.href ? 'a' : 'div';
    const hrefAttr = o.href ? ` href="${o.href}"` : '';
    const cls = 'card card-compact cpv-kpi' + (o.accent ? ' card-accent' : '') + (o.href ? ' cpv-kpi-link' : '');
    let headRight = '';
    if (o.accent) {
      headRight += `<iconify-icon icon="iconoir:star-solid" width="14" style="color:var(--accent-ink-deep)"></iconify-icon>`;
    }
    if (o.href) {
      headRight += `<iconify-icon class="cpv-kpi-arrow" icon="iconoir:arrow-right" width="16"></iconify-icon>`;
    }
    let head = `<span class="eyebrow-t">${enc(o.label)}</span>`;
    if (headRight) {
      head = `<span class="cpv-kpi-head"><span class="eyebrow-t">${enc(o.label)}</span>` + `<span class="cpv-kpi-head-right">${headRight}</span></span>`;
    }
    let meta = '';
    if (o.delta || o.metaRight) {
      meta = `<div class="cpv-kpi-meta">` + (o.delta ? `<span class="kpi-delta pos"><iconify-icon icon="iconoir:arrow-up-right" width="13"></iconify-icon>${enc(o.delta)}</span>` : '') + (o.metaRight ? `<span class="body-xs c-muted">${enc(o.metaRight)}</span>` : '') + `</div>`;
    }
    const sub = o.sub ? `<div class="kpi-subtitle">${enc(o.sub)}</div>` : '';
    return `<${tag}${hrefAttr} class="${cls}">${head}` + `<div class="kpi-value">${o.value}</div>${meta}${sub}</${tag}>`;
  }

  /* ── card header ───────────────────────────────────────────── */
  function cardHead(title, right) {
    return `<div class="card-head"><div><h3 class="display-md" style="margin:0">${enc(title)}</h3></div>` + (right || '') + `</div>`;
  }

  /* ── legend (donut) ────────────────────────────────────────── */
  function donutLegend(data, total) {
    const pal = C.PALETTE;
    return `<div class="cpv-legend">` + data.map((d, i) => {
      const pct = fmtDec(d.count / total * 100, 1);
      return `<div class="cpv-legend-row">` + `<span class="cpv-legend-dot" style="background:${pal[i % pal.length]}"></span>` + `<span class="cpv-legend-label truncate">${enc(d.categoria)}</span>` + `<span class="cpv-legend-val">${pct}%</span></div>`;
    }).join('') + `</div>`;
  }

  /* ════ RENDER · DEFAULT ════ */
  function renderDefault(ctx) {
    const md = ctx.md,
      k = md.resumen_kpis;
    const total = md.dist_categorias.reduce((s, d) => s + d.count, 0);

    /* Header */
    const header = '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Resumen</h1>' + '<p class="page-subtitle">Visión global del mercado óptico ibérico · Actualizado hace ' + md.dias_desde_ultima_sync + ' días</p>' + '</div></div>';

    /* Row 1 + 2 — 8 KPIs */
    const row1 = '<div class="kpi-grid">' + kpi({
      label: 'Total ópticas',
      value: fmtInt(k.total_opticas),
      sub: 'En la base de datos',
      href: '#/bbdd'
    }) + kpi({
      label: 'Partners CooperVision',
      accent: true,
      value: fmtInt(k.total_clientes),
      delta: '+' + k.nuevos_ult_sync,
      metaRight: fmtDec(k.pct_clientes, 1) + '% del total',
      sub: 'Nuevos esta sincronización',
      href: '#/bbdd'
    }) + kpi({
      label: 'Valoración media',
      value: fmtDec(k.valoracion_media, 2) + ' <span class="cpv-star">★</span>',
      sub: 'Global de la red',
      href: '#/bi'
    }) + kpi({
      label: 'Reseñas totales',
      value: fmtCompact(k.reseñas_total),
      sub: 'Acumuladas en Google'
    }) + '</div>';
    const row2 = '<div class="kpi-grid" style="margin-top:var(--space-4)">' + kpi({
      label: '% con web',
      value: fmtDec(k.pct_con_web, 1) + '%',
      sub: 'Cobertura digital',
      href: '#/bi'
    }) + kpi({
      label: '% con teléfono',
      value: fmtDec(k.pct_con_telefono, 1) + '%',
      sub: 'Contactabilidad',
      href: '#/bi'
    }) + kpi({
      label: 'Nº provincias',
      value: fmtInt(k.n_provincias),
      sub: 'Cobertura territorial',
      href: '#/bi'
    }) + kpi({
      label: 'Nº ciudades',
      value: fmtInt(k.n_ciudades),
      sub: 'Municipios con presencia'
    }) + '</div>';

    /* Row 3 — provincias (hbar) + categorías (donut) */
    const provChart = C.hbar({
      data: md.top_provincias,
      label: 'provincia',
      value: 'total',
      accentTop: 3,
      fmt: fmtInt,
      labelW: 92,
      w: 540,
      rowH: 24,
      gap: 9,
      tip: d => `<b>${d.provincia}</b> · ${fmtInt(d.total)} ópticas · ${d.clientes} partners`
    });
    const donutChart = C.donut({
      data: md.dist_categorias,
      value: 'count',
      size: 178,
      inner: 0.6,
      centerTop: fmtCompact(total),
      centerSub: 'ópticas',
      tip: (d, f) => `<b>${d.categoria}</b> · ${fmtInt(d.count)} · ${fmtDec(f * 100, 1)}%`
    });
    const row3 = '<div class="cpv-grid-2" style="margin-top:var(--space-4)">' + '<div class="card">' + cardHead('Top 10 provincias', '<span class="body-xs c-muted">por nº de ópticas</span>') + '<div class="cpv-chart">' + provChart + '</div></div>' + '<div class="card">' + cardHead('Distribución por categoría') + '<div class="cpv-donut-wrap">' + donutChart + donutLegend(md.dist_categorias, total) + '</div></div>' + '</div>';

    /* Row 4 — histograma + reseñas por ciudad */
    const totalVal = md.dist_valoraciones.reduce((s, d) => s + d.count, 0);
    const histChart = C.vbars({
      data: md.dist_valoraciones,
      label: 'rango',
      value: 'count',
      fmt: fmtCompact,
      w: 540,
      h: 248,
      tip: d => `<b>${d.rango}</b> · ${fmtInt(d.count)} · ${fmtDec(d.count / totalVal * 100, 1)}%`
    });
    const ciudadChart = C.hbar({
      data: md.top_ciudades_engagement,
      label: 'ciudad',
      value: 'reseñas_total',
      accentTop: 3,
      fmt: fmtCompact,
      labelW: 84,
      w: 540,
      rowH: 18,
      gap: 6.5,
      tip: d => `<b>${d.ciudad}</b> · ${fmtInt(d.reseñas_total)} reseñas`
    });
    const row4 = '<div class="cpv-grid-2" style="margin-top:var(--space-4)">' + '<div class="card">' + cardHead('Distribución de valoraciones', '<span class="body-xs c-muted">nº de ópticas</span>') + '<div class="cpv-chart">' + histChart + '</div></div>' + '<div class="card">' + cardHead('Reseñas totales por ciudad', '<span class="body-xs c-muted">top 10</span>') + '<div class="cpv-chart">' + ciudadChart + '</div></div>' + '</div>';

    /* Row 5 — Top 10 ópticas (tabla densa) */
    const top = md.opticas_google.slice().sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 10);
    const rows = top.map((o, i) => {
      const client = md.helpers.is_client(o.place_id);
      const badge = client ? ' <span class="pill pill-accent pill-sm"><span class="pill-dot"></span>Cliente</span>' : '';
      return `<tr data-place-id="${enc(o.place_id)}">` + `<td class="col-sticky cpv-rank">${i + 1}</td>` + `<td><span class="cpv-cell-name">${enc(o.name)}</span>${badge}</td>` + `<td class="c-ink2">${enc(o.city)}</td>` + `<td class="c-ink2">${enc(o.state)}</td>` + `<td class="tnum" style="text-align:right"><span class="cpv-star">★</span> ${fmtDec(o.rating, 2)}</td>` + `<td class="tnum c-muted" style="text-align:right">${fmtInt(o.reviews)}</td>` + `</tr>`;
    }).join('');
    const table = '<div class="card" style="margin-top:var(--space-4);padding:0;overflow:hidden">' + '<div class="card-head" style="padding:var(--space-6) var(--space-6) var(--space-5)">' + '<div><h3 class="display-md" style="margin:0">Top 10 ópticas por valoración</h3></div>' + '<a class="btn btn-ghost btn-sm" href="#/bbdd">Ver todas<iconify-icon icon="iconoir:arrow-right" width="14"></iconify-icon></a>' + '</div>' + '<div class="table-wrap" style="border:0;border-top:1px solid var(--line);border-radius:0;max-height:none">' + '<table class="table-dense"><thead><tr>' + '<th class="col-sticky" style="width:48px">#</th><th>Óptica</th><th>Ciudad</th><th>Provincia</th>' + '<th style="text-align:right">Valoración</th><th style="text-align:right">Reseñas</th>' + '</tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    return header + row1 + row2 + row3 + row4 + table;
  }

  /* ════ RENDER · LOADING (skeleton por componente) ════ */
  function renderLoading() {
    const kCard = () => '<div class="card card-compact" style="display:flex;flex-direction:column;gap:10px;min-height:104px">' + '<span class="skeleton sk-text-sm" style="width:55%"></span>' + '<span class="skeleton" style="height:32px;width:68%"></span>' + '<span class="skeleton sk-text-sm" style="width:40%"></span></div>';
    const kGrid = mt => '<div class="kpi-grid"' + (mt ? ' style="margin-top:var(--space-4)"' : '') + '>' + kCard() + kCard() + kCard() + kCard() + '</div>';
    const chartCard = h => '<div class="card"><span class="skeleton sk-text-sm" style="width:38%;margin-bottom:18px"></span>' + '<span class="skeleton" style="height:' + h + 'px;border-radius:var(--radius-lg)"></span></div>';
    const chartRow = h => '<div class="cpv-grid-2" style="margin-top:var(--space-4)">' + chartCard(h) + chartCard(h) + '</div>';
    let tableRows = '';
    for (let i = 0; i < 10; i++) tableRows += '<div style="padding:0 16px"><span class="skeleton sk-row" style="margin:0"></span></div>';
    return '<div class="page-header"><div class="page-header-left">' + '<span class="skeleton sk-text-sm" style="width:240px"></span>' + '<span class="skeleton" style="width:180px;height:30px;margin-top:8px"></span>' + '<span class="skeleton sk-text-sm" style="width:320px;margin-top:8px"></span></div></div>' + kGrid(false) + kGrid(true) + chartRow(258) + chartRow(248) + '<div class="card" style="margin-top:var(--space-4);padding:14px 0">' + tableRows + '</div>';
  }

  /* ════ RENDER · EMPTY ════ */
  function renderEmpty(ctx) {
    const adminCTA = ctx.role === 'admin' ? '<a class="btn btn-primary btn-sm" href="#/admin/operaciones"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Lanzar primera sincronización</a>' : '';
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'sin datos disponibles') + '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:database-xmark" width="32"></iconify-icon>' + '<h2 class="state-title">Aún no hay datos</h2>' + '<p class="state-body">No se ha cargado ninguna óptica todavía. ' + (ctx.role === 'admin' ? 'Lanza la primera sincronización desde Administración · Operaciones.' : 'Un administrador debe lanzar la primera sincronización.') + '</p>' + adminCTA + '</div></div>';
  }

  /* ════ RENDER · ERROR ════ */
  function renderError(ctx) {
    return ctx.headerHTML(ctx.def, ctx.path).replace('vista pendiente de construcción', 'error al cargar') + '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">No se pudo cargar el resumen</h2>' + '<p class="state-body">Ha ocurrido un error al recuperar las agregaciones. Inténtalo de nuevo.</p>' + '<button class="btn btn-primary btn-sm" data-action="retry"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ── registro ──────────────────────────────────────────────── */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/'] = {
    render(state, ctx) {
      if (state === 'loading') return renderLoading();
      if (state === 'empty') return renderEmpty(ctx);
      if (state === 'error') return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted(root, state, ctx) {
      if (state === 'default') C.bindTips(root);
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/resumen.js", error: String((e && e.message) || e) }); }

// coopervision/views/sg-components.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   views/sg-components.js  ·  Componentes con variantes funcionales
   Categorías: Acciones · Feedback y estado · Formularios ·
   Contenedores · Navegación · Datos y visualización · Marcadores y mapa
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SG = window.cpvSG;
  var enc = SG.enc;
  var stage = SG.stage,
    block = SG.block,
    samples = SG.samples,
    sample = SG.sample;

  /* fila simple de elementos con gap */
  function row(items, gap) {
    return '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:' + (gap || 'var(--space-3)') + '">' + items.join('') + '</div>';
  }

  /* ══════════════════════════════════════════════════════════
     ACCIONES
  ══════════════════════════════════════════════════════════ */

  /* ── Button ── */
  function buttonDetail() {
    return block('Variantes × tamaños', 'primary / ghost / subtle / destructive / icon-only', stage('Primary', row(['<button class="btn btn-primary btn-sm"><iconify-icon icon="iconoir:plus" width="13"></iconify-icon>sm</button>', '<button class="btn btn-primary">md · default</button>', '<button class="btn btn-primary btn-lg">lg</button>', '<button class="btn btn-primary" disabled>disabled</button>', '<button class="btn btn-primary"><iconify-icon icon="iconoir:refresh-double" width="14" style="animation:spin 1s linear infinite"></iconify-icon>loading</button>']))) + '<div class="sg-cols">' + stage('Ghost', row(['<button class="btn btn-ghost btn-sm"><iconify-icon icon="iconoir:download" width="13"></iconify-icon>sm</button>', '<button class="btn btn-ghost">md</button>', '<button class="btn btn-ghost btn-lg">lg</button>', '<button class="btn btn-ghost" disabled>disabled</button>'])) + stage('Subtle', row(['<button class="btn btn-subtle btn-sm">sm</button>', '<button class="btn btn-subtle">md</button>', '<button class="btn btn-subtle btn-lg">lg</button>'])) + stage('Destructive', row(['<button class="btn btn-destructive btn-sm"><iconify-icon icon="iconoir:trash" width="13"></iconify-icon>Eliminar sm</button>', '<button class="btn btn-destructive">Eliminar md</button>', '<button class="btn btn-destructive" disabled>disabled</button>'])) + stage('Icon-only', row(['<button class="btn-icon"><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button>', '<button class="btn-icon btn-lg"><iconify-icon icon="iconoir:edit-pencil" width="18"></iconify-icon></button>', '<button class="btn-icon" disabled><iconify-icon icon="iconoir:trash" width="16"></iconify-icon></button>'])) + '</div>' + '<style>@keyframes spin{to{transform:rotate(360deg)}}</style>';
  }
  function buttonPreview() {
    return '<div style="display:flex;flex-direction:column;gap:10px;align-items:center">' + '<button class="btn btn-primary btn-sm">Primary</button>' + '<button class="btn btn-ghost btn-sm">Ghost</button>' + '</div>';
  }

  /* ── Toggle ── */
  function toggle(checked, disabled, label) {
    return '<label class="toggle-label"' + (disabled ? ' style="opacity:.5;cursor:not-allowed"' : '') + '>' + '<input type="checkbox"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '>' + '<span class="toggle-track"></span>' + '<span class="toggle-text">' + enc(label) + '</span></label>';
  }
  function toggleDetail() {
    return block('Estados', 'on / off / disabled · usado en V5 Tab Estado', stage('', samples([sample('on', toggle(true, false, 'Activa')), sample('off', toggle(false, false, 'Pausada')), sample('disabled · on', toggle(true, true, 'Bloqueada')), sample('disabled · off', toggle(false, true, 'Bloqueada'))])));
  }

  /* ── Chip de filtro ── */
  function filterChip(label, removable) {
    return '<div data-chip style="display:inline-flex;align-items:center;gap:4px;padding:4px 8px 4px 12px;background:var(--accent-soft);color:var(--accent-ink-deep);border-radius:var(--radius-full);font-size:12px;font-weight:500;border:1px solid rgba(197,232,23,.4)">' + enc(label) + (removable ? '<button data-chip-rm style="background:none;border:none;cursor:pointer;padding:0;display:flex;color:inherit;opacity:.65;margin-left:2px"><iconify-icon icon="iconoir:xmark" width="12"></iconify-icon></button>' : '') + '</div>';
  }
  function chipDetail() {
    return block('Chips de filtro', 'con valor / eliminable / limpiar todo', stage('', row([filterChip('Madrid', true), filterChip('Solo clientes', true), filterChip('Rating ≥ 4.0', true), '<button class="btn btn-ghost btn-sm">Limpiar todo</button>'], 'var(--space-2)')));
  }
  function chipPreview() {
    return row([filterChip('Madrid', true), filterChip('Clientes', true)], 'var(--space-2)');
  }

  /* ══════════════════════════════════════════════════════════
     FEEDBACK Y ESTADO
  ══════════════════════════════════════════════════════════ */

  function toastItem(type, icon, title, sub) {
    return '<div class="toast toast-' + type + '" style="position:static;margin:0;animation:none;max-width:360px">' + '<span class="toast-icon ' + type + '"><iconify-icon icon="iconoir:' + icon + '" width="18"></iconify-icon></span>' + '<div class="toast-content"><div class="toast-title">' + enc(title) + '</div>' + (sub ? '<div class="toast-body">' + enc(sub) + '</div>' : '') + '</div>' + '<button class="toast-close"><iconify-icon icon="iconoir:xmark" width="14"></iconify-icon></button>' + '</div>';
  }
  function toastDetail() {
    return block('Tipos × subtítulo', 'success / error / warn / info', '<div style="display:flex;flex-direction:column;gap:var(--space-3);max-width:380px">' + toastItem('success', 'check-circle', 'Cambios guardados', 'El override se registró en opticas_overrides.') + toastItem('error', 'warning-triangle', 'Error al sincronizar', 'No se pudo conectar con Outscraper.') + toastItem('warn', 'warning-triangle', '23 conflictos detectados', 'Revisar en Administración → Revisión.') + toastItem('info', 'refresh-double', 'Sincronización en curso', 'Puede tardar entre 30 min y varias horas.') + toastItem('success', 'check-circle', 'Sin subtítulo', '') + '</div>');
  }
  function toastPreview() {
    return toastItem('success', 'check-circle', 'Cambios guardados', 'Override registrado.');
  }

  /* ── Empty state ── */
  function emptyBox(icon, title, body, action) {
    return '<div class="card" style="margin:0"><div class="empty-state" style="min-height:200px">' + '<iconify-icon class="empty-state-icon" icon="iconoir:' + icon + '" width="30"></iconify-icon>' + '<h2 class="state-title">' + enc(title) + '</h2>' + '<p class="state-body">' + enc(body) + '</p>' + (action ? '<button class="btn btn-ghost btn-sm">' + enc(action) + '</button>' : '') + '</div></div>';
  }
  function emptyDetail() {
    return '<div class="sg-cols">' + stage('BBDD vacía', emptyBox('database', 'Sin datos iniciales', 'Importa la primera sincronización para empezar.', 'Importar datos'), true) + stage('Sin resultados', emptyBox('search', 'Sin resultados', 'No hay ópticas que coincidan con los filtros.', 'Limpiar filtros'), true) + stage('Sin permisos', emptyBox('lock', 'Acceso restringido', 'No tienes permisos para ver esta sección.', ''), true) + '</div>';
  }
  function emptyPreview() {
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--muted)">' + '<iconify-icon icon="iconoir:search" width="28" style="color:var(--muted-2)"></iconify-icon>' + '<span class="state-title" style="font-size:14px">Sin resultados</span></div>';
  }

  /* ── Error state ── */
  function errorBox(retry) {
    return '<div class="card" style="margin:0"><div class="error-state" style="min-height:200px">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="30"></iconify-icon>' + '<h2 class="state-title">No se pudo cargar</h2>' + '<p class="state-body">Ha ocurrido un error al recuperar los datos.</p>' + (retry ? '<button class="btn btn-primary btn-sm"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' : '') + '</div></div>';
  }
  function errorDetail() {
    return '<div class="sg-cols">' + stage('Con retry', errorBox(true), true) + stage('Sin retry', errorBox(false), true) + '</div>';
  }

  /* ── Skeleton ── */
  function skeletonDetail() {
    var kpi = '<div class="card card-compact" style="margin:0;display:flex;flex-direction:column;gap:10px;min-height:86px">' + '<span class="skeleton sk-text-sm" style="width:45%"></span>' + '<span class="skeleton" style="height:34px;width:70%"></span>' + '<span class="skeleton sk-text-sm" style="width:35%"></span></div>';
    var rowSk = '<div class="card" style="margin:0;padding:14px 0">' + Array(4).fill(0).map(function () {
      return '<div style="padding:0 16px"><span class="skeleton sk-row" style="margin:0;margin-bottom:8px"></span></div>';
    }).join('') + '</div>';
    var chart = '<div class="card" style="margin:0"><span class="skeleton sk-text-sm" style="width:40%;display:block;margin-bottom:14px"></span>' + '<span class="skeleton" style="height:160px;width:100%"></span></div>';
    var list = '<div style="display:flex;flex-direction:column;gap:10px">' + Array(4).fill(0).map(function () {
      return '<div style="display:flex;gap:10px;align-items:center"><span class="skeleton" style="width:36px;height:36px;border-radius:var(--radius-md)"></span><span class="skeleton sk-text-sm" style="flex:1"></span></div>';
    }).join('') + '</div>';
    return '<div class="sg-cols">' + stage('KPI card', kpi) + stage('Fila de tabla', rowSk) + stage('Chart card', chart) + stage('Lista del mapa', list) + '</div>';
  }
  function skeletonPreview() {
    return '<div style="width:100%;max-width:200px;display:flex;flex-direction:column;gap:10px">' + '<span class="skeleton sk-text-sm" style="width:50%"></span>' + '<span class="skeleton" style="height:30px;width:80%"></span>' + '<span class="skeleton sk-text-sm" style="width:40%"></span></div>';
  }

  /* ── Banner persistente ── */
  function bannerDetail() {
    return block('Banner persistente', 'sync en curso — el único caso actual', stage('', '<div class="banner banner-info" style="border-radius:var(--radius-md);border:1px solid rgba(197,232,23,.35)">' + '<iconify-icon icon="iconoir:refresh-double" width="16" style="animation:spin 1.4s linear infinite"></iconify-icon>' + '<span><b>Sincronización en curso</b> — actualizando 18.234 registros desde Outscraper. Puede tardar varias horas.</span>' + '<button class="btn-icon banner-close"><iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></button>' + '</div>') + '<style>@keyframes spin{to{transform:rotate(360deg)}}</style>');
  }
  function bannerPreview() {
    return '<div class="banner banner-info" style="border-radius:var(--radius-md);max-width:220px;font-size:12px;padding:8px 12px">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon><span>Sync en curso</span></div>';
  }

  /* ── Badge de notificación ── */
  function badgeDetail() {
    return block('Badge de notificación', 'sobre ícono de nav (sidebar admin)', stage('', samples([sample('con contador', '<span class="sg-badge-host"><button class="nav-item" style="cursor:default"><iconify-icon icon="iconoir:warning-circle" width="20"></iconify-icon></button><span class="sg-badge-dot">23</span></span>'), sample('99+', '<span class="sg-badge-host"><button class="nav-item" style="cursor:default"><iconify-icon icon="iconoir:settings" width="20"></iconify-icon></button><span class="sg-badge-dot">99+</span></span>'), sample('punto', '<span class="sg-badge-host"><button class="nav-item" style="cursor:default"><iconify-icon icon="iconoir:bell" width="20"></iconify-icon></button><span class="sg-badge-dot" style="min-width:9px;height:9px;padding:0"></span></span>')])));
  }
  function badgePreview() {
    return '<span class="sg-badge-host"><button class="nav-item on" style="cursor:default"><iconify-icon icon="iconoir:warning-circle" width="22"></iconify-icon></button><span class="sg-badge-dot">23</span></span>';
  }
  function tooltipDetail() {
    return block('Tooltip flotante', 'fondo tinta + texto blanco + flecha — aparece en hover/focus', stage('', '<div style="display:flex;gap:56px;align-items:center;padding:36px 12px 8px">' + '<span class="tip-wrap"><button class="btn btn-ghost btn-sm" style="pointer-events:none">Hover</button><span class="tip-content" style="opacity:1">Campañas</span></span>' + '<span class="tip-wrap"><button class="btn-icon" style="pointer-events:none"><iconify-icon icon="iconoir:info-circle" width="16"></iconify-icon></button><span class="tip-content" style="opacity:1">Más información</span></span>' + '</div>')) + block('Tooltip del rail', 'variante lateral — flecha a la izquierda; solo visible con el sidebar plegado', stage('', '<div style="padding:8px 0"><div class="nav-item" style="cursor:default;background:var(--gray-100);color:var(--ink)"><iconify-icon icon="iconoir:graph-up" width="20"></iconify-icon><span class="tip" style="opacity:1">Business Intelligence</span></div></div>'));
  }
  function tooltipPreview() {
    return '<span class="tip-wrap" style="margin-top:30px"><button class="btn btn-ghost btn-sm" style="pointer-events:none">Elemento</button><span class="tip-content" style="opacity:1">Campañas</span></span>';
  }

  /* ══════════════════════════════════════════════════════════
     FORMULARIOS
  ══════════════════════════════════════════════════════════ */

  function inputDetail() {
    return '<div class="sg-cols">' + stage('Default · focus · disabled', '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' + '<input class="input" type="text" placeholder="Placeholder…">' + '<input class="input" type="text" value="Con foco" style="border-color:var(--accent);box-shadow:var(--shadow-focus)">' + '<input class="input" type="text" value="No editable" disabled>' + '</div>') + stage('Error · con ícono · con limpiar', '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' + '<div><input class="input error" type="text" value="Valor inválido"><span class="form-error" style="margin-top:6px;display:block">Este campo es obligatorio</span></div>' + '<div class="input-wrap"><span class="input-icon"><iconify-icon icon="iconoir:search" width="16"></iconify-icon></span><input class="input" type="text" placeholder="Buscar óptica…"></div>' + '<div class="input-wrap"><input class="input" type="text" value="Texto a limpiar"><span class="input-suffix"><iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></span></div>' + '</div>') + '</div>';
  }
  function inputPreview() {
    return '<div class="input-wrap" style="width:200px"><span class="input-icon"><iconify-icon icon="iconoir:search" width="15"></iconify-icon></span><input class="input input-sm" type="text" placeholder="Buscar…"></div>';
  }
  function inputDateDetail() {
    return block('Variante unitaria', 'input[type=date] — ícono de calendario Iconoir (DS v3.2); selector de fecha nativo del navegador', stage('', samples([sample('md', '<input class="input" type="date" value="2026-06-18" style="width:180px">'), sample('sm', '<input class="input input-sm" type="date" value="2026-06-18" style="width:160px">'), sample('vacío', '<input class="input input-sm" type="date" style="width:160px">'), sample('disabled', '<input class="input input-sm" type="date" value="2026-06-18" style="width:160px" disabled>')]))) + block('Par desde / hasta', 'siempre en par separado por guión — único caso: A5 Logs, rango personalizado', stage('', '<div style="display:flex;gap:8px;align-items:center"><input type="date" class="input input-sm" style="width:140px" value="2026-05-01"><span class="c-muted" style="font-size:13px">—</span><input type="date" class="input input-sm" style="width:140px" value="2026-06-18"></div>'));
  }
  function inputDatePreview() {
    return '<div style="display:flex;gap:6px;align-items:center"><input type="date" class="input input-sm" style="width:120px" value="2026-05-01"><span class="c-muted" style="font-size:12px">—</span><input type="date" class="input input-sm" style="width:120px" value="2026-06-18"></div>';
  }
  function selectDetail() {
    return block('Tamaños y estados', 'md / sm / disabled', stage('', samples([sample('md', '<select class="select" style="width:200px"><option>Madrid</option><option>Barcelona</option></select>'), sample('sm', '<select class="select select-sm" style="width:200px"><option>Todas las provincias</option></select>'), sample('disabled', '<select class="select" style="width:200px" disabled><option>Bloqueado</option></select>')])));
  }
  function selectPreview() {
    return '<select class="select select-sm" style="width:180px"><option>Madrid</option></select>';
  }
  function textareaDetail() {
    return '<div class="sg-cols">' + stage('Default', '<textarea class="textarea" rows="3" placeholder="Notas internas…"></textarea>') + stage('Con contador', '<div><textarea class="textarea" rows="3">Óptica con datos verificados manualmente.</textarea><div style="text-align:right;font-size:11px;color:var(--muted);margin-top:4px">46 / 280</div></div>') + '</div>';
  }
  function textareaPreview() {
    return '<textarea class="textarea" rows="2" style="width:200px;min-height:56px" placeholder="Notas…"></textarea>';
  }
  function radioCtl(checked, disabled, label) {
    return '<label class="radio-wrap"' + (disabled ? ' style="opacity:.5"' : '') + '><input class="radio" type="radio" name="sg-r"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '><span class="toggle-text">' + enc(label) + '</span></label>';
  }
  function radioDetail() {
    return block('Radio', 'seleccionado / no seleccionado / disabled', stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-3)">' + radioCtl(true, false, 'Seleccionado') + radioCtl(false, false, 'No seleccionado') + radioCtl(false, true, 'Disabled') + '</div>'));
  }
  function radioPreview() {
    return '<div style="display:flex;flex-direction:column;gap:8px">' + radioCtl(true, false, 'Opción A') + radioCtl(false, false, 'Opción B') + '</div>';
  }
  function checkCtl(state, disabled, label) {
    var attr = state === 'checked' ? ' checked' : '';
    var ind = state === 'indeterminate' ? ' data-ind="1"' : '';
    return '<label class="checkbox-wrap"' + (disabled ? ' style="opacity:.5"' : '') + '><input class="checkbox" type="checkbox"' + attr + ind + (disabled ? ' disabled' : '') + '><span class="toggle-text">' + enc(label) + '</span></label>';
  }
  function checkDetail() {
    return block('Checkbox', 'marcado / no marcado / indeterminado / disabled', stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-3)">' + checkCtl('checked', false, 'Marcado') + checkCtl('', false, 'No marcado') + checkCtl('indeterminate', false, 'Indeterminado') + checkCtl('checked', true, 'Disabled') + '</div>'));
  }
  function checkPreview() {
    return '<div style="display:flex;flex-direction:column;gap:8px">' + checkCtl('checked', false, 'Marcado') + checkCtl('', false, 'Sin marcar') + '</div>';
  }
  function checkMounted(root) {
    root.querySelectorAll('input[data-ind]').forEach(function (i) {
      i.indeterminate = true;
    });
  }
  function sliderDetail() {
    return block('Slider', 'valoración mínima — el único caso actual', stage('Valoración mínima: 4.0★', '<div style="max-width:320px"><input class="slider" type="range" min="0" max="5" step="0.1" value="4"><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:8px"><span>0★</span><span>5★</span></div></div>'));
  }
  function sliderPreview() {
    return '<div style="width:180px"><input class="slider" type="range" min="0" max="5" step="0.1" value="4"></div>';
  }
  function formGroupDetail() {
    return '<div class="sg-cols">' + stage('label + input', '<div class="form-group"><label class="form-label">Provincia</label><input class="input" type="text" placeholder="Madrid"></div>') + stage('label + input + hint', '<div class="form-group"><label class="form-label">Código óptica</label><input class="input" type="text" placeholder="CPV-08234"><span class="form-hint">Formato CPV-NNNNN del maestro de Salesforce.</span></div>') + stage('label + input + error', '<div class="form-group"><label class="form-label">Email</label><input class="input error" type="text" value="correo-mal"><span class="form-error">Introduce un email válido.</span></div>') + '</div>';
  }
  function formGroupPreview() {
    return '<div class="form-group" style="width:200px"><label class="form-label">Provincia</label><input class="input input-sm" type="text" placeholder="Madrid"></div>';
  }

  /* ══════════════════════════════════════════════════════════
     CONTENEDORES
  ══════════════════════════════════════════════════════════ */

  function cardDetail() {
    return '<div class="sg-cols">' + stage('Estándar', '<div class="card" style="margin:0"><div class="card-head"><h3 class="display-md" style="margin:0">Card estándar</h3></div><p class="body-sm c-muted">Fondo blanco, borde sutil, sombra e1.</p></div>') + stage('Accent', '<div class="card card-accent" style="margin:0"><div class="card-head"><h3 class="display-md" style="margin:0">Card accent</h3><iconify-icon icon="iconoir:star-solid" width="14" style="color:var(--accent-ink-deep)"></iconify-icon></div><p class="body-sm c-muted">Borde lime para métricas destacadas (A3).</p></div>') + stage('Compact', '<div class="card card-compact" style="margin:0"><div style="display:flex;justify-content:space-between;align-items:center"><div><div class="body-sm" style="font-weight:500">Card compact</div><div class="body-xs c-muted">Padding reducido.</div></div><button class="btn btn-primary btn-sm">Acción</button></div></div>') + stage('Clickeable (KPI link)', '<a href="#/styleguide?c=kpi" class="card card-compact" style="margin:0;display:block;text-decoration:none"><div style="display:flex;justify-content:space-between;align-items:start"><div><div class="eyebrow-t">Partners</div><div class="kpi-value-md" style="margin-top:6px">3.142</div></div><iconify-icon icon="iconoir:arrow-right" width="16" style="color:var(--muted-2)"></iconify-icon></div></a>') + '</div>';
  }
  function cardPreview() {
    return '<div class="card card-compact" style="margin:0;width:180px"><div class="body-sm" style="font-weight:600">Card</div><div class="body-xs c-muted">estándar · accent · compact</div></div>';
  }
  function modalDetail() {
    var modal = '<div class="modal-overlay" id="sg-modal" style="display:none;position:fixed;z-index:60">' + '<div class="modal"><div class="modal-header"><h2 class="modal-title">Confirmar eliminación</h2>' + '<button class="btn-icon btn-lg" data-sg-modal-close><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<div class="modal-body">Vas a eliminar el override manual de <b>Óptica San Carlos</b>. El dato volverá al valor de Google Maps. Esta acción no se puede deshacer.</div>' + '<div class="modal-footer"><button class="btn btn-ghost btn-sm" data-sg-modal-close>Cancelar</button>' + '<button class="btn btn-destructive btn-sm">Eliminar override</button></div></div></div>';
    return block('Estructura base', 'base / confirmación destructiva / formulario corto / corregir dato', stage('Demo interactivo', '<button class="btn btn-ghost btn-sm" data-sg-modal-open="sg-modal"><iconify-icon icon="iconoir:eye" width="14"></iconify-icon>Abrir modal de confirmación</button>' + modal)) + '<div class="sg-cols">' + stage('Formulario corto', '<div class="modal" style="box-shadow:none;max-width:none;padding:var(--space-6)"><div class="modal-header" style="margin-bottom:var(--space-5)"><h2 class="modal-title">Nuevo usuario</h2></div><div class="form-group"><label class="form-label">Email</label><input class="input" placeholder="nombre@coopervision.es"></div></div>') + stage('Corregir dato', '<div class="modal" style="box-shadow:none;max-width:none;padding:var(--space-6)"><div class="modal-header" style="margin-bottom:var(--space-5)"><h2 class="modal-title">Corregir teléfono</h2></div><div class="form-group"><label class="form-label">Teléfono</label><input class="input" value="+34 91 234 56 78"><span class="form-hint">Se registrará como override manual.</span></div></div>') + '</div>';
  }
  function modalPreview() {
    return '<div style="width:180px;height:110px;background:var(--card);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--shadow-e2);padding:12px"><div style="font-family:var(--font-display);font-weight:600;font-size:13px">Confirmar</div><div style="height:1px;background:var(--line-2);margin:34px -12px 8px"></div><div style="display:flex;justify-content:flex-end;gap:6px"><span style="font-size:10px;padding:3px 8px;border:1px solid var(--line);border-radius:6px">Cancelar</span><span style="font-size:10px;padding:3px 8px;background:var(--accent);border-radius:6px">OK</span></div></div>';
  }
  function drawerDetail() {
    var panel = '<div class="sg-drawer-demo" id="sg-drawer">' + '<div class="sg-drawer-panel">' + '<div class="drawer-header" style="padding:var(--space-5)"><div><div class="eyebrow-t">Óptica · ChIJ_madrid_001</div><h3 class="drawer-title" style="margin-top:4px">Óptica San Carlos</h3></div><button class="btn-icon" data-sg-drawer-close><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<nav class="tabs-list" style="margin:0 var(--space-5)"><button class="tab-trigger active">Resumen</button><button class="tab-trigger">Datos</button><button class="tab-trigger">Cambios<span class="pill pill-neutral pill-sm" style="margin-left:6px">2</span></button></nav>' + '<div class="drawer-body" style="padding:var(--space-5)"><div class="data-pair" style="margin-bottom:14px"><span class="data-label">Dirección</span><span class="data-value">Calle Mayor 24, Madrid</span></div><div class="data-pair"><span class="data-label">Rating</span><span class="data-value">★ 4.8 · 324 reseñas</span></div></div>' + '</div></div>';
    return block('Drawer lateral', 'base / con tabs / empty state dentro', stage('Demo interactivo (480/560px en producción)', '<button class="btn btn-ghost btn-sm" data-sg-drawer-open="sg-drawer"><iconify-icon icon="iconoir:eye" width="14"></iconify-icon>Abrir drawer</button>' + '<div style="height:14px"></div>' + panel.replace('id="sg-drawer"', 'id="sg-drawer" style="display:none"')));
  }
  function drawerPreview() {
    return '<div style="display:flex;width:180px;height:120px;border:1px solid var(--line-2);border-radius:var(--radius-md);overflow:hidden"><div style="flex:1;background:rgba(231,234,238,.4)"></div><div style="width:96px;background:var(--card);border-left:1px solid var(--line);box-shadow:var(--shadow-e2);padding:10px"><div style="font-size:10px;font-weight:600">Detalle</div><div style="height:1px;background:var(--line-2);margin:8px -10px"></div></div></div>';
  }
  function popoverDetail() {
    var pop = '<div class="sg-popanchor"><button class="btn btn-ghost btn-sm" data-sg-toggle="sg-pop-filters"><iconify-icon icon="iconoir:filter" width="14"></iconify-icon>Filtros</button>' + '<div class="sg-pop" id="sg-pop-filters" style="min-width:240px">' + '<div class="sg-mini-label">Tipo de óptica</div>' + '<div style="display:flex;flex-direction:column;gap:8px">' + '<label class="checkbox-wrap"><input class="checkbox" type="checkbox" checked><span class="toggle-text">Clientes</span></label><label class="checkbox-wrap"><input class="checkbox" type="checkbox"><span class="toggle-text">Mercado</span></label>' + '</div>' + '<div style="height:1px;background:var(--line-2);margin:12px 0"></div>' + '<button class="btn btn-primary btn-sm" style="width:100%;justify-content:center">Aplicar</button>' + '</div></div>';
    return block('Popover', 'filtros de V4 — el único caso actual', stage('Demo interactivo', pop));
  }
  function popoverPreview() {
    return '<div style="width:180px;background:var(--card);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--shadow-e2);padding:12px"><div class="sg-mini-label" style="margin-bottom:8px">Filtros</div><label class="checkbox-wrap"><input class="checkbox" type="checkbox" checked><span class="toggle-text">Clientes</span></label></div>';
  }
  function flyoutDetail() {
    var fly = '<div class="sg-popanchor"><button class="btn btn-ghost btn-sm" data-sg-toggle="sg-pop-admin"><iconify-icon icon="iconoir:settings" width="14"></iconify-icon>Admin</button>' + '<div class="sg-pop is-menu" id="sg-pop-admin" style="min-width:200px">' + '<div class="admin-flyout-header">Administración</div>' + '<a class="admin-flyout-item"><iconify-icon icon="iconoir:group" width="16"></iconify-icon>Usuarios</a>' + '<a class="admin-flyout-item"><iconify-icon icon="iconoir:refresh-double" width="16"></iconify-icon>Operaciones</a>' + '<a class="admin-flyout-item"><iconify-icon icon="iconoir:warning-circle" width="16"></iconify-icon>Revisión</a>' + '<a class="admin-flyout-item"><iconify-icon icon="iconoir:page" width="16"></iconify-icon>Logs</a>' + '</div></div>';
    return block('Flyout', 'menú admin del sidebar', stage('Demo interactivo', fly));
  }
  function flyoutPreview() {
    return '<div style="width:170px;background:var(--card);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--shadow-e2);padding:4px"><div class="admin-flyout-header">Administración</div><div class="admin-flyout-item"><iconify-icon icon="iconoir:group" width="15"></iconify-icon>Usuarios</div></div>';
  }

  /* ══════════════════════════════════════════════════════════
     NAVEGACIÓN
  ══════════════════════════════════════════════════════════ */

  function railItem(icon, state, badge) {
    var cls = 'nav-item' + (state === 'active' ? ' on' : '');
    var st = state === 'hover' ? 'background:var(--gray-100);color:var(--ink);' : '';
    var inner = '<div class="' + cls + '" style="cursor:default;' + st + '"><iconify-icon icon="iconoir:' + icon + '" width="20"></iconify-icon></div>';
    if (badge) inner = '<span class="sg-badge-host">' + inner + '<span class="sg-badge-dot">' + badge + '</span></span>';
    return '<div style="display:flex;align-items:center;gap:var(--space-4)">' + inner + '<div><div class="body-sm" style="font-weight:500">' + (state === 'active' ? 'Activo' : state === 'hover' ? 'Hover' : badge ? 'Con badge' : 'Normal') + '</div></div></div>';
  }
  function railDetail() {
    return '<div class="sg-cols">' + stage('Estados del ítem', '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' + railItem('home-simple', 'active') + railItem('database', 'hover') + railItem('graph-up', 'normal') + railItem('warning-circle', 'normal', '23') + '</div>') + stage('Rol user vs admin', '<div style="display:flex;gap:var(--space-6)">' + '<div><div class="sg-mini-label">User</div><div style="width:48px;display:flex;flex-direction:column;gap:6px;padding:8px;border:1px solid var(--line-2);border-radius:var(--radius-lg)">' + ['home-simple', 'graph-up', 'map-pin', 'database'].map(function (i) {
      return '<div class="nav-item" style="cursor:default;width:32px;height:32px"><iconify-icon icon="iconoir:' + i + '" width="17"></iconify-icon></div>';
    }).join('') + '</div></div>' + '<div><div class="sg-mini-label">Admin</div><div style="width:48px;display:flex;flex-direction:column;gap:6px;padding:8px;border:1px solid var(--line-2);border-radius:var(--radius-lg)">' + ['home-simple', 'graph-up', 'map-pin', 'database', 'clock-rotate-right', 'settings'].map(function (i) {
      return '<div class="nav-item" style="cursor:default;width:32px;height:32px"><iconify-icon icon="iconoir:' + i + '" width="17"></iconify-icon></div>';
    }).join('') + '</div></div>' + '</div>') + '</div>';
  }
  function railPreview() {
    return '<div style="width:48px;display:flex;flex-direction:column;gap:6px;padding:8px;background:var(--card);border:1px solid var(--line);border-radius:var(--radius-lg)">' + '<div class="nav-item on" style="cursor:default;width:32px;height:32px"><iconify-icon icon="iconoir:home-simple" width="17"></iconify-icon></div>' + ['graph-up', 'map-pin', 'database'].map(function (i) {
      return '<div class="nav-item" style="cursor:default;width:32px;height:32px"><iconify-icon icon="iconoir:' + i + '" width="17"></iconify-icon></div>';
    }).join('') + '</div>';
  }
  function tabsDetail() {
    return block('Tabs', '5 del drawer V5 · con contador', stage('Demo interactivo', '<nav class="tabs-list">' + '<button class="tab-trigger active" data-sgtabs="d" data-sgtab="a">Resumen</button>' + '<button class="tab-trigger" data-sgtabs="d" data-sgtab="b">Google Maps</button>' + '<button class="tab-trigger" data-sgtabs="d" data-sgtab="c">CooperVision</button>' + '<button class="tab-trigger" data-sgtabs="d" data-sgtab="d">App data</button>' + '<button class="tab-trigger" data-sgtabs="d" data-sgtab="e">Cambios <span class="pill pill-neutral pill-sm" style="margin-left:4px">2</span></button>' + '</nav>' + '<div data-sgpane data-sgtabs="d" data-sgtab="a" style="padding-top:var(--space-4);font-size:13px;color:var(--ink-2)">Contenido <b>Resumen</b>.</div>' + ['b', 'c', 'd', 'e'].map(function (t) {
      return '<div data-sgpane data-sgtabs="d" data-sgtab="' + t + '" style="display:none;padding-top:var(--space-4);font-size:13px;color:var(--ink-2)">Contenido pestaña <b>' + t.toUpperCase() + '</b>.</div>';
    }).join('')));
  }
  function tabsPreview() {
    return '<nav class="tabs-list" style="margin:0;border:none"><button class="tab-trigger active">Resumen</button><button class="tab-trigger">Datos</button><button class="tab-trigger">Cambios</button></nav>';
  }
  function anchorDetail() {
    return block('Anchor nav', 'barra sticky de V2 BI · ítem activo por scroll', stage('', '<div class="sg-anchor">' + '<a class="sg-anchor-item active">Resumen</a><a class="sg-anchor-item">Cuadrante</a><a class="sg-anchor-item">Oportunidad</a><a class="sg-anchor-item">Ranking</a></div>'));
  }
  function anchorPreview() {
    return '<div class="sg-anchor"><span class="sg-anchor-item active">Resumen</span><span class="sg-anchor-item">Cuadrante</span></div>';
  }
  function pageBtn(label, active, disabled) {
    return '<button class="page-btn' + (active ? ' active' : '') + '"' + (disabled ? ' disabled' : '') + '>' + label + '</button>';
  }
  function pagiDetail() {
    var prev = '<button class="page-btn"><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon></button>';
    var next = '<button class="page-btn"><iconify-icon icon="iconoir:nav-arrow-right" width="15"></iconify-icon></button>';
    var prevD = '<button class="page-btn" disabled><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon></button>';
    var nextD = '<button class="page-btn" disabled><iconify-icon icon="iconoir:nav-arrow-right" width="15"></iconify-icon></button>';
    return '<div class="sg-cols">' + stage('Numerada con elipsis', '<div class="pagination">' + prev + pageBtn('1') + pageBtn('2') + pageBtn('3', true) + '<span class="page-ellipsis">…</span>' + pageBtn('12') + next + '</div>') + stage('Primera página · «anterior» disabled', '<div class="pagination">' + prevD + pageBtn('1', true) + pageBtn('2') + pageBtn('3') + '<span class="page-ellipsis">…</span>' + pageBtn('12') + next + '</div>') + stage('Última página · «siguiente» disabled', '<div class="pagination">' + prev + pageBtn('1') + '<span class="page-ellipsis">…</span>' + pageBtn('10') + pageBtn('11') + pageBtn('12', true) + nextD + '</div>') + '</div>';
  }
  function pagiPreview() {
    return '<div class="pagination">' + pageBtn('1') + pageBtn('2', true) + pageBtn('3') + '<span class="page-ellipsis">…</span>' + pageBtn('12') + '</div>';
  }

  /* ── Subnav admin ── */
  function adminTab(label, active, badge) {
    return '<span class="tab-trigger' + (active ? ' active' : '') + '" style="display:inline-flex;align-items:center;gap:5px;cursor:default">' + enc(label) + (badge ? '<span class="cpv-admin-badge">' + enc(badge) + '</span>' : '') + '</span>';
  }
  function subnavDetail() {
    var full = '<nav class="tabs-list cpv-admin-subnav" style="margin:0">' + adminTab('Usuarios', false) + adminTab('Operaciones', false) + adminTab('Revisión', false, '23') + adminTab('Cadenas', false) + adminTab('Logs', false) + '</nav>';
    return block('Conjunto completo', 'las 5 rutas de /admin/* · Revisión con badge de pendientes', stage('Producción', full)) + '<div class="sg-cols">' + stage('Ítem normal', '<nav class="tabs-list cpv-admin-subnav" style="margin:0">' + adminTab('Usuarios', false) + '</nav>') + stage('Ítem activo (vista actual)', '<nav class="tabs-list cpv-admin-subnav" style="margin:0">' + adminTab('Operaciones', true) + '</nav>') + stage('Ítem con badge de pendientes', '<nav class="tabs-list cpv-admin-subnav" style="margin:0">' + adminTab('Revisión', false, '23') + '</nav>') + stage('Sin pendientes (sin badge)', '<nav class="tabs-list cpv-admin-subnav" style="margin:0">' + adminTab('Revisión', false) + '</nav>') + '</div>' + block('Notas de implementación', '', stage('', '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:var(--ink-2)">' + '<li>Navegación <b>real entre rutas</b> (cada ítem es un <code style="font-family:var(--font-mono);font-size:11px">&lt;a href="#/admin/*"&gt;</code>), no tabs dentro de una vista.</li>' + '<li>El badge de <b>Revisión</b> usa <code style="font-family:var(--font-mono);font-size:11px">.cpv-admin-badge</code> y solo se renderiza cuando hay pendientes en A3 (matching + no encontrados &gt; 0).</li>' + '<li>Reutiliza <code style="font-family:var(--font-mono);font-size:11px">.tabs-list</code> + <code style="font-family:var(--font-mono);font-size:11px">.tab-trigger</code> del DS — el contenedor es <code style="font-family:var(--font-mono);font-size:11px">.cpv-admin-subnav</code>.</li>' + '</ul>', true));
  }
  function subnavPreview() {
    return '<nav class="tabs-list cpv-admin-subnav" style="margin:0;border:none;flex-wrap:wrap;justify-content:center">' + adminTab('Usuarios', true) + adminTab('Revisión', false, '23') + '</nav>';
  }

  /* ── Menú contextual de fila (⋯) ── */
  function rowMenu(withDanger) {
    return '<div class="cpv-row-menu open" style="position:static;display:inline-block;min-width:198px;opacity:1;pointer-events:auto;transform:none;box-shadow:var(--shadow-e2)">' + '<button class="dropdown-item"><iconify-icon icon="iconoir:edit-pencil" width="16"></iconify-icon>Editar</button>' + (withDanger ? '<button class="dropdown-item"><iconify-icon icon="iconoir:refresh-double" width="16"></iconify-icon>Re-aplicar detección</button>' + '<div class="dropdown-divider"></div>' + '<button class="dropdown-item danger"><iconify-icon icon="iconoir:trash" width="16"></iconify-icon>Eliminar</button>' : '') + '</div>';
  }
  function rowMenuTable() {
    return '<div class="table-wrap"><table class="table-dense"><thead><tr><th>Nombre</th><th>Email</th><th class="cpv-bbdd-menu-col"></th></tr></thead><tbody>' + '<tr><td>Ana Soto</td><td class="c-muted">ana@coopervision.es</td><td class="cpv-bbdd-menu-col"><button class="cpv-bbdd-menu-btn" style="color:var(--ink-2)"><iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button></td></tr>' + '<tr><td>Luis Vega</td><td class="c-muted">luis@coopervision.es</td><td class="cpv-bbdd-menu-col"><button class="cpv-bbdd-menu-btn"><iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button></td></tr>' + '</tbody></table></div>';
  }
  function rowmenuDetail() {
    return block('Fila con ⋯', 'el ícono solo aparece en hover sobre la fila (1ª fila simulada en hover)', stage('A1 Usuarios / A4 Cadenas', rowMenuTable(), true)) + '<div class="sg-cols">' + stage('Con acción destructiva (A4 Cadenas)', '<div style="padding:8px 0">' + rowMenu(true) + '</div>') + stage('Sin acción destructiva', '<div style="padding:8px 0">' + rowMenu(false) + '</div>') + '</div>' + block('Notas de implementación', '', stage('', '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:var(--ink-2)">' + '<li>El botón <code style="font-family:var(--font-mono);font-size:11px">.cpv-bbdd-menu-btn</code> (⋯) está atenuado y solo gana color en <code style="font-family:var(--font-mono);font-size:11px">tr:hover</code> — visibilidad condicional.</li>' + '<li>El menú flotante <code style="font-family:var(--font-mono);font-size:11px">.cpv-row-menu</code> se ancla a la fila con <code style="font-family:var(--font-mono);font-size:11px">position:fixed</code> (fuera del overflow de la tabla) y se cierra al hacer clic fuera.</li>' + '<li>La opción <b>Eliminar</b> usa <code style="font-family:var(--font-mono);font-size:11px">.dropdown-item.danger</code> (color negativo + papelera).</li>' + '</ul>', true));
  }
  function rowmenuPreview() {
    return '<div style="transform:scale(.82)">' + rowMenu(true) + '</div>';
  }
  function breadcrumbDetail() {
    return block('Breadcrumb', 'no aplica en este producto', stage('', '<div class="card" style="margin:0;background:var(--line-2);border:none"><div style="display:flex;align-items:center;gap:10px;color:var(--muted)"><iconify-icon icon="iconoir:minus-circle" width="18"></iconify-icon><span class="body-sm">La jerarquía de navegación es plana (rail de un nivel). No se usa breadcrumb.</span></div></div>'));
  }
  function breadcrumbPreview() {
    return '<div style="display:flex;align-items:center;gap:8px;color:var(--muted-2)"><iconify-icon icon="iconoir:minus-circle" width="22"></iconify-icon><span class="body-sm">No aplica</span></div>';
  }

  /* ══════════════════════════════════════════════════════════
     DATOS Y VISUALIZACIÓN
  ══════════════════════════════════════════════════════════ */

  function pillDetail() {
    var variants = ['accent', 'pos', 'neg', 'warn', 'neutral', 'paused'];
    var lg = variants.map(function (v) {
      return '<span class="pill pill-' + v + '"><span class="pill-dot"></span>' + v + '</span>';
    });
    var sm = variants.map(function (v) {
      return '<span class="pill pill-' + v + ' pill-sm">' + v + ' sm</span>';
    });
    return '<div class="sg-cols">' + stage('lg · con dot', row(lg)) + stage('sm · solo texto', row(sm)) + stage('con ícono', row(['<span class="pill pill-pos"><iconify-icon icon="iconoir:check" width="11"></iconify-icon>Verificada</span>', '<span class="pill pill-warn"><iconify-icon icon="iconoir:warning-triangle" width="11"></iconify-icon>Conflicto</span>', '<span class="pill pill-accent"><iconify-icon icon="iconoir:star-solid" width="11"></iconify-icon>Cliente</span>'])) + '</div>' + block('Nota sobre la variante paused', '', '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:var(--ink-2)">' + '<li>La clase <code style="font-family:var(--font-mono);font-size:11px">.pill-paused</code> está declarada en <code style="font-family:var(--font-mono);font-size:11px">components.css</code> (fondo <code style="font-family:var(--font-mono);font-size:11px">--paused-bg</code>, texto <code style="font-family:var(--font-mono);font-size:11px">--paused-ink</code>).</li>' + '<li>Es el estado para <b>usuarios inactivos en A1 Usuarios</b> — no se usa para el estado de ópticas.</li>' + '</ul>');
  }
  function pillPreview() {
    return '<div style="display:flex;flex-direction:column;gap:8px;align-items:center"><span class="pill pill-pos"><span class="pill-dot"></span>Activa</span><span class="pill pill-warn"><span class="pill-dot"></span>Conflicto</span></div>';
  }
  function kpiCard(label, value, delta, deltaType, sub, link) {
    return '<div class="card card-compact" style="margin:0">' + '<div style="display:flex;justify-content:space-between;align-items:start">' + '<div class="eyebrow-t">' + enc(label) + '</div>' + (link ? '<iconify-icon icon="iconoir:arrow-right" width="15" style="color:var(--muted-2)"></iconify-icon>' : '') + '</div>' + '<div class="kpi-value-md" style="margin-top:8px">' + enc(value) + '</div>' + (delta ? '<div class="kpi-delta ' + deltaType + '" style="margin-top:6px"><iconify-icon icon="iconoir:' + (deltaType === 'pos' ? 'arrow-up' : 'arrow-down') + '" width="12"></iconify-icon>' + enc(delta) + '</div>' : '') + (sub ? '<div class="kpi-subtitle">' + enc(sub) + '</div>' : '') + '</div>';
  }
  function kpiDetail() {
    return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:var(--space-4)">' + stage('Valor solo', kpiCard('Ópticas totales', '18.234', '', '', ''), true) + stage('Delta positivo', kpiCard('Partners', '3.142', '+12.4%', 'pos', ''), true) + stage('Delta negativo', kpiCard('Sin web', '1.087', '−3.1%', 'neg', ''), true) + stage('Con subtítulo', kpiCard('Valoración media', '4.4★', '', '', 'sobre 5 · 12.8K reseñas'), true) + stage('Valor con unidad inline', '<div style="display:flex;gap:var(--space-4);flex-wrap:wrap">' + kpiCard('Valoración', '4.4★', '', '', '') + kpiCard('Reseñas', '1,2M', '', '', '') + '</div>', true) + stage('Clickeable (link)', kpiCard('Reseñas', '1,2M', '', '', '', true), true) + '</div>';
  }
  function kpiPreview() {
    return kpiCard('Partners', '3.142', '+12.4%', 'pos', '');
  }
  function tableMock(ultra) {
    var rows = [['Óptica San Carlos', 'Madrid', '4.8', 'cliente', 'override'], ['Visionlab Diagonal', 'Barcelona', '4.6', 'cliente', ''], ['Óptica Pérez & Hijos', 'Valencia', '4.2', 'mercado', ''], ['Multiópticas Sevilla', 'Sevilla', '4.5', 'cliente', '']];
    var head = '<thead><tr><th class="sortable sorted col-sticky">Nombre <span class="sort-icon"><iconify-icon icon="iconoir:nav-arrow-down" width="12"></iconify-icon></span></th><th>Ciudad</th><th style="width:64px">Rating</th><th style="width:90px">Tipo</th><th style="width:54px;text-align:center">Web</th></tr></thead>';
    var body = rows.map(function (r, i) {
      return '<tr' + (i === 0 ? ' class="selected"' : '') + '>' + '<td class="col-sticky">' + enc(r[0]) + (r[4] ? ' <iconify-icon icon="iconoir:edit-pencil" width="12" style="color:var(--accent-ink-deep);vertical-align:-1px" title="override"></iconify-icon>' : '') + '</td>' + '<td class="c-muted">' + enc(r[1]) + '</td>' + '<td class="tnum">★ ' + enc(r[2]) + '</td>' + '<td>' + (r[3] === 'cliente' ? '<span class="pill pill-pos pill-sm">Cliente</span>' : '<span class="pill pill-neutral pill-sm">Mercado</span>') + '</td>' + '<td style="text-align:center">' + (i !== 2 ? '<iconify-icon icon="iconoir:check" width="14" style="color:var(--pos-ink)"></iconify-icon>' : '<iconify-icon icon="iconoir:minus" width="14" style="color:var(--muted-2)"></iconify-icon>') + '</td>' + '</tr>';
    }).join('');
    return '<div class="table-wrap"><table class="table-dense' + (ultra ? ' table-ultra' : '') + '">' + head + '<tbody>' + body + '</tbody></table></div>';
  }
  function tableDenseDetail() {
    return block('Tabla densa · filas 40px', 'fila normal · seleccionada · badge Cliente · override · ordenación · presencia', stage('', tableMock(false), true)) + block('Columna sticky', '', '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:var(--ink-2)">' + '<li>La clase <code style="font-family:var(--font-mono);font-size:11px">.col-sticky</code> fija la <b>primera columna</b> cuando la tabla tiene scroll horizontal.</li>' + '<li>El <b>encabezado</b> correspondiente lleva también la clase <code style="font-family:var(--font-mono);font-size:11px">.col-sticky</code>.</li>' + '<li>La <b>sombra de separación</b> entre la columna fija y el contenido desplazado es automática vía CSS.</li>' + '<li>Se usa en <b>V4 Base de datos</b>, donde la tabla supera el ancho del contenedor.</li>' + '</ul>');
  }
  function tableDensePreview() {
    return '<div style="width:100%;transform:scale(.78);transform-origin:center">' + tableMock(false) + '</div>';
  }
  function tableUltraDetail() {
    return block('Tabla ultra · filas 32px', 'Changelog, Logs — misma estructura, altura reducida', stage('', tableMock(true), true));
  }
  function tableUltraPreview() {
    return '<div style="width:100%;transform:scale(.78);transform-origin:center">' + tableMock(true) + '</div>';
  }
  function presenceDetail() {
    return block('Chip de presencia', 'con web / sin web / con tel / sin tel (iconos de V4)', stage('', samples([sample('con web', '<span class="sg-presence on"><iconify-icon icon="iconoir:globe" width="13"></iconify-icon>Web</span>'), sample('sin web', '<span class="sg-presence off"><iconify-icon icon="iconoir:globe" width="13"></iconify-icon>Sin web</span>'), sample('con tel', '<span class="sg-presence on"><iconify-icon icon="iconoir:phone" width="13"></iconify-icon>Tel</span>'), sample('sin tel', '<span class="sg-presence off"><iconify-icon icon="iconoir:phone" width="13"></iconify-icon>Sin tel</span>')])));
  }
  function presencePreview() {
    return '<div style="display:flex;flex-direction:column;gap:8px"><span class="sg-presence on"><iconify-icon icon="iconoir:globe" width="13"></iconify-icon>Web</span><span class="sg-presence off"><iconify-icon icon="iconoir:phone" width="13"></iconify-icon>Sin tel</span></div>';
  }
  function bar(pct, cls, label) {
    return '<div style="display:flex;align-items:center;gap:var(--space-3)"><div class="sg-bar ' + (cls || '') + '" style="flex:1;max-width:220px"><span style="width:' + pct + '%"></span></div><span style="font-size:12px;font-weight:600;color:var(--ink-2);font-variant-numeric:tabular-nums;width:42px">' + label + '</span></div>';
  }
  function scoreDetail() {
    return block('Score bar', 'barra de progreso inline en tabla (S3 de BI)', stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' + bar(86, '', '86') + bar(54, '', '54') + bar(28, 'is-neg', '28') + '</div>'));
  }
  function scorePreview() {
    return '<div style="width:200px;display:flex;flex-direction:column;gap:10px">' + bar(86, '', '86') + bar(42, 'is-neg', '42') + '</div>';
  }
  function progressDetail() {
    return block('Progress bar', 'la de A3 Revisión', stage('', '<div style="max-width:360px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="label-md">Revisión de conflictos</span><span class="body-sm c-muted">142 / 234</span></div><div class="sg-bar" style="height:8px"><span style="width:61%"></span></div></div>'));
  }
  function progressPreview() {
    return '<div style="width:200px"><div class="sg-bar" style="height:8px"><span style="width:61%"></span></div></div>';
  }

  /* ══════════════════════════════════════════════════════════
     MARCADORES Y MAPA
  ══════════════════════════════════════════════════════════ */

  function markerDetail() {
    return block('Marcador de mapa', 'partner (lima) / otra óptica (gris) / nuevo con halo', stage('', '<div style="display:flex;gap:var(--space-8);align-items:center;padding:var(--space-4) var(--space-5)">' + ['partner', 'other', 'new'].map(function (k) {
      var lbl = k === 'partner' ? 'Partner' : k === 'other' ? 'Otra óptica' : 'Nuevo (halo)';
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:14px"><span class="sg-marker ' + k + '"></span><span class="sg-sample-cap">' + lbl + '</span></div>';
    }).join('') + '</div>'));
  }
  function markerPreview() {
    return '<div style="display:flex;gap:22px;align-items:center;padding-top:8px"><span class="sg-marker partner"></span><span class="sg-marker other"></span><span class="sg-marker new"></span></div>';
  }
  function mapPopup(tel, web) {
    return '<div class="sg-mappop">' + '<div class="sg-mappop-head"><div style="display:flex;justify-content:space-between;align-items:start;gap:8px"><div style="font-family:var(--font-display);font-weight:600;font-size:13px">Óptica San Carlos</div><span class="pill pill-pos pill-sm">Cliente</span></div><div class="body-xs c-muted" style="margin-top:2px">Calle Mayor 24, Madrid</div></div>' + '<div class="sg-mappop-row"><iconify-icon icon="iconoir:star-solid" width="13" style="color:var(--accent-ink-deep)"></iconify-icon>4.8 · 324 reseñas</div>' + (tel ? '<div class="sg-mappop-row"><iconify-icon icon="iconoir:phone" width="13"></iconify-icon>+34 91 234 56 78</div>' : '') + (web ? '<div class="sg-mappop-row"><iconify-icon icon="iconoir:globe" width="13"></iconify-icon>opticasancarlos.es</div>' : '') + '</div>';
  }
  function popupDetail() {
    return '<div class="sg-cols">' + stage('Con todos los datos', mapPopup(true, true)) + stage('Sin teléfono', mapPopup(false, true)) + stage('Sin web', mapPopup(true, false)) + '</div>';
  }
  function popupPreview() {
    return '<div style="transform:scale(.82)">' + mapPopup(true, true) + '</div>';
  }
  function mapListItem(partner) {
    return '<div class="sg-maplist"><span class="sg-maplist-dot" style="background:' + (partner ? 'var(--accent)' : 'var(--muted-2)') + '"></span>' + '<div style="flex:1"><div class="body-sm" style="font-weight:500">' + (partner ? 'Óptica San Carlos' : 'Óptica del Sol') + '</div><div class="body-xs c-muted">Madrid · ★ ' + (partner ? '4.8' : '4.1') + '</div></div>' + (partner ? '<span class="pill pill-pos pill-sm">Partner</span>' : '<span class="pill pill-neutral pill-sm">Mercado</span>') + '</div>';
  }
  function mapItemDetail() {
    return block('Item de lista del mapa', 'partner / no partner', stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-3);max-width:380px">' + mapListItem(true) + mapListItem(false) + '</div>'));
  }
  function mapItemPreview() {
    return '<div style="width:220px;display:flex;flex-direction:column;gap:8px">' + mapListItem(true) + mapListItem(false) + '</div>';
  }

  /* ══════════════════════════════════════════════════════════
     REGISTRO
  ══════════════════════════════════════════════════════════ */
  function reg(id, cat, title, desc, file, preview, detail, extra) {
    var e = {
      id: id,
      group: 'componentes',
      cat: cat,
      title: title,
      desc: desc,
      file: file,
      tag: 'Componente',
      tagIcon: 'component',
      preview: preview,
      detail: detail
    };
    if (extra) for (var k in extra) e[k] = extra[k];
    SG.reg(e);
  }

  // Acciones
  reg('button', 'Acciones', 'Button', 'primary / ghost / subtle / destructive / icon-only × sm·md·lg, disabled, con ícono, loading.', 'components.css §5', buttonPreview, buttonDetail);
  reg('toggle', 'Acciones', 'Toggle', 'on / off / disabled. Aparece en V5 Tab Estado.', 'components.css §7', function () {
    return toggle(true, false, 'Activa');
  }, toggleDetail);
  reg('chip-filtro', 'Acciones', 'Chip de filtro', 'con valor / eliminable / limpiar todo.', 'components.css §17', chipPreview, chipDetail);

  // Feedback y estado
  reg('toast', 'Feedback y estado', 'Toast', 'success / error / warn / info × con o sin subtítulo.', 'components.css §13', toastPreview, toastDetail);
  reg('empty', 'Feedback y estado', 'Empty state', 'BBDD vacía / sin resultados / sin permisos.', 'components.css §19', emptyPreview, emptyDetail);
  reg('error', 'Feedback y estado', 'Error state', 'con retry / sin retry.', 'components.css §19', function () {
    return errorBox(true).replace('min-height:200px', 'min-height:120px');
  }, errorDetail);
  reg('skeleton', 'Feedback y estado', 'Skeleton', 'KPI card / fila de tabla / chart card / lista del mapa.', 'components.css §18', skeletonPreview, skeletonDetail);
  reg('banner', 'Feedback y estado', 'Banner persistente', 'sync en curso (el único caso actual).', 'components.css §20', bannerPreview, bannerDetail);
  reg('badge-notif', 'Feedback y estado', 'Badge de notificación', 'sobre ícono de nav (sidebar admin).', 'styleguide.css', badgePreview, badgeDetail);
  reg('tooltip', 'Feedback y estado', 'Tooltip', 'flotante superior / lateral del rail — tinta + texto blanco + flecha (DS v3.2).', 'components.css §14', tooltipPreview, tooltipDetail);

  // Formularios
  reg('input', 'Formularios', 'Input text', 'default / focus / error / disabled / con ícono / con limpiar.', 'components.css §7', inputPreview, inputDetail);
  reg('input-date', 'Formularios', 'Input fecha', 'input[type=date] unitario (md/sm/disabled) + par desde/hasta con guión (A5 Logs).', 'components.css §7', inputDatePreview, inputDateDetail);
  reg('select', 'Formularios', 'Select', 'md / sm / disabled.', 'components.css §7', selectPreview, selectDetail);
  reg('textarea', 'Formularios', 'Textarea', 'default / con contador de caracteres.', 'components.css §7', textareaPreview, textareaDetail);
  reg('radio', 'Formularios', 'Radio', 'seleccionado / no seleccionado / disabled.', 'components.css §7', radioPreview, radioDetail);
  reg('checkbox', 'Formularios', 'Checkbox', 'marcado / no marcado / indeterminado / disabled.', 'components.css §7', checkPreview, checkDetail, {
    mounted: checkMounted
  });
  reg('slider', 'Formularios', 'Slider', 'valoración mínima (el único caso actual).', 'components.css §7', sliderPreview, sliderDetail);
  reg('form-group', 'Formularios', 'Form group', 'label + input / + hint / + error.', 'components.css §7', formGroupPreview, formGroupDetail);

  // Contenedores
  reg('card', 'Contenedores', 'Card', 'estándar / accent / compact / con card-head / clickeable (KPI link).', 'components.css §8', cardPreview, cardDetail);
  reg('modal', 'Contenedores', 'Modal', 'base / confirmación destructiva / formulario corto / corregir dato.', 'components.css §11', modalPreview, modalDetail);
  reg('drawer', 'Contenedores', 'Drawer', 'base / con tabs / empty state dentro del drawer.', 'components.css §12', drawerPreview, drawerDetail);
  reg('popover', 'Contenedores', 'Popover', 'filtros de V4 (el único caso actual).', 'styleguide.css', popoverPreview, popoverDetail);
  reg('flyout', 'Contenedores', 'Flyout', 'menú admin del sidebar.', 'components.css §4', flyoutPreview, flyoutDetail);
  reg('row-menu', 'Contenedores', 'Menú contextual de fila', '⋯ por fila (A1 Usuarios / A4 Cadenas) · sin acción destructiva / con eliminar · visible en hover.', 'views.css', rowmenuPreview, rowmenuDetail);

  // Navegación
  reg('rail', 'Navegación', 'Sidebar rail', 'colapsable 64↔240 (toggle chevrón) · activo con barra de acento / hover / con badge / rol user vs admin.', 'components.css §4', railPreview, railDetail);
  reg('tabs', 'Navegación', 'Tabs', 'las 5 del drawer V5 / con contador (badge en Cambios).', 'components.css §15', tabsPreview, tabsDetail);
  reg('anchor', 'Navegación', 'Anchor nav', 'barra sticky de V2 BI / ítem activo por scroll.', 'styleguide.css', anchorPreview, anchorDetail);
  reg('subnav-admin', 'Navegación', 'Subnav admin', 'navegación horizontal de /admin/* · normal / activo / con badge de pendientes / set completo.', 'admin-shared.js', subnavPreview, subnavDetail);
  reg('pagination', 'Navegación', 'Paginación', 'numerada con elipsis / primera / última página.', 'components.css §16', pagiPreview, pagiDetail);
  reg('breadcrumb', 'Navegación', 'Breadcrumb', 'no aplica en este producto (jerarquía plana).', '—', breadcrumbPreview, breadcrumbDetail);

  // Datos y visualización
  reg('pill', 'Datos y visualización', 'Pill / Badge', 'accent / pos / neg / warn / neutral / paused × lg·sm × dot·ícono·texto.', 'components.css §6', pillPreview, pillDetail);
  reg('kpi', 'Datos y visualización', 'KPI card', 'valor solo / delta + / delta − / subtítulo / clickeable.', 'components.css §8', kpiPreview, kpiDetail);
  reg('table-dense', 'Datos y visualización', 'Tabla densa', 'fila normal · badge Cliente · override · hover · sticky · ordenación · presencia.', 'components.css §10', tableDensePreview, tableDenseDetail);
  reg('table-ultra', 'Datos y visualización', 'Tabla ultra', 'igual que densa pero 32px (Changelog, Logs).', 'components.css §10', tableUltraPreview, tableUltraDetail);
  reg('presence', 'Datos y visualización', 'Chip de presencia', 'con web / sin web / con tel / sin tel.', 'styleguide.css', presencePreview, presenceDetail);
  reg('score', 'Datos y visualización', 'Score bar', 'barra de progreso inline en tabla (S3 de BI).', 'styleguide.css', scorePreview, scoreDetail);
  reg('progress', 'Datos y visualización', 'Progress bar', 'la de A3 Revisión.', 'styleguide.css', progressPreview, progressDetail);

  // Marcadores y mapa
  reg('marker', 'Marcadores y mapa', 'Marcador de mapa', 'partner (lima) / otra óptica (gris) / nuevo con halo.', 'mapa.js', markerPreview, markerDetail);
  reg('map-popup', 'Marcadores y mapa', 'Popup de mapa', 'con todos los datos / sin teléfono / sin web.', 'mapa.js', popupPreview, popupDetail);
  reg('map-item', 'Marcadores y mapa', 'Item de lista del mapa', 'partner / no partner.', 'mapa.js', mapItemPreview, mapItemDetail);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/sg-components.js", error: String((e && e.message) || e) }); }

// coopervision/views/sg-foundations.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   views/sg-foundations.js  ·  Fundamentos (5 cards)
   Colores · Tipografía · Espaciado · Iconos · Radios y sombras
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SG = window.cpvSG;
  var enc = SG.enc;

  /* ── COLORES ─────────────────────────────────────────────── */
  function swatch(bg, border, token, value) {
    var b = border || 'rgba(0,0,0,.08)';
    return '<div style="display:flex;flex-direction:column;gap:6px">' + '<div style="width:56px;height:56px;background:' + bg + ';border:1px solid ' + b + ';border-radius:var(--radius-md)"></div>' + '<div style="font-size:11px;font-weight:600;color:var(--ink-2);max-width:84px;word-break:break-all">' + enc(token) + '</div>' + '<div style="font-family:var(--font-mono);font-size:10px;color:var(--muted)">' + enc(value) + '</div>' + '</div>';
  }
  function swatchGroup(label, items) {
    return SG.block(label, '', SG.stage('', SG.samples(items)));
  }
  function coloresDetail() {
    return swatchGroup('Acento', [swatch('#C5E817', null, '--accent', '#C5E817'), swatch('#282A2D', null, '--accent-ink', '#282A2D'), swatch('rgba(197,232,23,.18)', 'rgba(197,232,23,.4)', '--accent-soft', '.18'), swatch('#3F4E07', null, '--accent-ink-deep', '#3F4E07')]) + swatchGroup('Neutrales', [swatch('#282A2D', null, '--ink', '#282A2D'), swatch('#4A4C4F', null, '--ink-2', '#4A4C4F'), swatch('#7E8084', null, '--muted', '#7E8084'), swatch('#A8AAAE', null, '--muted-2', '#A8AAAE'), swatch('#C5C8CC', null, '--line', '#C5C8CC'), swatch('#E7EAEE', '#C5C8CC', '--line-2', '#E7EAEE'), swatch('#FFFFFF', '#C5C8CC', '--bg / --card', '#FFFFFF')]) + swatchGroup('Semánticos', [swatch('#10B981', null, '--pos', '#10B981'), swatch('#D1FAE5', '#10B981', '--pos-soft', '#D1FAE5'), swatch('#047857', null, '--pos-ink', '#047857'), swatch('#F43F5E', null, '--neg', '#F43F5E'), swatch('#FFE4E6', '#F43F5E', '--neg-soft', '#FFE4E6'), swatch('#BE123C', null, '--neg-ink', '#BE123C'), swatch('#FEF3C7', '#D97706', '--warn-bg', '#FEF3C7'), swatch('#92400E', null, '--warn-ink', '#92400E'), swatch('#E5E7EB', '#C5C8CC', '--paused-bg', '#E5E7EB'), swatch('#6B7280', null, '--paused-ink', '#6B7280')]);
  }
  function coloresPreview() {
    var s = function (bg, br) {
      return '<div style="width:34px;height:34px;border-radius:var(--radius-sm);background:' + bg + ';border:1px solid ' + (br || 'rgba(0,0,0,.08)') + '"></div>';
    };
    return '<div style="display:grid;grid-template-columns:repeat(4,34px);gap:8px">' + s('#C5E817') + s('#282A2D') + s('#10B981') + s('#F43F5E') + s('#7E8084') + s('#FEF3C7', '#D97706') + s('#D1FAE5', '#10B981') + s('#FFFFFF', '#C5C8CC') + '</div>';
  }

  /* ── TIPOGRAFÍA ──────────────────────────────────────────── */
  function tipoRow(cls, sample, meta) {
    return '<div style="display:grid;grid-template-columns:1fr 260px;gap:var(--space-5);align-items:center;padding:var(--space-4) 0;border-bottom:1px solid var(--line-2)">' + '<span class="' + cls + '">' + enc(sample) + '</span>' + '<div style="font-size:11px;color:var(--muted);display:flex;flex-direction:column;gap:2px;text-align:right">' + '<span style="font-weight:600;color:var(--ink-2)">.' + cls + '</span>' + '<span style="font-family:var(--font-mono)">' + enc(meta) + '</span>' + '</div>' + '</div>';
  }
  function tipografiaDetail() {
    return SG.stage('Escala (DS §2.2)', tipoRow('display-xl', 'Plataforma Ópticas Iberia', 'Outfit 32px/700 · display') + tipoRow('display-lg', 'Base de datos maestra', 'Outfit 24px/700 · display') + tipoRow('display-md', 'Gestión de usuarios', 'Outfit 20px/600 · subtítulos') + tipoRow('kpi-xl', '18.234', 'Outfit 36px/700 · KPI grande') + tipoRow('kpi-md', '3.142', 'Outfit 24px/700 · KPI medio') + tipoRow('body-md', 'Datos de ópticas actualizados', 'Inter 14px/400 · cuerpo') + tipoRow('body-sm', 'Última sync hace 12 días · 18.234 registros', 'Inter 13px/400 · secundario') + tipoRow('body-xs', 'place_id · Metadata · Timestamps', 'Inter 12px/400 · metadatos') + tipoRow('label-md', 'Filtrar por provincia', 'Inter 13px/500 · labels') + tipoRow('label-sm', 'Solo clientes', 'Inter 12px/500 · labels sm') + tipoRow('eyebrow-t', 'Administración', 'Inter 11px/600 UPPER · eyebrows') + tipoRow('mono-sm', 'ChIJ_madrid_001 · CPV-08234', 'JetBrains Mono 12px · IDs'));
  }
  function tipoPreview() {
    return '<div style="display:flex;flex-direction:column;gap:4px;align-items:flex-start">' + '<span class="display-lg">Aa Editorial</span>' + '<span class="body-sm c-muted">Outfit · Inter · JetBrains Mono</span>' + '<span class="mono-sm" style="color:var(--muted-2)">CPV-08234</span>' + '</div>';
  }

  /* ── ESPACIADO ───────────────────────────────────────────── */
  function espaciadoDetail() {
    var tokens = [['--space-1', '4px'], ['--space-2', '8px'], ['--space-3', '12px'], ['--space-4', '14px'], ['--space-5', '16px'], ['--space-6', '20px'], ['--space-7', '26px'], ['--space-8', '32px']];
    return SG.stage('Escala de espaciado', '<div style="display:flex;flex-direction:column;gap:var(--space-3)">' + tokens.map(function (t) {
      var px = parseInt(t[1], 10);
      return '<div style="display:grid;grid-template-columns:100px 48px 1fr;align-items:center;gap:var(--space-5)">' + '<span style="font-family:var(--font-mono);font-size:11px;color:var(--ink-2)">' + enc(t[0]) + '</span>' + '<span style="font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums">' + enc(t[1]) + '</span>' + '<div style="height:' + Math.max(px, 4) + 'px;width:' + px * 5 + 'px;background:var(--accent);border-radius:var(--radius-xs)"></div>' + '</div>';
    }).join('') + '</div>');
  }
  function espaciadoPreview() {
    return '<div style="display:flex;align-items:flex-end;gap:8px">' + [4, 8, 12, 16, 20, 26].map(function (px) {
      return '<div style="width:' + px + 'px;height:' + px * 2.2 + 'px;background:var(--accent);border-radius:var(--radius-xs)"></div>';
    }).join('') + '</div>';
  }

  /* ── ICONOS ──────────────────────────────────────────────── */
  var ICONS = ['home-simple', 'graph-up', 'map-pin', 'database', 'clock-rotate-right', 'group', 'refresh-double', 'warning-circle', 'network-left', 'page', 'user', 'view-grid', 'check-circle', 'xmark', 'warning-triangle', 'plus', 'edit-pencil', 'trash', 'download', 'search', 'filter', 'arrow-right', 'more-horiz', 'check', 'star-solid', 'log-in', 'log-out', 'settings', 'nav-arrow-left', 'nav-arrow-right', 'lock', 'mail', 'calendar', 'eye', 'eye-closed', 'expand'];
  function iconosDetail() {
    return SG.stage('Librería Iconoir · stroke 1.5', '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:var(--space-3)">' + ICONS.map(function (icon) {
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:var(--space-4) var(--space-3);border:1px solid var(--line-2);border-radius:var(--radius-md)">' + '<iconify-icon icon="iconoir:' + enc(icon) + '" width="24" style="color:var(--ink-2)"></iconify-icon>' + '<span style="font-size:10px;color:var(--muted);text-align:center;word-break:break-all;font-family:var(--font-mono);line-height:1.3">' + enc(icon) + '</span>' + '</div>';
    }).join('') + '</div>');
  }
  function iconosPreview() {
    return '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;color:var(--ink-2)">' + ['home-simple', 'graph-up', 'map-pin', 'database', 'group', 'view-grid', 'search', 'settings'].map(function (i) {
      return '<iconify-icon icon="iconoir:' + i + '" width="22"></iconify-icon>';
    }).join('') + '</div>';
  }

  /* ── RADIOS Y SOMBRAS ────────────────────────────────────── */
  function radiosDetail() {
    var radii = [['--radius-xs', '3px'], ['--radius-sm', '6px'], ['--radius-md', '8px'], ['--radius-lg', '10px'], ['--radius-xl', '14px'], ['--radius-2xl', '30px'], ['--radius-full', '99px']];
    var radiiHTML = '<div style="display:flex;flex-wrap:wrap;gap:var(--space-5)">' + radii.map(function (r) {
      return '<div style="display:flex;flex-direction:column;gap:8px;align-items:center">' + '<div style="width:64px;height:64px;background:var(--accent-soft);border:1.5px solid var(--accent);border-radius:var(' + r[0] + ')"></div>' + '<div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-2)">' + enc(r[0]) + '</div>' + '<div style="font-family:var(--font-mono);font-size:10px;color:var(--muted)">' + enc(r[1]) + '</div>' + '</div>';
    }).join('') + '</div>';
    var shadows = [['--shadow-e1', 'e1 · reposo (cards, inputs)'], ['--shadow-e2', 'e2 · elevado (dropdowns, toasts)'], ['--shadow-e3', 'e3 · overlay (modal, drawer)']];
    var shadowsHTML = '<div style="display:flex;flex-wrap:wrap;gap:var(--space-7);padding:var(--space-4) 0">' + shadows.map(function (s) {
      return '<div style="display:flex;flex-direction:column;gap:12px;align-items:center">' + '<div style="width:120px;height:72px;background:var(--card);border:1px solid var(--line-2);border-radius:var(--radius-lg);box-shadow:var(' + s[0] + ')"></div>' + '<div style="text-align:center"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-2)">' + enc(s[0]) + '</div>' + '<div style="font-size:11px;color:var(--muted);margin-top:2px">' + enc(s[1].split('·')[1]) + '</div></div>' + '</div>';
    }).join('') + '<div style="display:flex;flex-direction:column;gap:12px;align-items:center">' + '<div style="width:120px;height:72px;background:var(--card);border:1px solid var(--accent);border-radius:var(--radius-lg);box-shadow:var(--shadow-focus)"></div>' + '<div style="text-align:center"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-2)">--shadow-focus</div>' + '<div style="font-size:11px;color:var(--muted);margin-top:2px">anillo de foco</div></div>' + '</div>' + '</div>';
    return SG.block('Radios', 'de 3px a totalmente redondeado (99px)', SG.stage('', radiiHTML)) + SG.block('Sombras / elevación', 'separación por elevación, no por color de fondo', SG.stage('', shadowsHTML));
  }
  function radiosPreview() {
    return '<div style="display:flex;gap:14px;align-items:center">' + '<div style="width:46px;height:46px;background:var(--accent-soft);border:1.5px solid var(--accent);border-radius:3px"></div>' + '<div style="width:46px;height:46px;background:var(--accent-soft);border:1.5px solid var(--accent);border-radius:10px"></div>' + '<div style="width:46px;height:46px;background:var(--card);border:1px solid var(--line-2);border-radius:10px;box-shadow:var(--shadow-e2)"></div>' + '</div>';
  }

  /* ── Registro ────────────────────────────────────────────── */
  SG.reg({
    id: 'colores',
    group: 'fundamentos',
    title: 'Colores',
    tag: 'Tokens',
    tagIcon: 'palette',
    file: 'tokens.css',
    desc: 'Acento lima + neutrales Black 500→Gray 400 + semánticos pos/neg/warn/paused.',
    descLong: 'Acento lima #C5E817 con derivados ink/soft/deep, rampa neutra de Black 500 a Gray 400, y la paleta semántica (positivo, negativo, aviso, pausado) cada una con su soft e ink.',
    preview: coloresPreview,
    detail: coloresDetail
  });
  SG.reg({
    id: 'tipografia',
    group: 'fundamentos',
    title: 'Tipografía',
    tag: 'Tokens',
    tagIcon: 'text',
    file: 'tokens.css §2.2',
    desc: 'Outfit (display/KPI) · Inter (cuerpo/labels) · JetBrains Mono (IDs).',
    descLong: 'Tres familias: Outfit para titulares y KPIs, Inter para cuerpo y labels, JetBrains Mono para identificadores. Doce niveles de escala.',
    preview: tipoPreview,
    detail: tipografiaDetail
  });
  SG.reg({
    id: 'espaciado',
    group: 'fundamentos',
    title: 'Espaciado',
    tag: 'Tokens',
    tagIcon: 'ruler-combine',
    file: 'tokens.css',
    desc: 'Escala de 4px a 32px en 8 pasos (--space-1 … --space-8).',
    descLong: 'Escala de espaciado de ocho pasos, de 4px a 32px, usada para padding, gap y márgenes en todo el sistema.',
    preview: espaciadoPreview,
    detail: espaciadoDetail
  });
  SG.reg({
    id: 'iconos',
    group: 'fundamentos',
    title: 'Iconos',
    tag: 'Librería',
    tagIcon: 'view-grid',
    file: 'Iconoir',
    desc: 'Set Iconoir con stroke 1.5. Tamaños 13–24px según contexto.',
    descLong: 'Iconografía de la librería Iconoir, trazo 1.5. Inventario de los iconos usados en navegación, acciones, estados y datos.',
    preview: iconosPreview,
    detail: iconosDetail
  });
  SG.reg({
    id: 'radios',
    group: 'fundamentos',
    title: 'Radios y sombras',
    tag: 'Tokens',
    tagIcon: 'rounded-corner',
    file: 'tokens.css',
    desc: 'Radios 3→99px y elevación e1/e2/e3 + anillo de foco.',
    descLong: 'Radios de esquina de 3px a totalmente redondeado, y tres niveles de sombra (reposo, elevado, overlay) más el anillo de foco accesible.',
    preview: radiosPreview,
    detail: radiosDetail
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/sg-foundations.js", error: String((e && e.message) || e) }); }

// coopervision/views/sg-patterns.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   views/sg-patterns.js  ·  Pattern by View
   Componentes del catálogo usados en contexto de vista, con las
   variantes de DATOS que cambian el significado.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SG = window.cpvSG;
  var enc = SG.enc;
  var stage = SG.stage,
    block = SG.block;

  /* lista de variantes a documentar */
  function variantList(items) {
    return '<ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:var(--space-3)">' + items.map(function (it) {
      return '<li style="display:flex;gap:var(--space-3);align-items:flex-start">' + '<iconify-icon icon="iconoir:arrow-right" width="14" style="color:var(--accent-ink-deep);margin-top:3px;flex-shrink:0"></iconify-icon>' + '<span class="body-sm" style="color:var(--ink-2)"><b style="color:var(--ink)">' + enc(it[0]) + '</b>' + (it[1] ? ' — ' + enc(it[1]) : '') + '</span></li>';
    }).join('') + '</ul>';
  }

  /* mini KPI para previews */
  function miniKpi(label, value, delta, type) {
    return '<div class="card card-compact" style="margin:0;min-width:120px"><div class="eyebrow-t">' + enc(label) + '</div>' + '<div class="kpi-value-md" style="margin-top:6px">' + enc(value) + '</div>' + (delta ? '<div class="kpi-delta ' + type + '" style="margin-top:4px"><iconify-icon icon="iconoir:' + (type === 'pos' ? 'arrow-up' : 'arrow-down') + '" width="11"></iconify-icon>' + enc(delta) + '</div>' : '') + '</div>';
  }

  /* ── RESUMEN ─────────────────────────────────────────────── */
  function resumenDetail() {
    return block('KPIs del resumen', 'el delta cambia el significado de la misma card', '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:var(--space-4)">' + stage('Delta positivo', miniKpi('Partners', '3.142', '+12.4%', 'pos'), true) + stage('Delta negativo', miniKpi('Sin web', '1.087', '−3.1%', 'neg'), true) + stage('Primera sync (sin delta)', miniKpi('Ópticas', '18.234', '', ''), true) + stage('Valoración con estrella', miniKpi('Valoración', '4.4★', '', ''), true) + stage('Reseñas compacto', miniKpi('Reseñas', '1,2M', '', ''), true) + '</div>') + block('Empty state', 'cuando la BBDD está vacía', stage('', '<div class="card" style="margin:0"><div class="empty-state" style="min-height:160px"><iconify-icon class="empty-state-icon" icon="iconoir:database" width="30"></iconify-icon><h2 class="state-title">Sin datos iniciales</h2><p class="state-body">Lanza la primera sincronización para poblar el resumen.</p></div></div>', true));
  }
  function resumenPreview() {
    return '<div style="display:flex;gap:10px">' + miniKpi('Partners', '3.142', '+12.4%', 'pos') + miniKpi('Sin web', '1.087', '−3.1%', 'neg') + '</div>';
  }

  /* ── BUSINESS INTELLIGENCE ───────────────────────────────── */
  function biDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Anchor nav', 'estado normal vs sticky al hacer scroll'], ['Cuadrante', 'datos solo partners / solo otras / ambos'], ['Oportunidad alta vs baja', 'la barra de progreso cambia de color y largo']]), true)) + block('Anchor nav', 'normal / sticky', stage('', '<div class="sg-anchor"><a class="sg-anchor-item active">Resumen</a><a class="sg-anchor-item">Cuadrante</a><a class="sg-anchor-item">Oportunidad</a><a class="sg-anchor-item">Ranking</a></div>')) + block('Oportunidad (score bar)', 'alta vs baja', stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' + '<div style="display:flex;align-items:center;gap:12px"><span class="label-md" style="width:80px">Alta</span><div class="sg-bar" style="flex:1;max-width:240px"><span style="width:88%"></span></div></div>' + '<div style="display:flex;align-items:center;gap:12px"><span class="label-md" style="width:80px">Baja</span><div class="sg-bar is-neg" style="flex:1;max-width:240px"><span style="width:22%"></span></div></div>' + '</div>'));
  }
  function biPreview() {
    return '<div style="width:220px;display:flex;flex-direction:column;gap:10px"><div class="sg-anchor" style="font-size:11px"><span class="sg-anchor-item active" style="padding:4px 8px">Cuadrante</span><span class="sg-anchor-item" style="padding:4px 8px">Ranking</span></div><div class="sg-bar"><span style="width:72%"></span></div></div>';
  }

  /* ── MAPA ────────────────────────────────────────────────── */
  function mapaDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Sin resultados', 'con filtros activos (no es BBDD vacía)'], ['Marcador', 'seleccionado vs no seleccionado'], ['Popup', 'sin datos de contacto']]), true)) + block('Marcadores', 'no seleccionado vs seleccionado', stage('', '<div style="display:flex;gap:40px;align-items:center;padding:12px 8px"><div style="display:flex;flex-direction:column;align-items:center;gap:12px"><span class="sg-marker partner"></span><span class="sg-sample-cap">normal</span></div><div style="display:flex;flex-direction:column;align-items:center;gap:12px"><span class="sg-marker new"></span><span class="sg-sample-cap">seleccionado</span></div></div>')) + block('Sin resultados con filtros', '', stage('', '<div class="card" style="margin:0"><div class="empty-state" style="min-height:150px"><iconify-icon class="empty-state-icon" icon="iconoir:map-pin" width="28"></iconify-icon><h2 class="state-title">Sin ópticas en el área</h2><p class="state-body">Ninguna óptica coincide con los filtros activos.</p><button class="btn btn-ghost btn-sm">Limpiar filtros</button></div></div>', true));
  }
  function mapaPreview() {
    return '<div style="display:flex;gap:20px;align-items:center"><span class="sg-marker partner"></span><span class="sg-marker other"></span><span class="sg-marker new"></span></div>';
  }

  /* ── BASE DE DATOS ───────────────────────────────────────── */
  function bbddDetail() {
    function chip(label) {
      return '<div data-chip style="display:inline-flex;align-items:center;gap:4px;padding:4px 8px 4px 12px;background:var(--accent-soft);color:var(--accent-ink-deep);border-radius:var(--radius-full);font-size:12px;font-weight:500;border:1px solid rgba(197,232,23,.4)">' + enc(label) + '<button data-chip-rm style="background:none;border:none;cursor:pointer;padding:0;display:flex;color:inherit;opacity:.65"><iconify-icon icon="iconoir:xmark" width="12"></iconify-icon></button></div>';
    }
    return block('Variantes a documentar', '', stage('', variantList([['Fila con badge Cliente + ícono override', 'dato corregido manualmente'], ['Fila solo Google sin badge', 'óptica de mercado, no cliente'], ['Filtros', '0 activos / 3 activos / todos limpiados'], ['Exportar', 'con filtros vs sin filtros']]), true)) + block('Filtros activos', '3 activos · clic en × para limpiar', stage('', '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">' + chip('Madrid') + chip('Solo clientes') + chip('Rating ≥ 4.0') + '<button class="btn btn-ghost btn-sm">Limpiar todo</button><div style="flex:1"></div><button class="btn btn-ghost btn-sm"><iconify-icon icon="iconoir:download" width="13"></iconify-icon>Exportar (con filtros)</button></div>'));
  }
  function bbddPreview() {
    return '<div style="width:220px;display:flex;flex-wrap:wrap;gap:6px"><span class="pill pill-accent pill-sm">Madrid</span><span class="pill pill-accent pill-sm">Clientes</span><span class="pill pill-pos pill-sm">Cliente</span></div>';
  }

  /* ── DETALLE (Drawer V5) ─────────────────────────────────── */
  function detalleDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Tab CPV en óptica no cliente', 'empty state dentro del tab'], ['Campo con badge "Corregido manualmente"', 'override visible'], ['Campo editable en hover', 'lápiz visible al pasar el cursor'], ['Pestaña Cambios', 'sin overrides / con 2 overrides (badge contador)']]), true)) + block('Campo con override', 'badge + meta de origen', stage('', '<div class="override-wrap"><div class="override-row"><span class="data-value">+34 91 234 56 78</span><span class="pill pill-accent pill-sm">Corregido manualmente</span><iconify-icon icon="iconoir:edit-pencil" width="13" style="color:var(--muted-2)"></iconify-icon></div><div class="override-meta">antes: +34 91 000 00 00 · Ana S. · hace 3 días</div></div>')) + block('Tab Cambios', 'badge contador en la pestaña', stage('', '<nav class="tabs-list" style="margin:0"><button class="tab-trigger">Resumen</button><button class="tab-trigger active">Cambios <span class="pill pill-neutral pill-sm" style="margin-left:4px">2</span></button></nav>')) + /* ── Contenido real de los 5 tabs ── */
    block('Contenido de los 5 tabs', 'estado real de cada pestaña del drawer', '<nav class="tabs-list" style="margin:0 0 var(--space-5)">' + '<button class="tab-trigger active" style="cursor:default">Resumen</button>' + '<button class="tab-trigger" style="cursor:default">Google Maps</button>' + '<button class="tab-trigger" style="cursor:default">CooperVision</button>' + '<button class="tab-trigger" style="cursor:default">App Data</button>' + '<button class="tab-trigger" style="cursor:default">Cambios <span class="pill pill-neutral pill-sm" style="margin-left:4px">2</span></button>' + '</nav>' + '<div class="sg-cols">' + stage('Tab Resumen', dPairs([['Dirección', 'Calle Mayor 24, Madrid'], ['Rating', '★ 4.8'], ['Valoración', '324 reseñas'], ['Web', 'opticasancarlos.es'], ['Teléfono', '+34 91 234 56 78']])) + stage('Tab Google Maps · fuente Outscraper', dPairs([['place_id', 'ChIJ_madrid_001'], ['Nombre', 'Óptica San Carlos'], ['Dirección', 'Calle Mayor 24, 28013 Madrid'], ['Teléfono', '+34 91 234 56 78'], ['Web', 'opticasancarlos.es'], ['Rating', '★ 4.8 · 324 reseñas'], ['Categoría', 'Óptica'], ['Horario', 'L–V 10:00–20:00']], true)) + stage('Tab CooperVision · óptica no cliente', '<div class="empty-state" style="min-height:180px"><iconify-icon class="empty-state-icon" icon="iconoir:database" width="28"></iconify-icon><h2 class="state-title" style="font-size:15px">Esta óptica no está en el maestro CooperVision</h2></div>') + stage('Tab App Data · campos gestionables', '<div class="form-group" style="margin-bottom:var(--space-5)"><label class="form-label">Notas internas</label><textarea class="textarea" rows="3">Cliente prioritario — visitado en Q1.</textarea></div>' + toggleField('show_campañas', true, 'Mostrar en campañas')) + stage('Tab Cambios · con registros', changeRows(2)) + '</div>') + block('Tab Cambios · estado vacío', 'sin overrides aplicados', stage('', '<div class="empty-state" style="min-height:150px"><iconify-icon class="empty-state-icon" icon="iconoir:edit-pencil" width="26"></iconify-icon><h2 class="state-title" style="font-size:15px">Sin modificaciones registradas</h2></div>', true)) + block('Tab CooperVision · óptica cliente (con datos)', 'campos del maestro de Salesforce — el caso más frecuente', stage('', '<div style="max-width:360px">' + dPairs([['CODIGO', 'CPV-08234'], ['GRUPO', 'Visionlab'], ['DP', '28013'], ['COM', 'Madrid'], ['TIPOLOGIA', 'Óptica independiente'], ['SEGMENTACION', 'Premium']]) + '</div>', true)) + /* ── Campo editable en hover ── */
    block('Campo editable en hover', 'lápiz a la derecha al pasar el cursor — invitación a editar, distinto del campo ya corregido', '<div class="sg-cols">' + stage('Hover (lápiz visible)', editField('Teléfono', '+34 91 234 56 78', true)) + stage('Reposo (sin lápiz) — pasa el cursor', editField('Teléfono', '+34 91 234 56 78', false)) + '</div>') + /* ── Loading del drawer ── */
    block('Loading del drawer', 'header ya resuelto (nombre + place_id), cuerpo con skeletons', stage('', '<div style="max-width:360px;border:1px solid var(--line-2);border-radius:var(--radius-lg);overflow:hidden">' + '<div style="padding:var(--space-5);border-bottom:1px solid var(--line-2)"><div class="eyebrow-t">Óptica · ChIJ_madrid_001</div><h3 class="drawer-title" style="margin-top:4px">Óptica San Carlos</h3></div>' + '<div style="padding:var(--space-5);display:flex;flex-direction:column;gap:14px">' + Array(5).fill(0).map(function () {
      return '<div style="display:flex;justify-content:space-between;gap:20px"><span class="skeleton sk-text-sm" style="width:32%"></span><span class="skeleton sk-text-sm" style="width:48%"></span></div>';
    }).join('') + '</div></div>', true));
  }
  function dPairs(rows, mono) {
    return '<div style="display:flex;flex-direction:column;gap:10px">' + rows.map(function (r) {
      return '<div class="data-pair"><span class="data-label">' + enc(r[0]) + '</span><span class="data-value"' + (mono && r[0] === 'place_id' ? ' style="font-family:var(--font-mono);font-size:12px"' : '') + '>' + enc(r[1]) + '</span></div>';
    }).join('') + '</div>';
  }
  function toggleField(name, on, label) {
    return '<label class="toggle-label"><input type="checkbox"' + (on ? ' checked' : '') + '><span class="toggle-track"></span><span class="toggle-text">' + enc(label) + '</span></label>';
  }
  function editField(label, val, shown) {
    return '<div class="sg-editfield' + (shown ? ' is-shown' : '') + '">' + '<div style="display:flex;flex-direction:column;gap:2px"><span class="data-label">' + enc(label) + '</span><span class="data-value">' + enc(val) + '</span></div>' + '<iconify-icon class="sg-edit-pencil" icon="iconoir:edit-pencil" width="15"></iconify-icon></div>';
  }
  function changeRows(n) {
    var rows = [['Teléfono', '+34 91 000 00 00', '+34 91 234 56 78', 'Ana S.', 'hace 3 días'], ['Web', '—', 'opticasancarlos.es', 'Luis V.', 'hace 8 días']].slice(0, n);
    return '<div style="display:flex;flex-direction:column;gap:10px">' + rows.map(function (r) {
      return '<div class="override-wrap"><div class="override-row"><span class="body-sm" style="font-weight:600">' + enc(r[0]) + '</span><span class="pill pill-accent pill-sm">Corregido</span></div>' + '<div class="override-meta">' + enc(r[1]) + ' → <b>' + enc(r[2]) + '</b> · ' + enc(r[3]) + ' · ' + enc(r[4]) + '</div></div>';
    }).join('') + '</div>';
  }
  function detallePreview() {
    return '<div style="width:230px"><div class="override-row" style="margin-bottom:6px"><span class="body-sm" style="font-weight:500">Teléfono</span><span class="pill pill-accent pill-sm">Corregido</span></div><div class="body-xs c-muted">↳ Ana S. · hace 3 días</div></div>';
  }

  /* ── REVISIÓN (A3) ───────────────────────────────────────── */
  function revisionDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Focus card · conflicto con 1 candidato', ''], ['Focus card · múltiples candidatos', ''], ['Solo CPV', 'sin match de Google'], ['No encontrado', 'sin candidatos'], ['Bandeja vacía', 'todo revisado']]), true)) + block('Focus card (accent)', 'conflicto con candidato', stage('', '<div class="card card-accent" style="margin:0;max-width:420px"><div class="card-head"><div><div class="eyebrow-t">Conflicto · 1 candidato</div><h3 class="display-md" style="margin-top:4px">Óptica Central</h3></div><span class="pill pill-warn"><span class="pill-dot"></span>Revisar</span></div><div class="data-pair" style="margin-bottom:10px"><span class="data-label">CPV</span><span class="data-value">Calle Sol 4</span></div><div class="data-pair"><span class="data-label">Google</span><span class="data-value">Calle del Sol 4, Madrid</span></div><div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-primary btn-sm">Vincular</button><button class="btn btn-ghost btn-sm">Descartar</button></div></div>')) + /* ── Múltiples candidatos ── */
    block('Múltiples candidatos', 'lista de candidatos seleccionable · acción "Vincular seleccionado"', stage('', '<div class="card card-accent" style="margin:0;max-width:460px">' + '<div class="card-head"><div><div class="eyebrow-t">Conflicto · 3 candidatos</div><h3 class="display-md" style="margin-top:4px">Óptica Visión Plus</h3></div><span class="pill pill-warn"><span class="pill-dot"></span>Revisar</span></div>' + '<div class="data-pair" style="margin-bottom:14px"><span class="data-label">CPV</span><span class="data-value">Av. Diagonal 401, Barcelona</span></div>' + '<div class="sg-mini-label">Candidatos de Google Maps</div>' + '<div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">' + candRow('Visión Plus Diagonal', 'Av. Diagonal 401', '0.92', true) + candRow('Òptica Visió+', 'Diagonal 399', '0.78', false) + candRow('Centre Òptic Diagonal', 'Av. Diagonal 405', '0.64', false) + '</div>' + '<div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-primary btn-sm">Vincular seleccionado</button><button class="btn btn-ghost btn-sm">Ninguno coincide</button></div></div>')) + /* ── Solo CPV ── */
    block('Solo CPV', 'existe en el maestro CooperVision pero sin match en Google', stage('', '<div class="card" style="margin:0;max-width:420px">' + '<div class="card-head"><div><div class="eyebrow-t">Solo CPV · sin match</div><h3 class="display-md" style="margin-top:4px">Óptica Levante</h3></div><span class="pill pill-neutral"><span class="pill-dot"></span>Sin Google</span></div>' + '<div class="data-pair" style="margin-bottom:10px"><span class="data-label">CPV</span><span class="data-value">Calle del Mar 12, Valencia</span></div>' + '<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--line-2);border-radius:var(--radius-md);font-size:13px;color:var(--ink-2);margin-bottom:4px"><iconify-icon icon="iconoir:search" width="15" style="color:var(--muted)"></iconify-icon>No se encontró ningún registro coincidente en Google Maps.</div>' + '<div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-ghost btn-sm">Marcar como no encontrado</button><button class="btn btn-subtle btn-sm">Buscar manualmente</button></div></div>')) + /* ── No encontrado ── */
    block('No encontrado', 'óptica marcada previamente como no encontrada', stage('', '<div class="card" style="margin:0;max-width:420px;opacity:.85">' + '<div class="card-head"><div><div class="eyebrow-t">No encontrado</div><h3 class="display-md" style="margin-top:4px">Óptica del Puerto</h3></div><span class="pill pill-neg"><span class="pill-dot"></span>No encontrada</span></div>' + '<div class="data-pair" style="margin-bottom:10px"><span class="data-label">CPV</span><span class="data-value">Muelle 3, Cádiz</span></div>' + '<div class="override-meta" style="margin-bottom:4px">Marcada por Ana S. · hace 5 días</div>' + '<div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-subtle btn-sm">Reabrir revisión</button><button class="btn btn-ghost btn-sm">Buscar manualmente</button></div></div>')) + /* ── Bandeja vacía ── */
    block('Bandeja vacía', 'todos los pendientes procesados — sin contador', stage('', '<div class="card" style="margin:0"><div class="empty-state" style="min-height:200px"><iconify-icon class="empty-state-icon" icon="iconoir:check-circle" width="32" style="color:var(--pos-ink)"></iconify-icon><h2 class="state-title">¡Todo revisado!</h2><p class="state-body">No quedan conflictos pendientes en la bandeja. Buen trabajo.</p></div></div>', true));
  }
  function candRow(name, addr, score, sel) {
    return '<label class="radio-wrap" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid ' + (sel ? 'var(--accent)' : 'var(--line-2)') + ';border-radius:var(--radius-md);background:' + (sel ? 'var(--accent-soft)' : 'var(--card)') + ';cursor:default">' + '<input class="radio" type="radio" name="sg-cand"' + (sel ? ' checked' : '') + '>' + '<div style="flex:1"><div class="body-sm" style="font-weight:600">' + enc(name) + '</div><div class="body-xs c-muted">' + enc(addr) + '</div></div>' + '<span class="pill ' + (parseFloat(score) >= 0.85 ? 'pill-pos' : 'pill-neutral') + ' pill-sm">' + enc(score) + '</span></label>';
  }
  function revisionPreview() {
    return '<div class="card card-accent" style="margin:0;width:200px;padding:14px"><div class="eyebrow-t">Conflicto</div><div class="display-md" style="font-size:15px;margin-top:4px">Óptica Central</div><span class="pill pill-warn pill-sm" style="margin-top:8px"><span class="pill-dot"></span>Revisar</span></div>';
  }

  /* ── CHANGELOG ───────────────────────────────────────────── */
  function changelogRow(type, ultra) {
    var map = {
      override: ['edit-pencil', 'Override', 'pill-accent', 'Teléfono corregido'],
      sync: ['refresh-double', 'Sync', 'pill-neutral', 'Sincronización Outscraper'],
      vinculo: ['network-left', 'Vínculo', 'pill-pos', 'Óptica vinculada a CPV']
    };
    var m = map[type];
    return '<tr><td class="mono-sm c-muted">14:0' + (type === 'sync' ? '2' : type === 'override' ? '7' : '9') + '</td>' + '<td><span class="pill ' + m[2] + ' pill-sm"><iconify-icon icon="iconoir:' + m[0] + '" width="10"></iconify-icon>' + m[1] + '</span></td>' + '<td>' + m[3] + '</td><td class="c-muted">Ana S.</td></tr>';
  }
  function changelogDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Fila tipo override', 'corrección manual'], ['Fila tipo sync', 'sincronización automática'], ['Fila tipo vínculo', 'óptica vinculada a CPV'], ['Con filtro de óptica activo', 'chip de filtro visible']]), true)) + block('Tabla ultra (32px) con tipos', '', stage('', '<div style="display:flex;gap:8px;margin-bottom:12px"><span style="display:inline-flex;align-items:center;gap:4px;padding:4px 8px 4px 12px;background:var(--accent-soft);color:var(--accent-ink-deep);border-radius:var(--radius-full);font-size:12px;font-weight:500;border:1px solid rgba(197,232,23,.4)">Óptica San Carlos<iconify-icon icon="iconoir:xmark" width="12"></iconify-icon></span></div>' + '<div class="table-wrap"><table class="table-dense table-ultra"><thead><tr><th style="width:70px">Hora</th><th style="width:110px">Tipo</th><th>Detalle</th><th style="width:90px">Usuario</th></tr></thead><tbody>' + changelogRow('override') + changelogRow('sync') + changelogRow('vinculo') + '</tbody></table></div>', true));
  }
  function changelogPreview() {
    return '<div style="width:220px;display:flex;flex-direction:column;gap:8px"><span class="pill pill-accent pill-sm"><iconify-icon icon="iconoir:edit-pencil" width="10"></iconify-icon>Override</span><span class="pill pill-neutral pill-sm"><iconify-icon icon="iconoir:refresh-double" width="10"></iconify-icon>Sync</span><span class="pill pill-pos pill-sm"><iconify-icon icon="iconoir:network-left" width="10"></iconify-icon>Vínculo</span></div>';
  }

  /* ── USUARIOS (A1) ───────────────────────────────────────── */
  function userRow(role, active) {
    return '<tr><td>' + (role === 'admin' ? 'Ana Soto' : 'Luis Vega') + '</td>' + '<td class="c-muted">' + (role === 'admin' ? 'ana@coopervision.es' : 'luis@coopervision.es') + '</td>' + '<td>' + (role === 'admin' ? '<span class="pill pill-accent pill-sm">Admin</span>' : '<span class="pill pill-neutral pill-sm">User</span>') + '</td>' + '<td>' + (active ? '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Activo</span>' : '<span class="pill pill-paused pill-sm"><span class="pill-dot"></span>Inactivo</span>') + '</td></tr>';
  }
  function usuariosDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Fila usuario activo · admin', ''], ['Fila usuario activo · user', ''], ['Fila usuario inactivo', '']]), true)) + block('Tabla de usuarios', 'rol × estado', stage('', '<div class="table-wrap"><table class="table-dense"><thead><tr><th>Nombre</th><th>Email</th><th style="width:90px">Rol</th><th style="width:100px">Estado</th></tr></thead><tbody>' + userRow('admin', true) + userRow('user', true) + userRow('user', false) + '</tbody></table></div>', true)) + block('Menú contextual de fila', 'el label de la 4ª opción es dinámico según el estado del usuario', '<div class="sg-cols">' + stage('Usuario activo → "Desactivar"', '<div style="padding:8px 0">' + usrMenu(true) + '</div>') + stage('Usuario inactivo → "Reactivar"', '<div style="padding:8px 0">' + usrMenu(false) + '</div>') + '</div>') + block('Modal "Nuevo usuario"', 'nombre · email · selector de rol (radio) · aviso de email con contraseña temporal', stage('', '<div style="max-width:440px">' + usrNewModal() + '</div>'));
  }
  function usrMenu(activo) {
    return '<div class="cpv-row-menu open" style="position:static;display:inline-block;min-width:208px;opacity:1;pointer-events:auto;transform:none;box-shadow:var(--shadow-e2)">' + '<button class="dropdown-item"><iconify-icon icon="iconoir:edit-pencil" width="16"></iconify-icon>Editar</button>' + '<button class="dropdown-item"><iconify-icon icon="iconoir:user-badge-check" width="16"></iconify-icon>Cambiar rol</button>' + '<button class="dropdown-item"><iconify-icon icon="iconoir:lock" width="16"></iconify-icon>Resetear contraseña</button>' + '<button class="dropdown-item"><iconify-icon icon="iconoir:' + (activo ? 'user-xmark' : 'user') + '" width="16"></iconify-icon>' + (activo ? 'Desactivar' : 'Reactivar') + '</button>' + '<div class="dropdown-divider"></div>' + '<button class="dropdown-item danger"><iconify-icon icon="iconoir:trash" width="16"></iconify-icon>Eliminar</button></div>';
  }
  function usrNewModal() {
    return '<div class="modal" style="box-shadow:none;max-width:none;margin:0">' + '<div class="modal-header"><h2 class="modal-title">Nuevo usuario</h2><button class="btn-icon btn-lg" style="cursor:default"><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="form-group"><label class="form-label">Nombre completo</label><input class="input" type="text" placeholder="Nombre Apellido"></div>' + '<div class="form-group"><label class="form-label">Email</label><input class="input" type="email" placeholder="nombre@coopervision.es"></div>' + '<div class="form-group"><label class="form-label">Rol</label><div style="display:flex;flex-direction:column;gap:var(--space-3);margin-top:4px">' + '<label class="radio-wrap"><input class="radio" type="radio" name="sg-newrol" checked><span class="toggle-text">Usuario — solo lectura</span></label>' + '<label class="radio-wrap"><input class="radio" type="radio" name="sg-newrol"><span class="toggle-text">Administrador — acceso total</span></label>' + '</div></div>' + '<p class="form-hint" style="display:flex;align-items:center;gap:5px;margin:0"><iconify-icon icon="iconoir:mail" width="13" style="color:var(--muted)"></iconify-icon>Se enviará un email con contraseña temporal.</p>' + '</div>' + '<div class="modal-footer"><button class="btn btn-ghost btn-sm">Cancelar</button><button class="btn btn-primary btn-sm"><iconify-icon icon="iconoir:check" width="14"></iconify-icon>Crear usuario</button></div></div>';
  }
  function usuariosPreview() {
    return '<div style="width:220px;display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between"><span class="body-sm">Ana Soto</span><span class="pill pill-accent pill-sm">Admin</span></div><div style="display:flex;justify-content:space-between"><span class="body-sm">Luis Vega</span><span class="pill pill-paused pill-sm">Inactivo</span></div></div>';
  }

  /* ── OPERACIONES (A2) ────────────────────────────────────── */
  function opsCard(title, src, opts) {
    opts = opts || {};
    var pill = opts.estado === 'curso' ? '<span class="pill pill-warn pill-sm"><span class="pill-dot"></span>En curso</span>' : opts.estado === 'error' ? '<span class="pill pill-neg pill-sm"><span class="pill-dot"></span>Error</span>' : '<span class="pill pill-pos pill-sm"><span class="pill-dot"></span>Completada</span>';
    var head = '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">' + '<div><div style="font-family:var(--font-display);font-size:15px;font-weight:700">' + enc(title) + '</div>' + '<div style="font-size:11px;color:var(--muted);margin-top:2px;display:flex;align-items:center;gap:5px"><iconify-icon icon="iconoir:arrow-right" width="11"></iconify-icon><code style="font-family:var(--font-mono);background:var(--line-2);padding:1px 6px;border-radius:var(--radius-sm)">' + enc(src) + '</code></div></div>' + '<span>' + pill + '</span></div>';
    var stats = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">' + '<div class="data-pair"><span class="data-label">Última sync</span><span class="data-value tnum">12/06 02:14</span></div>' + '<div class="data-pair"><span class="data-label">Duración</span><span class="data-value">2h 41min</span></div>' + '<div class="data-pair" style="grid-column:span 2"><span class="data-label">Cambios</span><span class="data-value" style="display:flex;gap:10px;flex-wrap:wrap"><span style="color:var(--pos-ink);font-weight:600">+127 nuevos</span><span style="color:var(--warn-ink);font-weight:600">⚠ 23 conflictos</span></span></div></div>';
    var foot;
    if (opts.estado === 'curso') {
      foot = '<div style="display:flex;align-items:center;gap:12px;padding:4px 0"><span class="cpv-spin-icon" style="color:var(--warn-ink);font-size:0"><iconify-icon icon="iconoir:refresh-double" width="24"></iconify-icon></span><div><div style="font-weight:600;font-size:13px">Sincronización en curso…</div><div class="body-xs c-muted">Puede tardar entre 30 min y varias horas.</div></div></div>' + '<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center" disabled><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>En curso…</button>';
    } else if (opts.estado === 'completado') {
      foot = '<div style="background:var(--warn-bg);color:var(--warn-ink);border-radius:var(--radius-md);padding:10px 12px;font-size:12px;display:flex;align-items:center;gap:8px"><iconify-icon icon="iconoir:warning-triangle" width="14"></iconify-icon><span>23 conflictos detectados — <b>Revisar en A3 →</b></span></div>' + '<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Sincronizar ahora</button>';
    } else if (opts.estado === 'error') {
      foot = '<div style="background:var(--neg-soft);color:var(--neg-ink);border-radius:var(--radius-md);padding:10px 12px;font-size:12px;display:flex;align-items:flex-start;gap:8px"><iconify-icon icon="iconoir:warning-triangle" width="14" style="margin-top:1px;flex-shrink:0"></iconify-icon><span><b>Error en la sincronización.</b> No se pudo conectar con la fuente. Los datos no se actualizaron.</span></div>' + '<button class="btn btn-primary btn-sm" style="width:100%;justify-content:center"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar sincronización</button>';
    } else {
      foot = '<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Sincronizar ahora</button>';
    }
    return '<div class="card" style="margin:0;display:flex;flex-direction:column;gap:var(--space-4)">' + head + stats + foot + '</div>';
  }
  function opsBanner() {
    return '<div style="display:flex;align-items:center;gap:14px;padding:10px 20px;background:var(--warn-bg);color:var(--warn-ink);border:1px solid rgba(146,64,14,.18);border-radius:var(--radius-lg);font-size:13px;font-weight:500">' + '<span class="cpv-spin-icon" style="font-size:0"><iconify-icon icon="iconoir:refresh-double" width="16"></iconify-icon></span>' + '<span><b>Sincronización en curso.</b> Los datos pueden no estar actualizados hasta que finalice.</span></div>';
  }
  function opsConfirmModal() {
    return '<div class="modal" style="box-shadow:none;max-width:none;margin:0">' + '<div class="modal-header"><h2 class="modal-title">¿Lanzar sincronización manual?</h2><button class="btn-icon btn-lg" style="cursor:default"><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<p class="modal-body" style="margin:0">La sincronización con <b>Outscraper / Google Maps</b> se iniciará ahora. Puede tardar entre 30 min y varias horas. Los datos pueden no estar actualizados durante este período.</p>' + '<div class="modal-footer"><button class="btn btn-ghost btn-sm">Cancelar</button><button class="btn btn-primary btn-sm"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Iniciar sincronización</button></div></div>';
  }
  function opsDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Estado idle', 'cards de fuente con última sync + botón "Sincronizar ahora"'], ['Estado en curso', 'banner persistente + pill "En curso" + spinner, sin botón'], ['Estado completado', 'resumen de resultados + aviso con link a A3 si hay conflictos'], ['Estado error', 'pill rojo + aviso de error + botón "Reintentar"'], ['Modal de confirmación', 'título fijo, cuerpo según fuente, botón primary (no destructive)']]), true)) + block('Estado idle', 'dos cards de fuente de datos', stage('', '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5)">' + opsCard('Outscraper / Google Maps', 'opticas_google', {}) + opsCard('Salesforce / CooperVision', 'opticas_cpv', {}) + '</div>')) + block('Estado en curso', 'banner arriba + card de la fuente sincronizando', stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' + opsBanner() + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5)">' + opsCard('Outscraper / Google Maps', 'opticas_google', {
      estado: 'curso'
    }) + opsCard('Salesforce / CooperVision', 'opticas_cpv', {}) + '</div></div>')) + block('Estado completado', 'resumen + aviso con link a Revisión', stage('', '<div style="max-width:420px">' + opsCard('Outscraper / Google Maps', 'opticas_google', {
      estado: 'completado'
    }) + '</div>')) + block('Estado error', 'la sync falló — pill rojo, aviso de error y acción de reintentar', stage('', '<div style="max-width:420px">' + opsCard('Outscraper / Google Maps', 'opticas_google', {
      estado: 'error'
    }) + '</div>')) + block('Modal de confirmación', 'no destructive — el botón de acción es primary', stage('', '<div style="max-width:440px">' + opsConfirmModal() + '</div>'));
  }
  function opsPreview() {
    return '<div style="width:220px">' + opsCard('Outscraper', 'opticas_google', {
      estado: 'curso'
    }) + '</div>';
  }

  /* ── CADENAS (A4) ────────────────────────────────────────── */
  function cadFilterTabs() {
    return '<div class="cpv-filter-tabs"><button class="cpv-filter-tab active">Todas <span class="cpv-filter-tab-count">42</span></button><button class="cpv-filter-tab">España <span class="cpv-filter-tab-count">34</span></button><button class="cpv-filter-tab">Portugal <span class="cpv-filter-tab-count">8</span></button></div>';
  }
  function cadTable() {
    var rows = [['Visionlab', 'visionlab, vision lab', 'ES'], ['Multiópticas', 'multiopticas', 'ES'], ['Alain Afflelou', 'afflelou', 'PT']];
    var body = rows.map(function (r) {
      return '<tr><td style="font-weight:600">' + enc(r[0]) + '</td><td class="body-xs c-ink2">' + enc(r[1]) + '</td><td>' + (r[2] === 'ES' ? '<span class="pill pill-accent pill-sm">ES</span>' : '<span class="pill pill-neutral pill-sm">PT</span>') + '</td><td class="cpv-bbdd-menu-col"><button class="cpv-bbdd-menu-btn"><iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button></td></tr>';
    }).join('');
    return '<div class="table-wrap"><table class="table-dense"><thead><tr><th style="width:180px">Nombre</th><th>Keywords</th><th style="width:70px">País</th><th class="cpv-bbdd-menu-col"></th></tr></thead><tbody>' + body + '</tbody></table></div>';
  }
  function cadDelModal() {
    return '<div class="modal" style="box-shadow:none;max-width:none;margin:0">' + '<div class="modal-header"><h2 class="modal-title">Eliminar cadena</h2><button class="btn-icon btn-lg" style="cursor:default"><iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' + '<div class="modal-body" style="margin:0">¿Eliminar la cadena <b>Visionlab</b>?<br><span class="body-sm c-muted" style="display:block;margin-top:6px">Hay <b>214 ópticas</b> asociadas. Elige qué hacer con ellas.</span></div>' + '<div class="modal-footer"><button class="btn btn-ghost btn-sm">Cancelar</button>' + '<button class="btn btn-subtle btn-sm" style="margin-right:auto">Convertir en independientes</button>' + '<button class="btn btn-destructive btn-sm"><iconify-icon icon="iconoir:trash" width="14"></iconify-icon>Eliminar también las ópticas</button></div></div>';
  }
  function cadDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Filtro de país', 'tabs Todas / España / Portugal con contador'], ['Tabla', 'nombre · keywords · país (ES/PT) · columna de acciones ⋯'], ['Modal de edición', 'formulario nombre / keywords / dominios / país'], ['Modal de eliminación', 'bifurcación única — independientes vs eliminar ópticas']]), true)) + block('Barra de filtros + tabla', '', stage('', cadFilterTabs() + '<div style="height:12px"></div>' + cadTable(), true)) + block('Modal de eliminación', 'la bifurcación de ópticas asociadas es única en el producto', stage('', '<div style="max-width:520px">' + cadDelModal() + '</div>'));
  }
  function cadPreview() {
    return '<div style="width:220px">' + cadFilterTabs() + '</div>';
  }

  /* ── LOGS (A5) ───────────────────────────────────────────── */
  function logsFilterBar(custom) {
    var dates = custom ? '<div style="display:flex;gap:4px;align-items:center;margin-top:4px"><input type="date" class="input input-sm" style="width:120px;font-size:12px" value="2026-05-01"><span class="c-muted" style="font-size:11px">—</span><input type="date" class="input input-sm" style="width:120px;font-size:12px" value="2026-06-18"></div>' : '';
    return '<div style="display:flex;flex-wrap:wrap;gap:var(--space-4);align-items:flex-start">' + '<div style="display:flex;flex-direction:column;gap:4px"><span class="sg-mini-label" style="margin:0">Usuario</span><select class="select select-sm" style="width:150px"><option>Todos</option></select></div>' + '<div style="display:flex;flex-direction:column;gap:4px"><span class="sg-mini-label" style="margin:0">Acción</span><select class="select select-sm" style="width:150px"><option>Todas</option></select></div>' + '<div style="display:flex;flex-direction:column;gap:4px"><span class="sg-mini-label" style="margin:0">Fechas</span><select class="select select-sm" style="width:150px"><option' + (custom ? '' : ' selected') + '>Todas</option><option' + (custom ? ' selected' : '') + '>Personalizado</option></select>' + dates + '</div>' + '</div>';
  }
  var LOGS_PILLS = [['Login', 'pill-neutral'], ['Descarga CSV', 'pill-accent'], ['Override creado', 'pill-warn'], ['Override revertido', 'pill-warn'], ['Vínculo creado', 'pill-pos'], ['Nuevo usuario', 'pill-accent'], ['Reset password', 'pill-warn'], ['Sync lanzada', 'pill-pos'], ['Cadena creada', 'pill-accent'], ['Config. modificada', 'pill-warn']];
  function logsPalette() {
    return '<div style="display:flex;flex-wrap:wrap;gap:10px">' + LOGS_PILLS.map(function (p) {
      return '<span class="pill ' + p[1] + ' pill-sm">' + enc(p[0]) + '</span>';
    }).join('') + '</div>';
  }
  function logsDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Barra de filtros', 'usuario · tipo de acción · rango de fechas'], ['Selector de fechas "Personalizado"', 'revela dos campos desde/hasta — visibilidad condicional'], ['Paleta de pills de acción', 'más variantes que el componente Pill genérico']]), true)) + block('Barra de filtros', 'modo estándar (sin campos de fecha)', stage('Rango: Todas', logsFilterBar(false), true)) + block('Selector de fechas en "Personalizado"', 'aparecen dos campos desde/hasta', stage('Rango: Personalizado', logsFilterBar(true), true)) + block('Paleta de pills de tipo de acción', 'referencia rápida con el texto exacto de cada label', stage('', logsPalette()));
  }
  function logsPreview() {
    return '<div style="width:230px;display:flex;flex-wrap:wrap;gap:6px"><span class="pill pill-warn pill-sm">Override creado</span><span class="pill pill-pos pill-sm">Vínculo creado</span><span class="pill pill-accent pill-sm">Descarga CSV</span></div>';
  }

  /* ── MI PERFIL ───────────────────────────────────────────── */
  function perfilDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Datos personales', 'nombre editable · email no editable (disabled + hint)'], ['Cambio de contraseña', 'actual / nueva / confirmación con validación'], ['Estado de éxito', 'toast + campos de contraseña vuelven a vacío']]), true)) + block('Datos personales', 'el email es de solo lectura', stage('', '<div style="max-width:420px;display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="form-group"><label class="form-label">Nombre completo</label><input class="input" type="text" value="Ana Soto"></div>' + '<div class="form-group"><label class="form-label">Email</label><input class="input" type="email" value="ana@coopervision.es" disabled><span class="form-hint">El email no se puede modificar desde aquí. Contacta con el administrador.</span></div>' + '<div class="form-group"><label class="form-label">Rol</label><div style="margin-top:4px;display:flex;align-items:center;gap:8px"><span class="pill pill-accent pill-sm">Admin</span><span class="body-xs c-muted">Acceso total a todas las funciones.</span></div></div>' + '<div style="display:flex;justify-content:flex-end"><button class="btn btn-primary btn-sm"><iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar cambios</button></div>' + '</div>')) + block('Cambio de contraseña', 'actual · nueva · confirmación', '<div class="sg-cols">' + stage('Reposo', '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="form-group"><label class="form-label">Contraseña actual</label><input class="input" type="password" placeholder="••••••••"></div>' + '<div class="form-group"><label class="form-label">Nueva contraseña</label><input class="input" type="password" placeholder="Mínimo 8 caracteres"></div>' + '<div class="form-group"><label class="form-label">Confirmar nueva contraseña</label><input class="input" type="password" placeholder="Repite la contraseña"></div>' + '<div style="display:flex;justify-content:flex-end"><button class="btn btn-ghost btn-sm"><iconify-icon icon="iconoir:lock" width="14"></iconify-icon>Cambiar contraseña</button></div></div>') + stage('Error de validación (no coinciden)', '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' + '<div class="form-group"><label class="form-label">Contraseña actual</label><input class="input" type="password" value="oldpass"></div>' + '<div class="form-group"><label class="form-label">Nueva contraseña</label><input class="input" type="password" value="newpass1"></div>' + '<div class="form-group"><label class="form-label">Confirmar nueva contraseña</label><input class="input error" type="password" value="newpass2"><span class="form-error">Las contraseñas no coinciden.</span></div></div>') + '</div>') + block('Estado de éxito', 'tras guardar: toast de confirmación + los campos de contraseña se vacían', stage('', '<div style="display:flex;flex-direction:column;gap:var(--space-5);max-width:420px">' + toastMini('success', 'check-circle', 'Contraseña cambiada', 'Tu contraseña se ha actualizado correctamente.') + '<div class="form-group"><label class="form-label">Nueva contraseña</label><input class="input" type="password" placeholder="Mínimo 8 caracteres"></div>' + '</div>', true));
  }
  function toastMini(type, icon, title, sub) {
    return '<div class="toast toast-' + type + '" style="position:static;margin:0;animation:none;max-width:360px"><span class="toast-icon ' + type + '"><iconify-icon icon="iconoir:' + icon + '" width="18"></iconify-icon></span><div class="toast-content"><div class="toast-title">' + enc(title) + '</div><div class="toast-body">' + enc(sub) + '</div></div></div>';
  }
  function perfilPreview() {
    return '<div style="width:220px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:10px"><div class="avatar" style="width:36px;height:36px;font-size:13px;font-weight:700">AS</div><div><div class="body-sm" style="font-weight:600">Ana Soto</div><span class="pill pill-accent pill-sm">Admin</span></div></div><div class="form-group"><input class="input input-sm" type="text" value="Ana Soto"></div></div>';
  }

  /* ── LOGIN ───────────────────────────────────────────────── */
  function loginForm(opts) {
    opts = opts || {};
    var err = opts.error ? '<div style="background:var(--neg-soft);border:1px solid rgba(190,18,60,.2);border-radius:var(--radius-md);padding:10px 14px;font-size:13px;color:var(--neg-ink);display:flex;align-items:center;gap:6px;margin-bottom:var(--space-4)"><iconify-icon icon="iconoir:warning-circle" width="14"></iconify-icon>Email o contraseña incorrectos.</div>' : '';
    var btn = opts.loading ? '<button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:var(--space-6)" disabled><iconify-icon icon="iconoir:refresh-double" width="16" style="animation:spin 1s linear infinite"></iconify-icon>Iniciando sesión…</button>' : '<button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:var(--space-6)">Iniciar sesión</button>';
    return '<div style="width:100%;max-width:320px">' + '<h2 style="font-family:var(--font-display);font-weight:700;font-size:22px;letter-spacing:-.02em;color:var(--ink);margin:0 0 var(--space-6)">Acceso interno</h2>' + err + '<div style="display:flex;flex-direction:column;gap:var(--space-4)">' + '<div class="form-group"><label class="form-label">Email</label><input class="input' + (opts.error ? ' error' : '') + '" type="email" value="' + (opts.error ? 'ana@coopervision.es' : '') + '" placeholder="nombre@coopervision.es"></div>' + '<div class="form-group"><label class="form-label">Contraseña</label><input class="input' + (opts.error ? ' error' : '') + '" type="password" value="' + (opts.error ? '••••••' : '') + '" placeholder="••••••••"><span style="display:block;text-align:right;font-size:12px;color:var(--muted);margin-top:6px">¿Olvidaste tu contraseña?</span></div>' + '</div>' + btn + '<div style="height:1px;background:var(--line-2);margin:var(--space-6) 0 var(--space-4)"></div>' + '<div style="font-size:12px;color:var(--muted)">Built by <strong style="color:var(--ink-2)">Newno</strong></div>' + '</div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>';
  }
  function loginSplit() {
    return '<div style="display:flex;width:100%;max-width:760px;min-height:360px;border:1px solid var(--line);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-e1)">' + '<div style="flex:1 1 52%;position:relative;background:var(--ink);color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:24px 28px;overflow:hidden">' + '<div style="position:absolute;inset:0;background:radial-gradient(58% 48% at 80% 36%, rgba(197,232,23,.30), rgba(197,232,23,0) 68%);pointer-events:none"></div>' + '<div style="position:relative;display:flex;align-items:center;gap:9px">' + '<span style="width:30px;height:30px;background:#fff;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;flex-shrink:0"><img src="assets/cpv-logo.png" alt="" style="width:19px;height:19px;object-fit:contain;display:block"></span>' + '<span><span style="display:block;font-family:var(--font-display);font-weight:700;font-size:12px;color:#fff">CooperVision</span>' + '<span style="display:block;font-size:10px;color:rgba(255,255,255,.52)">BBDD Ópticas Iberia</span></span>' + '</div>' + '<div style="position:relative">' + '<div style="font-family:var(--font-display);font-weight:800;font-size:32px;line-height:1;letter-spacing:-.03em">Plataforma de Ópticas Iberia<span style="color:var(--accent)">.</span></div>' + '<p style="margin:10px 0 0;font-size:12px;line-height:1.5;color:rgba(255,255,255,.6)">Acceso centralizado a la base de datos de ópticas de España y Portugal.</p>' + '</div>' + '<div style="position:relative;font-size:10px;color:rgba(255,255,255,.4)">© 2026 CooperVision Iberia. Desarrollado por Newno</div>' + '</div>' + '<div style="flex:1 1 48%;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:28px">' + loginForm({}) + '</div>' + '</div>';
  }
  function loginCard(opts) {
    return '<div class="card" style="margin:0;max-width:380px;padding:var(--space-8)">' + loginForm(opts) + '</div>';
  }
  function loginDetail() {
    return block('Variantes a documentar', '', stage('', variantList([['Split-screen', 'hero oscuro con glow de acento + panel de formulario'], ['Formulario', 'email + contraseña + botón + link "Olvidé mi contraseña" + Built by Newno'], ['Estado de error', 'credenciales incorrectas — aviso + inputs en error'], ['Estado de loading', 'botón en spinner mientras valida']]), true)) + block('Pantalla completa', 'split-screen — hero oscuro (única superficie no blanca aprobada) + formulario', stage('', loginSplit())) + '<div class="sg-cols">' + stage('Estado de error', loginCard({
      error: true
    })) + stage('Estado de loading (botón)', loginCard({
      loading: true
    })) + '</div>';
  }
  function loginPreview() {
    return '<div style="display:flex;width:210px;height:120px;border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden">' + '<div style="flex:1 1 52%;position:relative;background:var(--ink);color:#fff;padding:10px;overflow:hidden">' + '<div style="position:absolute;inset:0;background:radial-gradient(70% 55% at 80% 30%, rgba(197,232,23,.32), rgba(197,232,23,0) 70%)"></div>' + '<div style="position:relative;font-family:var(--font-display);font-weight:800;font-size:13px;line-height:1.05;letter-spacing:-.02em;margin-top:34px">Plataforma de Ópticas Iberia<span style="color:var(--accent)">.</span></div>' + '</div>' + '<div style="flex:1 1 48%;background:var(--bg);display:flex;flex-direction:column;justify-content:center;gap:6px;padding:10px">' + '<input class="input input-sm" type="text" placeholder="Email" disabled style="height:24px;font-size:10px">' + '<input class="input input-sm" type="password" placeholder="••••••" disabled style="height:24px;font-size:10px">' + '<div class="btn btn-primary" style="width:100%;justify-content:center;pointer-events:none;padding:5px 0;font-size:10px">Iniciar sesión</div>' + '</div>' + '</div>';
  }

  /* ── Registro ────────────────────────────────────────────── */
  function reg(id, title, desc, file, preview, detail) {
    SG.reg({
      id: 'pv-' + id,
      group: 'patterns',
      title: title,
      desc: desc,
      file: file,
      tag: 'Vista',
      tagIcon: 'app-window',
      preview: preview,
      detail: detail
    });
  }
  reg('resumen', 'Resumen', 'KPI Partners con delta +/− / primera sync sin delta · Valoración con estrella · Reseñas compacto · empty BBDD vacía.', 'views/resumen.js', resumenPreview, resumenDetail);
  reg('bi', 'Business Intelligence', 'Anchor nav normal/sticky · cuadrante solo partners/otras/ambos · oportunidad alta vs baja.', 'views/bi.js', biPreview, biDetail);
  reg('mapa', 'Mapa', 'Sin resultados con filtros · marcador seleccionado vs no · popup sin contacto.', 'views/mapa.js', mapaPreview, mapaDetail);
  reg('bbdd', 'Base de datos', 'Fila badge Cliente + override · fila solo Google · filtros 0/3/limpiados · exportar con/sin filtros.', 'views/bbdd.js', bbddPreview, bbddDetail);
  reg('detalle', 'Detalle (Drawer V5)', 'Tab CPV no cliente (empty) · campo corregido manualmente · editable hover · Cambios sin/con overrides.', 'components/drawer-detalle.js', detallePreview, detalleDetail);
  reg('revision', 'Revisión (A3)', 'Focus card 1 candidato / múltiples · solo CPV · no encontrado · bandeja vacía.', 'views/admin-revision.js', revisionPreview, revisionDetail);
  reg('changelog', 'Changelog', 'Fila override / sync / vínculo · con filtro de óptica activo (chip).', 'views/changelog.js', changelogPreview, changelogDetail);
  reg('usuarios', 'Usuarios (A1)', 'Fila usuario activo admin / activo user / inactivo.', 'views/admin-usuarios.js', usuariosPreview, usuariosDetail);
  reg('operaciones', 'Operaciones (A2)', 'Estado idle / en curso / completado · cards de fuente · modal de confirmación (primary, no destructive).', 'views/admin-operaciones.js', opsPreview, opsDetail);
  reg('cadenas', 'Cadenas (A4)', 'Filtro ES/PT · tabla con ⋯ · modal de edición · modal de eliminación con bifurcación de ópticas.', 'views/admin-cadenas.js', cadPreview, cadDetail);
  reg('logs', 'Logs de actividad (A5)', 'Filtros usuario/acción/fechas · fechas "Personalizado" condicional · paleta completa de pills de acción.', 'views/admin-logs.js', logsPreview, logsDetail);
  reg('perfil', 'Mi perfil', 'Datos personales (email no editable) · cambio de contraseña con validación · estado de éxito.', 'views/perfil.js', perfilPreview, perfilDetail);
  reg('login', 'Login', 'Formulario email + contraseña + "olvidé contraseña" · estado de error · loading del botón.', 'views/login.html', loginPreview, loginDetail);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/sg-patterns.js", error: String((e && e.message) || e) }); }

// coopervision/views/styleguide.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/styleguide.js  ·  Catálogo "Componentes"
   ───────────────────────────────────────────────────────────────
   Orquestador del catálogo. Define utilidades compartidas en
   window.cpvSG y registra la vista /styleguide:
     · galería de cards (Fundamentos / Componentes / Pattern by View)
     · vista de detalle por entrada  (#/styleguide?c=<id>)
   Las entradas se registran desde sg-foundations / sg-components /
   sg-patterns vía cpvSG.reg({...}).
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Namespace + utilidades compartidas ─────────────────────── */
  var SG = window.cpvSG = window.cpvSG || {};
  SG.list = SG.list || [];
  function enc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  SG.enc = enc;

  /* reg({ id, group, cat, title, desc, file, preview, detail }) */
  SG.reg = function (entry) {
    SG.list.push(entry);
  };

  /* ── Helpers de maquetación para las vistas de detalle ──────── */
  // Panel con etiqueta superior que enmarca un demo en vivo.
  SG.stage = function (label, bodyHTML, tight) {
    return '<div class="sg-stage">' + (label ? '<div class="sg-stage-label">' + enc(label) + '</div>' : '') + '<div class="sg-stage-body' + (tight ? ' is-tight' : '') + '">' + bodyHTML + '</div>' + '</div>';
  };
  // Bloque temático dentro del detalle (título + nota + contenido).
  SG.block = function (title, note, html) {
    return '<div class="sg-block">' + '<div class="sg-block-head">' + '<span class="sg-block-title">' + enc(title) + '</span>' + (note ? '<span class="sg-block-note">' + enc(note) + '</span>' : '') + '</div>' + html + '</div>';
  };
  // Muestra etiquetada (caption monoespaciada debajo del componente).
  SG.sample = function (cap, html) {
    return '<div class="sg-sample">' + html + (cap ? '<span class="sg-sample-cap">' + enc(cap) + '</span>' : '') + '</div>';
  };
  SG.samples = function (arr) {
    return '<div class="sg-samples">' + arr.join('') + '</div>';
  };
  // Tabla de especificación (filas [token, valor, uso]).
  SG.spec = function (head, rows) {
    return '<table class="sg-spec"><thead><tr>' + head.map(function (h) {
      return '<th>' + enc(h) + '</th>';
    }).join('') + '</tr></thead><tbody>' + rows.map(function (r) {
      return '<tr>' + r.map(function (c) {
        return '<td>' + c + '</td>';
      }).join('') + '</tr>';
    }).join('') + '</tbody></table>';
  };

  /* ════ Metadatos de secciones / categorías ════════════════════ */
  var GROUPS = [{
    key: 'fundamentos',
    title: 'Fundamentos',
    sub: 'tokens hechos visibles — color, tipografía, espaciado, iconos, elevación'
  }, {
    key: 'componentes',
    title: 'Componentes',
    sub: 'cada componente con todas sus variantes funcionales'
  }, {
    key: 'patterns',
    title: 'Pattern by View',
    sub: 'componentes del catálogo usados en contexto de vista'
  }];
  var CAT_ORDER = ['Acciones', 'Feedback y estado', 'Formularios', 'Contenedores', 'Navegación', 'Datos y visualización', 'Marcadores y mapa'];
  function byId(id) {
    for (var i = 0; i < SG.list.length; i++) if (SG.list[i].id === id) return SG.list[i];
    return null;
  }

  /* ════ CARD de la galería ═════════════════════════════════════ */
  function cardHTML(e) {
    var preview = '';
    try {
      preview = e.preview ? e.preview() : '';
    } catch (err) {
      preview = '';
    }
    var terms = [e.title, e.desc, e.cat, e.tag, e.file].filter(Boolean).join(' ').toLowerCase();
    return '<a class="sg-card" data-sg-search="' + enc(terms) + '" href="#/styleguide?c=' + enc(e.id) + '">' + '<div class="sg-card-preview"><div class="sg-card-preview-inner">' + preview + '</div>' + '<span class="sg-open"><iconify-icon icon="iconoir:expand" width="13"></iconify-icon>Abrir</span>' + '</div>' + '<div class="sg-card-body">' + '<div class="sg-card-title">' + enc(e.title) + '</div>' + '<div class="sg-card-desc">' + enc(e.desc) + '</div>' + '<div class="sg-card-foot">' + '<span class="sg-card-tag"><iconify-icon icon="iconoir:' + enc(e.tagIcon || 'page') + '" width="13"></iconify-icon>' + enc(e.tag || 'Spec') + '</span>' + '<span class="sg-card-file">' + enc(e.file || '') + '</span>' + '</div>' + '</div>' + '</a>';
  }
  function sectionHead(g) {
    return '<div class="sg-section-head">' + '<span class="sg-section-title">' + enc(g.title) + '</span>' + '<span class="sg-section-sub">' + enc(g.sub) + '</span>' + '<span class="sg-section-rule"></span>' + '</div>';
  }
  function renderGallery() {
    var html = '<div class="page-header"><div class="page-header-left">' + '<h1 class="page-title">Componentes</h1>' + '<p class="page-subtitle">Catálogo del sistema de diseño · CooperVision Iberia · ' + SG.list.length + ' entradas</p>' + '</div></div>' + '<div class="sg-searchbar">' + '<div class="sg-search-wrap">' + '<iconify-icon class="sg-search-icon" icon="iconoir:search" width="17"></iconify-icon>' + '<input class="sg-search-input" type="text" id="sg-search" placeholder="Buscar componente, token o vista…" autocomplete="off">' + '<button class="sg-search-clear" id="sg-search-clear" aria-label="Limpiar" hidden><iconify-icon icon="iconoir:xmark" width="15"></iconify-icon></button>' + '</div>' + '<span class="sg-search-count" id="sg-search-count"></span>' + '</div>' + '<div class="sg-wrap">' + '<div class="sg-noresults" id="sg-noresults" hidden><iconify-icon icon="iconoir:search" width="28"></iconify-icon><span>Sin coincidencias</span></div>';
    GROUPS.forEach(function (g) {
      var items = SG.list.filter(function (e) {
        return e.group === g.key;
      });
      if (!items.length) return;
      html += '<section class="sg-section">' + sectionHead(g);
      if (g.key === 'componentes') {
        // Agrupar por categoría
        var cats = CAT_ORDER.filter(function (c) {
          return items.some(function (e) {
            return e.cat === c;
          });
        });
        cats.forEach(function (cat) {
          var sub = items.filter(function (e) {
            return e.cat === cat;
          });
          html += '<div class="sg-catbar">' + '<span class="sg-cat-label">' + enc(cat) + '</span>' + '<span class="sg-cat-rule"></span>' + '<span class="sg-cat-count">' + sub.length + '</span>' + '</div>' + '<div class="sg-grid">' + sub.map(cardHTML).join('') + '</div>';
        });
      } else {
        html += '<div class="sg-grid">' + items.map(cardHTML).join('') + '</div>';
      }
      html += '</section>';
    });
    return html + '</div>';
  }

  /* ════ Vista de DETALLE ═══════════════════════════════════════ */
  function groupLabel(key) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].key === key) return GROUPS[i].title;
    return key;
  }
  function renderDetail(e) {
    var crumb = groupLabel(e.group) + (e.cat ? ' · <b>' + enc(e.cat) + '</b>' : '');
    var body = '';
    try {
      body = e.detail ? e.detail() : '<p class="body-sm c-muted">Sin contenido.</p>';
    } catch (err) {
      body = '<p class="body-sm c-neg">Error al renderizar el detalle.</p>';
    }
    return '<div class="sg-detail">' + '<a class="sg-back" href="#/styleguide"><iconify-icon icon="iconoir:nav-arrow-left" width="15"></iconify-icon>Componentes</a>' + '<div class="sg-detail-head">' + '<div class="sg-detail-eyebrow">' + crumb + '</div>' + '<h1 class="sg-detail-title">' + enc(e.title) + '</h1>' + '<p class="sg-detail-desc">' + enc(e.descLong || e.desc) + '</p>' + (e.file ? '<span class="sg-detail-file"><iconify-icon icon="iconoir:code" width="13"></iconify-icon>' + enc(e.file) + '</span>' : '') + '</div>' + body + '</div>';
  }

  /* ════ Detección de sub-ruta (?c=<id>) ════════════════════════ */
  function detailId() {
    var h = (location.hash || '').replace(/^#/, '');
    var i = h.indexOf('?');
    if (i < 0) return null;
    var q = h.slice(i + 1).split('&');
    for (var k = 0; k < q.length; k++) {
      var p = q[k].split('=');
      if (p[0] === 'c') return decodeURIComponent(p[1] || '');
    }
    return null;
  }

  /* ════ Estados loading / empty / error (solo galería) ═════════ */
  function renderLoading() {
    var cards = '';
    for (var i = 0; i < 6; i++) {
      cards += '<div class="sg-card"><div class="sg-card-preview">' + '<span class="skeleton" style="width:70%;height:64px"></span></div>' + '<div class="sg-card-body">' + '<span class="skeleton sk-text-sm" style="width:50%;margin-bottom:8px"></span>' + '<span class="skeleton sk-text-sm" style="width:90%"></span>' + '</div></div>';
    }
    return '<div class="page-header"><div class="page-header-left">' + '<span class="skeleton sk-text-sm" style="width:120px;display:block;margin-bottom:8px"></span>' + '<span class="skeleton" style="width:240px;height:30px;display:block"></span>' + '</div></div><div class="sg-wrap"><div class="sg-grid">' + cards + '</div></div>';
  }
  function renderEmpty() {
    return '<div class="card view-stub"><div class="empty-state">' + '<iconify-icon class="empty-state-icon" icon="iconoir:view-grid" width="32"></iconify-icon>' + '<h2 class="state-title">Catálogo vacío</h2>' + '<p class="state-body">No hay componentes registrados todavía.</p>' + '</div></div>';
  }
  function renderError() {
    return '<div class="card view-stub"><div class="error-state">' + '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' + '<h2 class="state-title">Error al cargar el catálogo</h2>' + '<button class="btn btn-primary btn-sm" data-action="retry">' + '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' + '</div></div>';
  }

  /* ════ MOUNTED — interacciones genéricas del detalle ═════════ */
  function mounted(root, state) {
    if (state !== 'default') return;

    /* ── Buscador de la galería (sticky) ── */
    var search = root.querySelector('#sg-search');
    if (search) {
      var clearBtn = root.querySelector('#sg-search-clear');
      var countEl = root.querySelector('#sg-search-count');
      var noResults = root.querySelector('#sg-noresults');
      var cards = [].slice.call(root.querySelectorAll('.sg-card[data-sg-search]'));
      var sections = [].slice.call(root.querySelectorAll('.sg-section'));
      var applyFilter = function () {
        var q = search.value.trim().toLowerCase();
        clearBtn.hidden = !q;
        var shown = 0;
        cards.forEach(function (c) {
          var match = !q || c.getAttribute('data-sg-search').indexOf(q) !== -1;
          c.style.display = match ? '' : 'none';
          if (match) shown++;
        });
        // Ocultar secciones / categorías sin tarjetas visibles
        sections.forEach(function (sec) {
          var any = sec.querySelectorAll('.sg-card:not([style*="display: none"])').length > 0;
          sec.style.display = any ? '' : 'none';
        });
        root.querySelectorAll('.sg-catbar').forEach(function (bar) {
          var grid = bar.nextElementSibling;
          var any = grid && grid.querySelectorAll('.sg-card:not([style*="display: none"])').length > 0;
          bar.style.display = any ? '' : 'none';
          if (grid) grid.style.display = any ? '' : 'none';
        });
        noResults.hidden = shown !== 0;
        countEl.textContent = q ? shown + ' de ' + cards.length : '';
      };
      search.addEventListener('input', applyFilter);
      clearBtn.addEventListener('click', function () {
        search.value = '';
        applyFilter();
        search.focus();
      });
      search.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape') {
          search.value = '';
          applyFilter();
        }
      });
    }

    /* Modal demo */
    root.querySelectorAll('[data-sg-modal-open]').forEach(function (btn) {
      var modal = root.querySelector('#' + btn.getAttribute('data-sg-modal-open'));
      if (!modal) return;
      btn.addEventListener('click', function () {
        modal.style.display = 'flex';
      });
      modal.querySelectorAll('[data-sg-modal-close]').forEach(function (b) {
        b.addEventListener('click', function () {
          modal.style.display = 'none';
        });
      });
      modal.addEventListener('click', function (ev) {
        if (ev.target === modal) modal.style.display = 'none';
      });
    });

    /* Drawer demo */
    root.querySelectorAll('[data-sg-drawer-open]').forEach(function (btn) {
      var dr = root.querySelector('#' + btn.getAttribute('data-sg-drawer-open'));
      if (!dr) return;
      btn.addEventListener('click', function () {
        dr.style.display = 'block';
      });
      dr.querySelectorAll('[data-sg-drawer-close]').forEach(function (b) {
        b.addEventListener('click', function () {
          dr.style.display = 'none';
        });
      });
    });

    /* Tabs (genéricos por grupo data-sgtabs) */
    root.querySelectorAll('[data-sgtab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var grp = btn.getAttribute('data-sgtabs');
        var tab = btn.getAttribute('data-sgtab');
        root.querySelectorAll('[data-sgtabs="' + grp + '"]').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-sgtab') === tab);
        });
        root.querySelectorAll('[data-sgpane][data-sgtabs="' + grp + '"]').forEach(function (p) {
          p.style.display = p.getAttribute('data-sgpane') === tab ? '' : 'none';
        });
      });
    });

    /* Popover / flyout toggles */
    root.querySelectorAll('[data-sg-toggle]').forEach(function (btn) {
      var pop = root.querySelector('#' + btn.getAttribute('data-sg-toggle'));
      if (!pop) return;
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        pop.classList.toggle('open');
      });
    });
    root.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-sg-toggle]')) return;
      root.querySelectorAll('[id^="sg-pop"]').forEach(function (p) {
        if (!p.contains(ev.target)) p.classList.remove('open');
      });
    });

    /* Chips removibles */
    root.querySelectorAll('[data-chip-rm]').forEach(function (b) {
      b.addEventListener('click', function () {
        var c = b.closest('[data-chip]');
        if (c) c.remove();
      });
    });

    /* Anchor-nav activo por click */
    root.querySelectorAll('.sg-anchor-item').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        root.querySelectorAll('.sg-anchor-item').forEach(function (x) {
          x.classList.remove('active');
        });
        a.classList.add('active');
      });
    });

    /* Hook opcional por entrada */
    var e = byId(detailId());
    if (e && typeof e.mounted === 'function') {
      try {
        e.mounted(root);
      } catch (err) {}
    }
  }

  /* ════ Registro de la vista ═══════════════════════════════════ */
  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/styleguide'] = {
    render: function (state) {
      if (state === 'loading') return renderLoading();
      if (state === 'empty') return renderEmpty();
      if (state === 'error') return renderError();
      var id = detailId();
      var e = id ? byId(id) : null;
      if (e) return renderDetail(e);
      return renderGallery();
    },
    mounted: mounted
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "coopervision/views/styleguide.js", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/App.jsx
try { (() => {
/* global React, Sidebar, PageHeader, KPI, AreaChart, CampaignTable, ChannelDonut, AIInsight, CHANNEL_COLORS,
   CampaignsView, InsightsView, ChannelsView, AudiencesView, SettingsView, CAMPAIGNS_FULL */
const {
  useState
} = React;
const SAMPLE_TIMELINE = [820, 880, 760, 940, 910, 1020, 970, 1080, 1140, 1090, 1180, 1240, 1220, 1280];
const SAMPLE_COMPARE = [780, 820, 800, 860, 840, 900, 870, 910, 960, 940, 990, 1020, 1010, 1050];
const SAMPLE_ROWS = [{
  name: 'Q2 · Lead-gen senior',
  channel: 'LinkedIn',
  spend: 48210,
  roas: 5.2,
  cpl: 8.20,
  status: 'Activo'
}, {
  name: 'Awareness · Retargeting EU',
  channel: 'Meta',
  spend: 32440,
  roas: 4.1,
  cpl: 11.40,
  status: 'Activo'
}, {
  name: 'Brand · TikTok creators',
  channel: 'TikTok',
  spend: 18700,
  roas: 1.8,
  cpl: 14.90,
  status: 'Test'
}, {
  name: 'Search · Brand keywords',
  channel: 'Google',
  spend: 9120,
  roas: 6.0,
  cpl: 5.40,
  status: 'Pausado'
}, {
  name: 'Display · Prospecting',
  channel: 'Bing',
  spend: 4280,
  roas: 2.4,
  cpl: 12.10,
  status: 'Activo'
}];
const SAMPLE_CHANNELS = [{
  label: 'LinkedIn',
  value: 48210,
  color: '#0A66C2'
}, {
  label: 'Meta',
  value: 32440,
  color: '#0866FF'
}, {
  label: 'TikTok',
  value: 18700,
  color: '#282A2D'
}, {
  label: 'Google',
  value: 9120,
  color: '#4285F4'
}, {
  label: 'Bing',
  value: 4280,
  color: '#5E5E5E'
}];
const NewCampaignModal = ({
  onClose,
  onSubmit
}) => {
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('LinkedIn');
  const [budget, setBudget] = useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(15,17,20,.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: '#fff',
      borderRadius: 14,
      boxShadow: 'var(--shadow-e3)',
      width: 460,
      padding: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg4)',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, "Nueva campa\xF1a"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--fg3)',
      fontSize: 18
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      marginBottom: 18
    }
  }, "Configura tu campa\xF1a"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)',
      fontWeight: 600,
      marginBottom: 6
    }
  }, "Nombre"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    style: {
      width: '100%'
    },
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Q3 \xB7 Lead-gen \xB7 Madrid"
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)',
      fontWeight: 600,
      marginBottom: 6
    }
  }, "Canal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, Object.keys(CHANNEL_COLORS).map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    type: "button",
    onClick: () => setChannel(c),
    className: "btn",
    style: {
      padding: '7px 12px',
      fontSize: 12,
      fontWeight: 500,
      borderRadius: 8,
      background: channel === c ? 'var(--fg1)' : '#fff',
      color: channel === c ? 'var(--bg)' : 'var(--fg1)',
      border: `1px solid ${channel === c ? 'var(--fg1)' : 'var(--line)'}`
    }
  }, c)))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)',
      fontWeight: 600,
      marginBottom: 6
    }
  }, "Presupuesto diario"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    style: {
      width: '100%'
    },
    value: budget,
    onChange: e => setBudget(e.target.value),
    placeholder: "\u20AC 250,00"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost",
    onClick: onClose
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    onClick: () => {
      onSubmit({
        name: name || 'Campaña sin nombre',
        channel,
        budget
      });
    }
  }, "Crear campa\xF1a"))));
};
const Toast = ({
  msg
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    background: 'var(--fg1)',
    color: 'var(--bg)',
    padding: '10px 16px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 500,
    boxShadow: 'var(--shadow-e3)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    zIndex: 2000
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 6,
    height: 6,
    borderRadius: 99,
    background: 'var(--accent)',
    boxShadow: '0 0 0 4px var(--accent-soft)'
  }
}), msg);
const HomeView = ({
  rows,
  fireToast
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 14,
    marginBottom: 14
  }
}, /*#__PURE__*/React.createElement(KPI, {
  label: "Inversi\xF3n",
  prefix: "\u20AC",
  value: "1.28M",
  delta: 12.4,
  data: SAMPLE_TIMELINE
}), /*#__PURE__*/React.createElement(KPI, {
  label: "Conversiones",
  value: "2,184",
  delta: 8.1,
  data: [120, 140, 138, 160, 170, 182, 205, 210, 228, 240, 250, 260, 272, 284],
  accent: true
}), /*#__PURE__*/React.createElement(KPI, {
  label: "ROAS medio",
  value: "4.82",
  suffix: "\xD7",
  delta: 4.0,
  data: [3.2, 3.4, 3.5, 3.7, 3.6, 3.9, 4.0, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.82]
}), /*#__PURE__*/React.createElement(KPI, {
  label: "CPL",
  prefix: "\u20AC",
  value: "8.20",
  delta: -3.1,
  invert: true,
  data: [10.2, 9.9, 9.6, 9.4, 9.5, 9.2, 9.1, 8.9, 8.7, 8.6, 8.4, 8.3, 8.2, 8.20]
})), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1.45fr 1fr',
    gap: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  }
}, /*#__PURE__*/React.createElement(AreaChart, {
  title: "Inversi\xF3n por d\xEDa",
  data: SAMPLE_TIMELINE,
  compare: SAMPLE_COMPARE
}), /*#__PURE__*/React.createElement(CampaignTable, {
  rows: rows.slice(0, 5)
})), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  }
}, /*#__PURE__*/React.createElement(ChannelDonut, {
  data: SAMPLE_CHANNELS
}), /*#__PURE__*/React.createElement(AIInsight, {
  title: "LinkedIn Lead-gen est\xE1 infrautilizada",
  body: "Tu mejor ROAS (5.2\xD7) viene de LinkedIn pero solo recibe el 18% del presupuesto. Subir a 30% podr\xEDa aportar +\u20AC42K en pipeline este mes.",
  onApply: () => fireToast('Reasignación aplicada · revisa la simulación')
}))));
const PAGES = {
  home: {
    title: 'Resumen de campañas',
    subtitle: 'Últimos 30 días vs. periodo anterior. Datos sincronizados hace 4 min.',
    range: true,
    exp: true,
    primary: true
  },
  campaigns: {
    title: 'Campañas',
    subtitle: 'Todas las campañas de la cuenta. Filtra, ordena y compara su rendimiento.',
    range: true,
    exp: true,
    primary: false
  },
  insights: {
    title: 'Insights',
    subtitle: 'Recomendaciones generadas por IA sobre presupuesto, creatividades y audiencias.',
    range: true,
    exp: false,
    primary: false
  },
  channels: {
    title: 'Canales',
    subtitle: 'Rendimiento y estado de conexión de cada canal de adquisición.',
    range: true,
    exp: true,
    primary: false
  },
  audiences: {
    title: 'Audiencias',
    subtitle: 'Segmentos activos, calidad de match y composición demográfica.',
    range: false,
    exp: true,
    primary: false
  },
  settings: {
    title: 'Ajustes',
    subtitle: 'Workspace, integraciones, miembros del equipo y notificaciones.',
    range: false,
    exp: false,
    primary: false
  }
};
const App = () => {
  const [active, setActive] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [rows, setRows] = useState(SAMPLE_ROWS);
  const [campaigns, setCampaigns] = useState(CAMPAIGNS_FULL);
  const [range, setRange] = useState('Últimos 30 días');
  const fireToast = m => {
    setToast(m);
    setTimeout(() => setToast(null), 2400);
  };
  const handleNew = data => {
    const fresh = {
      name: data.name,
      channel: data.channel,
      spend: 0,
      conv: 0,
      roas: 0,
      cpl: 0,
      status: 'Borrador',
      trend: [50, 50, 50]
    };
    setRows([fresh, ...rows]);
    setCampaigns([fresh, ...campaigns]);
    setShowModal(false);
    fireToast(`Campaña "${data.name}" creada`);
  };
  const cfg = PAGES[active] || PAGES.home;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: active,
    onNav: setActive
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: '26px 30px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    workspace: "Acme S.L. \xB7 Workspace",
    title: cfg.title,
    subtitle: cfg.subtitle,
    range: range,
    showRange: cfg.range,
    showExport: cfg.exp,
    showPrimary: cfg.primary,
    onRangeChange: () => {
      const opts = ['Hoy', 'Últimos 7 días', 'Últimos 30 días', 'Últimos 90 días', 'YTD'];
      setRange(opts[(opts.indexOf(range) + 1) % opts.length]);
    },
    onExport: () => fireToast('Exportando CSV…'),
    onNew: () => setShowModal(true)
  }), active === 'home' && /*#__PURE__*/React.createElement(HomeView, {
    rows: rows,
    fireToast: fireToast
  }), active === 'campaigns' && /*#__PURE__*/React.createElement(CampaignsView, {
    rows: campaigns,
    onNew: () => setShowModal(true),
    fireToast: fireToast
  }), active === 'insights' && /*#__PURE__*/React.createElement(InsightsView, {
    fireToast: fireToast
  }), active === 'channels' && /*#__PURE__*/React.createElement(ChannelsView, {
    fireToast: fireToast
  }), active === 'audiences' && /*#__PURE__*/React.createElement(AudiencesView, {
    fireToast: fireToast
  }), active === 'settings' && /*#__PURE__*/React.createElement(SettingsView, {
    fireToast: fireToast
  })), showModal && /*#__PURE__*/React.createElement(NewCampaignModal, {
    onClose: () => setShowModal(false),
    onSubmit: handleNew
  }), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast
  }));
};
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Audiences.jsx
try { (() => {
/* global React, BarRow, CardHead, StatusPill, MiniSpark, Icon, ICONS, num, compact, AUDIENCES, DEMOGRAPHICS, TRENDS */

const TYPE_PILL = {
  Lookalike: {
    bg: 'rgba(10,102,194,.12)',
    fg: '#0A66C2'
  },
  Retargeting: {
    bg: 'var(--accent-soft)',
    fg: 'var(--accent-deep)'
  },
  Lista: {
    bg: 'rgba(157,109,251,.14)',
    fg: '#5B36B0'
  },
  Interés: {
    bg: 'var(--line-2)',
    fg: '#4A4C4F'
  }
};
const TypePill = ({
  type
}) => {
  const s = TYPE_PILL[type] || TYPE_PILL.Interés;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      padding: '3px 9px',
      borderRadius: 6,
      background: s.bg,
      color: s.fg,
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: '0.02em'
    }
  }, type);
};
const AudiencesView = ({
  fireToast
}) => {
  const cols = '2.4fr 1fr 1.2fr 0.9fr 0.9fr 0.9fr';
  const totalReach = AUDIENCES.reduce((s, a) => s + a.reach, 0);
  const maxAge = Math.max(...DEMOGRAPHICS.age.map(d => d.value));
  const maxGeo = Math.max(...DEMOGRAPHICS.geo.map(d => d.value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 20px',
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "h3"
  }, "Segmentos de audiencia"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      marginTop: 3
    }
  }, AUDIENCES.length, " segmentos \xB7 alcance combinado ", compact(totalReach))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    style: {
      padding: '7px 13px',
      fontSize: 12
    },
    onClick: () => fireToast?.('Nuevo segmento de audiencia')
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.plus,
    size: 13
  }), "Nuevo segmento")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: cols,
      padding: '11px 20px',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--line)',
      gap: 12,
      fontSize: 10.5,
      color: 'var(--fg3)',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Segmento"), /*#__PURE__*/React.createElement("span", null, "Tipo"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Alcance"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Match"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "ROAS"), /*#__PURE__*/React.createElement("span", null, "Estado")), AUDIENCES.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: cols,
      padding: '13px 20px',
      gap: 12,
      borderBottom: i < AUDIENCES.length - 1 ? '1px solid var(--line-2)' : 'none',
      alignItems: 'center',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, a.name), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(TypePill, {
    type: a.type
  })), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      textAlign: 'right'
    }
  }, compact(a.reach)), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      textAlign: 'right',
      color: 'var(--fg3)'
    }
  }, a.match, "%"), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      textAlign: 'right',
      color: a.roas >= 3 ? 'var(--pos-ink)' : 'var(--neg-ink)',
      fontWeight: 600
    }
  }, a.roas.toFixed(1), "\xD7"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: a.status
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(CardHead, {
    title: "Edad"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, DEMOGRAPHICS.age.map((d, i) => /*#__PURE__*/React.createElement(BarRow, {
    key: i,
    label: d.label,
    value: d.value,
    max: maxAge,
    color: "var(--fg2)"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(CardHead, {
    title: "Dispositivo"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      height: 12,
      borderRadius: 99,
      overflow: 'hidden',
      marginBottom: 16,
      marginTop: 2
    }
  }, DEMOGRAPHICS.device.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: `${d.value}%`,
      height: '100%',
      background: d.color
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, DEMOGRAPHICS.device.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 99,
      background: d.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, d.label), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      color: 'var(--fg3)',
      fontWeight: 600
    }
  }, d.value, "%"))))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(CardHead, {
    title: "Top ubicaciones"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, DEMOGRAPHICS.geo.map((d, i) => /*#__PURE__*/React.createElement(BarRow, {
    key: i,
    label: d.label,
    value: d.value,
    max: maxGeo,
    color: "var(--accent-strong)"
  }))))));
};
Object.assign(window, {
  AudiencesView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Audiences.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Campaigns.jsx
try { (() => {
/* global React, ChannelDot, StatusPill, MiniSpark, SearchInput, FilterChips, StatStrip, Icon, ICONS, eur, num, CAMPAIGNS_FULL */
const {
  useState: useCState,
  useMemo
} = React;
const CampaignsView = ({
  rows,
  onNew,
  fireToast
}) => {
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
  const avgRoas = data.reduce((s, c) => s + c.roas, 0) / data.length;
  const cols = '2.6fr 1fr 1.05fr 0.9fr 1fr 0.85fr 1fr 0.95fr';
  const Th = ({
    children,
    k,
    right
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: () => k && setSortKey(k),
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: k ? 'pointer' : 'default',
      font: 'inherit',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      justifyContent: right ? 'flex-end' : 'flex-start',
      fontSize: 10.5,
      color: sortKey === k ? 'var(--fg1)' : 'var(--fg3)',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      fontFamily: 'var(--font-ui)'
    }
  }, children, k && /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: sortKey === k ? 1 : 0.3
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.arrowDown,
    size: 10,
    stroke: 2
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatStrip, {
    items: [{
      label: 'Campañas',
      value: num(data.length)
    }, {
      label: 'Activas',
      value: num(activeCount)
    }, {
      label: 'Inversión total',
      value: eur(totalSpend)
    }, {
      label: 'Conversiones',
      value: num(totalConv)
    }, {
      label: 'ROAS medio',
      value: avgRoas.toFixed(1) + '×'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(FilterChips, {
    options: ['Todos', 'Activo', 'Test', 'Pausado', 'Borrador'],
    value: filter,
    onChange: setFilter
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: q,
    onChange: setQ,
    placeholder: "Buscar campa\xF1a o canal\u2026"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost",
    onClick: () => fireToast?.('Filtros avanzados próximamente')
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.filter,
    size: 14
  }), "Filtros"))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: cols,
      padding: '12px 20px',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--line)',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Th, {
    k: "name"
  }, "Campa\xF1a"), /*#__PURE__*/React.createElement(Th, null, "Canal"), /*#__PURE__*/React.createElement(Th, {
    k: "spend",
    right: true
  }, "Inversi\xF3n"), /*#__PURE__*/React.createElement(Th, {
    k: "conv",
    right: true
  }, "Conv."), /*#__PURE__*/React.createElement(Th, {
    k: "roas",
    right: true
  }, "ROAS"), /*#__PURE__*/React.createElement(Th, {
    k: "cpl",
    right: true
  }, "CPL"), /*#__PURE__*/React.createElement(Th, null, "Tendencia"), /*#__PURE__*/React.createElement(Th, null, "Estado")), filtered.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: cols,
      padding: '13px 20px',
      gap: 12,
      borderBottom: i < filtered.length - 1 ? '1px solid var(--line-2)' : 'none',
      alignItems: 'center',
      fontSize: 13,
      color: 'var(--fg1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontWeight: 500,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(ChannelDot, {
    name: r.channel
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, r.name)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--fg3)'
    }
  }, r.channel), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      textAlign: 'right'
    }
  }, eur(r.spend)), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      textAlign: 'right',
      color: 'var(--fg3)'
    }
  }, num(r.conv || 0)), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      textAlign: 'right',
      color: r.roas >= 3 ? 'var(--pos-ink)' : 'var(--neg-ink)',
      fontWeight: 600
    }
  }, r.roas.toFixed(1), "\xD7"), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      textAlign: 'right'
    }
  }, "\u20AC", r.cpl.toFixed(2)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(MiniSpark, {
    data: r.trend || [50, 50, 50],
    color: r.roas >= 3 ? 'var(--accent)' : 'var(--neg)',
    w: 84,
    h: 24,
    fill: false
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: r.status
  })))), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '48px 20px',
      textAlign: 'center',
      color: 'var(--fg3)',
      fontSize: 13.5
    }
  }, "No hay campa\xF1as que coincidan con \xAB", q || filter, "\xBB."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 20px',
      borderTop: '1px solid var(--line)',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)'
    }
  }, filtered.length, " de ", data.length, " campa\xF1as"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost",
    style: {
      padding: '6px 12px',
      fontSize: 12
    },
    onClick: () => fireToast?.('Exportando selección…')
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.download,
    size: 13
  }), "Exportar"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    style: {
      padding: '6px 12px',
      fontSize: 12
    },
    onClick: onNew
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.plus,
    size: 13
  }), "Nueva campa\xF1a")))));
};
Object.assign(window, {
  CampaignsView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Campaigns.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Channels.jsx
try { (() => {
/* global React, ChannelDonut, ChannelDot, MiniSpark, BarRow, CardHead, Delta, Icon, ICONS, eur, num, CHANNELS_FULL */

const STATUS_DOT = {
  Conectado: 'var(--pos)',
  Sincronizando: 'var(--warn-ink)',
  Desconectado: 'var(--gray-400)'
};
const ChannelCard = ({
  c,
  total,
  fireToast
}) => /*#__PURE__*/React.createElement("div", {
  className: "card",
  style: {
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  }
}, /*#__PURE__*/React.createElement(ChannelDot, {
  name: c.label,
  size: 28
}), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 15.5,
    letterSpacing: '-0.01em'
  }
}, c.label), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: 'var(--fg4)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    marginTop: 1
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 6,
    height: 6,
    borderRadius: 99,
    background: STATUS_DOT[c.status] || 'var(--gray-400)'
  }
}), c.status)), /*#__PURE__*/React.createElement(Delta, {
  value: c.delta
})), /*#__PURE__*/React.createElement(MiniSpark, {
  data: c.trend,
  color: c.color,
  w: 260,
  h: 40
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px 16px'
  }
}, [['Inversión', eur(c.spend)], ['Cuota', Math.round(c.spend / total * 100) + '%'], ['ROAS', c.roas.toFixed(1) + '×'], ['CPL', '€' + c.cpl.toFixed(2)]].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
  key: i
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10.5,
    color: 'var(--fg4)',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  }
}, k), /*#__PURE__*/React.createElement("div", {
  className: "tnum",
  style: {
    fontFamily: 'var(--font-display)',
    fontSize: 19,
    fontWeight: 700,
    color: i === 2 ? c.roas >= 3 ? 'var(--pos-ink)' : 'var(--neg-ink)' : 'var(--fg1)',
    marginTop: 3
  }
}, v)))), /*#__PURE__*/React.createElement("button", {
  className: "btn btn--ghost",
  style: {
    justifyContent: 'center',
    padding: '8px 12px',
    fontSize: 12.5
  },
  onClick: () => fireToast?.(`Abriendo detalle de ${c.label}…`)
}, "Ver detalle"));
const ChannelsView = ({
  fireToast
}) => {
  const total = CHANNELS_FULL.reduce((s, c) => s + c.spend, 0);
  const donutData = CHANNELS_FULL.map(c => ({
    label: c.label,
    value: c.spend,
    color: c.color
  }));
  const maxRoas = Math.max(...CHANNELS_FULL.map(c => c.roas));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.4fr',
      gap: 14,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(ChannelDonut, {
    data: donutData
  }), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(CardHead, {
    title: "ROAS por canal",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--fg4)'
      }
    }, "objetivo \u2265 3.0\xD7")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      marginTop: 4
    }
  }, [...CHANNELS_FULL].sort((a, b) => b.roas - a.roas).map((c, i) => /*#__PURE__*/React.createElement(BarRow, {
    key: i,
    label: c.label,
    value: c.roas,
    max: maxRoas,
    suffix: "\xD7",
    color: c.roas >= 3 ? c.color : 'var(--neg)'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 14,
      borderTop: '1px solid var(--line-2)',
      fontSize: 12,
      color: 'var(--fg3)',
      lineHeight: 1.5
    }
  }, "Google y LinkedIn superan ampliamente el objetivo; TikTok est\xE1 por debajo del umbral de rentabilidad."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 14
    }
  }, CHANNELS_FULL.map((c, i) => /*#__PURE__*/React.createElement(ChannelCard, {
    key: i,
    c: c,
    total: total,
    fireToast: fireToast
  }))));
};
Object.assign(window, {
  ChannelsView,
  ChannelCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Channels.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Charts.jsx
try { (() => {
/* global React */
const AreaChart = ({
  data,
  compare,
  title
}) => {
  const w = 720,
    h = 220,
    pad = {
      l: 48,
      r: 12,
      t: 16,
      b: 28
    };
  const all = [...data, ...compare];
  const max = Math.max(...all) * 1.1;
  const min = 0;
  const sx = i => pad.l + i / (data.length - 1) * (w - pad.l - pad.r);
  const sy = v => pad.t + (1 - (v - min) / (max - min)) * (h - pad.t - pad.b);
  const path = arr => arr.map((v, i) => `${i ? 'L' : 'M'}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(' ');
  const area = `${path(data)} L${sx(data.length - 1)},${h - pad.b} L${sx(0)},${h - pad.b} Z`;
  const gy = [0, 0.25, 0.5, 0.75, 1].map(t => max * (1 - t));
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "h3"
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      fontSize: 11,
      color: 'var(--fg3)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 16,
      height: 3,
      background: '#C5E818',
      borderRadius: 2,
      verticalAlign: 'middle',
      marginRight: 6
    }
  }), "Actual"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 16,
      height: 0,
      borderTop: '2px dashed #4A4C4F',
      verticalAlign: 'middle',
      marginRight: 6
    }
  }), "Periodo anterior"))), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    width: "100%",
    height: h,
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "ac-fill",
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#C5E818",
    stopOpacity: ".3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#C5E818",
    stopOpacity: "0"
  }))), gy.map((v, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("line", {
    x1: pad.l,
    x2: w - pad.r,
    y1: sy(v),
    y2: sy(v),
    stroke: "#E7EAEE",
    strokeWidth: 1,
    strokeDasharray: i === gy.length - 1 ? '' : '2 4'
  }), /*#__PURE__*/React.createElement("text", {
    x: pad.l - 6,
    y: sy(v) + 3,
    textAnchor: "end",
    fontFamily: "Inter",
    fontSize: "10",
    fill: "#A8AAAE"
  }, "\u20AC", Math.round(v / 1000), "K"))), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#ac-fill)"
  }), /*#__PURE__*/React.createElement("path", {
    d: path(data),
    stroke: "#C5E818",
    strokeWidth: 2,
    fill: "none",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: path(compare),
    stroke: "#4A4C4F",
    strokeWidth: 1.5,
    fill: "none",
    strokeDasharray: "4 4"
  })));
};
const ChannelDonut = ({
  data
}) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 56,
    sw = 16,
    cx = 70,
    cy = 70,
    C = 2 * Math.PI * r;
  let acc = 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "h3",
    style: {
      marginBottom: 12
    }
  }, "Inversi\xF3n por canal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 140,
    height: 140,
    viewBox: "0 0 140 140"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r,
    fill: "none",
    stroke: "#F1F2F2",
    strokeWidth: sw
  }), data.map((d, i) => {
    const frac = d.value / total;
    const dashOff = -C * acc;
    acc += frac;
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: cx,
      cy: cy,
      r: r,
      fill: "none",
      stroke: d.color,
      strokeWidth: sw,
      strokeDasharray: `${C * frac} ${C}`,
      strokeDashoffset: dashOff,
      transform: `rotate(-90 ${cx} ${cy})`,
      strokeLinecap: "butt"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy - 2,
    textAnchor: "middle",
    fontFamily: "Outfit",
    fontWeight: "700",
    fontSize: "22",
    fill: "#282A2D",
    letterSpacing: "-0.01em",
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, "\u20AC1.28M"), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 16,
    textAnchor: "middle",
    fontFamily: "Inter",
    fontSize: "10",
    fill: "#A8AAAE",
    letterSpacing: "0.04em",
    style: {
      textTransform: 'uppercase'
    }
  }, "TOTAL")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 12.5,
      color: 'var(--fg1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 99,
      background: d.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, d.label), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      color: 'var(--fg3)'
    }
  }, Math.round(d.value / total * 100), "%"))))));
};
const AIInsight = ({
  severity = 'opportunity',
  title,
  body,
  onApply
}) => {
  const sev = severity === 'critical' ? {
    pill: {
      bg: '#FFE4E6',
      fg: '#BE123C'
    },
    label: 'Crítico'
  } : {
    pill: {
      bg: 'rgba(197,232,24,.18)',
      fg: '#3F4E07'
    },
    label: 'Oportunidad'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 18,
      borderLeft: '3px solid var(--accent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: 'rgba(197,232,24,.18)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3F4E07'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.sparkles,
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '3px 8px',
      borderRadius: 6,
      background: sev.pill.bg,
      color: sev.pill.fg,
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: '0.02em'
    }
  }, sev.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: 'var(--fg4)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      fontWeight: 600,
      marginLeft: 'auto'
    }
  }, "IA \xB7 hace 4 min")), /*#__PURE__*/React.createElement("h3", {
    className: "h3"
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--fg3)',
      margin: '6px 0 12px',
      lineHeight: 1.5
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    style: {
      padding: '7px 12px',
      fontSize: 12
    },
    onClick: onApply
  }, "Aplicar sugerencia"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost",
    style: {
      padding: '7px 12px',
      fontSize: 12
    }
  }, "Ver an\xE1lisis")));
};
Object.assign(window, {
  AreaChart,
  ChannelDonut,
  AIInsight
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Charts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Data.jsx
try { (() => {
/* global React */
/* Datasets compartidos por las vistas del dashboard.
   Mismos canales y paleta que Table.jsx (CHANNEL_COLORS). */

// trayectorias cortas para mini-sparklines (14 puntos)
const T = {
  up: [42, 46, 44, 50, 48, 55, 53, 60, 64, 62, 70, 74, 72, 80],
  up2: [30, 34, 33, 38, 40, 44, 47, 49, 53, 56, 58, 62, 66, 70],
  flat: [50, 52, 49, 51, 50, 53, 51, 52, 50, 53, 52, 54, 53, 55],
  down: [78, 74, 76, 70, 68, 64, 62, 58, 54, 52, 48, 44, 42, 38],
  dip: [60, 64, 58, 52, 48, 44, 46, 50, 54, 52, 56, 60, 63, 66]
};
const CHANNELS_FULL = [{
  label: 'LinkedIn',
  color: '#0A66C2',
  spend: 482100,
  conv: 612,
  roas: 5.2,
  cpl: 8.20,
  delta: 14.2,
  trend: T.up,
  status: 'Conectado'
}, {
  label: 'Meta',
  color: '#0866FF',
  spend: 324400,
  conv: 884,
  roas: 4.1,
  cpl: 11.40,
  delta: 6.4,
  trend: T.up2,
  status: 'Conectado'
}, {
  label: 'TikTok',
  color: '#282A2D',
  spend: 187000,
  conv: 301,
  roas: 1.8,
  cpl: 14.90,
  delta: -8.1,
  trend: T.down,
  status: 'Sincronizando'
}, {
  label: 'Google',
  color: '#4285F4',
  spend: 91200,
  conv: 268,
  roas: 6.0,
  cpl: 5.40,
  delta: 9.7,
  trend: T.up,
  status: 'Conectado'
}, {
  label: 'Bing',
  color: '#5E5E5E',
  spend: 42800,
  conv: 74,
  roas: 2.4,
  cpl: 12.10,
  delta: 2.1,
  trend: T.flat,
  status: 'Conectado'
}];
const CAMPAIGNS_FULL = [{
  name: 'Q2 · Lead-gen senior',
  channel: 'LinkedIn',
  spend: 48210,
  conv: 312,
  roas: 5.2,
  cpl: 8.20,
  status: 'Activo',
  trend: T.up
}, {
  name: 'Awareness · Retargeting EU',
  channel: 'Meta',
  spend: 32440,
  conv: 421,
  roas: 4.1,
  cpl: 11.40,
  status: 'Activo',
  trend: T.up2
}, {
  name: 'Brand · TikTok creators',
  channel: 'TikTok',
  spend: 18700,
  conv: 198,
  roas: 1.8,
  cpl: 14.90,
  status: 'Test',
  trend: T.dip
}, {
  name: 'Search · Brand keywords',
  channel: 'Google',
  spend: 9120,
  conv: 168,
  roas: 6.0,
  cpl: 5.40,
  status: 'Pausado',
  trend: T.flat
}, {
  name: 'Display · Prospecting',
  channel: 'Bing',
  spend: 4280,
  conv: 44,
  roas: 2.4,
  cpl: 12.10,
  status: 'Activo',
  trend: T.flat
}, {
  name: 'ABM · Cuentas enterprise',
  channel: 'LinkedIn',
  spend: 27600,
  conv: 121,
  roas: 4.7,
  cpl: 9.80,
  status: 'Activo',
  trend: T.up
}, {
  name: 'Lookalike · Compradores 1%',
  channel: 'Meta',
  spend: 21300,
  conv: 356,
  roas: 3.6,
  cpl: 10.20,
  status: 'Activo',
  trend: T.up2
}, {
  name: 'Reels · Producto Q2',
  channel: 'TikTok',
  spend: 12450,
  conv: 142,
  roas: 2.1,
  cpl: 13.40,
  status: 'Test',
  trend: T.dip
}, {
  name: 'PMax · Catálogo',
  channel: 'Google',
  spend: 15800,
  conv: 233,
  roas: 5.4,
  cpl: 6.10,
  status: 'Activo',
  trend: T.up
}, {
  name: 'Webinar · Nurturing',
  channel: 'LinkedIn',
  spend: 8900,
  conv: 62,
  roas: 3.9,
  cpl: 11.90,
  status: 'Pausado',
  trend: T.down
}, {
  name: 'Stories · Black week',
  channel: 'Meta',
  spend: 6100,
  conv: 88,
  roas: 2.9,
  cpl: 12.80,
  status: 'Borrador',
  trend: T.flat
}];
const INSIGHTS = [{
  severity: 'opportunity',
  category: 'Presupuesto',
  title: 'LinkedIn Lead-gen está infrautilizada',
  body: 'Tu mejor ROAS (5.2×) viene de LinkedIn pero solo recibe el 18% del presupuesto. Subir a 30% podría aportar +€42K en pipeline este mes.',
  metric: '+€42K',
  metricLabel: 'pipeline est.'
}, {
  severity: 'critical',
  category: 'Pujas',
  title: 'TikTok creators quema presupuesto',
  body: 'ROAS de 1.8× y CPL un 38% por encima de la media. La campaña "Brand · TikTok creators" lleva 9 días por debajo del umbral de rentabilidad.',
  metric: '−€7.4K',
  metricLabel: 'pérdida 30d'
}, {
  severity: 'opportunity',
  category: 'Creatividades',
  title: '3 creatividades de Meta con fatiga',
  body: 'La frecuencia superó 4.2 y el CTR cayó un 27% en 7 días. Rotar creatividades en "Awareness · Retargeting EU" recuperaría el rendimiento inicial.',
  metric: '+19%',
  metricLabel: 'CTR potencial'
}, {
  severity: 'info',
  category: 'Audiencias',
  title: 'Solapamiento entre 2 lookalikes',
  body: 'Las audiencias "Lookalike 1%" y "Compradores 90d" comparten un 31% de usuarios, inflando el coste por puja. Excluye una en prospecting.',
  metric: '31%',
  metricLabel: 'solapamiento'
}, {
  severity: 'opportunity',
  category: 'Presupuesto',
  title: 'Google Search escala con margen',
  body: 'Search Brand mantiene ROAS 6.0× con cuota de impresiones del 62%. Hay espacio para +€6K/mes sin saturar la subasta.',
  metric: '+€6K',
  metricLabel: 'margen escala'
}];
const AUDIENCES = [{
  name: 'Lookalike · Compradores 1%',
  type: 'Lookalike',
  reach: 1240000,
  match: 92,
  roas: 3.6,
  cpl: 10.20,
  status: 'Activo'
}, {
  name: 'Retargeting · 30 días',
  type: 'Retargeting',
  reach: 186000,
  match: 98,
  roas: 5.8,
  cpl: 6.40,
  status: 'Activo'
}, {
  name: 'ABM · Cuentas enterprise',
  type: 'Lista',
  reach: 12400,
  match: 71,
  roas: 4.7,
  cpl: 9.80,
  status: 'Activo'
}, {
  name: 'Intereses · SaaS B2B',
  type: 'Interés',
  reach: 3100000,
  match: 64,
  roas: 2.4,
  cpl: 13.10,
  status: 'Test'
}, {
  name: 'Visitantes web · 90 días',
  type: 'Retargeting',
  reach: 420000,
  match: 95,
  roas: 4.9,
  cpl: 7.90,
  status: 'Activo'
}, {
  name: 'Newsletter · Suscriptores',
  type: 'Lista',
  reach: 58000,
  match: 88,
  roas: 4.2,
  cpl: 8.60,
  status: 'Pausado'
}];
const DEMOGRAPHICS = {
  age: [{
    label: '18–24',
    value: 12
  }, {
    label: '25–34',
    value: 38
  }, {
    label: '35–44',
    value: 29
  }, {
    label: '45–54',
    value: 14
  }, {
    label: '55+',
    value: 7
  }],
  device: [{
    label: 'Móvil',
    value: 64,
    color: '#0A66C2'
  }, {
    label: 'Desktop',
    value: 29,
    color: '#4285F4'
  }, {
    label: 'Tablet',
    value: 7,
    color: '#A8AAAE'
  }],
  geo: [{
    label: 'Madrid',
    value: 31
  }, {
    label: 'Barcelona',
    value: 24
  }, {
    label: 'Valencia',
    value: 12
  }, {
    label: 'Sevilla',
    value: 9
  }, {
    label: 'Bilbao',
    value: 7
  }]
};
const MEMBERS = [{
  name: 'Elena Ruiz',
  email: 'elena@acme.es',
  role: 'Owner',
  initials: 'ER',
  color: '#0A66C2'
}, {
  name: 'Marc Soler',
  email: 'marc@acme.es',
  role: 'Admin',
  initials: 'MS',
  color: '#0866FF'
}, {
  name: 'Nora Calvo',
  email: 'nora@acme.es',
  role: 'Editor',
  initials: 'NC',
  color: '#9D6DFB'
}, {
  name: 'David Ferrer',
  email: 'david@acme.es',
  role: 'Editor',
  initials: 'DF',
  color: '#00F9FF'
}, {
  name: 'Lucía Méndez',
  email: 'lucia@acme.es',
  role: 'Lectura',
  initials: 'LM',
  color: '#5E5E5E'
}];
Object.assign(window, {
  CHANNELS_FULL,
  CAMPAIGNS_FULL,
  INSIGHTS,
  AUDIENCES,
  DEMOGRAPHICS,
  MEMBERS,
  TRENDS: T
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Header.jsx
try { (() => {
/* global React, Icon, ICONS */
const PageHeader = ({
  workspace,
  title,
  subtitle,
  range,
  onRangeChange,
  onExport,
  onNew,
  showRange = true,
  showExport = true,
  showPrimary = true,
  primaryLabel = 'Nueva campaña'
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 24
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 11,
    color: 'var(--fg3)',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginBottom: 8
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 6,
    height: 6,
    borderRadius: 99,
    background: 'var(--accent)',
    boxShadow: '0 0 0 4px var(--accent-soft)'
  }
}), workspace), /*#__PURE__*/React.createElement("h1", {
  className: "h1"
}, title), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13.5,
    color: 'var(--fg3)',
    marginTop: 6,
    maxWidth: 560
  }
}, subtitle)), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 8
  }
}, showRange && /*#__PURE__*/React.createElement("button", {
  className: "btn btn--ghost",
  onClick: () => onRangeChange?.()
}, range, " ", /*#__PURE__*/React.createElement(Icon, {
  d: ICONS.chevron,
  size: 14
})), showExport && /*#__PURE__*/React.createElement("button", {
  className: "btn btn--ghost",
  onClick: onExport
}, /*#__PURE__*/React.createElement(Icon, {
  d: ICONS.download,
  size: 14
}), "Export"), showPrimary && /*#__PURE__*/React.createElement("button", {
  className: "btn btn--primary",
  onClick: onNew
}, /*#__PURE__*/React.createElement(Icon, {
  d: ICONS.plus,
  size: 14
}), primaryLabel)));
const Delta = ({
  value,
  invert = false
}) => {
  const good = invert ? value < 0 : value > 0;
  const Arrow = value > 0 ? ICONS.arrowUp : ICONS.arrowDown;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 12,
      fontWeight: 600,
      color: good ? '#047857' : '#BE123C',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    d: Arrow,
    size: 10,
    stroke: 2
  }), Math.abs(value).toFixed(1), "%");
};
const Sparkline = ({
  data,
  color = '#C5E818',
  height = 28
}) => {
  const w = 220,
    h = height;
  const min = Math.min(...data),
    max = Math.max(...data);
  const pts = data.map((v, i) => `${i / (data.length - 1) * w},${h - (v - min) / (max - min || 1) * (h - 4) - 2}`).join(' L');
  const id = `g${Math.random().toString(36).slice(2, 7)}`;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    width: "100%",
    height: h,
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: color,
    stopOpacity: ".3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: color,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: `M${pts} L${w},${h} L0,${h} Z`,
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: `M${pts}`,
    stroke: color,
    strokeWidth: 2,
    fill: "none",
    strokeLinejoin: "round"
  }));
};
const KPI = ({
  label,
  value,
  delta,
  data,
  accent,
  invert,
  prefix = '',
  suffix = ''
}) => /*#__PURE__*/React.createElement("div", {
  className: `card${accent ? ' card--accent' : ''}`,
  style: {
    padding: 18
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 11,
    color: 'var(--fg4)',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  }
}, label), /*#__PURE__*/React.createElement(Delta, {
  value: delta,
  invert: invert
})), /*#__PURE__*/React.createElement("div", {
  className: "kpi",
  style: {
    marginTop: 10,
    fontSize: 30
  }
}, prefix, value, suffix), /*#__PURE__*/React.createElement(Sparkline, {
  data: data
}));
Object.assign(window, {
  PageHeader,
  KPI,
  Delta,
  Sparkline
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Insights.jsx
try { (() => {
/* global React, Icon, ICONS, FilterChips, CardHead, INSIGHTS */
const {
  useState: useIState
} = React;
const SEV = {
  opportunity: {
    label: 'Oportunidad',
    dot: 'var(--accent)',
    pill: {
      bg: 'var(--accent-soft)',
      fg: 'var(--accent-deep)'
    },
    bar: 'var(--accent)',
    metric: 'var(--pos-ink)'
  },
  critical: {
    label: 'Crítico',
    dot: 'var(--neg)',
    pill: {
      bg: 'var(--neg-soft)',
      fg: 'var(--neg-ink)'
    },
    bar: 'var(--neg)',
    metric: 'var(--neg-ink)'
  },
  info: {
    label: 'A revisar',
    dot: 'var(--gray-400)',
    pill: {
      bg: 'var(--line-2)',
      fg: '#4A4C4F'
    },
    bar: 'var(--gray-300)',
    metric: 'var(--fg2)'
  }
};
const InsightCard = ({
  data,
  onApply,
  feature
}) => {
  const s = SEV[data.severity] || SEV.info;
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: feature ? 24 : 20,
      borderLeft: `3px solid ${s.bar}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: s.pill.bg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: s.pill.fg
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.sparkles,
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '3px 8px',
      borderRadius: 6,
      background: s.pill.bg,
      color: s.pill.fg,
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: '0.02em'
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: 'var(--fg4)',
      fontWeight: 600,
      letterSpacing: '0.02em'
    }
  }, "\xB7 ", data.category), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: 'var(--fg4)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      fontWeight: 600,
      marginLeft: 'auto'
    }
  }, "IA \xB7 hoy")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: feature ? 'h2' : 'h3',
    style: feature ? {
      fontSize: 22,
      marginBottom: 8
    } : {}
  }, data.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: feature ? 14.5 : 13,
      color: 'var(--fg3)',
      margin: '6px 0 14px',
      lineHeight: 1.55,
      maxWidth: '62ch'
    }
  }, data.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    style: {
      padding: '7px 13px',
      fontSize: 12
    },
    onClick: () => onApply?.(data.title)
  }, "Aplicar sugerencia"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost",
    style: {
      padding: '7px 13px',
      fontSize: 12
    }
  }, "Ver an\xE1lisis"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      flexShrink: 0,
      paddingLeft: 8,
      borderLeft: '1px solid var(--line-2)',
      minWidth: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tnum",
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: feature ? 34 : 26,
      fontWeight: 700,
      color: s.metric,
      letterSpacing: '-0.01em',
      lineHeight: 1
    }
  }, data.metric), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: 'var(--fg4)',
      marginTop: 4,
      fontWeight: 500
    }
  }, data.metricLabel))));
};
const DigestCard = () => /*#__PURE__*/React.createElement("div", {
  className: "card",
  style: {
    padding: 20
  }
}, /*#__PURE__*/React.createElement(CardHead, {
  title: "Resumen semanal \xB7 IA"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }
}, [['+€48K', 'pipeline atribuido a LinkedIn, el canal con mejor ROAS de la cuenta.'], ['3 campañas', 'superaron su objetivo de conversiones; 2 quedaron por debajo del umbral.'], ['−12%', 'CPL medio frente al periodo anterior gracias a la rotación de creatividades.'], ['1 alerta', 'de presupuesto: TikTok creators sigue por debajo de rentabilidad.']].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'flex',
    gap: 12,
    alignItems: 'baseline'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "tnum",
  style: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 15,
    color: 'var(--fg1)',
    minWidth: 78,
    flexShrink: 0
  }
}, k), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 13,
    color: 'var(--fg3)',
    lineHeight: 1.5
  }
}, v)))));
const InsightsView = ({
  fireToast
}) => {
  const [cat, setCat] = useIState('Todas');
  const apply = t => fireToast?.(`Sugerencia aplicada · ${t.length > 30 ? t.slice(0, 30) + '…' : t}`);
  const cats = ['Todas', 'Presupuesto', 'Creatividades', 'Audiencias', 'Pujas'];
  const list = cat === 'Todas' ? INSIGHTS : INSIGHTS.filter(i => i.category === cat);
  const feature = list[0];
  const rest = list.slice(1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(FilterChips, {
    options: cats,
    value: cat,
    onChange: setCat
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--fg3)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: 'var(--accent)',
      boxShadow: '0 0 0 4px var(--accent-soft)'
    }
  }), list.length, " recomendaciones \xB7 actualizado hace 4 min")), feature && /*#__PURE__*/React.createElement(InsightCard, {
    data: feature,
    onApply: apply,
    feature: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 14,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, rest.map((ins, i) => /*#__PURE__*/React.createElement(InsightCard, {
    key: i,
    data: ins,
    onApply: apply
  })), rest.length === 0 && !feature && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: '48px 20px',
      textAlign: 'center',
      color: 'var(--fg3)'
    }
  }, "Sin insights en esta categor\xEDa.")), /*#__PURE__*/React.createElement(DigestCard, null)));
};
Object.assign(window, {
  InsightsView,
  InsightCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Insights.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Primitives.jsx
try { (() => {
/* global React, Icon, ICONS */
const {
  useState: usePState
} = React;

/* Mini sparkline compacta (sin gradiente de área por defecto) */
const MiniSpark = ({
  data,
  color = 'var(--accent)',
  w = 96,
  h = 28,
  fill = true,
  strokeW = 1.75
}) => {
  const min = Math.min(...data),
    max = Math.max(...data);
  const pts = data.map((v, i) => `${i / (data.length - 1) * w},${h - (v - min) / (max - min || 1) * (h - 4) - 2}`);
  const line = 'M' + pts.join(' L');
  const id = `ms${Math.random().toString(36).slice(2, 7)}`;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    width: w,
    height: h,
    preserveAspectRatio: "none",
    style: {
      display: 'block'
    }
  }, fill && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: color,
    stopOpacity: ".28"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: color,
    stopOpacity: "0"
  }))), fill && /*#__PURE__*/React.createElement("path", {
    d: `${line} L${w},${h} L0,${h} Z`,
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    stroke: color,
    strokeWidth: strokeW,
    fill: "none",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }));
};

/* Barra de progreso horizontal con etiqueta y valor */
const BarRow = ({
  label,
  value,
  max,
  suffix = '%',
  color = 'var(--fg1)',
  sub
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 96,
    flexShrink: 0,
    fontSize: 12.5,
    color: 'var(--fg1)',
    fontWeight: 500
  }
}, label), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    height: 8,
    background: 'var(--line-2)',
    borderRadius: 99,
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: `${value / max * 100}%`,
    height: '100%',
    background: color,
    borderRadius: 99
  }
})), /*#__PURE__*/React.createElement("div", {
  className: "tnum",
  style: {
    width: 52,
    textAlign: 'right',
    fontSize: 12.5,
    color: 'var(--fg3)',
    fontWeight: 600
  }
}, value, suffix, sub ? /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--fg4)',
    fontWeight: 400
  }
}, " ", sub) : null));

/* Cabecera de tarjeta reutilizable */
const CardHead = ({
  title,
  action
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14
  }
}, /*#__PURE__*/React.createElement("h3", {
  className: "h3"
}, title), action);

/* Input de búsqueda con icono */
const SearchInput = ({
  value,
  onChange,
  placeholder = 'Buscar…',
  width = 260
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    width
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    position: 'absolute',
    left: 11,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--fg4)',
    pointerEvents: 'none'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  d: ICONS.search,
  size: 15
})), /*#__PURE__*/React.createElement("input", {
  className: "input",
  value: value,
  onChange: e => onChange(e.target.value),
  placeholder: placeholder,
  style: {
    width: '100%',
    paddingLeft: 34
  }
}));

/* Chips de filtro (segmentado, selección única) */
const FilterChips = ({
  options,
  value,
  onChange
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap'
  }
}, options.map(opt => {
  const on = value === opt;
  return /*#__PURE__*/React.createElement("button", {
    key: opt,
    onClick: () => onChange(opt),
    style: {
      padding: '7px 13px',
      fontSize: 12.5,
      fontWeight: on ? 600 : 500,
      borderRadius: 'var(--r-full)',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      background: on ? 'var(--fg1)' : 'var(--card)',
      color: on ? 'var(--bg)' : 'var(--fg2)',
      border: `1px solid ${on ? 'var(--fg1)' : 'var(--line)'}`,
      transition: 'background 120ms var(--ease)'
    }
  }, opt);
}));

/* Control segmentado (sub-nav, p. ej. Ajustes) */
const Segmented = ({
  options,
  value,
  onChange
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'inline-flex',
    background: 'var(--line-2)',
    borderRadius: 'var(--r-lg)',
    padding: 3,
    gap: 2
  }
}, options.map(opt => {
  const on = value === opt;
  return /*#__PURE__*/React.createElement("button", {
    key: opt,
    onClick: () => onChange(opt),
    style: {
      padding: '7px 14px',
      fontSize: 13,
      fontWeight: on ? 600 : 500,
      borderRadius: 'var(--r-md)',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      background: on ? 'var(--card)' : 'transparent',
      color: on ? 'var(--fg1)' : 'var(--fg3)',
      boxShadow: on ? 'var(--shadow-e1)' : 'none',
      transition: 'background 120ms var(--ease)'
    }
  }, opt);
}));

/* Toggle switch */
const Toggle = ({
  on,
  onClick
}) => /*#__PURE__*/React.createElement("button", {
  onClick: onClick,
  "aria-pressed": on,
  style: {
    width: 40,
    height: 23,
    borderRadius: 99,
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    background: on ? 'var(--accent)' : 'var(--gray-300)',
    position: 'relative',
    transition: 'background 160ms var(--ease)',
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    position: 'absolute',
    top: 3,
    left: on ? 20 : 3,
    width: 17,
    height: 17,
    borderRadius: 99,
    background: '#fff',
    boxShadow: '0 1px 2px rgba(0,0,0,.2)',
    transition: 'left 160ms var(--ease)'
  }
}));

/* Tira compacta de stats (label + valor + delta opcional) */
const StatStrip = ({
  items
}) => /*#__PURE__*/React.createElement("div", {
  className: "card",
  style: {
    padding: 0,
    display: 'grid',
    gridTemplateColumns: `repeat(${items.length}, 1fr)`,
    overflow: 'hidden'
  }
}, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    padding: '16px 20px',
    borderLeft: i ? '1px solid var(--line-2)' : 'none'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: 'var(--fg4)',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  }
}, it.label), /*#__PURE__*/React.createElement("div", {
  className: "tnum",
  style: {
    fontFamily: 'var(--font-display)',
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--fg1)',
    marginTop: 6,
    letterSpacing: '-0.01em'
  }
}, it.value))));

/* Avatar circular con iniciales */
const Avatar = ({
  initials,
  color = 'var(--fg3)',
  size = 34
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    width: size,
    height: size,
    borderRadius: 99,
    background: color,
    color: '#fff',
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: size * 0.36,
    letterSpacing: '-0.01em'
  }
}, initials);

/* fmt helpers */
const eur = n => '€' + n.toLocaleString('es-ES');
const eurK = n => n >= 1000 ? '€' + (n / 1000).toFixed(n >= 100000 ? 0 : 1).replace('.', ',') + 'K' : '€' + n;
const num = n => n.toLocaleString('es-ES');
const compact = n => n >= 1000000 ? (n / 1000000).toFixed(1).replace('.', ',') + 'M' : n >= 1000 ? Math.round(n / 1000) + 'K' : '' + n;
Object.assign(window, {
  MiniSpark,
  BarRow,
  CardHead,
  SearchInput,
  FilterChips,
  Segmented,
  Toggle,
  StatStrip,
  Avatar,
  eur,
  eurK,
  num,
  compact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Settings.jsx
try { (() => {
/* global React, Segmented, Toggle, Avatar, ChannelDot, CardHead, Icon, ICONS, MEMBERS, CHANNELS_FULL */
const {
  useState: useSState
} = React;
const Field = ({
  label,
  children,
  hint
}) => /*#__PURE__*/React.createElement("label", {
  style: {
    display: 'block'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11.5,
    color: 'var(--fg2)',
    fontWeight: 600,
    marginBottom: 6
  }
}, label), children, hint && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11.5,
    color: 'var(--fg4)',
    marginTop: 5
  }
}, hint));
const Row = ({
  children,
  last
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 0',
    borderBottom: last ? 'none' : '1px solid var(--line-2)'
  }
}, children);
const AccountPanel = ({
  fireToast
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "card",
  style: {
    padding: 22
  }
}, /*#__PURE__*/React.createElement(CardHead, {
  title: "Workspace"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }
}, /*#__PURE__*/React.createElement(Field, {
  label: "Nombre del workspace"
}, /*#__PURE__*/React.createElement("input", {
  className: "input",
  style: {
    width: '100%'
  },
  defaultValue: "Acme S.L."
})), /*#__PURE__*/React.createElement(Field, {
  label: "Dominio",
  hint: "Se usa para invitar miembros autom\xE1ticamente."
}, /*#__PURE__*/React.createElement("input", {
  className: "input",
  style: {
    width: '100%'
  },
  defaultValue: "acme.es"
})), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12
  }
}, /*#__PURE__*/React.createElement(Field, {
  label: "Zona horaria"
}, /*#__PURE__*/React.createElement("input", {
  className: "input",
  style: {
    width: '100%'
  },
  defaultValue: "Europe/Madrid (GMT+1)"
})), /*#__PURE__*/React.createElement(Field, {
  label: "Moneda"
}, /*#__PURE__*/React.createElement("input", {
  className: "input",
  style: {
    width: '100%'
  },
  defaultValue: "EUR \xB7 \u20AC"
}))))), /*#__PURE__*/React.createElement("div", {
  className: "card",
  style: {
    padding: 22
  }
}, /*#__PURE__*/React.createElement(CardHead, {
  title: "Plan"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "kpi",
  style: {
    fontSize: 32
  }
}, "Pro"), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 13,
    color: 'var(--fg3)'
  }
}, "\xB7 \u20AC290/mes \xB7 facturaci\xF3n anual")), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  }
}, [['Workspaces', '1 de 3'], ['Miembros', '5 de 10'], ['Canales conectados', '4 de ∞'], ['Inversión gestionada', '€1.28M / mes']].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--fg3)'
  }
}, k), /*#__PURE__*/React.createElement("span", {
  className: "tnum",
  style: {
    fontWeight: 600
  }
}, v)))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 8,
    marginTop: 20
  }
}, /*#__PURE__*/React.createElement("button", {
  className: "btn btn--primary",
  style: {
    padding: '8px 14px',
    fontSize: 12.5
  },
  onClick: () => fireToast?.('Abriendo gestión de plan…')
}, "Gestionar plan"), /*#__PURE__*/React.createElement("button", {
  className: "btn btn--ghost",
  style: {
    padding: '8px 14px',
    fontSize: 12.5
  }
}, "Ver facturas"))));
const IntegrationsPanel = ({
  fireToast
}) => {
  const [conn, setConn] = useSState(Object.fromEntries(CHANNELS_FULL.map(c => [c.label, c.status !== 'Sincronizando'])));
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: '6px 22px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 0 4px'
    }
  }, /*#__PURE__*/React.createElement(CardHead, {
    title: "Canales conectados",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        color: 'var(--fg4)'
      }
    }, Object.values(conn).filter(Boolean).length, " activos")
  })), CHANNELS_FULL.map((c, i) => /*#__PURE__*/React.createElement(Row, {
    key: c.label,
    last: i === CHANNELS_FULL.length - 1
  }, /*#__PURE__*/React.createElement(ChannelDot, {
    name: c.label,
    size: 32
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, c.label, " Ads"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)'
    }
  }, conn[c.label] ? `Sincronizado · ${num0(c.spend)} este mes` : 'Sin conectar')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: conn[c.label] ? 'var(--pos-ink)' : 'var(--fg4)',
      fontWeight: 600
    }
  }, conn[c.label] ? 'Conectado' : 'Desconectado'), /*#__PURE__*/React.createElement(Toggle, {
    on: conn[c.label],
    onClick: () => {
      setConn(s => ({
        ...s,
        [c.label]: !s[c.label]
      }));
      fireToast?.(`${c.label} ${conn[c.label] ? 'desconectado' : 'conectado'}`);
    }
  }))));
};
const num0 = n => '€' + n.toLocaleString('es-ES');
const ROLE_PILL = {
  Owner: {
    bg: 'var(--accent-soft)',
    fg: 'var(--accent-deep)'
  },
  Admin: {
    bg: 'rgba(10,102,194,.12)',
    fg: '#0A66C2'
  },
  Editor: {
    bg: 'var(--line-2)',
    fg: '#4A4C4F'
  },
  Lectura: {
    bg: 'var(--line-2)',
    fg: '#7E8084'
  }
};
const MembersPanel = ({
  fireToast
}) => /*#__PURE__*/React.createElement("div", {
  className: "card",
  style: {
    padding: '6px 22px 14px'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '16px 0 4px'
  }
}, /*#__PURE__*/React.createElement(CardHead, {
  title: "Miembros del equipo",
  action: /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    style: {
      padding: '7px 13px',
      fontSize: 12
    },
    onClick: () => fireToast?.('Invitación enviada')
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.plus,
    size: 13
  }), "Invitar")
})), MEMBERS.map((m, i) => {
  const r = ROLE_PILL[m.role] || ROLE_PILL.Editor;
  return /*#__PURE__*/React.createElement(Row, {
    key: i,
    last: i === MEMBERS.length - 1
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: m.initials,
    color: m.color
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)'
    }
  }, m.email)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      padding: '4px 10px',
      borderRadius: 6,
      background: r.bg,
      color: r.fg,
      fontSize: 11,
      fontWeight: 600
    }
  }, m.role), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost",
    style: {
      padding: '6px 10px',
      fontSize: 12
    }
  }, "Gestionar"));
}));
const NotificationsPanel = () => {
  const [n, setN] = useSState({
    insights: true,
    alerts: true,
    weekly: true,
    budget: false,
    members: true
  });
  const items = [['insights', 'Nuevos insights de IA', 'Recibe un aviso cuando la IA detecta una oportunidad o riesgo.'], ['alerts', 'Alertas de rendimiento', 'Campañas que caen por debajo del umbral de ROAS objetivo.'], ['budget', 'Límites de presupuesto', 'Avisa al alcanzar el 80% del presupuesto mensual.'], ['weekly', 'Resumen semanal', 'Digest de rendimiento cada lunes por la mañana.'], ['members', 'Actividad del equipo', 'Invitaciones, cambios de rol y nuevas campañas creadas.']];
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: '6px 22px 14px',
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 0 4px'
    }
  }, /*#__PURE__*/React.createElement(CardHead, {
    title: "Notificaciones por email"
  })), items.map(([k, t, d], i) => /*#__PURE__*/React.createElement(Row, {
    key: k,
    last: i === items.length - 1
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      marginTop: 2
    }
  }, d)), /*#__PURE__*/React.createElement(Toggle, {
    on: n[k],
    onClick: () => setN(s => ({
      ...s,
      [k]: !s[k]
    }))
  }))));
};
const SettingsView = ({
  fireToast
}) => {
  const [tab, setTab] = useSState('Cuenta');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Segmented, {
    options: ['Cuenta', 'Integraciones', 'Miembros', 'Notificaciones'],
    value: tab,
    onChange: setTab
  }), tab === 'Cuenta' && /*#__PURE__*/React.createElement(AccountPanel, {
    fireToast: fireToast
  }), tab === 'Integraciones' && /*#__PURE__*/React.createElement(IntegrationsPanel, {
    fireToast: fireToast
  }), tab === 'Miembros' && /*#__PURE__*/React.createElement(MembersPanel, {
    fireToast: fireToast
  }), tab === 'Notificaciones' && /*#__PURE__*/React.createElement(NotificationsPanel, null));
};
Object.assign(window, {
  SettingsView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Settings.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Sidebar.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

/* Icon · Iconoir (estándar único) vía web component de Iconify.
   Mantiene la API <Icon d={ICONS.x} size=… />; `d` es ahora el nombre
   Iconoir (p. ej. "iconoir:home-simple"). El stroke lo fija la propia
   librería (1.5 por defecto), por eso no se expone como prop. */
const Icon = ({
  d,
  size = 18
}) => /*#__PURE__*/React.createElement("iconify-icon", {
  icon: d,
  width: size,
  height: size,
  style: {
    display: 'inline-flex',
    flexShrink: 0
  }
});
const ICONS = {
  home: 'iconoir:home-simple',
  campaigns: 'iconoir:megaphone',
  insights: 'iconoir:graph-up',
  channels: 'iconoir:globe',
  audiences: 'iconoir:group',
  settings: 'iconoir:settings',
  search: 'iconoir:search',
  chevron: 'iconoir:nav-arrow-down',
  plus: 'iconoir:plus',
  download: 'iconoir:download',
  arrowUp: 'iconoir:arrow-up',
  arrowDown: 'iconoir:arrow-down',
  sparkles: 'iconoir:sparks',
  filter: 'iconoir:filter'
};
const Sidebar = ({
  active,
  onNav
}) => {
  const items = [['home', 'Resumen'], ['campaigns', 'Campañas'], ['insights', 'Insights'], ['channels', 'Canales'], ['audiences', 'Audiencias'], ['settings', 'Ajustes']];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 240,
      background: '#fff',
      borderRight: '1px solid var(--line)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 16px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '4px 8px',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 22,
      letterSpacing: '-0.02em',
      color: 'var(--fg1)'
    }
  }, "Newno")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1
    }
  }, items.map(([k, label]) => {
    const on = active === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => onNav(k),
      className: 'nav-item' + (on ? ' nav-item--on' : '')
    }, /*#__PURE__*/React.createElement(Icon, {
      d: ICONS[k]
    }), label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--line)',
      borderRadius: 12,
      padding: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      color: 'var(--accent-ink)',
      fontSize: 14
    }
  }, "A"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--fg1)'
    }
  }, "Acme S.L."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)'
    }
  }, "Plan Pro \xB7 3 users"))));
};
Object.assign(window, {
  Icon,
  ICONS,
  Sidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Table.jsx
try { (() => {
/* global React */
const CHANNEL_COLORS = {
  LinkedIn: {
    bg: '#0A66C2',
    glyph: 'in'
  },
  Meta: {
    bg: '#0866FF',
    glyph: 'f'
  },
  TikTok: {
    bg: '#282A2D',
    glyph: '♪'
  },
  Google: {
    bg: '#fff',
    glyph: 'G',
    border: true
  },
  Bing: {
    bg: '#5E5E5E',
    glyph: 'b'
  }
};
const ChannelDot = ({
  name,
  size = 20
}) => {
  const c = CHANNEL_COLORS[name] || {
    bg: '#A8AAAE',
    glyph: '·'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: 99,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: c.bg,
      color: name === 'Google' ? '#1A1D21' : '#fff',
      fontSize: size * 0.45,
      fontWeight: 700,
      fontFamily: 'var(--font-display)',
      letterSpacing: '-0.02em',
      border: c.border ? '1px solid var(--line)' : 'none',
      flexShrink: 0
    }
  }, c.glyph);
};
const STATUS_PILL = {
  Activo: {
    bg: 'rgba(197,232,24,.18)',
    fg: '#3F4E07'
  },
  Pausado: {
    bg: '#E5E7EB',
    fg: '#6B7280'
  },
  Test: {
    bg: '#FEF3C7',
    fg: '#92400E'
  },
  Borrador: {
    bg: '#F1F2F2',
    fg: '#4A4C4F'
  }
};
const StatusPill = ({
  status
}) => {
  const s = STATUS_PILL[status] || STATUS_PILL.Borrador;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      padding: '3px 8px',
      borderRadius: 6,
      background: s.bg,
      color: s.fg,
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: '0.02em'
    }
  }, status);
};
const CampaignTable = ({
  rows
}) => /*#__PURE__*/React.createElement("div", {
  className: "card",
  style: {
    padding: 0,
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    borderBottom: '1px solid var(--line)'
  }
}, /*#__PURE__*/React.createElement("h3", {
  className: "h3"
}, "Campa\xF1as activas"), /*#__PURE__*/React.createElement("button", {
  className: "btn btn--ghost",
  style: {
    padding: '6px 12px',
    fontSize: 12
  }
}, "Ver todas \u2192")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '2.4fr 1fr 0.9fr 1fr 0.8fr',
    padding: '10px 18px',
    background: 'var(--bg)',
    borderBottom: '1px solid var(--line)',
    fontSize: 10.5,
    color: 'var(--fg3)',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  }
}, /*#__PURE__*/React.createElement("span", null, "Campa\xF1a"), /*#__PURE__*/React.createElement("span", null, "Spend"), /*#__PURE__*/React.createElement("span", null, "ROAS"), /*#__PURE__*/React.createElement("span", null, "CPL"), /*#__PURE__*/React.createElement("span", null, "Status")), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'grid',
    gridTemplateColumns: '2.4fr 1fr 0.9fr 1fr 0.8fr',
    padding: '12px 18px',
    borderBottom: i < rows.length - 1 ? '1px solid var(--line-2)' : 'none',
    alignItems: 'center',
    fontSize: 13,
    color: 'var(--fg1)'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontWeight: 500
  }
}, /*#__PURE__*/React.createElement(ChannelDot, {
  name: r.channel
}), r.name), /*#__PURE__*/React.createElement("span", {
  className: "tnum"
}, "\u20AC", r.spend.toLocaleString('es-ES')), /*#__PURE__*/React.createElement("span", {
  className: "tnum",
  style: {
    color: r.roas >= 3 ? '#047857' : '#BE123C',
    fontWeight: 600
  }
}, r.roas.toFixed(1), "\xD7"), /*#__PURE__*/React.createElement("span", {
  className: "tnum"
}, "\u20AC", r.cpl.toFixed(2)), /*#__PURE__*/React.createElement(StatusPill, {
  status: r.status
})))));
Object.assign(window, {
  CHANNEL_COLORS,
  ChannelDot,
  StatusPill,
  CampaignTable
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Table.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Delta = __ds_scope.Delta;

__ds_ns.KPICard = __ds_scope.KPICard;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.NavItem = __ds_scope.NavItem;

})();
