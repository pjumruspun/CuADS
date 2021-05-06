import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';
import { diskStorage } from 'multer';

var path = require('path')
@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: () => ({
                storage: diskStorage({
                    destination: './upload',
                    filename: editFileName,
                }),
            }),
        })
    ],
    providers: [GridFsMulterConfigService],
    controllers: [FilesController]
})
export class FilesModule {}

export const editFileName = (req, file, callback) => {
    const fileExtName = path.extname(file.originalname);
    const randomName = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const newName = `${randomName}${fileExtName}`
    console.log(newName);
    callback(null, newName);
};
