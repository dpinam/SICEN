/**
 * Definición única de los cuatro roles base del sistema SICEN
 * (ver ERS_SICEN_COMPLETA.md, sección 2). Centralizada aquí para que
 * seedRoles.js y seedUsers.js usen siempre la misma fuente de datos.
 */
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

module.exports = { ROLES };
