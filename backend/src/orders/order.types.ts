export enum OrderStatus {
  PendingPayment = "PENDING_PAYMENT",
  Received = "RECEIVED",
  Preparing = "PREPARING",
  Ready = "READY",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED"
}

export enum OrderType {
  DineIn = "DINE_IN",
  Takeaway = "TAKEAWAY"
}

export enum OrderSource {
  Pwa = "PWA",
  Other = "OTHER"
}
