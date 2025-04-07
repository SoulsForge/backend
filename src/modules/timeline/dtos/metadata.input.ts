import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

@InputType()
export class Metadata {
  @Field()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number;
}
