import { User } from '@prisma/client';

export type AuthUser = Pick<User, 'id' | 'email' | 'nickname'>;

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export interface AuthResponse extends AuthTokens {
  user: AuthUser;
}

export type AuthTokenPayload = {
  sub: string;
  email: string;
};
