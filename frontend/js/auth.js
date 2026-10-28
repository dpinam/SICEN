/**
 * Lógica de la pantalla de inicio de sesión (index.html).
 * Consume la API REST del backend mediante fetch (sin frameworks).
 */
(function () {
  const form = document.getElementById('login-form');
  const messageEl = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  // Si ya hay sesión activa, no mostrar el login de nuevo.
  if (Session.isAuthenticated()) {
    window.location.href = 'dashboard.html';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    messageEl.textContent = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      messageEl.textContent = 'Complete su correo y contraseña.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Ingresando...';

    try {
      const response = await fetch(`${SICEN_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        messageEl.textContent = data.message || 'No fue posible iniciar sesión.';
        return;
      }

      Session.setSession(data.token, data.user);
      window.location.href = 'dashboard.html';
    } catch (err) {
      messageEl.textContent = 'No fue posible conectar con el servidor. Intente nuevamente.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Iniciar sesión';
    }
  });

  document.getElementById('forgot-link').addEventListener('click', (event) => {
    event.preventDefault();
    messageEl.style.color = '#0f172a';
    messageEl.textContent =
      'Para restablecer su contraseña, comuníquese con la Jefatura DAE de su institución.';
  });
})();
