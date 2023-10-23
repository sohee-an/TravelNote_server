import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

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
