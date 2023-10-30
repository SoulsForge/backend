import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateBaseCharacterDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsInt()
  gameId: number;

  @IsInt()
  userId: number;
}
