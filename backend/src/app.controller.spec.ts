import { Test, TestingModule } from "@nestjs/testing";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { RolesGuard } from "./auth/roles.guard";
import { DataSource } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        Reflector,
        {
          provide: APP_GUARD,
          useClass: RolesGuard
        },
        {
          provide: DataSource,
          useValue: { query: jest.fn().mockResolvedValue([1]) }
        }
      ]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should return ok status', async () => {
      const result = await appController.getHealth();
      expect(result.status).toBe('ok');
      expect(result.database).toBe('up');
    });
  });
});
