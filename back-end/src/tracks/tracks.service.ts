import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTrackDto } from 'src/dto/create-track.dto';
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

    async create(projectId: string, createTrackDto: CreateTrackDto) {
        var found: boolean = await this.projectsService.contains(projectId);
        if(!found) {
            console.log("error");
            throw new NotFoundException();
        }
        const createdTrack = new this.trackModel(createTrackDto);
        const save = await createdTrack.save();
        
        const trackId = save._id;
        this.projectsService.createTrack(projectId, trackId);

        return save;
    }
}
