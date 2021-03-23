import { Module } from '@nestjs/common';
import { AudioUtilityService } from './audio-utility.service';
import { AudioUtilityController } from './audio-utility.controller';

@Module({
  providers: [AudioUtilityService],
  controllers: [AudioUtilityController]
})
export class AudioUtilityModule {}
