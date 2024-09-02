import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sing-in-dto';
import { Public } from 'src/auth/decorator';
import { CustomResponse } from 'src/interface/CustomResponse';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    signInUser(@Body() signInDto: signInDto): Promise<CustomResponse> {
      return this.authService.signInUser(signInDto.email, signInDto.password);
    }
    
    @Public()
    @Post('login/admin')
    signInAdmin(@Body() signInDto: signInDto): Promise<CustomResponse> {
      return this.authService.signInAdmin(signInDto.email, signInDto.password);
    } 

    @Get('ping')
    ping(): boolean {
      return true;
    }
}
