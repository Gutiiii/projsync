import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UserPayload } from "src/types/user.type";
@Injectable()
export class JwtAdminGuard implements CanActivate {
    constructor(private jwtServive: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        const token = this.extractTokenFromHeader(request)

        if (!token) throw new UnauthorizedException()

        try {
            const payload: UserPayload = await this.jwtServive.verifyAsync(token, {
                secret: process.env.jwtSecretKey
            })
            if (payload.role !== "ADMIN") throw new UnauthorizedException()
            request["user"] = payload
        } catch (error) {
            throw new UnauthorizedException()
        }

        return true
    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? []

        return type === "Bearer" ? token : undefined
    }
}
