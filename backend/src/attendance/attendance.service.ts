import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { ShiftsService } from "../shifts/shifts.service";
import { Attendance } from "./attendance.entity";

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    private readonly usersService: UsersService,
    private readonly shiftsService: ShiftsService
  ) {}

  async currentOpenRecord(userId: string) {
    return this.attendanceRepo.findOne({
      where: { user: { id: userId }, clockOutTime: IsNull() },
      order: { clockInTime: "DESC" }
    });
  }

  async clockIn(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new BadRequestException("User not found");

    const existing = await this.currentOpenRecord(userId);
    if (existing) {
      throw new BadRequestException("Already clocked in");
    }

    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10);
    const possibleShift = (await this.shiftsService.findForUser(userId, user.branchId)).find((s) => s.date === dateStr) ?? null;

    const record = this.attendanceRepo.create({
      user,
      shift: possibleShift || null,
      branchId: user.branchId,
      clockInTime: new Date()
    });
    return this.attendanceRepo.save(record);
  }

  async clockOut(userId: string) {
    const open = await this.currentOpenRecord(userId);
    if (!open) {
      throw new BadRequestException("Not clocked in");
    }
    open.clockOutTime = new Date();
    return this.attendanceRepo.save(open);
  }

  async forUser(userId: string) {
    return this.attendanceRepo.find({ where: { user: { id: userId } }, order: { clockInTime: "DESC" } });
  }
}
