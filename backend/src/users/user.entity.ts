import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  Manager = "MANAGER",
  HeadChef = "HEAD_CHEF",
  KitchenStaff = "KITCHEN_STAFF"
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  phone!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ nullable: true })
  passwordHash?: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.KitchenStaff })
  role!: UserRole;

  @Column({ nullable: true })
  branchId?: string;
}
