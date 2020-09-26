import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReqUser } from 'src/decorators/req-user.decorator';
import { UserPayload } from 'src/auth/interfaces/user-payload.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@ReqUser() user: UserPayload) {
    return this.usersService.getProfile(user.id);
  }
}
