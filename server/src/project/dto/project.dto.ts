
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

const AcceptInvitationSchema = z.object({
    invitationId: z.string(),
})

const EditMemberSchema = z.object({
    userProjectId: z.string(),
    role: z.enum(["EDITOR", "VIEWER"])
})

export class CreateProjectDto extends createZodDto(CreateProjectSchema) { }
export class CreateInvitationDto extends createZodDto(CreateInvitationSchema) { }
export class AcceptInvitationDto extends createZodDto(AcceptInvitationSchema) { }
export class EditMemberDto extends createZodDto(EditMemberSchema) { }