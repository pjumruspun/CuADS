import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateTrackDto } from 'src/dto/create-track.dto';
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
}
