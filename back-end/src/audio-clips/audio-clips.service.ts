import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAudioClipDto } from 'src/dto/create-audio-clip.dto';
import { IAudioClip } from 'src/interface/audio-clip.interface';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AudioClipsService {
    constructor(
        @Inject('AUDIOCLIP_MODEL') private audioClipModel: Model<IAudioClip>,
        private tracksService: TracksService
    ) {}

    async findAll(): Promise<IAudioClip[]> {
        return this.audioClipModel.find().exec();
    }

    async create(trackId: string, createAudioClipDto: CreateAudioClipDto): Promise<IAudioClip> {
        var found: boolean = await this.tracksService.contains(trackId);
        if(!found) {
            console.log(`trackId: ${trackId} does not exist.`);
            throw new NotFoundException();
        }
        const createdAudioClip = new this.audioClipModel(createAudioClipDto);
        const save = await createdAudioClip.save();

        const audioClipId = save.id;
        this.tracksService.addAudioClip(trackId, audioClipId);
        
        return createdAudioClip.save();
    }
}
