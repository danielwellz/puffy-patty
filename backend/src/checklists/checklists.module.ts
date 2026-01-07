import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChecklistRun } from "./checklist-run.entity";
import { ChecklistTemplate } from "./checklist-template.entity";
import { ChecklistsController } from "./checklists.controller";
import { ChecklistsService } from "./checklists.service";

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistRun, ChecklistTemplate])],
  controllers: [ChecklistsController],
  providers: [ChecklistsService],
  exports: [ChecklistsService]
})
export class ChecklistsModule {}
