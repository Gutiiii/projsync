import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
    providers: [LogService, PrismaService, UserService],
    controllers: [LogController]
})
export class LogModule { }
