import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/users.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { SubscribeUserDto } from './dto/subscribe-user.dto';
import e from 'express';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>) { }

  create(createUserDto: CreateUserDto) {

    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  async getTopUser() {

    const q = this.usersRepository.createQueryBuilder('u');

    q.leftJoinAndSelect('u.followers', 's')

    const user: UsersEntity[] = await q.limit(10).getMany();

    return user;
  }

  async findOne(user: UsersEntity, userId: number) {

    if (!userId) {
      throw new NotFoundException("Пользователь не найден")
    }

    const qBuilder = this.usersRepository.createQueryBuilder('u')
      .leftJoinAndSelect('u.posts', 'p')
      .where('u.id =:userId', { userId })

    if (user) {

      qBuilder.leftJoinAndSelect('u.followers', 'f');
      qBuilder.leftJoinAndSelect('u.listLike', 'l');
    }

    return await qBuilder.getOne();
  }

  me(user: UsersEntity) {

    const { id } = user;
    return this.usersRepository.findOne({ where: { id }, relations: ['posts', 'followers', 'listLike'] });
  }

  findByOne(obj: LoginAuthDto) {
    return this.usersRepository.findOne(obj);
  }

  async search(query: SearchUserDto) {

    const { email, fullName, count = 5 } = query;

    const qBuilder = this.usersRepository.createQueryBuilder('u');

    if (fullName) {
      qBuilder.andWhere('u.fullName ILiKE :body', { fullName: `%${fullName}%` })
    }

    if (email) {
      qBuilder.andWhere('u.email ILiKE :tag', { email: `%${email}%` })
    }

    const [items, total] = await qBuilder.limit(count).getManyAndCount();

    return {
      items, total
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {

    const { password, ...updateUser } = updateUserDto;
    return this.usersRepository.update(id, updateUser);
  }

  async subscribe(follower: UsersEntity, user: SubscribeUserDto) {

    const { id } = follower;
    const { userId } = user;

    const userMe: UsersEntity = await this.usersRepository.createQueryBuilder('u')
      .where('u.id =:userId', { userId })
      .leftJoinAndSelect('u.followers', 'n')
      .getOne();

    const { idx, isFollower } = userMe.findFollower(id);

    if (isFollower) {

      userMe.deleteFollower(idx);
    }
    else {

      userMe.addFollower(follower);
    }

    this.usersRepository.save(userMe)

    return { ...user, isFollower: !isFollower };
  }



}
