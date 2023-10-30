import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BaseCharacterService } from './base-character.service';
import { CreateBaseCharacterDto } from './dto/create-base-character.dto';
import { UpdateBaseCharacterDto } from './dto/update-base-character.dto';

@Controller('base-character')
export class BaseCharacterController {
  constructor(private readonly baseCharacterService: BaseCharacterService) {}

  @Post()
  create(@Body() createBaseCharacterDto: CreateBaseCharacterDto) {
    return this.baseCharacterService.create(createBaseCharacterDto);
  }

  @Get()
  findAll() {
    return this.baseCharacterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseCharacterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBaseCharacterDto: UpdateBaseCharacterDto,
  ) {
    return this.baseCharacterService.update(+id, updateBaseCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseCharacterService.remove(+id);
  }
}
