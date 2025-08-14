import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Title is required!' })
  @IsString({ message: 'Title must be a string...' })
  @MinLength(3, { message: 'Title must be at least 3 char long...' })
  @MaxLength(50, { message: 'Title cannot be longer than 50 char' })
  title: string;

  @IsNotEmpty({ message: 'Content is required!' })
  @IsString({ message: 'Content must be string!' })
  @MinLength(3, { message: 'Content must be 3 char long!' })
  content: string;

  @IsNotEmpty({ message: 'Author! is required!' })
  @IsString({ message: 'Author! must be a string...' })
  @MinLength(3, { message: 'Author! must be at least 3 char long...' })
  @MaxLength(15, { message: 'Author! cannot be longer than 15 char...' })
  authorName: string;
}
