import { Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../users/user.entity";
import { UpdateReservationStatusDto } from "./dto/update-reservation-status.dto";
import { ReservationsService } from "./reservations.service";

@Controller("admin/reservations")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Manager, UserRole.HeadChef)
export class ReservationsAdminController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  list(@Query("branchId") branchId?: string) {
    return this.reservationsService.listReservations(branchId || null);
  }

  @Patch(":id")
  updateStatus(@Param("id") id: string, @Body() body: UpdateReservationStatusDto) {
    return this.reservationsService.updateStatus(id, body.status);
  }
}
