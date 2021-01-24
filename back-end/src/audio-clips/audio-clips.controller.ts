import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAudioClipDto } from 'src/dto/create-audio-clip.dto';
import { UpdateAudioClipDto } from 'src/dto/update-audio-clip.dto';
import { IAudioClip } from 'src/interface/audio-clip.interface';
import { AudioClipsService } from './audio-clips.service';

@ApiTags('AudioClips')
@Controller('audio-clips')
export class AudioClipsController {
    constructor(private audioClipsService: AudioClipsService) {}

    // Debugging purpose only
    @ApiOperation({ summary: 'Get all audio clips, for debugging purpose only'})
    @Get()
    async findAll(): Promise<IAudioClip[]> {
        return this.audioClipsService.findAll();
    }

    @ApiOperation({ summary: 'Add an audio clip into {trackId}'})
    @Post(':trackId')
    async create(@Param('trackId') trackId: string, @Body() createAudioClipDto: CreateAudioClipDto): Promise<IAudioClip> {
        return this.audioClipsService.create(trackId, createAudioClipDto);
    }

    @ApiOperation({ summary: 'Update one audio clip by {audioClipId}'})
    @Put(':audioClipId')
    async update(@Param('audioClipId') audioClipId: string, @Body() updateAudioClipDto: UpdateAudioClipDto): Promise<IAudioClip>{
        return this.audioClipsService.update(audioClipId, updateAudioClipDto);
    }
}
