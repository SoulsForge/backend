import {PrismaService} from './../../database/database.service';
import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateBaseCharacterDto} from './dto/create-base-character.dto';
import {UpdateBaseCharacterDto} from './dto/update-base-character.dto';

@Injectable()
export class BaseCharacterService {
  constructor(private prisma: PrismaService) {
  }

  async create(createBaseCharacterDto: CreateBaseCharacterDto) {
    const {gameId, userId, name, description, imageUrl, specificCharacterId} =
      createBaseCharacterDto;

    const game = await this.prisma.game.findUnique({where: {id: gameId}});

    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    const user = await this.prisma.user.findUnique({where: {id: userId}});
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const baseCharacter = await this.prisma.baseCharacter.create({
      data: {
        name,
        description,
        imageUrl,
        specificCharacterId,
        game: {connect: {id: gameId}},
        user: {connect: {id: userId}},
      },
      include: {EldenRingCharacter: true}, // Incluye otras relaciones si es necesario
    });

    return baseCharacter;
  }

  async findAll() {
    return await this.prisma.baseCharacter.findMany({
      include: {game: true}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} baseCharacter aa`;
  }

  async update(id: number, updateBaseCharacterDto: UpdateBaseCharacterDto) {
    return await this.prisma.baseCharacter.update({
      where: {
        id,
      },
      data: updateBaseCharacterDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} baseCharacter aa`;
  }
}
