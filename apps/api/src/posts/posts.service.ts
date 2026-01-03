import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostStatus } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, summary: true, createdAt: true, updatedAt: true },
    });
  }

  async detail(id: string) {
    const post = await this.prisma.post.findFirst({
      where: { id, status: 'PUBLISHED' },
      select: { id: true, title: true, summary: true, content: true, createdAt: true, updatedAt: true },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  adminList() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, summary: true, status: true, createdAt: true, updatedAt: true },
    });
  }

  create(authorId: string, data: { title: string; summary?: string; content: string; status?: PostStatus }) {
    return this.prisma.post.create({
      data: {
        title: data.title,
        summary: data.summary ?? '',
        content: data.content,
        status: data.status ?? 'PUBLISHED',
        authorId,
      },
      select: { id: true },
    });
  }

  async update(authorId: string, id: string, data: { title?: string; summary?: string; content?: string; status?: PostStatus }) {
    const exists = await this.prisma.post.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Post not found');
    if (exists.authorId !== authorId) throw new NotFoundException('Post not found');

    return this.prisma.post.update({
      where: { id },
      data,
      select: { id: true },
    });
  }
}
