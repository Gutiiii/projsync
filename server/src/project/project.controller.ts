import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) { }
    @UseGuards(JwtGuard)
    @Post()
    async project(@Body() dto: CreateProjectDto) {
        return await this.projectService.createProject(dto)
    }


}
