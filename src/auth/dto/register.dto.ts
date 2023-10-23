import { IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly nickname: string;

  @IsString()
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
