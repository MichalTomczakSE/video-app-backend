import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/auth/entities/role.entity';
import { VideoEntity } from 'src/video/entities/video.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 30 })
  name: string;
  @Column({ length: 30 })
  username: string;
  @Column({ length: 64 })
  password: string;
  @Column()
  currentTokenId: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_to_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'userId',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
  @OneToMany(() => VideoEntity, (photo) => photo.user)
  videos: VideoEntity[];
}
