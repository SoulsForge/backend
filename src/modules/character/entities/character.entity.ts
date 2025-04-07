import { Field, ObjectType } from '@nestjs/graphql';

import { Character } from '@prisma/client';
import { GameEntity } from 'src/modules/game/entity/game.entity';
import GraphQLJSON from 'graphql-type-json';
import { JsonValue } from '@prisma/client/runtime/library';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class CharacterEntity implements Character {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  image_url: string | null;

  @Field(() => GraphQLJSON)
  sliders: JsonValue;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => GameEntity)
  game: GameEntity;
  gameId: number;

  @Field(() => UserEntity)
  user: UserEntity;
  userId: number;
}
