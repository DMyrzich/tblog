import { PartialType } from '@nestjs/mapped-types';
import { CreatePostsDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostsDto) { }

