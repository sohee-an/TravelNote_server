import { CustomRepository } from 'src/lib/typeorm/custom.repository';
import { CustomEntityRepository } from 'src/lib/typeorm/decorator';
import { TripPath } from './trip.path.entity';
import {
  EntityManager,
  EntityTarget,
  QueryRunner,
  DeepPartial,
  FindManyOptions,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CustomEntityRepository(TripPath)
export class TripPathRepository extends CustomRepository<TripPath> {
  constructor(
    target: EntityTarget<TripPath>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(target, manager, queryRunner);
  }

  async save(partial: DeepPartial<TripPath>) {
    return this.repository.save(partial);
  }
  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  findBy(options?: FindManyOptions<TripPath>) {
    return this.repository.find(options);
  }

  async update(id: number, attrs: Partial<TripPath>) {
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
