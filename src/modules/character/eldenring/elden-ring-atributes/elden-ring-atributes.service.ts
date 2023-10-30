import { Injectable } from '@nestjs/common';
import { CreateEldenRingAtributeDto } from './dto/create-elden-ring-atribute.dto';
import { UpdateEldenRingAtributeDto } from './dto/update-elden-ring-atribute.dto';
import { PrismaService } from 'src/modules/database/database.service';

@Injectable()
export class EldenRingAtributesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createEldenRingAtributeDto: CreateEldenRingAtributeDto) {
    const atributesEldenRing = await this.prisma.atributesEldenRing.create({
      data: createEldenRingAtributeDto,
    });

    return atributesEldenRing;
  }

  async findAll() {
    return await this.prisma.atributesEldenRing.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} eldenRingAtribute`;
  }

  async update(
    id: number,
    updateEldenRingAtributeDto: UpdateEldenRingAtributeDto,
  ) {
    return await this.prisma.atributesEldenRing.update({
      where: {
        id,
      },
      data: updateEldenRingAtributeDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} eldenRingAtribute`;
  }
}
