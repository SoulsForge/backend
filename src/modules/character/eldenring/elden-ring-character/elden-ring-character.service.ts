import { EldenRingAtributesService } from './../elden-ring-atributes/elden-ring-atributes.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEldenRingCharacterDto } from './dto/create-elden-ring-character.dto';
import { UpdateEldenRingCharacterDto } from './dto/update-elden-ring-character.dto';
import { PrismaService } from 'src/modules/database/database.service';
import { BaseCharacterService } from '../../base-character/base-character.service';

@Injectable()
export class EldenRingCharacterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eldenRingAtributesService: EldenRingAtributesService,
    private readonly baseCharacterService: BaseCharacterService,
  ) {}

  async create(eldenRingCharacterDto: CreateEldenRingCharacterDto) {
    const { characterDto, attributesDto } = eldenRingCharacterDto;

    // create base character
    const { id: baseCharId } =
      await this.baseCharacterService.create(characterDto);

    // create attributes
    const { id: attributesId } =
      await this.eldenRingAtributesService.create(attributesDto);

    const eldenRingCharacter = await this.prisma.eldenRingCharacter.create({
      data: {
        baseCharacter: { connect: { id: baseCharId } },
        attributes: { connect: { id: attributesId } },
      },
      include: { baseCharacter: true, attributes: true },
    });

    const modBaseChar = await this.baseCharacterService.update(baseCharId, {
      specificCharacterId: eldenRingCharacter.id,
    });

    eldenRingCharacter.baseCharacter = modBaseChar;

    return eldenRingCharacter;
  }

  findAll() {
    return `This action returns all eldenRingCharacter`;
  }

  async findOne(id: number) {
    try {
      const char = await this.prisma.eldenRingCharacter.findUnique({
        where: { id },
        include: {
          baseCharacter: { include: { game: true, user: true } },
          attributes: true,
        },
      });

      if (!char) throw new NotFoundException();
      return char;
    } catch (e) {
      console.log('error ER findone', e.message);
    }
  }

  async update(
    id: number,
    updateEldenRingCharacterDto: UpdateEldenRingCharacterDto,
  ) {
    const char = await this.findOne(id);

    if (!char) throw new NotFoundException();

    const { baseCharacterId, attributesId } = char;

    // update base character
    await this.baseCharacterService.update(
      baseCharacterId,
      updateEldenRingCharacterDto.characterDto,
    );

    // update attributes
    await this.eldenRingAtributesService.update(
      attributesId,
      updateEldenRingCharacterDto.attributesDto,
    );

    const modChar = await this.prisma.eldenRingCharacter.update({
      data: {},
      where: { id },
      include: {
        attributes: true,
        baseCharacter: true,
      },
    });

    return modChar;
  }

  remove(id: number) {
    return `This action removes a #${id} eldenRingCharacter`;
  }
}
