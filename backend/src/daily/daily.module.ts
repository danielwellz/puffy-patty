import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DailyController } from "./daily.controller";
import { DailyService } from "./daily.service";
import { DailyPurchase } from "./purchase.entity";
import { WasteLog } from "./waste.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DailyPurchase, WasteLog])],
  controllers: [DailyController],
  providers: [DailyService]
})
export class DailyModule {}
