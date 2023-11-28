import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Get,
  UnauthorizedException,
  Headers,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { JwtValidator } from './jwtValidator.validate';
import { AuthGuard } from './guard/auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { UpdateUserRequestDto } from './dtos/update.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtValidator: JwtValidator,
  ) {}

  @Post('/register')
  async register(
    @Body() { email, nickname, password }: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    console.log('email', email, nickname, password);
    const user = await this.authService.register({ email, password, nickname });
    return user;
  }

  @Get('/test')
  async test(@CurrentUser() userId: number) {
    throw new BadRequestException('회원가입을 해주세요.');
    return userId;
  }

  @Post('/login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    const { user, access_token } =
      await this.authService.authWithEmailAndPassword(body);
    const { nickname, email } = user;
    // dto로 반환
    return new LoginResponseDto({
      nickname,
      email,
      access_token,
    });
  }

  //  언제 새로운 토큰을 줘야되는가 ..
  @UseGuards(AuthGuard)
  @Patch('')
  async update(
    @CurrentUser() userId: number,
    @Body()
    body: UpdateUserRequestDto,
    @Headers('Token') token: string,
  ): Promise<RegisterResponseDto> {
    const { nickname, password } = body;

    try {
      const userId = await this.jwtValidator.jwtVerify(token);

      const user = await this.authService.update(userId, nickname, password);
      return user;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Delete('/:userId')
  async delete(@Param('userId') userId: number) {
    try {
      const user = await this.authService.delete(userId);
      if (user) {
        return { result: 'success', message: '정상적으로 삭제되엇습니다.' };
      }
    } catch (error) {
      console.error('Token verification failed:', error);
    }
  }
}
