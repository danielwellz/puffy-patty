import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DailyPurchase } from "./purchase.entity";
import { WasteLog } from "./waste.entity";

@Injectable()
export class DailyService {
  constructor(
    @InjectRepository(DailyPurchase)
    private readonly purchaseRepo: Repository<DailyPurchase>,
    @InjectRepository(WasteLog)
    private readonly wasteRepo: Repository<WasteLog>
  ) {}

  private normalizeDate(date?: string) {
    return date ?? new Date().toISOString().slice(0, 10);
  }

  getPurchases(date?: string, branchId?: string | null) {
    const targetDate = this.normalizeDate(date);
    return this.purchaseRepo.find({ where: { date: targetDate, ...(branchId ? { branchId } : {}) }, order: { createdAt: "ASC" } });
  }

  addPurchase(input: Partial<DailyPurchase> | Partial<DailyPurchase>[], branchId?: string) {
    const list = Array.isArray(input) ? input : [input];
    const withDate = list.map((i) => ({
      ...i,
      date: this.normalizeDate(i.date),
      branchId: i.branchId ?? branchId
    }));
    const entities = this.purchaseRepo.create(withDate);
    return this.purchaseRepo.save(entities);
  }

  getWaste(date?: string, branchId?: string | null) {
    const targetDate = this.normalizeDate(date);
    return this.wasteRepo.find({ where: { date: targetDate, ...(branchId ? { branchId } : {}) }, order: { createdAt: "ASC" } });
  }

  addWaste(input: Partial<WasteLog> | Partial<WasteLog>[], branchId?: string) {
    const list = Array.isArray(input) ? input : [input];
    const withDate = list.map((i) => ({
      ...i,
      date: this.normalizeDate(i.date),
      branchId: i.branchId ?? branchId
    }));
    const entities = this.wasteRepo.create(withDate);
    return this.wasteRepo.save(entities);
  }
}
