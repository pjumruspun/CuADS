import { Inject, Injectable, NotFoundException, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAudioClipDto } from 'src/dto/create-audio-clip.dto';
import { UpdateAudioClipDto } from 'src/dto/update-audio-clip.dto';
import { IAudioClip } from 'src/interface/audio-clip.interface';
import { TracksService } from 'src/tracks/tracks.service';
import { AudioUtilityService } from 'src/audio-utility/audio-utility.service';

var fs = require('fs')
var path = require('path')

@Injectable()
export class AudioClipsService {
    constructor(
        @Inject('AUDIOCLIP_MODEL') private audioClipModel: Model<IAudioClip>,
        private tracksService: TracksService,
        private audioUtilityService: AudioUtilityService
    ) {}

    async findAll(): Promise<IAudioClip[]> {
        return this.audioClipModel.find().exec();
    }

    async findById(audioClipId: string): Promise<IAudioClip> {
        return this.audioClipModel.findById(audioClipId);
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

    async update(audioClipId: string, updateAudioClipDto: UpdateAudioClipDto): Promise<IAudioClip> {
        return await this.audioClipModel.findByIdAndUpdate(audioClipId, updateAudioClipDto, { new: true });
    }

    async delete(audioClipId: string): Promise<IAudioClip | any> {
        var removeSuccessful: boolean = await this.tracksService.removeAudioClip(audioClipId);
        // if(!removeSuccessful) {
        //     console.log(`audioClipId: ${audioClipId} does not exist in any project.`);
        //     throw new NotFoundException();
        // }
        return await this.audioClipModel.findByIdAndRemove(audioClipId);
    }

    async exportMp3(trackId: string, @Res() response) {
        // Add tts filter by trackId here once TTS front and back is connected
        // Right now will try to send from all TTS in the database
        const audioClips = await this.audioClipModel.find().exec()
        const allAudioClipsIdInTrack = await this.tracksService.findAllAudioClips(trackId);
        const finalExportClips = []
        audioClips.forEach(audioClip => {
            if(allAudioClipsIdInTrack.includes(audioClip._id))
            {
                finalExportClips.push(audioClip)
            }
        })

        if(finalExportClips.length == 0)
        {
            return response.status(200).json({ msg: `Cannot export from track with trackId: ${trackId} as there is no TTS in that particular track.`});
        }
        else
        {
            return await this.audioUtilityService.export(finalExportClips, response);
        }
    }

    async exportCsv(trackId: string, @Res() response) {
        // Add tts filter by trackId here once TTS front and back is connected
        // Right now will try to send from all TTS in the database
        const audioClips = await this.audioClipModel.find().exec()
        const allAudioClipsIdInTrack = await this.tracksService.findAllAudioClips(trackId);
        const finalExportClips = []
        audioClips.forEach(audioClip => {
            if(allAudioClipsIdInTrack.includes(audioClip._id))
            {
                finalExportClips.push(audioClip)
            }
        })

        if(finalExportClips.length == 0)
        {
            return response.status(200).json({ msg: `Cannot export from track with trackId: ${trackId} as there is no TTS in that particular track.`});
        }
        else
        {
            const csvString = [
                [
                    "No.",
                    "Time",
                    "Text",
                    "Volume",
                    "Speed",
                    "Pitch",
                ],
                ...finalExportClips.map((item, i) => [
                    i,
                    item.startTime,
                    item.text,
                    item.volume,
                    item.speed,
                    item.pitch,
                ])
            ]
            .map(e => e.join(",")) 
            .join("\n");

            const tmpFilePath = path.join(__dirname, `../../tmp/export.csv`)
            fs.writeFileSync(tmpFilePath, csvString)
            
            return response.download(tmpFilePath);
        }
    }
}
