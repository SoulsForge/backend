import { Module } from '@nestjs/common';
import { EldenRingAtributesService } from './elden-ring-atributes.service';
import { EldenRingAtributesController } from './elden-ring-atributes.controller';

@Module({
  controllers: [EldenRingAtributesController],
  providers: [EldenRingAtributesService],
  exports: [EldenRingAtributesService],
})
export class EldenRingAtributesModule {}
