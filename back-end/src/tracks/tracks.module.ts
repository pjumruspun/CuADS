import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackSchema } from './tracks.schema';
import { trackProviders } from './tracks.providers';
import { ProjectsService } from 'src/projects/projects.service';
import { projectProviders } from 'src/projects/projects.providers';
import { audioClipsProviders } from 'src/audio-clips/audio-clips.providers';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Track', schema: TrackSchema, }]),
  ],
  providers: [
    TracksService,
    ProjectsService,
    ...projectProviders,
    ...trackProviders,
  ],
  controllers: [TracksController]
})
export class TracksModule {}
