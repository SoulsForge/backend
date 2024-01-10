import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...result } = user;
    return result;
  }

  async login(user: LoginDto) {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    const access_token = this.jwtService.sign(payload);

    return {
      user,
      token: access_token,
    };
  }

  async register(payload: RegisterDto) {
    // let user = await this.userService.findByEmail(payload.email);
    //
    // if (user) throw new BadRequestException(['email already used']);
    //
    // user = await this.userService.findByUsername(payload.username, {
    //   username: true,
    // });
    //
    // if (user) throw new BadRequestException(['user already used']);

    const passwordHash = await hash(payload.password, 12);

    payload.imageUrl = payload.imageUrl
      ? payload.imageUrl
      : `https://www.gravatar.com/avatar/${payload.username}?d=robohash&f=y&s=128`;

    const data = {
      ...payload,
      password: passwordHash,
    };

    const lowerUsername = payload.username.toLowerCase();

    const user = {
      ...data,
      lowerUsername,
    };

    return this.userService.create(user);
  }

  async getProfile(userId: number) {
    return await this.userService.findProfile(userId);
  }

  async verify(user: any) {
    return await this.userService.findByUsername(user.username, {
      id: true,
      username: true,
      email: true,
      role: true,
      imageUrl: true,
      settings: true,
      createdAt: true,
      updatedAt: true,
    });
  }
}
