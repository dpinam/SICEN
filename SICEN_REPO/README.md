# SICEN - Sistema de Gestión de Censos Escolares

[![Estado](https://img.shields.io/badge/Estado-Especificación%20Completada-brightgreen)]()
[![Versión](https://img.shields.io/badge/Versión-1.0-blue)]()
[![Licencia](https://img.shields.io/badge/Licencia-MIT-green)]()

## Descripción

SICEN es un sistema web integral de gestión de censos escolares desarrollado para el Ministerio de Educación Pública (MEP) de Costa Rica. La solución automatiza y centraliza los procesos de levantamiento, registro, seguimiento y validación de datos estadísticos de centros educativos públicos y privados.

## 🔗 Enlaces Importantes

### Proyecto Jira
- **URL:** https://ucenfotec-tarea1.atlassian.net/
- **Project Key:** WCDXKDXO
- **Estado:** 9 Épicas + 20 Historias + Sprint 1 Inicializado

### Repositorio GitHub
- **URL:** [Será actualizado con el link del repositorio]
- **Contenido:** Especificación completa, documentación, guías

### Contacto
- **Estudiante:** Dylan Piña Moya | dpinam@ucenfotec.ac.cr
- **Profesor:** Verónica Mora Arias | vmora@ucenfotec.ac.cr
- **Institución:** Universidad CENFO Técnica

## Características Principales

### Gestión de Formularios
- Crear formularios censales dinámicos con múltiples tipos de preguntas
- Editar y personalizar formularios existentes
- Plantillas predefinidas para diferentes tipos de instituciones
- Control de versiones y auditoría de cambios

### Ciclo de Vida del Censo
- Configuración flexible de censos
- Estados controlados: Abierto, Pausado, Cerrado, En Revisión
- Asociación de formularios a modelos educativos
- Definición de fechas de apertura y cierre

### Gestión de Usuarios y Roles
- Sistema RBAC (Control de Acceso Basado en Roles)
- Cuatro niveles de usuario:
  - Jefatura DAE (Administrador)
  - Técnico DAE (Seguimiento y validación)
  - Director Centro Educativo (Captura de datos)
  - Supervisor Centro Educativo (Apoyo)

### Recolección y Validación de Datos
- Llenado de formularios con datos precargados
- Validación en tiempo real de campos obligatorios
- Seguimiento de envíos y cambios de estado
- Sistema de devolución para subsanación de errores

### Reportes y Análisis
- Generación de reportes consolidados
- Exportación en múltiples formatos (Excel, PDF)
- Dashboard con KPIs principales
- Gráficos estadísticos de avance

### Comunicación y Alertas
- Sistema de notificaciones por correo electrónico
- Comunicados personalizables para supervisores
- Alertas automáticas por hitos importantes
- Historial de mensajes enviados

### Auditoría y Seguridad
- Registro auditable de todas las operaciones
- Autenticación segura con JWT
- Encriptación de datos en tránsito y almacenamiento
- Cumplimiento con RGPD y normativas de protección de datos

## Estructura del Proyecto

```
SICEN/
├── README.md                              # Esta guía
├── BITACORA_SICEN.md                      # Bitácora completa del proyecto
├── ERS_SICEN_COMPLETA.md                  # Especificación de Requisitos
├── GUIA_IMPLEMENTACION_JIRA_SICEN.md      # Guía de configuración en Jira
├── MATRIZ_TRAZABILIDAD_SICEN.md           # Matriz RF → Épicas → Historias
├── docs/
│   ├── BITACORA_SICEN.docx                # Versión Word para presentación formal
│   └── README_TECNICO.md                  # Documentación técnica adicional
├── diagramas/
│   ├── sicen_diagrama.html                # Diagrama interactivo de navegación
│   ├── sicen_casos_uso.html               # Diagrama de casos de uso
│   └── flujos/                            # Diagramas de flujo por módulo
├── .gitignore                             # Configuración de Git
└── LICENSE                                # Licencia MIT
```

## Especificaciones Técnicas

### Requisitos Funcionales
- **20 Requisitos Funcionales** (RF-001 a RF-020) completamente especificados
- Cada requisito incluye:
  - Descripción detallada
  - Flujo principal
  - Criterios de aceptación
  - Precondiciones y postcondiciones

### Arquitectura

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| Frontend | React.js | 18.0+ |
| Backend | Node.js + Express | 18.0+ |
| Base de Datos | PostgreSQL | 14.0+ |
| Autenticación | JWT | - |
| API | REST | - |
| Hosting | AWS/Azure/DigitalOcean | - |

### Épicas y Historias
- **9 Épicas** organizadas por funcionalidad principal
- **20 Historias de Usuario** con criterios de aceptación en formato Given-When-Then
- **147 Story Points** totales
- Sprint 1 inicializado con 21 story points

## Documentación

### Documentos Principales

#### 1. **ERS_SICEN_COMPLETA.md** (448 líneas)
Especificación completa de requisitos que incluye:
- Descripción general del sistema
- Perfiles de usuario y responsabilidades
- 20 Requisitos funcionales detallados
- Restricciones de diseño e implementación
- Requisitos no funcionales
- Glosario de términos técnicos

#### 2. **GUIA_IMPLEMENTACION_JIRA_SICEN.md** (640 líneas)
Guía paso a paso para configuración en Jira que incluye:
- Instrucciones para agregar colaboradores
- Especificaciones de 9 épicas
- Especificaciones de 20 historias
- Configuración de Sprint 1
- Notas técnicas importantes

#### 3. **BITACORA_SICEN.md** (600+ líneas)
Bitácora completa del proyecto documentando:
- 7 Fases de desarrollo
- Actividades y entregables por fase
- Problemas encontrados y soluciones
- Métricas y avances
- Decisiones clave tomadas

#### 4. **MATRIZ_TRAZABILIDAD_SICEN.md**
Mapeo completo de trazabilidad que valida:
- 100% de cobertura de requisitos funcionales
- Épicas → Historias de Usuario
- Dependencias entre componentes

### Diagramas Interactivos

- **sicen_diagrama.html**: Diagrama de navegación interactivo mostrando flujos por rol
- **sicen_casos_uso.html**: Diagrama de casos de uso con actores y relaciones

## Métricas del Proyecto

### Cuantitativas
| Métrica | Valor |
|---------|-------|
| Requisitos Funcionales | 20 |
| Épicas Definidas | 9 |
| Historias de Usuario | 20 |
| Story Points Totales | 147 |
| Líneas de Documentación | 3,500+ |
| Documentos Principales | 8 |
| Cobertura de Especificaciones | 100% |

### Qualitativas
- Documentación profesional y clara
- Trazabilidad completa de requisitos
- Criterios de aceptación detallados
- Diagramas interactivos de navegación
- Sprint 1 configurado y listo

## Gestión del Proyecto - Jira

### Acceso
- **Workspace:** CENFO Técnica
- **Proyecto:** SICEN
- **Project Key:** WCDXKDXO
- **Tipo:** Jira Software (Scrum)

### Sprint 1
- **Duración:** 2 semanas (16/09/2026 - 30/09/2026)
- **Story Points:** 21
- **Objetivo:** Implementar base de autenticación y gestión de usuarios
- **Historias:**
  - US-001: Autenticar usuario (8 pts)
  - US-002: Asignar roles y permisos (5 pts)
  - US-019: Crear y gestionar usuarios (8 pts)

## Requisitos de Acceso

### Para Colaboradores
1. Acceso a Jira Cloud (workspace CENFO Técnica)
2. Acceso a repositorio GitHub
3. Conocimiento de:
   - Gestión de proyectos con Jira
   - Metodología Scrum
   - Especificación de requisitos
   - Git y GitHub

### Para Stakeholders
1. Lectura de documentación disponible en este repositorio
2. Acceso a reportes en Jira (según permisos)
3. Contacto con Jefatura de DAE para cambios de requisitos

## Próximas Fases

### Fase 8: Desarrollo del Backend
- Implementación de API REST con Express.js
- Configuración de base de datos PostgreSQL
- Sistema de autenticación con JWT
- Validación de datos y reglas de negocio

### Fase 9: Desarrollo del Frontend
- Interfaz con React.js
- Componentes reutilizables
- Integración con API
- Testing y validación

### Fase 10: Integración y Testing
- Tests unitarios y de integración
- Testing de seguridad
- Testing de performance
- Validación con MEP

### Fase 11: Deployment y Capacitación
- Deployment a producción
- Capacitación de usuarios
- Documentación de operación
- Soporte post-implementación

## Contacto y Soporte

**Estudiante Responsable:**
- Nombre: Dylan Piña Moya
- Email: dpinam@ucenfotec.ac.cr
- Institución: Universidad CENFO Técnica

**Profesor Supervisor:**
- Nombre: Verónica Mora Arias
- Email: vmora@ucenfotec.ac.cr

## Licencia

Este proyecto está bajo licencia MIT. Ver archivo LICENSE para más detalles.

## Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Historial de Versiones

### v1.0 - 17 de Septiembre de 2026
- ✓ Especificación completa de requisitos (20 RF)
- ✓ Definición de 9 épicas
- ✓ Creación de 20 historias de usuario
- ✓ Configuración de Jira
- ✓ Sprint 1 inicializado
- ✓ Documentación técnica completa
- ✓ Matriz de trazabilidad 100%

## Notas Importantes

1. Este repositorio contiene la especificación completa del proyecto SICEN
2. El código fuente será desarrollado en fases posteriores
3. Todas las decisiones de diseño están documentadas en la bitácora
4. La matriz de trazabilidad garantiza cobertura completa de requisitos
5. Jira es la fuente única de verdad para estado del proyecto

---

**Última Actualización:** 17 de Septiembre de 2026  
**Versión Documento:** 1.0  
**Estado:** Completo y Listo para Entrega
