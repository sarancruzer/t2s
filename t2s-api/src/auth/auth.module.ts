import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { LocalStrategy } from './auth-strategy/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../shared/constants/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './auth-strategy/jwt.strategy';
import { UsersService } from '../users/users/users.service';
import { AuthService } from './auth/auth.service';
import { Users } from '../users/entities/users.entity';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
