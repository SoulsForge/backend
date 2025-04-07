import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';
import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Role)
  @IsEnum(Role)
  role: Role;
}
