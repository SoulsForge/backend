import { CreateUserInput } from './dto/create-user.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Query } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { username },
    });
  }

  async create(data: CreateUserInput) {
    return await this.prisma.user.create({
      data: {
        ...data,
        verificationCode: this.createRandomCode(6),
      },
    });
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
