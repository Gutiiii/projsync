import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AcceptInvitationDto, CreateInvitationDto, CreateListDto, CreateProjectDto, EditListDto, EditMemberDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    private logger = new Logger("ProjectController")
    constructor(private projectService: ProjectService) { }

    @UseGuards(JwtGuard)
    @Post()
    async createProject(@Body() dto: CreateProjectDto, @GetUser() user) {
        this.logger.log("-------------------------")
        this.logger.verbose(`${user.name} Created a new Project:`)
        return await this.projectService.createProject(dto)
    }

    @UseGuards(JwtGuard)
    @Patch(":projectId")
    async editProject(@Param("projectId") projectId, @Body() dto: UpdateProjectDto, @Req() request) {
        return await this.projectService.editProject(request.user.id, projectId, dto)
    }

    @UseGuards(JwtGuard)
    @Delete(":projectId")
    async deleteProject(@Param("projectId") projectId, @Req() request) {
        return await this.projectService.deleteProject(request.user.id, projectId)
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

    @UseGuards(JwtGuard)
    @Delete("/invitation/:invitationId")
    async deleteInvitation(@Param('invitationId') invitationId) {
        return await this.projectService.deleteInvitation(invitationId)
    }

    @UseGuards(JwtGuard)
    @Patch("member")
    async editMember(@Body() dto: EditMemberDto) {
        return await this.projectService.editMember(dto)
    }

    @UseGuards(JwtGuard)
    @Delete("member/:id")
    async removeMember(@Param('id') id, @Req() request) {
        return await this.projectService.removeMember(id, request.user.id)
    }

    @UseGuards(JwtGuard)
    @Get("list/:projectId")
    async getLists(@Param('projectId') projectId, @Req() request) {
        return await this.projectService.getLists(projectId, request.user.id)
    }

    @UseGuards(JwtGuard)
    @Post("list")
    async createList(@Body() dto: CreateListDto, @Req() request) {
        return await this.projectService.createList(dto, request.user.id)
    }

    @UseGuards(JwtGuard)
    @Patch("list/:listId")
    async editList(@Body() dto: EditListDto, @Param("listId") listId, @Req() request) {
        return await this.projectService.editList(dto, listId, request.user.id)
    }

    @UseGuards(JwtGuard)
    @Get("card/:projectId")
    async getCards(@Param("projectId") projectId, @Req() request) {
        return await this.projectService.getCards(projectId, request.user.id)
    }
}
