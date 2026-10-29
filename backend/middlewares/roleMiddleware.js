/**
 * Middleware de autorización basada en roles (RBAC).
 * Implementa el control de acceso por perfil de usuario (RF-002):
 * Jefatura DAE, Técnico DAE, Director de Centro Educativo,
 * Supervisor de Centro Educativo.
 *
 * Uso: router.get('/ruta', requireAuth, requireRole('Jefatura DAE'), handler)
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    if (!allowedRoles.includes(req.user.roleName)) {
      return res.status(403).json({
        message: 'No tiene permisos suficientes para realizar esta acción',
      });
    }

    next();
  };
}

module.exports = { requireRole };
