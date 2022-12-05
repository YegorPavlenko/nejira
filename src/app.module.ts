import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';

import { ProjectsModule } from './projects/projects.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { CommentsModule } from './comments/comments.module';
import { FeaturesModule } from './features/features.module';
import { MilestonesModule } from './milestones/milestones.module';
import { TasksModule } from './tasks/tasks.module';
import { EmployeesModule } from './employees/employees.module';
import { HistoryModule } from './history/history.module';
import { FilesModule } from './files/files.module';

import { Attachment } from './attachments/entities/attachment.entity';
import { Comment } from './comments/entities/comment.entity';
import { Employee } from './employees/entities/employee.entity';
import { Feature } from './features/entities/feature.entity';
import { File } from './files/entities/file.entity';
import { History } from './history/entities/history.entity';
import { Milestone } from './milestones/entities/milestone.entity';
import { Project } from './projects/entities/project.entity';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678nejiraAPI',
      database: 'nejira_api',
      entities: [
        Attachment,
        Comment,
        Employee,
        Feature,
        File,
        History,
        Milestone,
        Project,
        Task,
      ],
      synchronize: true,
    }),
    AttachmentsModule,
    CommentsModule,
    ConfigModule,
    EmployeesModule,
    FeaturesModule,
    HistoryModule,
    MilestonesModule,
    ProjectsModule,
    TasksModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
