import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() { user }) {
    return await this.authService.login(user);
  }

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    console.log(payload);
    return await this.authService.register(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  async profile(@Req() { user }) {
    return await this.authService.getProfile(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  async verify(@Req() { user }) {
    return await this.authService.verify(user);
  }
}
