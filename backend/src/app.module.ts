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
import { BranchModule } from "./branches/branch.module";
import { RolesGuard } from "./auth/roles.guard";
import { TasksModule } from "./tasks/tasks.module";
import { ShoppingModule } from "./shopping/shopping.module";
import { PrepModule } from "./prep/prep.module";
import { ShiftsModule } from "./shifts/shifts.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { PlanningModule } from "./planning/planning.module";
import { DailyModule } from "./daily/daily.module";
import { RecipesModule } from "./recipes/recipes.module";
import { ChecklistsModule } from "./checklists/checklists.module";
import { ExpirationModule } from "./expiration/expiration.module";
import { MenuModule } from "./menu/menu.module";
import { OrdersModule } from "./orders/orders.module";
import { PaymentsModule } from "./payments/payments.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { entities } from "./database/entities";

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
          entities,
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
    BranchModule,
    RecipesModule,
    ChecklistsModule,
    ExpirationModule,
    MenuModule,
    OrdersModule,
    PaymentsModule,
    ReservationsModule
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
