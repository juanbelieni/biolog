import { IsString, MinLength, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4, { message: 'O nome deve possuir pelo menos 4 caracteres.' })
  name: string;

  @IsString()
  @MinLength(4, { message: 'O email deve possuir pelo menos 4 caracteres.' })
  @IsEmail({}, { message: 'Insira um email válido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve possuir pelo menos 4 caracteres.' })
  password: string;
}
