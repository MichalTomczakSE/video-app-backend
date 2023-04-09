import { Controller, Post, UseGuards, Get, Body, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
  @Post('/register')
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto: CreateUserDto):Promise<Omit<User, 'password'>> {
    const createdUser = await this.usersService.create(createUserDto);
    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
