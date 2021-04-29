import { ApiProperty } from "@nestjs/swagger";
import { Types } from 'mongoose';

export class CreateTTSDto {
    @ApiProperty({
        description: 'Content of the TTS audio clip.',
        required: true,
    })
    text: string;

    @ApiProperty({
        description: 'Platform of TTS generation. Either `chula` or `google`',
        required: true,
    })
    source: string;

    @ApiProperty({
        description: 'Start time in second to play this TTS audio clip.',
        required: true,
        default: '0',
    })
    startTime: number;

    @ApiProperty({
        description: 'Speed of the TTS.',
        required: true,
        default: 1
    })
    speed: number;

    @ApiProperty({
        description: 'Volume of the TTS.',
        required: true,
        default: 50
    })
    volume: number;

    @ApiProperty({
        description: 'Track ID of this TTS.',
        required: true,
    })
    trackId: Types.ObjectId;
}