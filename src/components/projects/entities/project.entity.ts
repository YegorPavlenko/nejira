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
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employees/entities/employee.entity';
import { Milestone } from '../../milestones/entities/milestone.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Nejira', description: "The project's name" })
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string; // short project name to use in tasks as a part of task name, recommended 3-5 symbols

  @Column({ default: 0 })
  tasksCount: number;

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  budget: number;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @ManyToMany(() => Employee)
  @JoinTable()
  staff: Employee[];

  @OneToMany(() => Milestone, milestone => milestone.project)
  milestones: Milestone[];

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;

  @VersionColumn()
  version: number;
}
