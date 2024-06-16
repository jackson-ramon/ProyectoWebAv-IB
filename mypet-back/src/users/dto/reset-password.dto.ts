import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'The new password must be at least 8 characters long.' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, { message: 'The new password must contain at least one uppercase letter, one lowercase letter, and one number.' })
  newPassword: string;

  @IsString()
  @MinLength(8)
  confirmPassword: string;
}
