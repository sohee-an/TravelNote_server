import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(email: string, password: string, nickname: string) {
    const user = new User({ email, password, nickname });
    return await this.userRepository.save(user);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  find(email: string) {
    return this.userRepository.findBy(email);
  }

  async update(id: number, attrs: Partial<User>) {
    const updateUser = await this.userRepository.update(id, attrs);

    return updateUser;
  }

  /**삭제 */
  async delete(id: number) {
    const removeUser = await this.userRepository.remove(id);

    return removeUser;
  }
}
