import { Module } from "@nestjs/common";
import { ShoppingController } from "./shopping.controller";
import { ShoppingService } from "./shopping.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { ShiftsModule } from "../shifts/shifts.module";

@Module({
  imports: [TypeOrmModule.forFeature([]), UsersModule, ShiftsModule],
  controllers: [ShoppingController],
  providers: [ShoppingService]
})
export class ShoppingModule {}
