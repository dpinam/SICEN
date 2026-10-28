const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Role = require('../models/Role');
const { isValidEmail, isNonEmptyString } = require('../utils/validators');

const SALT_ROUNDS = 10;

/**
 * GET /api/users/me
 * Devuelve el perfil del usuario autenticado (a partir del token JWT).
 */
async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.id).populate('roleId');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.roleId.name,
      status: user.status,
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/users
 * Lista los usuarios del sistema. Solo accesible para la Jefatura DAE
 * (ruta protegida con requireRole('Jefatura DAE')).
 */
async function listUsers(req, res, next) {
  try {
    const users = await User.find().populate('roleId').sort({ createdAt: -1 });
    return res.json(
      users.map((u) => ({
        id: u._id,
        username: u.username,
        email: u.email,
        role: u.roleId.name,
        status: u.status,
        createdAt: u.createdAt,
      }))
    );
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/users
 * Registra un nuevo colaborador y le asigna un rol (RF-019).
 * Solo accesible para la Jefatura DAE.
 */
async function createUser(req, res, next) {
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
    if (!isNonEmptyString(roleName)) {
      return res.status(400).json({ message: 'Debe indicar el rol a asignar' });
    }

    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ message: `El rol "${roleName}" no existe` });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(409).json({ message: 'Ya existe un usuario con ese correo o nombre de usuario' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ username, email, passwordHash, roleId: role._id });

    return res.status(201).json({
      message: 'Colaborador registrado exitosamente',
      user: { id: user._id, username: user.username, email: user.email, role: role.name },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, listUsers, createUser };
