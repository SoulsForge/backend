import { Role } from '@prisma/client';

export type JwtUser = {
  userId: number;
  role: Role;
};
