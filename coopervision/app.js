/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · BBDD Ópticas — app.js
   Lógica global del shell: rol, estado de pantalla, router hash,
   flyout admin y dropdown de avatar.
   Sin dependencias de build. Funciona abriendo index.html en file://.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const md = window.mockData;
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const LS_ROLE  = 'cpv_role';
  const LS_STATE = 'cpv_screen_state';

  /* ── Definición de rutas ───────────────────────────────────────
     nav   → valor data-nav del item del rail a marcar como activo
     group → eyebrow contextual del header de vista
     admin → requiere rol admin (guard + ocultación en rail)
     chrome:false → vista sin topbar/rail (login)                  */
  const ROUTES = {
    '/':                  { title: 'Resumen',               icon: 'home-simple',         nav: 'resumen',    group: 'Datos' },
    '/bi':                { title: 'Business Intelligence',  icon: 'graph-up',            nav: 'bi',         group: 'Datos' },
    '/mapa':              { title: 'Mapa',                   icon: 'map-pin',             nav: 'mapa',       group: 'Datos' },
    '/bbdd':              { title: 'Base de datos',          icon: 'database',            nav: 'bbdd',       group: 'Datos' },
    '/changelog':         { title: 'Changelog',              icon: 'clock-rotate-right',  nav: 'changelog',  group: 'Administración', admin: true },
    '/admin/usuarios':    { title: 'Usuarios',               icon: 'group',               nav: 'admin',      group: 'Administración', admin: true },
    '/admin/operaciones': { title: 'Operaciones',            icon: 'refresh-double',      nav: 'admin',      group: 'Administración', admin: true },
    '/admin/revision':    { title: 'Revisión',               icon: 'warning-circle',      nav: 'admin',      group: 'Administración', admin: true },
    '/admin/cadenas':     { title: 'Cadenas',                icon: 'network-left',        nav: 'admin',      group: 'Administración', admin: true },
    '/admin/logs':        { title: 'Logs',                   icon: 'scroll',              nav: 'admin',      group: 'Administración', admin: true },
    '/perfil':            { title: 'Mi perfil',              icon: 'user',                nav: 'perfil',     group: 'Cuenta' },
    '/styleguide':        { title: 'Componentes',            icon: 'view-grid',           nav: 'styleguide', group: 'Desarrollo' },
    '/login':             { title: 'Iniciar sesión',         icon: 'log-in',              nav: null,         group: 'Acceso', chrome: false },
  };

  let currentPath = '/';

  /* ════ Rol (admin/user) — persistente ════ */
  function getRole() { return localStorage.getItem(LS_ROLE) || 'admin'; }

  function applyRole(role) {
    document.body.setAttribute('data-role', role);
    $$('.role-toggle-btn').forEach((b) => b.classList.toggle('active', b.dataset.role === role));
  }

  function chooseRole(role) {
    localStorage.setItem(LS_ROLE, role);
    if (md && md.sesion) md.sesion.rol_activo = role;
    applyRole(role);
    route(); // re-evalúa guard de la ruta actual
  }

  /* ════ Estado de pantalla (default/loading/empty/error) — persistente ════ */
  function getState() { return localStorage.getItem(LS_STATE) || 'default'; }

  function applyState(state) {
    document.body.setAttribute('data-screen-state', state);
    $$('.segmented-btn').forEach((b) => b.classList.toggle('active', b.dataset.state === state));
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
    const icons = { success: 'check-circle', error: 'warning-triangle', warn: 'warning-triangle', info: 'bell' };
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML =
      '<span class="toast-icon ' + type + '"><iconify-icon icon="iconoir:' + (icons[type] || 'bell') + '" width="18"></iconify-icon></span>' +
      '<div class="toast-content"><div class="toast-title">' + title + '</div>' +
      (body ? '<div class="toast-body">' + body + '</div>' : '') + '</div>' +
      '<button class="toast-close" aria-label="Cerrar"><iconify-icon icon="iconoir:xmark" width="14"></iconify-icon></button>';
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
    const f = $('#admin-flyout'); if (f) f.classList.remove('open');
    const b = $('#admin-nav');    if (b) b.setAttribute('aria-expanded', 'false');
  }
  function toggleFlyout() {
    const f = $('#admin-flyout'); if (!f) return;
    const open = f.classList.toggle('open');
    const b = $('#admin-nav'); if (b) b.setAttribute('aria-expanded', String(open));
    closeAvatar();
    closePerfilFlyout();
  }
  function closeAvatar() {
    const m = $('#avatar-menu'); if (m) m.classList.remove('open');
  }
  function toggleAvatar() {
    const m = $('#avatar-menu'); if (!m) return;
    m.classList.toggle('open');
    closeFlyout();
    closePerfilFlyout();
  }
  function closePerfilFlyout() {
    const f = $('#perfil-flyout'); if (f) f.classList.remove('open');
    const b = $('#perfil-nav');    if (b) b.setAttribute('aria-expanded', 'false');
  }
  function togglePerfilFlyout() {
    const f = $('#perfil-flyout'); if (!f) return;
    const open = f.classList.toggle('open');
    const b = $('#perfil-nav'); if (b) b.setAttribute('aria-expanded', String(open));
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
    $$('.nav-item[data-nav]').forEach((el) => el.classList.toggle('on', !!navKey && el.dataset.nav === navKey));

    // Cierra overlays al navegar
    closeFlyout();
    closeAvatar();

    renderView();
  }

  /* ════ Render del área principal (placeholder por estado) ════ */
  function headerHTML(def, path) {
    return (
      '<div class="page-header"><div class="page-header-left">' +
      '<span class="eyebrow"><span class="dot"></span>' + def.group + '</span>' +
      '<h1 class="page-title">' + def.title + '</h1>' +
      '<p class="page-subtitle">Ruta <span class="mono-sm">#' + path + '</span> · vista pendiente de construcción</p>' +
      '</div></div>'
    );
  }

  function stubDefault(def, path) {
    return headerHTML(def, path) +
      '<div class="card view-stub"><div class="empty-state">' +
      '<iconify-icon class="empty-state-icon" icon="iconoir:' + def.icon + '" width="32"></iconify-icon>' +
      '<h2 class="state-title">' + def.title + '</h2>' +
      '<p class="state-body">Selecciona una vista en la barra lateral. El contenido de esta pantalla se construirá en el siguiente paso.</p>' +
      '</div></div>';
  }

  function stubLoading(def, path) {
    let kpis = '';
    for (let i = 0; i < 4; i++) {
      kpis +=
        '<div class="card card-compact stub-kpi">' +
        '<span class="skeleton sk-text-sm" style="width:45%"></span>' +
        '<span class="skeleton" style="height:34px;width:70%"></span>' +
        '<span class="skeleton sk-text-sm" style="width:35%"></span></div>';
    }
    let rows = '';
    for (let i = 0; i < 7; i++) {
      rows += '<div style="padding:0 16px"><span class="skeleton sk-row" style="margin:0"></span></div>';
    }
    return headerHTML(def, path) +
      '<div class="kpi-grid" style="margin-bottom:var(--space-4)">' + kpis + '</div>' +
      '<div class="card" style="padding:14px 0">' + rows + '</div>';
  }

  function stubEmpty(def, path) {
    return headerHTML(def, path) +
      '<div class="card view-stub"><div class="empty-state">' +
      '<iconify-icon class="empty-state-icon" icon="iconoir:search" width="32"></iconify-icon>' +
      '<h2 class="state-title">Sin resultados</h2>' +
      '<p class="state-body">No hay datos que mostrar con los filtros actuales.</p>' +
      '<button class="btn btn-ghost btn-sm" data-action="retry">Limpiar filtros</button>' +
      '</div></div>';
  }

  function stubError(def, path) {
    return headerHTML(def, path) +
      '<div class="card view-stub"><div class="error-state">' +
      '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
      '<h2 class="state-title">No se pudo cargar la vista</h2>' +
      '<p class="state-body">Ha ocurrido un error al recuperar los datos. Inténtalo de nuevo.</p>' +
      '<button class="btn btn-primary btn-sm" data-action="retry"><iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
  }

  function notFoundHTML(path) {
    return '<div class="card view-stub"><div class="empty-state">' +
      '<iconify-icon class="empty-state-icon" icon="iconoir:minus-circle" width="32"></iconify-icon>' +
      '<h2 class="state-title">Ruta no encontrada</h2>' +
      '<p class="state-body"><span class="mono-sm">#' + path + '</span> no corresponde a ninguna vista.</p>' +
      '<a class="btn btn-ghost btn-sm" href="#/">Ir al resumen</a>' +
      '</div></div>';
  }

  function loginHTML() {
    return '<div class="login-split">' +

      // ── Panel izquierdo (hero, oscuro) ──
      '<div class="login-left">' +
        '<div class="login-left-brand">' +
          '<span class="login-logo"><img src="assets/cpv-logo.png" alt="CooperVision"></span>' +
          '<div><div class="login-brand-name">CooperVision</div>' +
          '<div class="login-brand-sub">BBDD Ópticas Iberia</div></div>' +
        '</div>' +
        '<div class="login-left-hero">' +
          '<h1 class="login-hero-title">Plataforma de Ópticas Iberia<span class="login-hero-dot">.</span></h1>' +
          '<p class="login-hero-sub">Acceso centralizado a la base de datos de establecimientos ópticos de España y Portugal. Solo para profesionales autorizados de CooperVision.</p>' +
        '</div>' +
        '<div class="login-left-foot">© 2026 CooperVision Iberia. Desarrollado por Newno</div>' +
      '</div>' +

      // ── Panel derecho (formulario) ──
      '<div class="login-right">' +
        '<form class="login-form">' +
          '<h2 class="login-form-title">Acceso interno</h2>' +
          '<div class="form-group" style="margin-bottom:var(--space-6)"><label class="form-label" for="login-email">Email</label>' +
          '<input class="input" id="login-email" type="email" placeholder="nombre@coopervision.es" autocomplete="email"></div>' +
          '<div class="form-group"><label class="form-label" for="login-pwd">Contraseña</label>' +
          '<input class="input" id="login-pwd" type="password" placeholder="••••••••" autocomplete="current-password"></div>' +
          '<a href="#" id="login-forgot" class="login-forgot-link">¿Olvidaste tu contraseña?</a>' +
          '<button class="btn btn-primary btn-lg" id="login-submit-btn" type="button" style="width:100%;justify-content:center">Iniciar sesión</button>' +
          '<div class="login-divider"></div>' +
          '<div class="login-builtby">Built by <strong>Newno</strong></div>' +
        '</form>' +
      '</div>' +

      '</div>';
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
    if (!def) { root.innerHTML = notFoundHTML(currentPath); root.insertAdjacentHTML('beforeend', footerHTML()); return; }
    if (def.chrome === false) { root.innerHTML = loginHTML(); return; }

    const state = getState();

    // ── Vistas modulares registradas en window.cpvViews ──────────
    // Cada módulo expone { render(state, ctx) -> htmlString } y un
    // hook opcional mounted(root, state, ctx) para dibujar charts /
    // enlazar tooltips tras inyectar el HTML.
    const view = window.cpvViews && window.cpvViews[currentPath];
    if (view && typeof view.render === 'function') {
      const ctx = {
        def, path: currentPath, md, role: getRole(),
        headerHTML, stubLoading, stubEmpty, stubError, toast,
      };
      root.innerHTML = view.render(state, ctx);
      if (currentPath !== '/mapa') root.insertAdjacentHTML('beforeend', footerHTML());
      if (typeof view.mounted === 'function') view.mounted(root, state, ctx);
      return;
    }

    // ── Fallback: stubs por estado (vistas aún sin construir) ────
    switch (state) {
      case 'loading': root.innerHTML = stubLoading(def, currentPath); break;
      case 'empty':   root.innerHTML = stubEmpty(def, currentPath);   break;
      case 'error':   root.innerHTML = stubError(def, currentPath);   break;
      default:        root.innerHTML = stubDefault(def, currentPath);
    }
    root.insertAdjacentHTML('beforeend', footerHTML());
  }

  /* ════ Usuario de sesión (desde mockData) ════ */
  function setupUser() {
    if (!md || !md.usuarios) return;
    const u = md.usuarios.find((x) => x.id === md.sesion.usuario_actual_id) || md.usuarios[0];
    if (!u) return;
    const words = u.nombre.split(/\s+/).filter(Boolean);
    const initials = ((words[0] || '')[0] + (words[1] || '')[0] || '').toUpperCase();
    const shortName = words[1] ? words[0] + ' ' + words[1][0] + '.' : words[0];
    const set = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };
    set('#avatar-initials', initials);
    set('#rail-avatar', initials);
    set('#avatar-name', shortName);
    set('#avatar-menu-name', u.nombre);
    set('#avatar-menu-email', u.email);
  }

  /* ════ Delegación de eventos ════ */
  function onClick(e) {
    const roleBtn = e.target.closest('.role-toggle-btn');
    if (roleBtn) { chooseRole(roleBtn.dataset.role); return; }

    const segBtn = e.target.closest('.segmented-btn');
    if (segBtn) { chooseState(segBtn.dataset.state); return; }

    const retry = e.target.closest('[data-action="retry"]');
    if (retry) { chooseState('default'); return; }

    const loginBtn = e.target.closest('#login-submit-btn');
    if (loginBtn) { e.preventDefault(); applyRole('admin'); location.hash = '#/'; return; }

    const loginForgot = e.target.closest('#login-forgot');
    if (loginForgot) { e.preventDefault(); toast('info', 'Restablecimiento de contraseña', 'Contacta con el administrador del sistema.'); return; }

    if (e.target.closest('#admin-nav')) { e.preventDefault(); toggleFlyout(); return; }
    if (e.target.closest('#avatar-btn')) { e.preventDefault(); toggleAvatar(); return; }

    // Clicks fuera → cerrar overlays
    if (!e.target.closest('#avatar-wrap')) closeAvatar();
    if (!e.target.closest('#admin-nav') && !e.target.closest('#admin-flyout')) closeFlyout();
  }

  function onKey(e) {
    if (e.key === 'Escape') { closeFlyout(); closeAvatar(); closePerfilFlyout(); }
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
