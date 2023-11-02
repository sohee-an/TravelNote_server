import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordEncryptor } from './password.encryptor';

import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordEncryptor: PasswordEncryptor,

    private jwtService: JwtService,
  ) {}
  public async register(
    userInfo: Pick<User, 'email' | 'nickname' | 'password'>,
  ) {
    const { email, password, nickname } = userInfo;
    const users = await this.userService.find(email);
    //memo:  추추에 따로 함수로 빼놓기 authValidator.validateRegister
    if (users.length) {
      throw new BadRequestException('이미 사용 중인 이메일입니다.');
    }

    const hashPassword = await this.passwordEncryptor.encrypt(password);

    const user = await this.userService.create(email, hashPassword, nickname);
    return user;
  }

  public async loginUser(user: Pick<User, 'email' | 'id'>) {
    return {
      accessToekn: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  public async authWithEmailAndPassword(
    userInfo: Pick<User, 'email' | 'password'>,
  ) {
    const { email, password } = userInfo;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('회원가입을 해주세요.');
    }
    const [salt, storeHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storeHash !== hash.toString('hex')) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀립니다.');
    }
    const access_token = await this.jwtService.signAsync({
      userId: user.id,
    });

    const payload = {
      user,
      access_token,
    };

    return payload;
  }

  public async update(userId: number, nickname: string, password: string) {
    const userExists = await this.userService.findOneById(userId);

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

  public async delete(userId: number) {
    const userExists = await this.userService.findOneById(userId);

    if (!userExists) {
      throw new BadRequestException('회원가입을 해주세요.');
    }

    const deleteUser = await this.userService.delete(userId);

    return deleteUser;
  }

  /* ********************************************************************************* */
  /* ************************************ PRIVATE ************************************ */
  /* ********************************************************************************* */

  // 토큰 생성
  private async signToken(user: Pick<User, 'id'>, isRefreshToken: boolean) {
    const { id } = user;
    const payload = {
      id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: isRefreshToken ? 3600 : 300,
    });
    return access_token;
  }
}
