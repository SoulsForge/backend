import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Logger } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserEntity)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity], { name: 'users' })
  async findAll() {
    this.logger.debug('Fetching all users');
    return await this.userService.findMany();
  }

  @Query(() => UserEntity)
  async getUser(@Args('id') id: string) {
    this.logger.debug(`Fetching user with id ${id}`);
    return await this.userService.findOne(id);
  }

  @Mutation(() => UserEntity)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => UserEntity)
  async removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }

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
