import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;
}
