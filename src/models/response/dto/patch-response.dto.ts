import { IsNotEmpty, IsString } from 'class-validator';

export class PatchResponseDto {
  @IsNotEmpty()
  @IsString()
  body: string;
}
