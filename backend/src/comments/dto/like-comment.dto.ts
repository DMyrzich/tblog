import { IsNotEmpty } from 'class-validator';

export class LikeCommentDto {

    @IsNotEmpty()
    commentId: number;
}
