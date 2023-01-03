import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Milestone } from '../../milestones/entities/milestone.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tag: string; // short project name to use in tasks as a part of task name, recommended 3-5 symbols

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  budget: number;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @ManyToMany(type => Employee)
  @JoinTable()
  staff: Employee[];

  @OneToMany(type => Milestone, milestone => milestone.project)
  milestones: Milestone[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;

  @VersionColumn()
  version: number;
}
