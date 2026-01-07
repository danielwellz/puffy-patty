import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChecklistRun, ChecklistItemState } from "./checklist-run.entity";
import { ChecklistTemplate, ChecklistType } from "./checklist-template.entity";

@Injectable()
export class ChecklistsService {
  constructor(
    @InjectRepository(ChecklistRun)
    private readonly runsRepo: Repository<ChecklistRun>,
    @InjectRepository(ChecklistTemplate)
    private readonly templatesRepo: Repository<ChecklistTemplate>
  ) {}

  private normalizeDate(date?: string) {
    return date ?? new Date().toISOString().slice(0, 10);
  }

  private async ensureTemplate(type: ChecklistType) {
    const template = await this.templatesRepo.findOne({ where: { type } });
    if (!template) {
      throw new BadRequestException("Checklist template missing");
    }
    return template;
  }

  async getRun(type: ChecklistType, date?: string, branchId?: string | null) {
    const targetDate = this.normalizeDate(date);
    const where: any = { type, date: targetDate, branchId: branchId ?? null };
    const existing = await this.runsRepo.findOne({ where });
    if (existing) return existing;

    const template = await this.ensureTemplate(type);
    const run = this.runsRepo.create({
      type,
      date: targetDate,
      branchId: branchId ?? undefined,
      items: template.items.map((label) => ({ label, done: false }))
    });
    return this.runsRepo.save(run);
  }

  async updateRun(type: ChecklistType, date: string, items: ChecklistItemState[], branchId?: string | null) {
    const targetDate = this.normalizeDate(date);
    const where: any = { type, date: targetDate, branchId: branchId ?? null };
    const existing = await this.runsRepo.findOne({ where });
    if (!existing) {
      return this.getRun(type, targetDate, branchId);
    }
    existing.items = items;
    return this.runsRepo.save(existing);
  }
}
