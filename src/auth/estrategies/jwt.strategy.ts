import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Esta es la parte mágica: Passport ahora buscará automáticamente
      // el header "Authorization" y extraerá el valor después de "Bearer"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Asegúrate de que process.env.JWT_SECRET esté cargado correctamente en tu app
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    // Si el token es válido, esto llena el objeto "req.user" en tus controladores
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}