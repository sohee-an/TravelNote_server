import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmCustomModule } from 'src/lib/typeorm/typeorm-custom.module';
import { UserRepository } from './user.repository';

//  memo: 한 모듈에 컨트롤러, 서비스가 하나만 있는게좋다.
@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    TypeOrmCustomModule.forCustomRepository([UserRepository]),
  ], //저장소 생성함
  controllers: [UsersController],
  providers: [UsersService], // 서비스 추가함 //
  exports: [UsersService],
})
export class UsersModule {}
