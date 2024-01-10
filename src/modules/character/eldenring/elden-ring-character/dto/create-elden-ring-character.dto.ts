import { CreateEldenRingAttributeDto } from './../../elden-ring-atributes/dto/create-elden-ring-atribute.dto';
import { IsObject } from 'class-validator';
import { CreateBaseCharacterDto } from 'src/modules/character/base-character/dto/create-base-character.dto';

export class CreateEldenRingCharacterDto {
  @IsObject()
  characterDto: CreateBaseCharacterDto;

  @IsObject()
  attributesDto: CreateEldenRingAttributeDto;
}
