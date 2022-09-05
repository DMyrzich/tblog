import { MinLength } from 'class-validator';

export class GetCommentPostsDto {

    @MinLength(1)
    readonly postId: number;

    readonly sort?: 'order' | 'popular';
}
