import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../orders/order.entity";
import { OrdersModule } from "../orders/orders.module";
import { Payment } from "./payment.entity";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order]), OrdersModule],
  providers: [PaymentsService],
  controllers: [PaymentsController],
  exports: [PaymentsService]
})
export class PaymentsModule {}
