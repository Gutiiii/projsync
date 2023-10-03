import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RegisterSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(64),
});

export class RegisterDto extends createZodDto(RegisterSchema) { }
