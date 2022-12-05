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
import { Project } from '../../projects/entities/project.entity';
import { Feature } from '../../features/entities/feature.entity';

@Entity()
export class Milestone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ nullable: true })
  finishDate: Date;

  @OneToMany(type => Feature, feature => feature.milestone)
  features: Feature[];

  @ManyToOne(type => Project, project => project.milestones)
  project: Project;

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
