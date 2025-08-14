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

  create(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
    const newPost: Post = {
      id: this.genNextId(),
      ...createPostData,
      createdAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(
    id: number,
    updatePostData: Partial<Omit<Post, 'id' | 'createdAt'>>,
  ): Post {
    const currentPostIndexToEdit = this.posts.findIndex((p) => p.id === id);

    if (currentPostIndexToEdit == -1)
      throw new NotFoundException(`Post with id: ${id} not found!`);

    this.posts[currentPostIndexToEdit] = {
      ...this.posts[currentPostIndexToEdit],
      ...updatePostData,
      updatedAt: new Date(),
    };

    return this.posts[currentPostIndexToEdit];
  }

  delete(id: number) {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex === -1)
      throw new NotFoundException(`Post with id: ${id} not found!`);

    return { message: `Post with id: ${id} Successfully deleted!` };
  }

  private genNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((post) => post.id)) + 1
      : 1;
  }
}
