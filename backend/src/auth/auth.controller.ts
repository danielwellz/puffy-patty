import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { RolesGuard } from "./roles.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt.guard";
import { CurrentUser } from "./current-user.decorator";
import type { JwtPayload } from "./jwt.payload";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ThrottlerGuard)
  @Post("send-code")
  sendCode(@Body("phone") phone: string) {
    return this.authService.sendCode(phone);
  }

  @Post("verify-code")
  verifyCode(@Body("phone") phone: string, @Body("code") code: string) {
    return this.authService.verifyCode(phone, code);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("set-password")
  setPassword(@CurrentUser() user: JwtPayload, @Body("password") password: string) {
    return this.authService.setPassword(user.sub, password);
  }

  @Post("login")
  login(@Body("phone") phone: string, @Body("password") password: string) {
    return this.authService.loginWithPassword(phone, password);
  }
}
