import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const signInSchema = z.object({
  identity: z.string().min(1, 'Email or Nickname is required'),
  password: z.string().min(1, 'Password is required'),
});

export class SignInDto extends createZodDto(signInSchema) {}
