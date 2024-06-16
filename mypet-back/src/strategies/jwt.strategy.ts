import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    console.log('Payload received in validate:', payload);  // Log for debugging
    const email = payload.email;
    if (!email) {
      console.log('Invalid email in payload:', payload);  // Log for debugging
      throw new UnauthorizedException('Invalid email');
    }
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      console.log('User not found for email:', email);  // Log for debugging
      throw new UnauthorizedException('User not found');
    }
    console.log('User found:', user);  // Log for debugging
    return user;
  }
}
