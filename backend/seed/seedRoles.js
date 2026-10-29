/**
 * Script de semilla: crea los cuatro roles base del sistema SICEN si no existen.
 * Uso: npm run seed:roles
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Role = require('../models/Role');
const { ROLES } = require('./roleDefinitions');

async function seedRoles() {
  await connectDB();

  for (const roleData of ROLES) {
    const result = await Role.findOneAndUpdate(
      { name: roleData.name },
      { $setOnInsert: roleData },
      { upsert: true, new: true }
    );
    console.log(`[SICEN] Rol listo: ${result.name}`);
  }

  console.log('[SICEN] Semilla de roles completada.');
  await mongoose.connection.close();
}

seedRoles().catch((err) => {
  console.error('[SICEN] Error al ejecutar la semilla de roles:', err.message);
  process.exit(1);
});
