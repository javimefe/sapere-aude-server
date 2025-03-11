const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Endpoint para el login de admin
app.post('/admin-login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, message: 'Acceso concedido' });
  } else {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});
