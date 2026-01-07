import { PaymentProvider } from "./payment-provider";
import { Order } from "../../orders/order.entity";

export class MockProvider implements PaymentProvider {
  constructor(private readonly callbackBaseUrl: string) {}

  async createPayment(order: Order, paymentId: string) {
    const redirectUrl = `${this.callbackBaseUrl}?provider=mock&paymentId=${paymentId}&orderId=${order.id}&ok=1`;
    return { redirectUrl, authority: `MOCK-${paymentId}` };
  }

  async verifyPayment(query: Record<string, any>) {
    const ok = query.ok === "1" || query.ok === 1 || query.ok === true || query.ok === "true";
    const refId = query.refId || `MOCK-REF-${Date.now()}`;
    return { ok, refId: ok ? refId : undefined };
  }
}
