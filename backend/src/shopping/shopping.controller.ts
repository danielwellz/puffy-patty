import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UserRole } from "../users/user.entity";
import { ShoppingService } from "./shopping.service";

@Controller("shopping-list")
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  list() {
    return this.shoppingService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Post()
  create(@Body() body: { name: string; quantity: string; done?: boolean }) {
    return this.shoppingService.create({ ...body, done: body.done ?? false });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: Partial<{ name: string; quantity: string; done: boolean }>) {
    return this.shoppingService.update(id, body);
  }
}
