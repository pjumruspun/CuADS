import { Post, Get, Param, Res, Controller, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';

var path = require('path')

@Controller('/files')
export class FilesController {
    constructor(){} 

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return file
    }

    @Get(':id')
    async getFile(@Param('id') id: string, @Res() response) {
        var filePath = path.join(__dirname, `../../upload/${id}`)
        console.log(filePath);
        return response.download(filePath, `image`)
    }

    // TODO: Delete video file if the project is deleted
}