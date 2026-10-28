const mongoose = require('mongoose');

/**
 * Colección: users
 * Campos principales: _id, username, email, passwordHash, roleId, status, createdAt
 * (ver MATRIZ_TRAZABILIDAD_SICEN.md, sección 3.3)
 * Relación por referencia: roleId -> roles (MongoDB es NoSQL/documental,
 * por lo que no existen llaves foráneas relacionales).
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('User', userSchema);
