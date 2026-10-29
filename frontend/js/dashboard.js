/**
 * Lógica del panel principal (dashboard.html).
 * Verifica la sesión contra la API (/api/users/me), muestra los datos del
 * usuario autenticado, arma el grid de módulos del sistema según el rol
 * (permissions del rol) y, si corresponde (Jefatura DAE), carga la tabla
 * de gestión de usuarios consumiendo GET /api/users (RF-002, RF-019),
 * además de habilitar el alta de colaboradores (POST /api/users) y el
 * cambio de estado activo/inactivo (PATCH /api/users/:id/status).
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

  const newUserBtn = document.getElementById('new-user-btn');
  const newUserOverlay = document.getElementById('new-user-overlay');
  const newUserClose = document.getElementById('new-user-close');
  const newUserCancel = document.getElementById('new-user-cancel');
  const newUserForm = document.getElementById('new-user-form');
  const newUserMessage = document.getElementById('new-user-message');
  const newUserRoleSelect = document.getElementById('new-user-role');
  const newUserSubmitBtn = document.getElementById('new-user-submit');
  const backToModulesBtn = document.getElementById('back-to-modules-btn');

  const profileTrigger = document.getElementById('profile-trigger');
  const profileAvatar = document.getElementById('profile-avatar');

  const userDetailOverlay = document.getElementById('user-detail-overlay');
  const userDetailClose = document.getElementById('user-detail-close');
  const userDetailCloseBtn = document.getElementById('user-detail-close-btn');
  const userDetailAvatar = document.getElementById('user-detail-avatar');
  const userDetailName = document.getElementById('user-detail-name');
  const userDetailRole = document.getElementById('user-detail-role');
  const userDetailEmail = document.getElementById('user-detail-email');
  const userDetailStatus = document.getElementById('user-detail-status');
  const userDetailCreated = document.getElementById('user-detail-created');

  let currentUser = null;
  let usersById = {};

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
        pillHtml = '<span class="pill pill-available">Abrir módulo &rsaquo;</span>';
      } else if (mod.implemented && !authorized) {
        pillHtml = '<span class="pill pill-locked">Sin acceso</span>';
      } else {
        pillHtml = '<span class="pill pill-soon">Próximamente</span>';
      }

      card.innerHTML =
        '<div class="module-thumb"><span class="module-icon">' + mod.icon + '</span></div>' +
        '<div class="module-body">' +
        '<span class="module-title">' + mod.title + '</span>' +
        '<span class="module-desc">' + mod.desc + '</span>' +
        pillHtml +
        '</div>';

      if (available && mod.id === 'users') {
        card.addEventListener('click', () => {
          showUsersSection();
        });
      }

      moduleGridEl.appendChild(card);
    });
  }

  function showUsersSection() {
    usersCardEl.style.display = 'block';
    loadUsersTable();
    usersCardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function hideUsersSection() {
    usersCardEl.style.display = 'none';
    moduleGridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function getInitials(name) {
    if (!name) return '?';
    const letters = String(name)
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    return letters || '?';
  }

  function openUserDetailPanel(user) {
    if (!user) return;
    userDetailAvatar.textContent = getInitials(user.username);
    userDetailName.textContent = user.username;
    userDetailRole.textContent = user.role;
    userDetailEmail.textContent = user.email;
    const isActive = user.status === 'active';
    userDetailStatus.innerHTML =
      `<span class="status-dot ${isActive ? '' : 'inactive'}"></span>${isActive ? 'Activo' : 'Inactivo'}`;
    userDetailCreated.textContent = formatDate(user.createdAt);
    userDetailOverlay.style.display = 'flex';
  }

  function closeUserDetailPanel() {
    userDetailOverlay.style.display = 'none';
  }

  if (backToModulesBtn) {
    backToModulesBtn.addEventListener('click', hideUsersSection);
  }

  if (profileTrigger) {
    profileTrigger.addEventListener('click', () => {
      if (currentUser) openUserDetailPanel(currentUser);
    });
  }

  if (userDetailClose) userDetailClose.addEventListener('click', closeUserDetailPanel);
  if (userDetailCloseBtn) userDetailCloseBtn.addEventListener('click', closeUserDetailPanel);
  if (userDetailOverlay) {
    userDetailOverlay.addEventListener('click', (event) => {
      if (event.target === userDetailOverlay) closeUserDetailPanel();
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

  function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML;
  }

  async function apiRequest(path, options) {
    const response = await fetch(`${SICEN_API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Session.getToken()}`,
        ...(options && options.headers),
      },
    });

    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }

    if (response.status === 401) {
      Session.clear();
      window.location.href = 'index.html';
      throw new Error('Sesión expirada');
    }

    if (!response.ok) {
      const message = (data && data.message) || 'Ocurrió un error inesperado';
      throw new Error(message);
    }

    return data;
  }

  async function loadUsersTable() {
    usersCardEl.style.display = 'block';
    try {
      const users = await apiRequest('/users', { method: 'GET' });
      usersCountEl.textContent = `${users.length} usuario(s) registrado(s)`;
      usersById = {};
      users.forEach((u) => {
        usersById[u.id] = u;
      });

      if (users.length === 0) {
        usersTableBodyEl.innerHTML =
          '<tr><td colspan="6" class="text-aux">Aún no hay usuarios registrados.</td></tr>';
        return;
      }

      usersTableBodyEl.innerHTML = users
        .map((u) => {
          const dotClass = u.status === 'active' ? 'status-dot' : 'status-dot inactive';
          const statusLabel = u.status === 'active' ? 'Activo' : 'Inactivo';
          const isSelf = currentUser && String(currentUser.id) === String(u.id);
          let actionHtml = '<span class="text-aux">—</span>';
          if (!isSelf) {
            actionHtml =
              u.status === 'active'
                ? `<button type="button" class="btn-link btn-link-danger" data-action="toggle-status" data-id="${u.id}" data-next-status="inactive">Desactivar</button>`
                : `<button type="button" class="btn-link btn-link-success" data-action="toggle-status" data-id="${u.id}" data-next-status="active">Activar</button>`;
          }
          return (
            `<tr data-id="${u.id}">` +
            `<td>${escapeHtml(u.username)}</td>` +
            `<td>${escapeHtml(u.email)}</td>` +
            `<td><span class="role-tag">${escapeHtml(u.role)}</span></td>` +
            `<td><span class="${dotClass}"></span>${statusLabel}</td>` +
            `<td>${formatDate(u.createdAt)}</td>` +
            `<td>${actionHtml}</td>` +
            '</tr>'
          );
        })
        .join('');
    } catch (err) {
      usersTableBodyEl.innerHTML =
        '<tr><td colspan="6" class="text-aux">No fue posible cargar la lista de usuarios.</td></tr>';
    }
  }

  async function handleToggleStatus(button) {
    const { id, nextStatus } = button.dataset;
    const confirmMsg =
      nextStatus === 'inactive'
        ? '¿Desactivar el acceso de este colaborador?'
        : '¿Reactivar el acceso de este colaborador?';
    if (!window.confirm(confirmMsg)) return;

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Guardando...';

    try {
      await apiRequest(`/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus }),
      });
      await loadUsersTable();
    } catch (err) {
      button.disabled = false;
      button.textContent = originalText;
      window.alert(err.message || 'No fue posible actualizar el estado del usuario');
    }
  }

  usersTableBodyEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="toggle-status"]');
    if (button) {
      handleToggleStatus(button);
      return;
    }
    const row = event.target.closest('tr[data-id]');
    if (row) {
      const user = usersById[row.dataset.id];
      if (user) openUserDetailPanel(user);
    }
  });

  async function loadRoles() {
    try {
      const roles = await apiRequest('/roles', { method: 'GET' });
      newUserRoleSelect.innerHTML =
        '<option value="" disabled selected>Seleccione un rol…</option>' +
        roles.map((r) => `<option value="${escapeHtml(r.name)}">${escapeHtml(r.name)}</option>`).join('');
    } catch (err) {
      newUserRoleSelect.innerHTML = '<option value="" disabled selected>No fue posible cargar los roles</option>';
    }
  }

  function openNewUserModal() {
    newUserForm.reset();
    newUserMessage.textContent = '';
    newUserMessage.classList.remove('form-message-success');
    newUserOverlay.style.display = 'flex';
    loadRoles();
    document.getElementById('new-user-username').focus();
  }

  function closeNewUserModal() {
    newUserOverlay.style.display = 'none';
  }

  if (newUserBtn) {
    newUserBtn.addEventListener('click', openNewUserModal);
  }
  if (newUserClose) {
    newUserClose.addEventListener('click', closeNewUserModal);
  }
  if (newUserCancel) {
    newUserCancel.addEventListener('click', closeNewUserModal);
  }
  if (newUserOverlay) {
    newUserOverlay.addEventListener('click', (event) => {
      if (event.target === newUserOverlay) closeNewUserModal();
    });
  }
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (newUserOverlay.style.display === 'flex') {
      closeNewUserModal();
    }
    if (userDetailOverlay.style.display === 'flex') {
      closeUserDetailPanel();
    }
  });

  if (newUserForm) {
    newUserForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      newUserMessage.textContent = '';
      newUserMessage.classList.remove('form-message-success');

      const username = document.getElementById('new-user-username').value.trim();
      const email = document.getElementById('new-user-email').value.trim();
      const password = document.getElementById('new-user-password').value;
      const roleName = document.getElementById('new-user-role').value;

      if (!roleName) {
        newUserMessage.textContent = 'Debe seleccionar un rol para el colaborador';
        return;
      }

      newUserSubmitBtn.disabled = true;
      const originalLabel = newUserSubmitBtn.textContent;
      newUserSubmitBtn.textContent = 'Registrando...';

      try {
        await apiRequest('/users', {
          method: 'POST',
          body: JSON.stringify({ username, email, password, roleName }),
        });

        newUserMessage.textContent = 'Colaborador registrado exitosamente.';
        newUserMessage.classList.add('form-message-success');
        await loadUsersTable();

        setTimeout(() => {
          closeNewUserModal();
        }, 900);
      } catch (err) {
        newUserMessage.textContent = err.message || 'No fue posible registrar el colaborador';
      } finally {
        newUserSubmitBtn.disabled = false;
        newUserSubmitBtn.textContent = originalLabel;
      }
    });
  }

  async function loadProfile() {
    try {
      const user = await apiRequest('/users/me', { method: 'GET' });
      currentUser = user;
      nameEl.textContent = user.username;
      roleEl.textContent = user.role;
      if (profileAvatar) profileAvatar.textContent = getInitials(user.username);
      statusEl.textContent = `Sesión iniciada como ${user.email}.`;

      renderModules(user);
      // La sección de Gestión de usuarios permanece oculta hasta que la
      // persona haga clic en la tarjeta del módulo (showUsersSection),
      // y solo se renderiza como "disponible" si su rol tiene el permiso
      // "users:manage" (ver renderModules / hasPermission).
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
