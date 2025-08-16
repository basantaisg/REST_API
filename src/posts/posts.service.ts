import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostRepo } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepo)
    private readonly postRepository: Repository<PostRepo>,
  ) {}

  private posts: Post[] = [
    {
      id: 1,
      title: 'Blockchain',
      content: 'This is blockchain dev',
      authorName: 'Basanta',
      createdAt: new Date(),
    },
  ];

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const singlePost = await this.postRepository.findOneBy({ id });

    if (!singlePost)
      throw new NotFoundException(`Post with ID: ${id} Not found!`);

    return singlePost;
  }

  async create(createPostData: CreatePostDto): Promise<Post> {
    const newPost: Post = this.postRepository.create({
      title: createPostData.title,
      content: createPostData.content,
      authorName: createPostData.authorName,
    });
    return this.postRepository.save(newPost);
  }

  async update(id: number, updatePostData: UpdatePostDto): Promise<Post> {
    const findPostToUpdate = await this.findOne(id);
    if (updatePostData.title) {
      findPostToUpdate.title = updatePostData.title;
    }
    if (updatePostData.content) {
      findPostToUpdate.content = updatePostData.content;
    }
    if (updatePostData.authorName) {
      findPostToUpdate.authorName = updatePostData.authorName;
    }

    return this.postRepository.save(findPostToUpdate);
  }

  async delete(id: number): Promise<void> {
    const findPostToDelete = await this.findOne(id);
    await this.postRepository.delete(findPostToDelete);
  }
}
