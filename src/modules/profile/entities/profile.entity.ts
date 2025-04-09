import { Field, ObjectType } from '@nestjs/graphql';

import { Profile } from '@prisma/client';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class ProfileEntity implements Profile {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  avatar: string | null;

  userId: number;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
