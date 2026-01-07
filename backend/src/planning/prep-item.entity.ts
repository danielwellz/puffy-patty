import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "prep_items" })
export class PrepItem {
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
  done!: boolean;

  @Column({ nullable: true })
  branchId?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
