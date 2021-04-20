import { Module } from '@nestjs/common';
import { TTSController } from './tts.controller';
import { TTSService } from './tts.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [TTSController],
    providers: [
        TTSService,
    ],
    exports: [TTSService],
})
export class TTSModule {}
