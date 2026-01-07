import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, WebSocket } from "ws";
import { Order } from "./order.entity";

@WebSocketGateway({ path: "/ws/orders" })
export class OrdersGateway {
  @WebSocketServer()
  server!: Server;

  emitStatusChanged(order: Order) {
    if (!this.server) return;
    const payload = {
      event: "order.statusChanged",
      data: {
        orderCode: order.code,
        newStatus: order.status,
        updatedAt: order.updatedAt,
        createdAt: order.createdAt
      }
    };
    const message = JSON.stringify(payload);
    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
