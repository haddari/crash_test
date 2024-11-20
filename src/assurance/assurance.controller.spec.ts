import { Test, TestingModule } from '@nestjs/testing';
import { AssuranceController } from './assurance.controller';
import { AssuranceService } from './assurance.service';

describe('AssuranceController', () => {
  let controller: AssuranceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssuranceController],
      providers: [AssuranceService],
    }).compile();

    controller = module.get<AssuranceController>(AssuranceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
