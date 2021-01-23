import { Test, TestingModule } from '@nestjs/testing';
import { FileuploadController } from './fileupload.controller';

describe('FileuploadController', () => {
  let controller: FileuploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileuploadController],
    }).compile();

    controller = module.get<FileuploadController>(FileuploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
