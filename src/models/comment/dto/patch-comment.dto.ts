import { IsNotEmpty, IsString } from 'class-validator';

export class PatchCommentDto {
  @IsNotEmpty()
  @IsString()
  body: string;
}
