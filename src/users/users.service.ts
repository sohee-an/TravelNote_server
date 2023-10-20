import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    const dbuser = this.repo.findBy({ email });
    if (dbuser) {
      throw new Error('이미 사용중인 이메일입니다.');
    }

    return this.repo.save(user);
  }

  async findOne(id: any) {
    return await this.repo.findOne({ where: { id: id } });
  }

  find(email: string) {
    return this.repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  /**삭제 */
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return this.repo.remove(user);
  }
}
