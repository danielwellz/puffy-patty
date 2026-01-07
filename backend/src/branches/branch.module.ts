import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Branch } from "./branch.entity";
import { BranchService } from "./branch.service";

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  providers: [BranchService],
  exports: [BranchService]
})
export class BranchModule {}
