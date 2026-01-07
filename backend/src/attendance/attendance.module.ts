import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttendanceController } from "./attendance.controller";
import { AttendanceService } from "./attendance.service";
import { Attendance } from "./attendance.entity";
import { UsersModule } from "../users/users.module";
import { ShiftsModule } from "../shifts/shifts.module";

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]), UsersModule, ShiftsModule],
  controllers: [AttendanceController],
  providers: [AttendanceService]
})
export class AttendanceModule {}
