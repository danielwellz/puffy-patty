import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

export enum ShiftType {
  Morning = "MORNING",
  Evening = "EVENING"
}

@Entity({ name: "shifts" })
export class Shift {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date" })
  date!: string; // YYYY-MM-DD

  @Column({ type: "enum", enum: ShiftType })
  shiftType!: ShiftType;

  @Column({ type: "time" })
  startTime!: string;

  @Column({ type: "time" })
  endTime!: string;

  @Column({ nullable: true })
  branchId?: string;

  @ManyToOne(() => User, { eager: true })
  user!: User;
}
