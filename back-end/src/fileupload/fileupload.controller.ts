import { Controller, Post, Req, Res } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';

@Controller('fileupload')
export class FileuploadController {
    constructor(private readonly fileUploadService: FileuploadService) {}

    @Post()
    async create(@Req() request, @Res() response) {
        console.log(process.env.AWS_S3_BUCKET_NAME)
        console.log(process.env.AWS_ACCESS_KEY_ID)
        console.log(process.env.AWS_SECRET_ACCESS_KEY)
        try {
            await this.fileUploadService.fileUpload(request, response);
        } catch (error) {
            console.log(error.message)
            return response.status(500).json(`Failed to upload the file: ${error.message}`);
        }
    }
}
