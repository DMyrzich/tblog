import type { AxiosInstance } from 'axios';
import { CreateCommentsDto, LikeCommentsDto, UpdateCommentsDto } from './dto';
import { ResponseComment } from './response';

export const CommentApi = (instance: AxiosInstance) => ({

    async create(dto: CreateCommentsDto): Promise<ResponseComment> {
        const { data } = await instance.post('comments', dto);
        return data;
    },

    async delete(id: number) {
        const { data } = await instance.delete(`comments?id=${id}`);
        return data;
    },

    async update(dto: UpdateCommentsDto): Promise<ResponseComment> {
        const { data } = await instance.put(`comments`, dto);
        return data;
    },

    async like(dto: LikeCommentsDto): Promise<ResponseComment> {
        const { data } = await instance.post(`comments/like`, dto);
        return data;
    },

    async top(): Promise<ResponseComment[]> {

        const { data } = await instance.get("comments/top");
        return data;
    }

});