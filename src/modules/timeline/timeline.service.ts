import { CharacterService } from '../character/character.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TimelineService {
  constructor(private readonly characterService: CharacterService) {}

  async getLatestCharacters(limit: number) {
    const characters = await this.characterService.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        game: true,
        user: true,
      },
    });

    return characters;
  }
}
