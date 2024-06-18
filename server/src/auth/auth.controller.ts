import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("signup")
    @UsePipes(new ValidationPipe())
    signup(@Body() signupDTO: SignupDTO) {
        return this.authService.signup(signupDTO)
    }
}