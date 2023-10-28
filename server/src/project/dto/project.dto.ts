import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateProjectSchema = z.object({
    id: z.string(),
    role: z.enum(["CREATOR", "EDITOR", "VIEWER"]),
    title: z.string().max(50),
    description: z.string().max(250)
})

export class CreateProjectDto extends createZodDto(CreateProjectSchema) { }