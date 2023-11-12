import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { TripPath } from 'src/trip.path/trip.path.entity';
import { TripPlace } from './trip.place.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  // 다시보기
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('json')
  imageUrls: string[];

  @Column({ comment: '공개 여부', default: false })
  published: boolean;

  @Column({ comment: '임시 저장 여부', default: false })
  draft: boolean;

  @Column()
  startedAt: Date;

  @Column()
  endedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => TripPath, (tripPath) => tripPath.trip)
  tripPaths: TripPath[];

  @OneToMany(() => TripPlace, (tripPlace) => tripPlace.trip)
  tripPlaces: TripPlace[];

  constructor(partials?: Partial<Trip>) {
    return Object.assign(this, partials);
  }
}
