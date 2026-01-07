import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BranchService } from "../branches/branch.service";
import { MenuService } from "../menu/menu.service";
import { Order } from "./order.entity";
import { OrderItem } from "./order-item.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderSource, OrderStatus, OrderType } from "./order.types";
import { OrdersGateway } from "./orders.gateway";

const DEFAULT_TAX_RATE = 0;

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly itemRepo: Repository<OrderItem>,
    private readonly branchService: BranchService,
    private readonly menuService: MenuService,
    private readonly configService: ConfigService,
    private readonly ordersGateway: OrdersGateway
  ) {}

  async createOrder(input: CreateOrderDto) {
    const branch = await this.branchService.findById(input.branchId);
    if (!branch) throw new NotFoundException("Branch not found");
    if (!branch.onlineOrderingEnabled) throw new BadRequestException("Online ordering is disabled for this branch");
    if (input.orderType === OrderType.DineIn && !branch.dineInEnabled) {
      throw new BadRequestException("Dine-in ordering is disabled for this branch");
    }
    if (input.orderType === OrderType.Takeaway && !branch.takeawayEnabled) {
      throw new BadRequestException("Takeaway ordering is disabled for this branch");
    }

    if (input.orderType === OrderType.DineIn && !input.tableNumber) {
      throw new BadRequestException("Table number is required for dine-in orders");
    }

    const pickupTime = input.pickupTime ? new Date(input.pickupTime) : null;
    if (input.orderType === OrderType.Takeaway && !pickupTime) {
      throw new BadRequestException("Pickup time is required for takeaway orders");
    }
    if (pickupTime && Number.isNaN(pickupTime.getTime())) {
      throw new BadRequestException("Invalid pickup time");
    }
    if (pickupTime && pickupTime.getTime() < Date.now()) {
      throw new BadRequestException("Pickup time must be in the future");
    }
    if (pickupTime && branch.hoursJson && !this.isWithinHours(pickupTime, branch.hoursJson)) {
      throw new BadRequestException("Pickup time is outside branch hours");
    }

    const uniqueIds = Array.from(new Set(input.items.map((i) => i.menuItemId)));
    const menuItems = await this.menuService.getActiveItemsByIds(uniqueIds, branch.id);
    if (menuItems.length !== uniqueIds.length) {
      throw new BadRequestException("One or more menu items are unavailable");
    }

    const menuMap = new Map(menuItems.map((item) => [item.id, item]));
    const orderItems = input.items.map((item) => {
      const menuItem = menuMap.get(item.menuItemId);
      if (!menuItem) {
        throw new BadRequestException("Invalid menu item");
      }
      return this.itemRepo.create({
        menuItemId: item.menuItemId,
        qty: item.qty,
        unitPrice: menuItem.basePrice,
        notes: item.notes,
        addonsJson: item.addonsJson
      });
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
    const taxRate = parseFloat(this.configService.get<string>("ordering.taxRate") || "") || DEFAULT_TAX_RATE;
    const tax = Math.round(subtotal * taxRate);
    const total = subtotal + tax;

    const status = input.orderType === OrderType.Takeaway ? OrderStatus.PendingPayment : OrderStatus.Received;

    const order = this.orderRepo.create({
      code: await this.generateCode(),
      branchId: branch.id,
      orderType: input.orderType,
      status,
      tableNumber: input.tableNumber || null,
      pickupTime,
      customerName: input.customerName || null,
      customerPhone: input.customerPhone || null,
      subtotal,
      tax,
      total,
      source: OrderSource.Pwa
    });
    order.items = orderItems.map((item) => {
      item.order = order;
      return item;
    });

    const saved = await this.orderRepo.save(order);
    this.ordersGateway.emitStatusChanged(saved);
    return saved;
  }

  async getByCode(code: string) {
    const order = await this.orderRepo.findOne({ where: { code }, relations: ["items"] });
    if (!order) throw new NotFoundException("Order not found");
    return order;
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException("Order not found");
    order.status = status;
    const saved = await this.orderRepo.save(order);
    this.ordersGateway.emitStatusChanged(saved);
    return saved;
  }

  async markPaid(orderId: string) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException("Order not found");
    if (order.status === OrderStatus.PendingPayment) {
      order.status = OrderStatus.Received;
    }
    const saved = await this.orderRepo.save(order);
    this.ordersGateway.emitStatusChanged(saved);
    return saved;
  }

  private async generateCode() {
    for (let i = 0; i < 5; i += 1) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const existing = await this.orderRepo.findOne({ where: { code } });
      if (!existing) return code;
    }
    throw new BadRequestException("Could not generate order code");
  }

  private isWithinHours(target: Date, hoursJson: Record<string, any>) {
    const open = hoursJson?.open as string | undefined;
    const close = hoursJson?.close as string | undefined;
    if (!open || !close) return true;
    const [openHour, openMinute] = open.split(":").map(Number);
    const [closeHour, closeMinute] = close.split(":").map(Number);
    if ([openHour, openMinute, closeHour, closeMinute].some((n) => Number.isNaN(n))) {
      return true;
    }
    const start = new Date(target);
    start.setHours(openHour, openMinute, 0, 0);
    const end = new Date(target);
    end.setHours(closeHour, closeMinute, 0, 0);
    return target >= start && target <= end;
  }
}
