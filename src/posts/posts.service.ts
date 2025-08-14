import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'Blockchain',
      content: 'This is blockchain dev',
      authorName: 'Basanta',
      createdAt: new Date(),
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }
}
