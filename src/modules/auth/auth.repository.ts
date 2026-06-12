import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findByIdentity(identity: string): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ email: identity }, { nickname: identity }, { id: identity }],
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }
}
