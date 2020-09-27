import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, email, password } = signUpDto;
    const existingUser = await this.usersRepository.findOne({ email });

    if (existingUser) {
      throw new BadRequestException('Email já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.save({ name, email, hashedPassword });
  }

  async signIn(user: User) {
    const { id, email } = user;
    const payload = { id, email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      const valid = await bcrypt.compare(password, user.hashedPassword);

      if (valid) {
        return user;
      }
    }

    return null;
  }
}
