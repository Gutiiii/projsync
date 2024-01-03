import { Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AcceptInvitationDto, CreateInvitationDto, CreateProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    private logger = new Logger("ProjectController")
    constructor(private projectService: ProjectService) { }

    @UseGuards(JwtGuard)
    @Post()
    async project(@Body() dto: CreateProjectDto, @GetUser() user) {
        this.logger.log("-------------------------")
        this.logger.verbose(`${user.name} Created a new Project:`)
        return await this.projectService.createProject(dto)
    }

    @UseGuards(JwtGuard)
    @Get("all")
    async allProjects(@Req() request) {
        return await this.projectService.getAllProjects(request.user.id)
    }

    @UseGuards(JwtGuard)
    @Get("auth/:projectId")
    async authProject(@Req() request, @Param('projectId') projectId) {
        return await this.projectService.authProject(request.user.id, projectId)
    }

    @UseGuards(JwtGuard)
    @Get(":projectId")
    async projectById(@Param('projectId') projectId) {
        return await this.projectService.getProjectById(projectId)
    }

    @UseGuards(JwtGuard)
    @Post("invite")
    async createInvitation(@Body() dto: CreateInvitationDto, @Req() request) {
        return await this.projectService.createInvitation(dto, request.user.id)
    }

    @UseGuards(JwtGuard)
    @Post("invite/accept")
    async acceptInvitation(@Body() dto: AcceptInvitationDto, @Req() request) {
        return await this.projectService.acceptInvitation(dto.invitationId, request.user.email)
    }

    @UseGuards(JwtGuard)
    @Get("invitations/:projectId")
    async getInvitationsProject(@Param("projectId") projectId, @Req() request) {
        return await this.projectService.getInvitationsProject(projectId, request.user.id)
    }

    @Get("invitation/:invitationId")
    async invitationById(@Param("invitationId") invitationId) {
        return await this.projectService.getInvitationById(invitationId)
    }
}
