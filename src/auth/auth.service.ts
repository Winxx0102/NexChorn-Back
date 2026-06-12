import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  logout(res: any) {
    res.clearCookie('jwt')
    return { message: 'Sesión Cerrada', status: 'success' }

  }

  private async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    // If password matches, return the user (omit sensitive fields if needed)
    return user;
  }

  async login(email: string, pass: string, res: Response) {
  console.log("--- Intento de Login ---");
  
  // 1. Buscar usuario
  const user = await this.prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log("Error: Usuario no encontrado");
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  // 2. Verificar contraseña
  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) {
    console.log("Error: Contraseña incorrecta");
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  // 3. Generar el JWT
  const payload = { sub: user.id, email: user.email, role: user.role };
  const token = this.jwtService.sign(payload);

  // 4. Configurar la cookie correctamente
  // Nota: Elimina la propiedad "domain: 'undefined'", eso es incorrecto.
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,    // Obligatorio para sameSite: 'none'
    sameSite: 'none', // Permite que la cookie viaje entre dominios (Frontend vs Backend)
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000// 1 hora de duración
  });

  return { state: 'success', message: 'Login exitoso' };
}
}