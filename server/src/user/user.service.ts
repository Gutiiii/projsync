import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { hash } from "bcrypt";
import { ChangePasswordDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { uuid } from 'uuidv4';

@Injectable()
export class UserService {
    private logger = new Logger('AuthController')
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

    async addPasswordResetCode(email: string) {
        try {
            const user = await this.prismaService.user.update({
                where: {
                    email: email
                },
                data: {
                    resetPasswordCode: uuid()
                }
            })

            return { code: user.resetPasswordCode }
        } catch (error) {
            throw new UnauthorizedException("Not authorized")
        }

    }

    async changePassword(dto: ChangePasswordDto) {
        const user = await this.prismaService.user.update({
            where: {
                resetPasswordCode: dto.code
            },
            data: {
                password: await hash(dto.password, 10),
                resetPasswordCode: null
            }
        })
        this.logger.verbose(`${user.email} Changed his Password`)

        return user
    }
}
