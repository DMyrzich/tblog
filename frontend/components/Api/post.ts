import type { AxiosInstance } from 'axios';
import { CreatePostDto, GetCommentsPostDto } from './dto';
import { ResponsePost } from './response';

export const PostApi = (instance: AxiosInstance) => ({

  async getAll(): Promise<{ items: ResponsePost[] }> {

    const { data } = await instance.get<{ items: ResponsePost[] }>(`posts?sort=DESC&count=15`);
    return data;
  },

  async getOne(id: number) {
    const { data } = await instance.get<ResponsePost>(`posts/${id}`);
    return data;
  },

  async create(dto: CreatePostDto): Promise<ResponsePost> {
    const { data } = await instance.post<ResponsePost>('posts', dto);
    return data;
  },

  async update(id: number, dto: CreatePostDto) {
    const { data } = await instance.patch<ResponsePost>(`posts/${id}`, dto);
    return data;
  },

  async getCommentPostId(dto: GetCommentsPostDto): Promise<ResponsePost> {

    const { postId, sort } = dto;
    const { data } = await instance.get<ResponsePost>(`posts/comments?postId=${postId}&sort=${sort}`);
    return data;
  },


});