import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { StartPaymentDto } from "./dto/start-payment.dto";
import { PaymentsService } from "./payments.service";

@Controller("public/payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService, private readonly configService: ConfigService) {}

  @Post(":orderId/start")
  start(@Param("orderId") orderId: string, @Body() body: StartPaymentDto) {
    return this.paymentsService.startPayment(orderId, body.provider);
  }

  @Get("callback")
  async callback(@Query() query: Record<string, any>, @Res() res: Response) {
    const result = await this.paymentsService.handleCallback(query);
    const frontendOrigin =
      process.env.FRONTEND_ORIGIN ||
      this.configService.get<string>("payments.frontendRedirectBase") ||
      "http://localhost:3000";
    const status = result.ok ? "success" : "failed";
    const target = result.orderCode
      ? `${frontendOrigin}/order/track/${result.orderCode}?payment=${status}`
      : `${frontendOrigin}/order?payment=${status}`;
    return res.redirect(target);
  }
}
