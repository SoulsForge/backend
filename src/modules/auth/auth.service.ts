import * as argon2 from 'argon2';

import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthJwtPayload } from './types/auth-jwt.payload';
import { AuthPayload } from './entities/auth-payload';
import { CreateUserInput } from '../user/dto/create-user.input';
import { JwtService } from '@nestjs/jwt';
import { JwtUser } from './types/jwt-user';
import { SignInInput } from './dto/sign-in.input';
import { UpdateUserInput } from '../user/dto/update-user.input';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateUserInput) {
    const hashedPassword = await argon2.hash(data.password);
    data.password = hashedPassword;

    try {
      return await this.userService.create(data);
    } catch (e) {
      this.logger.error(e);

      if (e.code === 'P2002') {
        const field = e.meta.target[0];
        throw new BadRequestException(`${field} already exists`);
      }

      throw new BadRequestException(e);
    }
  }

  async updateUser(id: number, data: UpdateUserInput) {
    if (data.password) {
      const hashedPassword = await argon2.hash(data.password);
      data.password = hashedPassword;
    }

    return await this.userService.update(id, data);
  }

  async verify(userId: number) {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async validateLocalUser({ username, password }: SignInInput) {
    let user: UserEntity;
    try {
      user = await this.userService.findByUsername(username);
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = {
      sub: {
        userId,
      },
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async login(user: UserEntity): Promise<AuthPayload> {
    const { accessToken } = await this.generateToken(user.id);

    return {
      user,
      accessToken,
      role: user.role,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId);
    const jwtUser: JwtUser = {
      userId: user.id,
      role: user.role,
    };

    return jwtUser;
  }
}
