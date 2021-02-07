import { Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { request, response } from 'express';
import { ModifyAudioFromURLDto } from 'src/dto/modify-audio-from-url.dto';
import { ModifyAudioDto } from 'src/dto/modify-audio.dto';
import { AudioUtilityService } from './audio-utility.service';

@Controller('audio-utility')
export class AudioUtilityController {
    constructor(private audioUtilityService: AudioUtilityService) {}

    @Post('fromreq')
    @UseInterceptors(FilesInterceptor('files'))
    async modifyAudioFromReq(@Req() request, @Res() response, @Body() modifyAudioDto: ModifyAudioDto) {
        try {
            await this.audioUtilityService.modifyAudioFromReq(request, response, modifyAudioDto);
        } catch (error) {
            console.log(error.message);
            return response.status(500).json(`Failed to modify from req: ${error.message}`);
        }
    }

    @Post('fromurl')
    async modifyAudioFromURL(@Res() response, @Body() modifyAudioFromUrlDto: ModifyAudioFromURLDto) {
        try {
            await this.audioUtilityService.modifyAudioFromURL(response, modifyAudioFromUrlDto);
        } catch (error) {
            console.log(error.message);
            return response.status(500).json(`Failed to modify from url: ${error.message}`);
        }
    }
}
