import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('insertlog', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('update', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('delete', this.id);
  }
}
