import { $Enums } from '@prisma/client';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isMatch = matchRoles(roles, user.role);

    console.log('isMAtch', isMatch);

    return isMatch;
  }
}

function matchRoles(roles: $Enums.Role[], userRole: string): boolean {
  return roles.some((role) => role === userRole);
}
