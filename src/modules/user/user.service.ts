import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        lowerUsername: createUserDto.lowerUsername,
        imageUrl: createUserDto.imageUrl,
        password: createUserDto.password,
        role: createUserDto.role,
        settings: {
          create: {},
        },
      },
    });
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

  async findByUsername(username: string, select: Prisma.UserSelect) {
    const usernameLower = username.toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: {
        lowerUsername: usernameLower,
      },
      select,
    });

    if (!user) {
      throw new NotFoundException(`Not found user with username ${username}`);
    }

    return user;
  }

  async findProfile(userId: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        imageUrl: true,
        username: true,
        createdAt: true,
        email: true,
        updatedAt: true,
        BaseCharacter: {
          include: { game: true, user: true, EldenRingCharacter: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
