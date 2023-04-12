import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @IsEmail()
  username: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  currentTokenId: string;
}
