/**
 * Lógica del panel principal (dashboard.html).
 * Verifica la sesión contra la API (/api/users/me), muestra los datos del
 * usuario autenticado, arma el grid de módulos del sistema según el rol
 * (permissions del rol) y, si corresponde (Jefatura DAE), carga la tabla
 * de gestión de usuarios consumiendo GET /api/users (RF-002, RF-019).
 */
(function () {
  Session.requireAuth();

  const nameEl = document.getElementById('user-name');
  const roleEl = document.getElementById('user-role');
  const statusEl = document.getElementById('dashboard-status');
  const logoutBtn = document.getElementById('logout-btn');
  const moduleGridEl = document.getElementById('module-grid');
  const moduleRoleLabelEl = document.getElementById('module-role-label');
  const usersCardEl = document.getElementById('users-card');
  const usersTableBodyEl = document.getElementById('users-table-body');
  const usersCountEl = document.getElementById('users-count');

  // Catálogo de módulos del sistema (ver ESPECIFICACION_DISENO_SICEN.md y
  // MATRIZ_TRAZABILIDAD_SICEN.md). Solo "users" está implementado en el
  // Avance 1; el resto se muestra como referencia del alcance completo.
  const MODULES = [
    {
      id: 'users',
      icon: '👤',
      title: 'Gestión de Usuarios',
      desc: 'Creación de colaboradores y asignación de roles (RF-002, RF-019).',
      permission: 'users:manage',
      implemented: true,
    },
    {
      id: 'forms',
      icon: '📝',
      title: 'Formularios Censales',
      desc: 'Crear, editar y enviar formularios censales (RF-003 a RF-005, RF-010, RF-011).',
      permission: ['forms:manage', 'forms:fill', 'forms:submit'],
      implemented: false,
    },
    {
      id: 'census',
      icon: '🏫',
      title: 'Ciclo de Vida del Censo',
      desc: 'Configurar, abrir, pausar y cerrar censos (RF-006 a RF-009).',
      permission: ['census:manage', 'census:view'],
      implemented: false,
    },
    {
      id: 'validation',
      icon: '✅',
      title: 'Validación de Datos',
      desc: 'Validar, aceptar o devolver formularios recibidos (RF-012 a RF-014).',
      permission: 'submissions:validate',
      implemented: false,
    },
    {
      id: 'reports',
      icon: '📊',
      title: 'Reportes',
      desc: 'Generar y descargar reportes consolidados (RF-015, RF-016).',
      permission: 'reports:view',
      implemented: false,
    },
    {
      id: 'notifications',
      icon: '🔔',
      title: 'Notificaciones',
      desc: 'Centro de notificaciones del sistema (RF-017).',
      permission: ['notifications:view', 'notifications:send'],
      implemented: false,
    },
    {
      id: 'audit',
      icon: '🕓',
      title: 'Historial de Auditoría',
      desc: 'Historial auditable de acciones del sistema (RF-018).',
      permission: 'audit:view',
      implemented: false,
    },
    {
      id: 'assignment',
      icon: '🧭',
      title: 'Asignación de Técnicos',
      desc: 'Asignar técnicos de la DAE a centros educativos (RF-020).',
      permission: 'users:manage',
      implemented: false,
    },
  ];

  function hasPermission(userPermissions, required) {
    if (!required) return true;
    const list = Array.isArray(required) ? required : [required];
    return list.some((p) => userPermissions.includes(p));
  }

  function renderModules(user) {
    const permissions = Array.isArray(user.permissions) ? user.permissions : [];
    moduleRoleLabelEl.textContent = user.role;
    moduleGridEl.innerHTML = '';

    MODULES.forEach((mod) => {
      const authorized = hasPermission(permissions, mod.permission);
      const available = mod.implemented && authorized;

      const card = document.createElement('div');
      card.className = 'module-card ' + (available ? 'is-available' : 'is-soon');

      let pillHtml;
      if (mod.implemented && authorized) {
        pillHtml = '<span class="pill pill-available">Disponible</span>';
      } else if (mod.implemented && !authorized) {
        pillHtml = '<span class="pill pill-soon">Sin acceso</span>';
      } else {
        pillHtml = '<span class="pill pill-soon">Próximamente</span>';
      }

      card.innerHTML =
        '<span class="module-icon">' + mod.icon + '</span>' +
        '<span class="module-title">' + mod.title + '</span>' +
        '<span class="module-desc">' + mod.desc + '</span>' +
        pillHtml;

      if (available && mod.id === 'users') {
        card.addEventListener('click', () => {
          usersCardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }

      moduleGridEl.appendChild(card);
    });
  }

  function formatDate(value) {
    try {
      return new Date(value).toLocaleDateString('es-CR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return '—';
    }
  }

  async function loadUsersTable() {
    usersCardEl.style.display = 'block';
    try {
      const response = await fetch(`${SICEN_API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${Session.getToken()}` },
      });

      if (!response.ok) {
        usersTableBodyEl.innerHTML =
          '<tr><td colspan="5" class="text-aux">No fue posible cargar la lista de usuarios.</td></tr>';
        return;
      }

      const users = await response.json();
      usersCountEl.textContent = `${users.length} usuario(s) registrado(s)`;

      if (users.length === 0) {
        usersTableBodyEl.innerHTML =
          '<tr><td colspan="5" class="text-aux">Aún no hay usuarios registrados.</td></tr>';
        return;
      }

      usersTableBodyEl.innerHTML = users
        .map((u) => {
          const dotClass = u.status === 'active' ? 'status-dot' : 'status-dot inactive';
          const statusLabel = u.status === 'active' ? 'Activo' : 'Inactivo';
          return (
            '<tr>' +
            `<td>${u.username}</td>` +
            `<td>${u.email}</td>` +
            `<td><span class="role-tag">${u.role}</span></td>` +
            `<td><span class="${dotClass}"></span>${statusLabel}</td>` +
            `<td>${formatDate(u.createdAt)}</td>` +
            '</tr>'
          );
        })
        .join('');
    } catch (err) {
      usersTableBodyEl.innerHTML =
        '<tr><td colspan="5" class="text-aux">No fue posible conectar con el servidor.</td></tr>';
    }
  }

  async function loadProfile() {
    try {
      const response = await fetch(`${SICEN_API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${Session.getToken()}` },
      });

      if (response.status === 401) {
        Session.clear();
        window.location.href = 'index.html';
        return;
      }

      const user = await response.json();
      nameEl.textContent = user.username;
      roleEl.textContent = user.role;
      statusEl.textContent = `Sesión iniciada como ${user.email}.`;

      renderModules(user);

      const permissions = Array.isArray(user.permissions) ? user.permissions : [];
      if (permissions.includes('users:manage')) {
        loadUsersTable();
      }
    } catch (err) {
      statusEl.textContent = 'No fue posible cargar el perfil del usuario.';
    }
  }

  logoutBtn.addEventListener('click', () => {
    Session.clear();
    window.location.href = 'index.html';
  });

  loadProfile();
})();
