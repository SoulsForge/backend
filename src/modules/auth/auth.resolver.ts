import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserInput } from '../user/dto/create-user.input';
import { AuthService } from './auth.service';
import { AuthPayload } from './entities/auth-payload';
import { SignInInput } from './dto/sign-in.input';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from './guards/gql-jwt-guard/gql-jwt-guard.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtUser } from './types/jwt-user';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity)
  async register(@Args('data') data: CreateUserInput) {
    return await this.authService.register(data);
  }

  @Mutation(() => AuthPayload)
  async login(@Args('data') data: SignInInput) {
    const user = await this.authService.validateLocalUser(data);

    return await this.authService.login(user);
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => UserEntity)
  async verify(@GetUser() user: JwtUser) {
    return await this.authService.verify(user.userId);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => UserEntity)
  async verifyEmail(@GetUser() user: JwtUser, @Args('code') code: string) {
    this.logger.log(user.userId, code);
    return await this.authService.verifyEmail(user.userId, code);
  }
}
