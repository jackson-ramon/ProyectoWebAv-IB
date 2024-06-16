import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

//   @Post('register')
//     register(
//         @Body()
//         registerDto: RegisterDto
//     ) {
//         return this.authService.register(registerDto);
//     }   

//     @Post('login')
//     login(
//         @Body()
//         loginDto: LoginDto
//     ) {
//         return this.authService.login(loginDto);
//     }

//     @Get('getProducts')
//     @UseGuards(AuthGuard)
//     getProducts(@Req() req) {
//         return req.user;    
//     }

//     @Post('reset-password')
//     async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
//         const { email, newPassword } = resetPasswordDto;
//         await this.authService.resetPassword(email, newPassword);
//         return { message: 'Password reset successful' };
//     }

}
