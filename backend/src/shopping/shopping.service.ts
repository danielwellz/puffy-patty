import { Injectable } from "@nestjs/common";

export type ShoppingItem = { id: string; name: string; quantity: string; done: boolean };

@Injectable()
export class ShoppingService {
  private items: ShoppingItem[] = [
    { id: "1", name: "Buns", quantity: "5 packs", done: false },
    { id: "2", name: "Beef patties", quantity: "20 pcs", done: false }
  ];

  findAll() {
    return this.items;
  }

  create(item: Omit<ShoppingItem, "id">) {
    const record = { ...item, id: Date.now().toString() };
    this.items.push(record);
    return record;
  }

  update(id: string, data: Partial<ShoppingItem>) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...data };
    return this.items[idx];
  }
}
