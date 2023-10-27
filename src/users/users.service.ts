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

  async findOneById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  find(email: string) {
    return this.userRepository.findBy(email);
  }

  async update(id: number, attrs: Partial<User>) {
    const userExists = await this.userRepository.findOne({ where: { id } });

    if (!userExists) {
      throw new BadRequestException('회원가입을 해주세요.');
    }

    const patchUser = new User({ id: userExists.id, ...attrs });

    const updateUser = await this.userRepository.save(patchUser);

    return updateUser;
  }

  async delete(id: number) {
    const removeUser = await this.userRepository.delete(id);

    return removeUser;
  }
}
