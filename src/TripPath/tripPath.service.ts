import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TripPath } from './tripPath.entity';
import { TripPathRepository } from './tripPath.repository';

@Injectable()
export class TripPathService {
  constructor(private readonly tripRepository: TripPathRepository) {}

  async create(
    body: Pick<TripPath, 'title' | 'description' | 'imageUrls'>,
    userId: number,
  ) {
    const { title, description, imageUrls } = body;
    const createTrip = new TripPath({ title, description, imageUrls, userId });
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

  async update(id: number, attrs: Partial<TripPath>) {
    const userExists = await this.tripRepository.findOne(id);

    if (!userExists) {
      throw new BadRequestException('회원가입을 해주세요.');
    }

    const TripInfo = new TripPath({ id: userExists.id, ...attrs });

    const updateUser = await this.tripRepository.save(TripInfo);

    return updateUser;
  }

  async delete(id: number) {
    const removeUser = await this.tripRepository.delete(id);

    return removeUser;
  }
}
