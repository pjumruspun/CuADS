import { Module } from '@nestjs/common';
import { TTSController } from './tts.controller';
import { TTSService } from './tts.service';
import { DatabaseModule } from 'src/database/database.module';
import { audioClipsProviders } from 'src/audio-clips/audio-clips.providers';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [TTSController],
    providers: [
        TTSService,
        ...audioClipsProviders,
    ],
    exports: [TTSService],
})
export class TTSModule {}
