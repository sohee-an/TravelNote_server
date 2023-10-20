import { AuthService } from './auth.service';
import { Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post()
  create(createUser: CreateUserDto) {
    return createUser;
  }
}
