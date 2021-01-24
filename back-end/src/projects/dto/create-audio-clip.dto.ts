import { ApiProperty } from "@nestjs/swagger";

export class CreateAudioClipDto {
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