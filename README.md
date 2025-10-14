# 🌾 AgroTrack – Actividad Obligatoria 1

**Materia:** Programación de Aplicaciones Web II  
**Carrera:** TUDAI – Tecnicatura Universitaria en Desarrollo de Aplicaciones Informáticas  
**Estudiante:** Giuliana Mandrini  
**Año:** 2025  

---

## Descripción general

AgroTrack es un **MVP (Producto Mínimo Viable)** de un portal de gestión agrícola desarrollado con **Node.js nativo** (sin frameworks externos).  
Permite acceder a un sitio estático con distintas secciones y procesar formularios mediante los métodos **GET** y **POST**, grabando datos en archivos del servidor.  

El objetivo es demostrar la comprensión de los conceptos de **servidor HTTP, ruteo, manejo de MIME types, asincronía y tratamiento de errores (404 / 500)** usando solo los módulos básicos de Node.js (`http`, `fs`, `path`, `url`).

---

## Estructura del proyecto
agrotrack/
├─ server.js → Servidor Node principal
├─ public/
│ ├─ index.html → Página principal
│ ├─ productos.html → Listado modelo de productos
│ ├─ contacto.html → Formulario de contacto
│ ├─ login.html → Login de demostración
│ └─ estilos.css → Hoja de estilos común
├─ data/
│ └─ contactos.txt → Archivo generado dinámicamente con consultas
├─ .gitignore
├─ README.md
└─ AgroTrack.postman_collection.json


## Requisitos de ejecución
- Node.js v18 o superior instalado.
- El proyecto no necesita dependencias externas (`package.json` no requerido).

### Para ejecutar:
```bash
node server.js
Luego abrir en el navegador:
http://localhost:8888/

---------------------------
Rutas disponibles

| Método | Ruta | Descripción |
|:-------|:-----|:------------|
| GET | `/` | Página principal |
| GET | `/productos.html` | Lista de productos |
| GET | `/contacto` | Formulario de contacto |
| POST | `/guardarcontacto` | Guarda datos |
| GET | `/listarcontactos` | Muestra los registros |
| GET | `/login` | Login demo |
| POST | `/recuperardatos` | Procesa datos del login |

-------------------------------------

Funcionalidades principales
Servidor HTTP implementado con el módulo http.
Lectura y escritura de archivos mediante fs y fs.promises.
Ruteo manual por URL y método (GET/POST).
Persistencia: los datos del formulario de contacto se guardan en data/contactos.txt.
Listado dinámico: /listarcontactos muestra todas las consultas recibidas.
Login de demostración: muestra usuario y clave enviados (no valida autenticación real).
Manejo de errores 404 y 500 con mensajes personalizados en HTML.

---------------------------------------------------

Justificación técnica
Manejo de MIME types: tabla MIME define encabezados adecuados según extensión (.html, .css, .png, etc.).
Asincronía: uso de fs.readFile y fs.appendFile con callbacks y promesas.
Seguridad mínima: normalización de rutas (path.normalize) para evitar directory traversal.
Errores controlados:
404 cuando el recurso solicitado no existe.
500 cuando ocurre una excepción interna (I/O, inexistencia de carpeta data).
Escalabilidad: estructura de carpetas separada (public/ para estáticos, data/ para persistencia).
Buenas prácticas: .gitignore, nombres claros de funciones (recuperar, guardarContacto, listarContactos).

---------------------------------------------------------------------------


Pruebas exitosas
Acceso a / muestra la página principal.
Envío del formulario de contacto → genera registro en data/contactos.txt.
Acceso a /listarcontactos → muestra el listado con formato de registro.
Envío del formulario de login → muestra usuario y clave enviados.

Pruebas de error controlado
Tipo | Cómo reproducir	                            |  Resultado esperado
404	 | Ingresar a /archivo-inexistente	            |  Página con mensaje “Recurso inexistente”.
500	 | Eliminar carpeta data/ y reenviar formulario |  El servidor captura el error y continúa funcionando.

----------------------------------------------------------------------------

Colección Postman

Se incluye el archivo AgroTrack.postman_collection.json con todas las peticiones para testear el servidor.

Request	                              Método	  URL	                            Descripción
Home	                              GET	     {{baseUrl}}/	                    Página principal
Productos	                          GET	     {{baseUrl}}/productos.html	        Lista de productos
Contacto – Formulario	              GET	     {{baseUrl}}/contacto	            Formulario de contacto
Contacto – Guardar	                  POST	     {{baseUrl}}/guardarcontacto	    Guarda datos
Contacto – Listar	                  GET	     {{baseUrl}}/listarcontactos	    Muestra contactos
Login – Formulario	                  GET	     {{baseUrl}}/login	                Formulario de login
Login – Procesar	                  POST	     {{baseUrl}}/recuperardatos	        Procesa datos demo

Importar en Postman
Abrir Postman → Import
Seleccionar AgroTrack.postman_collection.json
Usar {{baseUrl}} = http://localhost:8888
Ejecutar cada request para validar las rutas.

---------------------------------------------------------------------------------


### Imagen para GitHub
![demo](/imagenes/screenshot.png.png)
![Captura de AgroTrack](/imagenes/screenshot.png.png)

