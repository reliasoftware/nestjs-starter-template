/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { RegisterUserDto } from '../auth/dtos/register-user.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findOne(options: FindOneOptions<User>) {
    return this.userRepo.findOne(options);
  }

  async register(params: RegisterUserDto) {
    const user = new User();
    Object.assign(user, params);
    user.hasPassword(params.password);

    return this.userRepo.save(user);
  }
}
