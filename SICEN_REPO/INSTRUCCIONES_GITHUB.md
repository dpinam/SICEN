# 📖 INSTRUCCIONES PARA SUBIR EL REPOSITORIO A GITHUB

**Estudiante:** Dylan Piña Moya  
**Email:** dpinam@ucenfotec.ac.cr  
**Fecha:** 17 de Septiembre de 2026

---

## PASO 1: Crear el Repositorio en GitHub

### Opción A: Por Navegador Web (Más Fácil)

1. Ir a **https://github.com**
2. Clic en el icono `+` arriba a la derecha
3. Seleccionar **"New repository"**

```
Repository name:  SICEN
Description:      Sistema de Gestión de Censos Escolares
Visibility:       Public (para que profesor pueda ver)
Initialize:       NO seleccionar nada (ya tenemos todo)
```

4. Clic en **"Create repository"**
5. **COPIAR** el URL que aparece (será algo como: `https://github.com/TuUsuario/SICEN.git`)

---

## PASO 2: Configurar Git Localmente

### En tu computadora (desde terminal/PowerShell):

```bash
# 1. Navegar a la carpeta SICEN
cd /ruta/a/SICEN

# 2. Ver el status (debe estar limpio)
git status

# 3. Agregar repositorio remoto (REEMPLAZA con tu URL de GitHub)
git remote add origin https://github.com/TuUsuario/SICEN.git

# 4. Renombrar rama a 'main' (estándar de GitHub)
git branch -M main

# 5. Subir todo a GitHub
git push -u origin main
```

### Si te pide autenticación:

GitHub ya no acepta contraseña directa. Necesitas:

**Opción 1: Token de Acceso Personal (Más fácil)**
1. Ir a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Clic en "Generate new token"
3. Nombre: "SICEN"
4. Seleccionar: `repo` (acceso completo)
5. Generar y **COPIAR el token** (no lo guardes después)
6. Cuando Git pida contraseña, **PEGA el token en lugar de contraseña**

**Opción 2: SSH (Más seguro pero más complejo)**
- Sigue: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

## PASO 3: Verificar en GitHub

Una vez hecho el push:

1. Ir a **https://github.com/TuUsuario/SICEN**
2. Verificar que ves:
   - ✓ README.md como portada
   - ✓ BITACORA_SICEN.md
   - ✓ ERS_SICEN_COMPLETA.md
   - ✓ Carpeta /docs
   - ✓ Carpeta /diagramas

3. Hacer clic en **README.md** → Debe mostrar el contenido formateado

---

## PASO 4: Actualizar los Links en Documentos

Una vez que el repositorio esté en GitHub:

1. **Copiar** la URL de tu repositorio (ej: `https://github.com/TuUsuario/SICEN`)

2. **Actualizar** en el README.md (línea que dice `[Por crear - Link será compartido después]`):
   ```
   - **URL:** https://github.com/TuUsuario/SICEN
   ```

3. Hacer commit con:
   ```bash
   git add README.md
   git commit -m "docs: update GitHub repository link"
   git push
   ```

---

## PASO 5: Compartir con Profesor

Envía email a **vmora@ucenfotec.ac.cr** con:

```
Asunto: Entrega Proyecto SICEN - Dylan Piña Moya

Cuerpo:

Profesora Verónica Mora,

Le comparto los enlaces del proyecto SICEN:

📍 Repositorio GitHub:
https://github.com/TuUsuario/SICEN

📍 Proyecto Jira:
https://ucenfotec-tarea1.atlassian.net/

Contenido del repositorio:
- Especificación completa (ERS) con 20 requisitos funcionales
- Bitácora de proyecto con 7 fases documentadas
- Guía de implementación en Jira
- Matriz de trazabilidad (100% cobertura)
- Diagramas interactivos
- Versión Word de la bitácora para presentación

Jira contiene:
- 9 Épicas creadas
- 20 Historias de Usuario
- Sprint 1 inicializado (21 story points)

Saludos,
Dylan Piña Moya
dpinam@ucenfotec.ac.cr
```

---

## RESOLUCIÓN DE PROBLEMAS

### Error: "fatal: not a git repository"
**Solución:** Asegúrate de estar en la carpeta correcta
```bash
cd /ruta/a/SICEN
```

### Error: "remote origin already exists"
**Solución:** Ya existe un remoto. Actualiza:
```bash
git remote set-url origin https://github.com/TuUsuario/SICEN.git
```

### Error: "Permission denied (publickey)"
**Solución:** Usa token de acceso personal en lugar de SSH, o configura SSH correctamente

### "Connection refused" o error de red
**Solución:** 
- Verifica conexión a internet
- GitHub a veces tiene problemas, espera e intenta de nuevo

---

## CHECKLIST FINAL

- [ ] Creé repositorio en GitHub
- [ ] Copié la URL del repositorio
- [ ] Ejecuté `git remote add origin [URL]`
- [ ] Ejecuté `git branch -M main`
- [ ] Ejecuté `git push -u origin main`
- [ ] Verifico que archivos aparecen en GitHub
- [ ] Actualicé links en README.md
- [ ] Compartí links con profesora

---

## INFORMACIÓN IMPORTANTE

### URLs Finales para Compartir
- **GitHub:** https://github.com/TuUsuario/SICEN
- **Jira:** https://ucenfotec-tarea1.atlassian.net/ (Project Key: WCDXKDXO)

### Archivos en el Repositorio
- README.md - Portada del proyecto
- BITACORA_SICEN.md - Registro completo
- ERS_SICEN_COMPLETA.md - Especificación de requisitos
- GUIA_IMPLEMENTACION_JIRA_SICEN.md - Guía Jira
- MATRIZ_TRAZABILIDAD_SICEN.md - Validación de cobertura
- /docs/ - Versión Word + documentos de apoyo
- /diagramas/ - Diagramas interactivos HTML

---

## CONTACTO

Si tienes problemas:
- **Email:** dpinam@ucenfotec.ac.cr
- **Profesor:** vmora@ucenfotec.ac.cr

---

**Estado:** Repositorio local completamente preparado ✓  
**Total Archivos:** 11 MD + 1 DOCX + 2 HTML + Configuración  
**Total Líneas de Documentación:** 3,500+  
**Tamaño Total:** 496K

¡Listo para subir a GitHub! 🚀
