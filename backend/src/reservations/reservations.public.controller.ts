import { Body, Controller, Post } from "@nestjs/common";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { ReservationsService } from "./reservations.service";

@Controller("public/reservations")
export class ReservationsPublicController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  createReservation(@Body() body: CreateReservationDto) {
    return this.reservationsService.createReservation(body);
  }
}
