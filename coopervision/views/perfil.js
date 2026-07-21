/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/perfil.js
   Vista de perfil de usuario. Accesible para ambos roles.
   3 cards: Datos personales · Seguridad · Acerca de.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ── get session user ─────────────────────────────────────── */
  function getUser(md) {
    var uid = md.sesion && md.sesion.usuario_actual_id;
    var u   = uid && (md.usuarios || []).find(function (x) { return x.id === uid; });
    if (!u) u = (md.usuarios || []).find(function (x) { return x.rol === 'admin'; });
    if (!u) u = (md.usuarios || [])[0];
    return u || { id: 1, nombre: 'Usuario', email: 'usuario@coopervision.es', rol: 'user', activo: true };
  }

  /* ════ RENDER DEFAULT ════════════════════════════════════ */
  function renderDefault(ctx) {
    var u    = getUser(ctx.md);
    var role = ctx.role || 'user';
    var rolPill = role === 'admin'
      ? '<span class="pill pill-accent pill-sm">Admin</span>'
      : '<span class="pill pill-neutral pill-sm">Usuario</span>';
    var initials = (u.nombre || '').split(/\s+/).slice(0, 2)
      .map(function (w) { return (w[0] || '').toUpperCase(); }).join('');

    return '<div class="page-header"><div class="page-header-left">' +
        '<h1 class="page-title">Mi perfil</h1>' +
      '</div></div>' +

      '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' +

        /* ── Avatar + nombre (visual solo) ── */
        '<div style="display:flex;align-items:center;gap:var(--space-5);padding:var(--space-5) 0">' +
          '<div class="avatar" style="width:56px;height:56px;font-size:20px;font-weight:700;flex-shrink:0">' + enc(initials) + '</div>' +
          '<div>' +
            '<div style="font-family:var(--font-display);font-size:18px;font-weight:700;letter-spacing:-.015em">' + enc(u.nombre) + '</div>' +
            '<div style="display:flex;align-items:center;gap:8px;margin-top:4px">' +
              '<span class="body-sm c-muted">' + enc(u.email) + '</span>' +
              rolPill +
            '</div>' +
          '</div>' +
        '</div>' +

        /* ── Card Datos personales ── */
        '<div class="card">' +
          '<h2 class="display-md" style="margin-bottom:var(--space-5)">Datos personales</h2>' +
          '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' +
            '<div class="form-group">' +
              '<label class="form-label" for="prf-nombre">Nombre completo</label>' +
              '<input class="input" id="prf-nombre" type="text" value="' + enc(u.nombre) + '" autocomplete="name">' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label" for="prf-email">Email</label>' +
              '<input class="input" id="prf-email" type="email" value="' + enc(u.email) + '" disabled>' +
              '<span class="form-hint">El email no se puede modificar desde aquí. Contacta con el administrador.</span>' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label">Rol</label>' +
              '<div style="margin-top:4px;display:flex;align-items:center;gap:8px">' +
                rolPill +
                '<span class="body-xs c-muted">' + (role === 'admin' ? 'Acceso total a todas las funciones.' : 'Solo lectura · no puede editar datos.') + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div style="margin-top:var(--space-6);display:flex;justify-content:flex-end">' +
            '<button class="btn btn-primary btn-sm" id="prf-save">' +
              '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar cambios</button>' +
          '</div>' +
        '</div>' +

        /* ── Card Seguridad ── */
        '<div class="card">' +
          '<h2 class="display-md" style="margin-bottom:var(--space-5)">Seguridad</h2>' +
          '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' +
            '<div class="form-group">' +
              '<label class="form-label" for="prf-pwd-cur">Contraseña actual</label>' +
              '<input class="input" id="prf-pwd-cur" type="password" placeholder="••••••••" autocomplete="current-password">' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label" for="prf-pwd-new">Nueva contraseña</label>' +
              '<input class="input" id="prf-pwd-new" type="password" placeholder="Mínimo 8 caracteres" autocomplete="new-password">' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label" for="prf-pwd-confirm">Confirmar nueva contraseña</label>' +
              '<input class="input" id="prf-pwd-confirm" type="password" placeholder="Repite la contraseña" autocomplete="new-password">' +
              '<span class="form-error" id="prf-pwd-err" style="display:none">Las contraseñas no coinciden.</span>' +
            '</div>' +
          '</div>' +
          '<div style="margin-top:var(--space-6);display:flex;justify-content:flex-end">' +
            '<button class="btn btn-ghost btn-sm" id="prf-pwd-save">' +
              '<iconify-icon icon="iconoir:lock" width="14"></iconify-icon>Cambiar contraseña</button>' +
          '</div>' +
        '</div>' +

      '</div>'; /* max-width wrapper */
  }

  /* ════ RENDER LOADING ════════════════════════════════════ */
  function renderLoading() {
    return '<div class="page-header"><div class="page-header-left">' +
        '<span class="skeleton sk-text-sm" style="width:80px;display:block;margin-bottom:8px"></span>' +
        '<span class="skeleton" style="width:180px;height:30px;display:block"></span>' +
      '</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:var(--space-5)">' +
        '<div class="card" style="min-height:240px"><span class="skeleton" style="display:block;height:100%;border-radius:var(--radius-md)"></span></div>' +
        '<div class="card" style="min-height:200px"><span class="skeleton" style="display:block;height:100%;border-radius:var(--radius-md)"></span></div>' +
      '</div>';
  }

  /* ════ RENDER ERROR ══════════════════════════════════════ */
  function renderError(ctx) {
    return '<div class="page-header"><div class="page-header-left">' +
        '<h1 class="page-title">Mi perfil</h1>' +
      '</div></div>' +
      '<div class="card view-stub"><div class="error-state">' +
        '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
        '<h2 class="state-title">Error al cargar el perfil</h2>' +
        '<button class="btn btn-primary btn-sm" data-action="retry">' +
          '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
  }

  /* ════ MOUNTED ═══════════════════════════════════════════ */
  function mounted(root, state, ctx) {
    if (state !== 'default') return;

    /* Guardar datos personales */
    var saveBtn = root.querySelector('#prf-save');
    if (saveBtn) saveBtn.addEventListener('click', function () {
      var nombre = (root.querySelector('#prf-nombre') || {}).value || '';
      if (!nombre.trim()) {
        ctx.toast('error', 'Nombre requerido', 'El nombre no puede estar vacío.'); return;
      }
      ctx.toast('success', 'Perfil actualizado', 'Los cambios se han guardado correctamente.');
    });

    /* Cambiar contraseña — validación live */
    var pwdNew   = root.querySelector('#prf-pwd-new');
    var pwdConf  = root.querySelector('#prf-pwd-confirm');
    var pwdErr   = root.querySelector('#prf-pwd-err');

    function checkMatch() {
      if (!pwdNew || !pwdConf || !pwdErr) return;
      var mismatch = pwdNew.value.length > 0 && pwdConf.value.length > 0 && pwdNew.value !== pwdConf.value;
      pwdErr.style.display = mismatch ? '' : 'none';
      pwdConf.classList.toggle('input-error', mismatch);
    }
    if (pwdNew)  pwdNew.addEventListener('input', checkMatch);
    if (pwdConf) pwdConf.addEventListener('input', checkMatch);

    /* Cambiar contraseña — submit */
    var pwdSave = root.querySelector('#prf-pwd-save');
    if (pwdSave) pwdSave.addEventListener('click', function () {
      var cur  = (root.querySelector('#prf-pwd-cur')  || {}).value || '';
      var nw   = (pwdNew  || {}).value || '';
      var conf = (pwdConf || {}).value || '';
      if (!cur.trim()) {
        ctx.toast('error', 'Campo requerido', 'Introduce tu contraseña actual.'); return;
      }
      if (!nw.trim()) {
        ctx.toast('error', 'Campo requerido', 'Introduce la nueva contraseña.'); return;
      }
      if (nw.length < 8) {
        ctx.toast('error', 'Contraseña demasiado corta', 'La nueva contraseña debe tener al menos 8 caracteres.'); return;
      }
      if (nw !== conf) {
        ctx.toast('error', 'Las contraseñas no coinciden', 'La confirmación no coincide con la nueva contraseña.'); return;
      }
      /* OK */
      ctx.toast('success', 'Contraseña cambiada', 'Tu contraseña se ha actualizado correctamente.');
      ['#prf-pwd-cur', '#prf-pwd-new', '#prf-pwd-confirm'].forEach(function (s) {
        var el = root.querySelector(s); if (el) el.value = '';
      });
      if (pwdErr) { pwdErr.style.display = 'none'; }
      if (pwdConf) pwdConf.classList.remove('input-error');
    });
  }

  window.cpvViews = window.cpvViews || {};
  window.cpvViews['/perfil'] = {
    render: function (state, ctx) {
      if (state === 'loading') return renderLoading(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted,
  };
})();
