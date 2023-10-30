import { Prisma, User } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(userId: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        BaseCharacter: true,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  findByUsername(username: string, select: Prisma.UserSelect = null) {
    const user = this.prisma.user.findUnique({
      where: {
        username,
      },
      select,
    });

    if (!user) {
      return null;
    }

    return user;
  }
  async findProfile(userId: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        BaseCharacter: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
