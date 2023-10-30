import { PartialType } from '@nestjs/mapped-types';
import { CreateEldenRingAtributeDto } from './create-elden-ring-atribute.dto';

export class UpdateEldenRingAtributeDto extends PartialType(
  CreateEldenRingAtributeDto,
) {}
