import argon2 from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verify(password: string, hashedPassword: string): Promise<boolean> {
    return argon2.verify(password, hashedPassword);
  }
}
