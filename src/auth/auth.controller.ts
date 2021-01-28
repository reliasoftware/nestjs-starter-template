/* eslint-disable no-unused-vars */
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { RegisterUserDto } from 'src/auth/dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  register(@Body() info: RegisterUserDto) {
    return this.authService.register(info);
  }
}
