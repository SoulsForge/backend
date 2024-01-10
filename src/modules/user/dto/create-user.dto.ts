import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsInt,
  IsOptional,
} from 'class-validator';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  lowerUsername: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsNotEmpty()
  imageUrl: string;

  @IsInt()
  @IsOptional()
  userSettingsId?: number;
}
