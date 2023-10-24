import { AuthService } from './auth.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  // RegisterRequestDto, RegiserResponseDto
  @Post('/register')
  async register(
    @Body() body: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const { email, password, nickname } = body;

    const user = await this.authService.register(email, password, nickname);
    return user;
  }

  @Post('/login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = body;
    const user = await this.authService.login(email, password);

    return user;
  }
}
