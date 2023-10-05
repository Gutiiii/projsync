import { Injectable, UnauthorizedException } from '@nestjs/common';
import { emit } from 'process';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/auth.dto';

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

        if (dto.password) {
            const newUser = await this.prisma.user.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    password: dto.password
                }
            })
            const { password, ...result } = newUser

            return result
        } else {
            const newUser = await this.prisma.user.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                }
            })
            return newUser
        }
    }
}
