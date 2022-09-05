import { Controller, Get, Post, Body, Request, Put, Param, Delete, UseGuards, ValidationPipe, UsePipes, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LikeCommentDto } from './dto/like-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Request() req, @Body() createCommentDto: CreateCommentDto) {

    return this.commentsService.create(req.user.id, createCommentDto);
  }

  @Post('like')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  like(@Request() req, @Body() likeCommentDto: LikeCommentDto) {

    return this.commentsService.like(req.user, likeCommentDto);
  }

  @Get('top')
  getTopUser() {
    return this.commentsService.getTopComments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll() {
    return this.commentsService.findAll();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Request() req, @Body() updateCommentDto: UpdateCommentDto) {

    return this.commentsService.update(req.user.id, updateCommentDto);
  }

  @Delete(':id?')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Request() req, @Query('id') id: string) {

    return this.commentsService.remove(req.user.id, +id);
  }
}
