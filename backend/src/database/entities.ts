import { Attendance } from "../attendance/attendance.entity";
import { Branch } from "../branches/branch.entity";
import { ChecklistRun } from "../checklists/checklist-run.entity";
import { ChecklistTemplate } from "../checklists/checklist-template.entity";
import { DailyPurchase } from "../daily/purchase.entity";
import { WasteLog } from "../daily/waste.entity";
import { ExpirationRule } from "../expiration/expiration-rule.entity";
import { PlanningPrepTemplate } from "../planning/prep-template.entity";
import { PrepItem } from "../planning/prep-item.entity";
import { PlanningShoppingTemplate } from "../planning/shopping-template.entity";
import { ShoppingItem } from "../planning/shopping-item.entity";
import { Recipe } from "../recipes/recipe.entity";
import { Shift } from "../shifts/shift.entity";
import { PeriodicTask } from "../tasks/periodic-task.entity";
import { User } from "../users/user.entity";
import { VerificationCode } from "../auth/verification.entity";

export const entities = [
  Attendance,
  Branch,
  ChecklistRun,
  ChecklistTemplate,
  DailyPurchase,
  ExpirationRule,
  PlanningPrepTemplate,
  PlanningShoppingTemplate,
  PrepItem,
  Recipe,
  ShoppingItem,
  Shift,
  PeriodicTask,
  User,
  VerificationCode,
  WasteLog
];
