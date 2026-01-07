import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { OrderSource, OrderStatus, OrderType } from "./order.types";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  code!: string;

  @Column()
  branchId!: string;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.Received })
  status!: OrderStatus;

  @Column({ type: "enum", enum: OrderType })
  orderType!: OrderType;

  @Column({ nullable: true })
  tableNumber?: string | null;

  @Column({ type: "timestamptz", nullable: true })
  pickupTime?: Date | null;

  @Column({ nullable: true })
  customerName?: string | null;

  @Column({ nullable: true })
  customerPhone?: string | null;

  @Column({ type: "int" })
  subtotal!: number;

  @Column({ type: "int" })
  tax!: number;

  @Column({ type: "int" })
  total!: number;

  @Column({ type: "enum", enum: OrderSource, default: OrderSource.Pwa })
  source!: OrderSource;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: ["insert"] })
  items!: OrderItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
