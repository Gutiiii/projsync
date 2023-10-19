import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async findByEmail(email: string) {
        return await this.prismaService.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            },
        })
    }
}
