import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordEncryptor } from './password.encryptor';
import { UsersModule } from 'src/users/users.module';
import { AuthValidator } from './authValidator.validateRegister';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, PasswordEncryptor, AuthValidator],
})
export class AuthModule {}
