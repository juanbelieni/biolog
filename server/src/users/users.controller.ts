import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReqUser } from 'src/decorators/req-user.decorator';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@ReqUser() user: User) {
    return this.usersService.getProfile(user.id);
  }
}
