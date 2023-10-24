import { IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class LoginResponseDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly access_token: string;
}
