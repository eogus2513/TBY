import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
