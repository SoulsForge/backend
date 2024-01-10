import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards, Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { UserSettings } from '@prisma/client';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  // @Post()
  // create(@Body() createProfileDto: CreateProfileDto) {
  //   return this.profileService.create(createProfileDto);
  // }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('settings')
  async getUserSettings(@Req() { user }) {
    console.log('asddsaasddsa');
    return await this.profileService.getSettings(user.userId);
  }

  @Get(':username')
  async findUsername(@Param('username') username: string) {
    return await this.profileService.findUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('settings')
  async updateSettings(@Req() { user }, @Body() updateSettingsDto: UserSettings) {
    return await this.profileService.updateSettings(user.userId, updateSettingsDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.profileService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
  //   return this.profileService.update(+id, updateProfileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileService.remove(+id);
  // }
}
