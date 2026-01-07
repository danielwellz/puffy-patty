import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { VerificationCode } from "./verification.entity";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./jwt.strategy";
import { SmsService } from "./sms.service";
import { RolesGuard } from "./roles.guard";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    ThrottlerModule,
    TypeOrmModule.forFeature([VerificationCode]),
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const jwt = config.get("jwt")!;
        return {
          secret: jwt.secret,
          signOptions: { expiresIn: jwt.expiresIn }
        };
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    SmsService,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  exports: [RolesGuard]
})
export class AuthModule {}
