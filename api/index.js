// api/index.js
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { PrismaService } = require('../dist/src/prisma/prisma.service');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Forzamos la conexión a la base de datos antes de que la app escuche
  const prisma = app.get(PrismaService);
  await prisma.onModuleInit(); // Esto ejecutará tu console.log()
  
  await app.init();
  return app;
}