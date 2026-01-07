import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../orders/order.entity";
import { OrdersService } from "../orders/orders.service";
import { OrderStatus } from "../orders/order.types";
import { Payment, PaymentStatus } from "./payment.entity";
import { MellatProvider } from "./providers/mellat.provider";
import { MockProvider } from "./providers/mock.provider";
import { PaymentProvider } from "./providers/payment-provider";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly ordersService: OrdersService,
    private readonly configService: ConfigService
  ) {}

  async startPayment(orderId: string, providerOverride?: string) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException("Order not found");
    if ([OrderStatus.Cancelled, OrderStatus.Completed].includes(order.status)) {
      throw new BadRequestException("Order is not payable");
    }

    const existingPaid = await this.paymentRepo.findOne({
      where: { orderId: order.id, status: PaymentStatus.Paid }
    });
    if (existingPaid) {
      throw new BadRequestException("Order is already paid");
    }

    const providerName = (providerOverride || this.configService.get<string>("payments.provider") || "mock").toLowerCase();
    const payment = this.paymentRepo.create({
      orderId: order.id,
      provider: providerName,
      amount: order.total,
      status: PaymentStatus.Init
    });
    const saved = await this.paymentRepo.save(payment);

    const provider = this.getProvider(providerName);
    const { redirectUrl, authority } = await provider.createPayment(order, saved.id);
    saved.status = PaymentStatus.Redirected;
    saved.authority = authority || null;
    await this.paymentRepo.save(saved);

    return { paymentId: saved.id, redirectUrl };
  }

  async handleCallback(query: Record<string, any>) {
    const providerName = (query.provider || this.configService.get<string>("payments.provider") || "mock").toLowerCase();
    const provider = this.getProvider(providerName);
    const payment = await this.findPaymentFromCallback(query);
    if (!payment) throw new NotFoundException("Payment not found");

    const verify = await provider.verifyPayment(query);
    payment.rawCallbackJson = query;
    if (verify.ok) {
      payment.status = PaymentStatus.Paid;
      payment.refId = verify.refId || payment.refId || null;
    } else {
      payment.status = query.cancelled ? PaymentStatus.Cancelled : PaymentStatus.Failed;
    }

    const saved = await this.paymentRepo.save(payment);
    const order = await this.orderRepo.findOne({ where: { id: payment.orderId } });
    if (verify.ok && order) {
      await this.ordersService.markPaid(order.id);
    }

    return { ok: verify.ok, payment: saved, orderCode: order?.code || null };
  }

  private getProvider(name: string): PaymentProvider {
    if (name === "mellat") {
      const terminalId = this.configService.get<string>("payments.mellat.terminalId") || "";
      const username = this.configService.get<string>("payments.mellat.username") || "";
      const password = this.configService.get<string>("payments.mellat.password") || "";
      const callbackUrl = this.configService.get<string>("payments.mellat.callbackUrl") || "";
      if (!terminalId || !username || !password || !callbackUrl) {
        throw new BadRequestException("Mellat provider is not configured");
      }
      return new MellatProvider({ terminalId, username, password, callbackUrl });
    }
    const callbackBaseUrl =
      this.configService.get<string>("payments.callbackBaseUrl") || "http://localhost:3001/api/public/payments/callback";
    return new MockProvider(callbackBaseUrl);
  }

  private async findPaymentFromCallback(query: Record<string, any>) {
    if (query.paymentId) {
      return this.paymentRepo.findOne({ where: { id: query.paymentId } });
    }
    const authority = query.Authority || query.authority;
    if (authority) {
      return this.paymentRepo.findOne({ where: { authority } });
    }
    if (query.orderId) {
      return this.paymentRepo.findOne({ where: { orderId: query.orderId }, order: { createdAt: "DESC" } });
    }
    return null;
  }
}
