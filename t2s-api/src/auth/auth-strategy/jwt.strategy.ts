import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../../shared/constants/constants';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../../users/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.data.email);
    if (!user) {
      throw new UnauthorizedException('You are not authorized to perform the operation');
    }
    return payload;
  }
}