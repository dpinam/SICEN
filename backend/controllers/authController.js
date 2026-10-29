const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Role = require('../models/Role');
const { isValidEmail, isNonEmptyString } = require('../utils/validators');

const SALT_ROUNDS = 10;

/**
 * POST /api/auth/register
 * Registra un nuevo usuario. Si no se indica un rol, se asigna el rol
 * "Director de Centro Educativo" por defecto (perfil de menor privilegio
 * operativo). La creación de usuarios con roles administrativos se realiza
 * desde el módulo de gestión de usuarios (ver userController.js, RF-019).
 */
async function register(req, res, next) {
  try {
    const { username, email, password, roleName } = req.body;

    if (!isNonEmptyString(username, 3)) {
      return res.status(400).json({ message: 'El nombre de usuario debe tener al menos 3 caracteres' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'El correo electrónico no es válido' });
    }
    if (!isNonEmptyString(password, 8)) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(409).json({ message: 'Ya existe un usuario con ese correo o nombre de usuario' });
    }

    const role = await Role.findOne({ name: roleName || 'Director de Centro Educativo' });
    if (!role) {
      return res.status(400).json({
        message: 'El rol indicado no existe. Ejecute el script de semilla (npm run seed:roles).',
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ username, email, passwordHash, roleId: role._id });

    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: { id: user._id, username: user.username, email: user.email, role: role.name },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/auth/login
 * Autentica un usuario con correo y contraseña y devuelve un token JWT (RF-001).
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email) || !isNonEmptyString(password)) {
      return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos' });
    }

    const user = await User.findOne({ email }).populate('roleId');
    if (!user || user.status !== 'active') {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const role = user.roleId;
    const tokenPayload = {
      id: user._id,
      email: user.email,
      roleName: role.name,
      permissions: role.permissions,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: role.name,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
