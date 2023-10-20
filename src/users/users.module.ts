import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //저장소 생성함
  controllers: [UsersController],
  providers: [UsersService, AuthService], // 서비스 추가함
})
export class UsersModule {}
