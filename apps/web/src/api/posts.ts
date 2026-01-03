import { http } from './http';

export type PostListItem = { id: string; title: string; summary: string; createdAt: string; updatedAt: string };
export type PostDetail = PostListItem & { content: string };

export const postsApi = {
  list: () => http.get<PostListItem[]>('/posts').then(r => r.data),
  detail: (id: string) => http.get<PostDetail>(`/posts/${id}`).then(r => r.data),
  adminList: () => http.get<any[]>('/posts/admin/all').then(r => r.data),
  create: (data: any) => http.post('/posts', data).then(r => r.data),
  update: (id: string, data: any) => http.put(`/posts/${id}`, data).then(r => r.data),
};
