import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      console.log('--- INTENTANDO CONECTAR A DB ---');
      await this.$connect();
      console.log('--- CONEXIÓN EXITOSA ---');
    } catch (error) {
      const prismaError = error instanceof Error ? error : new Error(String(error));
      console.error('--- ERROR CRÍTICO DE PRISMA ---');
      console.error('Mensaje:', prismaError.message);
      console.error('Stack:', prismaError.stack);
      console.error('--------------------------------');
    }
  }
}