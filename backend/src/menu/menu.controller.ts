import { Controller, Get, Query } from "@nestjs/common";
import { MenuService } from "./menu.service";

@Controller("public/menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenu(@Query("branchId") branchId?: string) {
    return this.menuService.getMenu(branchId || null);
  }
}
