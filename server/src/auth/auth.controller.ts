import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProviderDto, RegisterDto, SigninDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('provider')
    async provider(@Body() dto: ProviderDto) {
        return await this.authService.provider(dto)
    }

    @Post('signup')
    async signup(@Body() dto: RegisterDto) {
        return await this.authService.signup(dto)
    }

    @Post('signin')
    async signin(@Body() dto: SigninDto) {
        return await this.authService.signin(dto)
    }


}
