import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type RecipeIngredient = { item: string; amount?: number | string; unit?: string };

@Entity({ name: "recipes" })
export class Recipe {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string; // Persian display name

  @Column()
  category!: string; // e.g. پیتزا، برگر

  @Column({ type: "jsonb" })
  ingredients!: RecipeIngredient[];

  @Column({ nullable: true })
  notes?: string;
}
