import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class VideoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  videoUrl: string;

  @Column()
  title: string;

  @Column()
  thumbnailUrl: string;
  @Column()
  duration: string;

  @ManyToOne(() => User, (user) => user.videos)
  user: User;
  @Column({ type: 'timestamp' })
  date_time_with_timezone: Date;
}
