import { IsNotEmpty } from 'class-validator';

export class UpdateCommentDto {

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    commentId: number;
}
