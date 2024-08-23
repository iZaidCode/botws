const express = require('express');
const bodyParser = require('body-parser');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();
const client = new Client({
    authStrategy: new LocalAuth()
});

app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/send-message', (req, res) => {
    const { number } = req.body;
    const text = "Esta es una prueba de mensaje automatico";

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
    console.log('QR generado:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Conexión exitosa');
});

client.initialize();

app.listen(3000, () => {
    console.log('Servidor corriendo en https://botws-jc30.onrender.com');
});
