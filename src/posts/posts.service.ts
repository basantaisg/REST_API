import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number): Post {
    const singlePost = this.posts.find((p) => p.id === id);

    if (!singlePost)
      throw new NotFoundException(`Post with ID: ${id} Not found!`);

    return singlePost;
  }
}
