/* eslint-disable prettier/prettier */
// src/user/dto/user.dto.ts
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  picture?: string;
}

export class UpdateUserDto {
  @IsString()
  username?: string;

  @IsEmail()
  email?: string;

  @IsString()
  password?: string;

  @IsString()
  picture?: string;
}