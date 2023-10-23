import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { PasswordEncryptor } from './password.encryptor';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordEncryptor: PasswordEncryptor,
  ) {}

  async register(email: string, password: string, nickname: string) {
    const users = await this.userService.find(email);
    //memo:  추추에 따로 함수로 빼놓기 authValidator.validateRegister
    if (users.length) {
      throw new BadRequestException('이미 사용 중인 이메일입니다.');
    }

    const hashPassword = await this.passwordEncryptor.encrypt(password);

    const user = await this.userService.create(email, hashPassword, nickname);
    return user;
  }
}
