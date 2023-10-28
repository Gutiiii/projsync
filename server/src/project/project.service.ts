import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
    constructor(private prismaService: PrismaService) { }

    async createProject(dto: CreateProjectDto) {

        const project = await this.prismaService.project.create({
            data: {
                title: dto.title,
                description: dto.description
            }
        })
        if (project && project.id) {
            const userProject = await this.prismaService.user_Project.create({
                data: {
                    userId: dto.id,
                    role: "CREATOR",
                    projectId: project.id
                }
            })
            if (userProject) return { project, userProject }

            throw new BadRequestException("Something went wrong!")
        } else {
            throw new BadRequestException("Something went wrong!")
        }

    }
}
