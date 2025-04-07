import { CharacterService } from '../character/character.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(private readonly characterService: CharacterService) {}

  async getMySliders(userId: number) {
    const characters = await this.characterService.findMany({
      orderBy: { createdAt: 'asc' },
      where: { userId },
      include: {
        game: true,
        user: true,
      },
    });

    return characters;
  }
}
