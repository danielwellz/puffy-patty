import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UserRole } from "../users/user.entity";
import { PrepService } from "./prep.service";

@Controller("prep-list")
export class PrepController {
  constructor(private readonly prepService: PrepService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  list() {
    return this.prepService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Post()
  create(@Body() body: { name: string; grams: string; done?: boolean }) {
    return this.prepService.create({ ...body, done: body.done ?? false });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: Partial<{ name: string; grams: string; done: boolean }>) {
    return this.prepService.update(id, body);
  }
}
