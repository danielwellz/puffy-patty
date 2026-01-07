import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/jwt.payload";
import { UserRole } from "../users/user.entity";
import { ShiftType } from "./shift.entity";
import { ShiftsService } from "./shifts.service";

@Controller("shifts")
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(
    @CurrentUser() user: JwtPayload,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ) {
    if (user.role === UserRole.Manager) {
      return this.shiftsService.findAll(startDate, endDate, user.branchId);
    }
    return this.shiftsService.findForUser(user.sub, user.branchId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Post()
  create(
    @Body()
    body:
      | {
          date: string;
          shiftType: ShiftType;
          startTime: string;
          endTime: string;
          userId: string;
          branchId?: string;
        }
      | {
          shifts: {
            date: string;
            shiftType: ShiftType;
            startTime: string;
            endTime: string;
            userId: string;
            branchId?: string;
          }[];
        }
  ) {
    const shifts = "shifts" in body ? body.shifts : [body];
    return this.shiftsService.createMany(shifts);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Put(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.shiftsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.shiftsService.remove(id);
  }
}
