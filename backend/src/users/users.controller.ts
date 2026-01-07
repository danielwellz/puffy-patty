import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { User, UserRole } from "./user.entity";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Patch(":id/role")
  updateRole(@Param("id") id: string, @Body("role") role: UserRole) {
    return this.usersService.updateUser(id, { role });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Post()
  create(@Body() body: { phone: string; name: string; role?: User["role"]; branchId?: string }) {
    return this.usersService.createUser(body);
  }
}
