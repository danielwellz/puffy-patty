import { apiFetch } from "./client";
import type { Branch, MenuCategory, Order, Reservation } from "../types";
import type { CartItem } from "../pwa/PwaContext";
import type { OrderType } from "../types";

export const fetchBranches = () => apiFetch<Branch[]>("/public/branches");

export const fetchMenu = (branchId: string) =>
  apiFetch<MenuCategory[]>(`/public/menu?branchId=${encodeURIComponent(branchId)}`);

export const createOrder = (payload: {
  branchId: string;
  orderType: OrderType;
  tableNumber?: string;
  pickupTime?: string;
  customerName?: string;
  customerPhone?: string;
  items: CartItem[];
}) =>
  apiFetch<Order>("/public/orders", {
    method: "POST",
    body: JSON.stringify({
      branchId: payload.branchId,
      orderType: payload.orderType,
      tableNumber: payload.tableNumber,
      pickupTime: payload.pickupTime,
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      items: payload.items.map((item) => ({
        menuItemId: item.menuItemId,
        qty: item.qty,
        notes: item.notes
      }))
    })
  });

export const fetchOrder = (code: string) => apiFetch<Order>(`/public/orders/${encodeURIComponent(code)}`);

export const startPayment = (orderId: string, provider?: string) =>
  apiFetch<{ redirectUrl: string; paymentId: string }>(`/public/payments/${orderId}/start`, {
    method: "POST",
    body: JSON.stringify({ provider })
  });

export const createReservation = (payload: {
  branchId: string;
  startAt: string;
  partySize: number;
  customerName: string;
  customerPhone: string;
}) =>
  apiFetch<Reservation>("/public/reservations", {
    method: "POST",
    body: JSON.stringify(payload)
  });
