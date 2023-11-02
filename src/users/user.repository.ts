import { CustomRepository } from 'src/lib/typeorm/custom.repository';
import { CustomEntityRepository } from 'src/lib/typeorm/decorator';
import { User } from './user.entity';
import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  QueryRunner,
  FindOneOptions,
  RemoveOptions,
} from 'typeorm';

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

  async findOne(partial: FindOneOptions<User>) {
    return this.repository.findOne(partial);
  }

  find(email: string) {
    return this.repository.findBy({ email });
  }

  findBy(email: string) {
    return this.repository.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = Object.assign({ id: id }, attrs);

    return this.repository.update(id, user);
  }

  /**삭제 */
  async delete(options: number) {
    return this.repository.delete(options);
  }
}
