import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpirationRule } from "./expiration-rule.entity";
import { ExpirationController } from "./expiration.controller";
import { ExpirationService } from "./expiration.service";

@Module({
  imports: [TypeOrmModule.forFeature([ExpirationRule])],
  controllers: [ExpirationController],
  providers: [ExpirationService],
  exports: [ExpirationService]
})
export class ExpirationModule {}
