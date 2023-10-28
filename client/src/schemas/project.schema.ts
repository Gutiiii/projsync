import { CreateProjectFormData } from "@/types/project.types"
import { ZodType, z } from "zod"

export const createProjectSchema: ZodType<CreateProjectFormData> = z.object({
    title: z.string().max(50),
    description: z.string().max(250)
})

export type CreateProjectSchema = z.TypeOf<typeof createProjectSchema>