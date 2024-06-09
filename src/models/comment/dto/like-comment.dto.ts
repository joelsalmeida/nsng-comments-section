import { IsNotEmpty, IsString } from 'class-validator';

export class LikeCommentDto {
  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
