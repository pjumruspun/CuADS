import { Test, TestingModule } from '@nestjs/testing';
import { AudioClipsService } from './audio-clips.service';

describe('AudioClipsService', () => {
  let service: AudioClipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudioClipsService],
    }).compile();

    service = module.get<AudioClipsService>(AudioClipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
