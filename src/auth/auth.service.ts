import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(username, password);

    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      name: user.name,
      access_token: this.jwtService.sign(payload),
    };
  }
}
