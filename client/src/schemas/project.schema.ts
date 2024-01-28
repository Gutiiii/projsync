import { CreateBoardCardFormData, CreateProjectFormData, EditProjectFormData } from "@/types/project.types"
import { ZodType, z } from "zod"

export const createProjectSchema: ZodType<CreateProjectFormData> = z.object({
    title: z.string().max(50),
    description: z.string().max(250)
})

export const editProjectSchema: ZodType<EditProjectFormData> = z.object({
    title: z.string().max(50),
    description: z.string().max(250),
    status: z.enum(["OPEN", "CLOSED"]).optional()
})

export const createBoardCardSchema: ZodType<CreateBoardCardFormData> = z.object({
    title: z.string().max(50)
})

export type CreateProjectSchema = z.TypeOf<typeof createProjectSchema>

export type CreateBoardCardSchema = z.TypeOf<typeof createBoardCardSchema>