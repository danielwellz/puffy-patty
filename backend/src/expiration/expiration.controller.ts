import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../users/user.entity";
import { ExpirationService } from "./expiration.service";

@Controller("expiration")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Manager, UserRole.HeadChef, UserRole.KitchenStaff)
export class ExpirationController {
  constructor(private readonly expirationService: ExpirationService) {}

  @Get()
  list() {
    return this.expirationService.list();
  }
}
