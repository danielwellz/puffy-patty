import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "menu_categories" })
export class MenuCategory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  branchId?: string | null;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  nameFa!: string;

  @Column()
  nameEn!: string;
}
