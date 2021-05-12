import { Controller, Post, Req, Res, Param, Body, Put, Patch } from '@nestjs/common';
import { TTSService } from './tts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTTSDto } from '../dto/create-tts.dto';
import { UpdateTTSDto } from '../dto/update-tts.dto';
import { IAudioClip } from '../interface/audio-clip.interface';

@ApiTags('tts')
@Controller('tts')
export class TTSController {
    constructor(private readonly ttsService: TTSService) {}

    @ApiOperation({ summary: 'Generate audio file mp3 from platform and save to MongoDB in base64 encoding.'})
    @Post()
    async create(@Body() createTTSDto: CreateTTSDto, @Req() request, @Res() response) {
        try {
            await this.ttsService.saveAudio(createTTSDto, request, response);
        } catch (error) {
            console.log(error.message)
            return response.status(500).json(`Failed: ${error.message}`);
        }
    }

    @ApiOperation({ summary: 'Update existed TTS audio with specified parameters.' })
    @Patch(':id')
    async update(@Param('id') id: string, @Body() UpdateTTSDto: UpdateTTSDto): Promise<IAudioClip> {
        return this.ttsService.update(id, UpdateTTSDto);
    }
}
