import { Injectable, BadRequestException } from '@nestjs/common';
import { Trip } from './trip.entity';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async create(
    body: Pick<Trip, 'title' | 'description' | 'imageUrls'>,
    userId: number,
  ) {
    const { title, description, imageUrls } = body;
    const createTrip = new Trip({ title, description, imageUrls, userId });
    return await this.tripRepository.save(createTrip);
  }

  async findOneById(id: number) {
    return await this.tripRepository.findOne(id);
  }

  //   async findOneByEmail(email: string) {
  //     return await this.tripRepository.findOne({ where: { email } });
  //   }

  //   find(email: string) {
  //     return this.tripRepository.findBy(email);
  //   }

  //   async update(id: number, attrs: Partial<User>) {
  //     const userExists = await this.tripRepository.findOne({ where: { id } });

  //     if (!userExists) {
  //       throw new BadRequestException('회원가입을 해주세요.');
  //     }

  //     const patchUser = new User({ id: userExists.id, ...attrs });

  //     const updateUser = await this.tripRepository.save(patchUser);

  //     return updateUser;
  //   }

  async delete(id: number) {
    const removeUser = await this.tripRepository.delete(id);

    return removeUser;
  }
}
