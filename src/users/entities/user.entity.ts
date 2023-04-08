import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  name: string;
  @Column({ length: 30 })
  username: string;
  @Column({ length: 64 })
  password: string;
}
