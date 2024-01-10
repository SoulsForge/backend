import { PartialType } from '@nestjs/mapped-types';
import { CreateEldenRingAttributeDto } from './create-elden-ring-atribute.dto';

export class UpdateEldenRingAttributeDto extends PartialType(
  CreateEldenRingAttributeDto,
) {}
