import { Field, ObjectType } from '@nestjs/graphql';

import { Role } from '@prisma/client';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class AuthPayload {
  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  accessToken: string;

  @Field()
  role: Role;
}
