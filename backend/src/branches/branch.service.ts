import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Branch } from "./branch.entity";

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly repo: Repository<Branch>
  ) {}

  findAll() {
    return this.repo.find();
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async ensureDefault(id: string, name = "Main") {
    if (!id) return null;
    const existing = await this.repo.findOne({ where: { id } });
    if (existing) return existing;
    const branch = this.repo.create({ id, name });
    return this.repo.save(branch);
  }
}
