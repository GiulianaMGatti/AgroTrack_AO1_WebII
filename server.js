const http = require('http');
const fs = require('fs');

// Mapa MIME
const MIME = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain'

};

const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:8888' + pedido.url);
    let camino = 'public' + url.pathname;
    if (camino == 'public/' || camino == 'public/index' || camino == 'public/index.html')
        camino = 'public/index.html';

    if (camino === 'public/contacto') {
        camino = 'public/contacto.html';
    }
    if (camino === 'public/login') {
        camino = 'public/login.html';
    }

    // Rutas de acciones (no archivos):
    // POST /recuperardatos → recuperar()
    if (url.pathname === '/recuperardatos' && pedido.method === 'POST') {
        return recuperar(pedido, respuesta);
    }

    // POST /guardarcontacto → guardarContacto()
    if (url.pathname === '/guardarcontacto' && pedido.method === 'POST') {
        return guardarContacto(pedido, respuesta);
    }

    // GET /listarcontactos → listarContactos()
    if (url.pathname === '/listarcontactos' && pedido.method === 'GET') {
        return listarContactos(respuesta);
    }
    encaminar(pedido, respuesta, camino);


});

servidor.listen(8888);

// funcion para encaminar las solicitudes
function encaminar(pedido, respuesta, camino) {
    console.log(camino)
    switch (camino) {
        case 'public/recuperardatos': {
            recuperar(pedido, respuesta);
            break;
        }
        default: {
            fs.stat(camino, error => {
                if (!error) {
                    fs.readFile(camino, (error, contenido) => {
                        if (error) {
                            respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                            respuesta.write('Error interno');
                            respuesta.end();
                        } else {
                            const vec = camino.split('.');
                            const extension = vec[vec.length - 1];
                            const mime = MIME['.' + extension];
                            respuesta.writeHead(200, { 'Content-Type': mime });
                            respuesta.write(contenido);
                            respuesta.end();
                        }
                    });
                } else {
                    respuesta.writeHead(404, { 'Content-Type': 'text/html' });
                    respuesta.write('<!DOCTYPE html><html><head></head><body>Recurso inexistente</body></html>');
                    respuesta.end();
                }
            });
        }
    }
}

//funcion para recuperar datos del formulario (login demo)
function recuperar(pedido, respuesta) {
    let info = ''
    pedido.on('data', datosparciales => {
        info += datosparciales;
        console.log(info);
    });
    pedido.on('end', () => {
        const formulario = new URLSearchParams(info);
        console.log(formulario);
        respuesta.writeHead(200, { 'Content-Type': 'text/html' });
        const pagina =
            `<!doctype html><html><head></head><body>  Nombre de usuario: ${formulario.get('usuario')}
        <br>  Clave: ${formulario.get('clave')}
        <br> <a href="index.html">  Retornar</a> </body></html>`
        respuesta.end(pagina);
    });
}

// funcion para guardar datos del formulario en un archivo
function guardarContacto(pedido, respuesta) {
    let info = ''
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', () => {
        const formulario = new URLSearchParams(info);
        console.log(formulario);

        try {
            fs.mkdirSync('data', { recursive: true });
        } catch (err) {
            console.error('Error al crear el directorio data:', err);
        }

        const pagina = `<!doctype html><html><head></head><body> Gracias ${formulario.get('nombre')} por contactarte con nosotros.
        <br> En breve nos comunicaremos a tu email: ${formulario.get('email')}
        <br> 
        <a href="index.html">Retornar</a> 
        </body></html>`
        respuesta.writeHead(200, { 'Content-Type': 'text/html' });
        respuesta.end(pagina);
        grabarEnArchivo(formulario);
    });
}

// funcion para grabar en archivo
function grabarEnArchivo(formulario) {
    const datos = `
    ===========================
    Fecha: ${new Date().toLocaleString()} - \n
    Nombre: ${formulario.get('nombre')} - \n
    Email: ${formulario.get('email')} - \n
    Mensaje: ${formulario.get('mensaje')}\n
    ===========================\n`;

    fs.appendFile('data/contactos.txt', datos, (err) => {
        if (err) {
            console.error('Error al guardar los datos en el archivo:', err);
        } else {
            console.log('Datos guardados en el archivo contactos.txt');
        }
    });
}

//funcion para listar los contactos guardados
function listarContactos(respuesta) {
    fs.readFile('data/contactos.txt', 'utf8', (err, datos) => {
        respuesta.writeHead(200, { 'Content-Type': 'text/html' });
        if (err) {
            respuesta.end('<!doctype html><html><head></head><body>No hay contactos registrados.<br><a href="index.html">Retornar</a></body></html>');
        } else {
            respuesta.write('<!doctype html><html><head></head><body><h1>- Contactos Registrados -</h1><ul>');
            const lineas = datos.split('\n');
            lineas.forEach(linea => {
                if (linea.trim() !== '') {
                    respuesta.write(`<li>${linea}</li>`);
                }
            });
            respuesta.end('</ul><br><a href="index.html"> Retornar </a></body></html>');
        }
    });
}


console.log('Servidor escuchando en http://localhost:8888');







