import { Controller, Get, Body, Patch, Param, Request, UseGuards, UsePipes, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { SubscribeUserDto } from './dto/subscribe-user.dto';
import { UsersEntity } from './entities/users.entity';
import { User } from 'src/decorators/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Get('profile/:id?')
  @UseGuards(OptionalJwtAuthGuard)
  async profile(@User() user: UsersEntity, @Param('id') id: number) {

    return this.usersService.findOne(user, id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@User() user: UsersEntity) {
    return this.usersService.me(user);
  }

  @Get('top')
  getTopUser() {
    return this.usersService.getTopUser();
  }

  @Post('subscribe')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  subscribe(@User() user: UsersEntity, @Body() subscribeUserDto: SubscribeUserDto) {
    return this.usersService.subscribe(user, subscribeUserDto);
  }

}
