import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthTokenPayload, AuthTokens } from '../auth.types';
import authConfig from 'src/config/auth.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  async generate(user: User): Promise<AuthTokens> {
    const payload: AuthTokenPayload = {
      sub: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...payload, type: 'access' },
        {
          expiresIn: this.config.accessTokenExpiresIn,
        },
      ),
      this.jwtService.signAsync(
        { ...payload, type: 'refresj' },
        {
          expiresIn: this.config.refreshTokenExpiresIn,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verify<T extends object>(token: string): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
