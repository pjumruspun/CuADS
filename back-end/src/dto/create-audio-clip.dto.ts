import { ApiProperty } from "@nestjs/swagger";
import { Types } from 'mongoose';

export class CreateAudioClipDto {
    @ApiProperty()
    audioClip_id: Types.ObjectId;

    @ApiProperty({
        description: 'Content of the TTS audio clip.',
        required: true,
    })
    content: string;

    @ApiProperty({
        description: 'Start time in second to play this TTS audio clip.',
        required: true,
        default: '0',
    })
    startTime: number;

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