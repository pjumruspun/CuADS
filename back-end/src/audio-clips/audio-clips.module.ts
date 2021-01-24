import { Module } from '@nestjs/common';
import { AudioClipsService } from './audio-clips.service';
import { AudioClipsController } from './audio-clips.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AudioClipSchema } from './audio-clips.schema';
import { audioClipsProviders } from './audio-clips.providers';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'AudioClip', schema: AudioClipSchema }]),
  ],
  providers: [
    AudioClipsService,
    ...audioClipsProviders,
  ],
  controllers: [AudioClipsController]
})
export class AudioClipsModule {}
