/* eslint-disable prettier/prettier */
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

import { LoginDto } from './dto/login.dto';
import { User } from '../entities/user.entity';
import { hash, compare } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await hash(registerDto.password, 10);
    return this.userService.create({
        ...registerDto,
        password: hashedPassword,
        email: ''
    });
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findByUsername(loginDto.username);
    if (!user || !(await compare(loginDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
