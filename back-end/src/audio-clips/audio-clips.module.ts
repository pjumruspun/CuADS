import { Module } from '@nestjs/common';
import { AudioClipsService } from './audio-clips.service';
import { AudioClipsController } from './audio-clips.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AudioClipSchema } from './audio-clips.schema';
import { audioClipsProviders } from './audio-clips.providers';
import { TracksService } from 'src/tracks/tracks.service';
import { trackProviders } from 'src/tracks/tracks.providers';
import { ProjectsService } from 'src/projects/projects.service';
import { projectProviders } from 'src/projects/projects.providers';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'AudioClip', schema: AudioClipSchema }]),
  ],
  providers: [
    ProjectsService,
    AudioClipsService,
    TracksService,
    ...projectProviders,
    ...trackProviders,
    ...audioClipsProviders,
  ],
  controllers: [AudioClipsController]
})
export class AudioClipsModule {}
