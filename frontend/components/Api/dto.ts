import { OutputBlockData } from '@editorjs/editorjs';

export type LoginDto = {
    email: string;
    password: string
}

export type RegistryDto = {
    fullName: string;
} & LoginDto

export type CreatePostDto = {
    title: string;
    body: OutputBlockData[];
    tags?: string;
}

export type GetCommentsPostDto = {
    postId: number;
    sort?: 'order' | 'popular'
}

export type CreateCommentsDto = {
    text: string;
    postId: number;
}

export type UpdateCommentsDto = {
    text: string;
    commentId: number;
}

export type LikeCommentsDto = {
    commentId: number;
}

export type CreateSubscribe = {
    userId: number;
}