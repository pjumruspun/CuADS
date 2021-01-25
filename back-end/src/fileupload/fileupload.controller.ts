import { Controller, Post, Req, Res } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';

@Controller('fileupload')
export class FileuploadController {
    constructor(private readonly fileUploadService: FileuploadService) {}

    @Post()
    async create(@Req() request, @Res() response) {
        try {
            await this.fileUploadService.fileUpload(request, response);
        } catch (error) {
            console.log(error.message)
            return response.status(500).json(`Failed to upload the file: ${error.message}`);
        }
    }
}
