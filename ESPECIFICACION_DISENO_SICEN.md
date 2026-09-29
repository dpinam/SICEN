# ESPECIFICACIÓN DE DISEÑO DE SOFTWARE
## SICEN - Sistema de Gestión de Censos Escolares

**Autor:** Dylan Piña Moya
**Correo:** dpinam@ucenfotec.ac.cr
**Institución:** Universidad CENFO Técnica
**Periodo:** 2026-C3
**Fecha:** Septiembre 2026
**Versión:** 1.0
**Documento asociado a:** Bitácora 2

---

## 1. PROPÓSITO Y ALCANCE DEL SISTEMA

### 1.1 Propósito

Este documento define el diseño de software de SICEN: la arquitectura técnica, el modelado funcional, la interfaz de usuario y la navegación de la aplicación, como base para la fase de implementación. Complementa la Especificación de Requisitos (`ERS_SICEN_COMPLETA.md`) y la Matriz de Trazabilidad (`MATRIZ_TRAZABILIDAD_SICEN.md`).

### 1.2 Arquitectura

SICEN se implementa como una aplicación web cliente-servidor de tres capas:

```
┌─────────────────────────┐      HTTPS / REST (JSON)      ┌──────────────────────────┐      Mongoose (ODM)      ┌────────────────────┐
│   Cliente (Frontend)     │ ─────────────────────────────▶│   Servidor (Backend)      │ ─────────────────────────▶│  Base de Datos       │
│  HTML5 + CSS3 + JS       │ ◀─────────────────────────────│  Node.js + Express        │ ◀─────────────────────────│  MongoDB Atlas       │
│  (navegador del usuario) │         JSON / JWT             │  API REST + Middlewares   │                            │  (NoSQL, en la nube) │
└─────────────────────────┘                                └──────────────────────────┘                            └────────────────────┘
```

- **Frontend:** páginas HTML5 estáticas por módulo, estilizadas con CSS3 y con interactividad en JavaScript (vanilla, sin framework), consumiendo la API mediante `fetch`.
- **Backend:** Node.js con Express.js, exponiendo una API REST organizada por controladores (auth, form, census, submission, validation, report, notification, audit, user, assignment), con autenticación JWT y autorización basada en roles (RBAC) como middleware.
- **Base de datos:** MongoDB Atlas (NoSQL, orientada a documentos), con colecciones modeladas mediante Mongoose (ver detalle en `MATRIZ_TRAZABILIDAD_SICEN.md`, sección 3.3).
- **Hosting:** despliegue en la nube (AWS/Azure/DigitalOcean), con MongoDB Atlas como servicio gestionado independiente.

### 1.3 Alcance

El diseño cubre los cuatro perfiles de usuario definidos en la ERS (Jefatura DAE, Técnico DAE, Director de Centro Educativo, Supervisor de Centro Educativo) y los 20 requisitos funcionales (RF-001 a RF-020), agrupados en los módulos: Autenticación, Gestión de Formularios, Gestión de Censos, Envío y Validación de Datos, Reportes, Notificaciones, Auditoría y Gestión de Usuarios.

Fuera de alcance en esta fase: integración con los sistemas internos del MEP, aplicación móvil nativa e internacionalización (idiomas adicionales al español).

---

## 2. MODELADO DEL SISTEMA

### 2.1 Diagrama de Casos de Uso

El diagrama de casos de uso, con los cuatro actores del sistema y sus interacciones principales, se encuentra en `diagramas/sicen_casos_uso.html`.

---

## 3. INTERFAZ DE USUARIO (UI/UX)

### 3.1 Wireframes

Se definieron 9 wireframes de baja fidelidad que cubren los flujos principales de cada rol, disponibles en `diagramas/sicen_wireframes.html`:

| Código | Pantalla | Rol principal | Requisitos |
|--------|----------|---------------|------------|
| WF-01 | Inicio de sesión | Todos | RF-001 |
| WF-02 | Formulario censal | Director de Centro | RF-010, RF-011 |
| WF-03 | Constructor de formularios | Jefatura DAE | RF-003, RF-004, RF-005 |
| WF-04 | Configuración de censo | Jefatura DAE | RF-006, RF-007, RF-008, RF-009 |
| WF-05 | Panel de validación | Técnico DAE | RF-012, RF-013, RF-014 |
| WF-06 | Gestión de usuarios | Jefatura DAE | RF-002, RF-019, RF-020 |
| WF-07 | Reportes | Jefatura DAE / Técnico DAE | RF-015, RF-016, RF-017 |
| WF-08 | Centro de notificaciones | Todos | RF-017 |
| WF-09 | Historial de auditoría | Jefatura DAE | RF-018 |

La relación completa entre cada requisito funcional y su wireframe correspondiente está documentada en `MATRIZ_TRAZABILIDAD_SICEN.md`, sección 2.

### 3.2 Guía de Estilos

Documentada visualmente al inicio de `diagramas/sicen_wireframes.html`. Resumen:

**Paleta de color** (uso institucional, contraste AA sobre fondo blanco):

| Uso | Color | Hex |
|-----|-------|-----|
| Primario | Azul institucional | `#1E3A8A` |
| Primario claro (acciones) | Azul | `#3B82F6` |
| Texto / encabezados | Casi negro | `#0F172A` |
| Éxito / Aceptado | Verde | `#16A34A` |
| Advertencia / Pausado | Amarillo | `#EAB308` |
| Error / Cerrado | Rojo | `#DC2626` |
| Fondo neutro | Gris claro | `#F1F5F9` |

**Tipografía:** fuente del sistema (Segoe UI / system-ui, sans-serif) por rendimiento y accesibilidad. Escala: H1 28px/700, H2 20px/600, H3 16px/600, texto base 14px/400, texto auxiliar 12px/400.

**Componentes base:** botón primario y secundario, insignias de estado (Abierto/Pausado/Cerrado), campos de texto con etiqueta asociada, tablas de datos, barra de navegación lateral por rol.

### 3.3 Restricciones de Usabilidad y Accesibilidad

- Cumplimiento WCAG 2.1 nivel AA (contraste mínimo 4.5:1 en texto normal).
- Navegación completa por teclado, con foco visible en todos los controles interactivos.
- Etiquetas asociadas (`label`/`for`) en todos los campos de formulario; errores anunciados con `aria-live` para lectores de pantalla.
- Diseño responsive: soporte desde 375px (móvil) hasta 1920px (escritorio), con puntos de quiebre en 768px y 1024px.
- Textos redimensionables hasta 200% sin pérdida de contenido ni funcionalidad.
- Iconografía siempre acompañada de texto o atributo `alt`/`aria-label`.
- Estados de carga visibles (spinners/skeletons) en toda operación que supere 1 segundo.

---

## 4. DISEÑO DE NAVEGACIÓN

### 4.1 Mapa de Sitio / Flujo de Navegación

El flujo de navegación entre pantallas, organizado por tipo de usuario (Director de Centro y Administrador/Jefatura DAE), está documentado en `diagramas/sicen_diagrama.html`. Desde la página de inicio, cada perfil accede a un dashboard propio y de ahí a sus módulos correspondientes (formularios, censos, validación, reportes, notificaciones), según los permisos definidos en la ERS (sección 2).

---

## 5. ACTUALIZACIONES RELACIONADAS

Como parte de esta fase, se actualizaron adicionalmente:

- **Matriz de trazabilidad** (`MATRIZ_TRAZABILIDAD_SICEN.md`): se agregó la columna "Wireframe / Prototipo" relacionando cada requisito funcional con su pantalla correspondiente, y se corrigió el modelado de base de datos y componentes frontend para reflejar el stack real del proyecto (Node.js + Express + MongoDB Atlas + HTML/CSS/JS).
- **ERS** (`ERS_SICEN_COMPLETA.md`): se corrigió la sección de tecnologías obligatorias (5.1/5.2) para reflejar MongoDB Atlas en lugar de PostgreSQL y HTML/CSS/JavaScript en lugar de React, alineado con el stack indicado en la consigna del curso.
- **Proyecto en Jira:** se registraron las actividades de esta fase de diseño (ver Bitácora 2 para el enlace y evidencia).

---

**Documento Generado:** Septiembre 29, 2026
**Estado:** Completo
