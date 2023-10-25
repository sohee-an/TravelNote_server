import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  Patch,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { JwtValidator } from './jwtValidator.validate';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly jwtValidator: JwtValidator,
  ) {}

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
    const { user, access_token } = await this.authService.login(
      body.email,
      body.password,
    );
    const { nickname, email } = user;
    // dto로 반환
    return new LoginResponseDto({
      nickname,
      email,
      access_token,
    });
  }

  @Patch('')
  async update(
    @Body() body: RegisterRequestDto,
    @Headers('token') token: string,
  ) {
    const { nickname, password } = body;

    try {
      const userId = await this.jwtValidator.verify(token);

      const user = await this.authService.update(userId, nickname, password);
      return user;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
