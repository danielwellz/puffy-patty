import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt.payload";
import { AttendanceService } from "./attendance.service";

@Controller("attendance")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(JwtAuthGuard)
  @Get("status")
  status(@CurrentUser() user: JwtPayload) {
    return this.attendanceService.currentOpenRecord(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post("clock-in")
  clockIn(@CurrentUser() user: JwtPayload) {
    return this.attendanceService.clockIn(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post("clock-out")
  clockOut(@CurrentUser() user: JwtPayload) {
    return this.attendanceService.clockOut(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  history(@CurrentUser() user: JwtPayload) {
    return this.attendanceService.forUser(user.sub);
  }
}
