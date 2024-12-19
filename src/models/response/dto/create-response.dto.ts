import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  recipient: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;
}
