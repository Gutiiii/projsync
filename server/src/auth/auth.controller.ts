import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProviderDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('provider')
    async provider(@Body() dto: ProviderDto) {
        return await this.authService.provider(dto)
    }

    @Post('signup')
    async signup(@Body() dto: RegisterDto) {
        return null
    }


}
