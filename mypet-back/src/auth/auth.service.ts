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

  async register({name, email, password}: RegisterDto) {
    
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return await this.usersService.create({
      name, 
      email, 
      password: await bcrypt.hash(password, 10)
    });
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    await this.usersService.updatePassword(email, newPassword);
  }
}
