import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanningController } from "./planning.controller";
import { PlanningService } from "./planning.service";
import { ShoppingItem } from "./shopping-item.entity";
import { PrepItem } from "./prep-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingItem, PrepItem])],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: [PlanningService]
})
export class PlanningModule {}
