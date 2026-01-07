export type UserRole = "MANAGER" | "HEAD_CHEF" | "KITCHEN_STAFF";

export type ChecklistType = "open" | "handover" | "close";

export type ChecklistItem = { label: string; done: boolean };

export type ChecklistRun = {
  id: string;
  type: ChecklistType;
  date: string;
  items: ChecklistItem[];
};

export type PrepListItem = {
  id: string;
  date: string;
  itemName: string;
  quantity?: string;
  unit?: string;
  done: boolean;
};

export type ShoppingListItem = {
  id: string;
  date: string;
  itemName: string;
  quantity?: string;
  unit?: string;
  acquired: boolean;
  category?: string | null;
};

export type PurchaseLog = { id: string; itemName: string; quantity?: string; unit?: string; price?: string; date: string };

export type WasteLog = { id: string; itemName: string; quantity?: string; reason?: string; date: string };

export type PeriodicTask = { id: string; taskName: string; frequencyDays: number; lastCompletedDate?: string | null };

export type ExpirationRule = { id: string; item: string; shelfLife: string };

export type RecipeIngredient = { item: string; amount?: number | string; unit?: string };

export type Recipe = { id: string; name: string; category: string; ingredients: RecipeIngredient[]; notes?: string | null };

export type Shift = {
  id: string;
  date: string;
  shiftType: "MORNING" | "EVENING";
  startTime: string;
  endTime: string;
  user?: { id: string; name?: string; phone?: string };
};

export type UserSummary = { id: string; name?: string; phone: string };
