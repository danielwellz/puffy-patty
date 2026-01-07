import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuCategory } from "./menu-category.entity";
import { MenuItem } from "./menu-item.entity";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory, MenuItem])],
  providers: [MenuService],
  controllers: [MenuController],
  exports: [MenuService]
})
export class MenuModule {}
