import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "expiration_rules" })
export class ExpirationRule {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  item!: string;

  @Column()
  shelfLife!: string;
}
