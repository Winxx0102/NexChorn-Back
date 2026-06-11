import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // Obtenemos los roles requeridos del decorador @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no hay roles requeridos, permitimos el acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Obtenemos la solicitud HTTP
    const request = context.switchToHttp().getRequest();

    // Obtenemos el usuario autenticado (populado por JwtStrategy)
    const user = request.user;

    // Si no hay usuario (no hay cookie válida), rechazamos
    if (!user) {
      throw new ForbiddenException('No hay usuario autenticado');
    }

    // Obtenemos el rol del usuario desde el JWT (request.user.role)
    const userRole = user.role;

    // Verificamos si el rol del usuario está en los roles requeridos
    if (!requiredRoles.includes(userRole as Role)) {
      throw new ForbiddenException(
        `Se requiere al menos uno de los siguientes roles: ${requiredRoles.join(', ')}. Tu rol actual: ${userRole}`
      );
    }

    return true;
  }
}