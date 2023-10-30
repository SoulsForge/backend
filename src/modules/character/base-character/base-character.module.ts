import { Module } from '@nestjs/common';
import { BaseCharacterService } from './base-character.service';
import { BaseCharacterController } from './base-character.controller';

@Module({
  controllers: [BaseCharacterController],
  providers: [BaseCharacterService],
  exports: [BaseCharacterService],
})
export class BaseCharacterModule {}
