import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "shopping_items" })
export class ShoppingItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date" })
  date!: string;

  @Column()
  itemName!: string;

  @Column({ nullable: true })
  quantity?: string;

  @Column({ nullable: true })
  unit?: string;

  @Column({ default: false })
  acquired!: boolean;

  @Column({ nullable: true })
  branchId?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
