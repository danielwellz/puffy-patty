import { Order } from "../../orders/order.entity";

export type PaymentCreateResult = {
  redirectUrl: string;
  authority?: string;
};

export type PaymentVerifyResult = {
  ok: boolean;
  refId?: string;
};

export interface PaymentProvider {
  createPayment(order: Order, paymentId: string): Promise<PaymentCreateResult>;
  verifyPayment(query: Record<string, any>): Promise<PaymentVerifyResult>;
}
