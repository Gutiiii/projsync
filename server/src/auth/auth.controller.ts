import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    @Post('signup')
    async signup(@Body() dto: RegisterDto) {
        console.log(dto)
        return null
    }
}
