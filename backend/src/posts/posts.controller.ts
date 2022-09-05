import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, HttpException, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindAllQueryDto, schemaSearch } from './dto/find-all-post.dto';
import { schemaFindAll, SearchQueryDto } from './dto/search-post.dto';
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/decorators/decorators';
import { GetCommentPostsDto } from './dto/get-comment.dto';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createPostDto: CreatePostsDto) {

    return this.postsService.create(req.user.id, createPostDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: FindAllQueryDto) {

    const validate = schemaFindAll.validate(query, { allowUnknown: true });

    if (validate.error) {
      throw new HttpException(validate.error.message, HttpStatus.FORBIDDEN);
    }

    return this.postsService.findAll(query);
  }

  @Get('comments')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  getCommentPostId(@Query() params: GetCommentPostsDto) {
    return this.postsService.getCommentPostId(params);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  search(@Body() body: SearchQueryDto) {

    const validate = schemaSearch.validate(body, { allowUnknown: true });

    if (validate.error) {
      throw new HttpException(validate.error.message, HttpStatus.FORBIDDEN);
    }

    return this.postsService.search(body);
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  findOne(@User() user, @Param('id') id: string) {

    return this.postsService.findOne(user, +id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}

