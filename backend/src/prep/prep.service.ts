import { Injectable } from "@nestjs/common";

export type PrepItem = { id: string; name: string; grams: string; done: boolean };

@Injectable()
export class PrepService {
  private items: PrepItem[] = [
    { id: "1", name: "Onions sliced", grams: "500g", done: false },
    { id: "2", name: "Sauce base", grams: "1kg", done: false }
  ];

  findAll() {
    return this.items;
  }

  create(item: Omit<PrepItem, "id">) {
    const record = { ...item, id: Date.now().toString() };
    this.items.push(record);
    return record;
  }

  update(id: string, data: Partial<PrepItem>) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...data };
    return this.items[idx];
  }
}
