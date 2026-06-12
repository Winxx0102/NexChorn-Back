import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  logout(res: any) {
    res.clearCookie('jwt')
    return { message: 'Sesión Cerrada', status: 'success' }

  }
async login(email: string, pass: string, res: Response) {
  console.log("--- Intento de Login ---");
  console.log("Email recibido:", email);

  const user = await this.prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    console.log("Error: Usuario no encontrado en BD");
    throw new UnauthorizedException('Usuario no encontrado');
  }

  const isMatch = await bcrypt.compare(pass, user.password);
  console.log("¿Contraseña coincide?:", isMatch);

  if (!isMatch) {
    console.log("Error: Contraseña incorrecta");
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  const payload = { sub: user.id, email: user.email, role: user.role };
  const token = this.jwtService.sign(payload);

// En tu Backend, donde haces el res.cookie
res.cookie('jwt', token, {
  httpOnly: true,
  secure: true,    // Obligatorio en HTTP (sin https)
  sameSite: 'none',
  domain: 'undefined',  // Permite que la cookie viaje entre peticiones del mismo sitio
  path: '/',
});
  console.log("Login exitoso, cookie enviada.");
  return { state: 'success', message: 'Login exitoso' };
}}