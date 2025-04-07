import { $Enums, Role, User } from '@prisma/client';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity implements User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  password: string;

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
