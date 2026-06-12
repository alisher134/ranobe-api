import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthUser } from '../auth.types';

@Injectable()
export class UserMapperService {
  toResponse(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  }
}
