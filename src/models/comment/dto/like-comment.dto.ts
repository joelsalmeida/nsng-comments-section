import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;
}
