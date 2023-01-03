import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Attachment } from '../../attachments/entities/attachment.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { History } from '../../history/entities/history.entity';
import { Feature } from '../../features/entities/feature.entity';
import { Milestone } from '../../milestones/entities/milestone.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column()
  status: string; // Enum?

  @Column({ default: 0 })
  estimate: number;

  @Column({ default: 0 })
  elapsed: number;

  @OneToMany(type => History, history => history.task)
  history: History[];

  @ManyToOne(type => Feature, feature => feature.tasks)
  feature: Feature;

  @ManyToMany(type => Attachment)
  @JoinTable()
  attachments: Attachment[];

  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];

  @ManyToMany(type => Employee)
  @JoinTable()
  staff: Employee[];

  // TODO add previous tasks dependencies links

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;

  @VersionColumn()
  version: number;
}
