import { Test, TestingModule } from '@nestjs/testing';
import { GemService } from './gem.service';

describe('GemService', () => {
  let service: GemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GemService],
    }).compile();

    service = module.get<GemService>(GemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
