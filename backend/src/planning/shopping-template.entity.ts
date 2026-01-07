import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "shopping_templates" })
export class PlanningShoppingTemplate {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  category!: string;

  @Column()
  itemName!: string;
}
