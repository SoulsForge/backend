import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Game } from '@prisma/client';

@ObjectType()
export class GameEntity implements Game {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
