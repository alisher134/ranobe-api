import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const signUpSchema = z.object({
  email: z.email('Invalid email'),
  nickname: z.string().min(3, 'Nickname must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export class SignUpDto extends createZodDto(signUpSchema) {}
