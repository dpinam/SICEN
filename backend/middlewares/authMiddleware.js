const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación: valida el token JWT enviado en el header
 * Authorization: Bearer <token> y adjunta el payload decodificado a req.user.
 * Implementa el requisito de autenticación segura (RF-001).
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación válido' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, roleName, permissions }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = { requireAuth };
