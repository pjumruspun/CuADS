import { ApiProperty } from '@nestjs/swagger';

class AudioClip {
    @ApiProperty({
        description: 'Content of the TTS audio clip.',
        required: true,
    })
    content: string;

    @ApiProperty({
        description: 'Start time to play this TTS audio clip.',
        required: true,
        default: '00:00:00:000',
    })
    startTime: string;

    @ApiProperty({
        description: 'Volume of this TTS audio clip.',
        required: true,
        default: 0.8,
    })
    volume: number;

    @ApiProperty({
        description: 'Playback speed of this TTS audio clip.',
        required: true,
        default: 1.0,
    })
    speed: number;

    @ApiProperty({
        description: 'Pitch adjustment of this TTS audio clip.',
        required: true,
        default: 1.0,
    })
    pitch: number;

    @ApiProperty({
        description: 'TTS audio file URL',
    })
    audioFileURL: string;
}

class Track {
    @ApiProperty({
        description: 'Name of the track.',
    })
    name: string;

    @ApiProperty({
        description: 'List of all audio clips in this track.',
        type: [AudioClip],
    })
    audioClips: AudioClip[];
}

export class CreateProjectDto {
    @ApiProperty({
        description: 'Passcode of the project, can be blank.',
    })
    passcode: string;

    @ApiProperty({
        description: 'Video URL of this project.'
    })
    videoURL: string;

    @ApiProperty({
        description: 'List of all tracks in this project.',
        type: [Track],
    })
    tracks: Track[]
}


