import { IsNotEmpty, IsString } from 'class-validator';

export class LikeResponseDto {
  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsString()
  response: string;
}
