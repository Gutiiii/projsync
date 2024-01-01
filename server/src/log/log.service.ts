import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LogService {
    constructor(private prismaService: PrismaService) { }
    async createLog(user: string, type: "CREATE" | "UPDATE" | "GET" | "DELETE", message: string, ip?: string) {
        return await this.prismaService.log.create({
            data: {
                user: user,
                message: user + " " + message,
                type: type
            }
        })
    }
}
