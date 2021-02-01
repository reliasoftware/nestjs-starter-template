import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './users.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User info', type: User })
  me(@Req() req) {
    return req.user;
  }
}
