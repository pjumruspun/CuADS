import { Test, TestingModule } from '@nestjs/testing';
import { AudioClipsController } from './audio-clips.controller';

describe('AudioClipsController', () => {
  let controller: AudioClipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AudioClipsController],
    }).compile();

    controller = module.get<AudioClipsController>(AudioClipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
