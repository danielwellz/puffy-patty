import { Test, TestingModule } from "@nestjs/testing";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            createUser: jest.fn(),
            updateUser: jest.fn()
          }
        },
        {
          provide: JwtAuthGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) }
        },
        {
          provide: RolesGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) }
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
