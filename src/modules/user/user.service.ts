import { CreateUserInput } from './dto/create-user.input';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Query } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
