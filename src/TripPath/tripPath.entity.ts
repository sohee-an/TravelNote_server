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
  @JoinColumn({ name: 'id' })
  tripId: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('json')
  imageUrls: string[];

  @CreateDateColumn()
  createdAt: Date;

  constructor(partials?: Partial<Trip>) {
    return Object.assign(this, partials);
  }
}
