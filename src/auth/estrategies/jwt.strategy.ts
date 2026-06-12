import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          console.log("--- [JwtStrategy] 1. Extrayendo cookie ---");
          const token = request?.cookies?.['jwt'];
          
          // Debug visual: ¿Llega algo?
          console.log(`[JwtStrategy] ¿Token presente?: ${token ? 'SÍ (' + token.substring(0, 10) + '...)' : 'NO'}`);
          
          return token;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Si este log NO aparece, significa que el token falló la validación de firma
    console.log("--- [JwtStrategy] 2. Validación iniciada ---");
    
    if (!payload) {
      console.log("[JwtStrategy] ERROR: Payload es nulo/inválido");
      throw new UnauthorizedException();
    }

    // Si esto aparece, ¡la autenticación fue exitosa!
    console.log("[JwtStrategy] 3. Payload validado exitosamente:", payload);
    
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}