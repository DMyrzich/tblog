import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-post.dto';
import { FindAllQueryDto } from './dto/find-all-post.dto';
import { SearchQueryDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsEntity } from './entities/posts.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { GetCommentPostsDto } from './dto/get-comment.dto';

@Injectable()
export class PostsService {

  constructor(@InjectRepository(PostsEntity) private postsRepository: Repository<PostsEntity>) { }

  create(id: number, createPostDto: CreatePostsDto) {

    const { body, title, tags } = createPostDto;

    const description = body.find(obj => obj.type === 'paragraph')?.data.text;

    return this.postsRepository.save({ body, title, tags, description, author: { id } });
  }

  async findAll(query: FindAllQueryDto) {

    const { sort, count } = query;

    const [items, total] = await this.postsRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author').orderBy('post.createAt', sort).limit(count).getManyAndCount();

    return { items, total };
  }

  async getCommentPostId(params: GetCommentPostsDto) {

    const { postId, sort } = params;

    const post = await this.postsRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'c')
      .loadRelationCountAndMap('c.commentsCount', 'post.comments')
      .leftJoinAndSelect('c.user', 'b')
      .leftJoinAndSelect('post.author', 'v')

      .where('post.Id =:postId', { postId })
      .orderBy(sort == 'popular' ? 'c.likeCount' : 'c.createAt', sort == 'popular' ? 'DESC' : 'ASC')

      .getOne();

    return post;
  }

  async search(bodyPost: SearchQueryDto) {

    const { sort, count, body, title, tag } = bodyPost;

    const qBuilder = this.postsRepository.createQueryBuilder('w');

    if (body) {
      qBuilder.andWhere('w.body ILiKE :body', { body: `%${body}%` })
    }

    if (title) {
      qBuilder.andWhere('w.title ILiKE :title', { title: `%${title}%` })
    }

    if (tag) {
      qBuilder.andWhere('w.tag ILiKE :tag', { tag: `%${tag}%` })
    }

    const [items, total] = await qBuilder.orderBy('views', sort).limit(count).getManyAndCount();

    return { items, total };
  }

  async findOne(user: UsersEntity, postId: number) {

    const { id: userId } = user;

    const posts: PostsEntity = await this.postsRepository.createQueryBuilder('p')

      .loadRelationCountAndMap('p.commentsCount', 'p.comments')
      .leftJoinAndSelect('p.author', 'a')

      .leftJoinAndSelect('a.followers', 'v', 'v.id =:userId', { userId })

      .leftJoinAndSelect('p.comments', 'u')
      .leftJoinAndSelect('u.user', 'f')
      .addOrderBy('u', 'ASC')
      .loadRelationCountAndMap('u.likeCount', 'u.listLike')
      .leftJoinAndSelect('u.listLike', 'o', 'o.id =:userId', { userId })

      .where('p.id = :postId', { postId }).limit(20).getOne();

    if (!posts) {
      throw new NotFoundException("Запись не найдена")
    }

    let isFollower = false;

    if (userId) {

      isFollower = posts.author.followers.length ? true : false;
      posts.comments = posts.comments.map(el => { return { ...el, isLike: el.listLike.length ? true : false } })
    }

    await this.postsRepository.update(postId, { views: ++posts.views });

    return { ...posts, author: { ...posts.author, isFollower } };
  }

  async update(id: number, updatePostDto: UpdatePostDto) {

    const find = await this.postsRepository.findOne(id);
    if (!find) {
      throw new NotFoundException("Запись не найдена")
    }
    const { body, title, tags } = updatePostDto;
    const description = updatePostDto.body.find(obj => obj.type === 'paragraph')?.data.text;

    return this.postsRepository.update(id, { body, title, tags, description });
  }

  async remove(id: number) {

    const find = await this.postsRepository.findOne(id);
    if (!find) {
      throw new NotFoundException("Запись не найдена")
    }
    return this.postsRepository.delete(id);
  }
}
