import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShiftsService } from "./shifts.service";
import { ShiftsController } from "./shifts.controller";
import { Shift } from "./shift.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Shift]), UsersModule],
  controllers: [ShiftsController],
  providers: [ShiftsService],
  exports: [ShiftsService]
})
export class ShiftsModule {}
