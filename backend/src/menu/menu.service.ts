import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, IsNull, Repository } from "typeorm";
import { MenuCategory } from "./menu-category.entity";
import { MenuItem } from "./menu-item.entity";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuCategory)
    private readonly categoryRepo: Repository<MenuCategory>,
    @InjectRepository(MenuItem)
    private readonly itemRepo: Repository<MenuItem>
  ) {}

  async getMenu(branchId?: string | null) {
    const categoryWhere = branchId
      ? [{ branchId, isActive: true }, { branchId: IsNull(), isActive: true }]
      : { isActive: true };
    const categories = await this.categoryRepo.find({
      where: categoryWhere as any,
      order: { sortOrder: "ASC", nameFa: "ASC" }
    });

    const categoryIds = categories.map((c) => c.id);
    if (!categoryIds.length) {
      return [];
    }

    const items = await this.itemRepo.find({
      where: {
        isActive: true,
        categoryId: In(categoryIds)
      },
      order: { nameFa: "ASC" }
    });

    const itemsByCategory = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
      acc[item.categoryId] = acc[item.categoryId] || [];
      acc[item.categoryId].push(item);
      return acc;
    }, {});

    return categories.map((category) => ({
      ...category,
      items: itemsByCategory[category.id] || []
    }));
  }

  async getActiveItemsByIds(ids: string[], branchId?: string | null) {
    if (!ids.length) return [];
    const query = this.itemRepo
      .createQueryBuilder("item")
      .innerJoin(MenuCategory, "category", "category.id = item.categoryId")
      .where("item.id IN (:...ids)", { ids })
      .andWhere("item.isActive = true")
      .andWhere("category.isActive = true");

    if (branchId) {
      query.andWhere("(category.branchId = :branchId OR category.branchId IS NULL)", { branchId });
    }

    return query.getMany();
  }

  async getItemById(id: string) {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException("Menu item not found");
    return item;
  }
}
