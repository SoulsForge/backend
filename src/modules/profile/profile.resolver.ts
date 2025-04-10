import { ProfileService } from './profile.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from '../auth/guards/gql-jwt-guard/gql-jwt-guard.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtUser } from '../auth/types/jwt-user';
import { CharacterEntity } from '../character/entities/character.entity';
import { ProfileEntity } from './entities/profile.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Role } from '@prisma/client';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => [CharacterEntity])
  async getMySliders(@GetUser() user: JwtUser) {
    return await this.profileService.getMySliders(user.userId);
  }

  @Query(() => ProfileEntity)
  async getProfile(@Args('username') username: string) {
    return await this.profileService.getProfile(username);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlJwtGuard, RolesGuard)
  @Mutation(() => ProfileEntity)
  async createProfile(@Args('userId') userId: number) {
    return await this.profileService.createProfile(userId);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => ProfileEntity)
  async updateProfile(
    @GetUser() user: JwtUser,
    @Args('data') data: UpdateProfileInput,
  ) {
    console.log('updateProfile', user, data);

    return await this.profileService.updateProfile(user.userId, data);
  }
}
