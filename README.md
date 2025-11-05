# 🌾 AgroTrack AO2 – API con Express y MySQL

### 🧠 Materia:
**Programación de Aplicaciones Web II**  
### 👩‍💻 Autora:
**Giuliana Mandrini Gatti**

---

## 📋 Descripción
Esta segunda versión del proyecto **AgroTrack** implementa una **API REST** desarrollada con **Node.js**, **Express** y **MySQL**, cumpliendo con los requerimientos de la Actividad Obligatoria 2.  
El objetivo es exponer una API de contactos que permita recibir y listar consultas almacenadas en una base de datos MySQL.

---

## ⚙️ Tecnologías utilizadas
- Node.js  
- Express.js  
- MySQL (con `mysql2/promise`)  
- Dotenv  
- Nodemon (para desarrollo)

---

## 🗂️ Estructura del proyecto

```
agrotrackAO2/
│
├─ app.js                 # Servidor principal Express
├─ db.js                  # Conexión a MySQL
├─ routes/contactos.js    # Endpoints /api/contactos
├─ middleware/
│   ├─ logger.js          # Middleware de registro de solicitudes
│   └─ errorHandler.js    # Manejo centralizado de errores
├─ public/                # Archivos estáticos (index, estilos, favicon, etc.)
├─ sql/schema.sql         # Script para crear la BD y tabla
├─ .env.example           # Variables de entorno de ejemplo
├─ README.md
└─ AgroTrack-AO2.postman_collection.json
```

---

## 🧩 Variables de entorno
Crea un archivo **.env** en la raíz del proyecto basado en el `.env.example`:

```bash
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=agrotrack
```

> ⚠️ **No subas tu archivo `.env` al repositorio.**  
> Solo se debe versionar `.env.example`.

---

## 💾 Base de datos
Ejecutar el siguiente script para crear la base y la tabla necesarias:

**Archivo:** `sql/schema.sql`
```sql
CREATE DATABASE IF NOT EXISTS agrotrack;
USE agrotrack;

CREATE TABLE IF NOT EXISTS contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre  VARCHAR(100) NOT NULL,
  email   VARCHAR(150) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# O modo producción
npm start
```

El servidor se iniciará en:  
👉 **http://localhost:3000**

---

## 📡 Endpoints disponibles

| Método | Ruta | Descripción |
|---------|------|-------------|
| GET | `/health` | Verifica el estado del servidor |
| GET | `/api/contactos` | Devuelve todas las consultas registradas |
| POST | `/api/contactos` | Registra una nueva consulta (nombre, email, mensaje) |

---

## 📬 Ejemplo de uso (POST /api/contactos)

**Request:**
```json
{
  "nombre": "Giuli",
  "email": "giuli@mail.com",
  "mensaje": "Hola AgroTrack!"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "nombre": "Giuli",
  "email": "giuli@mail.com",
  "mensaje": "Hola AgroTrack!"
}
```

**Error (400):**
```json
{ "error": "nombre, email y mensaje son obligatorios" }
```

---

## 🧪 Uso con Postman

### 📦 Importar la colección
1. Abrí **Postman** (versión de escritorio o Web + Desktop Agent).  
2. Hacé clic en **Import → Raw text**.  
3. Pegá el contenido del archivo `AgroTrack-AO2.postman_collection.json`.  
4. Confirmá con **Import**.

### 🔗 Configurar variable baseUrl
En la pestaña *Variables* de la colección:
```
baseUrl = http://localhost:3000
```

### 🧭 Requests incluidos
| Nombre | Método | Descripción |
|--------|--------|-------------|
| **GET /health** | Verifica el estado del servidor |
| **GET /api/contactos** | Devuelve todos los registros |
| **POST /api/contactos (válido)** | Inserta un contacto correcto |
| **POST /api/contactos (inválido)** | Prueba las validaciones del servidor |

> Todos los endpoints devuelven respuestas en formato JSON.

---

## 🧾 Checklist de entrega

- [x] Servidor Express funcional  
- [x] Middleware de logger y error handler  
- [x] Variables de entorno con `.env` y `.env.example`  
- [x] Conexión MySQL funcionando  
- [x] Rutas `/health` y `/api/contactos` (GET/POST)  
- [x] Validaciones y manejo de errores  
- [x] Documentación en README  
- [x] Colección Postman incluida  

---

## 🕓 Historial de versiones

| Versión | Descripción |
|----------|-------------|
| **AO1** | Servidor HTTP nativo con persistencia en archivo `.txt` |
| **AO2** | Migración a Express, MySQL y validaciones completas |
