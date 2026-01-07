import { BadRequestException, Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../users/user.entity";
import { CurrentUser } from "../auth/current-user.decorator";
import { ChecklistType } from "./checklist-template.entity";
import { ChecklistsService } from "./checklists.service";

@Controller("checklists")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Manager, UserRole.HeadChef, UserRole.KitchenStaff)
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  private parseType(type: string): ChecklistType {
    const normalized = type.toLowerCase();
    if (normalized === ChecklistType.Open) return ChecklistType.Open;
    if (normalized === ChecklistType.Handover) return ChecklistType.Handover;
    if (normalized === ChecklistType.Close) return ChecklistType.Close;
    throw new BadRequestException("Invalid checklist type");
  }

  @Get(":type")
  getChecklist(@Param("type") typeParam: string, @Query("date") date: string, @CurrentUser() user: any) {
    const type = this.parseType(typeParam);
    return this.checklistsService.getRun(type, date, user?.branchId);
  }

  @Patch(":type")
  updateChecklist(
    @Param("type") typeParam: string,
    @Query("date") date: string,
    @Body() body: { items: { label: string; done: boolean }[] },
    @CurrentUser() user: any
  ) {
    const type = this.parseType(typeParam);
    return this.checklistsService.updateRun(type, date, body.items, user?.branchId);
  }
}
