import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PeriodicTask } from "./periodic-task.entity";

const seedTasks = [
  { taskName: "دیپ کلین آشپزخانه", frequencyDays: 7 },
  { taskName: "نظافت سانتریفیوژ (فیلتر/بدنه)", frequencyDays: 7 },
  { taskName: "تعویض روغن سرخ‌کن", frequencyDays: 5 },
  { taskName: "مرتب‌سازی انبار", frequencyDays: 7 },
  { taskName: "نظافت کامل فر پیتزا", frequencyDays: 7 },
  { taskName: "تمیز کردن دیوارها", frequencyDays: 4 },
  { taskName: "شستن سطل‌های زباله", frequencyDays: 3 },
  { taskName: "نظافت پشت یخچال‌های قدی", frequencyDays: 5 },
  { taskName: "نظافت پشت هات‌لاین‌ها", frequencyDays: 3 },
  { taskName: "نظافت کامل ظرفشویی", frequencyDays: 6 },
  { taskName: "ضدعفونی عمیق تخته‌ها", frequencyDays: 30 }
];

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(PeriodicTask)
    private readonly repo: Repository<PeriodicTask>
  ) {}

  private async ensureSeeds(branchId?: string | null) {
    const tasks = seedTasks.map((t) => this.repo.create({ ...t, branchId: branchId ?? undefined }));
    await this.repo.upsert(tasks, ["taskName", "branchId"]);
  }

  async findAll(branchId?: string | null) {
    await this.ensureSeeds(branchId);
    return this.repo.find({ where: branchId ? { branchId } : {}, order: { taskName: "ASC" } });
  }

  markDone(id: string, date: string) {
    return this.repo.save({ id, lastCompletedDate: date });
  }
}
