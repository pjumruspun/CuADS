import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileuploadModule } from './fileupload/fileupload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { TracksModule } from './tracks/tracks.module';
import { AudioClipsModule } from './audio-clips/audio-clips.module';

@Module({
  imports: [
    FileuploadModule, 
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ProjectsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    TracksModule,
    AudioClipsModule,
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}