import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { ChangePasswordDto, JwtDto, ProviderDto, RegisterDto, SigninDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController')
    constructor(private authService: AuthService, private userService: UserService) { }

    @Post('provider')
    async provider(@Body() dto: ProviderDto) {
        return await this.authService.provider(dto)
    }

    @Post("jwt")
    async jwt(@Body() dto: JwtDto) {
        return await this.authService.jwt(dto)
    }

    @Post('signup')
    async signup(@Body() dto: RegisterDto) {
        return await this.authService.signup(dto)
    }

    @Post('signin')
    async signin(@Body() dto: SigninDto) {
        return await this.authService.signin(dto)
    }

    @Get("findbyresetpasswordcode/:code")
    async findByResetPasswordCode(@Param('code') code: string) {
        return await this.userService.findByResetPasswordCode(code)
    }

    @Get("addpasswordresetcode/:id")
    async AddPassworDresetCode(@Param('id') id: string) {
        return await this.userService.addPasswordResetCode(id)
    }

    @Post("changepassword")
    async changePassword(@Body() dto: ChangePasswordDto) {
        return await this.userService.changePassword(dto)
    }

}
