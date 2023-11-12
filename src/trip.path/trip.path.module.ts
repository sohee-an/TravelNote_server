import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TripPathRepository } from './trip.path.repository';
import { TripPathService } from './trip.path.service';
import { TripPathController } from './trip.path.controller';
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
