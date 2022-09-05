import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/entities/users.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByOne({ email, password });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  generateJwt(data: { email: string, id: number }) {

    const payload = { email: data.email, id: data.id };
    return this.jwtService.sign(payload);
  }

  async login(user: UsersEntity) {

    return {
      user,
      access_token: this.generateJwt(user),
    };
  }

  async create(userDto: CreateUserDto) {

    const { password, ...user } = await this.usersService.create({ email: userDto.email, fullName: userDto.fullName, password: userDto.password });
    return {
      ...user,
      access_token: this.generateJwt(user),
    };
  }

}