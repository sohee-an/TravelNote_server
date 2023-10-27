import { IsString, IsEmail } from 'class-validator';
import { IsNicknameForm } from 'src/validators/nickname.validator';
import { IsPasswordForm } from 'src/validators/password.validator';

export class RegisterRequestDto {
  @IsEmail({}, { message: '이메일 형식으로 입력해주세요' })
  readonly email: string;

  @IsNicknameForm()
  readonly nickname: string;

  @IsPasswordForm()
  readonly password: string;
}

export class RegisterResponseDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly password: string;
}
