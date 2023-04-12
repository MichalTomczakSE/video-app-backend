import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Req,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string; access_token: string }> {
    const jwt = await this.authService.login(req.user as User);
    res.cookie('access_token', jwt.access_token, {
      httpOnly: true,
    });
    return {
      message: `Welcome ${jwt.name}!`,
      access_token: jwt.access_token,
    };
  }
  @Post('/register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const createdUser = await this.usersService.create(createUserDto);
    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }
}
