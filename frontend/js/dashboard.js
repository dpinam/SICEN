/**
 * Lógica del panel principal (dashboard.html).
 * Verifica la sesión contra la API (/api/users/me) y muestra los datos
 * básicos del usuario autenticado.
 */
(function () {
  Session.requireAuth();

  const nameEl = document.getElementById('user-name');
  const roleEl = document.getElementById('user-role');
  const statusEl = document.getElementById('dashboard-status');
  const logoutBtn = document.getElementById('logout-btn');

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
