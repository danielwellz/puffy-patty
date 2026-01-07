import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShoppingItem } from "./shopping-item.entity";
import { PrepItem } from "./prep-item.entity";
import { PlanningPrepTemplate } from "./prep-template.entity";
import { PlanningShoppingTemplate } from "./shopping-template.entity";

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(ShoppingItem)
    private readonly shoppingRepo: Repository<ShoppingItem>,
    @InjectRepository(PrepItem)
    private readonly prepRepo: Repository<PrepItem>,
    @InjectRepository(PlanningPrepTemplate)
    private readonly prepTemplateRepo: Repository<PlanningPrepTemplate>,
    @InjectRepository(PlanningShoppingTemplate)
    private readonly shoppingTemplateRepo: Repository<PlanningShoppingTemplate>
  ) {}

  private normalizeDate(date?: string) {
    if (date) return date;
    return new Date().toISOString().slice(0, 10);
  }

  getShopping(date?: string, branchId?: string) {
    const targetDate = this.normalizeDate(date);
    return this.shoppingRepo.find({
      where: { date: targetDate, ...(branchId ? { branchId } : {}) },
      order: { createdAt: "ASC" }
    });
  }

  addShopping(items: Partial<ShoppingItem> | Partial<ShoppingItem>[], branchId?: string) {
    const list = Array.isArray(items) ? items : [items];
    const withDate = list.map((i) => ({
      ...i,
      date: this.normalizeDate(i.date),
      branchId: i.branchId ?? branchId
    }));
    const entities = this.shoppingRepo.create(withDate);
    return this.shoppingRepo.save(entities);
  }

  updateShopping(id: string, patch: Partial<ShoppingItem>) {
    return this.shoppingRepo.save({ id, ...patch });
  }

  removeShopping(id: string) {
    return this.shoppingRepo.delete(id);
  }

  getShoppingTemplate() {
    return this.shoppingTemplateRepo.find({ order: { category: "ASC", itemName: "ASC" } });
  }

  getPrep(date?: string, branchId?: string) {
    const targetDate = this.normalizeDate(date);
    return this.prepRepo.find({ where: { date: targetDate, ...(branchId ? { branchId } : {}) }, order: { createdAt: "ASC" } });
  }

  async addPrep(items: Partial<PrepItem> | Partial<PrepItem>[], branchId?: string) {
    const list = Array.isArray(items) ? items : [items];
    const withDate = list.map((i) => ({
      ...i,
      date: this.normalizeDate(i.date),
      branchId: i.branchId ?? branchId
    }));
    const entities = this.prepRepo.create(withDate);
    return this.prepRepo.save(entities);
  }

  async generatePrepTemplate(date?: string, branchId?: string) {
    const targetDate = this.normalizeDate(date);
    await this.prepRepo.delete({ date: targetDate, ...(branchId ? { branchId } : {}) });
    const templateItems = await this.prepTemplateRepo.find();
    const source = templateItems.length > 0 ? templateItems.map((t) => t.itemName) : [];
    const entities = this.prepRepo.create(
      source.map((itemName) => ({
        itemName,
        date: targetDate,
        done: false,
        branchId
      }))
    );
    return this.prepRepo.save(entities);
  }

  updatePrep(id: string, patch: Partial<PrepItem>) {
    return this.prepRepo.save({ id, ...patch });
  }

  removePrep(id: string) {
    return this.prepRepo.delete(id);
  }

  getPrepTemplate() {
    return this.prepTemplateRepo.find({ order: { itemName: "ASC" } });
  }

  async generateShoppingTemplate(date?: string, branchId?: string) {
    const targetDate = this.normalizeDate(date);
    await this.shoppingRepo.delete({ date: targetDate, ...(branchId ? { branchId } : {}) });
    const templates = await this.shoppingTemplateRepo.find();
    if (templates.length === 0) return [];
    const entities = this.shoppingRepo.create(
      templates.map((t) => ({
        date: targetDate,
        itemName: t.itemName,
        unit: "",
        quantity: "",
        acquired: false,
        branchId
      }))
    );
    return this.shoppingRepo.save(entities);
  }
}
