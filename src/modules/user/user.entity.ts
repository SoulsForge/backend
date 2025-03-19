import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '@prisma/client';

@ObjectType()
export class UserEntity implements User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
