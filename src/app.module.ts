import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';

import { ProjectsModule } from './components/projects/projects.module';
import { AttachmentsModule } from './components/attachments/attachments.module';
import { CommentsModule } from './components/comments/comments.module';
import { FeaturesModule } from './components/features/features.module';
import { MilestonesModule } from './components/milestones/milestones.module';
import { TasksModule } from './components/tasks/tasks.module';
import { EmployeesModule } from './components/employees/employees.module';
import { HistoryModule } from './components/history/history.module';
import { FilesModule } from './components/files/files.module';

import { Attachment } from './components/attachments/entities/attachment.entity';
import { Comment } from './components/comments/entities/comment.entity';
import { Employee } from './components/employees/entities/employee.entity';
import { Feature } from './components/features/entities/feature.entity';
import { File } from './components/files/entities/file.entity';
import { History } from './components/history/entities/history.entity';
import { Milestone } from './components/milestones/entities/milestone.entity';
import { Project } from './components/projects/entities/project.entity';
import { Task } from './components/tasks/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678nejiraAPI',
      database: 'nejira_api',
      // eslint-disable-next-line prettier/prettier
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
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
