import { BadGatewayException, BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { hash } from "bcrypt";
import { ChangePasswordDto } from 'src/auth/dto/auth.dto';
import { LogService } from 'src/log/log.service';
import { PrismaService } from 'src/prisma.service';
import { uuid } from 'uuidv4';

@Injectable()
export class UserService {
    private logger = new Logger('AuthController')
    constructor(private prismaService: PrismaService, private logService: LogService) { }

    async findByEmail(email: string) {
        try {
            return await this.prismaService.user.findFirst({
                where: {
                    email: {
                        equals: email,
                        mode: 'insensitive'
                    }
                },
            })
        } catch (error) {
            this.logger.verbose("Error on fn: findByEmail")
            throw new BadRequestException("Somethin went wrong!")
        }

    }

    async findByResetPasswordCode(code: string) {
        try {
            const user = await this.prismaService.user.findFirst({
                where: {
                    resetPasswordCode: code
                }
            })
            if (!user) throw new UnauthorizedException("Not authorized")

            return { id: user.id }
        } catch (error) {
            this.logger.verbose("Error on fn: findByResetPasswordCode")
            throw new BadRequestException("Something went wrong!")
        }

    }

    async addPasswordResetCode(email: string) {
        this.logger.verbose(`${email} Requested a Password Reset`)
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
            this.logger.verbose("Error on fn: addPasswordResetCode")
            throw new UnauthorizedException("Not authorized")
        }

    }

    async changePassword(dto: ChangePasswordDto) {
        try {
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
            const log = await this.logService.createLog(user.name, "CREATE", "changed their Password")


            return user

        } catch (error) {
            this.logger.verbose("Error on fn: changePassword")
            throw new BadRequestException("Something went wrong")
        }

    }
}
