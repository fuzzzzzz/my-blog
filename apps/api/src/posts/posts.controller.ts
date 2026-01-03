import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private posts: PostsService) {}

  @Get()
  list() {
    return this.posts.list();
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.posts.detail(id);
  }

  @Get('admin/all')
  @AuthGuard()
  adminList() {
    return this.posts.adminList();
  }

  @Post()
  @AuthGuard()
  create(@Req() req: any, @Body() body: { title: string; summary?: string; content: string; status?: 'DRAFT' | 'PUBLISHED' }) {
    return this.posts.create(req.user.sub, body as any);
  }

  @Put(':id')
  @AuthGuard()
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.posts.update(req.user.sub, id, body);
  }
}
