import { Args, Resolver, Query } from '@nestjs/graphql';
import { TimelineService } from './timeline.service';
import { Metadata } from './dtos/metadata.input';
import { CharacterEntity } from '../character/entities/character.entity';

@Resolver()
export class TimelineResolver {
  constructor(private readonly timelineService: TimelineService) {}

  @Query(() => [CharacterEntity])
  async getLatestCharacters(@Args('metadata') metadata: Metadata) {
    const { limit } = metadata;

    return await this.timelineService.getLatestCharacters(limit);
  }
}
