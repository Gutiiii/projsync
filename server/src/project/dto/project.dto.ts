
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateProjectSchema = z.object({
    id: z.string(),
    role: z.enum(["CREATOR", "EDITOR", "VIEWER"]),
    title: z.string().max(50),
    description: z.string().max(250)
})

const UpdateProjectSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["OPEN", "CLOSED"])
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

const CreateListSchema = z.object({
    projectId: z.string(),
    title: z.string(),
    position: z.number()
})

const EditListSchema = z.object({
    projectId: z.string(),
    title: z.string(),
    position: z.number()
})

const MoveListSchema = z.object({
    activeListId: z.string(),
    overListId: z.string(),
    activeListPosition: z.number(),
    overListPosition: z.number()
})

const CreateCardSchema = z.object({
    listId: z.string(),
    projectId: z.string(),
    title: z.string(),
    position: z.number()
})

export class CreateProjectDto extends createZodDto(CreateProjectSchema) { }
export class UpdateProjectDto extends createZodDto(UpdateProjectSchema) { }
export class CreateInvitationDto extends createZodDto(CreateInvitationSchema) { }
export class AcceptInvitationDto extends createZodDto(AcceptInvitationSchema) { }
export class EditMemberDto extends createZodDto(EditMemberSchema) { }
export class CreateListDto extends createZodDto(CreateListSchema) { }
export class EditListDto extends createZodDto(EditListSchema) { }
export class MoveListDto extends createZodDto(MoveListSchema) { }
export class CreateCardDto extends createZodDto(CreateCardSchema) { }