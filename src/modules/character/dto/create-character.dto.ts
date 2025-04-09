import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUrl } from 'class-validator';

import { EldenRingCharacterDto } from './elden-ring.dto';

@InputType()
export class CreateCharacterInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;

  @Field()
  @IsUrl()
  @IsOptional()
  image_url: string;

  @Field(() => EldenRingCharacterDto)
  sliders: EldenRingCharacterDto;
}
