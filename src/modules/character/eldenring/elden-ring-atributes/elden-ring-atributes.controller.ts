import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EldenRingAtributesService } from './elden-ring-atributes.service';
import { CreateEldenRingAtributeDto } from './dto/create-elden-ring-atribute.dto';
import { UpdateEldenRingAtributeDto } from './dto/update-elden-ring-atribute.dto';
import { $Enums } from '@prisma/client';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

@Roles([$Enums.Role.ADMIN])
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('elden-ring-atributes')
export class EldenRingAtributesController {
  constructor(
    private readonly eldenRingAtributesService: EldenRingAtributesService,
  ) {}

  @Post()
  create(@Body() createEldenRingAtributeDto: CreateEldenRingAtributeDto) {
    return this.eldenRingAtributesService.create(createEldenRingAtributeDto);
  }

  @Get()
  findAll() {
    return this.eldenRingAtributesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eldenRingAtributesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEldenRingAtributeDto: UpdateEldenRingAtributeDto,
  ) {
    return this.eldenRingAtributesService.update(
      +id,
      updateEldenRingAtributeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eldenRingAtributesService.remove(+id);
  }
}
