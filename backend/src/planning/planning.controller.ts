import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../users/user.entity";
import { PlanningService } from "./planning.service";
import { CurrentUser } from "../auth/current-user.decorator";

@Controller("planning")
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @UseGuards(JwtAuthGuard)
  @Get("shopping-list")
  shoppingList(@Query("date") date?: string, @CurrentUser() user?: any) {
    return this.planningService.getShopping(date, user?.branchId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Post("shopping-list")
  addShopping(@Body() body: any, @CurrentUser() user: any) {
    const items = body.items || body;
    if (body.template === true) {
      return this.planningService.generateShoppingTemplate(body.date, user?.branchId);
    }
    return this.planningService.addShopping(items, user?.branchId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Patch("shopping-list/:id")
  updateShopping(@Param("id") id: string, @Body() body: any) {
    return this.planningService.updateShopping(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Delete("shopping-list/:id")
  removeShopping(@Param("id") id: string) {
    return this.planningService.removeShopping(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("shopping-template")
  shoppingTemplate() {
    return this.planningService.getShoppingTemplate();
  }

  @UseGuards(JwtAuthGuard)
  @Get("prep-list")
  prepList(@Query("date") date?: string, @CurrentUser() user?: any) {
    return this.planningService.getPrep(date, user?.branchId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager, UserRole.HeadChef)
  @Post("prep-list")
  addPrep(@Body() body: any, @CurrentUser() user: any) {
    const items = body.items || body;
    if (body.template === true) {
      return this.planningService.generatePrepTemplate(body.date, user?.branchId);
    }
    return this.planningService.addPrep(items, user?.branchId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager, UserRole.HeadChef, UserRole.KitchenStaff)
  @Patch("prep-list/:id")
  updatePrep(@Param("id") id: string, @Body() body: any) {
    return this.planningService.updatePrep(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager, UserRole.HeadChef)
  @Delete("prep-list/:id")
  removePrep(@Param("id") id: string) {
    return this.planningService.removePrep(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("prep-template")
  prepTemplate() {
    return this.planningService.getPrepTemplate();
  }
}
