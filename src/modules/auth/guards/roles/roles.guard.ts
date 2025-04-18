import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    console.log('User:', user);
    

    const hasRequiredRoles = requiredRoles.some((role) => user.role === role);

    return hasRequiredRoles;
  }
}
