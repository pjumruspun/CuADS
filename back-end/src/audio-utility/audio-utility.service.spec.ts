import { Test, TestingModule } from '@nestjs/testing';
import { AudioUtilityService } from './audio-utility.service';

describe('AudioUtilityService', () => {
  let service: AudioUtilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudioUtilityService],
    }).compile();

    service = module.get<AudioUtilityService>(AudioUtilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
