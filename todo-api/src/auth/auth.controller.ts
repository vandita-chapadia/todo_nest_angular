import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { loginUser } from 'src/DTO/login-user.dto';
import { userRegisterDto } from 'src/DTO/register-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // add register route
  @Post('register')
  registration(@Body() regDto: userRegisterDto) {
    return this.authService.registerUser(regDto);
  }
  // add register login
  @Post('login')
  login(@Body(ValidationPipe) loginDto: loginUser) {
    return this.authService.loginUser(loginDto);
  }
}
