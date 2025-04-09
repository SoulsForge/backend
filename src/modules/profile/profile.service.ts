import { Injectable, NotFoundException } from '@nestjs/common';

import { CharacterService } from '../character/character.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly characterService: CharacterService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getMySliders(userId: number) {
    const characters = await this.characterService.findMany({
      orderBy: { createdAt: 'asc' },
      where: { userId },
      include: {
        game: true,
        user: true,
      },
    });

    return characters;
  }

  async getProfile(username: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.prisma.profile.findUnique({
      where: { userId: user.id },
      include: { user: true },
    });
  }

  async createProfile(userId: number) {
    const user = await this.userService.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = await this.prisma.profile.create({
      data: {
        avatar: `https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${user.username}`,
        user: {
          connect: { id: user.id },
        },
      },
      include: { user: true },
    });

    return profile;
  }
}
