import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(MailService) private mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByUsername(createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findOneByUsername(username);
    if (user && (await this.validatePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(userId: string) {
    return this.usersRepository.findOneBy({ userId });
  }
  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user === null) {
      return 'User is not found or account is already deleted.';
    }
    return this.usersRepository.remove(user);
  }
}
