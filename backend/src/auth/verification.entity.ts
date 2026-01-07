import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "verification_codes" })
export class VerificationCode {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column()
  phone!: string;

  @Column()
  code!: string;

  @Column({ type: "timestamptz" })
  expiresAt!: Date;

  @Column({ default: false })
  consumed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
