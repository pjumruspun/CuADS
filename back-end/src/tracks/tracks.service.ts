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

    async findById(trackId: string): Promise<ITrack> {
        return await this.trackModel.findById(trackId);
    }

    async findAllAudioClips(trackId: string): Promise<Types.ObjectId[]> {
        return (await this.trackModel.findById(trackId)).audioClips;
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

    async delete(trackId: string): Promise<ITrack> {
        var removeSuccessful: boolean = await this.projectsService.removeTrack(trackId);
        if(!removeSuccessful) {
            console.log(`trackId: ${trackId} does not exist in any project.`);
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

    async removeAudioClip(audioClipId: string): Promise<boolean> {
        var allTracks = await this.findAll(); // Very heavy, could optimize later
        var updateTrack;
        var found: boolean = false;
        allTracks.forEach((track, i) => {
            track.audioClips.forEach(iterClipId => {
                if(String(iterClipId) == audioClipId) {
                    found = true;
                    updateTrack = track;
                }
            })
        })

        if(found) {
            updateTrack.audioClips = updateTrack.audioClips.filter(item => item != String(audioClipId));
            await this.trackModel.findByIdAndUpdate(updateTrack._id, updateTrack);
        }

        return found;
    }
}
