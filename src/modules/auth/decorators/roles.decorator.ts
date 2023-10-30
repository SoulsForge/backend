import { $Enums } from '@prisma/client';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<$Enums.Role[]>();
