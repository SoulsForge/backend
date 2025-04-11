import { CreateUserInput } from './dto/create-user.input';
import { EmailService } from '../email/email.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
    include,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    include?: Prisma.UserInclude;
  }) {
    return await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async findOne({
    where,
    include,
  }: {
    where: Prisma.UserWhereUniqueInput;
    include?: Prisma.UserInclude;
  }) {
    return await this.prisma.user.findUniqueOrThrow({
      where,
      include,
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { username },
      include: { Character: true },
    });
  }

  async create(data: CreateUserInput) {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        verificationCode: this.createRandomCode(6),
        profile: {
          create: {
            avatar: `https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${data.username}`,
          },
        },
      },
    });

    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async unvalidateEmail(userId: number, newEmail: string) {
    const verificationCode = this.createRandomCode(6);

    const redirectUrl = new URL(`${process.env.FRONTEND_SERVER}/verify-email`);

    redirectUrl.searchParams.append('code', verificationCode || '');

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
      newEmail,
      'SoulsForge - Verify your email',
      htmlBody,
    );

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: false,
        verificationCode,
      },
    });
  }

  private createRandomCode(size: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    const charactersLength = characters.length;

    for (let i = 0; i < size; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
