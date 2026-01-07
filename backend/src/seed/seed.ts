import "reflect-metadata";
import { DataSource } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import * as bcrypt from "bcryptjs";
import { configuration } from "../config/configuration";
import { entities } from "../database/entities";
import { ChecklistTemplate, ChecklistType } from "../checklists/checklist-template.entity";
import { PlanningPrepTemplate } from "../planning/prep-template.entity";
import { PlanningShoppingTemplate } from "../planning/shopping-template.entity";
import { PrepItem } from "../planning/prep-item.entity";
import { ShoppingItem } from "../planning/shopping-item.entity";
import { Recipe } from "../recipes/recipe.entity";
import { Shift, ShiftType } from "../shifts/shift.entity";
import { PeriodicTask } from "../tasks/periodic-task.entity";
import { ExpirationRule } from "../expiration/expiration-rule.entity";
import { User } from "../users/user.entity";
import {
  expirationRulesSeed,
  periodicTasksSeed,
  prepTemplateItems,
  seedChecklists,
  seedRecipes,
  seedShiftTemplates,
  seedUsers,
  shoppingTemplateItems
} from "./data";

const loadEnv = () => {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) return;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  });
};

const startOfWeekSaturday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffToSaturday = (today.getDay() - 6 + 7) % 7; // Saturday = 6
  today.setDate(today.getDate() - diffToSaturday);
  return today;
};

const dateWithOffset = (start: Date, offset: number) => {
  const d = new Date(start);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

async function seed() {
  loadEnv();
  const cfg = configuration();
  const dataSource = new DataSource({
    type: "postgres",
    host: cfg.database.host,
    port: cfg.database.port,
    username: cfg.database.username,
    password: cfg.database.password,
    database: cfg.database.name,
    entities,
    synchronize: true,
    logging: cfg.database.logging
  });

  await dataSource.initialize();
  console.log("Connected to database, seeding data...");

  const userRepo = dataSource.getRepository(User);
  const recipeRepo = dataSource.getRepository(Recipe);
  const checklistTemplateRepo = dataSource.getRepository(ChecklistTemplate);
  const prepTemplateRepo = dataSource.getRepository(PlanningPrepTemplate);
  const shoppingTemplateRepo = dataSource.getRepository(PlanningShoppingTemplate);
  const prepRepo = dataSource.getRepository(PrepItem);
  const shoppingRepo = dataSource.getRepository(ShoppingItem);
  const expirationRepo = dataSource.getRepository(ExpirationRule);
  const periodicRepo = dataSource.getRepository(PeriodicTask);
  const shiftRepo = dataSource.getRepository(Shift);

  for (const user of seedUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    await userRepo.upsert({ ...user, passwordHash }, ["phone"]);
  }
  console.log(`Seeded ${seedUsers.length} users`);

  await recipeRepo.upsert(seedRecipes, ["name"]);
  console.log(`Seeded ${seedRecipes.length} recipes`);

  for (const checklist of seedChecklists) {
    await checklistTemplateRepo.upsert(
      {
        type: checklist.type,
        items: checklist.items,
        role: checklist.role
      },
      ["type"]
    );
  }
  console.log("Seeded checklist templates");

  await prepTemplateRepo.clear();
  await prepTemplateRepo.save(prepTemplateItems.map((itemName) => prepTemplateRepo.create({ itemName })));
  console.log(`Seeded ${prepTemplateItems.length} prep templates`);

  await shoppingTemplateRepo.clear();
  await shoppingTemplateRepo.save(shoppingTemplateItems.map((item) => shoppingTemplateRepo.create(item)));
  console.log(`Seeded ${shoppingTemplateItems.length} shopping templates`);

  const today = new Date().toISOString().slice(0, 10);
  if ((await prepRepo.count({ where: { date: today } })) === 0) {
    const prepEntities = prepTemplateItems.map((itemName) =>
      prepRepo.create({ itemName, date: today, done: false, branchId: "main" })
    );
    await prepRepo.save(prepEntities);
    console.log(`Seeded ${prepEntities.length} prep items for ${today}`);
  }

  if ((await shoppingRepo.count({ where: { date: today } })) === 0) {
    const shoppingEntities = shoppingTemplateItems.map((item) =>
      shoppingRepo.create({ ...item, date: today, acquired: false, branchId: "main" })
    );
    await shoppingRepo.save(shoppingEntities);
    console.log(`Seeded ${shoppingEntities.length} shopping items for ${today}`);
  }

  await expirationRepo.upsert(expirationRulesSeed, ["item"]);
  console.log(`Seeded ${expirationRulesSeed.length} expiration rules`);

  await periodicRepo.upsert(periodicTasksSeed, ["taskName", "branchId"]);
  console.log("Seeded periodic tasks");

  // Seed demo shifts for the coming week
  await shiftRepo.clear();
  const start = startOfWeekSaturday();
  const usersByPhone = new Map((await userRepo.find()).map((u) => [u.phone, u]));
  const shiftEntities: Shift[] = [];
  for (const template of seedShiftTemplates) {
    const user = usersByPhone.get(template.phone);
    if (!user) continue;
    for (const offset of template.offsets) {
      const date = dateWithOffset(start, offset);
      const shift = shiftRepo.create({
        date,
        shiftType: template.type as ShiftType,
        startTime: template.start,
        endTime: template.end,
        user,
        branchId: user.branchId
      });
      shiftEntities.push(shift);
    }
  }
  if (shiftEntities.length > 0) {
    await shiftRepo.save(shiftEntities);
  }
  console.log(`Seeded ${shiftEntities.length} shifts`);

  await dataSource.destroy();
  console.log("Seeding complete.");
}

seed().catch((err) => {
  console.error("Seed failed", err);
  process.exitCode = 1;
});
