import { Body, Controller } from '@nestjs/common';
import { RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        console.log(dto)
        return null
    }
}
