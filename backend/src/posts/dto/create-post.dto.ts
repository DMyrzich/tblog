import { MinLength } from 'class-validator';

export interface OutputBlockData {

    id: number;
    type: 'paragraph' | string;
    data: { text: string };
}

export class CreatePostsDto {

    @MinLength(5)
    readonly title: string;

    readonly body: OutputBlockData[];

    readonly tags?: string;
}
