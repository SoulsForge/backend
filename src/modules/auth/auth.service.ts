import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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
    let user = await this.userService.findByEmail(payload.email);

    if (user) throw new BadRequestException(['email already used']);

    user = await this.userService.findByUsername(payload.username);

    if (user) throw new BadRequestException(['user already used']);

    const passwordHash = await hash(payload.password, 12);

    const data = {
      ...payload,
      password: passwordHash,
    };

    return await this.userService.create(data);
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
      createdAt: true,
      updatedAt: true,
    });
  }
}
