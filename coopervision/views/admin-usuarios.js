/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-usuarios.js — A1
   CRUD de usuarios. Tabla densa · menú ⋯ · modales.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function initials(nombre) {
    return (nombre || '').split(/\s+/).slice(0, 2)
      .map(function (w) { return (w[0] || '').toUpperCase(); }).join('');
  }
  function timeAgo(iso) {
    var ms = Date.now() - new Date(iso).getTime();
    var m = Math.floor(ms / 60000), h = Math.floor(ms / 3600000), d = Math.floor(ms / 86400000);
    if (m < 60) return 'hace ' + m + ' min';
    if (h < 24) return 'hace ' + h + 'h';
    if (d === 1) return 'ayer';
    return 'hace ' + d + ' días';
  }

  /* ── module state ─────────────────────────────────────────── */
  var _menuEl      = null;
  var _menuUid     = null;
  var _outsideH    = null;
  var _activoState = {}; // overrides in-memory: { userId: bool }

  function teardown() {
    if (_menuEl)   { try { _menuEl.remove(); } catch (e) {} _menuEl = null; }
    if (_outsideH) { document.removeEventListener('click', _outsideH); _outsideH = null; }
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
  function closeMenu() { if (_menuEl) _menuEl.classList.remove('open'); _menuUid = null; }

  /* ── row HTML ─────────────────────────────────────────────── */
  function userRow(u) {
    var activo  = _activoState[u.id] !== undefined ? _activoState[u.id] : u.activo;
    var rolPill = u.rol === 'admin'
      ? '<span class="pill pill-accent pill-sm">Admin</span>'
      : '<span class="pill pill-paused pill-sm">Usuario</span>';
    var nameColor = activo ? '' : 'color:var(--muted);';
    return '<tr data-uid="' + u.id + '">' +
      '<td>' +
        '<div style="display:flex;align-items:center;gap:8px">' +
          '<div class="avatar" style="width:24px;height:24px;font-size:9px;flex-shrink:0">' + enc(initials(u.nombre)) + '</div>' +
          '<span style="font-weight:500;' + nameColor + '">' + enc(u.nombre) +
            (activo ? '' : ' <span class="body-xs" style="color:var(--muted-2)">(inactivo)</span>') + '</span>' +
        '</div>' +
      '</td>' +
      '<td class="body-xs c-ink2">' + enc(u.email) + '</td>' +
      '<td>' + rolPill + '</td>' +
      '<td class="body-xs c-muted tnum">' + enc(timeAgo(u.ultimo_acceso)) + '</td>' +
      '<td class="cpv-bbdd-menu-col">' +
        '<button class="cpv-bbdd-menu-btn" data-menu-user="' + u.id + '" aria-label="Acciones">' +
          '<iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button>' +
      '</td>' +
    '</tr>';
  }

  /* ── open row menu ────────────────────────────────────────── */
  function openMenu(btn, uid, md, ctx) {
    var m = ensureMenu();
    if (_menuUid === uid && m.classList.contains('open')) { closeMenu(); return; }
    _menuUid = uid;

    var u      = md.usuarios.find(function (x) { return x.id === uid; });
    var activo = _activoState[uid] !== undefined ? _activoState[uid] : (u ? u.activo : true);

    m.innerHTML =
      '<button class="dropdown-item" data-ua="edit"><iconify-icon icon="iconoir:edit-pencil" width="16"></iconify-icon>Editar</button>' +
      '<button class="dropdown-item" data-ua="rol"><iconify-icon icon="iconoir:user-badge-check" width="16"></iconify-icon>Cambiar rol</button>' +
      '<button class="dropdown-item" data-ua="pwd"><iconify-icon icon="iconoir:lock" width="16"></iconify-icon>Resetear contraseña</button>' +
      '<button class="dropdown-item" data-ua="toggle">' +
        '<iconify-icon icon="iconoir:' + (activo ? 'user-x-mark' : 'user') + '" width="16"></iconify-icon>' +
        (activo ? 'Desactivar' : 'Reactivar') +
      '</button>' +
      '<div class="dropdown-divider"></div>' +
      '<button class="dropdown-item danger" data-ua="del"><iconify-icon icon="iconoir:trash" width="16"></iconify-icon>Eliminar</button>';

    var r  = btn.getBoundingClientRect();
    m.classList.add('open');
    var mw = m.offsetWidth || 198, mh = m.offsetHeight || 148;
    var top = r.bottom + 4; if (top + mh > window.innerHeight - 8) top = r.top - mh - 4;
    var lft = r.right - mw;  if (lft < 8) lft = 8;
    m.style.left = lft + 'px';
    m.style.top  = top + 'px';

    m.onclick = function (e) {
      var it = e.target.closest('[data-ua]'); if (!it) return;
      closeMenu();
      handleAction(it.getAttribute('data-ua'), uid, md, ctx);
    };
  }

  function handleAction(act, uid, md, ctx) {
    var root  = document.querySelector('#view-root');
    var u     = md.usuarios.find(function (x) { return x.id === uid; });
    var activo = _activoState[uid] !== undefined ? _activoState[uid] : (u ? u.activo : true);

    if (act === 'edit' && root && u) {
      var nb = root.querySelector('#edit-nombre'); if (nb) nb.value = u.nombre;
      var eb = root.querySelector('#edit-email');  if (eb) eb.value = u.email;
      root.querySelectorAll('input[name="edit-rol"]').forEach(function (r) { r.checked = r.value === u.rol; });
      var modal = root.querySelector('#usr-modal-edit');
      if (modal) { modal.dataset.editId = uid; modal.style.display = 'flex'; }

    } else if (act === 'rol') {
      var newRol = (u && u.rol === 'admin') ? 'usuario' : 'admin';
      ctx.toast('success', 'Rol actualizado', (u ? u.nombre : 'Usuario') + ' ahora tiene rol ' + newRol + '.');

    } else if (act === 'pwd') {
      ctx.toast('info', 'Email enviado', 'Se ha enviado enlace de restablecimiento a ' + (u ? u.email : '') + '.');

    } else if (act === 'toggle' && root) {
      _activoState[uid] = !activo;
      var oldRow = root.querySelector('tr[data-uid="' + uid + '"]');
      if (oldRow) {
        var tmp = document.createElement('tbody');
        tmp.innerHTML = userRow(Object.assign({}, u, { activo: !activo }));
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
      if (db) db.textContent = '¿Eliminar la cuenta de ' + (u ? u.nombre : 'este usuario') +
        '? Esta acción no se puede deshacer.';
      var delModal = root.querySelector('#usr-modal-del');
      if (delModal) { delModal.dataset.delId = uid; delModal.style.display = 'flex'; }
    }
  }

  /* ── modals HTML ──────────────────────────────────────────── */
  function modalsHTML() {
    return (
      /* ── Nuevo usuario ── */
      '<div class="modal-overlay" id="usr-modal-new" style="display:none">' +
        '<div class="modal"><div class="modal-header">' +
          '<h2 class="modal-title">Nuevo usuario</h2>' +
          '<button class="btn-icon btn-lg" data-modal-close="usr-modal-new">' +
            '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
        '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' +
          '<div class="form-group"><label class="form-label">Nombre completo</label>' +
            '<input class="input" id="new-nombre" type="text" placeholder="Nombre Apellido" autocomplete="off"></div>' +
          '<div class="form-group"><label class="form-label">Email</label>' +
            '<input class="input" id="new-email" type="email" placeholder="nombre@coopervision.es"></div>' +
          '<div class="form-group"><label class="form-label">Rol</label>' +
            '<div style="display:flex;flex-direction:column;gap:var(--space-3);margin-top:4px">' +
              '<label class="radio-wrap"><input class="radio" type="radio" name="new-rol" value="user" checked>' +
                '<span class="toggle-text">Usuario — solo lectura</span></label>' +
              '<label class="radio-wrap"><input class="radio" type="radio" name="new-rol" value="admin">' +
                '<span class="toggle-text">Administrador — acceso total</span></label>' +
            '</div></div>' +
          '<p class="form-hint" style="display:flex;align-items:center;gap:5px;margin:0">' +
            '<iconify-icon icon="iconoir:mail" width="13" style="color:var(--muted)"></iconify-icon>' +
            'Se enviará un email con contraseña temporal.</p>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-ghost btn-sm" data-modal-close="usr-modal-new">Cancelar</button>' +
          '<button class="btn btn-primary btn-sm" id="new-usr-confirm">' +
            '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Crear usuario</button>' +
        '</div></div></div>' +

      /* ── Editar usuario ── */
      '<div class="modal-overlay" id="usr-modal-edit" style="display:none">' +
        '<div class="modal"><div class="modal-header">' +
          '<h2 class="modal-title">Editar usuario</h2>' +
          '<button class="btn-icon btn-lg" data-modal-close="usr-modal-edit">' +
            '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
        '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' +
          '<div class="form-group"><label class="form-label">Nombre completo</label>' +
            '<input class="input" id="edit-nombre" type="text"></div>' +
          '<div class="form-group"><label class="form-label">Email</label>' +
            '<input class="input" id="edit-email" type="email"></div>' +
          '<div class="form-group"><label class="form-label">Rol</label>' +
            '<div style="display:flex;flex-direction:column;gap:var(--space-3);margin-top:4px">' +
              '<label class="radio-wrap"><input class="radio" type="radio" name="edit-rol" value="user">' +
                '<span class="toggle-text">Usuario</span></label>' +
              '<label class="radio-wrap"><input class="radio" type="radio" name="edit-rol" value="admin">' +
                '<span class="toggle-text">Administrador</span></label>' +
            '</div></div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-ghost btn-sm" data-modal-close="usr-modal-edit">Cancelar</button>' +
          '<button class="btn btn-primary btn-sm" id="edit-usr-confirm">' +
            '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar cambios</button>' +
        '</div></div></div>' +

      /* ── Confirmar eliminar ── */
      '<div class="modal-overlay" id="usr-modal-del" style="display:none">' +
        '<div class="modal"><div class="modal-header">' +
          '<h2 class="modal-title">Eliminar usuario</h2>' +
          '<button class="btn-icon btn-lg" data-modal-close="usr-modal-del">' +
            '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
        '<p class="modal-body" id="usr-del-body" style="margin:0">¿Eliminar este usuario? Esta acción no se puede deshacer.</p>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-ghost btn-sm" data-modal-close="usr-modal-del">Cancelar</button>' +
          '<button class="btn btn-destructive btn-sm" id="del-usr-confirm">' +
            '<iconify-icon icon="iconoir:trash" width="14"></iconify-icon>Eliminar</button>' +
        '</div></div></div>'
    );
  }

  /* ── page header ──────────────────────────────────────────── */
  function pageHeader(count) {
    return '<div class="page-header"><div class="page-header-left">' +
      '<h1 class="page-title">Gestión de usuarios</h1>' +
      '<p class="page-subtitle">' + count + ' usuarios activos</p>' +
    '</div><div class="page-header-right">' +
      '<button class="btn btn-primary btn-sm" id="usr-new-btn">' +
        '<iconify-icon icon="iconoir:plus" width="14"></iconify-icon>Nuevo usuario</button>' +
    '</div></div>';
  }

  /* ════ RENDER DEFAULT ═══════════════════════════════════════ */
  function renderDefault(ctx) {
    var md     = ctx.md;
    var nav    = window.cpvAdmin ? window.cpvAdmin.subnav('usuarios', md) : '';
    var activos = md.usuarios.filter(function (u) { return u.activo; }).length;
    var rows   = md.usuarios.map(userRow).join('');

    return pageHeader(activos) + nav +
      '<div class="table-wrap">' +
        '<table class="table-dense">' +
          '<thead><tr>' +
            '<th style="width:240px">Nombre</th>' +
            '<th>Email</th>' +
            '<th style="width:90px">Rol</th>' +
            '<th style="width:130px">Último acceso</th>' +
            '<th class="cpv-bbdd-menu-col"></th>' +
          '</tr></thead>' +
          '<tbody id="usr-tbody">' + rows + '</tbody>' +
        '</table>' +
      '</div>' +
      modalsHTML();
  }

  /* ════ RENDER LOADING ═══════════════════════════════════════ */
  function renderLoading(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('usuarios', ctx.md) : '';
    var rows = Array(8).fill(0).map(function () {
      return '<tr class="cpv-bbdd-skrow">' +
        '<td><span class="skeleton" style="width:60%"></span></td>' +
        '<td><span class="skeleton" style="width:75%"></span></td>' +
        '<td><span class="skeleton" style="width:50px"></span></td>' +
        '<td><span class="skeleton" style="width:60px"></span></td>' +
        '<td></td></tr>';
    }).join('');
    return '<div class="page-header"><div class="page-header-left">' +
        '<span class="skeleton sk-text-sm" style="width:100px;display:block;margin-bottom:8px"></span>' +
        '<span class="skeleton" style="width:220px;height:30px;display:block"></span>' +
      '</div></div>' + nav +
      '<div class="table-wrap"><table class="table-dense">' +
        '<thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Último acceso</th><th></th></tr></thead>' +
        '<tbody>' + rows + '</tbody></table></div>';
  }

  /* ════ RENDER EMPTY / ERROR ═════════════════════════════════ */
  function renderEmpty(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('usuarios', ctx.md) : '';
    return pageHeader(0) + nav +
      '<div class="card view-stub"><div class="empty-state">' +
        '<iconify-icon class="empty-state-icon" icon="iconoir:group" width="32"></iconify-icon>' +
        '<h2 class="state-title">Sin usuarios</h2>' +
        '<button class="btn btn-primary btn-sm" id="usr-new-btn">' +
          '<iconify-icon icon="iconoir:plus" width="14"></iconify-icon>Nuevo usuario</button>' +
      '</div></div>' + modalsHTML();
  }
  function renderError(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('usuarios', ctx.md) : '';
    return pageHeader(0) + nav +
      '<div class="card view-stub"><div class="error-state">' +
        '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
        '<h2 class="state-title">Error al cargar usuarios</h2>' +
        '<button class="btn btn-primary btn-sm" data-action="retry">' +
          '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
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
      ov.addEventListener('click', function (e) { if (e.target === ov) ov.style.display = 'none'; });
    });

    /* Nuevo usuario — abrir */
    var newBtn = root.querySelector('#usr-new-btn');
    if (newBtn) newBtn.addEventListener('click', function () {
      var m = root.querySelector('#usr-modal-new');
      if (m) {
        m.style.display = 'flex';
        var nb = m.querySelector('#new-nombre'); if (nb) nb.value = '';
        var eb = m.querySelector('#new-email');  if (eb) eb.value = '';
        var rb = m.querySelector('input[name="new-rol"][value="user"]'); if (rb) rb.checked = true;
      }
    });

    /* Nuevo usuario — confirmar */
    var newConfirm = root.querySelector('#new-usr-confirm');
    if (newConfirm) newConfirm.addEventListener('click', function () {
      var nombre = (root.querySelector('#new-nombre') || {}).value || '';
      var email  = (root.querySelector('#new-email')  || {}).value || '';
      if (!nombre.trim() || !email.trim()) {
        ctx.toast('error', 'Campos requeridos', 'Completa nombre y email antes de continuar.'); return;
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
      if (state === 'empty')   return renderEmpty(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted,
  };
})();
