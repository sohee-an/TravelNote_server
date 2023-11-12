import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trip } from 'src/trip/trip.entity';

@Entity()
export class TripPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trip)
  @JoinColumn()
  trip: Trip;

  @Column()
  tripId: number;

  @Column()
  name: string;

  constructor(partials?: Partial<TripPlace>) {
    return Object.assign(this, partials);
  }
}
