import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        })
    ],
    providers: [FilesService, GridFsMulterConfigService],
    controllers: [FilesController]
})
export class FilesModule {}
