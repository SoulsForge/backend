import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from '../database/database.service';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto) {
    return await this.prisma.game.create({ data: createGameDto });
  }

  async findAll() {
    return await this.prisma.game.findMany();
  }

  async findOne(id: number) {
    const game = await this.prisma.game.findUnique({ where: { id } });

    if (!game) throw new NotFoundException();

    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    return await this.prisma.game.update({
      data: updateGameDto,
      where: { id },
    });
  }

  async remove(id: number) {
    const game = await this.findOne(id);

    if (!game) throw new NotFoundException();

    return await this.prisma.game.delete({ where: { id } });
  }
}
