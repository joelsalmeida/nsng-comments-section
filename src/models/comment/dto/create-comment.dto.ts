import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  byUserId: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
