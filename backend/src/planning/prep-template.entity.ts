import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "prep_templates" })
export class PlanningPrepTemplate {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  itemName!: string;
}
