import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
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
            console.log(`projectId: ${projectId} does not exist.`);
            throw new NotFoundException();
        }
        const createdTrack = new this.trackModel(createTrackDto);
        const save = await createdTrack.save();
        
        const trackId = save._id;
        this.projectsService.addTrack(projectId, trackId);

        return save;
    }

    async update(trackId: string, updateTrackDto: UpdateTrackDto): Promise<ITrack> {
        return await this.trackModel.findByIdAndUpdate(trackId, updateTrackDto, { new: true });
    }

    async delete(trackId: string): Promise<ITrack | any> {
        var deleteSuccessful: boolean = await this.projectsService.deleteTrack(trackId);
        if(!deleteSuccessful) {
            console.log("TrackId does not exist in any project.");
            throw new NotFoundException();
        }
        return await this.trackModel.findByIdAndRemove(trackId);
    }

    async contains(id: string): Promise<boolean> {
        var found: boolean;
        try {
            found = await this.trackModel.findById(id) != null;
        } catch {
            found = false;
        }
        return found;
    }

    async addAudioClip(trackId: string, audioClipId: string) {
        var id: Types.ObjectId = Types.ObjectId(audioClipId);
        var createTrackDto = await this.trackModel.findById(trackId);
        createTrackDto.audioClips.push(id);
        await this.trackModel.findByIdAndUpdate(trackId, createTrackDto);
    }
}
