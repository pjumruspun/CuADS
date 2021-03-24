import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { TracksModule } from './tracks/tracks.module';
import { AudioClipsModule } from './audio-clips/audio-clips.module';
import { TTSModule } from './texttospeech/tts.module';
import { AudioUtilityModule } from './audio-utility/audio-utility.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ProjectsModule,
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVICE_ENDPOINT}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_NAME}`),
    TracksModule,
    AudioClipsModule,
    TTSModule,
    AudioUtilityModule,
    FilesModule,
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}