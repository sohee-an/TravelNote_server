import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Trip } from './trip.entity';
import { TripRepository } from './trip.repository';
import { TripPathRepository } from 'src/trip.path/trip.path.repository';
import { TripPath } from 'src/trip.path/trip.path.entity';

@Injectable()
export class TripService {
  constructor(
    private readonly tripRepository: TripRepository,
    private readonly tripPathRepository: TripPathRepository,
  ) {}

  async create(
    body: Pick<Trip, 'title' | 'description' | 'imageUrls'>,
    userId: number,
  ) {
    const { title, description, imageUrls } = body;
    const createTrip = new Trip({ title, description, imageUrls, userId });
    return await this.tripRepository.save(createTrip);
  }
  async findAll() {
    const findAllUsers = await this.tripRepository.findAll();
    if (!findAllUsers) {
      throw new NotFoundException('유저가 없습니다.');
    }
    return findAllUsers;
  }

  async findOneById(id: number) {
    const user = await this.tripRepository.findOne(id);
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');
    return user;
  }

  //   async findOneByEmail(email: string) {
  //     return await this.tripRepository.findOne({ where: { email } });
  //   }

  //   find(email: string) {
  //     return this.tripRepository.findBy(email);
  //   }

  async update(id: number, attrs: Partial<Trip>) {
    const userExists = await this.tripRepository.findOne(id);

    if (!userExists) {
      throw new BadRequestException('회원가입을 해주세요.');
    }

    const TripInfo = new Trip({ id: userExists.id, ...attrs });

    const updateUser = await this.tripRepository.save(TripInfo);

    return updateUser;
  }

  async delete(id: number) {
    const removeUser = await this.tripRepository.delete(id);

    return removeUser;
  }

  //  tripPath
  async tripPathCreate(
    body: Pick<TripPath, 'title' | 'description' | 'imageUrls'>,
  ) {
    const { title, description, imageUrls } = body;
    const createTrip = new TripPath({ title, description, imageUrls });
    return await this.tripRepository.save(createTrip);
  }

  async tripPathFindAll() {
    const findAllUsers = await this.tripRepository.findAll();
    if (!findAllUsers) {
      throw new NotFoundException('유저가 없습니다.');
    }
    return findAllUsers;
  }

  async tripPathFindOneById(id: number) {
    const user = await this.tripRepository.findOne(id);
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');
    return user;
  }

  async tripPathUpdate(id: number, attrs: Partial<TripPath>) {
    const userExists = await this.tripRepository.findOne(id);

    if (!userExists) {
      throw new BadRequestException('회원가입을 해주세요.');
    }
    const TripInfo = new TripPath({ id: userExists.id, ...attrs });

    const updateUser = await this.tripRepository.save(TripInfo);

    return updateUser;
  }

  async tripPathDelete(id: number) {
    const removeUser = await this.tripRepository.delete(id);

    return removeUser;
  }
}
