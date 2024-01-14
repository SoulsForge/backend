import { CreateEldenRingCharacterDto } from './dto/create-elden-ring-character.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EldenRingCharacterService } from './elden-ring-character.service';
import { UpdateEldenRingCharacterDto } from './dto/update-elden-ring-character.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('elden-ring-character')
export class EldenRingCharacterController {
  constructor(
    private readonly eldenRingCharacterService: EldenRingCharacterService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() { user },
    @Body(new ValidationPipe())
    characterDto: CreateEldenRingCharacterDto,
  ) {
    characterDto.characterDto.userId = user.userId;

    return this.eldenRingCharacterService.create(characterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.eldenRingCharacterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eldenRingCharacterService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEldenRingCharacterDto: UpdateEldenRingCharacterDto,
  ) {
    return this.eldenRingCharacterService.update(
      +id,
      updateEldenRingCharacterDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eldenRingCharacterService.remove(+id);
  }
}
