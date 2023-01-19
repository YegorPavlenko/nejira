import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Project } from '../projects/entities/project.entity';
import { deepClone } from '../../utils/algos';

@Injectable()
export class TasksService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('REPEATABLE READ');
    try {
      const project = await queryRunner.manager.getRepository(Project).findOne({
        where: { id: createTaskDto.projectId },
      });
      if (!project?.code) throw new Error("The given project doesn't have code.");

      const taskToSave: CreateTaskDto = deepClone(createTaskDto) as CreateTaskDto;
      const curTaskCounter = ++project.tasksCount;
      taskToSave.code = `${project?.code}-${curTaskCounter}`;
      project.tasksCount = curTaskCounter;
      const task = await queryRunner.manager.getRepository(Task).save(taskToSave);
      await queryRunner.manager.getRepository(Project).save(project);
      await queryRunner.commitTransaction();

      return task;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number): Promise<{ id: number } & Task> {
    return this.tasksRepository.softRemove({ id: id });
  }
}
