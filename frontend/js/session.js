/**
 * Utilidades de sesión compartidas por todas las páginas del frontend.
 * El token JWT y los datos básicos del usuario se guardan en localStorage
 * (no se usa framework; JS nativo + fetch, según el stack del proyecto).
 */
const SICEN_API_BASE_URL = window.SICEN_API_BASE_URL || 'http://localhost:4000/api';

const Session = {
  setSession(token, user) {
    localStorage.setItem('sicen_token', token);
    localStorage.setItem('sicen_user', JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem('sicen_token');
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem('sicen_user'));
    } catch (e) {
      return null;
    }
  },

  clear() {
    localStorage.removeItem('sicen_token');
    localStorage.removeItem('sicen_user');
  },

  isAuthenticated() {
    return Boolean(this.getToken());
  },

  /**
   * Redirige a la pantalla de login si no hay sesión activa.
   * Se invoca al inicio de las páginas protegidas (ej. dashboard.html).
   */
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'index.html';
    }
  },
};
