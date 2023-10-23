import { CustomRepository } from 'src/lib/typeorm/custom.repository';
import { CustomEntityRepository } from 'src/lib/typeorm/decorator';
import { User } from './user.entity';
import { DeepPartial, EntityManager, EntityTarget, QueryRunner } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CustomEntityRepository(User)
export class UserRepository extends CustomRepository<User> {
  constructor(
    target: EntityTarget<User>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(target, manager, queryRunner);
  }

  async save(partial: DeepPartial<User>) {
    return this.repository.save(partial);
  }

  async findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  find(email: string) {
    return this.repository.findBy({ email });
  }

  findBy(email: string) {
    return this.repository.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    Object.assign(user, attrs);
    return this.repository.save(user);
  }

  /**삭제 */
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return this.repository.remove(user);
  }
}
