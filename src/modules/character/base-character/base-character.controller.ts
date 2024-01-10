import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BaseCharacterService } from './base-character.service';
import { CreateBaseCharacterDto } from './dto/create-base-character.dto';
import { UpdateBaseCharacterDto } from './dto/update-base-character.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from 'src/common/pipes/file-size-validation.pipe';

@Controller('base-character')
export class BaseCharacterController {
  constructor(private readonly baseCharacterService: BaseCharacterService) {}

  @Post()
  create(@Body() createBaseCharacterDto: CreateBaseCharacterDto) {
    return this.baseCharacterService.create(createBaseCharacterDto);
  }

  @Get()
  async findAll() {
    return await this.baseCharacterService.findAll();
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

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-image')
  async uploadImage(
    @UploadedFile(new FileSizeValidationPipe(2000))
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
