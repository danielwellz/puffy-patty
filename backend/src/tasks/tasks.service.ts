import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PeriodicTask } from "./periodic-task.entity";

const seedTasks = [
  { taskName: "Deep clean kitchen", frequencyDays: 7 },
  { taskName: "Clean centrifuge filter", frequencyDays: 7 },
  { taskName: "Replace fryer oil", frequencyDays: 5 },
  { taskName: "Hood/vent inspection", frequencyDays: 14 }
];

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(PeriodicTask)
    private readonly repo: Repository<PeriodicTask>
  ) {}

  private async ensureSeeds(branchId?: string | null) {
    const count = await this.repo.count({ where: branchId ? { branchId } : {} });
    if (count === 0) {
      const tasks = seedTasks.map((t) => this.repo.create({ ...t, ...(branchId ? { branchId } : {}) }));
      await this.repo.save(tasks);
    }
  }

  async findAll(branchId?: string | null) {
    await this.ensureSeeds(branchId);
    return this.repo.find({ where: branchId ? { branchId } : {}, order: { taskName: "ASC" } });
  }

  markDone(id: string, date: string) {
    return this.repo.save({ id, lastCompletedDate: date });
  }
}
