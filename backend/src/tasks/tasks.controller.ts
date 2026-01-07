import { Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../users/user.entity";
import { CurrentUser } from "../auth/current-user.decorator";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@CurrentUser() user: any, @Query("branchId") branchId?: string) {
    return this.tasksService.findAll(branchId || user?.branchId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager, UserRole.HeadChef)
  @Patch(":id/done")
  markDone(@Param("id") id: string, @CurrentUser() user: any) {
    const date = new Date().toISOString().slice(0, 10);
    return this.tasksService.markDone(id, date);
  }
}
