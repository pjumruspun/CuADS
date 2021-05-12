import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTrackDto } from 'src/dto/create-track.dto';
import { UpdateTrackDto } from 'src/dto/update-track.dto';
import { ITrack } from 'src/interface/tracks.interface';
import { TracksService } from './tracks.service'; 
import { Types } from 'mongoose';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
    constructor(private tracksService: TracksService) {}

    @ApiOperation({ summary: 'Get all tracks, for debugging purpose only'})
    @Get()
    async findAll(): Promise<ITrack[]> {
        return this.tracksService.findAll();
    }

    @ApiOperation({ summary: 'Find one track by {trackId}'})
    @Get('findbyid/:trackId')
    async findById(@Param('trackId') trackId: string): Promise<ITrack> {
        return this.tracksService.findById(trackId);
    }

    @ApiOperation({ summary: 'Get all audio clips by {trackId}'})
    @Get('getallclips/:trackId')
    async findAllAudioClips(@Param('trackId') trackId: string): Promise<Types.ObjectId[]> {
        return this.tracksService.findAllAudioClips(trackId);
    }

    @ApiOperation({ summary: 'Add a track into {projectId}'})
    @Post(':projectId')
    async create(@Param('projectId') projectId: string, @Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
        return this.tracksService.create(projectId, createTrackDto);
    }

    @ApiOperation({ summary: 'Update one track by {trackId}, intended for ONLY updating name'})
    @Put(':trackId')
    async update(@Param('trackId') trackId: string, @Body() updateTrackDto: UpdateTrackDto): Promise<ITrack> {
        return this.tracksService.update(trackId, updateTrackDto);
    }

    @ApiOperation({ summary: 'Delete one track by {trackId}'})
    @Delete(':trackId')
    async delete(@Param('trackId') trackId: string): Promise<ITrack> {
        return this.tracksService.delete(trackId);
    }
}
