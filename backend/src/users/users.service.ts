import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserRole } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findByPhone(phone: string) {
    return this.usersRepository.findOne({ where: { phone } });
  }

  findById(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createUser(data: { phone: string; name: string; role?: UserRole; branchId?: string }) {
    const user = this.usersRepository.create({
      phone: data.phone,
      name: data.name,
      role: data.role ?? UserRole.KitchenStaff,
      branchId: data.branchId
    });
    return this.usersRepository.save(user);
  }

  async updateUser(id: string, updates: Partial<User>) {
    await this.usersRepository.update({ id }, updates);
    return this.findById(id);
  }
}
