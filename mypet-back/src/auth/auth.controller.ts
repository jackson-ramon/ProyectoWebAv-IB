import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }   

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('check')
  @UseGuards(AuthGuard)
  check(
    @Req() req
  ) {
    return req.user;
  }

  // @Post('forget-password')
  // async forgetPassword(@Body() email: string) {
  //   return await this.authService.forgetPassword(email);
  // }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {

    const { email, newPassword, favoriteMovie } = resetPasswordDto;
    await this.authService.resetPassword(email, newPassword, favoriteMovie);
    return { message: 'Password reset successful' };
  }
}
