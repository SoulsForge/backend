import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsUrl()
  avatar: string;
}
