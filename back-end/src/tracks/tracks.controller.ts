import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTrackDto } from 'src/dto/create-track.dto';
import { UpdateTrackDto } from 'src/dto/update-track.dto';
import { ITrack } from 'src/interface/tracks.interface';
import { TracksService } from './tracks.service'; 

@Controller('tracks')
export class TracksController {
    constructor(private tracksService: TracksService) {}

    @Get()
    async findAll(): Promise<ITrack[]> {
        return this.tracksService.findAll();
    }

    @Post(':projectId')
    async create(@Param('projectId') projectId: string, @Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
        return this.tracksService.create(projectId, createTrackDto);
    }

    @Put(':trackId')
    async update(@Param('trackId') trackId: string, @Body() updateTrackDto: UpdateTrackDto): Promise<ITrack> {
        return this.tracksService.update(trackId, updateTrackDto);
    }

    @Delete(':trackId')
    async delete(@Param('trackId') trackId: string): Promise<ITrack> {
        return this.tracksService.delete(trackId);
    }
}
