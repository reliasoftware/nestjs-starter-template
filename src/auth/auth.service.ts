/* eslint-disable no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { pick } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({ where: { username } });

    if (user && user.verifyPassword(password)) {
      return pick(user, ['id', 'username']);
    }

    return null;
  }

  async login(user: any) {
    const payload = pick(user, ['id', 'username']);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(params: RegisterUserDto) {
    let user = await this.usersService.findOne({
      where: { username: params.username },
    });

    if (user) {
      throw new BadRequestException('Invalid username');
    }

    user = await this.usersService.register(params);
    return this.login(user);
  }
}
