import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TripRepository } from './trip.repository';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmCustomModule } from 'src/lib/typeorm/typeorm-custom.module';
import { TripPathRepository } from 'src/trip.path/trip.path.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    TypeOrmCustomModule.forCustomRepository([
      TripRepository,
      TripPathRepository,
    ]),
  ], //저장소 생성함
  controllers: [TripController],
  providers: [TripService], // 서비스 추가함 //
  exports: [],
})
export class TripModule {}
