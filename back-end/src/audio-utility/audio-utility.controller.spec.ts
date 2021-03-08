import { Test, TestingModule } from '@nestjs/testing';
import { AudioUtilityController } from './audio-utility.controller';

describe('AudioUtilityController', () => {
  let controller: AudioUtilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AudioUtilityController],
    }).compile();

    controller = module.get<AudioUtilityController>(AudioUtilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
