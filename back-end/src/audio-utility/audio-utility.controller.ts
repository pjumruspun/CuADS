import { Controller, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AudioUtilityService } from './audio-utility.service';

@Controller('audio-utility')
export class AudioUtilityController {
    constructor(private audioUtilityService: AudioUtilityService) {}

    @Post('convert')
    @UseInterceptors(FilesInterceptor('files'))
    async convertToMp3(@Req() request, @Res() response) {
        try {
            await this.audioUtilityService.modifyAudioFromReq(request, response);
        } catch (error) {
            console.log(error.message);
            return response.status(500).json(`Failed to modify from req: ${error.message}`);
        }
    }

    @Post('convert/:projectid')
    @UseInterceptors(FilesInterceptor('files'))
    async convertToMp3WithProjId(@Param('projectid') projectid: string, @Req() request, @Res() response) {
        try {
            await this.audioUtilityService.modifyAudioFromReq(request, response, undefined, projectid);
        } catch (error) {
            console.log(error.message);
            return response.status(500).json(`Failed to modify from req: ${error.message}`);
        }
    }
}
