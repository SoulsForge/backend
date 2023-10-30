import { $Enums } from '@prisma/client';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

// export class LoginDto {
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @IsNotEmpty()
//   password: string;
// }

export class LoginDto {
  id: number;
  email: string;
  username: string;
  role: $Enums.Role;
}
