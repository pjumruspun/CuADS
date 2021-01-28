import { ApiProperty } from '@nestjs/swagger';
import { CreateAudioClipDto } from './create-audio-clip.dto'
import { Types } from 'mongoose'

export class CreateTrackDto {
    @ApiProperty({
        description: 'Name of the track.',
    })
    name: string;

    @ApiProperty({
        description: 'List of all audio clips in this track.',
        default: [],
        type: Types.ObjectId,
    })
    audioClips: [Types.ObjectId];
}