import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostInterface } from './interfaces/post.interface';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  findAll(@Query('search') search?: string): PostInterface[] {
    const extractAllPosts = this.postService.findAll();

    if (search) {
      return extractAllPosts.filter((singlePost) =>
        singlePost.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return extractAllPosts;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostData: CreatePostDto) {
    return this.postService.create(createPostData);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostData: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
