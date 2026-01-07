import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { configuration } from "./config/configuration";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { User } from "./users/user.entity";
import { VerificationCode } from "./auth/verification.entity";
import { Shift } from "./shifts/shift.entity";
import { Attendance } from "./attendance/attendance.entity";
import { ShoppingItem } from "./planning/shopping-item.entity";
import { PrepItem } from "./planning/prep-item.entity";
import { DailyPurchase } from "./daily/purchase.entity";
import { WasteLog } from "./daily/waste.entity";
import { Branch } from "./branches/branch.entity";
import { BranchModule } from "./branches/branch.module";
import { RolesGuard } from "./auth/roles.guard";
import { TasksModule } from "./tasks/tasks.module";
import { ShoppingModule } from "./shopping/shopping.module";
import { PrepModule } from "./prep/prep.module";
import { ShiftsModule } from "./shifts/shifts.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { PlanningModule } from "./planning/planning.module";
import { DailyModule } from "./daily/daily.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
      load: [configuration],
      expandVariables: true
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const throttling = config.get("throttling") ?? configuration().throttling;
        return [
          {
            ttl: throttling.ttl,
            limit: throttling.limit
          }
        ];
      }
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get("database") ?? configuration().database;
        return {
          type: "postgres",
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.name,
          synchronize: db.synchronize,
          logging: db.logging,
          retryAttempts: 5,
          retryDelay: 2000,
          entities: [User, VerificationCode, Shift, Attendance, ShoppingItem, PrepItem, DailyPurchase, WasteLog, Branch],
          autoLoadEntities: true
        };
      }
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    ShoppingModule,
    PrepModule,
    ShiftsModule,
    AttendanceModule,
    PlanningModule,
    DailyModule,
    BranchModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
