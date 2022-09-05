import { OutputBlockData } from "@editorjs/editorjs";

export type ResponseUser = {
    id: number,
    email: string,
    fullName: string,
    avatarUrl: string;
    createdAlt: string,
    updatedAlt: string,
    access_token: string;
    isFollower: boolean;
    followersCount: number;
    post: ResponsePost;
    followers: ResponseUser[];
}

export type ResponseComment = {
    id: number;
    text: string;
    createAt: Date;
    updateAt: Date;
    isLike: boolean;
    likeCount: number;
    user: ResponseUser;
    post: ResponsePost;
}

export type ResponsePost = {
    id: number;
    title: string,
    description: string;
    imgUrl?: string;
    comments: ResponseComment[]
    body: OutputBlockData[];
    commentsCount: number;
    author: ResponseUser
}



