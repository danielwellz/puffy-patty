import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "daily_purchases" })
export class DailyPurchase {
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

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  price?: number;

  @Column({ nullable: true })
  branchId?: string;

  @Column({ nullable: true })
  receiptUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
