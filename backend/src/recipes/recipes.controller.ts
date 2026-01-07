import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../users/user.entity";
import { RecipesService } from "./recipes.service";

@Controller("recipes")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Manager, UserRole.HeadChef, UserRole.KitchenStaff)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  list(@Query("category") category?: string) {
    return this.recipesService.findAll(category);
  }
}
