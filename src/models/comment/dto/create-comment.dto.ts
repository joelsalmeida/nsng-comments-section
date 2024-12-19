import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;
}
