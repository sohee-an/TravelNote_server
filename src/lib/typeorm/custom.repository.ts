import { EntityManager, EntityTarget, QueryRunner, Repository } from 'typeorm';

export class CustomRepository<T> {
  protected readonly repository: Repository<T>;
  protected readonly manager: EntityManager;

  constructor(
    target: EntityTarget<T>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    this.repository = new Repository(target, manager, queryRunner);
    this.manager = manager;
  }
}
