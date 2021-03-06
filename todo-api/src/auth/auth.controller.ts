import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { loginUser } from 'src/DTO/login-user.dto';
import { userRegisterDto } from 'src/DTO/register-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // @Get()
    // getAllUser() {
    //     return this.authService.getAllUser()
    // }

    @Post('register')
    registration(@Body() regDto: userRegisterDto) {
        return this.authService.registerUser(regDto)

    }

    @Post('login')
    login(@Body(ValidationPipe) loginDto: loginUser) {
        return this.authService.loginUser(loginDto);
    }

}
