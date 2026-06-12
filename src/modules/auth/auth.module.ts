import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { ConfigModule } from '@nestjs/config';
import authConfig from '@/config/auth.config';
import { UserMapperService } from './services/user-mapper.service';

@Module({
  imports: [JwtModule, ConfigModule.forFeature(authConfig)],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PasswordService,
    TokenService,
    UserMapperService,
  ],
})
export class AuthModule {}
