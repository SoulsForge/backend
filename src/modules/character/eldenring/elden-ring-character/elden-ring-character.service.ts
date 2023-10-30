import { EldenRingAtributesService } from './../elden-ring-atributes/elden-ring-atributes.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEldenRingCharacterDto } from './dto/create-elden-ring-character.dto';
import { UpdateEldenRingCharacterDto } from './dto/update-elden-ring-character.dto';
import { CreateEldenRingAtributeDto } from '../elden-ring-atributes/dto/create-elden-ring-atribute.dto';
import { PrismaService } from 'src/modules/database/database.service';
import { CreateBaseCharacterDto } from '../../base-character/dto/create-base-character.dto';
import { BaseCharacterService } from '../../base-character/base-character.service';

@Injectable()
export class EldenRingCharacterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eldenRingAtributesService: EldenRingAtributesService,
    private readonly baseCharacterService: BaseCharacterService,
  ) {}

  async create(eldenRingCharacterDto: CreateEldenRingCharacterDto) {
    const { characterDto, atributesDto } = eldenRingCharacterDto;

    // create base character
    const { id: baseCharId } =
      await this.baseCharacterService.create(characterDto);

    // create atributes
    const { id: atributesId } =
      await this.eldenRingAtributesService.create(atributesDto);

    const eldenRingCharacter = await this.prisma.eldenRingCharacter.create({
      data: {
        baseCharacter: { connect: { id: baseCharId } },
        atributes: { connect: { id: atributesId } },
      },
      include: { baseCharacter: true, atributes: true },
    });

    return eldenRingCharacter;
  }

  findAll() {
    return `This action returns all eldenRingCharacter`;
  }

  findOne(id: number) {
    const char = this.prisma.eldenRingCharacter.findUnique({
      where: { id },
      include: { baseCharacter: true, atributes: true },
    });

    if (!char) throw new NotFoundException();

    return char;
  }

  async update(
    id: number,
    updateEldenRingCharacterDto: UpdateEldenRingCharacterDto,
  ) {
    const char = await this.findOne(id);

    if (!char) throw new NotFoundException();

    const { baseCharacterId, atributesId } = char;

    // update base character
    await this.baseCharacterService.update(
      baseCharacterId,
      updateEldenRingCharacterDto.characterDto,
    );

    // update atributes
    await this.eldenRingAtributesService.update(
      atributesId,
      updateEldenRingCharacterDto.atributesDto,
    );

    const modChar = await this.prisma.eldenRingCharacter.update({
      data: {},
      where: { id },
      include: {
        atributes: true,
        baseCharacter: true,
      },
    });

    return modChar;
  }

  remove(id: number) {
    return `This action removes a #${id} eldenRingCharacter`;
  }
}
