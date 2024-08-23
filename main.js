const express = require('express');
const bodyParser = require('body-parser');
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

const app = express();
const client = new Client({
    authStrategy: new LocalAuth()
});

app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Serve the QR code image
app.use('/qr', express.static(__dirname));

// Handle form submission
app.post('/send-message', (req, res) => {
    const { number } = req.body;
    const text = "Esta es una prueba de mensaje automático";

    const chatId = number.substring(1) + "@c.us";

    client.sendMessage(chatId, text).then(response => {
        console.log('Mensaje enviado:', response);
        res.status(200).send('Mensaje enviado');
    }).catch(err => {
        console.error('Error al enviar el mensaje:', err);
        res.status(500).send('Error al enviar el mensaje');
    });
});

// Health check endpoint
app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

client.on('qr', qr => {
    qrcode.toFile(path.join(__dirname, 'qr.png'), qr, (err) => {
        if (err) {
            console.error('Error al generar el QR:', err);
            return;
        }
        console.log('QR guardado en qr.png');
    });
});

client.on('ready', () => {
    console.log('Conexión exitosa');
});

client.initialize();

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
