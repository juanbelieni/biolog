import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ReqUser } from 'src/decorators/req-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@ReqUser() user: User) {
    return this.authService.signIn(user);
  }
}
