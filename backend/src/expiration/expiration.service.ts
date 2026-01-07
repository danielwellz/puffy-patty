import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExpirationRule } from "./expiration-rule.entity";

@Injectable()
export class ExpirationService {
  constructor(
    @InjectRepository(ExpirationRule)
    private readonly repo: Repository<ExpirationRule>
  ) {}

  list() {
    return this.repo.find({ order: { item: "ASC" } });
  }
}
