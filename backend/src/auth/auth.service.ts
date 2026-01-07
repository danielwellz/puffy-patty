import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { User, UserRole } from "../users/user.entity";
import { VerificationCode } from "./verification.entity";
import { SmsService } from "./sms.service";

type JwtPayload = { sub: string; phone: string; role: UserRole; branchId?: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly smsService: SmsService,
    private readonly configService: ConfigService,
    @InjectRepository(VerificationCode)
    private readonly verificationRepo: Repository<VerificationCode>
  ) {}

  private generateCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
  }

  async sendCode(phone: string) {
    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // clean previous codes for this phone
    await this.verificationRepo.delete({ phone });

    const record = this.verificationRepo.create({ phone, code, expiresAt });
    await this.verificationRepo.save(record);

    await this.smsService.sendVerification(phone, code);
    return { success: true, expiresAt };
  }

  async verifyCode(phone: string, code: string) {
    const record = await this.verificationRepo.findOne({
      where: { phone, consumed: false },
      order: { createdAt: "DESC" }
    });

    if (!record || record.code !== code || record.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException("Invalid or expired code");
    }

    record.consumed = true;
    await this.verificationRepo.save(record);

    const managerPhone = this.configService.get<string>("app.managerPhone");
    const defaultBranchId = this.configService.get<string>("branches.defaultBranchId") || "main";
    let user = await this.usersService.findByPhone(phone);
    const isNewUser = !user;

    if (!user) {
      const role = phone === managerPhone ? UserRole.Manager : UserRole.KitchenStaff;
      user = await this.usersService.createUser({
        phone,
        name: "New User",
        role,
        branchId: defaultBranchId
      });
    }

    const token = this.signToken(user!);

    return {
      token,
      isNewUser,
      hasPassword: Boolean(user!.passwordHash),
      role: user!.role
    };
  }

  async setPassword(userId: string, password: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException();

    const hash = await bcrypt.hash(password, 10);
    await this.usersService.updateUser(user.id, { passwordHash: hash });
    return { success: true };
  }

  async loginWithPassword(phone: string, password: string) {
    const user = await this.usersService.findByPhone(phone);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    return { token: this.signToken(user), role: user.role, branchId: user.branchId };
  }

  private signToken(user: User) {
    const payload: JwtPayload = { sub: user.id, phone: user.phone, role: user.role, branchId: user.branchId };
    return this.jwtService.sign(payload);
  }
}
