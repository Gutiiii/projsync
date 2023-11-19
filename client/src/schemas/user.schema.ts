import { ChangePasswordFormData, RegisterUserFormData, SigninUserFormData } from "@/types/user.types";
import z, { ZodType } from "zod";


export const registerUserSchema: ZodType<RegisterUserFormData> = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(64)
})

export const signinUserSchema: ZodType<SigninUserFormData> = z.object({
    email: z.string(),
    password: z.string()
})

export const changePasswordSchema: ZodType<ChangePasswordFormData> = z.object({
    password: z.string().min(8).max(64),
    passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match!",
    path: ['passwordConfirmation']
})

export type RegisterUserSchema = z.TypeOf<typeof registerUserSchema>

export type SignUserUserScheam = z.TypeOf<typeof signinUserSchema>

export type ChangePasswordSchema = z.TypeOf<typeof changePasswordSchema>