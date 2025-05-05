# Usa una imagen oficial de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto en el que la app escucha
EXPOSE 3000

# Ejecutar la aplicación
CMD ["node", "app.js"]
