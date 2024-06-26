import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async login({email, password}: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('email or password is incorrect');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new BadRequestException('email or password is incorrect');
    }

    const payload = { id: user.id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256' });

    return {
      token,
      id: user.id
    };
  }

  async register({name, email, password, confirmPassword, favoriteMovie}: RegisterDto) {
    
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Confirm password does not match');
    }

    return await this.usersService.create({
      name, 
      email, 
      password: await bcrypt.hash(password, 10),
      favoriteMovie: await bcrypt.hash(favoriteMovie, 10)
    });
  }

  async forgetPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    console.log('userForgot', user);
    if (!user) {
      throw new BadRequestException('User not found');
    }
  }

  async resetPassword(email: string, newPassword: string, favoriteMovie: string): Promise<void> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isValidMovie = await bcrypt.compare(favoriteMovie, user.favoriteMovie);
    console.log('isValidMovie', isValidMovie);
    if (!isValidMovie) {
      throw new BadRequestException('Favorite movie is incorrect');
    }
    await this.usersService.updatePassword(email, newPassword);
  }

}
