const express = require('express');
const path = require('path');
require('dotenv').config();

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const contactosRouter = require('./routes/contactos');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/contactos', contactosRouter);
app.use(errorHandler);

app.get('/listarcontactos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'listarcontactos.html'));
});

app.post('/login', (req, res) => {
  const { usuario, clave } = req.body;
  if (!usuario || !clave) {
    return res.status(400).send('Faltan credenciales');
  }

  // Esto es solo una simulación de login (sin DB)
  if (usuario.toLowerCase() === 'giuli' && clave === '1234') {
    return res.status(200).send('Bienvenida, Giuli 👋');
  } else {
    return res.status(401).send('Usuario o clave incorrectos');
  }
});

app.post('/recuperardatos', (req, res) => res.redirect(307, '/login'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
