import Container, { Service } from 'typedi';
import { Game, SubdetailType } from '@prisma/client';

import { HttpException } from '@/exceptions/http.exception';
import { UserService } from '../user/user.service';
import prisma from '@modules/db/prisma.service';

@Service()
export class EldenRingService {
  public userService = Container.get(UserService);

  async getAllCharacters(limit: number, offset: number) {
    const characters = await prisma.character.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        game: true,
        image_url: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        details: {
          select: {
            name: true,
            subdetails: {
              select: {
                name: true,
                value: true,
                type: true,
              },
            },
          },
        },
      },
    });

    return characters;
  }
  async getCharacterById(id: string) {
    const character = await prisma.character.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        game: true,
        image_url: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        details: {
          select: {
            name: true,
            subdetails: {
              select: {
                name: true,
                value: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (!character) {
      throw new HttpException(404, 'Character not found');
    }

    return character;
  }

  async createCharacter(characterData: any, userId: string) {
    let { name, gameId, ...details } = characterData;

    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    details = Object.entries(details).map(([key, value]) => this.transformDetails(key, value));

    const game = this.getGameName(gameId);

    const character = await prisma.character.create({
      data: {
        game: game,
        name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    await prisma.detail.createMany({
      data: details.map(detail => ({
        characterId: character.id,
        name: detail.name,
        subdetails: detail.subdetails,
      })),
    });

    return character;
  }

  private getGameName(gameId: number): Game {
    switch (gameId) {
      case 0:
        return 'ELDEN_RING';
      case 1:
        return 'DARK_SOULS';
      case 2:
        return 'DARK_SOULS_2';
      case 3:
        return 'DARK_SOULS_3';
      case 4:
        return 'BLOODBORNE';
    }
  }

  private transformDetails(detailKey: string, detailValue: any) {
    if (typeof detailValue === 'object' && detailValue !== null) {
      const subdetails = Object.entries(detailValue).map(([key, value]) => this.transformSubdetails(key, value));

      return {
        name: detailKey,
        subdetails: subdetails,
      };
    }
  }

  private transformSubdetails(subdetailKey: string, subdetailValue: any) {
    if (typeof subdetailValue === 'object' && subdetailValue !== null) {
      const subdetails = Object.entries(subdetailValue).map(([key, value]) => this.transformSubdetails(key, value));

      return {
        name: subdetailKey,
        value: subdetails,
        type: SubdetailType.COLOR,
      };
    }

    let type: SubdetailType = 'NUMBER';

    if (typeof subdetailValue === 'string') type = 'STRING';

    if (typeof subdetailValue === 'boolean') type = 'BOOLEAN';

    return {
      name: subdetailKey,
      value: subdetailValue,
      type: type,
    };
  }

  async getCharacterByUserId(userId: string, limit: number, offset: number) {
    console.log('userId', userId);
    if (!userId) throw new HttpException(400, 'User id is required');

    const user = await this.userService.findUserById(userId);

    if (!user) throw new HttpException(404, 'User not found');

    const characters = await prisma.character.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        game: true,
        image_url: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        details: {
          select: {
            name: true,
            subdetails: {
              select: {
                name: true,
                value: true,
                type: true,
              },
            },
          },
        },
      },
    });

    return characters;
  }

  async updateCharacterById(id: string, characterData: any) {
    const character = await prisma.character.findUnique({
      where: { id },
    });

    if (!character) {
      throw new HttpException(404, 'Character not found');
    }

    let { name, gameId, image_url, ...details } = characterData;

    details = Object.entries(details).map(([key, value]) => this.transformDetails(key, value));

    const game = this.getGameName(gameId);

    await prisma.character.update({
      where: { id },
      data: {
        game,
        name,
        image_url,
      },
    });

    await prisma.detail.deleteMany({
      where: {
        characterId: id,
      },
    });

    await prisma.detail.createMany({
      data: details.map(detail => ({
        characterId: character.id,
        name: detail.name,
        subdetails: detail.subdetails,
      })),
    });

    const lastChar = await this.getCharacterById(id);

    return lastChar;
  }
}
