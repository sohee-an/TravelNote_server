import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(email: string, password: string, nickname: string) {
    const user = new User({ email, password, nickname });
    return await this.userRepository.save(user);
  }

  async findOne(id: number) {
    const options: FindOneOptions<User> = { where: { id } };
    return await this.userRepository.findOne(options);
  }

  async findOneEmail(email: string) {
    const options: FindOneOptions<User> = { where: { email } };
    return await this.userRepository.findOne(options);
  }

  find(email: string) {
    return this.userRepository.findBy(email);
  }

  async update(id: number, attrs: Partial<User>) {
    const options: FindOneOptions<User> = { where: { id } };
    const userExists = await this.userRepository.findOne(options);

    if (!userExists) {
      throw new BadRequestException('회원가입을 해주세요.');
    }

    const patchUser = new User({ id: userExists.id, ...attrs });

    const updateUser = await this.userRepository.save(patchUser);

    return updateUser;
  }

  /**삭제 */
  async delete(id: number) {
    const removeUser = await this.userRepository.delete(id);

    return removeUser;
  }
}
