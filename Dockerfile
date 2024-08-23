# Usa una imagen base de Node.js
FROM node:18

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json (o yarn.lock) al contenedor
COPY package*.json ./

# Instala las dependencias globales
RUN npm install -g n

# Instala las dependencias del proyecto
RUN npm install \
    whatsapp-web.js \
    rimraf@latest \
    glob@latest \
    puppeteer@latest \
    qrcode-terminal \
    express \
    body-parser

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto en el que tu aplicación estará escuchando
EXPOSE 3000

# Comando para ejecutar tu aplicación
CMD ["node", "main.js"]

