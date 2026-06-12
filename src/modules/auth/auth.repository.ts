import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findByIdentity(identity: string) {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ email: identity }, { nickname: identity }],
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data,
    });
  }
}
