import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthRepository } from './auth.repository';
import { User } from '@prisma/client';
import { AuthResponse } from './auth.types';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { UserMapperService } from './services/user-mapper.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly userMapperService: UserMapperService,
  ) {}

  async signIn(dto: SignInDto): Promise<AuthResponse> {
    const user = await this.getValidatedUser(dto);

    return this.buildResponse(user);
  }

  async signUp(dto: SignUpDto): Promise<AuthResponse> {
    await this.ensureUserDoesNotExist(dto.email);

    const hashedPassword = await this.passwordService.hash(dto.password);
    const newUser = await this.authRepository.create({
      email: dto.email,
      nickname: dto.nickname,
      hashedPassword,
    });

    return this.buildResponse(newUser);
  }

  private async ensureUserDoesNotExist(email: string) {
    const user = await this.authRepository.findByEmail(email);

    if (user) {
      throw new ConflictException('User already exists');
    }
  }

  private async getValidatedUser(dto: SignInDto): Promise<User> {
    const user = await this.authRepository.findByIdentity(dto.identity);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.verify(
      user.hashedPassword,
      dto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private async buildResponse(user: User): Promise<AuthResponse> {
    const tokens = await this.tokenService.generate(user);

    return {
      user: this.userMapperService.toResponse(user),
      ...tokens,
    };
  }
}
