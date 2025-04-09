import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Logger, UseGuards } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlJwtGuard } from '../auth/guards/gql-jwt-guard/gql-jwt-guard.guard';
import { JwtUser } from '../auth/types/jwt-user';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';

@Resolver(() => UserEntity)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  // @Query(() => [UserEntity], { name: 'users' })
  // async findAll() {
  //   this.logger.debug('Fetching all users');
  //   return await this.userService.findMany();
  // }

  @Query(() => UserEntity)
  async getUser(@Args('id') id: number) {
    return await this.userService.findOne({
      where: { id },
      include: { profile: true, Character: true },
    });
  }

  // @Mutation(() => UserEntity)
  // async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return await this.userService.create(createUserInput);
  // }

  @Roles(Role.ADMIN)
  @UseGuards(GqlJwtGuard, RolesGuard)
  @Mutation(() => UserEntity)
  async updateUser(
    @GetUser() user: JwtUser,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(user.userId, updateUserInput);
  }

  // @Mutation(() => UserEntity)
  // async removeUser(@Args('id') id: string) {
  //   return this.userService.remove(id);
  // }

  // @ResolveField('profile')
  // getProfile(@Parent() user: UserEntity) {
  //   this.logger.debug(`Fetching profile for user ${user.id}`);
  //   return {
  //     bio: 'I am a user of this app',
  //     id: '1',
  //     userId: user.id,
  //   };
  // }
}
