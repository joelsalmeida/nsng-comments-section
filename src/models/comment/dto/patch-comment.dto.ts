import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;
}
