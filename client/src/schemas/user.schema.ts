import { RegisterUserFormData } from "@/types/user.types";
import z, { ZodType } from "zod";


export const registerUserSchema: ZodType<RegisterUserFormData> = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(64)
})

export type RegisterUserSchema = z.TypeOf<typeof registerUserSchema>