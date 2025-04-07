import { CharacterModule } from '../character/character.module';
import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileResolver, ProfileService],
  imports: [CharacterModule],
})
export class ProfileModule {}
