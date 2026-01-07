import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { UserRole } from "../users/user.entity";
import { Shift, ShiftType } from "./shift.entity";

type CreateShiftInput = {
  date: string;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  userId: string;
  branchId?: string;
};

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftsRepo: Repository<Shift>,
    private readonly usersService: UsersService
  ) {}

  async findForUser(userId: string, branchId?: string | null) {
    return this.shiftsRepo.find({
      where: { user: { id: userId }, ...(branchId ? { branchId } : {}) },
      order: { date: "ASC", startTime: "ASC" }
    });
  }

  async findAll(startDate?: string, endDate?: string, branchId?: string | null) {
    const where: any = {};
    if (startDate && endDate) {
      where.date = Between(startDate, endDate);
    }
    if (branchId) where.branchId = branchId;
    return this.shiftsRepo.find({ where, order: { date: "ASC", startTime: "ASC" } });
  }

  async createMany(shifts: CreateShiftInput[]) {
    for (const shift of shifts) {
      await this.ensureNoConflict(shift.userId, shift.date, shift.startTime, shift.endTime);
    }
    const entities = await Promise.all(
      shifts.map(async (s) => {
        const user = await this.usersService.findById(s.userId);
        if (!user) throw new BadRequestException("User not found");
        return this.shiftsRepo.create({ ...s, user, branchId: user.branchId });
      })
    );
    return this.shiftsRepo.save(entities);
  }

  async update(id: string, input: Partial<CreateShiftInput>) {
    const existing = await this.shiftsRepo.findOne({ where: { id } });
    if (!existing) throw new BadRequestException("Shift not found");
    const userId = input.userId ?? existing.user.id;
    await this.ensureNoConflict(userId, input.date ?? existing.date, input.startTime ?? existing.startTime, input.endTime ?? existing.endTime, id);
    if (input.userId) {
      const user = await this.usersService.findById(input.userId);
      if (!user) throw new BadRequestException("User not found");
      existing.user = user;
    }
    Object.assign(existing, input);
    return this.shiftsRepo.save(existing);
  }

  async remove(id: string) {
    await this.shiftsRepo.delete(id);
    return { deleted: true };
  }

  private async ensureNoConflict(userId: string, date: string, start: string, end: string, excludeId?: string) {
    const overlapping = await this.shiftsRepo
      .createQueryBuilder("shift")
      .leftJoin("shift.user", "user")
      .where("user.id = :userId", { userId })
      .andWhere("shift.date = :date", { date })
      .andWhere("(shift.startTime, shift.endTime) OVERLAPS (:start, :end)", { start, end })
      .andWhere(excludeId ? "shift.id <> :excludeId" : "1=1", { excludeId })
      .getOne();

    if (overlapping) {
      throw new BadRequestException("User already assigned to overlapping shift");
    }
  }
}
