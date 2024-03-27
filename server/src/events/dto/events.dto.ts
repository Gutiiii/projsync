import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateChatSchema = z.object({
    content: z.string().max(250),
    projectId: z.string(),
    authorId: z.string(),
})

export class CreateChatDto extends createZodDto(CreateChatSchema) { } 