import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Attachment } from '../../attachments/entities/attachment.entity';
import { Milestone } from '../../milestones/entities/milestone.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(type => Task, task => task.feature)
  tasks: Task[];

  @ManyToOne(type => Milestone, milestone => milestone.features)
  milestone: Milestone;

  @ManyToMany(type => Attachment)
  @JoinTable()
  attachments: Attachment[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;

  @VersionColumn()
  version: number;
}
