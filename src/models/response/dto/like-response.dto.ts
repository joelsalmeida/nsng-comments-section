import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  response: string;
}
