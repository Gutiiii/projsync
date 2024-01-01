import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { LogService } from 'src/log/log.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
    controllers: [ProjectController],
    providers: [PrismaService, AuthService, UserService, JwtService, ProjectService, LogService],
})

export class ProjectModule { }
