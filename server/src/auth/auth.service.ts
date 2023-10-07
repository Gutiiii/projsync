import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { hash } from "bcrypt";
import { PrismaService } from 'src/prisma.service';
import { ProviderDto, RegisterDto } from './dto/auth.dto';

@Injectable()

export class AuthService {
    constructor(private prisma: PrismaService) { }


    async signup(dto: RegisterDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (user) throw new UnauthorizedException("User already exists")

        const newUser = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: await Bun.password.hash(dto.password),
                provider: "CREDENTIALS"
            }
        })
        const { password, ...result } = newUser

        return result
    }

    async provider(dto: ProviderDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (user) return user

        if (!user) {
            const newUser = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    provider: dto.provider
                }
            })
            return newUser
        }

        throw new BadRequestException("Something went wrong!")
    }
}
