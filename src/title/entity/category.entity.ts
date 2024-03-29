import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Title } from './title.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  category_name: string;

  @OneToMany(() => Title, (title) => title.category, {
    nullable: false,
  })
  @OneToMany(() => Subject, (subject) => subject.category, {
    nullable: false,
  })
  @JoinColumn()
  subject: Subject[];
}
