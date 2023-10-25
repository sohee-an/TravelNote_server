import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordEncryptor } from './password.encryptor';
import { UsersModule } from 'src/users/users.module';
import { AuthValidator } from './authValidator.validateRegister';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtValidator } from './jwtValidator.validate';

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
  providers: [AuthService, PasswordEncryptor, AuthValidator, JwtValidator],
})
export class AuthModule {}
