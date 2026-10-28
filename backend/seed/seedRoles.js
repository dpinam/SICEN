/**
 * Script de semilla: crea los cuatro roles base del sistema SICEN si no existen.
 * Uso: npm run seed:roles
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Role = require('../models/Role');

const ROLES = [
  {
    name: 'Jefatura DAE',
    description: 'Administrador general: gestiona formularios, censos, usuarios y reportes.',
    permissions: [
      'forms:manage',
      'census:manage',
      'users:manage',
      'reports:view',
      'audit:view',
    ],
  },
  {
    name: 'Técnico DAE',
    description: 'Valida formularios remitidos por los centros educativos asignados.',
    permissions: ['submissions:validate', 'reports:view', 'notifications:send'],
  },
  {
    name: 'Director de Centro Educativo',
    description: 'Completa y envía los formularios censales de su institución.',
    permissions: ['forms:fill', 'forms:submit', 'notifications:view'],
  },
  {
    name: 'Supervisor de Centro Educativo',
    description: 'Consulta censos aceptados y verifica cumplimiento de los centros a su cargo.',
    permissions: ['census:view', 'notifications:view'],
  },
];

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
