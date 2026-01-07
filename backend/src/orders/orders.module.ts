import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BranchModule } from "../branches/branch.module";
import { MenuModule } from "../menu/menu.module";
import { Order } from "./order.entity";
import { OrderItem } from "./order-item.entity";
import { OrdersService } from "./orders.service";
import { OrdersPublicController } from "./orders.public.controller";
import { OrdersAdminController } from "./orders.admin.controller";
import { OrdersGateway } from "./orders.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), BranchModule, MenuModule],
  providers: [OrdersService, OrdersGateway],
  controllers: [OrdersPublicController, OrdersAdminController],
  exports: [OrdersService, OrdersGateway]
})
export class OrdersModule {}
