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
    '/styleguide':        { title: 'Styleguide',             icon: 'design-nib',          nav: 'styleguide', group: 'Desarrollo' },
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
  }
  function closeAvatar() {
    const m = $('#avatar-menu'); if (m) m.classList.remove('open');
  }
  function toggleAvatar() {
    const m = $('#avatar-menu'); if (!m) return;
    m.classList.toggle('open');
    closeFlyout();
  }

  /* ════ Router hash ════ */
  function parseHash() {
    let h = (location.hash || '').replace(/^#/, '');
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
    return '<div class="login-wrap"><div class="card login-card">' +
      '<div class="login-brand">' +
      '<span class="brand-mark-cpv" style="cursor:default">CV</span>' +
      '<div><div class="display-md">CooperVision</div><div class="body-xs c-muted">BBDD Ópticas Iberia</div></div>' +
      '</div>' +
      '<div class="form-group" style="margin-bottom:var(--space-4)"><label class="form-label">Email</label>' +
      '<input class="input" type="email" placeholder="nombre@coopervision.es" disabled></div>' +
      '<div class="form-group" style="margin-bottom:var(--space-6)"><label class="form-label">Contraseña</label>' +
      '<input class="input" type="password" placeholder="••••••••" disabled></div>' +
      '<a class="btn btn-primary btn-lg" href="#/" style="width:100%;justify-content:center">Entrar</a>' +
      '<div style="display:flex;align-items:center;gap:6px;justify-content:center;margin-top:var(--space-6)">' +
      '<span class="brand-mark-newno" style="width:16px;height:16px;font-size:9px;border-radius:4px">n</span>' +
      '<span class="body-xs c-muted">Built by Newno</span></div>' +
      '</div></div>';
  }

  function renderView() {
    const root = $('#view-root');
    if (!root) return;
    const def = ROUTES[currentPath];
    if (!def) { root.innerHTML = notFoundHTML(currentPath); return; }
    if (def.chrome === false) { root.innerHTML = loginHTML(); return; }

    switch (getState()) {
      case 'loading': root.innerHTML = stubLoading(def, currentPath); break;
      case 'empty':   root.innerHTML = stubEmpty(def, currentPath);   break;
      case 'error':   root.innerHTML = stubError(def, currentPath);   break;
      default:        root.innerHTML = stubDefault(def, currentPath);
    }
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

    if (e.target.closest('#admin-nav')) { e.preventDefault(); toggleFlyout(); return; }
    if (e.target.closest('#avatar-btn')) { e.preventDefault(); toggleAvatar(); return; }

    // Clicks fuera → cerrar overlays
    if (!e.target.closest('#avatar-wrap')) closeAvatar();
    if (!e.target.closest('.rail-admin')) closeFlyout();
  }

  function onKey(e) {
    if (e.key === 'Escape') { closeFlyout(); closeAvatar(); }
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
