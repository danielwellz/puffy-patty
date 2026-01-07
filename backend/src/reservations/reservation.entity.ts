import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ReservationStatus {
  Pending = "PENDING",
  Confirmed = "CONFIRMED",
  Declined = "DECLINED",
  Cancelled = "CANCELLED"
}

@Entity({ name: "reservations" })
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  branchId!: string;

  @Column({ type: "timestamptz" })
  startAt!: Date;

  @Column({ type: "int" })
  partySize!: number;

  @Column()
  customerName!: string;

  @Column()
  customerPhone!: string;

  @Column({ type: "enum", enum: ReservationStatus, default: ReservationStatus.Pending })
  status!: ReservationStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
