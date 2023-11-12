import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trip } from 'src/trip/trip.entity';

@Entity()
export class TripPath {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trip)
  @JoinColumn()
  trip: Trip;

  @Column()
  tripId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('json')
  imageUrls: string[];

  @CreateDateColumn()
  createdAt: Date;

  constructor(partials?: Partial<TripPath>) {
    return Object.assign(this, partials);
  }
}
