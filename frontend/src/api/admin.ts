import { apiFetch } from "./client";
import type { Reservation } from "../types";

export const fetchReservations = (branchId: string | null | undefined, token: string) => {
  const query = branchId ? `?branchId=${encodeURIComponent(branchId)}` : "";
  return apiFetch<Reservation[]>(`/admin/reservations${query}`, {}, token);
};

export const updateReservationStatus = (id: string, status: string, token: string) =>
  apiFetch<Reservation>(`/admin/reservations/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  }, token);
