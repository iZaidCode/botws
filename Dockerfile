# Usa una imagen base de Node.js
FROM node:18-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json a la imagen
COPY package*.json ./

# Instala las dependencias
RUN npm install -g n && \
    npm install && \
    npm install whatsapp-web.js rimraf@latest glob@latest puppeteer@latest qrcode-terminal express body-parser

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que tu aplicación va a correr
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "main.js"]
