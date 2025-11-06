const express = require('express');
const pool = require('../db');
const router = express.Router();

function validar({ nombre, email, mensaje }) {
  if (!nombre || !email || !mensaje) {
    const e = new Error('nombre, email y mensaje son obligatorios');
    e.status = 400; throw e;
  }
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!ok) { const e = new Error('email no válido'); e.status = 400; throw e; }
}

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contactos ORDER BY fecha DESC');
    res.json(rows);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body) {
      const e = new Error('Cuerpo de la solicitud vacío'); e.status = 400; throw e;
    }
    const { nombre, email, mensaje } = req.body; // ya no explota
    if (!nombre || !email || !mensaje) {
      const e = new Error('nombre, email y mensaje son obligatorios'); e.status = 400; throw e;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const e = new Error('email no válido'); e.status = 400; throw e;
    }
    const [r] = await pool.query(
      'INSERT INTO contactos (nombre,email,mensaje) VALUES (?,?,?)',
      [nombre, email, mensaje]
    );
    res.status(201).json({ id: r.insertId, nombre, email, mensaje });
  } catch (err) { next(err); }
});


module.exports = router;
