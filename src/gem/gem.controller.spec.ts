import { Test, TestingModule } from '@nestjs/testing';
import { GemController } from './gem.controller';
import { GemService } from './gem.service';

describe('GemController', () => {
  let controller: GemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GemController],
      providers: [GemService],
    }).compile();

    controller = module.get<GemController>(GemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
