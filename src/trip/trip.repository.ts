import { CustomRepository } from 'src/lib/typeorm/custom.repository';
import { CustomEntityRepository } from 'src/lib/typeorm/decorator';
import { Trip } from './trip.entity';
import {
  EntityManager,
  EntityTarget,
  QueryRunner,
  DeepPartial,
  FindManyOptions,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CustomEntityRepository(Trip)
export class TripRepository extends CustomRepository<Trip> {
  constructor(
    target: EntityTarget<Trip>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(target, manager, queryRunner);
  }

  async save(partial: DeepPartial<Trip>) {
    return this.repository.save(partial);
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  findBy(options?: FindManyOptions<Trip>) {
    return this.repository.find(options);
  }

  async update(id: number, attrs: Partial<Trip>) {
    const trip = await this.findOne(id);

    if (!trip) {
      throw new NotFoundException('여행을 찾을 수 없습니다.');
    }
    Object.assign(trip, attrs);
    return this.repository.save(trip);
  }

  /**삭제 */
  async delete(id: number) {
    const trip = await this.findOne(id);
    if (!trip) {
      throw new NotFoundException('여행을 찾을 수 없습니다.');
    }
    return this.repository.remove(trip);
  }
}
