import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ChecklistType } from "./checklist-template.entity";

export type ChecklistItemState = { label: string; done: boolean };

@Entity({ name: "checklist_runs" })
@Unique(["type", "date", "branchId"])
export class ChecklistRun {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: ChecklistType })
  type!: ChecklistType;

  @Column({ type: "date" })
  date!: string;

  @Column({ type: "jsonb" })
  items!: ChecklistItemState[];

  @Column({ nullable: true })
  branchId?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
