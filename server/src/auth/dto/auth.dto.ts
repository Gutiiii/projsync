
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RegisterSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    provider: z.enum(["CREDENTIALS", "GOOGLE"]),
    password: z.string().min(8).max(64)
});

const ProviderSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    provider: z.enum(["CREDENTIALS", "GOOGLE"]),
});

export class RegisterDto extends createZodDto(RegisterSchema) { }
export class ProviderDto extends createZodDto(ProviderSchema) { }
