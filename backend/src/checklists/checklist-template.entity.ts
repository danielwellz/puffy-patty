import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ChecklistType {
  Open = "open",
  Handover = "handover",
  Close = "close"
}

@Entity({ name: "checklist_templates" })
export class ChecklistTemplate {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: ChecklistType })
  type!: ChecklistType;

  @Column({ type: "jsonb" })
  items!: string[];

  @Column({ nullable: true })
  role?: string;
}
