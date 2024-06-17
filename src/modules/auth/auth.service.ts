import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';

import { Container } from 'typedi';
import { CreateUserDto } from '../user/user.dto';
import { HttpException } from '@/exceptions/http.exception';
import { LoginDto } from './auth.dto';
import { Service } from 'typedi';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import env from '@/config';
import prisma from '../db/prisma.service';
import { sign } from 'jsonwebtoken';

@Service()
export class AuthService {
  public userService = Container.get(UserService);

  async register(userData: CreateUserDto) {
    return await this.userService.createUser(userData);
  }

  async login(userData: LoginDto): Promise<{ cookie: string; data: any }> {
    const findUser = await prisma.user.findFirst({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching = await compare(userData.password, findUser.password);

    if (!isPasswordMatching) {
      throw new HttpException(409, 'Invalid credentials');
    }

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = findUser;

    return { cookie, data: { ...userWithoutPassword, token: tokenData.token } };
  }

  async logout(userData: any) {
    const findUser = await prisma.user.findFirst({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = findUser;

    return { data: userWithoutPassword };
  }

  private createToken(user: User) {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey = env.JWT_SECRET;
    const expiresIn = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
