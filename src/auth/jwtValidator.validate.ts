import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtValidator {
  constructor(private readonly jwtService: JwtService) {}
  async verify(token: string) {
    const tokenArray = token.split(' ');
    const decoded = this.jwtService.verify(tokenArray[1]);
    const userId = decoded.userId;

    return userId;
  }
}
