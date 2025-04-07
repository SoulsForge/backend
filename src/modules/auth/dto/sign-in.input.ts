import { Field, InputType } from '@nestjs/graphql';

import { IsString } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  password: string;
}
