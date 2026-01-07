import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./orders.service";

@Controller("public/orders")
export class OrdersPublicController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() body: CreateOrderDto) {
    return this.ordersService.createOrder(body);
  }

  @Get(":code")
  getOrder(@Param("code") code: string) {
    return this.ordersService.getByCode(code);
  }
}
