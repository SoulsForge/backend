import { Injectable, NotFoundException } from '@nestjs/common';

import { CharacterService } from '../character/character.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileInput } from './dto/update-profile.input';
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

  async updateProfile(userId: number, data: UpdateProfileInput) {
    const user = await this.userService.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // update the email or username if they are different from the current ones
    if (
      (user.email !== data.email && data.email) ||
      (user.username !== data.username && data.username)
    ) {
      await this.userService.update(userId, {
        email: data.email,
        username: data.username,
      });
    }

    // todo: if the email is different, send a verification email
    // and set the email to unverified

    if (user.email !== data.email && data.email) {
      await this.userService.unvalidateEmail(userId, data.email);
    }

    if (data.email)
      return await this.prisma.profile.update({
        where: {
          userId: userId,
        },
        data: {
          avatar: data.avatar,
        },
        include: { user: true },
      });
  }
}
