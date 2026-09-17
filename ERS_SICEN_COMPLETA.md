# ESPECIFICACIÓN DE REQUISITOS DE SOFTWARE (ERS)
## SICEN - Sistema de Gestión de Censos Escolares

**Autor:** Dylan Piña Moya  
**Correo:** dpinam@ucenfotec.ac.cr  
**Institución:** Universidad CENFO Técnica  
**Periodo:** 2026-C3  
**Fecha:** Septiembre 2026  
**Versión:** 1.2  
**Estado:** Completo y Aprobado

---

## REFERENCIAS Y ENLACES

### 📍 Proyecto Jira
- **URL:** https://ucenfotec-tarea1.atlassian.net/
- **Project Key:** WCDXKDXO
- **Tipo:** Jira Software (Scrum)
- **Estado:** Activo con 9 épicas y 20 historias de usuario

### 📍 Repositorio GitHub
- **URL:** https://github.com/dpinam/SICEN
- **Nombre:** SICEN
- **Descripción:** Sistema de Gestión de Censos Escolares
- **Contenido:** Especificación completa y documentación técnica
- **Estructura:**
  - /docs - Documentación y versión Word
  - /diagramas - Diagramas interactivos HTML
  - Archivos MD con especificaciones

### 📚 Documentos Relacionados
- **BITACORA_SICEN.md** - Registro completo de actividades del proyecto
- **MATRIZ_TRAZABILIDAD_SICEN.md** - Validación de cobertura (100%)
- **README.md** - Descripción del proyecto
- **BITACORA_SICEN.docx** - Versión Word para presentación formal

### 🔗 Enlaces Externos Relevantes
- **Ministerio de Educación Pública (MEP):** www.mep.go.cr
- **Dirección de Administración Educativa (DAE):** [Incluir URL de DAE del MEP]
- **CENFO Técnica:** www.ucenfotec.ac.cr
- **Estándares Aplicables:**
  - ISO 27001: https://www.iso.org/isoiec-27001-information-security-management.html
  - WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
  - OWASP Top 10: https://owasp.org/www-project-top-ten/

### 📊 Sprint Actual
- **Sprint 1 - Autenticación y Usuarios**
- **Duración:** 16/09/2026 - 30/09/2026
- **Story Points:** 21
- **Objetivos:** Implementar autenticación JWT y gestión de usuarios

---

## 1. DESCRIPCIÓN GENERAL DEL SISTEMA

### 1.1 Introducción
El Sistema de Gestión de Censos Escolares (SICEN) es una solución tecnológica web diseñada para el Ministerio de Educación Pública (MEP) que automatiza y centraliza los procesos de levantamiento, registro, seguimiento y validación de datos estadísticos de los centros educativos públicos y privados del país.

### 1.2 Objetivo General del Sistema
Desarrollar e implementar un sistema web que automatice la gestión de censos escolares, mejorando la eficiencia, transparencia y confiabilidad en la gestión de información institucional, eliminando procesos manuales dispersos y permitiendo una consulta centralizada de datos.

### 1.3 Alcance
El sistema incluye:
- Gestión de formularios censales dinámicos
- Seguimiento y validación de información
- Generación de reportes y estadísticas
- Notificaciones y comunicaciones
- Control de acceso basado en roles
- Auditoría de todas las operaciones

---

## 2. PERFILES DE USUARIO Y ACTORES INVOLUCRADOS

### 2.1 Jefatura de la DAE (Administrador General)
**Responsabilidades:**
- Crear, actualizar y eliminar formularios censales
- Personalizar apariencia y enunciados
- Adjuntar instructivos
- Registrar colaboradores y asignar roles
- Configurar censos y asociar formularios
- Definir fechas de apertura y cierre
- Abrir, pausar o cerrar censos
- Configurar mensajes en notificador
- Acceder a reportes generales

**Nivel de Acceso:** Máximo (Administrador)

### 2.2 Técnico de la DAE (Colaborador de Seguimiento)
**Responsabilidades:**
- Visualizar centros educativos asignados
- Revisar formularios remitidos
- Ver estado de cada formulario
- Aceptar o devolver formularios
- Enviar comunicados y alertas
- Generar informes de seguimiento
- Consultar historial auditable

**Nivel de Acceso:** Limitado (Técnico - Por región/circuito)

### 2.3 Director del Centro Educativo
**Responsabilidades:**
- Consultar censos disponibles
- Completar formularios con datos precargados
- Consultar instructivos
- Visualizar estado del censo
- Enviar censo completo
- Recibir notificaciones
- Corregir y reenviar formularios
- Consultar historial de gestiones

**Nivel de Acceso:** Limitado (Usuario - Solo su institución)

### 2.4 Supervisor de Centro Educativo
**Responsabilidades:**
- Consultar censos aceptados
- Recibir notificaciones sobre estado
- Verificar cumplimiento de centros a su cargo

**Nivel de Acceso:** Visualización y verificación

---

## 3. SUPOSICIONES, DEPENDENCIAS Y RESTRICCIONES

### 3.1 Suposiciones
- Los directores de centro tienen conocimientos básicos de informática
- El MEP proporciona datos de centros educativos preexistentes
- Existe conectividad de internet en los centros educativos
- Los datos serán respaldados regularmente
- Se requiere cumplir con normativas de protección de datos

### 3.2 Dependencias
- Disponibilidad de base de datos robusta
- Integración con sistemas existentes del MEP
- Capacitación de usuarios finales
- Infraestructura de hosting confiable

### 3.3 Restricciones Generales
- Disponibilidad del sistema: 24/7 (excepto mantenimiento)
- Seguridad: SSL/TLS obligatorio
- Compatibilidad: Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Almacenamiento: Cumplir con RGPD y leyes locales de protección de datos
- Performance: Máximo 3 segundos de carga por página

---

## 4. REQUISITOS FUNCIONALES

### 4.1 Gestión de Formularios Censales

#### RF-001: Crear Formularios Censales
- **Descripción:** La Jefatura DAE puede crear nuevos formularios censales desde cero o usando plantillas predefinidas
- **Actor:** Jefatura DAE
- **Precondiciones:** Estar autenticado con permisos de administrador
- **Flujo Principal:**
  1. Acceder a módulo de gestión de formularios
  2. Seleccionar opción "Crear nuevo formulario"
  3. Ingresar nombre, descripción y tipo
  4. Agregar preguntas (selección única, múltiple, descripción)
  5. Personalizar apariencia visual
  6. Guardar y publicar formulario
- **Postcondiciones:** El formulario está disponible para ser asociado a censos
- **Criterios de Aceptación:**
  - El sistema permite crear formularios con múltiples tipos de preguntas
  - Se pueden guardar como borradores antes de publicar
  - Se genera historial de cambios

#### RF-002: Editar y Actualizar Formularios
- **Descripción:** La Jefatura DAE puede modificar formularios existentes
- **Actor:** Jefatura DAE
- **Precondiciones:** Formulario creado previamente
- **Criterios de Aceptación:**
  - Se pueden agregar/eliminar preguntas
  - Los cambios se registran en auditoría
  - Los formularios en uso no pueden ser eliminados sin confirmación

#### RF-003: Eliminar Formularios
- **Descripción:** La Jefatura DAE puede eliminar formularios que no estén en uso
- **Actor:** Jefatura DAE
- **Criterios de Aceptación:**
  - Se requiere confirmación antes de eliminar
  - Se registra quién eliminó y cuándo
  - No se pueden eliminar formularios activos

### 4.2 Gestión de Censos

#### RF-004: Configurar Censos
- **Descripción:** La Jefatura DAE configura censos asociando formularios a modelos educativos y definiendo fechas
- **Actor:** Jefatura DAE
- **Criterios de Aceptación:**
  - Permite asociar múltiples formularios a un censo
  - Define fechas de apertura y cierre
  - Permite asignar censos por oferta educativa
  - Se pueden generar variantes por tipo de oferta

#### RF-005: Abrir/Pausar/Cerrar Censos
- **Descripción:** La Jefatura DAE controla el ciclo de vida de los censos manualmente
- **Actor:** Jefatura DAE
- **Criterios de Aceptación:**
  - El estado del censo se actualiza inmediatamente
  - Se notifica a todos los usuarios afectados
  - Solo la Jefatura puede realizar estas acciones
  - Se registra el cambio en auditoría

### 4.3 Gestión de Usuarios y Roles

#### RF-006: Registrar Colaboradores de la DAE
- **Descripción:** La Jefatura DAE registra nuevos técnicos y asigna roles
- **Actor:** Jefatura DAE
- **Criterios de Aceptación:**
  - Se pueden asignar roles específicos (Admin, Técnico, Supervisor)
  - Se configura alcance por región/circuito
  - Se generan credenciales de acceso
  - Se registra fecha de creación y última modificación

#### RF-007: Asignar Permisos y Seguimiento
- **Descripción:** La Jefatura DAE asigna permisos de seguimiento por región o circuito
- **Actor:** Jefatura DAE
- **Criterios de Aceptación:**
  - Los técnicos solo ven centros de su región/circuito
  - Los permisos se aplican inmediatamente
  - Se puede reasignar técnicos sin perder datos históricos

### 4.4 Llenado y Envío de Formularios

#### RF-008: Completar Formularios Censales
- **Descripción:** Los directores de centro completan formularios censales
- **Actor:** Director del Centro Educativo
- **Criterios de Aceptación:**
  - Datos precargados desde base de datos
  - Permite guardar como borrador
  - Validación en tiempo real de campos obligatorios
  - Interfaz intuitiva y responsive

#### RF-009: Enviar Censo Completo
- **Descripción:** El director envía el censo completado para revisión
- **Actor:** Director del Centro Educativo
- **Criterios de Aceptación:**
  - Verifica que todos los campos obligatorios estén completos
  - Registra fecha y hora de envío
  - Notifica automáticamente al técnico asignado
  - Proporciona comprobante de envío

#### RF-010: Recibir Notificaciones
- **Descripción:** Los directores reciben notificaciones sobre estado del censo
- **Actor:** Director del Centro Educativo
- **Criterios de Aceptación:**
  - Notificaciones por correo electrónico
  - Notificaciones dentro del sistema
  - Historial de notificaciones disponible
  - Posibilidad de configurar preferencias

### 4.5 Revisión y Validación

#### RF-011: Revisar Formularios Remitidos
- **Descripción:** Los técnicos revisan formularios enviados por directores
- **Actor:** Técnico de la DAE
- **Criterios de Aceptación:**
  - Visualización clara de todos los campos
  - Comparación con versiones anteriores
  - Registro de quién revisa y cuándo
  - Sistema de comentarios para feedback

#### RF-012: Aceptar Formularios
- **Descripción:** Los técnicos aceptan formularios conformes
- **Actor:** Técnico de la DAE
- **Criterios de Aceptación:**
  - Genera registro auditable
  - Notifica al director automáticamente
  - Cambia estado a "Aceptado"
  - Incluye fecha y firma del técnico

#### RF-013: Devolver Formularios para Subsanación
- **Descripción:** Los técnicos devuelven formularios con errores para corrección
- **Actor:** Técnico de la DAE
- **Criterios de Aceptación:**
  - Permite especificar motivos de rechazo
  - El director puede editar y reenviar
  - Se mantiene historial de cambios
  - Notificación automática al director

### 4.6 Comunicación y Alertas

#### RF-014: Enviar Comunicados a Supervisores
- **Descripción:** Los técnicos envían comunicados sobre estado de censos
- **Actor:** Técnico de la DAE
- **Criterios de Aceptación:**
  - Mensajes personalizables
  - Se registra emisión y recepción
  - Permite seguimiento de lectura
  - Plantillas predefinidas disponibles

#### RF-015: Configurar Notificador
- **Descripción:** La Jefatura DAE configura mensajes del notificador
- **Actor:** Jefatura DAE
- **Criterios de Aceptación:**
  - Alertas automáticas por hitos
  - Avisos informativos personalizables
  - Programación de envíos
  - Historial de mensajes enviados

### 4.7 Reportes y Análisis

#### RF-016: Generar Reportes de Seguimiento
- **Descripción:** Los técnicos generan informes sobre avance de censos
- **Actor:** Técnico de la DAE
- **Criterios de Aceptación:**
  - Reportes por centro educativo
  - Reportes consolidados por región
  - Exportación a Excel/PDF
  - Gráficos estadísticos

#### RF-017: Consultar Reportes Generales
- **Descripción:** La Jefatura DAE accede a reportes de toda la nación
- **Actor:** Jefatura DAE
- **Criterios de Aceptación:**
  - Dashboard con KPIs principales
  - Filtrado por período, región, tipo de centro
  - Comparativas con períodos anteriores
  - Datos en tiempo real

#### RF-018: Generar Cortes de Matrícula Censal
- **Descripción:** Extrae datos de matrícula desde censos completados
- **Actor:** Técnico de la DAE
- **Criterios de Aceptación:**
  - Agrega datos por nivel educativo
  - Genera reportes por módulo
  - Formatos estandarizados

### 4.8 Auditoría y Historial

#### RF-019: Consultar Historial de Gestiones
- **Descripción:** Se mantiene registro de todas las operaciones realizadas
- **Actor:** Todos los actores
- **Criterios de Aceptación:**
  - Registro de quién, qué, cuándo
  - No se pueden modificar registros históricos
  - Disponible para consulta según permisos
  - Exportable para auditoría externa

#### RF-020: Ver Estado del Censo
- **Descripción:** Visualización clara del estado actual de cada censo
- **Actor:** Todos los actores (según permisos)
- **Criterios de Aceptación:**
  - Indicador visual del progreso
  - Estados: Abierto, Pausado, Cerrado, En Revisión, Aceptado
  - Fecha de última actualización visible
  - Responsable actual visible

---

## 5. RESTRICCIONES DE DISEÑO E IMPLEMENTACIÓN

### 5.1 Tecnologías Obligatorias

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| Frontend | React.js | 18.0+ |
| Backend | Node.js + Express | 18.0+ |
| Base de Datos | PostgreSQL | 14.0+ |
| Autenticación | JWT (JSON Web Tokens) | - |
| API | REST | - |
| Hosting | AWS/Azure/DigitalOcean | - |

### 5.2 Lenguajes y Frameworks
- **JavaScript/TypeScript:** Para desarrollar frontend y backend
- **React:** Framework para interfaz de usuario
- **Express.js:** Framework para API REST
- **PostgreSQL:** Base de datos relacional
- **Docker:** Containerización de aplicación

### 5.3 Normativas y Estándares

#### 5.3.1 Convenciones de Nomenclatura
- **Variables:** camelCase (ej: userName, userEmail)
- **Constantes:** UPPER_SNAKE_CASE (ej: MAX_RETRY_ATTEMPTS)
- **Funciones:** camelCase (ej: createUser, getUserById)
- **Clases:** PascalCase (ej: UserController, AuthService)
- **Archivos:** kebab-case (ej: user-controller.js, auth-service.js)
- **Directorios:** kebab-case (ej: user-management, auth-service)

#### 5.3.2 Formato de Código
- **Indentación:** 2 espacios
- **Longitud máxima de línea:** 100 caracteres
- **Punto y coma:** Obligatorio
- **Comillas:** Comillas simples para strings
- **Linter:** ESLint + Prettier

#### 5.3.3 Estrategia de Branches
- **main:** Rama de producción (protegida)
- **develop:** Rama de desarrollo
- **feature/descripción:** Nuevas funcionalidades
- **bugfix/descripción:** Corrección de errores
- **hotfix/descripción:** Correcciones urgentes en producción

#### 5.3.4 Tipos de Commit
```
feat:     Nueva funcionalidad
fix:      Corrección de errores
docs:     Cambios en documentación
style:    Cambios de formato (no afectan funcionalidad)
refactor: Refactorización de código
test:     Agregación o modificación de tests
chore:    Cambios en dependencias o configuración
```

#### 5.3.5 Ejemplos de Commits
```
feat: agregar validación de formularios censales
fix: corregir error en cálculo de matrícula
docs: actualizar README con instrucciones de instalación
style: ajustar indentación en controller de usuarios
refactor: simplificar lógica de autenticación
test: agregar tests para módulo de reportes
chore: actualizar dependencias de seguridad
```

### 5.4 Seguridad

#### 5.4.1 Requisitos de Seguridad
- **Autenticación:** Obligatorio con JWT
- **Autorización:** Control de acceso basado en roles (RBAC)
- **Encriptación:** SSL/TLS para datos en tránsito
- **Hash de Contraseñas:** bcrypt con salt mínimo de 10
- **Protección CSRF:** Tokens CSRF en formularios
- **Validación de Entrada:** Sanitización de todos los inputs
- **Protección SQL Injection:** Uso de prepared statements
- **Rate Limiting:** Máximo 100 requests/min por IP

#### 5.4.2 Cumplimiento de Regulaciones
- **RGPD:** Consentimiento y derecho al olvido
- **Protección de Datos:** Encriptación de datos personales
- **Auditoría:** Registro de todas las operaciones
- **Backup:** Respaldos diarios con redundancia

### 5.5 Performance y Escalabilidad

#### 5.5.1 Requisitos de Performance
- **Tiempo de Carga:** Máximo 3 segundos en conexión 3G
- **Tiempo de Respuesta API:** Máximo 500ms para 95% de requests
- **Disponibilidad:** 99.9% uptime
- **Concurrent Users:** Mínimo 10,000 usuarios simultáneos

#### 5.5.2 Requisitos de Escalabilidad
- **Base de Datos:** Réplicas y sharding para escalabilidad
- **API:** Load balancing y auto-scaling
- **Almacenamiento:** CDN para contenido estático
- **Cache:** Redis para sesiones y datos frecuentes

### 5.6 Compatibilidad

#### 5.6.1 Navegadores Soportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

#### 5.6.2 Dispositivos
- Desktop (1920x1080 mínimo)
- Tablet (768x1024 mínimo)
- Mobile (375x667 mínimo)

### 5.7 Cumplimiento Normativo

#### 5.7.1 Estándares Aplicables
- **ISO 27001:** Gestión de seguridad de información
- **WCAG 2.1:** Accesibilidad web (AA mínimo)
- **OWASP Top 10:** Seguridad web

---

## 6. REQUISITOS NO FUNCIONALES

### 6.1 Confiabilidad
- Sistema debe estar disponible 24/7
- MTTR (Mean Time To Repair) máximo: 4 horas
- MTBF (Mean Time Between Failures) mínimo: 30 días

### 6.2 Usabilidad
- Interfaz intuitiva y user-friendly
- Tiempo de aprendizaje: máximo 2 horas para nuevos usuarios
- Accesibilidad WCAG 2.1 AA mínimo

### 6.3 Mantenibilidad
- Código documentado
- Cobertura de tests mínimo 80%
- Documentación técnica completa

---

## 7. GLOSARIO

| Término | Definición |
|---------|-----------|
| **Censo** | Proceso de recolección de datos estadísticos de centros educativos |
| **ERS** | Especificación de Requisitos de Software |
| **DAE** | Dirección de Análisis Estadístico del MEP |
| **MEP** | Ministerio de Educación Pública |
| **RBAC** | Control de Acceso Basado en Roles |
| **JWT** | JSON Web Token |
| **CSRF** | Cross-Site Request Forgery |
| **RGPD** | Reglamento General de Protección de Datos |

---

**Documento Completado:** Septiembre 16, 2026  
**Versión:** 1.0  
**Estado:** Aprobado
