import { Module } from '@nestjs/common';
import { EldenRingCharacterService } from './elden-ring-character.service';
import { EldenRingCharacterController } from './elden-ring-character.controller';
import { EldenRingAtributesService } from '../elden-ring-atributes/elden-ring-atributes.service';
import { BaseCharacterService } from '../../base-character/base-character.service';

@Module({
  controllers: [EldenRingCharacterController],
  providers: [
    EldenRingCharacterService,
    EldenRingAtributesService,
    BaseCharacterService,
  ],
})
export class EldenRingCharacterModule {}
