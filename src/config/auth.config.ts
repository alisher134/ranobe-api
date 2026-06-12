import { registerAs } from '@nestjs/config';

type TokenExpiration = '15m' | '7d';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  accessTokenExpiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN ??
    '15m') as TokenExpiration,

  refreshTokenExpiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN ??
    '7d') as TokenExpiration,
}));
