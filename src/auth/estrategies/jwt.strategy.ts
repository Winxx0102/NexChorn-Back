import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          // --- DEBUG DE EXTRACCIÓN ---
          console.log("--- [JwtStrategy] Extrayendo cookie ---");
          const token = request?.cookies?.['jwt'];
          console.log("¿Token encontrado en cookie?:", token ? "SÍ" : "NO (null/undefined)");
          return token;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // --- DEBUG DE VALIDACIÓN ---
    console.log("--- [JwtStrategy] Validación del payload ---");
    console.log("Payload decodificado:", payload);

    if (!payload) {
      console.log("Error: El token no pudo ser verificado con el SECRET_KEY");
      throw new UnauthorizedException();
    }

    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}