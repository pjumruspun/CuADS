import { Module } from '@nestjs/common';
import { TTSController } from './tts.controller';
import { TTSService } from './tts.service';

@Module({
    controllers: [TTSController],
    providers: [TTSService],
    exports: [TTSService],
})
export class TTSModule {}
