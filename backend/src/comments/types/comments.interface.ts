import { CreateCommentDto } from "../dto/create-comment.dto"

export interface CreateCommentsInterface {

    text: string;
    post: { id: number };
    user: { id: number };
}

