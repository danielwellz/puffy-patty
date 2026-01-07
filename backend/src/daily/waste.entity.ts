import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "daily_waste" })
export class WasteLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date" })
  date!: string;

  @Column()
  itemName!: string;

  @Column({ nullable: true })
  quantity?: string;

  @Column()
  reason!: string;

  @Column({ nullable: true })
  branchId?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
