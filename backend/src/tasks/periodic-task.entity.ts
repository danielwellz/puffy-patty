import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "periodic_tasks" })
export class PeriodicTask {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  taskName!: string;

  @Column()
  frequencyDays!: number;

  @Column({ type: "date", nullable: true })
  lastCompletedDate?: string;

  @Column({ nullable: true })
  branchId?: string;
}
