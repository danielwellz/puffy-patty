import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum PaymentStatus {
  Init = "INIT",
  Redirected = "REDIRECTED",
  Paid = "PAID",
  Failed = "FAILED",
  Cancelled = "CANCELLED"
}

@Entity({ name: "payments" })
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  orderId!: string;

  @Column()
  provider!: string;

  @Column({ type: "int" })
  amount!: number;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.Init })
  status!: PaymentStatus;

  @Column({ nullable: true })
  authority?: string | null;

  @Column({ nullable: true })
  refId?: string | null;

  @Column({ type: "jsonb", nullable: true })
  rawCallbackJson?: Record<string, any> | null;

  @CreateDateColumn()
  createdAt!: Date;
}
