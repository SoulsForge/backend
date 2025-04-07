import { CharacterModule } from '../character/character.module';
import { Module } from '@nestjs/common';
import { TimelineResolver } from './timeline.resolver';
import { TimelineService } from './timeline.service';

@Module({
  providers: [TimelineResolver, TimelineService],
  imports: [CharacterModule],
})
export class TimelineModule {}
