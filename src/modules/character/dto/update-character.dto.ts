import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateCharacterInput } from './create-character.dto';

@InputType()
export class UpdateCharacterInput extends PartialType(CreateCharacterInput) {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
