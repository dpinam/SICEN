const mongoose = require('mongoose');

/**
 * Colección: roles
 * Define los cuatro perfiles de usuario del sistema SICEN
 * (ver ERS_SICEN_COMPLETA.md, sección 2):
 *   - Jefatura DAE
 *   - Técnico DAE
 *   - Director de Centro Educativo
 *   - Supervisor de Centro Educativo
 */
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

module.exports = mongoose.model('Role', roleSchema);
