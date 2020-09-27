import { IsString, MinLength } from 'class-validator';

export class UploadImageDto {
  @IsString()
  @MinLength(4, { message: 'O nome deve possuir pelo menos 4 caracteres.' })
  name: string;
}
