const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    await conn.ping();
    await conn.end();
    console.log('✅ Conexión OK');
  } catch (err) {
    console.error('❌ Error de conexión:', err.code, '-', err.message);
  } finally {
    process.exit(0);
  }
})();
