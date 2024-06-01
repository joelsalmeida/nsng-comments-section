import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResponseDto {
  @IsNotEmpty()
  @IsString()
  toCommentId: string;

  @IsNotEmpty()
  @IsString()
  by_user: string;

  @IsNotEmpty()
  @IsString()
  to_user: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
