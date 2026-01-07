import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { PeriodicTask } from "./periodic-task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PeriodicTask])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
