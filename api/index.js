const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../src/app.module'); // Importamos directamente de src

module.exports = async (req, res) => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};