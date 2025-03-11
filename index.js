const express = require('express');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('Servidor seguro funcionando');
});

app.post('/admin-login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, message: 'Acceso concedido' });
  } else {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }
});

// Lee key y cert desde variables de entorno (Railway > Variables)
const key = process.env.SERVER_KEY.replace(/\\n/g, '\n');
const cert = process.env.SERVER_CERT.replace(/\\n/g, '\n');

const options = { key, cert };
const port = process.env.PORT || 3000;

// Servidor HTTPS
https.createServer(options, app).listen(port, '0.0.0.0', () => {
  console.log(`Servidor seguro corriendo en https://0.0.0.0:${port}`);
});
