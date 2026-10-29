/**
 * Script de semilla: crea usuarios de demostración, uno por cada uno de los
 * cuatro roles del sistema SICEN, para usarlos en la presentación/exposición
 * del avance (login en vivo alternando entre perfiles para evidenciar RBAC).
 *
 * Es idempotente y autosuficiente: si los roles base todavía no existen, los
 * crea igual que seedRoles.js antes de crear los usuarios.
 *
 * Uso: npm run seed:users
 *      (o "npm run seed:demo" para roles + usuarios en un solo paso)
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Role = require('../models/Role');
const User = require('../models/User');
const { ROLES } = require('./roleDefinitions');

const SALT_ROUNDS = 10;
const DEMO_PASSWORD = process.env.SEED_DEMO_PASSWORD || 'Demo#2026';

const DEMO_USERS = [
  {
    username: 'mfernandez',
    email: 'jefatura.dae@sicen.mep.go.cr',
    fullName: 'María Fernández',
    roleName: 'Jefatura DAE',
  },
  {
    username: 'caraya',
    email: 'tecnico.dae@sicen.mep.go.cr',
    fullName: 'Carlos Araya',
    roleName: 'Técnico DAE',
  },
  {
    username: 'arojas',
    email: 'director.centro@sicen.mep.go.cr',
    fullName: 'Ana Rojas',
    roleName: 'Director de Centro Educativo',
  },
  {
    username: 'lmora',
    email: 'supervisor.centro@sicen.mep.go.cr',
    fullName: 'Luis Mora',
    roleName: 'Supervisor de Centro Educativo',
  },
];

async function ensureRoles() {
  for (const roleData of ROLES) {
    await Role.findOneAndUpdate(
      { name: roleData.name },
      { $setOnInsert: roleData },
      { upsert: true, new: true }
    );
  }
}

async function seedUsers() {
  await connectDB();
  await ensureRoles();

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, SALT_ROUNDS);

  for (const demo of DEMO_USERS) {
    const role = await Role.findOne({ name: demo.roleName });
    if (!role) {
      console.warn(`[SICEN] Rol "${demo.roleName}" no encontrado, se omite ${demo.email}`);
      continue;
    }

    const result = await User.findOneAndUpdate(
      { email: demo.email },
      {
        $setOnInsert: {
          username: demo.username,
          email: demo.email,
          passwordHash,
          roleId: role._id,
          status: 'active',
        },
      },
      { upsert: true, new: true }
    );
    console.log(`[SICEN] Usuario demo listo: ${result.email} (${demo.roleName})`);
  }

  console.log('\n[SICEN] Semilla de usuarios de demostración completada.');
  console.log(`[SICEN] Contraseña para todas las cuentas demo: ${DEMO_PASSWORD}\n`);
  console.table(DEMO_USERS.map((d) => ({ Rol: d.roleName, Nombre: d.fullName, Correo: d.email })));

  await mongoose.connection.close();
}

seedUsers().catch((err) => {
  console.error('[SICEN] Error al ejecutar la semilla de usuarios demo:', err.message);
  process.exit(1);
});
