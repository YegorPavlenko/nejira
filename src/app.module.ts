import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { CommentsModule } from './comments/comments.module';
import { FeaturesModule } from './features/features.module';
import { MilestonesModule } from './milestones/milestones.module';
import { TasksModule } from './tasks/tasks.module';
import { EmployeesModule } from './employees/employees.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [ProjectsModule, AttachmentsModule, CommentsModule, FeaturesModule, MilestonesModule, TasksModule, EmployeesModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
