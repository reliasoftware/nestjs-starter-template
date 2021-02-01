/* eslint-disable no-unused-vars */
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/auth/dtos/register-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiResponse({ status: 200, description: 'Successfully authenticated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  @ApiOkResponse({ description: 'token' })
  register(@Body() info: RegisterUserDto) {
    return this.authService.register(info);
  }
}
