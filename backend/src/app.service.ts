import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  async getHealth() {
    try {
      await this.dataSource.query("SELECT 1");
      return { status: "ok", database: "up" };
    } catch (error) {
      return { status: "degraded", database: "down", error: `${error}` };
    }
  }
}
