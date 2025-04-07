import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateCharacterInput } from './create-character.dto';
import { IsString } from 'class-validator';

@InputType()
export class UpdateCharacterInput extends PartialType(CreateCharacterInput) {
  @Field()
  @IsString()
  name: string;
}
