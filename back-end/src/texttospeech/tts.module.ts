import { Module } from '@nestjs/common';
import { TTSController } from './tts.controller';
import { TTSService } from './tts.service';
import { ttsProviders } from './tts.providers';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TTSSchema } from './tts.schema';

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: 'TTS', schema: TTSSchema }])
    ],
    controllers: [TTSController],
    providers: [
        TTSService,
        ...ttsProviders
    ],
    exports: [TTSService],
})
export class TTSModule {}
