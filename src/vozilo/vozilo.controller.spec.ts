import { Test, TestingModule } from '@nestjs/testing';
import { VoziloController } from './vozilo.controller';

describe('VoziloController', () => {
  let controller: VoziloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoziloController],
    }).compile();

    controller = module.get<VoziloController>(VoziloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
