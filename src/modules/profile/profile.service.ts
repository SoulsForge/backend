import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from '../user/user.service';
import { UserSettings } from '@prisma/client';
import { PrismaService } from '../database/database.service';

@Injectable()
export class ProfileService {
  constructor(private readonly userService: UserService, private prisma: PrismaService) {
  }

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async findUsername(username: string) {
    const user = await this.userService.findByUsername(username, {
      id: true,
      username: true,
      email: true,
      BaseCharacter: { include: { game: true } },
      createdAt: true,
      imageUrl: true,
    });

    if (!user) {
      return { message: 'user not found' };
    }
    return user;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  async updateSettings(userid: number, updateSettingsDto: UserSettings) {
    const user = await this.userService.findOne(userid);

    await this.prisma.userSettings.update({
      where: {
        id: user.userSettingsId
      },
      data: updateSettingsDto
    });

    return true;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }

  async getSettings(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { settings: true } });

    if (!user) {
      throw new BadRequestException();
    }
    console.log(user);
    return user.settings;
  }
}
