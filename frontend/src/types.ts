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

export type Branch = {
  id: string;
  name: string;
  address?: string | null;
  phone?: string | null;
  hoursJson?: Record<string, any> | null;
  onlineOrderingEnabled?: boolean;
  reservationsEnabled?: boolean;
  dineInEnabled?: boolean;
  takeawayEnabled?: boolean;
};

export type MenuCategory = {
  id: string;
  branchId?: string | null;
  sortOrder: number;
  isActive: boolean;
  nameFa: string;
  nameEn: string;
  items: MenuItem[];
};

export type MenuItem = {
  id: string;
  categoryId: string;
  basePrice: number;
  isActive: boolean;
  nameFa: string;
  nameEn: string;
  descFa?: string | null;
  descEn?: string | null;
  imageUrl?: string | null;
};

export type OrderType = "DINE_IN" | "TAKEAWAY";
export type OrderStatus = "PENDING_PAYMENT" | "RECEIVED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";

export type OrderItem = {
  id: string;
  menuItemId: string;
  qty: number;
  unitPrice: number;
  notes?: string | null;
  addonsJson?: Record<string, any> | null;
};

export type Order = {
  id: string;
  code: string;
  branchId: string;
  status: OrderStatus;
  orderType: OrderType;
  tableNumber?: string | null;
  pickupTime?: string | null;
  customerName?: string | null;
  customerPhone?: string | null;
  subtotal: number;
  tax: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type Reservation = {
  id: string;
  branchId: string;
  startAt: string;
  partySize: number;
  customerName: string;
  customerPhone: string;
  status: "PENDING" | "CONFIRMED" | "DECLINED" | "CANCELLED";
  createdAt: string;
};
