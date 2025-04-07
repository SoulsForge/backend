import { Character, Prisma } from '@prisma/client';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateCharacterInput } from './dto/create-character.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCharacterInput } from './dto/update-character.dto';

@Injectable()
export class CharacterService {
  private readonly logger = new Logger(CharacterService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCharacter: CreateCharacterInput,
    gameId: number,
    userId: number,
  ) {
    this.logger.debug(`Creating character for user ${userId}, game ${gameId}`);

    try {
      const newChar = await this.prisma.character.create({
        data: {
          ...createCharacter,
          sliders: JSON.parse(JSON.stringify(createCharacter.sliders)),
          game: { connect: { id: gameId } },
          user: { connect: { id: userId } },
        },
        select: {
          id: true,
          name: true,
          description: true,
          sliders: true,
          game: true,
          user: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return newChar;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error creating character');
    }
  }

  async getById(id: string) {
    this.logger.debug(`Fetching character with id ${id}`);

    const newChar = await this.prisma.character.findUnique({
      where: { id },
      include: { game: true, user: true },
    });

    if (!newChar) {
      throw new NotFoundException('Character not found');
    }

    return newChar;
  }

  async update(
    updateCharacter: UpdateCharacterInput,
    id: string,
    userId: number,
  ) {
    this.logger.debug(`Updating character for user ${userId}`);

    const prevChar = await this.getById(id);

    if (!prevChar) {
      throw new NotFoundException('Character not found');
    }

    if (prevChar.userId !== userId) {
      throw new UnauthorizedException();
    }

    const updatedChar = await this.prisma.character.update({
      where: { id },
      data: {
        ...updateCharacter,
        sliders: JSON.parse(JSON.stringify(updateCharacter.sliders)),
        game: { connect: { id: prevChar.gameId } },
        user: { connect: { id: userId } },
      },
      include: { game: true, user: true },
    });

    return updatedChar;
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CharacterWhereUniqueInput;
    where?: Prisma.CharacterWhereInput;
    orderBy?: Prisma.CharacterOrderByWithRelationInput;
    include?: Prisma.CharacterInclude;
  }): Promise<Character[]> {
    const { skip, take, cursor, where, orderBy, include } = params;

    return await this.prisma.character.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }
}
