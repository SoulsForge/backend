import { $Enums, Role, User } from '@prisma/client';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';

@ObjectType()
export class UserEntity implements User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field(() => Boolean)
  emailVerified: boolean;

  verificationCode: string | null;

  @Field()
  username: string;

  password: string;

  @Field(() => ProfileEntity)
  profile: ProfileEntity;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Role)
  role: $Enums.Role;
}

registerEnumType(Role, {
  name: 'Role',
});
