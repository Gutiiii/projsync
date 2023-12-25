import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateInvitationDto, CreateProjectDto } from './dto/project.dto';

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
            },
            include: {
                userProject: {
                    select: {
                        role: true
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

    async getProjectById(id: string) {
        try {
            const project = await this.prismaService.project.findFirst({
                where: {
                    id: id
                },
                include: {
                    userProject: {
                        where: {
                            projectId: id
                        }, include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            });
            return project;
        } catch (error) {
            throw new UnauthorizedException("Unauthorized");
        }
    }

    async createInvitation(dto: CreateInvitationDto, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    projectId: dto.projectId,
                    userId: userId,
                    role: "CREATOR"
                }
            })
            if (!hasRight) throw new UnauthorizedException("Unauthorized!")
            const deleteExistingInvitation = await this.prismaService.invitation.deleteMany({
                where: {
                    email: dto.email,
                    projectId: dto.projectId
                }
            })
            const invitation = await this.prismaService.invitation.create({
                data: {
                    projectId: dto.projectId,
                    email: dto.email,
                    role: dto.role
                }
            })
            return invitation
        } catch (error) {
            throw new BadRequestException("Something went wrong!")
        }
    }

    async getInvitationsProject(projectId: string, userId: string) {
        const hasRight = await this.prismaService.user_Project.findFirst({
            where: {
                projectId: projectId,
                userId: userId,
            }
        })
        if (!hasRight) throw new UnauthorizedException("Unauthorized!")

        try {
            const invitations = await this.prismaService.invitation.findMany({
                where: {
                    projectId: projectId
                }
            })
            return invitations
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

}
