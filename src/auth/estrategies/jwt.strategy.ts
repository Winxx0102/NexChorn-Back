import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Cambiamos la forma de extraer el JWT
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          let token = null;
          // Asumimos que tu cookie se llama 'token'. 
          // Si tu backend la llama de otra forma (ej: 'auth_cookie'), cámbialo aquí.
          if (request && request.cookies) {
            token = request?.cookies['jwt']; 
          }
          return token;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}