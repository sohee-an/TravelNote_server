import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordEncryptor } from './password.encryptor';
import { AuthValidator } from './authValidator.validateRegister';

import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { FindOneOptions } from 'typeorm';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordEncryptor: PasswordEncryptor,
    private readonly authValidator: AuthValidator,
    private jwtService: JwtService,
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

  async login(email: string, password: string) {
    const user = await this.userService.findOneEmail(email);

    if (!user) {
      throw new BadRequestException('회원가입을 해주세요.');
    }
    const [salt, storeHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storeHash !== hash.toString('hex')) {
      throw new BadRequestException('아이디 또는 비밀번호가 틀립니다.');
    }

    const access_token = await this.jwtService.signAsync({
      userId: user.id,
    });

    const loginUser = { user, access_token };

    return loginUser;
  }

  async update(userId: number, nickname: string, password: string) {
    const userExists = await this.userService.findOne(userId);

    if (!userExists) {
      throw new BadRequestException('회원가입을 해주세요.');
    }

    const hashPassword = await this.passwordEncryptor.encrypt(password);

    const patchUser = await this.userService.update(userId, {
      password: hashPassword,
      nickname,
    });

    return patchUser;
  }
}
