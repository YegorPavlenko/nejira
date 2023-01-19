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
import { Project } from '../../projects/entities/project.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, project => project.tasks)
  project: Project;

  @Column({ unique: true })
  code: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 'NEW' })
  status: string; // Enum?

  @Column({ default: 0 })
  estimate: number;

  @Column({ default: 0 })
  elapsed: number;

  @OneToMany(() => History, history => history.task)
  history: History[];

  @ManyToOne(() => Feature, feature => feature.tasks)
  feature: Feature;

  @ManyToMany(() => Attachment)
  @JoinTable()
  attachments: Attachment[];

  @ManyToMany(() => Comment)
  @JoinTable()
  comments: Comment[];

  @ManyToMany(() => Employee)
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
