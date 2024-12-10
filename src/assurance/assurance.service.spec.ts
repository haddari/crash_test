import { Test, TestingModule } from '@nestjs/testing';
import { AssuranceService } from './assurance.service';

describe('AssuranceService', () => {
  let service: AssuranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssuranceService],
    }).compile();

    service = module.get<AssuranceService>(AssuranceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
