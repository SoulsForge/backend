import * as argon2 from 'argon2';

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthJwtPayload } from './types/auth-jwt.payload';
import { AuthPayload } from './entities/auth-payload';
import { CreateUserInput } from '../user/dto/create-user.input';
import { EmailService } from '../email/email.service';
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
    private readonly emailService: EmailService,
  ) {}

  async register(data: CreateUserInput) {
    const hashedPassword = await argon2.hash(data.password);
    data.password = hashedPassword;

    try {
      const newUser = await this.userService.create(data);

      const { verificationCode } = newUser;

      const redirectUrl = new URL(
        `${process.env.FRONTEND_SERVER}/verify-email`,
      );

      const token = await this.generateToken(newUser.id);

      redirectUrl.searchParams.append('code', verificationCode || '');
      redirectUrl.searchParams.append('token', token.accessToken);

      const htmlBody = `<h1>Welcome to SoulsForge</h1>
      <p>To verify your email, please use the following code:</p>
      <h2>${verificationCode}</h2>
      <br />
      <div>
        <p>Otherwise, you can click the link below:</p>
        <a href="${redirectUrl.toString()}">Verify Email</a>
        <strong>Note:</strong> This link will expire in 30 days.
      </div>
      <p>If you didn't create an account, please ignore this email.</p>`;

      await this.emailService.sendMail(
        'accounts',
        newUser.email,
        'SoulsForge - Verify your email',
        htmlBody,
      );

      return newUser;
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
    const user = await this.userService.findOne({ where: { id: userId }, include:{profile:true} });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async verifyEmail(userId: number, code: string) {
    const user = await this.userService.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const verifyCode = user.verificationCode;
    if (!verifyCode) {
      throw new BadRequestException('User already verified');
    }

    if (verifyCode !== code) {
      throw new BadRequestException('Invalid verification code');
    }

    user.emailVerified = true;
    user.verificationCode = null;
    const newUser = await this.userService.update(userId, user);

    return newUser;
  }

  async validateLocalUser({ username, password }: SignInInput) {
    let user;
    try {
      user = await this.userService.findOne({
        where: { username },
        include: { profile: true },
      });
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

  async validateUser(email: string) {
    const user = await this.userService.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
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
    const user = await this.userService.findOne({ where: { id: userId } });
    const jwtUser: JwtUser = {
      userId: user.id,
      role: user.role,
    };

    return jwtUser;
  }
}
