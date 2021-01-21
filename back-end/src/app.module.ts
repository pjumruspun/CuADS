import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileuploadModule } from './fileupload/fileupload.module';

@Module({
  imports: [FileuploadModule, ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
  })],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
