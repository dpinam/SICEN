# SICEN - Sistema de Gestión de Censos Escolares

SICEN es un sistema web para la gestión de censos escolares del Ministerio de Educación Pública (MEP) de Costa Rica. Automatiza y centraliza los procesos de levantamiento, registro, seguimiento y validación de datos estadísticos de centros educativos públicos y privados.

**Autor:** Dylan Piña Moya | dpinam@ucenfotec.ac.cr

## Stack tecnológico

- **Backend:** Node.js + Express (API REST), MongoDB Atlas (NoSQL) con Mongoose como ODM.
- **Frontend:** HTML5 + CSS3 + JavaScript (sin framework), consumiendo la API mediante `fetch`.
- **Autenticación:** JWT (JSON Web Tokens) + bcrypt para el hash de contraseñas.

## Contenido del repositorio

```
SICEN/
├── README.md                          # Esta guía
├── BITACORA_SICEN.md                  # Bitácora del proyecto (Bitácora 1)
├── ERS_SICEN_COMPLETA.md              # Especificación de Requisitos (20 RF)
├── ESPECIFICACION_DISENO_SICEN.md     # Especificación de Diseño de Software (Bitácora 2)
├── MATRIZ_TRAZABILIDAD_SICEN.md       # Matriz RF → Épicas → Historias → Wireframes
├── backend/                           # API REST (Node.js + Express + MongoDB Atlas)
│   ├── config/db.js                   # Conexión a MongoDB Atlas
│   ├── models/                        # Esquemas Mongoose (User, Role)
│   ├── controllers/                   # Lógica de autenticación y gestión de usuarios
│   ├── routes/                        # Rutas de la API (/api/auth, /api/users)
│   ├── middlewares/                   # Autenticación JWT y autorización por roles (RBAC)
│   ├── seed/seedRoles.js              # Semilla de los 4 roles base del sistema
│   └── .env.example                   # Variables de entorno requeridas
├── frontend/                          # Interfaz web (HTML + CSS + JavaScript)
│   ├── index.html                     # Pantalla de inicio de sesión (WF-01)
│   ├── dashboard.html                 # Panel principal tras autenticarse
│   ├── css/styles.css                 # Guía de estilos del sistema
│   └── js/                            # auth.js, session.js, dashboard.js
├── docs/
│   └── BITACORA_SICEN.docx            # Bitácora en formato Word
├── diagramas/
│   ├── sicen_diagrama.html            # Diagrama interactivo de navegación (mapa de sitio)
│   ├── sicen_casos_uso.html           # Diagrama de casos de uso
│   └── sicen_wireframes.html          # Wireframes y guía de estilos
├── .gitignore
└── LICENSE                            # Licencia MIT
```

## Descripción de los documentos

- **ERS_SICEN_COMPLETA.md**: especificación completa de requisitos, con 20 requisitos funcionales, perfiles de usuario, restricciones y requisitos no funcionales.
- **ESPECIFICACION_DISENO_SICEN.md**: arquitectura, modelado, interfaz de usuario y navegación del sistema.
- **BITACORA_SICEN.md / BITACORA_SICEN.docx**: registro de las actividades del proyecto, organizado por fases.
- **MATRIZ_TRAZABILIDAD_SICEN.md**: mapeo de requisitos funcionales a épicas, historias de usuario y wireframes, con validación de cobertura.
- **diagramas/**: diagrama de navegación, diagrama de casos de uso y wireframes con guía de estilos.

## Avance de implementación (módulo de autenticación y gestión de usuarios)

Esta fase del proyecto implementa el módulo de **autenticación, autorización por roles (RBAC) y gestión de usuarios**, correspondiente a las historias de usuario US-001, US-002 y US-019 (Sprint 1 del proyecto en Jira).

### Backend

1. Instalar dependencias:
   ```bash
   cd backend
   npm install
   ```
2. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # completar MONGODB_URI con la cadena de conexión de MongoDB Atlas
   # y JWT_SECRET con un valor propio
   ```
3. Cargar los roles base del sistema (Jefatura DAE, Técnico DAE, Director de Centro Educativo, Supervisor de Centro Educativo):
   ```bash
   npm run seed:roles
   ```
4. Iniciar el servidor:
   ```bash
   npm start
   ```
   La API queda disponible en `http://localhost:4000/api`.

**Endpoints disponibles:**

| Método | Ruta | Descripción | Acceso |
|--------|------|--------------|--------|
| POST | `/api/auth/register` | Registra un usuario nuevo | Público |
| POST | `/api/auth/login` | Inicia sesión y devuelve un token JWT | Público |
| GET | `/api/users/me` | Perfil del usuario autenticado | Autenticado |
| GET | `/api/users` | Lista todos los usuarios | Jefatura DAE |
| POST | `/api/users` | Registra un colaborador y le asigna un rol | Jefatura DAE |

### Frontend

El frontend es estático (HTML/CSS/JS puro). Para probarlo localmente, basta con servir la carpeta `frontend/` con cualquier servidor estático, por ejemplo:

```bash
cd frontend
npx serve .
```

Por defecto, el frontend consume la API en `http://localhost:4000/api` (ver `js/session.js`, variable `SICEN_API_BASE_URL`).

## Licencia

Este proyecto está bajo licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.
