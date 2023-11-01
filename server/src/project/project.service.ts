import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
    private logger = new Logger('ProjectService')
    constructor(private prismaService: PrismaService) { }

    async createProject(dto: CreateProjectDto) {

        const project = await this.prismaService.project.create({
            data: {
                title: dto.title,
                description: dto.description
            }
        })
        this.logger.verbose(`New Project ${project.id}`)
        if (project && project.id) {
            const userProject = await this.prismaService.user_Project.create({
                data: {
                    userId: dto.id,
                    role: "CREATOR",
                    projectId: project.id
                }
            })
            this.logger.verbose(`New User_Project: ${userProject.id}`)
            if (userProject) return { project, userProject }

            throw new BadRequestException("Something went wrong!")
        } else {
            throw new BadRequestException("Something went wrong!")
        }
    }

    async getAllProjects(id: string) {
        const projects = await this.prismaService.project.findMany({
            where: {
                userProject: {
                    some: {
                        userId: id
                    }
                }
            }
        })

        if (!projects) throw new BadRequestException("Something went wrong")

        return projects
    }

    async authProject(userId: string, projectId: string) {
        const userProject = await this.prismaService.user_Project.findFirst({
            where: {
                userId: userId,
                projectId: projectId
            }
        })
        if (!userProject) throw new UnauthorizedException("Unauthorized")

        return userProject
    }

}
