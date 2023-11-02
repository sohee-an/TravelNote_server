import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordEncryptor } from './password.encryptor';
import { UsersModule } from 'src/users/users.module';
import { AuthValidator } from './authValidator.validateRegister';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.const';
import { JwtValidator } from './jwtValidator.validate';
import { AuthTokenMiddleware } from 'src/middleware/AuthTokenMiddleware';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthTokenMiddleware,
    AuthService,
    PasswordEncryptor,
    AuthValidator,
    JwtValidator,
  ],
  exports: [JwtValidator],
})
export class AuthModule {}
