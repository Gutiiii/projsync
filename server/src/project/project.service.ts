import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { connect } from 'http2';
import { LogService } from 'src/log/log.service';
import { PrismaService } from 'src/prisma.service';
import { CreateCardDto, CreateInvitationDto, CreateListDto, CreateProjectDto, EditCardDto, EditListDto, EditMemberDto, MoveListDto, UpdateProjectDto } from './dto/project.dto';

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

    async editProject(userId: string, projectId: string, dto: UpdateProjectDto) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    projectId: projectId,
                    userId: userId,
                    role: "CREATOR"
                }
            })

            if (!hasRight) throw new UnauthorizedException("Unauthorized")

            const project = await this.prismaService.project.update({
                where: {
                    id: projectId
                }, data: {
                    title: dto.title,
                    description: dto.description,
                    status: dto.status
                }
            })
            if (!project) throw new BadRequestException("Something went wrong")
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async deleteProject(userId: string, projectId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    projectId: projectId,
                    userId: userId,
                    role: "CREATOR"
                }
            })
            if (!hasRight) throw new UnauthorizedException("Unauthorized")

            const project = await this.prismaService.project.delete({ where: { id: projectId } })

            if (!project) throw new BadRequestException("Something went wrong")
        } catch (error) {
            throw new BadRequestException("Something went wrong")
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

    async editMember(id: string, dto: EditMemberDto) {
        try {
            const member = await this.prismaService.user_Project.update({
                where: {
                    id: id
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
                    userId: userId,
                    role: "CREATOR"
                }
            })

            if (!hasRight) throw new UnauthorizedException("Unauthorized")

            const member = await this.prismaService.user_Project.delete({
                where: {
                    id: id
                }
            })

            if (!member) throw new BadRequestException("Something went wrong")
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async getLists(projectId: string, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    userId: userId,
                    projectId: projectId
                }
            })

            if (!hasRight) throw new UnauthorizedException("Unauthorized")

            const lists = await this.prismaService.projectList.findMany({
                where: { projectId: projectId }, orderBy: {
                    position: "asc"
                },
            })

            return lists
        } catch (error) {
            throw new BadRequestException("Something went wrong!")
        }
    }

    async getCards(projectId: string, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    userId: userId,
                    projectId: projectId
                }
            })

            if (!hasRight) throw new UnauthorizedException("Unauthorized")
            const cards = await this.prismaService.projectCard.findMany({
                where: {
                    list: {
                        projectId: projectId
                    }
                },
                orderBy: {
                    position: "asc"
                },
                include: {
                    list: {
                        include: {
                            project: {
                                include: {
                                    userProject: {
                                        include: {
                                            user: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    projectCardAssignee: {
                        include: {
                            userProject: {
                                include: {
                                    user: true
                                }
                            }
                        }
                    }
                }
            });
            if (!cards) throw new BadRequestException("Something went wrong")
            return cards
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async createList(dto: CreateListDto, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    userId: userId,
                    projectId: dto.projectId
                }
            })

            if (!hasRight) throw new UnauthorizedException("Unauthorized")

            const list = await this.prismaService.projectList.create({
                data: {
                    title: dto.title,
                    position: dto.position,
                    projectId: dto.projectId
                }
            })
            if (!list) throw new BadRequestException("Something went wrong")

            return list
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async editList(dto: EditListDto, listId: string, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    userId: userId,
                    projectId: dto.projectId,
                    OR: [
                        { role: "CREATOR" },
                        { role: "EDITOR" }
                    ]
                }
            })
            if (!hasRight) throw new UnauthorizedException("Unauthorized")

            const list = await this.prismaService.projectList.update({
                where: {
                    id: listId
                },
                data: {
                    title: dto.title,
                    position: dto.position
                }
            })

            if (!list) throw new BadRequestException("Something went wrong")

            return list

        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async moveList(dto: MoveListDto, projectId: string, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    userId: userId,
                    projectId: projectId,
                }
            })

            if (!hasRight) throw new UnauthorizedException("Unauthorized")

            if (dto.activeListPosition > dto.overListPosition) {
                const list = await this.prismaService.$transaction(
                    [
                        this.prismaService.projectList.updateMany({
                            where: {
                                position: {
                                    gte: dto.overListPosition,
                                }, AND: {
                                    position: {
                                        not: dto.activeListPosition
                                    }
                                }
                            },
                            data: {
                                position: {
                                    increment: 1
                                }
                            }
                        }),
                        this.prismaService.projectList.update({
                            where: {
                                id: dto.activeListId
                            },
                            data: {
                                position: dto.overListPosition
                            }
                        })

                    ]
                )
                if (!list) throw new BadRequestException("Something went wrong")
                return list
            } else if (dto.activeListPosition < dto.overListPosition) {
                const list = await this.prismaService.$transaction(
                    [
                        this.prismaService.projectList.updateMany({
                            where: {
                                position: {
                                    lte: dto.overListPosition,
                                }, AND: {
                                    position: {
                                        not: dto.activeListPosition
                                    }
                                }
                            },
                            data: {
                                position: {
                                    decrement: 1
                                }
                            }
                        }),
                        this.prismaService.projectList.update({
                            where: {
                                id: dto.activeListId
                            },
                            data: {
                                position: dto.overListPosition
                            }
                        }),

                    ]
                )
                if (!list) throw new BadRequestException("Something went wrong")
                return list
            }
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async deleteList(listId: string, projectId: string, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    userId: userId,
                    projectId: projectId,
                    OR: [
                        { role: "CREATOR" },
                        { role: "EDITOR" }
                    ]
                }
            })
            if (!hasRight) throw new UnauthorizedException("Unauthorized")

            const list = await this.prismaService.projectList.delete({ where: { id: listId } })

            const lists = await this.prismaService.projectList.updateMany({
                where: {
                    position: {
                        gt: list.position
                    }
                }, data: {
                    position: {
                        decrement: 1
                    }
                }
            })

            if (!list) throw new BadRequestException("Something went wrong")

            return list
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async createCard(dto: CreateCardDto, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    userId: userId,
                    projectId: dto.projectId,
                    OR: [
                        { role: "CREATOR" },
                        { role: "EDITOR" }
                    ]
                }
            })

            if (!hasRight) throw new UnauthorizedException("Unauthorized")

            const card = await this.prismaService.projectCard.create({
                data: {
                    title: dto.title,
                    listId: dto.listId,
                    position: dto.position
                }
            })

            if (!card) throw new BadRequestException("Something went wrong")

            return card
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async deleteCard(cardId: string, projectId: string, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    userId: userId,
                    projectId: projectId,
                    OR: [
                        { role: "CREATOR" },
                        { role: "EDITOR" }
                    ]
                }
            })

            if (!hasRight) throw new UnauthorizedException("Unauthorized")

            const card = await this.prismaService.projectCard.delete({
                where: {
                    id: cardId
                }
            })

            const cards = await this.prismaService.projectCard.updateMany({
                where: {
                    listId: card.listId,
                    position: {
                        gt: card.position
                    },
                },
                data: {
                    position: {
                        decrement: 1
                    }
                }
            })

            if (!card) throw new BadRequestException("Something went wrong")

            return card
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }

    }

    async editCard(cardId: string, dto: EditCardDto, userId: string) {
        try {
            const hasRight = await this.prismaService.user_Project.findFirst({
                where: {
                    userId: userId,
                    projectId: dto.projectId,
                    OR: [
                        { role: "CREATOR" },
                        { role: "EDITOR" }
                    ]
                }
            })

            if (!hasRight) throw new UnauthorizedException("Unauthorized")
            console.log(dto.assignees)
            const card = await this.prismaService.projectCard.update({
                where: {
                    id: cardId
                }, data: {
                    title: dto.title,
                    description: dto.description,
                    dueDate: dto.dueDate,
                    projectCardAssignee: {
                        deleteMany: {},
                        createMany: {
                            data: dto.assignees.map((assignee: any) => ({
                                userProjectId: assignee,
                            }))
                        }
                    }
                }, include: {
                    projectCardAssignee: {
                        include: {
                            userProject: {
                                include: {
                                    user: true
                                }
                            }
                        }
                    }
                }
            })
            if (!card) throw new BadRequestException("Something went wrong")
            return card
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }
}

