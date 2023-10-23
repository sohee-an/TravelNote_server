import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // RegisterRequestDto, RegiserResponseDto
  @Post('/register')
  async register(
    @Body() body: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const { email, password, nickname } = body;
    const user = await this.authService.register(email, password, nickname);
    return user;
  }
}
