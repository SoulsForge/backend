import { Field, InputType } from '@nestjs/graphql';

import { IsStrongPassword } from 'class-validator';

@InputType()
export class UpdatePasswordInput {
  @Field()
  oldPassword: string;

  @Field()
  @IsStrongPassword()
  newPassword: string;
}
