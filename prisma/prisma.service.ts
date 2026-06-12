import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// src/prisma.service.ts
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
      // Configuramos un timeout explícito para que no se cuelgue
      await this.$connect();
      console.log('✅ Conectado a Supabase');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('❌ Error de conexión:', error.message);
      } else {
        console.error('❌ Error de conexión:', error);
      }
    }
  }
}