/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-cadenas.js — A4
   Lista maestra de cadenas. Filtro ES/PT · modal nueva/editar · ⋯.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────────── */
  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function trunc(arr, n) {
    if (!arr || arr.length === 0) return '<span class="c-muted-2">—</span>';
    var str = arr.slice(0, n).join(', ');
    return enc(str) + (arr.length > n ? ' <span class="c-muted" style="font-size:11px">+' + (arr.length - n) + '</span>' : '');
  }

  /* ── module state ─────────────────────────────────────────── */
  var _filtro   = 'todas'; // 'todas' | 'ES' | 'PT'
  var _menuEl   = null, _menuCadId = null, _outsideH = null;

  function teardown() {
    if (_menuEl)   { try { _menuEl.remove(); } catch (e) {} _menuEl = null; }
    if (_outsideH) { document.removeEventListener('click', _outsideH); _outsideH = null; }
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
  function closeMenu() { if (_menuEl) _menuEl.classList.remove('open'); _menuCadId = null; }

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
      return '<tr><td colspan="5">' +
        '<div class="empty-state" style="min-height:180px">' +
          '<iconify-icon class="empty-state-icon" icon="iconoir:network-left" width="28"></iconify-icon>' +
          '<h2 class="state-title" style="font-size:16px">Sin cadenas para este filtro</h2>' +
        '</div></td></tr>';
    }
    return cadenas.map(function (c) {
      var paisPill = c.pais === 'ES'
        ? '<span class="pill pill-accent pill-sm">ES</span>'
        : '<span class="pill pill-neutral pill-sm">PT</span>';
      return '<tr data-cad-id="' + c.id + '">' +
        '<td style="font-weight:600">' + enc(c.nombre) + '</td>' +
        '<td class="body-xs c-ink2">' + trunc(c.keywords, 3) + '</td>' +
        '<td class="body-xs c-ink2">' + trunc(c.dominios, 2) + '</td>' +
        '<td>' + paisPill + '</td>' +
        '<td class="cpv-bbdd-menu-col">' +
          '<button class="cpv-bbdd-menu-btn" data-menu-cad="' + c.id + '" aria-label="Acciones">' +
            '<iconify-icon icon="iconoir:more-horiz" width="18"></iconify-icon></button>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  /* ── open row menu ────────────────────────────────────────── */
  function openMenu(btn, cadId, md, ctx) {
    var m = ensureMenu();
    if (_menuCadId === cadId && m.classList.contains('open')) { closeMenu(); return; }
    _menuCadId = cadId;

    m.innerHTML =
      '<button class="dropdown-item" data-ca="edit"><iconify-icon icon="iconoir:edit-pencil" width="16"></iconify-icon>Editar</button>' +
      '<button class="dropdown-item" data-ca="reapply"><iconify-icon icon="iconoir:refresh-double" width="16"></iconify-icon>Re-aplicar detección</button>' +
      '<div class="dropdown-divider"></div>' +
      '<button class="dropdown-item danger" data-ca="del"><iconify-icon icon="iconoir:trash" width="16"></iconify-icon>Eliminar</button>';

    var r  = btn.getBoundingClientRect();
    m.classList.add('open');
    var mw = m.offsetWidth || 198, mh = m.offsetHeight || 112;
    var top = r.bottom + 4; if (top + mh > window.innerHeight - 8) top = r.top - mh - 4;
    var lft = r.right - mw;  if (lft < 8) lft = 8;
    m.style.left = lft + 'px';
    m.style.top  = top + 'px';

    m.onclick = function (e) {
      var it = e.target.closest('[data-ca]'); if (!it) return;
      closeMenu();
      handleAction(it.getAttribute('data-ca'), cadId, md, ctx);
    };
  }

  function handleAction(act, cadId, md, ctx) {
    var root = document.querySelector('#view-root');
    var c    = (md.cadenas || []).find(function (x) { return x.id === cadId; });

    if (act === 'edit' && root && c) {
      var en = root.querySelector('#edit-cad-nombre'); if (en) en.value = c.nombre;
      var ek = root.querySelector('#edit-cad-kw');     if (ek) ek.value = (c.keywords || []).join(', ');
      var ed = root.querySelector('#edit-cad-dom');    if (ed) ed.value = (c.dominios || []).join(', ');
      root.querySelectorAll('input[name="edit-cad-pais"]').forEach(function (r) { r.checked = r.value === c.pais; });
      var modal = root.querySelector('#cad-modal-edit');
      if (modal) { modal.dataset.editId = cadId; modal.style.display = 'flex'; }

    } else if (act === 'reapply') {
      ctx.toast('info', 'Recalculando detección', 'Procesando ' + grp(18234) + ' ópticas…');
      setTimeout(function () {
        ctx.toast('success', 'Detección completada', 'Cadena actualizada en las ópticas de la BBDD.');
      }, 2500);

    } else if (act === 'del' && root) {
      var n = countOpticas(md, cadId);
      var db = root.querySelector('#cad-del-body');
      if (db) db.innerHTML = '¿Eliminar la cadena <b>' + enc(c ? c.nombre : '') + '</b>?<br>' +
        (n > 0
          ? '<span class="body-sm c-muted" style="display:block;margin-top:6px">Hay <b>' + n + ' óptica' + (n === 1 ? '' : 's') +
            '</b> asociada' + (n === 1 ? '' : 's') + '. Quedarán como independientes.</span>'
          : '<span class="body-sm c-muted" style="display:block;margin-top:6px">No hay ópticas asociadas.</span>');
      var delModal = root.querySelector('#cad-modal-del');
      if (delModal) { delModal.dataset.delId = cadId; delModal.style.display = 'flex'; }
    }
  }

  function grp(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

  /* ── modals HTML ──────────────────────────────────────────── */
  function modalsHTML() {
    return (
      /* ── Nueva cadena ── */
      '<div class="modal-overlay" id="cad-modal-new" style="display:none">' +
        '<div class="modal"><div class="modal-header">' +
          '<h2 class="modal-title">Nueva cadena</h2>' +
          '<button class="btn-icon btn-lg" data-modal-close="cad-modal-new">' +
            '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
        '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' +
          '<div class="form-group"><label class="form-label">Nombre</label>' +
            '<input class="input" id="new-cad-nombre" type="text" placeholder="Ej: Visionlab" autocomplete="off"></div>' +
          '<div class="form-group"><label class="form-label">Keywords <span class="form-hint" style="font-weight:400">(una por línea o separadas por comas)</span></label>' +
            '<textarea class="textarea" id="new-cad-kw" rows="3" placeholder="visionlab&#10;vision lab"></textarea></div>' +
          '<div class="form-group"><label class="form-label">Dominios</label>' +
            '<textarea class="textarea" id="new-cad-dom" rows="2" placeholder="visionlab.es"></textarea></div>' +
          '<div class="form-group"><label class="form-label">País</label>' +
            '<div style="display:flex;gap:var(--space-6);margin-top:4px">' +
              '<label class="radio-wrap"><input class="radio" type="radio" name="new-cad-pais" value="ES" checked>' +
                '<span class="toggle-text">España (ES)</span></label>' +
              '<label class="radio-wrap"><input class="radio" type="radio" name="new-cad-pais" value="PT">' +
                '<span class="toggle-text">Portugal (PT)</span></label>' +
            '</div></div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-ghost btn-sm" data-modal-close="cad-modal-new">Cancelar</button>' +
          '<button class="btn btn-primary btn-sm" id="new-cad-confirm">' +
            '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Crear cadena</button>' +
        '</div></div></div>' +

      /* ── Editar cadena ── */
      '<div class="modal-overlay" id="cad-modal-edit" style="display:none">' +
        '<div class="modal"><div class="modal-header">' +
          '<h2 class="modal-title">Editar cadena</h2>' +
          '<button class="btn-icon btn-lg" data-modal-close="cad-modal-edit">' +
            '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
        '<div class="modal-body" style="display:flex;flex-direction:column;gap:var(--space-5)">' +
          '<div class="form-group"><label class="form-label">Nombre</label>' +
            '<input class="input" id="edit-cad-nombre" type="text"></div>' +
          '<div class="form-group"><label class="form-label">Keywords</label>' +
            '<textarea class="textarea" id="edit-cad-kw" rows="3"></textarea></div>' +
          '<div class="form-group"><label class="form-label">Dominios</label>' +
            '<textarea class="textarea" id="edit-cad-dom" rows="2"></textarea></div>' +
          '<div class="form-group"><label class="form-label">País</label>' +
            '<div style="display:flex;gap:var(--space-6);margin-top:4px">' +
              '<label class="radio-wrap"><input class="radio" type="radio" name="edit-cad-pais" value="ES">' +
                '<span class="toggle-text">España (ES)</span></label>' +
              '<label class="radio-wrap"><input class="radio" type="radio" name="edit-cad-pais" value="PT">' +
                '<span class="toggle-text">Portugal (PT)</span></label>' +
            '</div></div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-ghost btn-sm" data-modal-close="cad-modal-edit">Cancelar</button>' +
          '<button class="btn btn-primary btn-sm" id="edit-cad-confirm">' +
            '<iconify-icon icon="iconoir:check" width="14"></iconify-icon>Guardar cambios</button>' +
        '</div></div></div>' +

      /* ── Eliminar cadena ── */
      '<div class="modal-overlay" id="cad-modal-del" style="display:none">' +
        '<div class="modal"><div class="modal-header">' +
          '<h2 class="modal-title">Eliminar cadena</h2>' +
          '<button class="btn-icon btn-lg" data-modal-close="cad-modal-del">' +
            '<iconify-icon icon="iconoir:xmark" width="16"></iconify-icon></button></div>' +
        '<div class="modal-body" id="cad-del-body" style="margin:0">¿Eliminar esta cadena?</div>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-ghost btn-sm" data-modal-close="cad-modal-del">Cancelar</button>' +
          '<button class="btn btn-subtle btn-sm" id="del-cad-indie" style="margin-right:auto">' +
            'Convertir en independientes</button>' +
          '<button class="btn btn-destructive btn-sm" id="del-cad-confirm">' +
            '<iconify-icon icon="iconoir:trash" width="14"></iconify-icon>Eliminar</button>' +
        '</div></div></div>'
    );
  }

  /* ── page header ──────────────────────────────────────────── */
  function pageHeader(total) {
    return '<div class="page-header"><div class="page-header-left">' +
      '<h1 class="page-title">Lista maestra de cadenas</h1>' +
      '<p class="page-subtitle">' + total + ' cadenas</p>' +
    '</div><div class="page-header-right">' +
      '<button class="btn btn-primary btn-sm" id="cad-new-btn">' +
        '<iconify-icon icon="iconoir:plus" width="14"></iconify-icon>Nueva cadena</button>' +
    '</div></div>';
  }

  /* ── filter tabs ──────────────────────────────────────────── */
  function filterTabsHTML(md, filtro) {
    var total = (md.cadenas || []).length;
    var es    = (md.cadenas || []).filter(function (c) { return c.pais === 'ES'; }).length;
    var pt    = (md.cadenas || []).filter(function (c) { return c.pais === 'PT'; }).length;
    function tab(key, label, count) {
      return '<button class="cpv-filter-tab' + (filtro === key ? ' active' : '') + '" data-filter="' + key + '">' +
        enc(label) + ' <span class="cpv-filter-tab-count">' + count + '</span></button>';
    }
    return '<div class="cpv-filter-tabs" style="display:flex;gap:2px;margin-bottom:var(--space-5)">' +
      tab('todas', 'Todas', total) +
      tab('ES', 'España', es) +
      tab('PT', 'Portugal', pt) +
    '</div>';
  }

  /* ════ RENDER DEFAULT ═══════════════════════════════════════ */
  function renderDefault(ctx) {
    var md  = ctx.md;
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('cadenas', md) : '';
    var total = (md.cadenas || []).length;

    return pageHeader(total) + nav +
      filterTabsHTML(md, _filtro) +
      '<div class="table-wrap" id="cad-table-wrap">' +
        '<table class="table-dense">' +
          '<thead><tr>' +
            '<th style="width:200px">Nombre</th>' +
            '<th>Keywords</th>' +
            '<th>Dominios</th>' +
            '<th style="width:70px">País</th>' +
            '<th class="cpv-bbdd-menu-col"></th>' +
          '</tr></thead>' +
          '<tbody id="cad-tbody">' + tbodyHTML(md, _filtro) + '</tbody>' +
        '</table>' +
      '</div>' +
      modalsHTML();
  }

  /* ════ RENDER LOADING ═══════════════════════════════════════ */
  function renderLoading(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('cadenas', ctx.md) : '';
    var rows = Array(10).fill(0).map(function () {
      return '<tr class="cpv-bbdd-skrow">' +
        '<td><span class="skeleton" style="width:55%"></span></td>' +
        '<td><span class="skeleton" style="width:70%"></span></td>' +
        '<td><span class="skeleton" style="width:60%"></span></td>' +
        '<td><span class="skeleton" style="width:30px"></span></td>' +
        '<td></td></tr>';
    }).join('');
    return '<div class="page-header"><div class="page-header-left">' +
        '<span class="skeleton sk-text-sm" style="width:100px;display:block;margin-bottom:8px"></span>' +
        '<span class="skeleton" style="width:220px;height:30px;display:block"></span>' +
      '</div></div>' + nav +
      '<div class="table-wrap"><table class="table-dense">' +
        '<thead><tr><th>Nombre</th><th>Keywords</th><th>Dominios</th><th>País</th><th></th></tr></thead>' +
        '<tbody>' + rows + '</tbody></table></div>';
  }

  /* ════ RENDER EMPTY / ERROR ═════════════════════════════════ */
  function renderEmpty(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('cadenas', ctx.md) : '';
    return pageHeader(0) + nav +
      '<div class="card view-stub"><div class="empty-state">' +
        '<iconify-icon class="empty-state-icon" icon="iconoir:network-left" width="32"></iconify-icon>' +
        '<h2 class="state-title">Sin cadenas registradas</h2>' +
        '<button class="btn btn-primary btn-sm" id="cad-new-btn">' +
          '<iconify-icon icon="iconoir:plus" width="14"></iconify-icon>Nueva cadena</button>' +
      '</div></div>' + modalsHTML();
  }
  function renderError(ctx) {
    var nav = window.cpvAdmin ? window.cpvAdmin.subnav('cadenas', ctx.md) : '';
    return pageHeader(0) + nav +
      '<div class="card view-stub"><div class="error-state">' +
        '<iconify-icon class="error-state-icon" icon="iconoir:warning-triangle" width="32"></iconify-icon>' +
        '<h2 class="state-title">Error al cargar cadenas</h2>' +
        '<button class="btn btn-primary btn-sm" data-action="retry">' +
          '<iconify-icon icon="iconoir:refresh-double" width="14"></iconify-icon>Reintentar</button>' +
      '</div></div>';
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
      ov.addEventListener('click', function (e) { if (e.target === ov) ov.style.display = 'none'; });
    });

    /* Nueva cadena — abrir */
    var newBtn = root.querySelector('#cad-new-btn');
    if (newBtn) newBtn.addEventListener('click', function () {
      var m = root.querySelector('#cad-modal-new');
      if (m) {
        m.style.display = 'flex';
        ['#new-cad-nombre','#new-cad-kw','#new-cad-dom'].forEach(function (s) {
          var el = m.querySelector(s); if (el) el.value = '';
        });
        var rb = m.querySelector('input[name="new-cad-pais"][value="ES"]'); if (rb) rb.checked = true;
      }
    });

    /* Nueva cadena — confirmar */
    var newConfirm = root.querySelector('#new-cad-confirm');
    if (newConfirm) newConfirm.addEventListener('click', function () {
      var nombre = (root.querySelector('#new-cad-nombre') || {}).value || '';
      if (!nombre.trim()) { ctx.toast('error', 'Nombre requerido', 'Escribe un nombre para la cadena.'); return; }
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
      if (state === 'empty')   return renderEmpty(ctx);
      if (state === 'error')   return renderError(ctx);
      return renderDefault(ctx);
    },
    mounted: mounted,
  };
})();
