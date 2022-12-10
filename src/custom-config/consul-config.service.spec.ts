import { Test, TestingModule } from '@nestjs/testing';
import { ConsulConfigService } from './consul-config.service';

describe('ConsulConfigService', () => {
  let service: ConsulConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsulConfigService],
    }).compile();

    service = module.get<ConsulConfigService>(ConsulConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
