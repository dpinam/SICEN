const Role = require('../models/Role');

/**
 * GET /api/roles
 * Lista los roles disponibles del sistema para asignación (RF-002, RF-019).
 * Solo accesible para la Jefatura DAE, que es quien registra colaboradores
 * y les asigna un rol.
 */
async function listRoles(req, res, next) {
  try {
    const roles = await Role.find().sort({ name: 1 });
    return res.json(
      roles.map((r) => ({
        id: r._id,
        name: r.name,
        description: r.description,
      }))
    );
  } catch (err) {
    next(err);
  }
}

module.exports = { listRoles };
