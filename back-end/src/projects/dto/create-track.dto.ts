import { ApiProperty } from '@nestjs/swagger';
import { CreateAudioClipDto } from './create-audio-clip.dto'

export class CreateTrackDto {
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