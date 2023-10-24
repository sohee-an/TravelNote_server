import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthValidator {
  constructor(private readonly userService: UsersService) {}
  async EmailValidator(email: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('이미 사용 중인 이메일입니다.');
    }
    return users;
  }
}
