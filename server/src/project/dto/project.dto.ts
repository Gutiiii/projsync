import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateProjectSchema = z.object({
    id: z.string(),
    role: z.enum(["CREATOR", "EDITOR", "VIEWER"]),
    title: z.string().max(50),
    description: z.string().max(250)
})

const CreateInvitationSchema = z.object({
    email: z.string().email(),
    role: z.enum(["EDITOR", "VIEWER"]),
    projectId: z.string(),
})

export class CreateProjectDto extends createZodDto(CreateProjectSchema) { }
export class CreateInvitationDto extends createZodDto(CreateInvitationSchema) { }