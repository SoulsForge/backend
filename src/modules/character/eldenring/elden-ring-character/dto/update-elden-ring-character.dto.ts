import { PartialType } from '@nestjs/mapped-types';
import { CreateEldenRingCharacterDto } from './create-elden-ring-character.dto';

export class UpdateEldenRingCharacterDto extends PartialType(
  CreateEldenRingCharacterDto,
) {}
