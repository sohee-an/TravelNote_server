import { CustomRepository } from 'src/lib/typeorm/custom.repository';
import { CustomEntityRepository } from 'src/lib/typeorm/decorator';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CustomEntityRepository(User)
export class UserRepository extends CustomRepository<User> {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super(userRepo.target, userRepo.manager, userRepo.queryRunner);
  }

  create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });
    const dbuser = this.userRepo.findBy({ email });
    if (dbuser) {
      throw new NotFoundException('이미 사용중인 이메일입니다.');
    }

    return this.userRepo.save(user);
  }

  async findOne(id: any) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  find(email: string) {
    return this.userRepo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  /**삭제 */
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return this.userRepo.remove(user);
  }
}
