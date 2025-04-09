import { CharacterModule } from '../character/character.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ProfileResolver, ProfileService],
  imports: [CharacterModule, PrismaModule, UserModule],
})
export class ProfileModule {}
