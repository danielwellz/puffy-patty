import { Controller, Get } from "@nestjs/common";
import { BranchService } from "./branch.service";

@Controller("public/branches")
export class BranchesPublicController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  list() {
    return this.branchService.findAll();
  }
}
