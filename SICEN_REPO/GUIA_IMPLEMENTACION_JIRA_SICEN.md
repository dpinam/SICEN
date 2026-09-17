# GUIA DE IMPLEMENTACION - SICEN JIRA PROJECT

## Proyecto: SICEN - Sistema de Gestion de Censos Escolares  
**Url del Proyecto:** https://home.atlassian.com/o/f451dc39-d961-47ad-8111-ad52ddea272c/s/e42cc7f8-432f-4699-8fc7-9575f3239efe/project/WCDXKDXO-3  
**Clave del Proyecto:** WCDXKDXO  

---

## PASO 1: Agregar Profesor como Colaborador

### Instrucciones:
1. Ir a la página del proyecto SICEN
2. Buscar la sección "Colaboradores" en el panel derecho
3. Hacer clic en el botón "+" para agregar colaboradores
4. Ingresar el email: **vmora@ucenfotec.ac.cr**
5. Seleccionar a la profesora de la lista
6. Confirmar la invitación

---

## PASO 2: Crear 9 Epicas en Jira

Accede al proyecto SICEN en Jira y usa el botón "+ Crear" para crear cada épica.

### Estructura de Epicas:

#### EPICA 1: SEC-001 - Autenticacion y Seguridad
- **Nombre:** SEC-001 - Autenticacion y Seguridad  
- **Tipo:** Epic  
- **Descripcion:** Implementar autenticación segura basada en JWT con roles y permisos RBAC
- **Requisitos Funcionales:** RF-001, RF-002  
- **Story Points:** 21  
- **Prioridad:** Alta  

#### EPICA 2: FORM-001 - Gestion de Formularios Censales
- **Nombre:** FORM-001 - Gestion de Formularios Censales  
- **Tipo:** Epic  
- **Descripcion:** Crear, editar, eliminar y administrar formularios de censo escolar
- **Requisitos Funcionales:** RF-003, RF-004, RF-005  
- **Story Points:** 24  
- **Prioridad:** Alta  

#### EPICA 3: CENSO-001 - Ciclo de Vida del Censo
- **Nombre:** CENSO-001 - Ciclo de Vida del Censo  
- **Tipo:** Epic  
- **Descripcion:** Gestionar estados del censo: configurar, abrir, pausar, cerrar
- **Requisitos Funcionales:** RF-006, RF-007, RF-008, RF-009  
- **Story Points:** 21  
- **Prioridad:** Alta  

#### EPICA 4: DATA-001 - Recoleccion y Validacion de Datos
- **Nombre:** DATA-001 - Recoleccion y Validacion de Datos  
- **Tipo:** Epic  
- **Descripcion:** Llenar, enviar, validar y gestionar formularios con datos censales
- **Requisitos Funcionales:** RF-010, RF-011, RF-012, RF-013, RF-014  
- **Story Points:** 34  
- **Prioridad:** Alta  

#### EPICA 5: REPORT-001 - Generacion de Reportes
- **Nombre:** REPORT-001 - Generacion de Reportes  
- **Tipo:** Epic  
- **Descripcion:** Generar y descargar reportes consolidados de datos censales
- **Requisitos Funcionales:** RF-015, RF-016  
- **Story Points:** 13  
- **Prioridad:** Media  

#### EPICA 6: NOTIF-001 - Sistema de Notificaciones
- **Nombre:** NOTIF-001 - Sistema de Notificaciones  
- **Tipo:** Epic  
- **Descripcion:** Sistema de notificaciones para usuarios sobre actualizaciones de censo
- **Requisitos Funcionales:** RF-017  
- **Story Points:** 8  
- **Prioridad:** Media  

#### EPICA 7: AUDIT-001 - Historial y Auditoría
- **Nombre:** AUDIT-001 - Historial y Auditoría  
- **Tipo:** Epic  
- **Descripcion:** Registrar historial auditable de todas las acciones en el sistema
- **Requisitos Funcionales:** RF-018  
- **Story Points:** 5  
- **Prioridad:** Media  

#### EPICA 8: USERS-001 - Gestion de Usuarios
- **Nombre:** USERS-001 - Gestion de Usuarios  
- **Tipo:** Epic  
- **Descripcion:** Crear, editar y gestionar usuarios del sistema por roles
- **Requisitos Funcionales:** RF-019  
- **Story Points:** 13  
- **Prioridad:** Alta  

#### EPICA 9: ADMIN-001 - Asignacion de Técnicos
- **Nombre:** ADMIN-001 - Asignacion de Técnicos  
- **Tipo:** Epic  
- **Descripcion:** Asignar técnicos DAE a centros educativos específicos
- **Requisitos Funcionales:** RF-020  
- **Story Points:** 8  
- **Prioridad:** Media  

---

## PASO 3: Crear 20 Historias de Usuario en Jira

Usa el botón "+ Crear" para crear cada historia de usuario. Asigna cada historia a su épica correspondiente.

### HISTORIA 1 (US-001 - 8 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Autenticar usuario con email y contraseña  
**Epic:** SEC-001  
**Story Points:** 8  
**Prioridad:** Alta  
**Descripcion:**  
Como usuario del sistema, quiero autenticarme con mi email y contraseña, para acceder de manera segura a la aplicación.

**Criterios de Aceptacion:**
- DADO que un usuario no autenticado accede a la página de login
- CUANDO ingresa su email y contraseña válidos
- ENTONCES el sistema valida las credenciales contra la base de datos y redirige al dashboard

- DADO que un usuario ingresa credenciales inválidas
- CUANDO intenta enviar el formulario
- ENTONCES aparece un mensaje de error indicando "Email o contraseña incorrectos"

- DADO que un usuario olvida su contraseña
- CUANDO hace clic en "Olvidé mi contraseña"
- ENTONCES recibe un email con un enlace para restablecerla

---

### HISTORIA 2 (US-002 - 5 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Asignar roles y permisos a usuarios  
**Epic:** USERS-001  
**Story Points:** 5  
**Prioridad:** Alta  
**Descripcion:**  
Como administrador, quiero asignar roles y permisos específicos a cada usuario, para controlar qué acciones puede realizar en el sistema.

**Criterios de Aceptacion:**
- DADO que un administrador accede a la sección de Gestión de Usuarios
- CUANDO selecciona un usuario y asigna el rol "Técnico DAE"
- ENTONCES el usuario recibe permisos limitados al circuito/región asignada

- DADO que un usuario tiene rol de Director Centro
- CUANDO intenta acceder a funciones administrativas
- ENTONCES el sistema deniega el acceso y muestra mensaje de permiso insuficiente

- DADO que existen cuatro roles definidos (Jefatura, Técnico, Director, Supervisor)
- CUANDO se asigna un rol a un usuario
- ENTONCES solo ve opciones de menú correspondientes a ese rol

---

### HISTORIA 3 (US-003 - 5 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Crear nuevo formulario censal  
**Epic:** FORM-001  
**Story Points:** 5  
**Prioridad:** Alta  
**Descripcion:**  
Como administrador, quiero crear un nuevo formulario censal, para definir los campos que se recopilarán de los centros educativos.

**Criterios de Aceptacion:**
- DADO que un administrador accede a Crear Formulario
- CUANDO completa el nombre, descripción y selecciona campos del catálogo
- ENTONCES el sistema almacena el formulario en estado "Borrador"

- DADO que un formulario está en borrador
- CUANDO se hace clic en "Publicar"
- ENTONCES pasa a estado "Activo" y está disponible para los centros

- DADO que se crea un formulario
- CUANDO se configura el orden de secciones y campos
- ENTONCES se guarda la estructura completa sin errores

---

### HISTORIA 4 (US-004 - 3 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Editar formulario censal existente  
**Epic:** FORM-001  
**Story Points:** 3  
**Prioridad:** Media  
**Descripcion:**  
Como administrador, quiero editar formularios existentes, para ajustar campos según nuevas necesidades.

**Criterios de Aceptacion:**
- DADO que un formulario está en estado "Borrador"
- CUANDO se modifican los campos y se guarda
- ENTONCES los cambios se aplican sin afectar formas previamente completadas

- DADO que un formulario está "Activo" y hay datos asociados
- CUANDO se intenta modificar campos existentes
- ENTONCES solo se permite agregar nuevos campos, no eliminar existentes

- DADO que se edita un formulario
- CUANDO se cambia la orden de campos
- ENTONCES la interfaz de llenado refleja el nuevo orden inmediatamente

---

### HISTORIA 5 (US-005 - 3 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Eliminar formulario censal  
**Epic:** FORM-001  
**Story Points:** 3  
**Prioridad:** Media  
**Descripcion:**  
Como administrador, quiero eliminar formularios que ya no son necesarios, para mantener el catálogo actualizado.

**Criterios de Aceptacion:**
- DADO que un formulario está en estado "Borrador" y sin datos asociados
- CUANDO se selecciona Eliminar y se confirma
- ENTONCES el formulario se borra del sistema

- DADO que un formulario tiene datos asociados
- CUANDO se intenta eliminar
- ENTONCES aparece advertencia: "No se puede eliminar formulario con datos"

- DADO que se elimina un formulario
- CUANDO hay auditoría activa
- ENTONCES queda registro de quién eliminó y cuándo

---

### HISTORIA 6 (US-006 - 5 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Configurar parámetros de censo  
**Epic:** CENSO-001  
**Story Points:** 5  
**Prioridad:** Alta  
**Descripcion:**  
Como administrador, quiero configurar los parámetros iniciales del censo, para definir fechas, formularios y centros participantes.

**Criterios de Aceptacion:**
- DADO que se accede a Configurar Censo
- CUANDO se selecciona formulario, fecha inicio, fecha fin y centros
- ENTONCES se crea un censo en estado "Configurado"

- DADO que un censo está configurado
- CUANDO se visualiza el resumen
- ENTONCES muestra cantidad de centros, formulario asignado y período

- DADO que se configura un censo
- CUANDO se intenta usar fechas inválidas (fin antes de inicio)
- ENTONCES el sistema muestra error y no permite guardar

---

### HISTORIA 7 (US-007 - 3 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Abrir censo para recoleccion de datos  
**Epic:** CENSO-001  
**Story Points:** 3  
**Prioridad:** Alta  
**Descripcion:**  
Como administrador, quiero abrir un censo para que los directores comiencen a llenar formularios.

**Criterios de Aceptacion:**
- DADO que un censo está en estado "Configurado"
- CUANDO se hace clic en "Abrir Censo"
- ENTONCES cambia a estado "Abierto" y directores pueden acceder a él

- DADO que un censo está abierto
- CUANDO se consulta la fecha actual
- ENTONCES se verifica que está dentro del período configurado

- DADO que un censo se abre
- CUANDO todos los centros son notificados
- ENTONCES reciben email con enlace de acceso y instrucciones

---

### HISTORIA 8 (US-008 - 2 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Pausar censo  
**Epic:** CENSO-001  
**Story Points:** 2  
**Prioridad:** Media  
**Descripcion:**  
Como administrador, quiero pausar temporalmente un censo, para detener la recolecta sin perder datos.

**Criterios de Aceptacion:**
- DADO que un censo está "Abierto"
- CUANDO se hace clic en "Pausar Censo"
- ENTONCES cambia a estado "Pausado" y ningún director puede enviar datos

- DADO que un censo está pausado
- CUANDO se hace clic en "Reanudar"
- ENTONCES vuelve a estado "Abierto" y se mantienen todos los datos ingresados

- DADO que un censo está pausado
- CUANDO se intenta llenar un formulario
- ENTONCES aparece mensaje: "Censo pausado, intente más tarde"

---

### HISTORIA 9 (US-009 - 2 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Cerrar censo  
**Epic:** CENSO-001  
**Story Points:** 2  
**Prioridad:** Alta  
**Descripcion:**  
Como administrador, quiero cerrar un censo, para finalizar la recolecta de datos.

**Criterios de Aceptacion:**
- DADO que un censo está "Abierto" o "Pausado"
- CUANDO se hace clic en "Cerrar Censo"
- ENTONCES cambia a estado "Cerrado" y genera reportes automáticos

- DADO que un censo está cerrado
- CUANDO directores intenten acceder
- ENTONCES solo pueden ver sus datos, no enviar nuevos

- DADO que se cierra un censo
- CUANDO se generan reportes
- ENTONCES se consolidan todos los datos disponibles

---

### HISTORIA 10 (US-010 - 8 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Llenar formulario censal con datos  
**Epic:** DATA-001  
**Story Points:** 8  
**Prioridad:** Alta  
**Descripcion:**  
Como director de centro educativo, quiero llenar el formulario censal, para reportar datos de mi institución.

**Criterios de Aceptacion:**
- DADO que un censo está abierto
- CUANDO un director accede a Llenar Formulario
- ENTONCES ve todos los campos configurados organizados por sección

- DADO que un director completa campos y hace clic en "Guardar Borrador"
- CUANDO vuelve más tarde
- ENTONCES recupera sus datos previamente guardados

- DADO que hay campos requeridos vacíos
- CUANDO intenta enviar
- ENTONCES aparece validación destacando campos obligatorios

---

### HISTORIA 11 (US-011 - 5 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Enviar formulario censal completado  
**Epic:** DATA-001  
**Story Points:** 5  
**Prioridad:** Alta  
**Descripcion:**  
Como director, quiero enviar el formulario completado, para que sea revisado por técnicos.

**Criterios de Aceptacion:**
- DADO que todos los campos requeridos están completos
- CUANDO se hace clic en "Enviar Formulario"
- ENTONCES cambia a estado "Enviado" y se notifica al técnico asignado

- DADO que se envía un formulario
- CUANDO se confirma el envío
- ENTONCES se genera un registro de fecha y hora de envío

- DADO que un formulario está enviado
- CUANDO el director intenta editarlo
- ENTONCES solo puede ver los datos, no modificar

---

### HISTORIA 12 (US-012 - 8 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Validar datos de formulario censal  
**Epic:** DATA-001  
**Story Points:** 8  
**Prioridad:** Alta  
**Descripcion:**  
Como técnico DAE, quiero validar los datos del formulario, para asegurar calidad y consistencia.

**Criterios de Aceptacion:**
- DADO que un formulario está "Enviado"
- CUANDO el técnico accede a Validar
- ENTONCES ve todos los datos y opciones de aceptar/rechazar

- DADO que el técnico identifica errores
- CUANDO agrega comentarios y rechaza
- ENTONCES el director recibe notificación para corregir

- DADO que los datos son correctos
- CUANDO se acepta el formulario
- ENTONCES cambia a estado "Validado"

---

### HISTORIA 13 (US-013 - 3 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Aceptar formulario validado  
**Epic:** DATA-001  
**Story Points:** 3  
**Prioridad:** Alta  
**Descripcion:**  
Como técnico DAE, quiero aceptar un formulario validado, para incluirlo en reportes finales.

**Criterios de Aceptacion:**
- DADO que un formulario está "Validado"
- CUANDO el técnico hace clic en "Aceptar"
- ENTONCES cambia a estado "Aceptado" y se integra a análisis

- DADO que un formulario es aceptado
- CUANDO se genera reporte
- ENTONCES sus datos aparecen en consolidados

- DADO que se acepta un formulario
- CUANDO se registra en auditoría
- ENTONCES queda constancia del técnico y fecha

---

### HISTORIA 14 (US-014 - 3 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Devolver formulario para corrección  
**Epic:** DATA-001  
**Story Points:** 3  
**Prioridad:** Media  
**Descripcion:**  
Como técnico DAE, quiero devolver un formulario con comentarios, para que sea corregido.

**Criterios de Aceptacion:**
- DADO que un formulario está "Enviado" o "Validado"
- CUANDO se hace clic en "Devolver" y se agregan comentarios
- ENTONCES el director recibe notificación para corregir

- DADO que se devuelve un formulario
- CUANDO el director lo recibe
- ENTONCES puede editarlo y reenviarlo

- DADO que se devuelve un formulario
- CUANDO se registra en auditoría
- ENTONCES aparecen los comentarios del técnico

---

### HISTORIA 15 (US-015 - 8 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Generar reportes consolidados  
**Epic:** REPORT-001  
**Story Points:** 8  
**Prioridad:** Media  
**Descripcion:**  
Como administrador o técnico, quiero generar reportes consolidados, para analizar datos del censo.

**Criterios de Aceptacion:**
- DADO que existen formularios aceptados
- CUANDO se accede a Generar Reportes
- ENTONCES puede seleccionar filtros (período, región, indicadores)

- DADO que se seleccionan parámetros
- CUANDO se genera el reporte
- ENTONCES agrupa y analiza datos correctamente

- DADO que se genera un reporte
- CUANDO se visualiza
- ENTONCES incluye gráficos, tablas y estadísticas

---

### HISTORIA 16 (US-016 - 5 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Descargar reportes en múltiples formatos  
**Epic:** REPORT-001  
**Story Points:** 5  
**Prioridad:** Media  
**Descripcion:**  
Como usuario, quiero descargar reportes en PDF, Excel o CSV, para análisis externo.

**Criterios de Aceptacion:**
- DADO que un reporte está generado
- CUANDO se hace clic en "Descargar"
- ENTONCES aparecen opciones de formato (PDF, Excel, CSV)

- DADO que se selecciona un formato
- CUANDO se descarga
- ENTONCES genera archivo válido con datos correctos

- DADO que se descarga un reporte
- CUANDO se abre en aplicación externa
- ENTONCES mantiene formato y datos intactos

---

### HISTORIA 17 (US-017 - 8 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Notificar usuarios sobre actualizaciones  
**Epic:** NOTIF-001  
**Story Points:** 8  
**Prioridad:** Media  
**Descripcion:**  
Como sistema, quiero enviar notificaciones, para mantener a usuarios informados de cambios.

**Criterios de Aceptacion:**
- DADO que se abre un censo
- CUANDO se notifica a directores
- ENTONCES reciben email con instrucciones

- DADO que se rechaza un formulario
- CUANDO se devuelve
- ENTONCES director recibe notificación con comentarios

- DADO que se acepta un formulario
- CUANDO se completa validación
- ENTONCES se envía confirmación al director

---

### HISTORIA 18 (US-018 - 5 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Registrar historial auditable de acciones  
**Epic:** AUDIT-001  
**Story Points:** 5  
**Prioridad:** Media  
**Descripcion:**  
Como sistema, quiero registrar todas las acciones, para mantener auditoría completa.

**Criterios de Aceptacion:**
- DADO que un usuario realiza cualquier acción importante
- CUANDO se ejecuta (crear, modificar, eliminar, validar)
- ENTONCES se registra en log: usuario, acción, timestamp, cambios

- DADO que se accede a historial
- CUANDO se consulta
- ENTONCES muestra todas las acciones en orden cronológico

- DADO que se genera reporte de auditoría
- CUANDO se descarga
- ENTONCES incluye todos los registros del período solicitado

---

### HISTORIA 19 (US-019 - 8 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Crear y gestionar usuarios del sistema  
**Epic:** USERS-001  
**Story Points:** 8  
**Prioridad:** Alta  
**Descripcion:**  
Como administrador, quiero crear y gestionar usuarios, para controlar acceso al sistema.

**Criterios de Aceptacion:**
- DADO que se accede a Gestión de Usuarios
- CUANDO se completa formulario (email, nombre, rol)
- ENTONCES se crea usuario con contraseña temporal

- DADO que se crea un usuario
- CUANDO se envía invitación
- ENTONCES recibe email con enlace para activar cuenta

- DADO que un usuario está activo
- CUANDO administrador lo edita
- ENTONCES puede cambiar rol, región o desactivar

---

### HISTORIA 20 (US-020 - 8 puntos)
**Tipo:** Historía de Usuario  
**Resumen:** Asignar técnicos a centros educativos  
**Epic:** ADMIN-001  
**Story Points:** 8  
**Prioridad:** Alta  
**Descripcion:**  
Como administrador, quiero asignar técnicos a centros, para organizar validación de formularios.

**Criterios de Aceptacion:**
- DADO que existen técnicos DAE registrados
- CUANDO se accede a Asignar Técnicos
- ENTONCES puede seleccionar técnico y centros a asignar

- DADO que se asigna un técnico
- CUANDO se confirma
- ENTONCES técnico ve los centros asignados en su dashboard

- DADO que un técnico está asignado a centros
- CUANDO se recibe un formulario de esos centros
- ENTONCES llega a su cola de validación

---

## PASO 4: Crear Sprint 1

Después de crear todas las épicas e historias, configura Sprint 1 con las siguientes historias:

**Historias en Sprint 1 (21 puntos totales):**
- US-001: Autenticar usuario (8 puntos)
- US-002: Asignar roles y permisos (5 puntos)
- US-019: Crear y gestionar usuarios (8 puntos)

**Total Sprint 1:** 21 Story Points

---

## NOTAS IMPORTANTES

1. **Orden de Creacion:** Se recomienda crear todas las épicas primero, luego las historias asociadas a cada épica
2. **Validacion de Datos:** Todas las historias tienen criterios de aceptación en formato Given-When-Then para facilitar testing
3. **Relacion Requisitos-Historias:** Cada historia mapea a requisitos funcionales específicos (RF-001 a RF-020)
4. **Story Points:** Se usan números de Fibonacci (1, 2, 3, 5, 8, 13) como se requiere
5. **Auditoría:** Todas las historias consideran registro auditables de cambios
6. **Seguridad:** Se implementan validaciones y permisos en cada historia

---

## PASOS RAPIDOS PARA ENTRADA MANUAL

### Para crear una Épica:
1. Click "+ Crear" en Jira
2. Tipo: Epic
3. Proyecto: SICEN
4. Ingresar nombre, descripción y story points
5. Guardar

### Para crear una Historia de Usuario:
1. Click "+ Crear" en Jira
2. Tipo: Story
3. Proyecto: SICEN
4. Ingresar resumen (título)
5. Descripción: usar formato "Como [rol], quiero [acción], para [beneficio]"
6. Asignar a Epic (en campo parent o epic link)
7. Ingresar story points
8. En descripción, incluir los criterios de aceptación
9. Prioridad: Alta o Media según especificación
10. Guardar

### Para crear Sprint 1:
1. Ir a Backlog
2. Click "Crear Sprint" o similar
3. Seleccionar historias: US-001, US-002, US-019
4. Iniciar Sprint cuando esté listo

---

Versión: 1.0  
Fecha: Septiembre 16, 2026  
Estado: Listo para Implementación
