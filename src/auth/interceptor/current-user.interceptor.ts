import { UsersService } from './../../users/users.service';
import { Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { NestMiddleware } from '@nestjs/common';
import { JwtValidator } from '../jwtValidator.validate';
import to from 'await-to-js';

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  constructor(
    private jwtValidator: JwtValidator,
    private usersService: UsersService,
  ) {}

  public async use(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization;

    if (token) {
      const [err, userId] = await to(this.jwtValidator.jwtVerify(token));
      if (userId) request['userId'] = userId;
    }

    return next();
  }
}

('await-to-js');
