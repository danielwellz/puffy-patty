import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, In, Repository } from "typeorm";
import { BranchService } from "../branches/branch.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { Reservation, ReservationStatus } from "./reservation.entity";

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
    private readonly branchService: BranchService,
    private readonly configService: ConfigService
  ) {}

  async createReservation(input: CreateReservationDto) {
    const branch = await this.branchService.findById(input.branchId);
    if (!branch) throw new NotFoundException("Branch not found");
    if (!branch.reservationsEnabled) throw new BadRequestException("Reservations are disabled for this branch");

    const startAt = new Date(input.startAt);
    if (Number.isNaN(startAt.getTime())) {
      throw new BadRequestException("Invalid reservation time");
    }
    if (startAt.getTime() < Date.now()) {
      throw new BadRequestException("Reservation time must be in the future");
    }

    await this.ensureAvailability(branch.id, startAt);

    const reservation = this.reservationRepo.create({
      branchId: branch.id,
      startAt,
      partySize: input.partySize,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      status: ReservationStatus.Pending
    });

    return this.reservationRepo.save(reservation);
  }

  async listReservations(branchId?: string | null) {
    return this.reservationRepo.find({
      where: branchId ? { branchId } : {},
      order: { startAt: "ASC", createdAt: "DESC" }
    });
  }

  async updateStatus(id: string, status: ReservationStatus) {
    const reservation = await this.reservationRepo.findOne({ where: { id } });
    if (!reservation) throw new NotFoundException("Reservation not found");
    reservation.status = status;
    return this.reservationRepo.save(reservation);
  }

  private async ensureAvailability(branchId: string, startAt: Date) {
    const maxPerSlot = parseInt(this.configService.get<string>("reservations.maxPerSlot") || "5", 10);
    const slotMinutes = parseInt(this.configService.get<string>("reservations.slotMinutes") || "60", 10);
    const slotStart = new Date(startAt);
    slotStart.setMinutes(Math.floor(slotStart.getMinutes() / slotMinutes) * slotMinutes, 0, 0);
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + slotMinutes);

    const count = await this.reservationRepo.count({
      where: {
        branchId,
        startAt: Between(slotStart, slotEnd),
        status: In([ReservationStatus.Pending, ReservationStatus.Confirmed])
      }
    });
    if (count >= maxPerSlot) {
      throw new BadRequestException("No availability for selected time");
    }
  }
}
