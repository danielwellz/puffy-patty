import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Shift } from "../shifts/shift.entity";

@Entity({ name: "attendance" })
export class Attendance {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @ManyToOne(() => Shift, { nullable: true, eager: true })
  shift?: Shift | null;

  @Column({ nullable: true })
  branchId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: "timestamptz" })
  clockInTime!: Date;

  @Column({ type: "timestamptz", nullable: true })
  clockOutTime?: Date | null;

  @Column({ nullable: true })
  notes?: string;
}
