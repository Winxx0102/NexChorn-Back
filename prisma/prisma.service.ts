import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      // Intentamos conectar con un timeout más permisivo
      await this.$connect();
      console.log('✅ Conectado a Supabase');
    } catch (error) {
      console.error('❌ Error de conexión:', error);
    }
  }
}