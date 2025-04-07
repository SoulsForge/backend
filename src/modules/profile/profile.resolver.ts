import { ProfileService } from './profile.service';
import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from '../auth/guards/gql-jwt-guard/gql-jwt-guard.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtUser } from '../auth/types/jwt-user';
import { CharacterEntity } from '../character/entities/character.entity';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => [CharacterEntity])
  async getMySliders(@GetUser() user: JwtUser) {
    return await this.profileService.getMySliders(user.userId);
  }
}
