import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MenuCategory } from "./menu-category.entity";

@Entity({ name: "menu_items" })
export class MenuItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => MenuCategory, { onDelete: "CASCADE" })
  category!: MenuCategory;

  @Column()
  categoryId!: string;

  @Column({ type: "int" })
  basePrice!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  nameFa!: string;

  @Column()
  nameEn!: string;

  @Column({ type: "text", nullable: true })
  descFa?: string | null;

  @Column({ type: "text", nullable: true })
  descEn?: string | null;

  @Column({ nullable: true })
  imageUrl?: string | null;

  @Column({ type: "jsonb", nullable: true })
  branchOverridesJson?: Record<string, any> | null;
}
