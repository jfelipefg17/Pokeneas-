// app.js
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const pokeneas = require('./pokeneas/data');

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 80;

function getContainerId() {
  try {
    return fs.readFileSync('/etc/hostname', 'utf8').trim();
  } catch (err) {
    return 'local-machine'; // En caso de que no esté en Docker
  }
}

// Ruta JSON con info aleatoria
app.get('/api/pokenea', (req, res) => {
  const random = pokeneas[Math.floor(Math.random() * pokeneas.length)];
  const containerId = getContainerId();
  // Renderizamos una vista en lugar de JSON crudo
  res.render('api-pokenea', { pokenea: random, containerId });
});

// Ruta HTML con imagen + frase aleatoria
app.get('/pokenea', (req, res) => {
  const random = pokeneas[Math.floor(Math.random() * pokeneas.length)];
  const containerId = getContainerId();
  res.render('pokenea', { pokenea: random, containerId });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
