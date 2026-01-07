import { Body, Controller, Patch, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../users/user.entity";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { OrdersService } from "./orders.service";

@Controller("admin/orders")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Manager, UserRole.HeadChef)
export class OrdersAdminController {
  constructor(private readonly ordersService: OrdersService) {}

  @Patch(":id/status")
  updateStatus(@Param("id") id: string, @Body() body: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, body.status);
  }
}
