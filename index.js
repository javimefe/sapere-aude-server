const express = require('express');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de tu aplicación
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

// Opciones con los archivos del certificado SSL y la clave privada
const options = {
    key: fs.readFileSync('C:/Users/javim/Downloads/Project/server/server.key'),
    cert: fs.readFileSync('C:/Users/javim/Downloads/Project/server/server.cert')
};

// Crear el servidor HTTPS en el puerto 3000
https.createServer(options, app).listen(3000, '0.0.0.0', () => {
    console.log('Servidor seguro corriendo en https://192.168.1.52:3000');
});
