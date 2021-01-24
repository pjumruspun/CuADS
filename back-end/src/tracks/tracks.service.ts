import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AnyARecord } from 'dns';
import { Model } from 'mongoose';
import { CreateTrackDto } from 'src/dto/create-track.dto';
import { UpdateTrackDto } from 'src/dto/update-track.dto';
import { ITrack } from 'src/interface/tracks.interface';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class TracksService {
    constructor(
        @Inject('TRACK_MODEL') private trackModel: Model<ITrack>,
        private projectsService: ProjectsService
    ) {}

    async findAll(): Promise<ITrack[]> {
        return this.trackModel.find().exec();
    }

    async create(projectId: string, createTrackDto: CreateTrackDto): Promise<ITrack> {
        var found: boolean = await this.projectsService.contains(projectId);
        if(!found) {
            console.log("ProjectId does not exist.");
            throw new NotFoundException();
        }
        const createdTrack = new this.trackModel(createTrackDto);
        const save = await createdTrack.save();
        
        const trackId = save._id;
        this.projectsService.createTrack(projectId, trackId);

        return save;
    }

    async update(trackId: string, updateTrackDto: UpdateTrackDto): Promise<ITrack> {
        return await this.trackModel.findByIdAndUpdate(trackId, updateTrackDto);
    }

    async delete(trackId: string): Promise<ITrack | any> {
        var deleteSuccessful: boolean = await this.projectsService.deleteTrack(trackId);
        if(!deleteSuccessful) {
            console.log("TrackId does not exist in any project.");
            throw new NotFoundException();
        }
        return await this.trackModel.findByIdAndRemove(trackId);
    }
}
