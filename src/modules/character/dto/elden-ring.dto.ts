import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

@InputType()
class RGBColor {
  @Field(() => Int)
  @IsInt()
  r: number;

  @Field(() => Int)
  @IsInt()
  g: number;

  @Field(() => Int)
  @IsInt()
  b: number;
}

@InputType()
class Base {
  @Field()
  @IsString()
  body_type: string;

  @Field()
  @IsString()
  age: string;

  @Field()
  @IsString()
  voice: string;
}

@InputType()
class FaceTemplate {
  @Field(() => Int)
  @IsInt()
  structure: number;

  @Field(() => Int)
  @IsInt()
  emphasis: number;

  @Field(() => Int)
  @IsInt()
  age: number;

  @Field(() => Int)
  @IsInt()
  aesthetic: number;
}

@InputType()
class FaceBalance {
  @Field(() => Int)
  @IsInt()
  size: number;

  @Field(() => Int)
  @IsInt()
  ratio: number;

  @Field(() => Int)
  @IsInt()
  protrusion: number;

  @Field(() => Int)
  @IsInt()
  vert: number;

  @Field(() => Int)
  @IsInt()
  slant: number;

  @Field(() => Int)
  @IsInt()
  horiz: number;
}

@InputType()
class Forehead {
  @Field(() => Int)
  @IsInt()
  depth: number;

  @Field(() => Int)
  @IsInt()
  protrusion: number;

  @Field(() => Int)
  @IsInt()
  height: number;

  @Field(() => Int)
  @IsInt()
  prot1: number;

  @Field(() => Int)
  @IsInt()
  prot2: number;

  @Field(() => Int)
  @IsInt()
  width: number;
}

@InputType()
class BrowRidge {
  @Field(() => Int)
  @IsInt()
  height: number;

  @Field(() => Int)
  @IsInt()
  inner: number;

  @Field(() => Int)
  @IsInt()
  outer: number;
}

@InputType()
class Eyes {
  @Field(() => Int)
  @IsInt()
  position: number;

  @Field(() => Int)
  @IsInt()
  size: number;

  @Field(() => Int)
  @IsInt()
  slant: number;

  @Field(() => Int)
  @IsInt()
  spacing: number;
}

@InputType()
class NoseRidge {
  @Field(() => Int)
  @IsInt()
  depth: number;

  @Field(() => Int)
  @IsInt()
  length: number;

  @Field(() => Int)
  @IsInt()
  position: number;

  @Field(() => Int)
  @IsInt()
  tip_height: number;

  @Field(() => Int)
  @IsInt()
  protrusion: number;

  @Field(() => Int)
  @IsInt()
  height: number;

  @Field(() => Int)
  @IsInt()
  slant: number;
}

@InputType()
class Nostrils {
  @Field(() => Int)
  @IsInt()
  slant: number;

  @Field(() => Int)
  @IsInt()
  size: number;

  @Field(() => Int)
  @IsInt()
  width: number;
}

@InputType()
class Cheeks {
  @Field(() => Int)
  @IsInt()
  height: number;

  @Field(() => Int)
  @IsInt()
  depth: number;

  @Field(() => Int)
  @IsInt()
  width: number;

  @Field(() => Int)
  @IsInt()
  protrusion: number;

  @Field(() => Int)
  @IsInt()
  cheeks: number;
}

@InputType()
class Lips {
  @Field(() => Int)
  @IsInt()
  shape: number;

  @Field(() => Int)
  @IsInt()
  expression: number;

  @Field(() => Int)
  @IsInt()
  fullness: number;

  @Field(() => Int)
  @IsInt()
  size: number;

  @Field(() => Int)
  @IsInt()
  protrusion: number;

  @Field(() => Int)
  @IsInt()
  thickness: number;
}

@InputType()
class Mouth {
  @Field(() => Int)
  @IsInt()
  protrusion: number;

  @Field(() => Int)
  @IsInt()
  slant: number;

  @Field(() => Int)
  @IsInt()
  occlusion: number;

  @Field(() => Int)
  @IsInt()
  position: number;

  @Field(() => Int)
  @IsInt()
  width: number;

  @Field(() => Int)
  @IsInt()
  distance: number;
}

@InputType()
class Chin {
  @Field(() => Int)
  @IsInt()
  tip: number;

  @Field(() => Int)
  @IsInt()
  length: number;

  @Field(() => Int)
  @IsInt()
  protrusion: number;

  @Field(() => Int)
  @IsInt()
  depth: number;

  @Field(() => Int)
  @IsInt()
  size: number;

  @Field(() => Int)
  @IsInt()
  height: number;

  @Field(() => Int)
  @IsInt()
  width: number;
}

@InputType()
class Jaw {
  @Field(() => Int)
  @IsInt()
  protrusion: number;

  @Field(() => Int)
  @IsInt()
  width: number;

  @Field(() => Int)
  @IsInt()
  lower: number;

  @Field(() => Int)
  @IsInt()
  contour: number;
}

@InputType()
class Hair {
  @Field(() => Int)
  @IsInt()
  hair: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  color: RGBColor;

  @Field(() => Int)
  @IsInt()
  luster: number;

  @Field(() => Int)
  @IsInt()
  roots: number;

  @Field(() => Int)
  @IsInt()
  white: number;
}

@InputType()
class Eyebrows {
  @Field(() => Int)
  @IsInt()
  eyebrows: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  color: RGBColor;

  @Field(() => Int)
  @IsInt()
  white: number;
}

@InputType()
class FacialHair {
  @Field(() => Int)
  @IsInt()
  beard: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  color: RGBColor;

  @Field(() => Int)
  @IsInt()
  luster: number;

  @Field(() => Int)
  @IsInt()
  roots: number;

  @Field(() => Int)
  @IsInt()
  white: number;

  @Field(() => Int)
  @IsInt()
  stubble: number;
}

@InputType()
class Eyelashes {
  @Field(() => Int)
  @IsInt()
  lashes: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  color: RGBColor;
}

@InputType()
class Eye {
  @Field(() => Int)
  @IsInt()
  iris_size: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  iris_color: RGBColor;

  @Field(() => Int)
  @IsInt()
  clouding: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  clouding_color: RGBColor;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  white_color: RGBColor;

  @Field(() => Int)
  @IsInt()
  position: number;
}

@InputType()
class SkinFeature {
  @Field(() => Int)
  @IsInt()
  pores: number;

  @Field(() => Int)
  @IsInt()
  luster: number;

  @Field(() => Int)
  @IsInt()
  dark_circles: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  dark_circles_color: RGBColor;
}

@InputType()
class Cosmetics {
  @Field(() => Int)
  @IsInt()
  eyeliner: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  eyeliner_color: RGBColor;

  @Field(() => Int)
  @IsInt()
  upper: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  upper_color: RGBColor;

  @Field(() => Int)
  @IsInt()
  lower: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  lower_color: RGBColor;

  @Field(() => Int)
  @IsInt()
  cheeks: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  cheeks_color: RGBColor;

  @Field(() => Int)
  @IsInt()
  lipstick: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  lipstick_color: RGBColor;
}

@InputType()
class TattooMarkEyepatch {
  @Field(() => Int)
  @IsInt()
  tattoo: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  tattoo_color: RGBColor;

  @Field(() => Int)
  @IsInt()
  vertical: number;

  @Field(() => Int)
  @IsInt()
  horizontal: number;

  @Field(() => Int)
  @IsInt()
  angle: number;

  @Field(() => Int)
  @IsInt()
  expansion: number;

  @Field(() => Boolean)
  @IsBoolean()
  flip: boolean;

  @Field(() => Int)
  @IsInt()
  eyepatch: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  eyepatch_color: RGBColor;
}

@InputType()
class Body {
  @Field(() => Int)
  @IsInt()
  head: number;

  @Field(() => Int)
  @IsInt()
  chest: number;

  @Field(() => Int)
  @IsInt()
  abdomen: number;

  @Field(() => Int)
  @IsInt()
  arms: number;

  @Field(() => Int)
  @IsInt()
  legs: number;

  @Field(() => Int)
  @IsInt()
  body_hair: number;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  body_hair_color: RGBColor;

  @Field(() => String)
  @IsString()
  muscle: string;
}

@InputType()
class EldenRingCharacterDto {
  @Field(() => Base)
  @ValidateNested()
  @Type(() => Base)
  base: Base;

  @Field(() => RGBColor)
  @ValidateNested()
  @Type(() => RGBColor)
  skin_color: RGBColor;

  @Field(() => FaceTemplate)
  @ValidateNested()
  @Type(() => FaceTemplate)
  face_template: FaceTemplate;

  @Field(() => FaceBalance)
  @ValidateNested()
  @Type(() => FaceBalance)
  face_balance: FaceBalance;

  @Field(() => Forehead)
  @ValidateNested()
  @Type(() => Forehead)
  forehead: Forehead;

  @Field(() => BrowRidge)
  @ValidateNested()
  @Type(() => BrowRidge)
  brow_ridge: BrowRidge;

  @Field(() => Eyes)
  @ValidateNested()
  @Type(() => Eyes)
  eyes: Eyes;

  @Field(() => NoseRidge)
  @ValidateNested()
  @Type(() => NoseRidge)
  nose_ridge: NoseRidge;

  @Field(() => Nostrils)
  @ValidateNested()
  @Type(() => Nostrils)
  nostrils: Nostrils;

  @Field(() => Cheeks)
  @ValidateNested()
  @Type(() => Cheeks)
  cheeks: Cheeks;

  @Field(() => Lips)
  @ValidateNested()
  @Type(() => Lips)
  lips: Lips;

  @Field(() => Mouth)
  @ValidateNested()
  @Type(() => Mouth)
  mouth: Mouth;

  @Field(() => Chin)
  @ValidateNested()
  @Type(() => Chin)
  chin: Chin;

  @Field(() => Jaw)
  @ValidateNested()
  @Type(() => Jaw)
  jaw: Jaw;

  @Field(() => Hair)
  @ValidateNested()
  @Type(() => Hair)
  hair: Hair;

  @Field(() => Eyebrows)
  @ValidateNested()
  @Type(() => Eyebrows)
  eyebrows: Eyebrows;

  @Field(() => FacialHair)
  @ValidateNested()
  @Type(() => FacialHair)
  facial_hair: FacialHair;

  @Field(() => Eyelashes)
  @ValidateNested()
  @Type(() => Eyelashes)
  eyelashes: Eyelashes;

  @Field(() => Eye)
  @ValidateNested()
  @Type(() => Eye)
  right_eye: Eye;

  @Field(() => Eye)
  @ValidateNested()
  @Type(() => Eye)
  left_eye: Eye;

  @Field(() => SkinFeature)
  @ValidateNested()
  @Type(() => SkinFeature)
  skin_feature: SkinFeature;

  @Field(() => Cosmetics)
  @ValidateNested()
  @Type(() => Cosmetics)
  cosmetics: Cosmetics;

  @Field(() => TattooMarkEyepatch)
  @ValidateNested()
  @Type(() => TattooMarkEyepatch)
  tattoo_mark_eyepatch: TattooMarkEyepatch;

  @Field(() => Body)
  @ValidateNested()
  @Type(() => Body)
  body: Body;
}

export { EldenRingCharacterDto };
