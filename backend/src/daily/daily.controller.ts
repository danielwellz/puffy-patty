import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../users/user.entity";
import { DailyService } from "./daily.service";
import * as path from "path";
import * as fs from "fs";
import { CurrentUser } from "../auth/current-user.decorator";

@Controller("daily")
export class DailyController {
  constructor(private readonly dailyService: DailyService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager, UserRole.HeadChef)
  @Get("purchases")
  purchases(@Query("date") date?: string, @CurrentUser() user?: any) {
    return this.dailyService.getPurchases(date, user?.branchId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager, UserRole.HeadChef)
  @Post("purchases")
  addPurchase(@Body() body: any, @CurrentUser() user: any) {
    const items = body.items || body;
    return this.dailyService.addPurchase(items, user?.branchId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Post("purchases/receipt")
  @UseInterceptors(FileInterceptor("file"))
  uploadReceipt(@UploadedFile() file: any) {
    const uploadsDir = path.join(process.cwd(), "backend", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(uploadsDir, filename);
    fs.writeFileSync(filepath, file.buffer);
    return { receiptUrl: `/uploads/${filename}` };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager, UserRole.HeadChef)
  @Get("waste")
  waste(@Query("date") date?: string, @CurrentUser() user?: any) {
    return this.dailyService.getWaste(date, user?.branchId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Manager, UserRole.HeadChef)
  @Post("waste")
  addWaste(@Body() body: any, @CurrentUser() user: any) {
    const items = body.items || body;
    return this.dailyService.addWaste(items, user?.branchId);
  }
}
