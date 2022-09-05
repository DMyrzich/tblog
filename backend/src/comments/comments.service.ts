import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from './entities/comments.entity';
import { LikeCommentDto } from './dto/like-comment.dto';
import { UsersEntity } from '../users/entities/users.entity';

@Injectable()
export class CommentsService {

  constructor(@InjectRepository(CommentsEntity) private commentsRepository: Repository<CommentsEntity>) { }

  async create(id: number, createCommentDto: CreateCommentDto) {

    const { postId, text } = createCommentDto;

    const comment = await this.commentsRepository.save({ text, user: { id }, post: { id: postId } });

    return await this.commentsRepository.findOne(comment.id, { relations: ['user'] })
  }

  findAll() {

    return this.commentsRepository.find({ relations: ['post', 'user'] });
  }

  async findOne(id: number) {
    return await this.commentsRepository.findOne(id, { relations: ['user', 'listLike'] });
  }

  async getTopComments() {

    const comment: CommentsEntity[] = await this.commentsRepository.createQueryBuilder('c')

      .leftJoinAndSelect('c.user', 'v')
      .leftJoinAndSelect('c.post', 'n')
      .loadRelationCountAndMap('c.likeCount', 'c.listLike')
      .orderBy('c.likeCount', 'DESC')
      .limit(5)
      .getMany();

    return comment;
  }

  async update(userId: number, updateCommentDto: UpdateCommentDto) {

    const { text, commentId } = updateCommentDto;

    const comment = await this.findOne(commentId);

    if (!comment) {
      throw new HttpException('Комментарий не найден', HttpStatus.BAD_REQUEST);
    }

    if (comment.user.id != userId) {
      throw new HttpException('Нет прав для редактирования', HttpStatus.FORBIDDEN);
    }

    await this.commentsRepository.update(commentId, { text, updateAt: new Date() });

    return this.findOne(commentId);
  }

  async like(user: UsersEntity, likeCommentDto: LikeCommentDto) {

    const { commentId } = likeCommentDto;
    const { id } = user;

    const comment: CommentsEntity = await this.commentsRepository.createQueryBuilder('c')

      .loadRelationCountAndMap('c.likeCount', 'c.listLike')
      .leftJoinAndSelect('c.listLike', 'v')
      .where('c.id =:commentId', { commentId })
      .getOne();

    if (!comment) {
      throw new HttpException('Комментарий не найден', HttpStatus.BAD_REQUEST);
    }

    let isLike = false;
    let { listLike, likeCount } = comment;

    const idx = listLike.findIndex(u => u.id == id);

    if (idx == -1) {

      ++likeCount;
      listLike.push(user);
      isLike = true;
    }
    else {

      --likeCount;
      delete listLike[idx];
    }

    const editComment = { ...comment, likeCount };

    await this.commentsRepository.save(editComment);

    return { ...editComment, isLike, };
  }

  async remove(userId: number, id: number): Promise<any> {

    const comment = await this.findOne(id);

    if (!comment) {
      throw new HttpException('Комментарий не найден', HttpStatus.BAD_REQUEST);
    }

    if (comment.user.id != userId) {
      throw new HttpException('Нет прав для удаления', HttpStatus.FORBIDDEN);
    }

    return this.commentsRepository.delete(id);
  }
}
