import { Injectable } from '@nestjs/common';
import { CreateEldenRingAttributeDto } from './dto/create-elden-ring-atribute.dto';
import { UpdateEldenRingAttributeDto } from './dto/update-elden-ring-attribute.dto';
import { PrismaService } from 'src/modules/database/database.service';

@Injectable()
export class EldenRingAtributesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEldenRingAtributeDto: CreateEldenRingAttributeDto) {
    const attributesEldenRing = await this.prisma.attributesEldenRing.create({
      data: createEldenRingAtributeDto,
    });

    return attributesEldenRing;
  }

  async findAll() {
    return await this.prisma.attributesEldenRing.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} eldenRingAttribute`;
  }

  async update(
    id: number,
    updateEldenRingAttributeDto: UpdateEldenRingAttributeDto,
  ) {
    return await this.prisma.attributesEldenRing.update({
      where: {
        id,
      },
      data: updateEldenRingAttributeDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} eldenRingAttribute`;
  }
}
