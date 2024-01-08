import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LogService } from 'src/log/log.service';
import { PrismaService } from 'src/prisma.service';
import { CreateInvitationDto, CreateProjectDto, EditMemberDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
    private logger = new Logger('ProjectService')
    constructor(private prismaService: PrismaService, private logService: LogService) { }

    async createProject(dto: CreateProjectDto) {
        try {
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
                await this.logService.createLog(dto.id, "CREATE", `Created Project ${project.id}`)
                if (userProject) return { project, userProject }

                throw new BadRequestException("Something went wrong!")
            } else {
                throw new BadRequestException("Something went wrong!")
            }
        } catch (error) {
            this.logger.verbose("Error on fn: createProject")
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
                        role: true,
                        userId: true
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

            const user = await this.prismaService.user_Project.findMany({
                where: {
                    user: {
                        email: dto.email
                    },
                    projectId: dto.projectId
                }
            })
            if (user.length > 0) throw new BadRequestException("User is already a Member of this Project!")
            const invitation = await this.prismaService.invitation.create({
                data: {
                    projectId: dto.projectId,
                    email: dto.email,
                    role: dto.role
                }
            })
            this.logService.createLog(userId, "CREATE", `Invited Member to Project ${dto.projectId}`)
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

    async getInvitationById(invitationId: string) {
        try {
            const invitation = await this.prismaService.invitation.findFirst({
                where: {
                    id: invitationId
                }
            })

            if (!invitation) throw new UnauthorizedException("Unauthorized")
            return invitation
        } catch (error) {
            throw new UnauthorizedException("Unauthorized")
        }
    }

    async acceptInvitation(invitationId: string, email: string) {

        try {
            const invitation = await this.prismaService.invitation.findFirst({
                where: {
                    id: invitationId
                }
            })

            if (!invitation) throw new UnauthorizedException("Unauthorized")
            const user = await this.prismaService.user.findFirst({
                where: {
                    email: email
                }
            })

            if (!user) throw new BadRequestException("Something went wrong")
            const user_Project = await this.prismaService.user_Project.create({
                data: {
                    userId: user.id,
                    projectId: invitation.projectId,
                    role: invitation.role,
                }
            })
            if (!user_Project) throw new BadRequestException("Something went wrong")

            await this.deleteInvitation(invitationId)
            return { projectId: user_Project.projectId }

        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async deleteInvitation(invitationId: string) {
        try {
            const invitation = await this.prismaService.invitation.delete({
                where: {
                    id: invitationId
                }
            })
            if (!invitation) throw new BadRequestException("Something went wrong")

            return invitation
        } catch (error) {
            throw new BadRequestException("Something went wrong!")
        }
    }

    async editMember(dto: EditMemberDto) {
        try {
            const member = await this.prismaService.user_Project.update({
                where: {
                    id: dto.userProjectId
                }, data: {
                    role: dto.role
                }
            })
            if (!member) throw new BadRequestException("Something went wrong")

            return member
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async removeMember(id: string, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    userId: userId
                }
            })

            if (!hasRight && hasRight.role !== "CREATOR") throw new UnauthorizedException("Unauthorized")

            const member = await this.prismaService.user_Project.delete({
                where: {
                    id: id
                }
            })
            console.log(member)
            if (!member) throw new BadRequestException("Something went wrong")
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

}
