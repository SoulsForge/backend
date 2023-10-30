import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { CustomPasswordValidator } from 'src/common/validators/CustomPasswordValidator';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Validate(CustomPasswordValidator)
  password: string;
}
