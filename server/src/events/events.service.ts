import { BadRequestException, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma.service';
import { CreateChatDto } from './dto/events.dto';

@Injectable()
export class EventsService {
    constructor(private readonly prismaService: PrismaService) { }


    async newMessage(dto: CreateChatDto) {
        try {

            const user_Project = await this.prismaService.user_Project.findFirst({
                where: {
                    projectId: dto.projectId,
                    userId: dto.authorId
                }
            })

            const message = await this.prismaService.chat.create({
                data: {
                    content: dto.content,
                    userId: user_Project.id,
                    projectId: dto.projectId
                }, include: {
                    user: {
                        include: {
                            user: true
                        }
                    }
                }
            })
            if (!message) throw new BadRequestException("Something went wrong")
            return message
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

}
