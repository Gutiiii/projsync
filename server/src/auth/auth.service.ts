import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from "bcrypt";
import env from 'src/lib/env';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtDto, ProviderDto, RegisterDto, SigninDto } from './dto/auth.dto';


const EXPIRE_TIME = 10800000

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private userService: UserService, private jwtService: JwtService) { }


    async signup(dto: RegisterDto) {
        const res = await this.userService.findByEmail(dto.email)

        if (res) throw new UnauthorizedException("User already exists")

        const newUser = await this.prismaService.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: await hash(dto.password, 10),
                provider: "CREDENTIALS"
            }
        })
        const { password, ...user } = newUser

        return user
    }

    async provider(dto: ProviderDto) {
        const res = await this.userService.findByEmail(dto.email)
        if (res) {

            const payload = {
                id: res.id,
                name: res.name,
                email: res.email,
                role: res.role,
                provider: res.provider,
                sub: {
                    createdAt: res.createdAt,
                    updatedAt: res.updatedAt
                }
            }

            const { password, ...user } = res



            return {
                user,
                backendTokens: {
                    accessToken: await this.jwtService.signAsync(payload, {
                        expiresIn: "3h",
                        secret: env.jwtSecretKey
                    }),
                    expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
                }

            }
        }

        if (!res) {
            const newUser = await this.prismaService.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    provider: dto.provider
                }
            })

            const { password, ...user } = newUser

            const payload = {
                id: res.id,
                name: res.name,
                email: res.email,
                role: res.role,
                provider: res.provider,
                sub: {
                    createdAt: res.createdAt,
                    updatedAt: res.updatedAt
                }
            }

            return {
                user,
                backendTokens: {
                    accessToken: await this.jwtService.signAsync(payload, {
                        expiresIn: "3h",
                        secret: env.jwtSecretKey
                    }),
                    expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
                }
            }
        }

        throw new BadRequestException("Something went wrong!")
    }

    async jwt(dto: JwtDto) {
        const res = await this.userService.findByEmail(dto.email)
        if (res) {

            const payload = {
                id: res.id,
                name: res.name,
                email: res.email,
                role: res.role,
                provider: res.provider,
                sub: {
                    createdAt: res.createdAt,
                    updatedAt: res.updatedAt
                }
            }

            const { password, ...user } = res

            return {
                user,
                backendTokens: {
                    accessToken: await this.jwtService.signAsync(payload, {
                        // expiresIn: "20s",
                        secret: env.jwtSecretKey
                    }),
                    expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
                }

            }
        }
        throw new BadRequestException("Something went wrong!")
    }

    async signin(dto: SigninDto) {
        const user = await this.validateUser(dto)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            provider: user.provider,
            sub: {
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }

        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    // expiresIn: "20s",
                    secret: env.jwtSecretKey
                }),
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
            }
        }
    }

    async validateUser(dto: SigninDto) {
        const user = await this.userService.findByEmail(dto.email)

        if (!user.password) throw new UnauthorizedException()

        if (user && (await compare(dto.password, user.password))) {
            const { password, ...result } = user

            return result
        }

        throw new UnauthorizedException()
    }

    async refreshToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.sub
        }

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                // expiresIn: "20s",
                secret: process.env.jwtSecretKey,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
        }
    }


}
