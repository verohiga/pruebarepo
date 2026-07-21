/* ════════════════════════════════════════════════════════════════
   CooperVision Iberia · views/admin-shared.js
   Helper compartido: sub-navegación horizontal del área admin.
   Expuesto como window.cpvAdmin.subnav(active, md) → HTML string.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function enc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function subnav(active, md) {
    var pending = ((md.matching_candidatos || []).length) +
                  ((md.no_encontrados || []).length);
    var tabs = [
      { key: 'usuarios',    label: 'Usuarios',    href: '#/admin/usuarios'    },
      { key: 'operaciones', label: 'Operaciones', href: '#/admin/operaciones' },
      { key: 'revision',    label: 'Revisión',    href: '#/admin/revision',
        badge: pending > 0 ? String(pending) : null },
      { key: 'cadenas',     label: 'Cadenas',     href: '#/admin/cadenas'     },
      { key: 'logs',        label: 'Logs',        href: '#/admin/logs'        },
    ];
    return '<nav class="tabs-list cpv-admin-subnav">' +
      tabs.map(function (t) {
        var badge = t.badge
          ? '<span class="cpv-admin-badge">' + enc(t.badge) + '</span>'
          : '';
        return '<a class="tab-trigger' + (t.key === active ? ' active' : '') +
          '" href="' + enc(t.href) + '" style="display:inline-flex;align-items:center;gap:5px;text-decoration:none">' +
          enc(t.label) + badge + '</a>';
      }).join('') +
    '</nav>';
  }

  window.cpvAdmin = { subnav: subnav };
})();
