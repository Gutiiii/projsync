import { create } from 'domain';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RegisterSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(64)
});

const ProviderSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    provider: z.enum(["CREDENTIALS", "GOOGLE"]),
});

const JwtSchema = z.object({
    email: z.string()
})

const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(64)
})

const ChangePasswordSchema = z.object({
    code: z.string(),
    password: z.string().min(8).max(64)
})

export class RegisterDto extends createZodDto(RegisterSchema) { }
export class ProviderDto extends createZodDto(ProviderSchema) { }

export class JwtDto extends createZodDto(JwtSchema) { }

export class SigninDto extends createZodDto(SigninSchema) { }

export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) { }
