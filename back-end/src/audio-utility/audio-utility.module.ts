import { Module } from '@nestjs/common';
import { AudioUtilityService } from './audio-utility.service';
import { AudioUtilityController } from './audio-utility.controller';
import { FilesController } from 'src/files/files.controller';
import { FilesService } from 'src/files/files.service';

@Module({
  providers: [AudioUtilityService, FilesController, FilesService],
  controllers: [AudioUtilityController]
})
export class AudioUtilityModule {}
