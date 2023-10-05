import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RegisterSchema = z.object({
    fullname: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(64).optional()
});

export class RegisterDto extends createZodDto(RegisterSchema) { }
