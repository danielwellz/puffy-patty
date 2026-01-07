import { UserRole } from "../users/user.entity";

export type JwtPayload = {
  sub: string;
  phone: string;
  role: UserRole;
  branchId?: string;
};
