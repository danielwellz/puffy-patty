import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Branch } from "./branch.entity";
import { BranchService } from "./branch.service";
import { BranchesPublicController } from "./branches.public.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  providers: [BranchService],
  controllers: [BranchesPublicController],
  exports: [BranchService]
})
export class BranchModule {}
