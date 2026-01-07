import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "periodic_tasks" })
@Index(["taskName", "branchId"], { unique: true })
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
