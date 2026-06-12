const express = require('express');
const { createNestServer } = require('../dist/main'); // Ajusta la ruta a tu main.js compilado

const server = express();

const bootstrap = async () => {
  const app = await createNestServer(server);
  return app;
};

bootstrap();

module.exports = server;