import { PaymentProvider } from "./payment-provider";
import { Order } from "../../orders/order.entity";

export type MellatConfig = {
  terminalId: string;
  username: string;
  password: string;
  callbackUrl: string;
};

export class MellatProvider implements PaymentProvider {
  constructor(private readonly config: MellatConfig) {}

  async createPayment(_order: Order, _paymentId: string) {
    // TODO: Implement Mellat SOAP/XML token request + redirect URL.
    // Expected env vars:
    // - MELLAT_TERMINAL_ID
    // - MELLAT_USERNAME
    // - MELLAT_PASSWORD
    // - MELLAT_CALLBACK_URL
    throw new Error("Mellat provider is not configured yet");
  }

  async verifyPayment(_query: Record<string, any>) {
    // TODO: Implement Mellat verification call + settle.
    return { ok: false };
  }
}
