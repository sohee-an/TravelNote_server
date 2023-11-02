import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TripPathRepository } from './tripPath.repository';
import { TripPathService } from './tripPath.service';
import { TripPathController } from './tripPath.controller';
import { TypeOrmCustomModule } from 'src/lib/typeorm/typeorm-custom.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    TypeOrmCustomModule.forCustomRepository([TripPathRepository]),
  ], //저장소 생성함
  controllers: [TripPathController],
  providers: [TripPathService], // 서비스 추가함 //
  exports: [],
})
export class TripModule {}
