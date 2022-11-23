import { Test, TestingModule } from '@nestjs/testing';
import { VoziloService } from './vozilo.service';

describe('VoziloService', () => {
  let service: VoziloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoziloService],
    }).compile();

    service = module.get<VoziloService>(VoziloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
