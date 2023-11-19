import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash } from "bcrypt";
import { ChangePasswordDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { uuid } from 'uuidv4';

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

    async findByResetPasswordCode(code: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                resetPasswordCode: code
            }
        })
        if (!user) throw new UnauthorizedException("Not authorized")

        return { id: user.id }
    }

    async addPasswordResetCode(id: string) {
        const user = await this.prismaService.user.update({
            where: {
                id: id
            },
            data: {
                resetPasswordCode: uuid()
            }
        })

        return { code: user.resetPasswordCode }
    }

    async changePassword(dto: ChangePasswordDto) {
        return await this.prismaService.user.update({
            where: {
                resetPasswordCode: dto.code
            },
            data: {
                password: await hash(dto.password, 10)
            }
        })
    }
}
