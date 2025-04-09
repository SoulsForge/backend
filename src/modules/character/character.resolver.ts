import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CharacterEntity } from './entities/character.entity';
import { CharacterService } from './character.service';
import { GqlJwtGuard } from '../auth/guards/gql-jwt-guard/gql-jwt-guard.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CreateCharacterInput } from './dto/create-character.dto';
import { JwtUser } from '../auth/types/jwt-user';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UpdateCharacterInput } from './dto/update-character.dto';

@Resolver()
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => CharacterEntity)
  async createEldenRingCharacter(
    @GetUser() user: JwtUser,
    @Args('data') createCharacter: CreateCharacterInput,
  ) {
    return await this.characterService.create(createCharacter, 1, user.userId);
  }

  @Query(() => CharacterEntity)
  async getEldenRingCharacter(@Args('id') id: string) {
    if (!id) {
      throw new BadRequestException('Character ID is required');
    }

    return await this.characterService.getById(id);
  }

  @Query(() => [CharacterEntity])
  async getEldenRingCharacters(@Args('userId') userId: number) {
    return await this.characterService.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      include: {
        game: true,
        user: true,
      },
    });
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => CharacterEntity)
  async updateEldenRingCharacter(
    @GetUser() user: JwtUser,
    @Args('data', { type: () => UpdateCharacterInput })
    updateCharacter: UpdateCharacterInput,
    @Args('id') id: string,
  ) {
    return await this.characterService.update(updateCharacter, id, user.userId);
  }
}
