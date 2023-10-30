import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.const';

@Injectable()
export class JwtValidator {
  constructor(private readonly jwtService: JwtService) {}
  async jwtVerify(token: string) {
    const tokenArray = token.split(' ');

    const decoded = this.jwtService.verify(tokenArray[1], {
      ignoreExpiration: false,
      secret: jwtConstants.secret,
    });

    const userId = decoded.userId;

    return userId;
  }
}
