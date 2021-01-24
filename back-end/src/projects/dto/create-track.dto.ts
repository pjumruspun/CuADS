import { ApiProperty } from '@nestjs/swagger';
import { CreateAudioClipDto } from './create-audio-clip.dto'
import { Types } from 'mongoose'

export class CreateTrackDto {
    @ApiProperty({

    })
    track_id: Types.ObjectId;

    @ApiProperty({
        description: 'Name of the track.',
    })
    name: string;

    @ApiProperty({
        description: 'List of all audio clips in this track.',
        type: [CreateAudioClipDto],
    })
    audioClips: CreateAudioClipDto[];
}