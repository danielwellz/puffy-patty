import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "branches" })
export class Branch {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: "jsonb", nullable: true })
  hoursJson?: Record<string, any> | null;

  @Column({ default: true })
  onlineOrderingEnabled!: boolean;

  @Column({ default: true })
  reservationsEnabled!: boolean;

  @Column({ default: true })
  dineInEnabled!: boolean;

  @Column({ default: true })
  takeawayEnabled!: boolean;
}
