import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity({ name: "order_items" })
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  order!: Order;

  @Column()
  orderId!: string;

  @Column()
  menuItemId!: string;

  @Column({ type: "int" })
  qty!: number;

  @Column({ type: "int" })
  unitPrice!: number;

  @Column({ type: "text", nullable: true })
  notes?: string | null;

  @Column({ type: "jsonb", nullable: true })
  addonsJson?: Record<string, any> | null;
}
