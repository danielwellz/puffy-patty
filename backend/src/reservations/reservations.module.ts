import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BranchModule } from "../branches/branch.module";
import { Reservation } from "./reservation.entity";
import { ReservationsService } from "./reservations.service";
import { ReservationsPublicController } from "./reservations.public.controller";
import { ReservationsAdminController } from "./reservations.admin.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), BranchModule],
  providers: [ReservationsService],
  controllers: [ReservationsPublicController, ReservationsAdminController],
  exports: [ReservationsService]
})
export class ReservationsModule {}
