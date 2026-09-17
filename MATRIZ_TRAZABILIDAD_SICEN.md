# MATRIZ DE TRAZABILIDAD
## SICEN - Sistema de Gestión de Censos Escolares

**Autor:** Dylan Piña Moya  
**Correo:** carlospinav19@gmail.com  
**Periodo:** 2026-C3  
**Fecha:** Septiembre 2026  
**Versión:** 1.0

---

## 1. INTRODUCCIÓN

La matriz de trazabilidad establece la relación entre los requisitos funcionales definidos en la ERS y los componentes de implementación, historias de usuario en Jira, épicas, tareas y elementos de prueba.

---

## 2. MATRIZ DE TRAZABILIDAD - REQUISITOS FUNCIONALES

| ID Req. | Requisito Funcional | Descripción Breve | Usuario | Epic Jira | Historia Usuario | Task de Dev | Task de Testing | Componente Frontend | Componente Backend | Base de Datos | Estado |
|---------|-------------------|------------------|---------|-----------|-----------------|-------------|-----------------|--------------------|--------------------|----------------|--------|
| RF-001 | Autenticación de Usuarios | Sistema de login con credenciales | Todos | SEC-001 | US-001 | TASK-001 | TEST-001 | LoginForm.jsx | auth.controller.js | users, sessions | Completado |
| RF-002 | Gestión de Roles y Permisos | RBAC para control de acceso | Administrador | SEC-001 | US-002 | TASK-002 | TEST-002 | RoleManager.jsx | rbac.service.js | roles, permissions | Completado |
| RF-003 | Crear Formulario Censal | Formulario dinámico configurable | Administrador | FORM-001 | US-003 | TASK-003 | TEST-003 | FormBuilder.jsx | form.controller.js | forms, fields | Completado |
| RF-004 | Editar Formulario Censal | Modificación de campos y estructura | Administrador | FORM-001 | US-004 | TASK-004 | TEST-004 | FormEditor.jsx | form.controller.js | forms | Completado |
| RF-005 | Eliminar Formulario Censal | Borrado lógico de formularios | Administrador | FORM-001 | US-005 | TASK-005 | TEST-005 | FormDelete.jsx | form.controller.js | forms | Completado |
| RF-006 | Configurar Censo | Definir períodos y parámetros | Administrador | CONFIG-001 | US-006 | TASK-006 | TEST-006 | CensusConfig.jsx | census.controller.js | censuses | Completado |
| RF-007 | Abrir Censo | Habilitar censo para participantes | Administrador | CONFIG-001 | US-007 | TASK-007 | TEST-007 | CensusOpen.jsx | census.controller.js | censuses | Completado |
| RF-008 | Pausar Censo | Suspender temporalmente censo | Administrador | CONFIG-001 | US-008 | TASK-008 | TEST-008 | CensusPause.jsx | census.controller.js | censuses | Completado |
| RF-009 | Cerrar Censo | Finalizar período de recolección | Administrador | CONFIG-001 | US-009 | TASK-009 | TEST-009 | CensusClose.jsx | census.controller.js | censuses | Completado |
| RF-010 | Llenar Formulario Censal | Completar datos en formulario | Director Centro | SUBMIT-001 | US-010 | TASK-010 | TEST-010 | FormSubmit.jsx | form.controller.js | responses | Completado |
| RF-011 | Enviar Formulario | Remitir respuestas completas | Director Centro | SUBMIT-001 | US-011 | TASK-011 | TEST-011 | FormSubmitBtn.jsx | submission.controller.js | submissions | Completado |
| RF-012 | Validar Datos Censal | Verificación de integridad datos | Técnico DAE | VALIDATE-001 | US-012 | TASK-012 | TEST-012 | ValidationPanel.jsx | validation.service.js | validations | Completado |
| RF-013 | Aceptar Formulario | Confirmar validación completada | Técnico DAE | VALIDATE-001 | US-013 | TASK-013 | TEST-013 | AcceptForm.jsx | submission.controller.js | submissions | Completado |
| RF-014 | Devolver Formulario | Rechazar con comentarios | Técnico DAE | VALIDATE-001 | US-014 | TASK-014 | TEST-014 | ReturnForm.jsx | submission.controller.js | submissions | Completado |
| RF-015 | Generar Reportes | Reportes consolidados y filtrados | Administrador | REPORT-001 | US-015 | TASK-015 | TEST-015 | ReportGenerator.jsx | report.service.js | submissions, responses | Completado |
| RF-016 | Descargar Reportes | Exportar a PDF/Excel | Administrador | REPORT-001 | US-016 | TASK-016 | TEST-016 | ReportDownload.jsx | export.service.js | submissions | Completado |
| RF-017 | Sistema de Notificaciones | Alertas y comunicados | Todos | NOTIF-001 | US-017 | TASK-017 | TEST-017 | NotificationCenter.jsx | notification.service.js | notifications | Completado |
| RF-018 | Historial Auditable | Registro de todas las operaciones | Administrador | AUDIT-001 | US-018 | TASK-018 | TEST-018 | AuditLog.jsx | audit.service.js | audit_logs | Completado |
| RF-019 | Gestión de Usuarios | ABM de cuentas de sistema | Administrador | USER-001 | US-019 | TASK-019 | TEST-019 | UserManager.jsx | user.controller.js | users | Completado |
| RF-020 | Asignación de Técnicos | Distribuir técnicos a centros | Administrador | USER-001 | US-020 | TASK-020 | TEST-020 | TechnicianAssign.jsx | assignment.controller.js | assignments | Completado |

---

## 3. MAPEO REQUISITOS - COMPONENTES

### 3.1 Requisitos por Componente Frontend

#### Módulo de Autenticación (auth/)
- **Componentes:** LoginForm.jsx, PasswordReset.jsx, SessionManager.jsx
- **Requisitos:** RF-001, RF-002
- **Dependencias:** Redux (Auth state), axios (HTTP client)

#### Módulo de Administración (admin/)
- **Componentes:** FormBuilder.jsx, FormEditor.jsx, CensusConfig.jsx, UserManager.jsx
- **Requisitos:** RF-003, RF-004, RF-005, RF-006, RF-007, RF-008, RF-009, RF-019, RF-020
- **Dependencias:** React Query, Material-UI, Formik (Forms)

#### Módulo de Directores (director/)
- **Componentes:** FormSubmit.jsx, StatusTracker.jsx, NotificationCenter.jsx
- **Requisitos:** RF-010, RF-011, RF-017
- **Dependencias:** Socket.io (Real-time), Redux, React Router

#### Módulo de Validación (validation/)
- **Componentes:** ValidationPanel.jsx, AcceptForm.jsx, ReturnForm.jsx
- **Requisitos:** RF-012, RF-013, RF-014
- **Dependencias:** Formik, Yup (Validation), Redux

#### Módulo de Reportes (reports/)
- **Componentes:** ReportGenerator.jsx, ReportDownload.jsx, Analytics.jsx
- **Requisitos:** RF-015, RF-016
- **Dependencias:** Chart.js, jsPDF, xlsx (Exports)

#### Módulo de Auditoría (audit/)
- **Componentes:** AuditLog.jsx, ActivityTimeline.jsx
- **Requisitos:** RF-018
- **Dependencias:** React Table, date-fns

### 3.2 Requisitos por Componente Backend

#### Controlador de Autenticación (auth.controller.js)
- **Métodos:** login(), logout(), refreshToken(), validateToken()
- **Requisitos:** RF-001, RF-002
- **Middlewares:** authMiddleware, validateSchema
- **Seguridad:** JWT, bcrypt, rate limiting

#### Controlador de Formularios (form.controller.js)
- **Métodos:** createForm(), updateForm(), deleteForm(), getForm(), listForms()
- **Requisitos:** RF-003, RF-004, RF-005
- **Validaciones:** Schema validation, Field type validation

#### Controlador de Censos (census.controller.js)
- **Métodos:** createCensus(), configureCensus(), openCensus(), pauseCensus(), closeCensus()
- **Requisitos:** RF-006, RF-007, RF-008, RF-009
- **Estados:** CONFIGURED, OPEN, PAUSED, CLOSED

#### Controlador de Envíos (submission.controller.js)
- **Métodos:** submitForm(), acceptForm(), returnForm(), getSubmissionStatus()
- **Requisitos:** RF-010, RF-011, RF-013, RF-014
- **Validaciones:** Completeness check, Data integrity

#### Servicio de Validación (validation.service.js)
- **Métodos:** validateData(), performBusinessRules(), generateValidationReport()
- **Requisitos:** RF-012
- **Reglas:** Campos obligatorios, Rangos, Formatos

#### Servicio de Reportes (report.service.js)
- **Métodos:** generateReport(), aggregateData(), filterResults()
- **Requisitos:** RF-015, RF-016
- **Exportación:** PDF, Excel, CSV

#### Servicio de Notificaciones (notification.service.js)
- **Métodos:** sendNotification(), broadcastAlert(), scheduleNotification()
- **Requisitos:** RF-017
- **Canales:** Email, In-app, SMS (opcional)

#### Servicio de Auditoría (audit.service.js)
- **Métodos:** logAction(), getAuditTrail(), generateAuditReport()
- **Requisitos:** RF-018
- **Datos:** User, Action, Resource, Timestamp, IP Address

#### Controlador de Usuarios (user.controller.js)
- **Métodos:** createUser(), updateUser(), deleteUser(), listUsers()
- **Requisitos:** RF-019
- **Roles:** Admin, Técnico, Director, Supervisor

#### Controlador de Asignaciones (assignment.controller.js)
- **Métodos:** assignTechnician(), unassignTechnician(), listAssignments()
- **Requisitos:** RF-020
- **Validaciones:** Technician availability, Center assignment

### 3.3 Requisitos por Entidad de Base de Datos

| Entidad | Campos Principales | Requisitos | Índices | Constraints |
|---------|-------------------|-----------|---------|-------------|
| users | id, username, email, password_hash, role_id, status, created_at | RF-001, RF-019 | email, username | UNIQUE(email), UNIQUE(username), FK(role_id) |
| roles | id, name, permissions, description | RF-002 | name | UNIQUE(name) |
| forms | id, title, description, structure, status, created_by, created_at | RF-003, RF-004, RF-005 | status, created_by | FK(created_by) |
| censuses | id, name, form_id, start_date, end_date, status, created_by | RF-006, RF-007, RF-008, RF-009 | status, start_date | FK(form_id), FK(created_by) |
| submissions | id, census_id, center_id, responses, status, submitted_at, validated_at | RF-010, RF-011, RF-013, RF-014 | census_id, center_id, status | FK(census_id), FK(center_id) |
| responses | id, submission_id, field_id, value, validated | RF-010, RF-012 | submission_id | FK(submission_id) |
| validations | id, submission_id, validation_type, passed, message | RF-012 | submission_id | FK(submission_id) |
| notifications | id, user_id, title, message, type, read, created_at | RF-017 | user_id, created_at | FK(user_id) |
| audit_logs | id, user_id, action, resource_type, resource_id, changes, timestamp | RF-018 | user_id, timestamp | FK(user_id) |
| assignments | id, technician_id, center_id, assigned_at, active | RF-020 | technician_id, center_id | FK(technician_id), FK(center_id) |

---

## 4. HISTORIAS DE USUARIO - ESTRUCTURA JIRA

### Plantilla Estándar

```
Epic: [NOMBRE-EPIC]

Historia: US-XXX
Título: Como [rol], quiero [acción] para [beneficio]
Descripción: [Descripción narrativa]

Criterios de Aceptación:
- Criterio 1: [Condición] dado [contexto] cuando [acción] entonces [resultado]
- Criterio 2: [Condición] dado [contexto] cuando [acción] entonces [resultado]
- Criterio 3: [Condición] dado [contexto] cuando [acción] entonces [resultado]

Story Points: [1-13 Fibonacci]
Prioridad: [Alta/Media/Baja]
Sprint: [Sprint assignment]
```

### Épicas Definidas

| ID Epic | Nombre | Descripción | Requisitos Relacionados | Prioridad |
|---------|--------|-------------|------------------------|-----------|
| SEC-001 | Autenticación y Seguridad | Sistema de autenticación y control de acceso | RF-001, RF-002 | Alta |
| FORM-001 | Gestión de Formularios | Crear, editar y eliminar formularios | RF-003, RF-004, RF-005 | Alta |
| CONFIG-001 | Configuración de Censos | Configurar, abrir, pausar y cerrar censos | RF-006, RF-007, RF-008, RF-009 | Alta |
| SUBMIT-001 | Envío de Datos | Llenar y enviar formularios | RF-010, RF-011 | Alta |
| VALIDATE-001 | Validación de Datos | Validar, aceptar y devolver formularios | RF-012, RF-013, RF-014 | Alta |
| REPORT-001 | Generación de Reportes | Crear y descargar reportes | RF-015, RF-016 | Media |
| NOTIF-001 | Sistema de Notificaciones | Alertas y comunicados | RF-017 | Media |
| AUDIT-001 | Auditoría | Registro de operaciones | RF-018 | Media |
| USER-001 | Gestión de Usuarios | Usuarios y asignaciones | RF-019, RF-020 | Alta |

---

## 5. EJEMPLO DE HISTORIAS DE USUARIO

### US-001: Autenticación de Usuario

**Epic:** SEC-001  
**Título:** Como usuario, quiero autenticarme en el sistema para acceder a mis funcionalidades  
**Story Points:** 8

**Criterios de Aceptación:**
1. Dado que soy un usuario no autenticado, cuando ingreso credenciales válidas, entonces debo acceder al dashboard
2. Dado que soy un usuario no autenticado, cuando ingreso credenciales inválidas, entonces debo recibir mensaje de error
3. Dado que soy un usuario autenticado, cuando cierro sesión, entonces debo ser redirigido a login

**Tasks de Desarrollo:**
- TASK-001-1: Crear modelo de usuarios en BD
- TASK-001-2: Implementar endpoint de login
- TASK-001-3: Implementar JWT tokens
- TASK-001-4: Crear componente LoginForm
- TASK-001-5: Integrar Redux para auth state

**Tasks de Testing:**
- TEST-001-1: Pruebas unitarias de hash password
- TEST-001-2: Pruebas de integración de login
- TEST-001-3: Pruebas E2E de autenticación

---

### US-003: Crear Formulario Censal

**Epic:** FORM-001  
**Título:** Como administrador, quiero crear formularios censales configurables para recopilar datos específicos  
**Story Points:** 13

**Criterios de Aceptación:**
1. Dado que soy administrador, cuando accedo a crear formulario, entonces puedo agregar campos dinámicamente
2. Dado que estoy creando un formulario, cuando selecciono un tipo de campo, entonces debo ver opciones de configuración específicas
3. Dado que he configurado un formulario, cuando guardo los cambios, entonces el formulario debe quedar disponible para censos

**Tasks de Desarrollo:**
- TASK-003-1: Crear interfaz FormBuilder en React
- TASK-003-2: Implementar API de creación de formularios
- TASK-003-3: Agregar validación de campos
- TASK-003-4: Implementar persistencia en BD
- TASK-003-5: Crear preview de formulario

**Tasks de Testing:**
- TEST-003-1: Pruebas de validación de campos
- TEST-003-2: Pruebas E2E del builder
- TEST-003-3: Pruebas de persistencia

---

### US-010: Llenar Formulario Censal

**Epic:** SUBMIT-001  
**Título:** Como director de centro, quiero llenar el formulario censal con los datos de mi institución  
**Story Points:** 8

**Criterios de Aceptación:**
1. Dado que soy director y hay un censo abierto, cuando accedo al formulario, entonces debo ver campos precargados
2. Dado que estoy llenando el formulario, cuando cambio valores, entonces se deben guardar borradores automáticamente
3. Dado que completo el formulario, cuando valido los datos, entonces debo recibir confirmación de campos correctos

**Tasks de Desarrollo:**
- TASK-010-1: Crear componente FormSubmit
- TASK-010-2: Implementar pre-carga de datos
- TASK-010-3: Implementar auto-save
- TASK-010-4: Agregar validación en tiempo real
- TASK-010-5: Crear servicio de guardado

**Tasks de Testing:**
- TEST-010-1: Pruebas de validación de datos
- TEST-010-2: Pruebas E2E de llenado
- TEST-010-3: Pruebas de auto-save

---

## 6. ESTRUCTURA DE SPRINTS

### Sprint 1: Fundamentos (1-2 semanas)
- Configuración de proyecto
- Arquitectura base
- Autenticación (RF-001, RF-002)
- Gestión de usuarios (RF-019)
- **Épicas:** SEC-001, USER-001
- **Story Points Totales:** 21

### Sprint 2: Gestión de Formularios (2-3 semanas)
- Crear/Editar/Eliminar formularios (RF-003, RF-004, RF-005)
- Sistema de notificaciones (RF-017)
- **Épicas:** FORM-001, NOTIF-001
- **Story Points Totales:** 34

### Sprint 3: Configuración y Envío (2-3 semanas)
- Configurar censos (RF-006, RF-007, RF-008, RF-009)
- Llenar y enviar formularios (RF-010, RF-011)
- **Épicas:** CONFIG-001, SUBMIT-001
- **Story Points Totales:** 39

### Sprint 4: Validación y Reportes (2-3 semanas)
- Validación de datos (RF-012, RF-013, RF-014)
- Generación de reportes (RF-015, RF-016)
- Auditoría (RF-018)
- Asignación de técnicos (RF-020)
- **Épicas:** VALIDATE-001, REPORT-001, AUDIT-001
- **Story Points Totales:** 40

---

## 7. RESUMEN DE COBERTURA

- **Total de Requisitos Funcionales:** 20
- **Total de Historias de Usuario:** 20 (US-001 a US-020)
- **Total de Épicas:** 9
- **Total de Story Points:** 134 (distribución Fibonacci)
- **Total de Tasks de Desarrollo:** 60+
- **Total de Tasks de Testing:** 60+
- **Componentes Frontend:** 25+
- **Componentes Backend:** 10+
- **Entidades de BD:** 9

---

## 8. CRITERIOS DE FINALIZACIÓN

✓ Cada requisito funcional está mapeado a una historia de usuario  
✓ Cada historia tiene mínimo 3 criterios de aceptación  
✓ Cada criterio está escrito en formato Given-When-Then  
✓ Story points asignados usando escala Fibonacci  
✓ Tasks de desarrollo y testing identificadas  
✓ Componentes frontend y backend documentados  
✓ Esquema de BD normalizado y documentado  
✓ Épicas agrupadas por funcionalidad  
✓ Sprints balanceados por carga de trabajo  

---

**Documento Generado:** Septiembre 16, 2026  
**Próxima Revisión:** Después de Sprint 1 en Jira
