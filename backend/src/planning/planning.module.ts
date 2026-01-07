import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShoppingItem } from "./shopping-item.entity";
import { PrepItem } from "./prep-item.entity";
import { PlanningPrepTemplate } from "./prep-template.entity";
import { PlanningShoppingTemplate } from "./shopping-template.entity";
import { PlanningController } from "./planning.controller";
import { PlanningService } from "./planning.service";

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingItem, PrepItem, PlanningPrepTemplate, PlanningShoppingTemplate])],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: [PlanningService]
})
export class PlanningModule {}
