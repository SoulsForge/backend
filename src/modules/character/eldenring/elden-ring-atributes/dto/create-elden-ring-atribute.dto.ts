import { IsObject, IsString } from 'class-validator';

export class CreateEldenRingAttributeDto {
  @IsString()
  body_type: string;
  @IsString()
  age: string;
  @IsString()
  voice: string;
  @IsObject()
  skin_color: Record<string, string>;
  @IsObject()
  face_template: Record<string, string>;
  @IsObject()
  face_balance: Record<string, string>;
  @IsObject()
  forehead: Record<string, string>;
  @IsObject()
  brow_ridge: Record<string, string>;
  @IsObject()
  eyes: Record<string, string>;
  @IsObject()
  nose_ridge: Record<string, string>;
  @IsObject()
  nostrils: Record<string, string>;
  @IsObject()
  cheeks: Record<string, string>;
  @IsObject()
  lips: Record<string, string>;
  @IsObject()
  mouth: Record<string, string>;
  @IsObject()
  chin: Record<string, string>;
  @IsObject()
  jaw: Record<string, string>;
  @IsObject()
  hair: Record<string, string>;
  @IsObject()
  eyebrows: Record<string, string>;
  @IsObject()
  facial_hair: Record<string, string>;
  @IsObject()
  eyelashes: Record<string, string>;
  @IsObject()
  right_eye: Record<string, string>;
  @IsObject()
  left_eye: Record<string, string>;
  @IsObject()
  skin_features: Record<string, string>;
  @IsObject()
  cosmetics: Record<string, string>;
  @IsObject()
  tattoo_mark_eyepatch: Record<string, string>;
  @IsObject()
  body: Record<string, string>;
}
